export function createSession() {
  localStorage.setItem('token', 'valid-token');
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}