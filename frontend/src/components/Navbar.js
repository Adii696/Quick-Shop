import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { CartContext } from '../utils/CartContext';
export default function Navbar(){
  const {user, logout} = useContext(AuthContext);
  const {items} = useContext(CartContext);
  return (
    <header className='header container'>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link to='/' className='brand'><img src='/logo192.png' alt='logo' style={{width:40}}/>QuickShop</Link>
        <div className='small' style={{marginLeft:8}}>Demo store</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <nav className='nav'>
          <Link to='/'>Home</Link>
          <Link to='/admin'>Admin</Link>
          <Link to='/analytics'>Analytics</Link>
          <Link to='/orders'>Orders</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/cart'>Cart ({items.length})</Link>
        </nav>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {user ? <>
            <span className='small'>Hi, {user.name}</span>
            <button className='link-like' onClick={logout}>Logout</button>
          </> : <Link to='/login'>Login</Link>}
        </div>
      </div>
    </header>
  )
}
