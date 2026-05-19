import { getToken } from './sessionService';

export async function deleteAccount() {
  const token = getToken();

  const response = await fetch('https://localhost:3000/users/delete-account', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateProfile(name, email) {
  const token = getToken();

  const response = await fetch(
    'https://localhost:3000/users/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        email
      })
    });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}