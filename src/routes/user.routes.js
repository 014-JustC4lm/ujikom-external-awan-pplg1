import express from 'express';
import {
    getUsers,
    createUser,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

// semua route bisa diakses langsung (no auth)
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;