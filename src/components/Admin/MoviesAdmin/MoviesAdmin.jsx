import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal

import Sidebar from "../Sidebar";
import {
  getMoviesAdmin,
  getMoviesNameAdmin,
  splitRecipesAdmin,
} from "../../../redux/actions";
import { Link } from "react-router-dom";
import SearchBarAdmin from "./SearchBarAdmin";

function MoviesAdmin() {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal de eliminación
  const [deleteItemId, setDeleteItemId] = useState(""); // Estado para almacenar el ID del elemento a eliminar
  const { paginadoAdmin, moviesAdmin } = useSelector((state) => state);

  const split = (num) => {
    if (num === 1) {
      dispatch(splitRecipesAdmin(0, 10));
    } else {
      const inicio = num * 10 - 10;
      const fin = num * 10;
      dispatch(splitRecipesAdmin(inicio, fin));
    }
  };

  const dispatch = useDispatch();

  let pages = moviesAdmin
    .slice(0, Math.ceil(moviesAdmin.length / 10))
    .map((recipe, index) => index + 1);

  const handleDispatch = (name) => {
    dispatch(getMoviesNameAdmin(name));
  };

  const deleteItem = async (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://henrybuster.onrender.com/movie/${deleteItemId}`
      );
      dispatch(getMoviesAdmin());
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(getMoviesAdmin());
    dispatch(splitRecipesAdmin(0, 10));
    setPage(1);
  }, [dispatch]);

  useEffect(() => {}, [page, handleDispatch]);

  return (
    <Container fluid={true} className="mt-4 bg-white" style={{ width: "100%" }}>
      <Alert variant="danger" show={success}>
        <Alert.Heading>Movie Deleted Successfully</Alert.Heading>
      </Alert>

      <Row>
        <Col className="d-flex justify-content-start">
          <h2>List of products:</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            onClick={() => {
              dispatch(getMoviesAdmin());
              setPage(1);
            }}
            className="bg-light text-dark"
            style={{ width: "fit-content", height: "35px", marginRight: "5px" }}
          >
            All
          </Button>
          <SearchBarAdmin handleDispatch={handleDispatch} />
        </Col>
      </Row>
      <hr />
      <Row
        style={{
          height: "500px",
          overflowY: "auto",
        }}
      >
        <Table striped bordered hover className="mt-1 bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Genres</th>
              <th>Quantity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginadoAdmin &&
              paginadoAdmin.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.Genres.map((a) => a.name + ", ")}</td>
                  <td>{e.Inventory.quantity}</td>
                  <td>
                    <Link to={`/admin/update/${e.id}`}> update</Link>
                  </td>
                  <td>
                    <button
                      style={{ border: "none" }}
                      onClick={() => deleteItem(e.id)}
                    >
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <Row className="">
        <Pagination
          className="d-flex justify-content-center mt-2"
          style={{ width: "100%", flexWrap: "wrap" }}
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
            <>
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
            </>
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
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the movie with the ID: {deleteItemId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MoviesAdmin;
