import crypto from 'crypto';

export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateExpiry(minutes = 15) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function isTokenExpired(expiryDate) {
  return new Date(expiryDate) < new Date();
}