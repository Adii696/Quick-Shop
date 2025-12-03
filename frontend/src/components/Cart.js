import React, {useContext} from 'react';
import { CartContext } from '../utils/CartContext';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
export default function Cart(){
  const {items, remove, clear} = useContext(CartContext);
  const {user} = useContext(AuthContext);
  const placeOrder = async ()=>{
    if(!user){ return alert('Login first'); }
    const total = items.reduce((s,i)=>s+i.price*i.qty,0);
    await axios.post('/api/checkout', {orderItems: items.map(i=>({product:i._id, qty:i.qty, price:i.price})), total}, {headers:{Authorization:'Bearer '+localStorage.getItem('token')}});
    alert('Order placed'); clear();
  }
  return <div><h3>Cart</h3>{items.length===0? <div>No items</div> : items.map(i=><div key={i._id} className='card' style={{marginBottom:8}}><b>{i.title}</b> x {i.qty} - ₹{i.price*i.qty} <button onClick={()=>remove(i._id)} className='link-like'>Remove</button></div>)}<div>Total: ₹{items.reduce((s,i)=>s+i.price*i.qty,0)}</div><button onClick={placeOrder} className='btn'>Place order</button></div>
