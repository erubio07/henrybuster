import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./style.module.css";
import Chart from "chart.js/auto";
import axios from "axios";

import Container from "react-bootstrap/esm/Container";

const BarChartGenres = () => {
  const [genreName, setGenreName] = useState([]);
  const [genreValue, setGenreValue] = useState([]);

  const [purchases, setPurchases] = useState([]);

  const getMovies = async () => {
    try {
      const data = await axios.get(
        `https://henrybuster.onrender.com/purchases`
      );

      setPurchases(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const x = purchases.flatMap((e) =>
      e.Movies.reduce((result, movie) => {
        if (e.status !== "cancelled") {
          movie.Genres.forEach((genre) => {
            const genreName = genre.name;
            const purchaseQuantity = movie.PurchaseMovie.quantity;

            const existingIndex = result.findIndex(
              (item) => item.genreName === genreName
            );
            if (existingIndex !== -1) {
              result[existingIndex].purchaseQuantity += purchaseQuantity;
            } else {
              result.push({ genreName, purchaseQuantity });
            }
          });
        }

        return result;
      }, [])
    );

    const summedGenresData = x.reduce((result, item) => {
      const { genreName, purchaseQuantity } = item;
      if (result.hasOwnProperty(genreName)) {
        result[genreName] += purchaseQuantity;
      } else {
        result[genreName] = purchaseQuantity;
      }
      return result;
    }, {});

    const sortedArray = Object.entries(summedGenresData).sort(
      (a, b) => b[1] - a[1]
    );

    const sortedObject = Object.fromEntries(sortedArray);

    const genreNames = Object.keys(sortedObject);
    const genreValues = Object.values(sortedObject);

    setGenreName(genreNames);
    setGenreValue(genreValues);
  }, [purchases]);

  const data = {
    labels: genreName,
    datasets: [
      {
        label: "Genres",
        data: genreValue,
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "category",
      },
    },
  };

  return (
    <div style={{ width: "500px" }}>
      <h1>Stadistics By Genres</h1>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChartGenres;
