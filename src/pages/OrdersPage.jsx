import React, { useState } from 'react';
import { placeOrder, getOrdersByEmail } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SESSION_ID = 'user-session-001';

function OrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: '', customerEmail: '', address: ''
  });
  const [orders, setOrders] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    placeOrder(SESSION_ID, form.customerName, form.customerEmail, form.address)
      .then(() => {
        setOrderPlaced(true);
        getOrdersByEmail(form.customerEmail).then(res => setOrders(res.data));
      })
      .catch(() => alert('Error! Is your cart empty?'));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-5">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">Checkout</h2>

        {/* Form */}
        <div className="bg-white rounded shadow p-4 sm:p-6 mb-4">
          <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-gray-700">
            Delivery Details
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <input
              name="customerName"
              placeholder="Full Name"
              value={form.customerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
            />
            <input
              name="customerEmail"
              placeholder="Email Address"
              value={form.customerEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
            />
            <button
              onClick={handlePlaceOrder}
              className="w-full py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded text-sm">
              ✅ Place Order
            </button>
          </div>
        </div>

        {/* Success */}
        {orderPlaced && (
          <div className="bg-green-50 border border-green-200 rounded p-4 sm:p-5 mb-4 text-center">
            <p className="text-green-700 text-base sm:text-lg font-semibold">
              🎉 Order Placed Successfully!
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 text-sm sm:text-base">
              Continue Shopping
            </button>
          </div>
        )}

        {/* Order History */}
        {orders.length > 0 && (
          <div className="bg-white rounded shadow p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Your Orders</h3>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id}
                  className="border border-gray-200 rounded p-3 sm:p-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <span className="text-sm sm:text-base font-medium">Order #{order.id}</span>
                    <span className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded ${
                      order.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 break-words">Address: {order.address}</p>
                  <p className="text-sm sm:text-base font-bold mt-2">
                    Total: ₹{order.totalAmount?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;