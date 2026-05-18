import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../config/database.js';
import { generate2FA } from '../utils/generate2FA.js';
import twoFactorStorage from '../storage/twoFactorStorage.js';
import dotenv from 'dotenv';
import { securityLogger } from '../utils/securityLogger.js';
import { send2FACode } from './mailService.js';

dotenv.config();

let loginAttempts = {};

export const registerService = async ( name, email, password ) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users(name, email, password)
    VALUES (?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    connection.query(
      sql,
      [name, email, hashedPassword],
      (error, results) => {

        if (error) {
          return reject({
            status: 500,
            message: error.message
          });
        }

        resolve(results);
      }
    );

  });
};

export const loginService = async (email, password) => {
  const sql = ` SELECT * FROM users WHERE email = ?`;

  return new Promise((resolve, reject) => {

    connection.query(
      sql,
      [email],
      async (error, results) => {

        // Erro MySQL
        if (error) {
          return reject({
            status: 500,
            message: error.message
          });
        }

        // Usuário não encontrado
        if (results.length === 0) {

          securityLogger(
            'Login Failed',
            `Usuário não encontrado para email: ${email}`
          )

          return reject({
            status: 401,
            message: 'Usuário não encontrado'
          });
        }

        const user = results[0];

        // Validar senha
        const validPassword = await bcrypt.compare(password, user.password);

        // Senha inválida
        if (!validPassword) {

          securityLogger(
            'LOGIN FAILED',
            `Senha inválida: ${email}`
          );

          loginAttempts[email] = (loginAttempts[email] || 0) + 1;

          // Aplicar delay
          await applyDelay(email);

          // Bloquear após 4 tentativas
          if (loginAttempts[email] >= 4) {
            
            securityLogger(
              'ACCOUNT BLOCKED',
              `Muitas tentativas: ${email}`
            )
            
            return reject({
              status: 403,
              message:
                'Muitas tentativas de login. Tente novamente mais tarde.'
            });
          }

          return reject({status: 401, message: `Senha inválida. Tentativas: ${loginAttempts[email]}`});
        }

        // Resetar tentativas
        loginAttempts[email] = 0;

        // Gerar código 2FA
        const code2FA = generate2FA();

        // Enviar código por email
        try {
          await send2FACode(email, code2FA);
          securityLogger(
            'LOGIN SUCCESS',
            `2FA enviado para ${email}`
          );
        } catch (err) {
          securityLogger(
            'EMAIL ERROR',
            `Falha ao enviar 2FA para ${email}: ${err.message}`
          );

          return reject({
            status: 500,
            message: 'Erro ao enviar código 2FA'
          });
        }

        // Token temporário
        const tempToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '10m' }
        );

        // Salvar código 2FA
        twoFactorStorage[tempToken] = { 
          code: code2FA, 
          user,
          createdAt: Date.now(),
          expiresIn: 5 * 60 * 1000 // 5 minutos
        };

        resolve({ message: '2FA enviado', tempToken });
      }
    );
  });
};

async function applyDelay(email) {
  const attempts = loginAttempts[email] || 1;

  const delay = attempts * 1000; // 1 segundo por tentativa
  console.log(`Aplicando delay de ${delay}ms para ${email}`);

  return new Promise(resolve => setTimeout(resolve, delay));
}