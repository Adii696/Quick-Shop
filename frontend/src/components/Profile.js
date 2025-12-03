import React, {useEffect,useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
export default function Profile(){
  const {user, logout} = useContext(AuthContext);
  const [me,setMe] = useState(null);
  useEffect(()=>{ if(user){ axios.get('/api/profile',{headers:{Authorization:'Bearer '+localStorage.getItem('token')}}).then(r=>setMe(r.data)); }},[user]);
  if(!user) return <div>Please login to view profile.</div>;
  return <div>
    <h3>Profile</h3>
    {me ? <div className='card' style={{padding:16}}>
      <div><strong>{me.name}</strong></div>
      <div className='small'>{me.email}</div>
      <div style={{marginTop:12}}><button className='btn' onClick={logout}>Logout</button></div>
    </div> : <div>Loading...</div>}
  </div>
