import React, { useState, useContext, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CartContext } from "./Context";
import { postCheckout, setOrder, setUserOrder } from "../../redux/actions";
import style from "../Styles/CheckoutForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { postOrder } from "../../redux/actions";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const CheckoutForm = (props) => {
  const { cartItems, clearCart } = useContext(CartContext);
  const currentOrder = useSelector((state) => state.currentOrder);
  const userOrder = useSelector((state) => state.currentUserOrder);
  const usuario = useSelector((state) => state.user);
  const amountDolars = cartItems
    .reduce((previous, current) => previous + current.amount * current.price, 0)
    .toFixed(2);
  const stripe = useStripe();
  const elements = useElements();
  const amountInCents = Math.round(amountDolars * 100);
  const userState = useSelector((state) => state.user);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(usuario, "hola soy usuario");
  const [user, setUser] = useState({ id: "", name: "" });
  //Aqui se intenta hacer que los datos de la orden se llenen, para la ruta back de compra si fueras usuario

  useEffect(() => {
    if (currentOrder && currentOrder.street !== "" && !usuario?.id) {
      const purchaseUser = {
        purchases: currentOrder.purchases,
        name: currentOrder.name,
        phoneNumber: currentOrder.phoneNumber,
        AddressId: props.id,
      };
      dispatch(setUserOrder(purchaseUser));
    }
  }, [currentOrder, props.id]);

  useEffect(() => {
    if (userState) {
      setUser((prev) => ({
        ...prev,
        ...userState,
      }));
    }
  }, [userState]);

  var templateParams = {
    user_name: currentOrder.name ? currentOrder.name : user.name,
    user_email: currentOrder.email ? currentOrder.email : user.email,
  };
  console.log(templateParams);

  //El detalle es que esto nuca se llena con los datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      if (currentOrder || usuario) {
        try {
          const { id } = paymentMethod;
          const respuesta = await postCheckout(id, amountInCents);
          console.log(respuesta, "soy respuesta");

          if (respuesta === "succeeded") {
            setResponseMessage("Payment successful!");

            if (user.id) {
              await axios.post(
                `https://henrybuster.onrender.com/purchase/${usuario.id}`,
                userOrder
              );
            } else {
              await axios.post(
                "https://henrybuster.onrender.com/purchase/guest",
                currentOrder
              );
            }

            elements.getElement(CardElement).clear();
            clearCart();
            navigate("/");
            emailjs
              .send(
                "service_816e43q",
                "template_tcxw4vn",
                templateParams,
                "W3vt9Xtn4Qq49pmM4"
              )
              .then(
                function (response) {
                  console.log("SUCCESS!", response.status, response.text);
                },
                function (error) {
                  console.log("FAILED...", error);
                }
              );
          } else {
            setResponseMessage("Payment failed. Please try again.");
            elements.getElement(CardElement).clear();
          }
        } catch (error) {
          console.log(error);
          setResponseMessage("Payment failed. Please try again.");
          elements.getElement(CardElement).clear();
        }
      }
    } else {
      setResponseMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.cardForm}>
        <div className={style.encabezado}>
          <i className="bi bi-credit-card me-4 fs-5"></i>
          <label className={style.etiqueta1} htmlFor="cardholderName">
            Pay with card
          </label>
          <hr />
        </div>

        <div className={style.namediv}>
          <label className={style.etiqueta} htmlFor="cardholderName">
            Cardholder Name
          </label>
          <div className={style.nameInput}>
            <input
              id="cardholderName"
              type="text"
              className={style.nameInput}
            />
          </div>
        </div>
        <div className={style.cardFormItem}>
          <label className={style.etiqueta} htmlFor="cardElement">
            Card Information
          </label>
          <CardElement
            className={style.cardInfo}
            id="cardElement"
            options={{
              style: { base: { fontSize: "16px" } },
            }}
          />
        </div>
        <button
          className={`${style.boton} ${
            stripe && currentOrder && currentOrder.street !== ""
              ? ""
              : style.disabledButton
          }`}
          disabled={stripe && currentOrder && currentOrder.street === ""}
        >
          {loading ? (
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            `Submit Payment ${amountDolars}`
          )}
        </button>
        {responseMessage && (
          <p className='"d-flex align-items-center justify-content-center"'>
            {responseMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
