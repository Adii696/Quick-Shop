import React, {useState,useEffect} from 'react';
import axios from 'axios';
export default function Admin(){
  const [products,setProducts]=useState([]);
  const [title,setTitle]=useState(''); const [price,setPrice]=useState(0);
  const [imageFile,setImageFile]=useState(null); const [uploading,setUploading]=useState(false);
  const token = localStorage.getItem('token');
  useEffect(()=>{ axios.get('/api/products').then(r=>setProducts(r.data)); },[]);
  const create = async ()=>{
    try{
        let imageUrl = '/placeholder.png';
        if(imageFile){
          const fd = new FormData();
          fd.append('image', imageFile);
          setUploading(true);
          const upl = await axios.post('/api/upload', fd, {headers:{Authorization:'Bearer '+token,'Content-Type':'multipart/form-data'}});
          imageUrl = upl.data.url;
          setUploading(false);
        }
        const res = await axios.post('/api/products',{title,price,description:'',countInStock:10,image:imageUrl},{headers:{Authorization:'Bearer '+token}});
        setProducts([res.data,...products]);
        setTitle(''); setPrice(0); setImageFile(null);
    }catch(e){setUploading(false); alert(e.response?.data?.msg || 'err')}
  }
  return <div>
    <h3>Admin</h3>
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <input placeholder='title' value={title} onChange={e=>setTitle(e.target.value)}/>
      <input type='number' value={price} onChange={e=>setPrice(e.target.value)}/>
      <input type='file' onChange={e=>setImageFile(e.target.files[0])}/>
      <button className='btn' onClick={create}>{uploading? 'Uploading...':'Create Product'}</button>
    </div>
    <div style={{marginTop:12,display:'grid',gap:8}}>
      {products.map(p=> <div key={p._id} className='card' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}><img src={p.image||'/placeholder.png'} style={{width:64,height:64,borderRadius:8,objectFit:'cover'}} alt='thumbnail'/><div><strong>{p.title}</strong><div className='small'>₹{p.price}</div></div></div>
        <div style={{display:'flex',gap:8}}><button className='link-like' onClick={async()=>{ if(!confirm('Delete?')) return; await axios.delete('/api/products/'+p._id,{headers:{Authorization:'Bearer '+token}}); setProducts(products.filter(x=>x._id!==p._id)); }}>Delete</button></div>
      </div>)}
    </div>
  </div>
