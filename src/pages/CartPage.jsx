import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SESSION_ID = 'user-session-001';

function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { loadCart(); }, []);

  const loadCart = () => {
    getCart(SESSION_ID).then(res => setCart(res.data));
  };

  const handleRemove = (cartItemId) => {
    removeFromCart(SESSION_ID, cartItemId).then(() => loadCart());
  };

  const getTotal = () => {
    if (!cart?.cartItems) return 0;
    return cart.cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toLocaleString();
  };

  if (!cart) return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading...
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          My Cart ({cart.cartItems?.length || 0} items)
        </h2>

        {cart.cartItems?.length === 0 ? (
          <div className="bg-white rounded shadow p-10 sm:p-16 text-center">
            <p className="text-xl sm:text-2xl mb-4">🛒 Your cart is empty!</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 items-start">

            {/* Items */}
            <div className="flex-1 w-full space-y-3">
              {cart.cartItems.map(item => (
                <div key={item.id}
                  className="bg-white rounded shadow p-3 sm:p-5 flex gap-3 sm:gap-5">
                  <img
                    src={item.product.imageUrl || 'https://placehold.co/100'}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium mb-1 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.product.category?.name}</p>
                    <p className="text-lg sm:text-xl font-bold mb-1">
                      ₹{item.product.price?.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                    <p className="text-xs sm:text-sm font-semibold mb-3">
                      Subtotal: ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-4 sm:px-5 py-1.5 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80 bg-white rounded shadow p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">
                Price Details
              </h3>
              <hr className="mb-3" />
              <div className="flex justify-between text-sm mb-3">
                <span>Price ({cart.cartItems.length} items)</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <hr className="mb-3" />
              <div className="flex justify-between font-bold text-base mb-2">
                <span>Total Amount</span>
                <span>₹{getTotal()}</span>
              </div>
              <p className="text-green-600 text-sm text-center mb-4">
                🎉 You save ₹500 on this order
              </p>
              <button
                onClick={() => navigate('/orders')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;