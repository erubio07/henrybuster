import React from "react";
import { useSelector } from "react-redux";
import style from "../Styles/SearchResult.module.css";
import Cards from "../Home/cards/Cards";

const SearchResult = () => {
    const moviesSearchResults = useSelector((state) => state.moviesSearchResults);
  
    return (
      <div className={style.container}>
        <h1 className={style.title}>
          {moviesSearchResults.length > 0
            ? "Estos son los resultados"
            : "No se encontraron resultados"}
        </h1>
        <div>
        <div className={style.containerResult}>
          {moviesSearchResults && 
            moviesSearchResults.map((e) => (
              <div key={e.id}>
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
              </div>
            ))
          }
        </div>
        </div>
      </div>
    );
  };

export default SearchResult;