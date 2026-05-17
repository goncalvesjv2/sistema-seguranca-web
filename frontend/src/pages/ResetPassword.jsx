import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const [params] = useSearchParams();
  const token = params.get('token');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/recovery/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        password
      })
    });

    const data = await res.json();
    
    if (!res.ok) {
      setMsg(data.error || 'Erro ao redefinir senha');
      return;
    }

    setMsg(data.message || 'Senha redefinida com sucesso');
    setPassword('');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h1>Redefinir senha</h1>

        <input type="password" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 my-4 w-full" />

        <button className="bg-green-500 text-white p-2 mt-2 w-full">
          Salvar
        </button>

        {msg && (
          <p className="my-4 text-sm text-green-500">{msg}</p>
        )}
      </form>

      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Voltar
      </Link>
    </div>
  );
}