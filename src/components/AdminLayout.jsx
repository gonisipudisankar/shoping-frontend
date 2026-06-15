import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-blue-700 text-white flex items-center justify-between px-4 py-3 z-50 shadow">
        <h1 className="text-lg font-bold">🛒 Shoping Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-60 bg-blue-700 text-white flex flex-col fixed h-full z-40 transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

        {/* Logo (desktop) */}
        <div className="p-5 border-b border-blue-600 hidden md:block">
          <h1 className="text-xl font-bold">🛒 Shoping</h1>
          <p className="text-blue-200 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Spacer for mobile top bar */}
        <div className="p-5 border-b border-blue-600 md:hidden mt-14">
          <p className="text-blue-200 text-xs">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
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
            onClick={() => setSidebarOpen(false)}
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
      <div className="flex-1 w-full md:ml-60 p-4 md:p-6 pt-20 md:pt-6 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;