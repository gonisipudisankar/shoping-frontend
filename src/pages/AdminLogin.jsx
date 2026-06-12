import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('❌ Wrong password! Access denied.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded shadow p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">🔒 Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Only authorized owners</p>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
            className="w-full border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">
            Login as Admin
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2 text-sm text-gray-500 hover:text-blue-600">
            ← Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;