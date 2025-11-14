import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location.state?.from?.pathname || '/product';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await auth.login(email, password);
    setLoading(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-[#0B0F0A] p-8 rounded-3xl border border-white/5">
        <h2 className="text-2xl font-semibold mb-6">Sign in to VeriChain</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-4 py-3 rounded-lg bg-[#0C0F0A] border border-white/10" required />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-3 rounded-lg bg-[#0C0F0A] border border-white/10" required />
          <button className="w-full py-3 rounded-xl bg-[#02FDA9] text-[#0C0F0A]" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
