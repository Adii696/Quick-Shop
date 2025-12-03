import React, {useState} from 'react';
import axios from 'axios';
export default function Analytics(){
  const [data,setData] = useState(null);
  const token = localStorage.getItem('token');
  const fetch = async ()=>{
    try{ const r = await axios.get('/api/analytics/sales',{headers:{Authorization:'Bearer '+token}}); setData(r.data);}catch(e){alert('Need admin access')}
  }
  return <div>
    <h3>Analytics</h3>
    <button className='btn' onClick={fetch}>Fetch Sales</button>
    {data && <div className='card' style={{marginTop:12}}><div>Total Orders: {data.totalOrders}</div><div>Total Sales: ₹{data.totalSales}</div></div>}
  </div>
