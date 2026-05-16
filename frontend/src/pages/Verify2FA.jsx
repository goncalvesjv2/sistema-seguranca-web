import { useState } from 'react';
import { createSession } from '../services/sessionService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Verify2FA() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleVerify(e) {
    e.preventDefault();

    if (!code) {
      setError('Digite o código');
      return;
    }

    setError('');

    const savedCode = localStorage.getItem('2fa');
    const savedToken = localStorage.getItem('token');

    if (code === savedCode) {
      localStorage.removeItem('2fa');
      createSession(savedToken);
      navigate('/dashboard');
    } else {
      setError('Código inválido');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">
          Verificação 2FA
        </h1>

        <Input type="text" placeholder="Código" onChange={(e) => setCode(e.target.value)}/>
        {error && <p className="text-red-500 my-2">{error}</p>}
        <Button className="bg-blue-500 text-white w-full p-2 rounded" type="submit">
          Validar
        </Button>
      </form>
    </div>
  );
}

export default Verify2FA;