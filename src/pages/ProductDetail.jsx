import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';

const SESSION_ID = 'user-session-001';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(SESSION_ID, product.id, quantity)
      .then(() => alert('Added to cart!'))
      .catch(() => alert('Error'));
  };

  if (!product) return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading...
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-6 flex gap-10">

        {/* Image */}
        <div className="w-80 flex-shrink-0">
          <img
            src={product.imageUrl || 'https://placehold.co/300x300'}
            alt={product.name}
            className="w-full h-80 object-contain"
            onError={e => e.target.src = 'https://placehold.co/300x300'}
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-3">{product.category?.name}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price?.toLocaleString()}
            </span>
            <span className="text-green-600 font-medium">10% off</span>
          </div>

          {/* Stock */}
          <p className={`text-sm font-medium mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 border rounded text-lg font-bold hover:bg-gray-100">
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="w-8 h-8 border rounded text-lg font-bold hover:bg-gray-100">
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded">
              🛒 Add to Cart
            </button>
            <button
              onClick={() => navigate('/orders')}
              disabled={product.stock === 0}
              className="px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;