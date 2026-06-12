import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminStats } from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return (
    <AdminLayout>
      <div className="flex justify-center items-center h-64 text-xl">
        Loading...
      </div>
    </AdminLayout>
  );

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'bg-blue-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '📋', color: 'bg-green-500' },
    { label: 'Total Categories', value: stats.totalCategories, icon: '🗂️', color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString()}`, icon: '💰', color: 'bg-purple-500' },
  ];

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <div key={card.label}
            className="bg-white rounded shadow p-5 flex items-center gap-4">
            <div className={`${card.color} text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded shadow p-5">
        <h3 className="text-lg font-semibold mb-4">🕐 Recent Orders</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders?.map(order => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">#{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3 font-semibold">₹{order.totalAmount?.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;