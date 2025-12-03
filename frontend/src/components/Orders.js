import React, {useEffect,useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
export default function Orders(){
  const {user} = useContext(AuthContext);
  const [orders,setOrders] = useState(null);
  useEffect(()=>{ if(user){ axios.get('/api/orders/mine',{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}).then(r=>setOrders(r.data)); }},[user]);
  if(!user) return <div>Please login to view orders.</div>;
  return <div>
    <h3>Your Orders</h3>
    {orders ? orders.map(o=> <div key={o._id} className='card' style={{marginBottom:8}}>
      <div><strong>Order:</strong> {o._id}</div>
      <div className='small'>Total: ₹{o.total} — Status: {o.status}</div>
      <div style={{marginTop:8}}>
        {o.orderItems.map(it=> <div key={it.product?._id || Math.random()} className='small'>{it.product?.title || 'Item'} x {it.qty} — ₹{it.price*it.qty}</div>)}
      </div>
    </div>) : <div>Loading...</div>}
  </div>
