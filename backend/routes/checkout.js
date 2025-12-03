const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const sendOrderEmail = require('../utils/sendEmail');
router.post('/', auth, async (req,res)=>{
  try{ const {orderItems,total} = req.body; const order = new Order({user:req.user.id, orderItems, total, status:'Paid (mock)'}); await order.save(); try{ await sendOrderEmail(req.user.id, order); }catch(e){console.error('Email send failed',e);} res.json({ok:true, orderId: order._id}); }catch(err){console.error(err); res.status(500).json({msg:'Server error'});} });
module.exports = router;
