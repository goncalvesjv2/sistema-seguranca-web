import { useState } from 'react';
import { verify2FA } from '../services/authService';
import { createSession } from '../services/sessionService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Verify2FA() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleVerify(e) {
    e.preventDefault();

    const tempToken = localStorage.getItem('tempToken');

    const response = await verify2FA({code, tempToken});
    console.log('Resposta da verificação 2FA:', response);
    
    if (response?.token) {
      localStorage.setItem('token', response.token);
      localStorage.removeItem('tempToken');
      navigate('/dashboard');
    } else {
      setError(response?.error || response?.message || 'Código inválido');
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