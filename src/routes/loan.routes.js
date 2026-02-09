import express from 'express';
import { 
  createLoan, 
  getLoans, 
  getLoanById, 
  approveLoan, 
  rejectLoan, 
  approveReturn,
  deleteLoan
} from '../controllers/loan.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// semua route harus login dulu (pake verifyToken)
router.post('/', verifyToken, createLoan);
router.get('/', verifyToken, getLoans);
router.get('/:id', verifyToken, getLoanById);
router.delete('/:id', verifyToken, deleteLoan);

// route admin only
router.put('/:id/approve', verifyToken, isAdmin, approveLoan);
router.put('/:id/reject', verifyToken, isAdmin, rejectLoan);
router.put('/:id/return', verifyToken, isAdmin, approveReturn);

export default router;
