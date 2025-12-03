import React, {useEffect,useState, useContext} from 'react';
import axios from 'axios';
import { CartContext } from '../utils/CartContext';
import { Link } from 'react-router-dom';
export default function Home(){
  const [products,setProducts] = useState([]);
  const {add} = useContext(CartContext);
  const [q,setQ] = useState('');
  const [sort,setSort] = useState('new');
  const [page,setPage] = useState(1);
  const pageSize = 9;
  useEffect(()=>{ axios.get('/api/products').then(r=>setProducts(r.data)).catch(()=>setProducts([])); },[]);
  let list = products.filter(p=> p.title.toLowerCase().includes(q.toLowerCase()));
  if(sort==='price_asc') list = list.sort((a,b)=>a.price-b.price);
  else if(sort==='price_desc') list = list.sort((a,b)=>b.price-a.price);
  else list = list.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  const filtered = list.slice((page-1)*pageSize, page*pageSize);
  return <div>
    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
      <div style={{flex:1}} className='search'><input placeholder='Search products...' value={q} onChange={e=>setQ(e.target.value)}/></div>
      <select value={sort} onChange={e=>setSort(e.target.value)}>
        <option value='new'>Newest</option>
        <option value='price_asc'>Price: Low to High</option>
        <option value='price_desc'>Price: High to Low</option>
      </select>
      <div style={{marginLeft:8}}><button className='btn' onClick={()=>alert('Demo shop')}>Shop</button></div>
      <div style={{marginLeft:8}}><button className='link-like' onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button></div>
      <div className='small'>Page {page}</div>
      <div><button className='link-like' onClick={()=>setPage(p=>p+1)}>Next</button></div>
    </div>
    <div className='grid'>
      {filtered.map(p=> <div className='card' key={p._id}>
        <Link to={'/product/'+p._id}><img src={p.image || '/placeholder.png'} alt={p.title}/></Link>
        <h4><Link to={'/product/'+p._id} style={{textDecoration:'none',color:'#0f172a'}}>{p.title}</Link></h4>
        <p className='small'>{p.description || 'No description.'}</p>
        <div className='row'>
          <div><span className='price'>₹{p.price}</span> <div className='small'>Stock: {p.countInStock || 0}</div></div>
          <div style={{display:'flex',gap:8}}>
            <button className='btn' onClick={()=>add(p)}>Add</button>
            <Link to={'/product/'+p._id}><button className='link-like'>View</button></Link>
          </div>
        </div>
      </div>)}
    </div>
    <div className='footer'>Built with ❤️ — QuickShop demo</div>
  </div>
}
