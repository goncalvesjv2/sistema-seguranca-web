import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import recoveryRoutes from './modules/recovery-password/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/recovery', recoveryRoutes);

export default app;