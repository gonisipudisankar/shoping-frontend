import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) navigate(`/?search=${search}`);
  };

  return (
    <nav className="bg-blue-600 px-6 py-3 flex items-center gap-4 sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex flex-col min-w-[120px]">
        <span className="text-white text-xl font-bold">🛒 Shoping</span>
        <span className="text-yellow-300 text-xs italic">Explore Plus</span>
      </Link>

      {/* Search */}
      <div className="flex flex-1 max-w-2xl rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-white px-4 py-2 text-lg hover:bg-gray-100">
          🔍
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex gap-4 ml-auto">
        <Link to="/cart"
          className="text-white text-sm font-medium px-3 py-2 rounded hover:bg-blue-700">
          🛒 Cart
        </Link>
        <Link to="/orders"
          className="text-white text-sm font-medium px-3 py-2 rounded hover:bg-blue-700">
          📦 Orders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;