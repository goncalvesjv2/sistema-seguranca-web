import { logout } from '../services/sessionService';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardServices';
import { deleteAccount, updateProfile } from '../services/userService';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      const response = await getDashboard();

      if(response.user) {
        setUser(response.user);
        setName(response.user.name);
        setEmail(response.user.email);
      }
    }

    loadDashboard();
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  async function handleDeleteAccount() {
    setError('');
    setMessage('');

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
      setError(error.message);
    }
  }

  async function handleUpdateProfile() {
    setError('');
    setMessage('');
    
    try {
      const response = await updateProfile(name, email);

      setUser({
        ...user,
        name,
        email
      })

      setMessage(response.message);
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {message && (
        <p className="text-green-500 mb-4">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

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

      {!editing ? (
        <Button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-6 py-2 rounded">
          Editar Perfil
        </Button>
      ): (
        <div className="flex flex-col gap-3 w-80 mb-4">
          <Input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-6 py-2 rounded">
            Salvar 
          </Button>
          <Button onClick={() => setEditing(false)} className="bg-gray-500 text-white px-6 py-2 rounded">
            Cancelar
          </Button>
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