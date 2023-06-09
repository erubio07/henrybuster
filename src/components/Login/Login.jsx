import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import s from "./Login.module.css"
import {
  useUserStore,
  fetchUsers,
  getUserById,
  registerUser,
  updateUser,
  setCurrentUser,
} from "../../redux/users.js";
import { app, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {


   const { user, login, loginwithgoogle, resetPassword } = useAuth();
   const navigate = useNavigate();

  /* useEffect(() => {
     if (user) {
       navigate("/");
     } else {
       navigate("/login");
     }
   }, [navigate, user]);*/

   

  const dispatch = useDispatch();
  //const state = useUserStore.getState();
  const users = useSelector((state) => state.users);
  // const getUserById = useSelector(state.getUserById);
  // const registerUser = useSelector(state.registerUser);

  //const setUserStore = useUserStore((state) => state.setUser);
  //const getUserById = useUserStore((state) => state.getUserById);
  //const registerUser = useUserStore((state) => state.registerUser);

   const [userlogin, setUser] = useState({
     email: "",
     password: "",
   });

  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    //console.log(name, value);
    setUser({ ...userlogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //console.log(user);
    try {
      const result = await login(userlogin.email, userlogin.password);
      const user = result.user;

      if (user !== null) {
        const userData = {
          id: user.uid,
          email: user.email,
          admin: false,
          //photoURL: user.photoURL,
          // otros detalles del usuario
        };
        setUser(userData);
        const userDb = await dispatch(getUserById(user.uid));
         if (!userDb) {
          //console.log("here");
          //const userDoc = doc(db, "users", user.uid);
          //console.log(userDoc);
          //await setDoc(userDoc, userData);
          
          await dispatch(registerUser(userData));
          //console.log(save);
        }
      //await login(userlogin.email, userlogin.password);
      }
      navigate("/");
      userlogin.sendEmailVerification();
    } catch (error) {
      //console.log(error.message);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await loginwithgoogle();
      const user = result.user;
      if (user !== null) {
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          admin: false,
          phoneNumber: user.phoneNumber,
          //photoURL: user.photoURL,
          // otros detalles del usuario
        };

        setUser(userData);
        const userDb = await dispatch(getUserById(user.uid));
        //console.log(userDb);

        if (!userDb) {
          //console.log("here");
          //const userDoc = doc(db, "users", user.uid);
          //console.log(userDoc);
          //await setDoc(userDoc, userData);

          await dispatch(registerUser(userData));
          //console.log(save);
        }
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };


const handleResetPassword = async () => {
  if(!userlogin.email) setError("Please enter your email");
  try {
   await resetPassword(userlogin.email);
   setError("We sent you an email with a link to reset password")
  } catch (error) {
    setError(error.message);
  }
}

   if (user) {
     return <Navigate to='/' />;
   }
   
   return (
    <main className="container main vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <article className={`grid d-flex bg-light flex-column p-5 rounded justify-content-center ${s.container2}`}>
        <div>
          <hgroup>
            <h1><i className="fa-solid fa-user"></i> Login</h1>
            {error && <h2>{error}</h2>}
          </hgroup>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                aria-label="E-mail"
                autoComplete="E-mail"
                required
                id="email"
                className="form-control py-3"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="******"
                aria-label="Password"
                autoComplete="current-password"
                id="password"
                className="form-control py-3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
             
            </div>
          </form>
          <div>
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>
              Login with Google
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-4">
          <Link to="/register" >Sign up</Link>
          <a href="#!"  onClick={handleResetPassword}>
          Forgot Password?
        </a>
        </div>
      </article>
    </main>
  );
};

export default Login;
