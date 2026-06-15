import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllCategories, createCategory } from '../../services/api';
import axios from 'axios';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = () => {
    getAllCategories().then(res => setCategories(res.data));
  };

  const handleAdd = () => {
    if (!form.name) return alert('Please enter category name!');
    createCategory(form).then(() => {
      setSuccess(true);
      setForm({ name: '', description: '' });
      loadCategories();
      setTimeout(() => setSuccess(false), 2000);
    });
  };

  return (
    <AdminLayout>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">🗂️ Categories</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Add Category Form */}
        <div className="bg-white rounded shadow p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Add New Category</h3>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded p-3 mb-3 text-green-700 text-sm">
              ✅ Category added successfully!
            </div>
          )}

          <div className="space-y-3">
            <input
              placeholder="Category Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAdd}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-sm">
              + Add Category
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded shadow p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
            All Categories ({categories.length})
          </h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.id}
                className="flex items-center justify-between gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{cat.name}</p>
                  <p className="text-xs text-gray-400 truncate">{cat.description}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">ID: {cat.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCategories;