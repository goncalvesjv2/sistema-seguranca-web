import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';    
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;