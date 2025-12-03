const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
router.post('/', auth, async (req,res)=>{ const {orderItems,total} = req.body; const order = new Order({user:req.user.id, orderItems, total}); await order.save(); res.json(order); });
router.get('/mine', auth, async (req,res)=>{ const orders = await Order.find({user:req.user.id}).populate('orderItems.product'); res.json(orders); });
router.get('/', auth, async (req,res)=>{ if(!req.user.isAdmin) return res.status(403).json({msg:'Forbidden'}); const orders = await Order.find().populate('user').populate('orderItems.product'); res.json(orders); });
module.exports = router;
