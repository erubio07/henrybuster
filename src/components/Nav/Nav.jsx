import React, { useContext, useEffect, useState } from "react";
import style from "../Styles/Nav.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from "../../img/logo_movie.jpg";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import {
  getMoviesName,
  cleanOrders,
  cleanUser,
  setDirections,
  getUserById,
} from "../../redux/actions";
import { CartContext } from "../Carrito/Context";



export const Nav = ({ handleUser, userRegister }) => {
  const { cartItems, clearCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const usuario = useSelector((state) => state.user);
  const handleSearch = (name) => {
    dispatch(getMoviesName(name));
  };
  const [userState, setUserState] = useState({ id: "", name: "" });
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      handleUser("");
      await logout();
      navigate("/");
      dispatch(cleanOrders());
      dispatch(cleanUser());
      dispatch(setDirections([]));
    } catch (error) {
      console.log(error);
    }
  };

  const perfil = user ? true : false;
  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.uid));
    }
  }, [user]);

  useEffect(() => {
    if (usuario) {
      setUserState((prev) => ({ ...prev, ...usuario }));
    }
  }, [usuario]);

  if (!user) {
    ("");
  } else {
    var email = user.email;
  }

  const itemsNumber = cartItems.length
 
  return (
    <nav className={style.nav}>
      <div className={style.containerLogo}>
        <img src={logo} alt="logo not found" className={style.logo} />
        {userRegister && (
          <p className={style.user}>
            <i className="fas fa-user-circle"></i>{" "}
            <span className={style.iconText}>BIENVENIDO </span>{" "}
            {userRegister.name}
          </p>
        )}
      </div>

      <div className={style.contentLink}>
        {userRegister.admin ? (
          <Link className={style.link} to="/admin">
            <i className="fa-solid fa-user-tie"></i>{" "}
            <span className={style.iconText}>ADMIN</span>
          </Link>
        ) : (
          ""
        )}

        <Link className={style.link} to="/">
          <i className="fa-solid fa-house"></i>{" "}
          <span className={style.iconText}>HOME</span>
        </Link>
        <Link className={style.link} to="/Cart">
          <i className="fa-solid fa-cart-shopping"></i>{" "}
          <span className={style.iconText}>CART({itemsNumber})</span>
        </Link>
        <Link className={style.link} to="/about">
          <i className="fa-solid fa-address-card"></i>{" "}
          <span className={style.iconText}>ABOUT</span>
        </Link>
        <Link hidden={perfil} className={style.link} to="/login">
          <i className="fas fa-key"></i>{" "}
          <span className={style.iconText}>LOGIN</span>
        </Link>
        {location.pathname !== "/admin/movies" && (
          <SearchBar handleSearch={handleSearch} />
        )}
         <Link hidden={!perfil} className={style.link} to="/myProfile">
          <i className="bi bi-person-fill"></i>{" "}
          <span className={style.iconText}>PROFILE</span>
        </Link>
        <Link
          hidden={!perfil}
          className={style.link}
          onClick={handleLogout}
          to="/"
        >
          <i
            className={`fa-solid fa-arrow-right-from-bracket ${style.logout}`}
          ></i>
        </Link>
      </div>
    </nav>
  );
};
