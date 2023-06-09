import React, { useState } from "react";
//import style from "./Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { cleanOrders, cleanUser, setDirections } from "../../redux/actions";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function Sidebar({ handleUser, userRegister }) {
  const isMdAndUp = useMediaQuery({ minWidth: 660 });
  const [show, setShow] = useState(isMdAndUp);

  const dispatch = useDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div className={"body"}>
      <>
        <div className="buttonShow">
          <Button variant="danger" onClick={handleShow}>
            Show Panel <i class="fa-solid fa-arrow-right"></i>
          </Button>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <div className="logo">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="py-4">
                  <i className="bi bi-person-circle me-3 fs-4"></i>
                  <span className="brand-name fs-4">Panel Admin</span>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
          </div>
          <Offcanvas.Body className={`barraLateral`}>
            <nav className={`menu d-sm-block justify-content-center flex-wrap`}>
              <Link to={"/admin"} className="link-no-style">
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span>Dashboard</span>
              </Link>

              <Link to={"/admin/movies"} className="link-no-style">
                <div>
                  <i className="bi bi-file-ruled fs-5 me-3"></i>
                  <span>All movies</span>
                </div>
              </Link>
              <Link to={"/admin/create"} className="link-no-style">
                <div>
                  <i className="bi bi-collection-play-fill fs-5 me-3"></i>
                  <span className="sub-category">Create new movie</span>
                </div>
              </Link>
              <Link to={"/admin/AllGenre"} className="link-no-style">
                <div>
                  <i className="bi bi-file-ruled fs-5 me-3"></i>
                  <span>All Genres</span>
                </div>
              </Link>
              <Link to={"/admin/create/genre"} className="link-no-style">
                <div>
                  <i className="bi bi-columns-gap fs-5 me-3"></i>
                  <span className="sub-category">Create Genre</span>
                </div>
              </Link>
              <Link to={"/admin/users"} className="link-no-style">
                <div>
                  <i className="fa-solid fa-user fs-5 me-3"></i>
                  <span className="sub-category">Users</span>
                </div>
              </Link>
              <Link to={"/admin/purchases"} className="link-no-style">
                <div>
                  <i class="fa-solid fa-cart-shopping fs-6 me-3"></i>
                  <span className="sub-category">Purchases</span>
                </div>
              </Link>
              <Link to={"/admin/stadistics"} className="link-no-style">
                <div>
                  <i class="fa-sharp fa-solid fa-chart-simple me-3"></i>
                  <span className="sub-category">Stadistics</span>
                </div>
              </Link>
              <Link to={"/"} className="link-no-style">
                <div style={{ textAlign: "center" }}>
                  <i className="fa-solid fa-house"></i> {""}
                  <span className="sub-category">Home</span>
                </div>
              </Link>

              <Link onClick={handleLogout}>
                <div style={{ textAlign: "center" }}>
                  <i className={`fa-solid fa-arrow-right-from-bracket `}> </i>{" "}
                  <span className="sub-category">LogOut</span>
                </div>
              </Link>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
}

export default Sidebar;
