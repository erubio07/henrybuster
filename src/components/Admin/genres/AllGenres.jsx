import React, { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";

import Sidebar from "../Sidebar";

import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../redux/actions";

function AllGenres() {
  const { genres } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [genrePage, setGenrePage] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const handlePage = (inicio, fin) => {
    setGenrePage(genres.slice(inicio, fin));
  };
  const split = (num) => {
    if (num === 1) {
      handlePage(0, 10);
    } else {
      const inicio = num * 10 - 10;
      const fin = num * 10;
      handlePage(inicio, fin);
    }
  };

  let pages = genres
    .slice(0, Math.ceil(genres.length / 10))
    .map((recipe, index) => index + 1);

  useEffect(() => {
    if (!genrePage.length) {
      dispatch(getGenres());
      setGenrePage(genres.slice(0, 10));
    }
  }, [dispatch, genres]);
  return (
    <Container fluid={true} className="mt-4 bg-white" style={{ width: "100%" }}>
      <h1>Genres:</h1>
      <div
        style={{
          height: "500px",
          overflowY: "auto",
        }}
      >
        {actualizar ? (
          <Button
            style={{ marginTop: "250px" }}
            onClick={() => {
              setGenrePage(genres.slice(0, 9));
              setActualizar(false);
            }}
          >
            Click para ver lista!
          </Button>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {genrePage &&
                genrePage.map((e, i) => (
                  <tr key={i}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>

                    <td>
                      <Link to={`/admin/update/genre/${e.id}`}>update</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
      <Pagination
        className="d-flex justify-content-center mt-2"
        style={{ width: "100%", flexWrap: "wrap", paddingBottom: "17px" }}
      >
        <Pagination.Prev
          disabled={page === 1 ? true : false}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);

              split(page - 1);
            }
          }}
        />
        {pages.map((e) => (
          <Pagination.Item
            key={e}
            onClick={() => {
              setPage(e);
              split(e);
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
              split(page + 1);
            }
          }}
        />
      </Pagination>
    </Container>
  );
}

export default AllGenres;
