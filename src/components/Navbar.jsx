import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${search}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <nav className="bg-blue-600 px-3 sm:px-6 py-2 sm:py-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex flex-col min-w-[90px] sm:min-w-[120px]">
          <span className="text-white text-base sm:text-xl font-bold">🛒 Shoping</span>
          <span className="text-yellow-300 text-[10px] sm:text-xs italic hidden sm:block">Explore Plus</span>
        </Link>

        {/* Search - hidden on mobile, shown on sm+ */}
        <div className="hidden sm:flex flex-1 max-w-2xl rounded overflow-hidden">
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

        {/* Mobile search toggle */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="sm:hidden text-white text-xl px-2 ml-auto">
          🔍
        </button>

        {/* Nav Links */}
        <div className="flex gap-1 sm:gap-4 sm:ml-auto">
          <Link to="/cart"
            className="text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-blue-700 whitespace-nowrap">
            🛒 <span className="hidden md:inline">Cart</span>
          </Link>
          <Link to="/orders"
            className="text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-blue-700 whitespace-nowrap">
            📦 <span className="hidden md:inline">Orders</span>
          </Link>
        </div>
      </div>

      {/* Mobile search bar - shown below navbar on small screens when toggled */}
      {showMobileSearch && (
        <div className="flex sm:hidden mt-2 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
            autoFocus
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-white px-4 py-2 text-lg hover:bg-gray-100">
            🔍
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;