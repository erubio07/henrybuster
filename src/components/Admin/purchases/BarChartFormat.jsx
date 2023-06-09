import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

import Container from "react-bootstrap/esm/Container";

const BarChartFormat = () => {
  const [formatName, setFormatName] = useState([]);
  const [formatValue, setFormatValue] = useState([]);
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
          const formatName = movie.Format.name;
          const purchaseQuantity = movie.PurchaseMovie.quantity;

          const existingIndex = result.findIndex(
            (item) => item.formatName === formatName
          );
          if (existingIndex !== -1) {
            result[existingIndex].purchaseQuantity += purchaseQuantity;
          } else {
            result.push({ formatName, purchaseQuantity });
          }
        }

        return result;
      }, [])
    );

    const summedFormatsData = x.reduce((result, item) => {
      const { formatName, purchaseQuantity } = item;
      if (result.hasOwnProperty(formatName)) {
        result[formatName] += purchaseQuantity;
      } else {
        result[formatName] = purchaseQuantity;
      }
      return result;
    }, {});

    const sortedArray = Object.entries(summedFormatsData).sort(
      (a, b) => b[1] - a[1]
    );

    const sortedObject = Object.fromEntries(sortedArray);

    const formatNames = Object.keys(sortedObject);
    const formatValues = Object.values(sortedObject);

    setFormatName(formatNames);
    setFormatValue(formatValues);
    console.log(formatName);
    console.log(formatValue);
  }, [purchases]);

  const data = {
    labels: formatName,
    datasets: [
      {
        label: "Format",
        data: formatValue,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
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
      {" "}
      {/* Color de fondo blanco de la aplicación */}
      <h1>Stadistics By Format</h1>
      <div style={{ width: "500px", backgroundColor: "#fff" }}>
        {" "}
        {/* Color de fondo del gráfico y espacio interior */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChartFormat;
