import db from "../config/db.js";
import bcrypt from 'bcryptjs';

// daftarin user baru ke database
const registerUser = async (name, email, password, role = 'user') => {
 // cek email udah ada belum
  const [cekEmail] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  
  if (cekEmail.length > 0) {
    throw new Error("Email sudah terdaftar");
  }

// hash password biar aman
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

// insert ke database
  const [hasil] = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  console.log('User baru berhasil didaftarkan:', email);

  return { 
    id: hasil.insertId, 
    name, 
    email, 
    role 
  };
};

// login user - cek email dan password
const loginUser = async (email, password) => {
  
  // cari user berdasarkan email
  const [dataUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  
  if (dataUser.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = dataUser[0];

  // cek password cocok ga
  const passwordBenar = await bcrypt.compare(password, user.password);
  
  if (!passwordBenar) {
    throw new Error("Invalid email or password");
  }

  console.log('Login berhasil untuk user:', user.name);

  // return user tanpa password (biar aman)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export { registerUser, loginUser };
