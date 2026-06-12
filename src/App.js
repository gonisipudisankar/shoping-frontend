import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrdersPage';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProductPage from './pages/AdminProductPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes — with Navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/product/:id" element={<><Navbar /><ProductDetail /></>} />
        <Route path="/cart" element={<><Navbar /><CartPage /></>} />
        <Route path="/orders" element={<><Navbar /><OrderPage /></>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes — NO Navbar, has Sidebar */}
        <Route path="/admin/dashboard" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute><AdminProducts /></AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute><AdminOrders /></AdminRoute>
        } />
        <Route path="/admin/categories" element={
          <AdminRoute><AdminCategories /></AdminRoute>
        } />
        <Route path="/admin/product/add" element={
          <AdminRoute><AdminProductPage /></AdminRoute>
        } />
        <Route path="/admin/product/edit/:id" element={
          <AdminRoute><AdminProductPage /></AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;