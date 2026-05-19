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