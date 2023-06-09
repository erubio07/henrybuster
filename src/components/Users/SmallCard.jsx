import React, { useContext, useEffect, useState } from 'react';
import style from '../Styles/SmallCard.module.css';

import { CartContext } from "../Carrito/Context"
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, getAllFavorites } from '../../redux/actions';
import { useAuth } from '../../context/authContext';


const SmallCard = ({ name, image, id, price, Format, movie, favId}) => {
   
    const { addItemToCart, deleteItemToCart, cartItems} = useContext(CartContext);
    const { user} = useAuth();
    
    const [stateBuy, setStateBuy] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isFav, setIsFav] = useState(true)
    const dispatch= useDispatch()
    
    

    const handleClick = (e) => {
        const value = e.target.value;
        if (!stateBuy) {
         if(movie.Inventory.quantity > 0){
            addItemToCart(movie);
          setStateBuy(true);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
         }
          
        } else {
          deleteItemToCart(movie);
          setStateBuy(false);
          setDeleteSuccess(true);
          setTimeout(() => {
            setDeleteSuccess(false);
          }, 800);
        }
      };
    
      const handleFavorite = () => {
       
           setIsFav(false)
           dispatch(deleteFavorite(favId))
           dispatch(getAllFavorites(user.uid))
       
          
        }
      
    //  useEffect(() => {
    //   if (myFavorites.length >= 1) {
    //     myFavorites.forEach((fav) => {
    //       if (fav.id === id) {
    //         setIsFav(true);
    //       }
    //     });
    //   }
    // }, [myFavorites, id]);

    useEffect(() => {
      // Verificar si el ID se encuentra en el array cartItems
      const isInCart = cartItems.some((item) => item.id === id);
      setStateBuy(isInCart);
    }, [cartItems, id]);

  return (
    <div className={style.card}>
      <img src={image} alt={name} className={style.card_img} />
      <div className={style.card_info}>
   
        <p className={style.text_body}>Price: {price}</p>
        <p className={style.text_body}>Format: {Format}</p>
      </div>
      <div className={style.card_footer}>
      <button
            className={`${style.card_button} ${stateBuy ? style.buyButton : style.addButton}`}
            value={id}
            onClick={handleClick}
            >
            {stateBuy ? (
                <i className="bi bi-cart-dash bi-sm"></i>
            ) : (
                <i className="bi bi-cart-plus bi-sm"></i>
            )}
     </button>
            
     <div>
          {isFav ? <button className={style.buttonFav} onClick={handleFavorite}><i className="bi bi-heart-fill"></i></button> : ""
     
         
         }
    </div>
        {/* Agrega aquí los elementos adicionales del footer */}
      </div>
    </div>
  );
};

export default SmallCard;
