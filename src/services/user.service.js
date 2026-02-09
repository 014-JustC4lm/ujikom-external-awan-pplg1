import db from "../config/db.js";

// ambil semua user dari database
const getAllUsers = async () => {
  const [daftarUser] = await db.query("SELECT id, name, email, role FROM users");
  console.log('Berhasil ambil', daftarUser.length, 'users');
  return daftarUser;
};

// ambil user by ID
const getUserById = async (id) => {
  const [rows] = await db.query("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
  return rows[0];
};

// buat user baru
const createUser = async (name) => {
  const [hasil] = await db.query("INSERT INTO users (name) VALUES (?)", [name]);
  console.log('User baru ditambahkan, ID:', hasil.insertId);
  return { id: hasil.insertId, data: hasil };
};

// hapus user
const deleteUser = async (id) => {
  const [hasil] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return hasil.affectedRows;
};

// update data user
const updateUser = async (id, updates) => {
  const { name, email, role } = updates;
  const [hasil] = await db.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id]
  );
  
  console.log('User berhasil diupdate, ID:', id);
  return hasil.affectedRows;
};

export { getAllUsers, getUserById, createUser, deleteUser, updateUser };