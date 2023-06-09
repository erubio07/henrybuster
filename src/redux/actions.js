import {
  GET_DETAIL,
  GET_MOVIES,
  GET_FORMAT,
  GET_GENRES,
  SPLIT_RECIPES,
  FILTER_BY_FORMAT,
  FILTER_BY_GENRES,
  GET_RANKING,
  FILTER_RANKING,
  GET_MOVIES_NAME,
  GET_LANGUAGES,
  GET_MOVIES_ADMIN,
  SPLIT_RECIPES_ADMIN,
  GET_MOVIES_NAME_ADMIN,
  POST_CHECKOUT,
  GET_ALL_USER,
  SPLIT_USERS,
  GET_USER,
  POST_ORDER,
  ORDER_DATA,
  ORDER_USER_DATA,
  CLEAN_ORDERS,
  DIRECTIONS,
  CLEAN_USER,
  GET_MY_ORDERS,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_FAVORITES,
} from "./action-type";

import axios from "axios";

export const getDetailMovie = (id) => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(
        `https://henrybuster.onrender.com/movie/${id}`
      );
      let payload = movie.data;

      return dispatch({
        type: GET_DETAIL,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const cleanDetail = () => {
  return function (dispatch) {
    try {
      let clean = {};

      return dispatch({
        type: GET_DETAIL,
        payload: clean,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const cleanUser = () => {
  return function (dispatch) {
    try {
      return dispatch({
        type: CLEAN_USER,
      });
    } catch (error) {
      return { error: error };
    }
  };
};
export const setDirections = (directions) => {
  return function (dispatch) {
    try {
      return dispatch({
        type: DIRECTIONS,
        payload: directions,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

// funciones en el home
export const getMovies = () => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(`https://henrybuster.onrender.com/movies`);
      let payload = movie.data;

      return dispatch({
        type: GET_MOVIES,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};
export const getUsers = () => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(`https://henrybuster.onrender.com/users`);
      let payload = movie.data;

      return dispatch({
        type: GET_ALL_USER,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};
export function splitUsers(inicio, fin) {
  return async (dispatch) => {
    dispatch({
      type: SPLIT_USERS,
      inicio,
      fin,
    });
  };
}

export const getMoviesName = (name) => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(
        `https://henrybuster.onrender.com/movies/search/guest?name=${name}`
      );
      let payload = movie.data;

      return dispatch({
        type: GET_MOVIES_NAME,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};
export const getMoviesNameAdmin = (name) => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(
        `https://henrybuster.onrender.com/movies/search?name=${name}`
      );
      let payload = movie.data;
      return dispatch({
        type: GET_MOVIES_NAME_ADMIN,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export function splitRecipes(inicio, fin) {
  return async (dispatch) => {
    dispatch({
      type: SPLIT_RECIPES,
      inicio,
      fin,
    });
  };
}
export const getMoviesAdmin = () => {
  return async function (dispatch) {
    try {
      let movie = await axios.get(
        `https://henrybuster.onrender.com/movies/admin`
      );
      let payload = movie.data;

      return dispatch({
        type: GET_MOVIES_ADMIN,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};
export function splitRecipesAdmin(inicio, fin) {
  return async (dispatch) => {
    dispatch({
      type: SPLIT_RECIPES_ADMIN,
      inicio,
      fin,
    });
  };
}

export const getRankingMovie = (id) => {
  return async function (dispatch) {
    try {
      let ratings = await axios.get(
        `https://henrybuster.onrender.com/rating/${id}`
      );

      let payload = ratings.data;

      return dispatch({
        type: GET_RANKING,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const cleanRatings = () => {
  return function (dispatch) {
    try {
      let clean = [];

      return dispatch({
        type: GET_RANKING,
        payload: clean,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export function getFormats() {
  return async (dispatch) => {
    const resp = await axios(`https://henrybuster.onrender.com/formats`);
    dispatch({
      type: GET_FORMAT,
      payload: resp.data,
    });
  };
}
export function getGenres() {
  return async (dispatch) => {
    const resp = await axios(`https://henrybuster.onrender.com/genres`);
    dispatch({
      type: GET_GENRES,
      payload: resp.data,
    });
  };
}

export function getLanguages() {
  return async (dispatch) => {
    const resp = await axios(`https://henrybuster.onrender.com/languages`);
    dispatch({
      type: GET_LANGUAGES,
      payload: resp.data,
    });
  };
}

export function filterByGenres(filtro) {
  return {
    type: FILTER_BY_GENRES,
    payload: filtro,
  };
}
export function filterByFormat(filtro) {
  return {
    type: FILTER_BY_FORMAT,
    payload: filtro,
  };
}

export function filterRatingStar(order) {
  return {
    type: FILTER_RANKING,
    payload: order,
  };
}

export const postCheckout = async (id, amount) => {
  try {
    const { data } = await axios.post(
      "https://henrybuster.onrender.com/checkout",
      { id, amount }
    );
    return data.status;
  } catch (error) {
    return { message: error };
  }
};

export const getUserById = (id) => {
  return async (dispatch) => {
    const { data } = await axios(`https://henrybuster.onrender.com/user/${id}`);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };
};

export function setOrder(formData) {
  return (dispatch) => {
    dispatch({
      type: ORDER_DATA,
      payload: formData,
    });
  };
}

export const postOrder = (orderData) => {
  return async (dispatch) => {
    try {
      const resp = await axios.post(
        "https://henrybuster.onrender.com/purchase/guest",
        orderData
      );
      dispatch({
        type: POST_ORDER,
        payload: {},
      });
    } catch (error) {
      return { message: error };
    }
  };
};

export function setUserOrder(formData) {
  return (dispatch) => {
    dispatch({
      type: ORDER_USER_DATA,
      payload: formData,
    });
  };
}

export const cleanOrders = () => {
  return function (dispatch) {
    try {
      let clean = {};

      return dispatch({
        type: CLEAN_ORDERS,
        payload: clean,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const getMyOrders = (uid) => {
  return async function (dispatch) {
    try {
      const orders = await axios(
        `https://henrybuster.onrender.com/purchase/${uid}`
      );

      const payload = orders.data;

      return dispatch({
        type: GET_MY_ORDERS,
        payload: payload,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const addFavorite = (id, MovieId) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `https://henrybuster.onrender.com/wishList/${id}`,
        { MovieId }
      );

      dispatch({
        type: ADD_FAVORITE,
        payload: response.data,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const getAllFavorites = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://henrybuster.onrender.com/wishList/${id}`
      );

      return dispatch({
        type: GET_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      return { error: error };
    }
  };
};

export const deleteFavorite = (id) => {
  return async function (dispatch) {
    try {
      console.log(id, "Antes del deelete");
      const response = await axios.delete(
        `https://henrybuster.onrender.com/wishList/${id}`
      );
      console.log(response);
    } catch (error) {
      return { message: error };
    }
  };
};
