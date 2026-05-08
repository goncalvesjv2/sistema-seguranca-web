import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';

function Register() {
  
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');
    
    const response = await register({ name, email, password });
    
    if (response.error) {
      setError(response.error);
    } else {
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">
          Cadastro
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <Input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <Button className="bg-blue-500 text-white w-full p-2 rounded" type="submit">
          Cadastrar
        </Button>
        <p className="mt-4 text-center">
          Já possui conta?
          <Link to="/" className="text-blue-500 ml-2">
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;