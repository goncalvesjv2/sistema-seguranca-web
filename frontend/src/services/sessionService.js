export function createSession(token) {
  localStorage.setItem('token', token);
}

export async function logout() {
  const token = localStorage.getItem('token');

  try {
    await fetch('http://localhost:3000/session/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
  }

  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}