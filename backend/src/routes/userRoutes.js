import { Router } from 'express';
import { deleteAccountController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.delete('/delete-account', authMiddleware, deleteAccountController);

export default router;