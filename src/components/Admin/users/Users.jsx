import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, splitUsers } from "../../../redux/actions";
import axios from "axios";

function Users({ userRegister }) {
  const { allUsers, usersPaginado } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState(false);
  const [userModify, setUserModify] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  // Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal de eliminación
  const [deleteItemId, setDeleteItemId] = useState(""); // Estado para almacenar el ID del elemento a eliminar

  const dispatch = useDispatch();

  const split = (num) => {
    if (num === 1) {
      dispatch(splitUsers(0, 10));
    } else {
      const inicio = num * 10 - 10;
      const fin = num * 10;
      dispatch(splitUsers(inicio, fin));
    }
  };

  let pages = allUsers
    .slice(0, Math.ceil(allUsers.length / 10))
    .map((recipe, index) => index + 1);

  const handleAdmin = async (id, data) => {
    const bodyData = { admin: data };
    try {
      const data = await axios.put(
        `https://henrybuster.onrender.com/user/${id}`,
        bodyData
      );
      setUserModify(id);

      setSuccess(true);
      setMessage("User Admin Modify!");
      setColor("success");
      setTimeout(() => {
        setSuccess(false);
        setChange(true);
      }, 1000);
      setTimeout(() => {
        setChange(false);
        setUserModify("");
        setMessage("");
        setColor("");
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://henrybuster.onrender.com/user/${deleteItemId}`
      );
      setSuccess(true);

      setMessage("User Admin Delete");
      setColor("danger");
      setTimeout(() => {
        setSuccess(false);
        setChange(true);
      }, 1000);
      setTimeout(() => {
        setMessage("");
        setColor("");

        setChange(false);
      }, 1800);
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(getUsers());
    split(page);
  }, [success]);

  useEffect(() => {
    dispatch(getUsers());
    setPage(1);
  }, []);

  return (
    <Container fluid={true} className="mt-4 bg-white" style={{ width: "100%" }}>
      {" "}
      <Row style={{ height: "70px", marginBottom: "10px" }}>
        <Col>
          <h1>Users List</h1>
        </Col>
        <Col>
          {success && <Spinner animation="border" />}
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
              <th>Name</th>
              <th>email</th>
              <th>username</th>

              <th>admin</th>
              {userRegister.superAdmin && (
                <>
                  <th>AdminUpdate</th>
                  <th>DeleteUser</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {usersPaginado &&
              usersPaginado.map((e) => (
                <tr
                  key={e.id}
                  // style={userRegister.id === e.id ? { background: "#ccc" } : null}
                  className={userModify === e.id && change && "bg-warning"}
                >
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td style={e.username !== "Guest" ? null : { color: "red" }}>
                    {e.username !== "Guest" ? e.username : "Guest"}
                  </td>

                  <td>{e.admin ? "true" : "false"}</td>
                  {userRegister.id !== e.id && userRegister.superAdmin ? (
                    <>
                      <td>
                        <Button onClick={() => handleAdmin(e.id, !e.admin)}>
                          Up
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => deleteItem(e.id)}>Del</Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>null</td>
                      <td>null</td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <Row>
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
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user with the ID: {deleteItemId}?
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

export default Users;
