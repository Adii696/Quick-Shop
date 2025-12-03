import React, {useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const {save} = useContext(AuthContext);
  const nav = useNavigate();
  const submit= async e=>{ e.preventDefault(); try{ const res=await axios.post('/api/auth/register',{name,email,password}); save(res.data); nav('/'); }catch(err){alert(err.response?.data?.msg || 'Error')} };
  return <form onSubmit={submit}><h3>Register</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder='name'/><br/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email'/><br/><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password'/><br/><button type='submit' className='btn'>Register</button></form>
}
