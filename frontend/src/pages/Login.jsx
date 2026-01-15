import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(email, password);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-white/70 text-sm">Authenticate to access your dashboard.</p>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-white/80">Email</label>
              <input
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-white/80">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">Login</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
