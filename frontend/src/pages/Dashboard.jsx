import { logout } from '../services/sessionService';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardServices';
import { deleteAccount } from '../services/userService';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const response = await getDashboard();

      if(response.user) {
        setUser(response.user);
      }
    }

    loadDashboard();
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  async function handleDeleteAccount() {
    const confirm = window.confirm('Tem certeza que deseja excluir sua conta?');

    if (!confirm) {
      return;
    }

    try {
      const response = await deleteAccount();
      setMessage(response.message);
      setTimeout(async () => {
        await logout();
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {user && (
        <div>
          <p className="mb-2">
            Nome: {user.name}
          </p>
          <p className="mb-6">
            Email: {user.email}
          </p>
        </div>
      )}

      <div className='flex flex-col mt-4'>
        <p className="mb-6">
          Usuário autenticado
        </p>
        <Button onClick={handleLogout} className="bg-gray-500 text-white px-6 py-2 rounded">
          Logout
        </Button>
        
        <Button onClick={handleDeleteAccount} className="bg-red-500 text-white px-6 py-2 rounded mt-4">
          Excluir Conta
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;