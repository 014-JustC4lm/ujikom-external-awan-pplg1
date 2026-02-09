import db from "../config/db.js";

// ambil semua alat dari database (bisa filter by kategori)
const getAllItems = async (category = null) => {
  const query = category ? "SELECT * FROM items WHERE category = ?" : "SELECT * FROM items";
  const params = category ? [category] : [];

  const [daftarAlat] = await db.query(query, params);
  console.log('Berhasil ambil', daftarAlat.length, 'alat');
  
  return daftarAlat;
};

// ambil alat berdasarkan ID
const getItemById = async (id) => {
  const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
  return rows[0];
};

// buat item baru (admin only)
const createItem = async (name, category, description, image = null) => {
  const [hasil] = await db.query(
    "INSERT INTO items (name, category, description, image, status) VALUES (?, ?, ?, ?, 'available')",
    [name, category, description, image]
  );

  console.log('Item baru ditambahkan:', name);

  return { 
    id: hasil.insertId, 
    name, 
    category, 
    description, 
    image, 
    status: 'available' 
  };
};

// update item (admin only)
const updateItem = async (id, name, category, description, image, status) => {
  const [hasil] = await db.query(
    "UPDATE items SET name = ?, category = ?, description = ?, image = ?, status = ? WHERE id = ?",
    [name, category, description, image, status, id]
  );

  return hasil.affectedRows;
};

// hapus item (admin only)
const deleteItem = async (id) => {
  const [hasil] = await db.query("DELETE FROM items WHERE id = ?", [id]);
  return hasil.affectedRows;
};

// update status item (dipake waktu loan approved/returned)
const updateItemStatus = async (id, status) => {
  const [hasil] = await db.query(
    "UPDATE items SET status = ? WHERE id = ?",
    [status, id]
  );
  
  console.log('Status item', id, 'diupdate jadi:', status);
  return hasil.affectedRows;
};

export { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItem, 
  deleteItem,
  updateItemStatus
};
