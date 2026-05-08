import bcrypt from 'bcrypt';
import connection from '../config/database.js';
import { generate2FA } from '../utils/generate2FA.js';

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

        // ERRO MYSQL
        if (error) {
          return reject({
            status: 500,
            message: error.message
          });
        }

        // USUÁRIO NÃO ENCONTRADO
        if (results.length === 0) {
          return reject({
            status: 401,
            message: 'Usuário não encontrado'
          });
        }

        const user = results[0];

        // VALIDAR SENHA
        const validPassword = await bcrypt.compare(password, user.password);

        // SENHA INVÁLIDA
        if (!validPassword) {
          loginAttempts[email] = (loginAttempts[email] || 0) + 1;

          // BLOQUEAR APÓS 3 TENTATIVAS
          if (loginAttempts[email] >= 3) {
            return reject({
              status: 403,
              message:
                'Muitas tentativas de login. Tente novamente mais tarde.'
            });
          }

          return reject({status: 401, message: 'Senha inválida'});
        }

        // RESETAR TENTATIVAS
        loginAttempts[email] = 0;

        // GERAR CÓDIGO 2FA
        const code2FA = generate2FA();

        console.log('Código 2FA:', code2FA);

        resolve({ message: '2FA enviado', code2FA });
      }
    );
  });
};