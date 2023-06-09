import React, { useState, useEffect } from "react";
import style from "./NewMovie.module.css";
import { useSelector } from "react-redux";
import Cards from "../cards/Cards";
import Spinner from "react-bootstrap/Spinner";

function NewMovie() {
  const { movies } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  const NewMovies = movies.slice(-8).reverse();

  useEffect(() => {
    if (movies) {
      setLoading(false);
    }
  }, [movies]);

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={style.body}>
          {NewMovies &&
            NewMovies.map((e) => (
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
      )}
    </>
  );
}

export default NewMovie;
