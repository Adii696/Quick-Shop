const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post('/register', async (req,res)=>{
  try{ const {name,email,password} = req.body; if(await User.findOne({email})) return res.status(400).json({msg:'User exists'}); const hash = await bcrypt.hash(password,10); const u = await User.create({name,email,password:hash}); const token = jwt.sign({id:u._id,name:u.name,isAdmin:u.isAdmin}, process.env.JWT_SECRET || 'secret'); res.json({token,user:{id:u._id,name:u.name,email:u.email,isAdmin:u.isAdmin}}); }catch(e){console.error(e);res.status(500).send('err');}
});
router.post('/login', async (req,res)=>{
  try{ const {email,password} = req.body; const u = await User.findOne({email}); if(!u) return res.status(400).json({msg:'Invalid'}); if(!await bcrypt.compare(password,u.password)) return res.status(400).json({msg:'Invalid'}); const token = jwt.sign({id:u._id,name:u.name,isAdmin:u.isAdmin}, process.env.JWT_SECRET || 'secret'); res.json({token,user:{id:u._id,name:u.name,email:u.email,isAdmin:u.isAdmin}}); }catch(e){console.error(e);res.status(500).send('err');}
});
module.exports = router;
