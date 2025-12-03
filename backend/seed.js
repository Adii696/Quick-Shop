const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');
const Product = require('./models/Product');
const bcrypt = require('bcrypt');
async function seed(){
  const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/quickshop';
  await mongoose.connect(MONGO);
  console.log('Connected to DB');
  await User.deleteMany({});
  await Product.deleteMany({});
  const hash = await bcrypt.hash('adminpass', 10);
  const admin = new User({name:'Admin User', email:'admin@quickshop.local', password:hash, isAdmin:true});
  await admin.save();
  console.log('Created admin: admin@quickshop.local / adminpass');
  const sample = [
    {title:'Wireless Headphones', description:'Comfortable wireless headphones', price:1999, countInStock:15, image:'/placeholder.png'},
    {title:'Smart Watch', description:'Track your fitness', price:2999, countInStock:8, image:'/placeholder.png'},
    {title:'Running Shoes', description:'Lightweight running shoes', price:2499, countInStock:20, image:'/placeholder.png'}
  ];
  await Product.insertMany(sample);
  console.log('Inserted sample products');
  process.exit(0);
}
seed().catch(err=>{console.error(err); process.exit(1);});
