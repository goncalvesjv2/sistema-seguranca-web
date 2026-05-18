import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

import errorMiddleware from './middlewares/errorMiddleware.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);


// Middleware 404
app.use(notFoundMiddleware);

// Middleware global de erro
app.use(errorMiddleware);

export default app;