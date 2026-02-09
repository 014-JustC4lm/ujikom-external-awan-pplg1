import * as itemService from '../services/item.service.js';

// ambil semua alat (bisa filter kategori)
const getItems = async (req, res) => {
  try {
    const category = req.query.category;
    
    console.log('Request ambil alat, kategori:', category || 'semua');
    
    const daftarAlat = await itemService.getAllItems(category);

    res.status(200).json({ 
      msg: "Berhasil ambil data", 
      code: 200, 
      data: daftarAlat 
    });
  } catch (error) {
    console.log('Error get items:', error.message);
    res.status(500).json({ 
      msg: "Maaf, ada masalah saat mengambil data alat", 
      code: 500, 
      data: error.message 
    });
  }
};

// ambil detail alat by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const alat = await itemService.getItemById(id);

    if (!alat) {
      return res.status(404).json({ 
        msg: "Alat yang kamu cari ga ketemu", 
        code: 404 
      });
    }

    res.status(200).json({ 
      msg: "Successfully", 
      code: 200, 
      data: alat 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

// tambah alat baru (admin)

const createItem = async (req, res) => {
  try {
    const { name, category, description, image } = req.body;

    if (!name || !category) {
      return res.status(400).json({ 
        msg: "Nama alat dan kategori harus diisi", 
        code: 400 
      });
    }

    console.log('Admin mau tambah alat baru:', name);

    const alatBaru = await itemService.createItem(name, category, description, image);

    res.status(201).json({ 
      msg: "Alat berhasil ditambahkan!", 
      code: 201, 
      data: alatBaru 
    });
  } catch (error) {
    console.log('Error create item:', error.message);
    res.status(500).json({ 
      msg: "Gagal menambahkan alat", 
      code: 500, 
      data: error.message 
    });
  }
};

// update data alat (admin)
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, image, status } = req.body;

    const affectedRows = await itemService.updateItem(
      id, 
      name, 
      category, 
      description, 
      image, 
      status
    );

    if (affectedRows === 0) {
      return res.status(404).json({ 
        msg: "Item ga ketemu", 
        code: 404 
      });
    }

    console.log('Item berhasil diupdate, ID:', id);

    res.status(200).json({ 
      msg: "Item berhasil diupdate", 
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

// hapus alat (admin)
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await itemService.deleteItem(id);

    if (affectedRows === 0) {
      return res.status(404).json({ 
        msg: "Item tidak ditemukan", 
        code: 404 
      });
    }

    console.log('Item berhasil dihapus, ID:', id);

    res.status(200).json({ 
      msg: "Item berhasil dihapus", 
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

export { getItems, getItemById, createItem, updateItem, deleteItem };
