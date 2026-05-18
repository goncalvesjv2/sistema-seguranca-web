import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('https://localhost:3000/recovery/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || 'Erro ao solicitar recuperação');
        return;
      }

      setMsg('Redirecionando...')

      setTimeout(() => {
        navigate(`/reset-password?token=${data.token || data.fakeToken}`);
      }, 2000);
     
    } catch (error) {
      setMsg('Erro ao solicitar recuperação');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h1>Esqueci minha senha</h1>

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full my-4" />

        <button disabled={loading} className="bg-blue-500 text-white p-2 mt-2 w-full">
          {loading ? 'Enviando...' : 'Enviar email'}
        </button>

        {msg && (
          <p className="my-4 text-sm text-gray-600">{msg}</p>
        )}
      </form>
    </div>
  );
}