import connection from '../config/database.js';
import { securityLogger } from '../utils/securityLogger.js';

export function deleteAccountService(userId) {

  return new Promise((resolve, reject) => {

    const sql = `
      DELETE FROM users
      WHERE id = ?
    `;

    connection.query(sql, [userId], (error, result) => {

      if (error) {
        return reject({
          status: 500,
          message: error.message
        });
      }

      securityLogger(
        'ACCOUNT DELETED',
        `Usuário removido: ID ${userId}`
      );

      resolve({
        message: 'Conta removida com sucesso'
      });
    });
  });
}

export function updateUserService(userId, name, email) {

  email = email.toLowerCase().trim();

  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE users
      SET name = ?, email = ?
      WHERE id = ?
    `;

    connection.query(
      sql,
      [name, email, userId],
      (error, result) => {

        if (error) {
          return reject({
            status: 500,
            message: error.message
          });
        }

        securityLogger(
          'ACCOUNT UPDATED',
          `Usuário atualizado: ID ${userId}`
        );

        resolve({
          message: 'Conta atualizada com sucesso'
        });
      }
    );
  });
}