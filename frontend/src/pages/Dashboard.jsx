import { logout } from '../services/sessionService';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardServices';

function Dashboard() {

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

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {user && (
        <>
          <p className="mb-2">
            Nome: {user.name}
          </p>
          <p className="mb-6">
            Email: {user.email}
          </p>
        </>
      )}

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