import React, { useState, useContext, useEffect } from "react";
import style from "../Styles/Payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import OrderAdress from "../Users/OrderAdress";
import { CartContext } from "./Context";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../context/authContext";
import {
  getUserById,
  setOrder,
  postOrder,
  setUserOrder,
  setDirections,
} from "../../redux/actions";
import axios from "axios";

const Payment = () => {
  const KEY = import.meta.env.STRIPE_KEY;
  const dispatch = useDispatch();
  const { cartItems } = useContext(CartContext);
  const { user } = useAuth();
  const userState = useSelector((state) => state.user);
  const purchases = cartItems.map((item) => ({
    MovieId: item.id,
    quantity: item.amount,
  }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const currentOrder = useSelector((state) => state.currentOrder);
  const currentUserOrder = useSelector((state) => state.currentUserOrder);
  const directions = useSelector((state) => state.directions);
  const [shipMessage, setShipMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [direccion, setDireccion] = useState([]);
  const [idAdress, setidAdress] = useState("");

  const stripePromise = loadStripe(
    "pk_test_51NB6jDKYeZyt0ZZhF4rhnhYKRp55bCCtnvCqUWE8khTmgyBk37Op5cl3jYN4fHJBA2LaLGU2RU6wFoYuuA6WO1eh00GfjV2DDF"
  );

  const getAdress = async (uid) => {
    const adress = await axios.get(
      `https://henrybuster.onrender.com/address/user/${uid}`
    );
    const direccionData = adress.data;
    dispatch(setDirections(direccionData));
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.uid));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchAddress = async () => {
        await getAdress(user.uid);
      };
      fetchAddress();
    }
  }, [user, userState]);
  const handlePhone = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (directions.length > 0) {
      const updatedData = {
        ...formData,
        name: userState && userState.name ? userState.name : formData.name,
        email: user && user.email ? user.email : formData.email,
        phoneNumber:
          userState && userState.phoneNumber
            ? userState.phoneNumber
            : formData.phoneNumber,
        street:
          directions[0] && directions[0].street
            ? directions[0].street
            : formData.street,
        city:
          directions[0] && directions[0].city
            ? directions[0].city
            : formData.city,
        state:
          directions[0] && directions[0].state
            ? directions[0].state
            : formData.state,
        postalCode:
          directions[0] && directions[0].postalCode
            ? directions[0].postalCode
            : formData.postalCode,
        country:
          directions[0] && directions[0].country
            ? directions[0].country
            : formData.country,
      };
      if (userState.id === undefined) {
        dispatch(setOrder(updatedData));
      } else {
        dispatch(setUserOrder(updatedData));
      }

      setFormData(updatedData);
    }
  }, [directions, user, userState]);

  useEffect(() => {
    const selectElement = document.querySelector("#address");

    if (selectElement) selectElement.selectedIndex = 0;
  }, [directions]);
  useEffect(() => {
    if (!currentOrder.street || !currentOrder.name) {
      setShipMessage(
        "Provide the shipping data. You must fill all the fields to continue"
      );
    } else {
      setShipMessage("");
    }
  }, [currentOrder]);

  const renderImages = () => {
    return cartItems.map((item, index) => (
      <img key={index} src={item.image} alt={`Product ${index}`} />
    ));
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  /*
  if(currentOrder){
    const direccionSeleccionada = direccion[0]
    
    const fisrtAddress = {
          
      AddressId: direccionSeleccionada?.id,
      purchases:purchases,
      name: currentOrder.name,
      phoneNumber:userState?.phoneNumber
    };
    dispatch(setUserOrder(fisrtAddress));
   }
*/

  useEffect(() => {
    if (directions) {
      const value = document.querySelector("#address");
      if (value) {
        console.log(value.value);
        const getAdressById = async (id) => {
          const { data } = await axios.get(
            `https://henrybuster.onrender.com/address/${id}`
          );
          const newAddress = {
            AddressId: id,
            purchases: purchases,
            name: userState.name,
            phoneNumber: currentUserOrder.phoneNumber,
            street: data.street,
            city: data.city,
          };

          dispatch(setUserOrder(newAddress));
        };

        getAdressById(value.value);
      }
    }
  }, [directions]);

  const handleAddressChange = async (event) => {
    const selectedStreet = event.target.value;

    const { data } = await axios.get(
      `https://henrybuster.onrender.com/address/${selectedStreet}`
    );
    const newAddress = {
      AddressId: selectedStreet,
      purchases: purchases,
      name: userState.name,
      phoneNumber: userState.phoneNumber,
      street: data.street,
      city: data.city,
    };
    dispatch(setUserOrder(newAddress));
    setFormData(newAddress);

    console.log(newAddress, "componente payment");
  };

  return (
    <div className={style.container}>
      <h1 className={style.titulos1}>Checkout:</h1>
      <div className={style.Principal}>
        <div className={style.Col1}>
          <div>
            <h1 className={style.titulos1}>It's almost yours!:</h1>
          </div>
          <div>
            <div className={style.imagecontainer}>{renderImages()}</div>
          </div>
          <div className={style.adress}>
            {directions.length >= 1 && (
              <select name="" id="address" onChange={handleAddressChange}>
                {directions.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.street}
                  </option>
                ))}
              </select>
            )}
            <h2>Shipping data:</h2>
            {/*
  <div>
  
    <label htmlFor="">Please enter a phone number:</label>
    <input type="text" 
           name="phoneNumber"
           value={formData.phoneNumber}
           onChange={handlePhone}/>
              </div>*/}

            {!userState?.id ? (
              <>
                <h2>{currentOrder.name ? currentOrder.name : ""}</h2>
                <p>
                  {currentOrder.phoneNumber ? currentOrder.phoneNumber : ""}
                </p>
                <p>{currentOrder.street ? currentOrder.street : ""}</p>
                <p>{currentOrder.city ? currentOrder.city : ""}</p>
                {shipMessage !== "" && <p>{shipMessage}</p>}
              </>
            ) : (
              <>
                <h2>{currentUserOrder.name ? currentUserOrder.name : ""}</h2>
                <p>
                  {currentUserOrder.phoneNumber
                    ? currentUserOrder.phoneNumber
                    : ""}
                </p>
                <p>{currentUserOrder.street ? currentUserOrder.street : ""}</p>
                <p>{currentUserOrder.city ? currentUserOrder.city : ""}</p>
                {shipMessage !== "" && <p>{shipMessage}</p>}
              </>
            )}
          </div>
          <div>
            <button className={style.boton} onClick={openPopup}>
              Add Address
            </button>
            {showPopup && (
              <div className="overlay">
                <OrderAdress onClose={closePopup} />
              </div>
            )}
          </div>
        </div>
        <div className={style.Col2}>
          <div></div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm idAdress={idAdress} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
