import React from "react";
import style from '../Styles/SideBarUSer.module.css'
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";

function SideBarProfile({ handleUser, userRegister }) {
const usuario = useSelector((state) => state.user);

  return (
    <div className={style.body} >
      <div className="sidebar p-2">
        <div className="m-2">
          <i className="bi bi-person-circle me-3 fs-4"></i>
          <span className="brand-name fs-4">{usuario?.name? usuario.name : ''}</span>
        </div>

        <hr className="text-dark" />

        <div className="list-group list-group-flush">
          

          <div className="list-group-item py-2 text-start">
           

            <Link to={"/myProfile/Orders"} className={style.links}>
              <div>
                
                <i className="bi bi-bag-fill fs-5 me-3"></i>
                <span>My orders</span>
              </div>
            </Link>
            
          </div>

          <div className="list-group-item py-2 text-start">
           
           
            <Link to={"/myProfile/Adress"} className={style.links}>
              <div>
                <i className="bi bi-signpost-split fs-5 me-3"></i>
                <span>Add Information</span>
              </div>
            </Link>
            
          </div>

          <div className="list-group-item py-2 text-start">
            
            <Link to={"/myProfile/Whislist"} className={style.links}>
              <div>
                <i className="bi bi-heart-fill fs-5 me-3"></i>
                <span className="sub-category">Whish list</span>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarProfile;
