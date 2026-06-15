import React, { useEffect, useState } from 'react';
import { getAllProducts, searchProducts, addToCart, getAllCategories, getProductsByCategory } from '../services/api';
import { Link, useLocation } from 'react-router-dom';

const SESSION_ID = 'user-session-001';

const BANNERS = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
    title: '🎉 Big Billion Days Sale',
    subtitle: 'Up to 80% Off on Electronics & Fashion',
    bg: 'bg-blue-600'
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
    title: '👟 Fashion Fiesta',
    subtitle: 'Flat 50% Off on Footwear & Apparel',
    bg: 'bg-purple-600'
  },
  {
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=400&fit=crop',
    title: '📱 Mobile Bonanza',
    subtitle: 'Exchange Offers + No Cost EMI',
    bg: 'bg-orange-600'
  },
  {
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
    title: '🏠 Home & Kitchen Essentials',
    subtitle: 'Starting at ₹199 — Shop Now',
    bg: 'bg-green-600'
  }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const location = useLocation();

  // Load categories once
  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  // Auto-rotate banner every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Load products when category or search changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    if (searchQuery) {
      searchProducts(searchQuery)
        .then(res => { setProducts(res.data); setLoading(false); })
        .catch(() => setLoading(false));
    } else if (selectedCategory) {
      getProductsByCategory(selectedCategory)
        .then(res => { setProducts(res.data); setLoading(false); })
        .catch(() => setLoading(false));
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

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Banner Carousel */}
      <div className="relative w-full h-36 sm:h-52 md:h-64 lg:h-80 overflow-hidden">
        {BANNERS.map((banner, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === bannerIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              onError={e => e.target.style.display = 'none'}
            />
            <div className={`absolute inset-0 ${banner.bg} opacity-50`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg drop-shadow-lg">
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBannerIndex(idx)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${idx === bannerIndex ? 'bg-white w-4 sm:w-6' : 'bg-white/50'}`}
              aria-label={`Go to banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white flex gap-2 sm:gap-4 px-3 sm:px-8 py-3 sm:py-4 overflow-x-auto shadow-sm">

        {/* All Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition whitespace-nowrap
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
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition whitespace-nowrap
              ${selectedCategory === cat.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'All Products'}
            <span className="text-xs sm:text-sm text-gray-400 ml-2">
              ({products.length} items)
            </span>
          </h2>

          {/* Admin Only */}
          {localStorage.getItem('isAdmin') === 'true' && (
            <Link to="/admin/product/add"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded text-center w-full sm:w-auto">
              + Add Product
            </Link>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 sm:py-32">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm sm:text-base">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          /* No Products */
          <div className="text-center py-16 sm:py-20 bg-white rounded shadow">
            <p className="text-gray-400 text-base sm:text-lg">No products found.</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded text-sm">
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {products.map(product => (
              <div key={product.id}
                className="bg-white rounded shadow hover:shadow-md transition-shadow">

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl || 'https://placehold.co/200x200'}
                    alt={product.name}
                    className="w-full h-32 sm:h-40 md:h-44 object-contain p-2 sm:p-3 bg-gray-50"
                    onError={e => e.target.src = 'https://placehold.co/200x200'}
                  />
                </Link>

                {/* Info */}
                <div className="p-2 sm:p-3">
                  <Link to={`/product/${product.id}`}>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 truncate hover:text-blue-600">
                      {product.name}
                    </p>
                  </Link>
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                    {product.category?.name}
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-green-600 font-medium">
                      10% off
                    </span>
                  </div>
                  <p className={`text-[10px] sm:text-xs mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded">
                      🛒 Cart
                    </button>
                    <Link to={`/product/${product.id}`}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded text-center">
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