import React, { useState, useEffect } from "react";
import s from "./Create.module.css";
import {
  getFormats,
  getLanguages,
  getGenres,
} from "../../../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tag from "../../../Tags/Tags";
import Sidebar from "../../Sidebar";

import Alerts from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export const CreateMovie = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const languages = useSelector((state) => state.languages);
  const genres = useSelector((state) => state.genres);
  const formats = useSelector((state) => state.format);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [FormatId, setFormatId] = useState("");
  const [LanguageId, setLanguageId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [genreTags, setGenreTags] = useState([]);
  const [genre, setGenre] = useState({ id: "", name: "" });
  const [validation, setValidation] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    date: "",
    FormatId: "",
    LanguageId: "",
    quantity: "",
    genre: "",
  });
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTag = (event) => {
    event.preventDefault();
    const newTag = genre;
    if (!genreTags.some((x) => x.id === newTag.id))
      if (newTag.id !== "0" && newTag.id) setGenreTags([...genreTags, newTag]);
  };

  const handleRemoveTag = (tagToRemove) => {
    setGenreTags(genreTags.filter((tag) => tag.name !== tagToRemove));
  };

  const handleGenreChange = (event) => {
    const selectedValue = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;

    setGenre({ id: selectedValue, name: selectedText });
  };

  const validationHandler = () => {
    let newValidation = {};
    if (!name || name.length > 100)
      newValidation.name =
        "Name can't be empty and can't contain more than 100 letters";
    else newValidation.name = "";

    if (!image) newValidation.image = "Image can't be empty";
    else newValidation.image = "";

    if (!description || description.length > 1000)
      newValidation.description =
        "Description can't be empty and can't contain more than 1000 letters";
    else newValidation.description = "";

    if (Number(price) <= 0)
      newValidation.price = "Price can't be 0 and less than 0";
    else newValidation.price = "";

    if (!date) newValidation.date = "Data can't be empty";
    else newValidation.date = "";

    if (!FormatId) newValidation.FormatId = "Format can't be empty";
    else newValidation.FormatId = "";

    if (!LanguageId) newValidation.LanguageId = "Language can't be empty";
    else newValidation.LanguageId = "";

    if (Number(quantity) <= 0)
      newValidation.quantity = "Quantity can't be 0 and less than 0";
    else newValidation.quantity = "";

    if (genreTags.length === 0)
      newValidation.genre = "The movie need have at least one genre";
    else newValidation.genre = "";

    setValidation(newValidation);

    return newValidation;
  };

  const submitHandler = async (e) => {
    const imageElement = document.querySelector("#image");
    imageElement.value = "";
    e.preventDefault();
    let valid = validationHandler();

    if (
      !valid.name &&
      !valid.image &&
      !valid.description &&
      !valid.price &&
      !valid.date &&
      !valid.FormatId &&
      !valid.LanguageId &&
      !valid.quantity &&
      !valid.genre
    ) {
      await axios.post("https://henrybuster.onrender.com/movie", {
        name,
        image,
        description,
        price,
        date,
        FormatId,
        LanguageId,
        quantity,
        genres: [...genreTags].map((x) => Number(x.id)),
      });

      const imageElement = document.querySelector("#image");
      imageElement.value = "";
      setImage("");
      const formatElement = document.querySelector("#format");
      formatElement.value = "";
      setFormatId("");
      const languageElement = document.querySelector("#language");
      languageElement.value = "";
      setLanguageId("");
      const genreElement = document.querySelector("#genres");
      genreElement.value = "";
      setGenreTags([]);
      setGenre({ id: "", name: "" });

      setLanguageId("");
      setName("");
      setDescription("");
      setPrice("");
      setDate("");
      setQuantity("");
      setLoading(true);
      setErr(false);

      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 800);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
    // history.push("/home");
  };

  const preset_key = "compumundo";
  const cloud_name = "dpqjfpdt0";

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getFormats());
    dispatch(getLanguages());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={s.formContainer}>
      <form className={s["movie-form"]}>
        <div className={s["form-group"]}>
          <h2>CREATE NEW MOVIE</h2>
        </div>

        <div className={s["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <span>{validation.name}</span>
        <div className={s["form-group"]}>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={uploadImage} />
        </div>
        {image && (
          <div className={s["form-group"]} style={{ maxWidth: "200px" }}>
            <label>Preview:</label>
            <img src={image} alt="Preview" />
          </div>
        )}
        <span>{validation.image}</span>
        <div className={s["form-group"]}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <span>{validation.price}</span>
        <div className={s["form-group"]}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <span>{validation.quantity}</span>
        <div className={s["form-group"]}>
          <label>Select a date:</label>
          <DatePicker
            selected={date}
            onChange={(val) => setDate(val)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <span>{validation.date}</span>
        <div className={s["form-group"]}>
          <label htmlFor="format">Format:</label>
          <select
            id="format"
            onChange={(event) => setFormatId(event.target.value)}
            defaultValue=""
          >
            <option key={0} value="">
              Select a Format
            </option>
            {formats.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <span>{validation.FormatId}</span>

        <div className={s["form-group"]}>
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            onChange={(event) => setLanguageId(event.target.value)}
            defaultValue=""
          >
            <option key={0} value="">
              Select a language
            </option>
            {languages.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <span>{validation.LanguageId}</span>

        <div className={s["form-group"]}>
          <label htmlFor="description">Description:</label>
          <textarea
            type="number"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <span>{validation.description}</span>

        <span>{validation.description}</span>
        <div className={s["form-group"]}>
          <label htmlFor="genres">Genres:</label>
          <div className={s.selectAdd}>
            <select id="genres" onChange={handleGenreChange}>
              <option key={0} value="">
                Seleccione una opción
              </option>
              {genres.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
            <button className={s["add-button"]} onClick={handleAddTag}>
              Agregar
            </button>
          </div>
        </div>

        <span>{validation.genre}</span>
        <div className={s["tags-container"]}>
          {genreTags.map((tag) => (
            <Tag
              key={tag.id}
              tagName={tag.name}
              onRemoveTag={handleRemoveTag}
            />
          ))}
        </div>
        {err && (
          <Alerts variant="danger" className="fixed-bottom">
            Please fill the form correctly
          </Alerts>
        )}
        {success && (
          <Alerts variant="success" className="fixed-bottom">
            Movie created successfully
          </Alerts>
        )}
        <button
          type="submit"
          className={s["submit-button"]}
          onClick={submitHandler}
          disabled={loading ? true : false}
        >
          Enviar
        </button>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}
      </form>
    </div>
  );
};
