import * as loanService from '../services/loan.service.js';

// buat request loan baru
const createLoan = async (req, res) => {
  try {
    const { item_id, start_date, end_date, description } = req.body;


    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        msg: "Unauthorized. Kamu harus login dulu.",
        code: 401
      });
    }

    if (!item_id || !start_date || !end_date) {
      return res.status(400).json({ 
        msg: "Data loan belum lengkap", 
        code: 400 
      });
    }

    console.log('Ada request loan baru, user:', userId, 'item:', item_id);

    const dataLoan = await loanService.createLoan(
      userId, 
      item_id, 
      start_date, 
      end_date, 
      description
    );

    res.status(201).json({ 
      msg: "Request loan berhasil dibuat!", 
      code: 201, 
      data: dataLoan 
    });
  } catch (error) {
    console.log('Error create loan:', error.message);
    res.status(400).json({ 
      msg: error.message, 
      code: 400 
    });
  }
};

// ambil semua loan
const getLoans = async (req, res) => {
  try {

    const isAdmin = req.user?.role === 'admin';
    const userId = req.user?.id;

    console.log(`Request ambil loans. User ID: ${userId}, IsAdmin: ${isAdmin}`);

    const daftarLoan = await loanService.getAllLoans(userId, isAdmin);

    res.status(200).json({ 
      msg: "Berhasil ambil data", 
      code: 200, 
      data: daftarLoan 
    });
  } catch (error) {
    console.log('Error get loans:', error.message);
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

// ambil detail loan by ID
const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataLoan = await loanService.getLoanById(id);

    if (!dataLoan) {
      return res.status(404).json({ 
        msg: "Data loan tidak ditemukan", 
        code: 404 
      });
    }

    // Security check
    if (req.user.role !== 'admin' && dataLoan.user_id !== req.user.id) {
      return res.status(403).json({ 
        msg: "Kamu ga punya akses ke data ini", 
        code: 403 
      });
    }

    res.status(200).json({ 
      msg: "Successfully", 
      code: 200, 
      data: dataLoan 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error", 
      code: 500, 
      data: error.message 
    });
  }
};

// approve loan (admin only)
const approveLoan = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('Admin mau approve loan, ID:', id);
    
    await loanService.approveLoan(id);

    res.status(200).json({ 
      msg: "Loan berhasil di approve!", 
      code: 200 
    });
  } catch (error) {
    console.log('Error approve loan:', error.message);
    res.status(400).json({ 
      msg: error.message, 
      code: 400 
    });
  }
};

// reject loan (admin only)
const rejectLoan = async (req, res) => {
  try {
    const { id } = req.params;
    await loanService.rejectLoan(id);

    console.log('Loan rejected, ID:', id);

    res.status(200).json({ 
      msg: "Loan ditolak", 
      code: 200 
    });
  } catch (error) {
    res.status(400).json({ 
      msg: error.message, 
      code: 400 
    });
  }
};

// approve return (admin only)
const approveReturn = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('Admin approve return, ID:', id);
    
    await loanService.approveReturn(id);

    res.status(200).json({ 
      msg: "Return berhasil di approve!", 
      code: 200 
    });
  } catch (error) {
    res.status(400).json({ 
      msg: error.message, 
      code: 400 
    });
  }
};

// hapus loan
const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    
    const isAdmin = req.user?.role === 'admin';
    const userId = req.user?.id;


    const affectedRows = await loanService.deleteLoan(id, userId, isAdmin);

    if (affectedRows === 0) {
      return res.status(404).json({ 
        msg: "Loan ga ketemu atau kamu ga punya hak hapus data ini", 
        code: 404 
      });
    }

    console.log('Loan berhasil dihapus, ID:', id);

    res.status(200).json({ 
      msg: "Loan berhasil dihapus", 
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

export { 
  createLoan, 
  getLoans, 
  getLoanById, 
  approveLoan, 
  rejectLoan, 
  approveReturn,
  deleteLoan
};