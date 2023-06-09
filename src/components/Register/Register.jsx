import { useState } from "react";
//import { Navbar } from "../../components";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
//import "./register.css";
import {
  useUserStore,
  fetchUsers,
  getUserById,
  registerUser,
  updateUser,
  setCurrentUser,
} from "../../redux/users.js";
import { useDispatch } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({
    namecomplete:"",
    username:"",
    email: "",
    phonenumber: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    //console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //console.log(user);
    try {
      const userCredential = await signup(user.email, user.password);
      const user2 = userCredential.user;
      const userData = {
        id: user2.uid,
        username: user.username,
        name: user.namecomplete,
        phoneNumber: user.phonenumber,
        email: user.email,
        admin: false,
        // otros detalles del usuario
      };
      dispatch(registerUser(userData));
      navigate("/");
      //await verifyEmail();
    } catch (error) {
      //console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <main className="container main vh-100 d-flex flex-column justify-content-center">
      <article className="grid d-flex flex-column bg-light p-5 rounded justify-content-center">
        <div>
          <hgroup>
            <h1><i className="fa-solid fa-user-plus"></i> Sign in</h1>
            {error && <h2>{error}</h2>}
          </hgroup>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="namecomplete"
                placeholder="Name"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="******"
                className="form-control py-2"
                autoComplete="current-password"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </article>
    </main>
  );
};
export default Register;
