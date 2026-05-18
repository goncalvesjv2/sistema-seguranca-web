import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import blacklistTokens from '../storage/blacklistTokens.js';

dotenv.config();

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
    
    // Token não enviado
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    // Token revogado
    if (blacklistTokens.has(token)) {
        return res.status(401).json({ message: 'Sessão inválida' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}