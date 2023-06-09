import { useEffect, useState } from "react";
import style from "../Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  splitRecipes,
  getFormats,
  getGenres,
} from "../../redux/actions";

import Cards from "./cards/Cards";
import Paginado from "./paginado/Paginado";
import FilterMovies from "./Filter/FilterMovies";
import CarouselFadeExample from "./carrusel/CarruselComponent";
import NewMovie from "./agregadasRecientemente/NewMovie";
import { useAuth } from "../../context/authContext";

export const Home = ({ handleUser }) => {
  const dispatch = useDispatch();
  const { paginado, moviesFilter, movies, userRegister } = useSelector(
    (state) => state
  );

  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(moviesFilter.length / itemsPerPage);
  const maxPagesToShow = 5;

  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  // let pages = moviesFilter
  //   .slice(0, Math.ceil(moviesFilter.length / 10))
  //   .map((recipe, index) => index + 1);

  const split = (num) => {
    setCurrentPage(num);
    const startIndex = (num - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    dispatch(splitRecipes(startIndex, endIndex));
  };

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getFormats());
    dispatch(getGenres());
    if (user) {
      handleUser(user.uid);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      handleUser(user.uid);
    }
  }, [dispatch]);

  return (
    <>
      <div className={style.bodyHome}>
        <h1 className={style.title}>The Most Voted</h1>
        <CarouselFadeExample className={style.carrusel} />
        <hr style={{ color: "white", marginTop: "-30px" }} />
        <h1 className={style.title}>Recently Added</h1>
        <NewMovie></NewMovie>
        <hr style={{ color: "white", marginTop: "90px" }} />

        <h1 className={style.title}>All the movies</h1>

        <FilterMovies split={split} />

        <Paginado
          pages={pages}
          currentPage={currentPage}
          split={split}
          totalPages={totalPages}
        />
        <div className={style.body}>
          {paginado &&
            paginado.map((e) => (
              <Cards
                movies={e}
                price={e.price}
                format={e.Format.name}
                name={e.name}
                image={e.image}
                id={e.id}
                key={e.id}
                genres={e.genres}
              />
            ))}
        </div>
        <Paginado
          pages={pages}
          currentPage={currentPage}
          split={split}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
