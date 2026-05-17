import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/loginSchema';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    setApiError('');

    const response = await login(data);
    console.log(response);
    // Erro na API
    if (response?.error) {
      setApiError(response.error);
      return;
    }

    // Login com sucesso
    if (!response?.tempToken) {
      setApiError('Resposta inesperada da API');
      return;
    }

    localStorage.setItem('tempToken', response.tempToken);
    navigate('/verify-2fa');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {apiError && (
          <p className="text-red-500 mb-4">
            {apiError}
          </p>
        )}

        <Input type="email" placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 mb-2">
            {errors.email.message}
          </p>
        )}

        <Input type="password" placeholder="Senha" {...register('password')} />
        {errors.password && (
          <p className="text-red-500 mb-2">
            {errors.password.message}
          </p>
        )}

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