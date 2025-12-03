const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  orderItems: [{product:{type: mongoose.Schema.Types.ObjectId, ref:'Product'}, qty:Number, price:Number}],
  total: Number,
  status: {type:String, default:'Processing'}
}, {timestamps:true});
module.exports = mongoose.model('Order', orderSchema);
