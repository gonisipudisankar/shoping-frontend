import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories, createProduct, getProductById, updateProduct } from '../services/api';
import AdminLayout from '../components/AdminLayout';

function AdminProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    category: { id: '' }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
    if (isEdit) {
      getProductById(id).then(res => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          imageUrl: p.imageUrl,
          category: { id: p.category?.id }
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setForm({ ...form, category: { id: parseInt(value) } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const action = isEdit ? updateProduct(id, form) : createProduct(form);
    action
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => navigate('/admin/products'), 1500);
      })
      .catch(() => {
        alert('Error saving product!');
        setLoading(false);
      });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">
            {isEdit ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem('isAdmin');
              navigate('/');
            }}
            className="text-sm text-red-500 hover:underline">
            🔓 Logout
          </button>
        </div>

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4 text-center text-green-700 font-medium">
            ✅ Product {isEdit ? 'updated' : 'added'} successfully!
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="preview"
                className="mt-2 h-24 w-24 object-contain border rounded"
                onError={e => e.target.style.display = 'none'}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={form.category.id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500">
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-sm disabled:opacity-50">
            {loading ? 'Saving...' : isEdit ? '✏️ Update Product' : '➕ Add Product'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProductPage;