export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    
    if (token !== 'valid-token') {
        return res.status(403).json({ message: 'Token inválido' });
    }

    next();
}
