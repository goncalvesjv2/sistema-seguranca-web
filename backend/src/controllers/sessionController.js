import blacklistTokens from '../storage/blacklistTokens.js';

export function logout(req, res) {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token não fornecido'
        });
    }

    const token = authHeader.split(' ')[1];
    blacklistTokens.add(token);

    return res.status(200).json({
        message: 'Logout realizado'
    });
}