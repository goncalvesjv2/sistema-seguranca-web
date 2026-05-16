import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validations/registerSchema';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    setApiError('');

    const response = await register(data);

    // Erro na API
    if (response.error) {
      setApiError(response.error);
      return;
    } 
      
    alert('Cadastro realizado com sucesso!');
    navigate('/');
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">
          Cadastro
        </h1>

        {apiError && (
          <p className="text-red-500 mb-4">
            {apiError}
          </p>
        )}

        <Input type="text" placeholder="Nome" {...formRegister('name')} />
        {errors.name && (
          <p className="text-red-500 mb-2">
            {errors.name.message}
          </p>
        )}

        <Input type="email" placeholder="Email" {...formRegister('email')} />
        {errors.email && (
          <p className="text-red-500 mb-2">
            {errors.email.message}
          </p>
        )}

        <Input type="password" placeholder="Senha" {...formRegister('password')} />
        {errors.password && (
          <p className="text-red-500 mb-2">
            {errors.password.message}
          </p>
        )}

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