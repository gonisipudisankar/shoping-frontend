import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📦', label: 'Products' },
    { path: '/admin/orders', icon: '📋', label: 'Orders' },
    { path: '/admin/categories', icon: '🗂️', label: 'Categories' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-60 bg-blue-700 text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-5 border-b border-blue-600">
          <h1 className="text-xl font-bold">🛒 Shoping</h1>
          <p className="text-blue-200 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition
                ${location.pathname === item.path
                  ? 'bg-white text-blue-700'
                  : 'text-blue-100 hover:bg-blue-600'
                }`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-blue-600 space-y-1">
          <Link to="/"
            className="flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-blue-100 hover:bg-blue-600">
            🏠 View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-blue-100 hover:bg-blue-600">
            🔓 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-60 flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;