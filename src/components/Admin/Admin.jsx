import React from "react";
import { Outlet, useLocation, useParams } from "react-router";

import Sidebar from "./Sidebar";
import HomeAdmin from "./HomeAdmin";
import MoviesAdmin from "./MoviesAdmin/MoviesAdmin";

import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CreateGenre } from "./genres/CreateGenre/CreateGenre";
import { CreateMovie } from "./MoviesAdmin/CreateMovie/CreateMovie";
import { UpdateMovie } from "./MoviesAdmin/UpdateMovie/UpdateMovie";
import { auto } from "@popperjs/core";

function Admin({ handleUser }) {
  const { user } = useAuth();
  const location = useLocation();
  const params = useParams();
  const { id } = params;

  return (
    <Container fluid={true} className="bg-white">
      <Row>
        <Col
          className="col-12 col-sm-auto p-0 mt-sm-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Sidebar handleUser={handleUser} />
        </Col>
        <Col classNmae="col-12 col-lg-7">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
