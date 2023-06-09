import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import BarChart from "./BarChart";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import emailjs from "@emailjs/browser";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [genres, setGenres] = useState([]);
  const [status, setStatus] = useState({
    id: "",
    status: "",
  });
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState(false);
  const [userModify, setUserModify] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const splitPur = (num) => {
    if (num === 1) {
      setPagination(purchases.slice(0, 10));
    } else {
      const inicio = num * 10 - 10;
      const fin = num * 10;
      setPagination(purchases.slice(inicio, fin));
    }
  };

  let pages = purchases
    .slice(0, Math.ceil(purchases.length / 10))
    .map((recipe, index) => index + 1);

  const getMovies = async () => {
    try {
      const data = await axios.get(
        `https://henrybuster.onrender.com/purchases`
      );

      setPurchases(data.data);

      setGenres(
        purchases
          .map((e) => e.Movies.map((x) => x.Genres.map((y) => y.name)))
          .flat(2)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleCick = async (id, info) => {
    console.log(info);
    const peticion = {
      status: info,
    };
    setStatus({
      id,
      status: info,
    });
    try {
      const data = await axios.put(
        `https://henrybuster.onrender.com/purchase/${id}`,
        peticion
      );
      setSuccess(true);

      setMessage("Purchase Canceled");
      setTimeout(() => {
        setColor("danger");
        setSuccess(false);
        setChange(true);
        setUserModify(id);
      }, 1000);
      setTimeout(() => {
        setMessage("");
        setColor("");
        setUserModify("");
        setChange(false);
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = async (id, name, email) => {
    setStatus({
      id,
      status: "Send",
    });
    const peticion = {
      status: "Send",
    };
    var templateParams = {
      user_name: name,
      user_email: email,
    };
    emailjs
      .send(
        "service_816e43q",
        "template_ym6wrh6",
        templateParams,
        "W3vt9Xtn4Qq49pmM4"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    try {
      const data = await axios.put(
        `https://henrybuster.onrender.com/purchase/${id}`,
        peticion
      );
      setSuccess(true);
      setChange(true);
      setMessage("Purchase Sending");
      setColor("success");
      setTimeout(() => {
        setSuccess(false);
        setUserModify(id);
      }, 1000);
      setTimeout(() => {
        setMessage("");
        setColor("");
        setUserModify("");
        setChange(false);
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // postPurch();
    getMovies();
  }, [success]);
  useEffect(() => {
    if (purchases.length) {
      splitPur(page);
      console.log(pagination);
    }
  }, [purchases]);
  useEffect(() => {}, [page]);

  return (
    <Container className="bg-white">
      <Row
        style={{
          height: "70px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col>
          <h1 style={{ width: "fit-content" }}>Users List:</h1>
        </Col>
        <Col style={{ height: "70px" }}>
          {change && (
            <Alert variant={color} show={change}>
              <Alert.Heading>{message}</Alert.Heading>
            </Alert>
          )}
        </Col>
      </Row>
      <Row
        style={{
          height: "500px",
          overflowY: "auto",
        }}
      >
        <Table striped hover>
          <thead>
            <tr>
              <th>Id Compra</th>
              <th>User</th>
              <th>Movie Id</th>
              <th>Status</th>

              <th>Total</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {pagination &&
              pagination.map((e) => (
                <tr
                  key={e.id}
                  style={
                    e.status === "cancelled"
                      ? {
                          background: "rgb(250,0,0,0.5)",
                        }
                      : null
                  }
                  className={e.status === "Send" ? "bg-success" : null}
                >
                  <td>{e.id}</td>
                  <td>{e.User.name}</td>
                  <td>
                    {e.Movies.map((x) => {
                      return x.id;
                    }).join(", ")}
                  </td>
                  <td>
                    {status.status && status.id === e.id
                      ? status.status
                      : e.status}
                  </td>
                  <td>
                    $
                    {e.Movies.reduce((accumulator, movie) => {
                      return (
                        accumulator + movie.PurchaseMovie.quantity * movie.price
                      );
                    }, 0).toFixed(2)}
                  </td>

                  {e.status !== "cancelled" && (
                    <td>
                      <button onClick={() => handleCick(e.id, "cancelled")}>
                        <i
                          class="fa-solid fa-square-xmark"
                          style={{ color: "#fa1f2b" }}
                        ></i>
                      </button>
                      <button
                        style={{ marginLeft: "2px" }}
                        onClick={() =>
                          handleSuccess(e.id, e.User.name, e.User.email)
                        }
                      >
                        <i
                          class="fa-solid fa-check"
                          style={{ color: "#25fa1f" }}
                        ></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        {" "}
        <Pagination
          className="d-flex justify-content-center mt-2"
          style={{ width: "100%", flexWrap: "wrap", paddingBottom: "18px" }}
        >
          <Pagination.Prev
            disabled={page === 1 ? true : false}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
                splitPur(page - 1);
              }
            }}
          />
          {pages.map((e) => (
            <Pagination.Item
              key={e}
              onClick={() => {
                setPage(e);
                splitPur(e);
              }}
              active={e === page}
            >
              {e}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === pages.length ? true : false}
            onClick={() => {
              if (page < pages.length) {
                setPage(page + 1);
                splitPur(page + 1);
              }
            }}
          />
        </Pagination>
      </Row>
      {/* <Row style={{ height: "400px" }}>
        <BarChart genres={genres} purchases={purchases} />
      </Row> */}
    </Container>
  );
}

export default Purchases;
