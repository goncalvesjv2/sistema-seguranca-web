import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');

    const response = await login({ email, password });
    
    if (response.code2FA) {
      localStorage.setItem('2fa', response.code2FA );
      navigate('/verify-2fa');
    } else {
      setError(response.message || 'Erro ao fazer login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 my-2">{error}</p>}
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <Button className="bg-blue-500 text-white w-full p-2 rounded" type="submit">
          Entrar
        </Button>
        <p className="mt-4 text-center">
          Não possui conta?
          <Link to="/register" className="text-blue-500 ml-2">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;