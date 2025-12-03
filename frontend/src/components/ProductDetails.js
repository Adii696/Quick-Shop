import React, {useEffect,useState,useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../utils/CartContext';
export default function ProductDetails(){
  const { id } = useParams();
  const [product,setProduct] = useState(null);
  const {add} = useContext(CartContext);
  const [qty,setQty] = useState(1);
  useEffect(()=>{ axios.get('/api/products/'+id).then(r=>setProduct(r.data)).catch(()=>setProduct(null)); },[id]);
  if(!product) return <div>Loading...</div>;
  return <div className='product-details' style={{display:'flex',gap:20,marginTop:20}}>
    <div className='left card'>
      <img src={product.image || '/placeholder.png'} alt={product.title} style={{height:360}}/>
      <h2>{product.title}</h2>
      <p className='small'>{product.description}</p>
    </div>
    <div className='right card' style={{maxWidth:420}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div><strong style={{fontSize:22}}>₹{product.price}</strong><div className='small'>Inclusive of taxes</div></div>
        <div><span className='small'>{product.countInStock>0? 'In stock': 'Out of stock'}</span></div>
      </div>
      <div style={{marginTop:12}} className='small'>Quantity</div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
        <button className='link-like' onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
        <div style={{padding:'6px 10px',borderRadius:8,background:'#f3f4f6'}}>{qty}</div>
        <button className='link-like' onClick={()=>setQty(q=>q+1)}>+</button>
      </div>
      <div style={{marginTop:16}}>
        <button className='btn' onClick={()=>{ add({...product, qty}); alert('Added to cart'); }}>Add to cart</button>
        <Link to='/cart'><button style={{marginLeft:8}} className='link-like'>Go to cart</button></Link>
      </div>
    </div>
  </div>
}
