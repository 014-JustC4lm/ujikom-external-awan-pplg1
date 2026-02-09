import db from "../config/db.js";
import { updateItemStatus } from "./item.service.js";

// buat request loan baru
const createLoan = async (userId, itemId, startDate, endDate, description) => {
  // cek apakah user udah punya pending loan untuk item ini
  const [cekPending] = await db.query(
    "SELECT id FROM loans WHERE user_id = ? AND item_id = ? AND status = 'pending'",
    [userId, itemId]
  );

  if (cekPending.length > 0) {
    throw new Error("Kamu sudah punya request pending untuk alat ini");
  }

  // cek apakah item tersedia
  const [items] = await db.query("SELECT status FROM items WHERE id = ?", [itemId]);
  
  if (items.length === 0) {
    throw new Error("Item tidak ditemukan");
  }

  if (items[0].status !== 'available') {
    throw new Error("Item sedang tidak tersedia");
  }

  // insert loan request
  const [hasil] = await db.query(
    "INSERT INTO loans (user_id, item_id, start_date, end_date, description, status) VALUES (?, ?, ?, ?, ?, 'pending')",
    [userId, itemId, startDate, endDate, description]
  );

  console.log('Loan request baru dibuat, ID:', hasil.insertId);

  return { 
    id: hasil.insertId, 
    user_id: userId, 
    item_id: itemId, 
    start_date: startDate, 
    end_date: endDate, 
    description, 
    status: 'pending' 
  };
};

// ambil semua loan (admin bisa liat semua, user cuma liat punya dia)
const getAllLoans = async (userId = null, isAdmin = false) => {
  const baseQuery = `
    SELECT 
      loans.*, 
      users.name as user_name, 
      users.email as user_email,
      items.name as item_name, 
      items.category as item_category,
      items.image as item_image
    FROM loans
    JOIN users ON loans.user_id = users.id
    JOIN items ON loans.item_id = items.id
  `;

  const query = !isAdmin && userId 
    ? baseQuery + " WHERE loans.user_id = ? ORDER BY loans.id DESC"
    : baseQuery + " ORDER BY loans.id DESC";

  const params = !isAdmin && userId ? [userId] : [];

  const [daftarLoan] = await db.query(query, params);
  return daftarLoan;
};

// ambil loan by ID
const getLoanById = async (id) => {
  const [rows] = await db.query(`
    SELECT 
      loans.*, 
      users.name as user_name, 
      users.email as user_email,
      items.name as item_name, 
      items.category as item_category,
      items.image as item_image
    FROM loans
    JOIN users ON loans.user_id = users.id
    JOIN items ON loans.item_id = items.id
    WHERE loans.id = ?
  `, [id]);

  return rows[0];
};

// approve loan (admin only)
const approveLoan = async (id) => {
  const dataLoan = await getLoanById(id);

  if (!dataLoan) {
    throw new Error("Loan not found");
  }

  if (dataLoan.status !== 'pending') {
    throw new Error("Cuma loan pending yang bisa diapprove");
  }

  // update loan status jadi approved
  await db.query("UPDATE loans SET status = 'approved' WHERE id = ?", [id]);

  // update item status jadi not available
  await updateItemStatus(dataLoan.item_id, 'not available');

  console.log('Loan approved, ID:', id);

  return true;
};

// reject loan (admin only)
const rejectLoan = async (id) => {
  const [hasil] = await db.query(
    "UPDATE loans SET status = 'rejected' WHERE id = ? AND status = 'pending'",
    [id]
  );

  if (hasil.affectedRows === 0) {
    throw new Error("Loan ga ketemu atau udah diproses");
  }

  console.log('Loan rejected, ID:', id);

  return true;
};

// approve return (admin only)
const approveReturn = async (id) => {
  const dataLoan = await getLoanById(id);

  if (!dataLoan) {
    throw new Error("Loan not found");
  }

  if (dataLoan.status !== 'approved') {
    throw new Error("Cuma approved loan yang bisa direturn");
  }

  // update loan status jadi returned
  await db.query("UPDATE loans SET status = 'returned' WHERE id = ?", [id]);

  // update item status jadi available lagi
  await updateItemStatus(dataLoan.item_id, 'available');

  console.log('Return approved, ID:', id);

  return true;
};

// hapus loan (admin or user bisa delete loan pending mereka sendiri)
const deleteLoan = async (id, userId = null, isAdmin = false) => {
  const query = !isAdmin && userId 
    ? "DELETE FROM loans WHERE id = ? AND user_id = ? AND status = 'pending'"
    : "DELETE FROM loans WHERE id = ?";
  
  const params = !isAdmin && userId ? [id, userId] : [id];

  const [hasil] = await db.query(query, params);
  return hasil.affectedRows;
};

export { 
  createLoan, 
  getAllLoans, 
  getLoanById, 
  approveLoan, 
  rejectLoan, 
  approveReturn,
  deleteLoan
};
