import React, { useEffect } from 'react'
import SideBarProfile from './SideBarProfile'
import style from '../Styles/MyOrders.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrders } from '../../redux/actions'
import { useAuth } from "../../context/authContext";


const MyOrders = () => {
  const { user} = useAuth();
  const dispatch = useDispatch()
  const orders = useSelector(state => state.myOrders);

  useEffect(()=>{
    dispatch(getMyOrders(user.uid));

  },[user])

 

  

  console.log(orders)


  return (
    <div className={style.container}>
        <SideBarProfile/>
        <div className={style.body}>
            <h1><i className="bi bi-truck"></i> My orders</h1>
          <div className={style.orders}>
            {orders && orders.length >= 1 ? (
              orders.map(order=>(
                <div key={order.id} className={style.orderCard}>
                  <p>Order number: {order.id} <br/>
                  Purchase date: {new Date(order.date).toISOString().split('T')[0]}<br/>
                  Status: {order.status === "Pendiente" ? "Pending to send" : (order.status === "Entregado" ? "Delivered" : (order.status === "Cancelado" ? "Canceled" : (order.status === "Enviado" ? "Send" : order.status)))}</p>

                </div>
              ))
            ) : (
              <p>Add items to cart and start a new order!</p>
            )}
          </div>
     </div>
    </div>
  )
}

export default MyOrders