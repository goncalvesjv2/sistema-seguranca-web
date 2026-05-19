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