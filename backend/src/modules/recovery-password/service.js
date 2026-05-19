import bcrypt from 'bcrypt';
import { sendRecoveryEmail } from './mailTemplate.js';
import { findUserByEmail, updateResetToken, findUserByResetToken, updatePassword } from './repository.js';
import { generateResetToken, generateExpiry } from './tokens.js';
import { securityLogger } from '../../utils/securityLogger.js';

export function requestReset(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await findUserByEmail(email);
      const token = generateResetToken();
      const expiry = generateExpiry(15);

      if (user) {
        await updateResetToken(email, token, expiry);
        securityLogger(
          'PASSWORD RESET REQUEST',
          `Solicitação de redefinição de senha para: ${email}`
        );
      }

      console.log('Token gerado:', token); // Log do token para testes

      resolve({ message: 'Redirecionando para redefinição de senha', token }); // Retorna o token para testes

    } catch (err) {
      reject({ status: 500, message: err.message });
    }
  });
}

export function performReset(token, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await findUserByResetToken(token);

      if (!user) {
        return reject({ status: 401, message: 'Token inválido' });
      }

      if (new Date(user.reset_token_expiry) < new Date()) {
        return reject({ status: 401, message: 'Token expirado' });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      await updatePassword(user.id, hashed);
      
      securityLogger(
        'PASSWORD RESET SUCCESS',
        `Senha redefinida: ${user.email}`
      );

      resolve({ message: 'Senha redefinida com sucesso' });

    } catch (err) {
      reject({ status: 500, message: err.message });
    }
  });
}