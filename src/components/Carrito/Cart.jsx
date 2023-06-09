import React, { useContext, useEffect, useState } from "react";
import style from '../Styles/Carrito.module.css'
import ItemCart from "./ItemCart";
import { CartContext } from "./Context";
import { Link } from "react-router-dom";

const Cart = () => {
  const [productsLength, setProductsLength] = useState(0);

  const { cartItems, addItemToCart, deleteItemToCart } =
    useContext(CartContext);

  useEffect(() => {
    setProductsLength(
      cartItems?.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  const total = cartItems?.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  ).toFixed(2);;

  return (
    <div style={{ color: "white" }}>
      {cartItems && (
        <div>
          <div className={style.titulo2}><h2 >Your cart</h2> </div>

          {cartItems.length === 0 ? (
            <div><p>Your cart is empty</p></div>
            
          ) : (
            
            <div>
              {cartItems.map((item, i) => (
                <ItemCart key={i} item={item} />
              ))}
              <Link to={"/payment"}>
          <button className={style.boton}>Go to pay (${total} USD)</button>

          </Link>
            </div>
          )}
          

         
        </div>
      )}
    </div>
  );
};

export default Cart;
