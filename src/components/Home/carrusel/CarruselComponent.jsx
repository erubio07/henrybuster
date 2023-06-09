import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";

import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import style from "./carrusel.module.css";

import { CartContext } from "../../Carrito/Context";

function CarouselFadeExample() {
  const { movies } = useSelector((state) => state);
  const { addItemToCart } = useContext(CartContext);

  const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
  const top10Movies = sortedMovies.slice(0, 10);

  return (
    <div className={style.body}>
      <Carousel fade>
        {top10Movies.map((e, i) => (
          <Carousel.Item key={i}>
            <img className={style.img} src={e.image} alt={e.name} />
            <Carousel.Caption className={style.controls}>
              <div className={style.text}>
                <Link
                  to={`/movie/${e.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className={style.bodyTitle}>
                    <h3>{e.name}</h3>
                    <p>
                      Format:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>
                        {e.Format.name}
                      </span>
                    </p>
                  </div>
                  <p>{e.description}</p>
                </Link>
                <div className={style.button}>
                  <Button onClick={() => addItemToCart(e)}>Add to cart</Button>
                  <Link to={"/Cart"}>
                    <Button>View cart</Button>
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselFadeExample;
