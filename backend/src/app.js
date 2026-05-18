import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import recoveryRoutes from './modules/recovery-password/routes.js';
import sessionRoutes from './routes/sessionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/recovery', recoveryRoutes);
app.use('/session', sessionRoutes);

export default app;