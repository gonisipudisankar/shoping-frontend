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
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">📊 Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statCards.map(card => (
          <div key={card.label}
            className="bg-white rounded shadow p-3 sm:p-5 flex items-center gap-3 sm:gap-4 min-w-0">
            <div className={`${card.color} text-white text-lg sm:text-2xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-800 truncate">{card.value}</p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded shadow p-3 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">🕐 Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left p-2 sm:p-3 whitespace-nowrap">Order ID</th>
                <th className="text-left p-2 sm:p-3 whitespace-nowrap">Customer</th>
                <th className="text-left p-2 sm:p-3 whitespace-nowrap">Amount</th>
                <th className="text-left p-2 sm:p-3 whitespace-nowrap">Status</th>
                <th className="text-left p-2 sm:p-3 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders?.map(order => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 sm:p-3 font-medium whitespace-nowrap">#{order.id}</td>
                  <td className="p-2 sm:p-3 whitespace-nowrap">{order.customerName}</td>
                  <td className="p-2 sm:p-3 font-semibold whitespace-nowrap">₹{order.totalAmount?.toLocaleString()}</td>
                  <td className="p-2 sm:p-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 text-gray-500 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;