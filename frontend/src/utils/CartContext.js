import React, {createContext, useState} from 'react';
export const CartContext = createContext();
export const CartProvider = ({children})=>{
  const [items,setItems] = useState([]);
  const add = (product) => { setItems(prev => { const found = prev.find(p=>p._id===product._id); if(found) return prev.map(p=> p._id===product._id? {...p, qty:p.qty+ (product.qty||1)}:p); return [...prev, {...product, qty:product.qty||1}]; }); }
  const remove = (id) => setItems(prev=> prev.filter(p=>p._id!==id));
  const clear = ()=> setItems([]);
  return <CartContext.Provider value={{items,add,remove,clear}}>{children}</CartContext.Provider>
}
