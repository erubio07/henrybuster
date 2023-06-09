import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

// Acciones
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const SET_CURRENT_USER = "SET_CURRENT_USER";

// Acción para actualizar los usuarios en el estado
const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

// Acción para establecer el usuario actual en el estado
const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// Acción asincrónica para obtener los usuarios de la API
const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("https://henrybuster.onrender.com/users");
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

// Acción asincrónica para obtener un usuario por su ID
const getUserById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://henrybuster.onrender.com/user/${id}`
    );
    dispatch(fetchUsersSuccess(response.data));
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Acción asincrónica para registrar un usuario
const registerUser = (userData) => async (dispatch) => {
  //  const registerUser = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(
      "https://henrybuster.onrender.com/user",
      userData
    );
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Acción asincrónica para actualizar un usuario
const updateUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.put("/user", userData);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Reductor
const initialState = {
  users: [],
  currentUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

// Crear el store de Redux
const useUserStore = createStore(userReducer, applyMiddleware(thunk));

export {
  useUserStore,
  fetchUsers,
  getUserById,
  registerUser,
  updateUser,
  setCurrentUser,
};
