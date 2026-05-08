import { logout } from '../services/sessionService';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
      <p className="mb-6">
        Usuário autenticado
      </p>
      <Button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded">
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;