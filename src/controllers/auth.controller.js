import * as authService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/auth.middleware.js';

// fungsi register user baru
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

// validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        msg: "Data belum lengkap", 
        code: 400 
      });
    }

    console.log('Ada yang mau daftar:', email);

    const dataUser = await authService.registerUser(name, email, password, role);

    res.status(201).json({ 
      msg: "Registrasi berhasil!", 
      code: 201, 
      data: dataUser 
    });
  } catch (error) {
    console.log('Error register:', error.message);
    res.status(400).json({ 
      msg: "Gagal daftar: " + error.message, 
      code: 400 
    });
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        msg: "Email dan password harus diisi", 
        code: 400 
      });
    }

    console.log('Ada yang mau login:', email);

    const dataUser = await authService.loginUser(email, password);

// bikin token JWT
    const token = jwt.sign(
      { id: dataUser.id, email: dataUser.email, role: dataUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Login sukses:', dataUser.name, '- Role:', dataUser.role);

    res.status(200).json({ 
      msg: "Login sukses!", 
      code: 200, 
      data: { user: dataUser, token } 
    });
  } catch (error) {
    console.log('Login gagal:', error.message);
    res.status(401).json({ 
      msg: "Email atau password salah", 
      code: 401 
    });
  }
};

export { register, login };
