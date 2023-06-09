import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./up.module.css";
import { useParams } from "react-router";

import Alert from "react-bootstrap/Alert";
import { getGenres } from "../../../redux/actions";
import { useDispatch } from "react-redux";

function UpdateGenre() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isOnlyLetters = (text) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnlyLetters(value) || value.length >= 20) {
      setError("have to be only letters and length less or equal 20");
      return;
    } else {
      setError("");
    }

    try {
      await axios.put(`https://henrybuster.onrender.com/genre/${id}`, {
        name: value,
      });
      dispatch(getGenres());
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1400);
    } catch (error) {}
  };

  const getGenre = async (genreId) => {
    try {
      const { data } = await axios.get(
        `https://henrybuster.onrender.com/genre/${genreId}`
      );

      setValue(data.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getGenre(id);
  }, [id]);
  return (
    <div style={{ background: "white" }}>
      <div className={`${s.formContainer}`}>
        <form className={s["movie-form"]}>
          <div>
            <h2>UPDATE GENRE</h2>
          </div>

          <div className={s["form-group"]}>
            <label htmlFor="genre">New Name: </label>
            <input
              id="genre"
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">Gender updated successfully</Alert>
          )}
          <button
            type="submit"
            className={s["submit-button"]}
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateGenre;
