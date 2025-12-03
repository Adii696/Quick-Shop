const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Order = require('../models/Order');
router.get('/sales', auth, admin, async (req,res)=>{ const orders = await Order.find(); const totalSales = orders.reduce((s,o)=>s+ (o.total||0),0); res.json({totalOrders: orders.length, totalSales}); });
module.exports = router;
