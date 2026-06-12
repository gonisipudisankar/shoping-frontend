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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Orders</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {['ALL', 'PENDING', 'CONFIRMED', 'DELIVERED'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded text-sm font-medium transition
              ${filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">#{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4 text-gray-500">{order.customerEmail}</td>
                <td className="p-4 font-semibold">
                  ₹{order.totalAmount?.toLocaleString()}
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
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