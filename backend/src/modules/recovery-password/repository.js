import connection from '../../config/database.js';

export function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
}

export function updateResetToken(email, token, expiry) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE users 
      SET reset_token = ?, reset_token_expiry = ?
      WHERE email = ?
    `;

    connection.query(sql, [token, expiry, email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function findUserByResetToken(token) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE reset_token = ?";

    connection.query(sql, [token], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
}

export function updatePassword(userId, hashedPassword) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE users 
      SET password = ?, reset_token = NULL, reset_token_expiry = NULL
      WHERE id = ?
    `;

    connection.query(sql, [hashedPassword, userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}