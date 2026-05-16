import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Usuário autenticado', user: req.user });
});

export default router;