import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, loading, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const result = await login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center px-5 py-12">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">Authenticate to manage vehicle records.</p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:ring focus:ring-neonBlue/40"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:ring focus:ring-neonBlue/40"
            required
          />
        </div>

        {error && <p className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-2 text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-neonBlue px-4 py-3 font-semibold text-asphalt disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
