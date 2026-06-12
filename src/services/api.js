import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Categories
export const getAllCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);

// Products
export const getAllProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductsByCategory = (categoryId) => API.get(`/products/category/${categoryId}`);
export const searchProducts = (name) => API.get(`/products/search?name=${name}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

// Cart
export const getCart = (sessionId) => API.get(`/cart/${sessionId}`);
export const addToCart = (sessionId, productId, quantity) =>
    API.post(`/cart/${sessionId}/add?productId=${productId}&quantity=${quantity}`);
export const removeFromCart = (sessionId, cartItemId) =>
    API.delete(`/cart/${sessionId}/remove/${cartItemId}`);
export const clearCart = (sessionId) =>
    API.delete(`/cart/${sessionId}/clear`);

// Orders
export const placeOrder = (sessionId, customerName, customerEmail, address) =>
    API.post(`/orders/place?sessionId=${sessionId}&customerName=${customerName}&customerEmail=${customerEmail}&address=${address}`);
export const getOrdersByEmail = (email) => API.get(`/orders/customer/${email}`);

// Admin APIs
export const getAdminStats = () => API.get('/admin/stats');
export const getAllOrders = () => API.get('/admin/orders');
export const updateOrderStatus = (id, status) =>
    API.put(`/admin/orders/${id}/status?status=${status}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);