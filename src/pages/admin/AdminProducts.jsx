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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📦 Products</h2>
        <Link to="/admin/product/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded shadow p-4 mb-4">
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
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={product.imageUrl || 'https://placehold.co/50'}
                    alt={product.name}
                    className="w-12 h-12 object-contain"
                  />
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-gray-500">{product.category?.name}</td>
                <td className="p-4 font-semibold">₹{product.price?.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
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
    </AdminLayout>
  );
}

export default AdminProducts;