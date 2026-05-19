import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import twoFactorStorage from '../storage/twoFactorStorage.js';
import { securityLogger } from '../utils/securityLogger.js';

dotenv.config();

export function verify2FAService(tempToken, code) {

    const data = twoFactorStorage[tempToken];

    // Token não existe
    if (!data) {
        securityLogger(
            '2FA FAILED',
            'Sessão 2FA inválida' 
        )

        throw {
            status: 401,
            message: 'Sessão 2FA inválida'
        };
    }

    // Verificar expiração
    const now = Date.now();
    const expired = now > (data.createdAt + data.expiresIn);

    if (expired) {
        delete twoFactorStorage[tempToken];
        throw {
            status: 401,
            message: 'Código 2FA expirado'
        };
    }

    // Verificar código
    if (data.code !== code) {
        securityLogger(
            '2FA FAILED',
            `Código inválido para: ${data.user.email}`
        );

        throw {
            status: 401,
            message: 'Código inválido'
        };
    }

    const user = data.user;

    // Gerar token JWT final
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
    );

    securityLogger(
        '2FA SUCCESS',
        `Usuário autenticado: ${user.email}`
    );
    
    // Remover 2FA temporário
    delete twoFactorStorage[tempToken];

    return {
        message: 'Login realizado',
        token
    };
}