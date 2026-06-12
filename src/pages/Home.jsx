import React, { useEffect, useState } from 'react';
import { getAllProducts, searchProducts, addToCart, getAllCategories, getProductsByCategory } from '../services/api';
import { Link, useLocation } from 'react-router-dom';

const SESSION_ID = 'user-session-001';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Load categories once
  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  // Load products when category or search changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    if (searchQuery) {
      searchProducts(searchQuery)
        .then(res => { setProducts(res.data); setLoading(false); });
    } else if (selectedCategory) {
      getProductsByCategory(selectedCategory)
        .then(res => { setProducts(res.data); setLoading(false); });
    } else {
      getAllProducts()
        .then(res => { setProducts(res.data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [location.search, selectedCategory]);

  const handleAddToCart = (productId) => {
    addToCart(SESSION_ID, productId, 1)
      .then(() => alert('Added to cart!'))
      .catch(() => alert('Error adding to cart'));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading products...
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Banner */}
      <div className="bg-blue-600 text-white text-center py-3 text-sm font-medium tracking-wide">
        🎉 Big Billion Days Sale — Up to 80% Off!
      </div>

      {/* Category Bar */}
      <div className="bg-white flex gap-4 px-8 py-4 overflow-x-auto shadow-sm">

        {/* All Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap
            ${selectedCategory === null
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
            }`}>
          🏠 All
        </button>

        {/* Category Buttons */}
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap
              ${selectedCategory === cat.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'All Products'}
            <span className="text-sm text-gray-400 ml-2">
              ({products.length} items)
            </span>
          </h2>

          {/* Admin Only */}
          {localStorage.getItem('isAdmin') === 'true' && (
            <Link to="/admin/product/add"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
              + Add Product
            </Link>
          )}
        </div>

        {/* No Products */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded shadow">
            <p className="text-gray-400 text-lg">No products found.</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded text-sm">
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map(product => (
              <div key={product.id}
                className="bg-white rounded shadow hover:shadow-md transition-shadow">

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl || 'https://placehold.co/200x200'}
                    alt={product.name}
                    className="w-full h-44 object-contain p-3 bg-gray-50"
                    onError={e => e.target.src = 'https://placehold.co/200x200'}
                  />
                </Link>

                {/* Info */}
                <div className="p-3">
                  <Link to={`/product/${product.id}`}>
                    <p className="text-sm font-medium text-gray-800 truncate hover:text-blue-600">
                      {product.name}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-400 mb-1">
                    {product.category?.name}
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-gray-900">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      10% off
                    </span>
                  </div>
                  <p className={`text-xs mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white text-xs font-bold py-2 rounded">
                      🛒 Cart
                    </button>
                    <Link to={`/product/${product.id}`}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded text-center">
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;