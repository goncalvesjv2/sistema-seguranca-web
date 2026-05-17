import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import twoFactorStorage from '../storage/twoFactorStorage.js';

dotenv.config();

export function verify2FAService(tempToken, code) {

    const data = twoFactorStorage[tempToken];

    if (!data) {
        throw {
            status: 401,
            message: 'Sessão 2FA inválida'
        };
    }

    if (data.code !== code) {
        throw {
            status: 401,
            message: 'Código inválido'
        };
    }

    const user = data.user;

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

    delete twoFactorStorage[tempToken];

    return {
        message: 'Login realizado',
        token
    };
}