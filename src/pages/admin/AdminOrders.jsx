import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllOrders, updateOrderStatus } from '../../services/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = () => {
    getAllOrders().then(res => setOrders(res.data));
  };

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status).then(() => loadOrders());
  };

  const filtered = filter === 'ALL'
    ? orders
    : orders.filter(o => o.status === filter);

  return (
    <AdminLayout>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">📋 Orders</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['ALL', 'PENDING', 'CONFIRMED', 'DELIVERED'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition whitespace-nowrap
              ${filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Order ID</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Customer</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Email</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Amount</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Date</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Status</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 sm:p-4 font-medium whitespace-nowrap">#{order.id}</td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">{order.customerName}</td>
                  <td className="p-3 sm:p-4 text-gray-500 whitespace-nowrap">{order.customerEmail}</td>
                  <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                    ₹{order.totalAmount?.toLocaleString()}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-500 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-500">
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No orders found
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;