const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const uploadRoutes = require('./routes/upload');
const analyticsRoutes = require('./routes/analytics');
const profileRoutes = require('./routes/profile');
const checkoutRoutes = require('./routes/checkout');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quickshop')
  .then(()=>{ const server = app.listen(PORT, ()=> console.log('Server running on', PORT)); module.exports = server; })
  .catch(err=> console.error(err));
