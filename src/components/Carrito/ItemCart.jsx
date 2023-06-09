import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Context";
import './Cart.css'
import style from '../Styles/ItemCart.module.css'

const ItemCart = ({ item }) => {
  const { addItemToCart, deleteItemToCart, forceItemInCart } = useContext(CartContext);

  const { amount } = item;
  const inventory = item.Inventory.quantity

  const [itemAmount, setItemAmount]=useState(amount)

  useEffect(()=>{
    setItemAmount(amount)
  },[itemAmount])
  
  const handleChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    
    if (!isNaN(quantity)) {
      setItemAmount(quantity)
      forceItemInCart(item, quantity);
    }
  };
  

 

  return (
    <div>
      <div className={style.itemDiv}>
        <div>
          <div className={style.itemView}>
            <img src={item.image} alt={item.name} className={style.itemImg} />
            <div className={style.itemInfo}>
              <p><strong>{item.name}</strong></p>
              <p> <strong>{item.price}</strong> USD$</p>
              <p>Format: {item.Format.name}</p>
            </div>
          </div>
        </div>
        <div className={style.test}>

          <div className={style.subTotal}>
            <button className="btn btn-light" onClick={() => deleteItemToCart(item)}>
              -
            </button>
            <div className={style.itemCantidad}>
            <input 
            className={style.inputAmount}
            type="text"
            name="ItemAmount"
            value={item.amount}
            onChange={handleChange}
            
          />
          
            </div>
            <button className="btn btn-light" onClick={() => addItemToCart(item)}>
              +
            </button>
          </div>

          <p>Subtotal: ${item.amount * item.price} USD</p>
        </div>

      </div>
    </div>
  );
};

export default ItemCart;
