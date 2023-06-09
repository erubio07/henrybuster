import {
  GET_DETAIL,
  GET_MOVIES,
  GET_MOVIES_NAME,
  GET_FORMAT,
  GET_GENRES,
  SPLIT_RECIPES,
  FILTER_BY_GENRES,
  FILTER_BY_FORMAT,
  GET_RANKING,
  FILTER_RANKING,
  GET_LANGUAGES,
  GET_MOVIES_ADMIN,
  SPLIT_RECIPES_ADMIN,
  GET_MOVIES_NAME_ADMIN,
  POST_CHECKOUT,
  GET_USER,
  GET_ALL_USER,
  SPLIT_USERS,
  ORDER_DATA,
  POST_ORDER,
  ORDER_USER_DATA,
  CLEAN_ORDERS,
  DIRECTIONS,
  CLEAN_USER,
  GET_MY_ORDERS,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_FAVORITES,
} from "./action-type";

const INITIAL_STATE = {
  detail: {},
  movies: [],
  moviesSearchResults: [], // Nueva propiedad para almacenar los resultados de búsqueda
  moviesFilter: [],
  paginado: [],
  ratings: [],
  format: [],
  genres: [],
  languages: [],
  ratingsFilter: [],
  moviesAdmin: [],
  paginadoAdmin: [],
  user: {id:"", name:""},
  currentOrder:{},
  allAdress:{},
  allUsers: [],
  usersPaginado: [],
  currentUserOrder:{},
  directions:{},
  myOrders:[],
  myFavorites: [],
};

export default function rootReducer(
  state = INITIAL_STATE,
  { type, payload, inicio, fin }
) {
  switch (type) {
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };

    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload,
      };

    case GET_MOVIES:
      const results = payload.slice(0, 9);
      return {
        ...state,
        paginado: results,
        movies: payload,
        moviesFilter: payload,
      };

    case GET_MOVIES_ADMIN:
      const allResults = payload.slice(0, 10);
      return {
        ...state,
        paginadoAdmin: allResults,
        moviesAdmin: payload,
      };

    case SPLIT_RECIPES_ADMIN:
      const resultAdmin = state.moviesAdmin.slice(inicio, fin);
      return {
        ...state,
        paginadoAdmin: resultAdmin,
      };

    case SPLIT_RECIPES:
      const result = state.moviesFilter.slice(inicio, fin);
      return {
        ...state,
        paginado: result,
      };

    case GET_RANKING:
      return {
        ...state,
        ratings: payload,
        ratingsFilter: payload,
      };

    case GET_FORMAT:
      return {
        ...state,
        format: payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case FILTER_BY_GENRES:
      console.log(payload);
      if (payload === "All-Genres") {
        return {
          ...state,
          moviesFilter: state.movies,
          paginado: state.movies,
        };
      } else {
        const data = state.movies.filter((movie) =>
          movie.Genres.some((genre) => genre.name === payload)
        );
        console.log(data);
        return {
          ...state,
          paginado: data,
          moviesFilter: data,
        };
      }

    case FILTER_BY_FORMAT:
      console.log(payload);
      if (payload === "All-Format") {
        return {
          ...state,
          moviesFilter: state.movies,
          paginado: state.movies,
        };
      } else {
        const data = state.movies.filter(
          (movie) => movie.Format.name === payload
        );
        console.log(data);
        return {
          ...state,
          paginado: data,
          moviesFilter: data,
        };
      }

    case FILTER_RANKING:
      let ratingsFiltered = [...state.ratings];
      console.log(ratingsFiltered, "inicio");
      if (payload === "All") {
        ratingsFiltered = state.ratings;
        console.log(ratingsFiltered, "if all");
      } else {
        const rating = payload;
        console.log(rating, "nuemero que recibe");
        ratingsFiltered = ratingsFiltered.filter(
          (item) => item.rating === rating
        );
        console.log(ratingsFiltered, "despues de filtrar");
      }

      return {
        ...state,
        ratingsFilter: ratingsFiltered,
      };

    case GET_MOVIES_NAME:
      return {
        ...state,
        moviesSearchResults: payload,
        moviesAdmin: payload,
      };
    case GET_MOVIES_NAME_ADMIN:
      console.log(payload);
      const allResultsFilter = payload.slice(0, 10);
      return {
        ...state,
        moviesAdmin: payload,
        paginadoAdmin: allResultsFilter,
      };
    case GET_ALL_USER:
      if (!state.usersPaginado.length) {
        const asd = payload.slice(0, 10);
        return {
          ...state,
          allUsers: payload,
          usersPaginado: asd,
        };
      } else {
        return {
          ...state,
          allUsers: payload,
        };
      }
    case SPLIT_USERS:
      const resultUser = state.allUsers.slice(inicio, fin);
      return {
        ...state,
        usersPaginado: resultUser,
      };

    case POST_CHECKOUT:
      return {
        ...state,
      };

      case GET_USER:
        return{
          ...state,
          user: payload
        }

      case ORDER_DATA:
 
      return {
        ...state,
        currentOrder:payload
      };
      
      case ORDER_USER_DATA:
  
      return {
        ...state,
        currentUserOrder:payload
      };

      case POST_ORDER:
     
      return {
        ...state,
        currentOrder:payload
      };
      case CLEAN_ORDERS:
     
      return {
        ...state,
        currentOrder:payload,
        currentUserOrder: payload
      };
      case DIRECTIONS:
        return{
          ...state,
          directions: payload
        }

        case CLEAN_USER:
          return{
            ...state,
            user:{id:"",name:""}
          }
      case GET_MY_ORDERS:
        console.log(payload, 'soy payload')
        return{
          ...state,
          myOrders: payload
        }
        case ADD_FAVORITE:
            return {
                ...state,
                myFavorites: payload,
            }

            case GET_FAVORITES:
              return {
                  ...state,
                  myFavorites: payload,
                  
              }
    default:
      return state;
  }
}
