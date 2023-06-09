import React, { useEffect, useContext } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useParams, Link } from 'react-router-dom'
import { getDetailMovie, cleanDetail } from '../../redux/actions'

import Cart from '../Carrito/Cart'
import { CartContext } from '../Carrito/Context'
import Reviews from './Reviews'
import style from '../Styles/Detail.module.css'



export const Detail = () => {
  const goBack = () => {
    window.history.back();
  };

    const dispatch = useDispatch()
    const {id} = useParams()
 
   const movies = useSelector(state => state.detail)
   console.log(movies)
   const {addItemToCart} = useContext(CartContext)

   useEffect(() => {
     
    dispatch(getDetailMovie(id))
      
    return () => {
      dispatch(cleanDetail())
    }

    }, [id])

 
  return (
    <div>
      <div className={style.Wraper}>
        <div className={style.DatosPelis}>
                <div className={style.ImagenPelis}>
                <h5>{movies? movies.name : "No info about"}</h5>
                    <img src={movies? movies.image : "No info about"} alt="Imagen de pelicula" className={style.img}/>
                    <div className={style.containerBtn}>
                    <button onClick={()=>addItemToCart(movies)} className={style.btn}><i className="fa-solid fa-cart-plus"></i> Add to cart</button>
                  
                </div>
                </div>
                <div className={style.InfoPelis}>
                    
               
                    
                    <p className={style.text}> <strong className={style.strong}>Description:</strong> <br /> {movies? movies.description : "No info about"}</p>
                    <p className={style.text}>  <strong className={style.strong}>Release date:</strong>   {movies? movies.date : "No info about"}</p>
                    <p className={style.text}>  <strong className={style.strong}>Price:</strong> ${movies? movies.price : "No info about"}</p>
                    <p className={style.text}> <strong className={style.strong}>Ranking:</strong> {movies? movies.vote_average : "No info about"}</p>
                    <p className={style.text}> <strong className={style.strong}>Language:</strong> {movies? movies.Language?.name : "No information about"}</p>
                    <p className={style.text}> <strong className={style.strong}>Genres:</strong> {movies? movies.Genres?.map((genre, i)=> {
                      if(i < movies.Genres.length -1){ return genre.name + ", "}
                      else{ return genre.name}
                    }) : "No information about"}</p>
                    
                </div>
         </div>
        </div>
        <div>

         
                <div className={style.Reviews}>
                        <Reviews
                          id={id}
                          rating={movies.vote_average}
                        />
                </div> 
                <div className={style.containerBack}>
                  <button onClick={goBack} className={style.btnBack}>Back</button>
                </div>
        </div>
          

    </div>
    
       
       
  )
}
