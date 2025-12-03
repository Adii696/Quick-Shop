import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Admin from './components/Admin';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Analytics from './components/Analytics';
export default function App(){
  return <div>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/analytics' element={<Analytics/>} />
      </Routes>
    </div>
  </div>
}
