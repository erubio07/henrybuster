import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, filterByFormat } from "../../../redux/actions";

import style from "./FilterMovies.module.css";

function FilterMovies({ split }) {
  const { genres, format } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(filterByGenres(e.target.value));
    split(1);
  };
  const handleFormat = (e) => {
    dispatch(filterByFormat(e.target.value));
    split(1);
  };

  return (
    <div className={style.body}>
      <select onChange={handleClick}>
        <option value="All-Genres" defaultValue="All-Genres">
          Genres
        </option>
        {genres
          ? genres.map((e, i) => (
              <option key={i} value={e.name} style={{ marginTop: "1px" }}>
                {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              </option>
            ))
          : null}
      </select>
      <select onChange={handleFormat}>
        <option value="All-Format" defaultValue="All-Format">
          Format
        </option>
        {format
          ? format.map((e, i) => (
              <option key={i} value={e.name} style={{ marginTop: "1px" }}>
                {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              </option>
            ))
          : null}
      </select>
    </div>
  );
}

export default FilterMovies;
