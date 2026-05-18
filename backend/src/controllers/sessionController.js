import blacklistTokens from '../storage/blacklistTokens.js';
import { securityLogger } from '../utils/securityLogger.js';

export function logout(req, res) {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token não fornecido'
        });
    }

    const token = authHeader.split(' ')[1];
    blacklistTokens.add(token);

    securityLogger(
        'LOGOUT',
        `Sessão encerrada: ${req.user.email}`
    )

    return res.status(200).json({
        message: 'Logout realizado'
    });
}