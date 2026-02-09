import * as userService from '../services/user.service.js';

// ambil semua user
const getUsers = async (req, res) => {
  try {
    console.log('Request ambil semua users');
    
    const daftarUser = await userService.getAllUsers();
    
    res.status(200).json({ 
      msg: "Berhasil ambil data", 
      code: 200, 
      data: daftarUser 
    });
  } catch (error) {
    console.log('Error get users:', error.message);
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};



// ambil user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await userService.getUserById(id);

    if (!dataUser) {
      return res.status(404).json({ 
        msg: "User tidak ditemukan", 
        code: 404 
      });
    }

    res.status(200).json({ 
      msg: "Successfully", 
      code: 200, 
      data: dataUser 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};



// buat user baru (admin)
const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    
    console.log('Admin mau buat user baru:', name);
    
    const userBaru = await userService.createUser(name);

    res.status(201).json({ 
      msg: "User berhasil dibuat!", 
      code: 201, 
      data: userBaru 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

// update user (admin)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // validasi
    if (!name || !email || !role) {
      return res.status(400).json({ 
        msg: "Name, email, dan role harus diisi", 
        code: 400 
      });
    }

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ 
        msg: "Role harus 'admin' atau 'user'", 
        code: 400 
      });
    }

    const affectedRows = await userService.updateUser(id, { name, email, role });

    if (affectedRows === 0) {
      return res.status(404).json({ 
        msg: "User tidak ditemukan", 
        code: 404 
      });
    }

    res.status(200).json({ 
      msg: "User berhasil diupdate", 
      code: 200 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

// hapus user (admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('Admin mau hapus user, ID:', id);
    
    const affectedRows = await userService.deleteUser(id);

    if (affectedRows === 0) {
      return res.status(404).json({ 
        msg: "User tidak ditemukan", 
        code: 404 
      });
    }

    res.status(200).json({ 
      msg: "User berhasil dihapus", 
      code: 200 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };