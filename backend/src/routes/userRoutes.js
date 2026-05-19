import { Router } from 'express';
import { deleteAccountController, updateUserController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.delete('/delete-account', authMiddleware, deleteAccountController);
router.put('/update-profile', authMiddleware, updateUserController);

export default router;