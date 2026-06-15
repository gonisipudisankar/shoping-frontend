import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getAllProducts, deleteProduct } from '../../services/api';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = () => {
    getAllProducts().then(res => setProducts(res.data));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id).then(() => loadProducts());
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">📦 Products</h2>
        <Link to="/admin/product/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium text-center w-full sm:w-auto">
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded shadow p-3 sm:p-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Image</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Name</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Category</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Price</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Stock</th>
                <th className="text-left p-3 sm:p-4 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 sm:p-4">
                    <img
                      src={product.imageUrl || 'https://placehold.co/50'}
                      alt={product.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </td>
                  <td className="p-3 sm:p-4 font-medium whitespace-nowrap">{product.name}</td>
                  <td className="p-3 sm:p-4 text-gray-500 whitespace-nowrap">{product.category?.name}</td>
                  <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">₹{product.price?.toLocaleString()}</td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex gap-2 whitespace-nowrap">
                      <Link
                        to={`/admin/product/edit/${product.id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200">
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                        🗑️ Delete
                      </button>
                    </div>
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

export default AdminProducts;