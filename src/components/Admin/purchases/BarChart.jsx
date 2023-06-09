import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BarChartFormat from "./BarChartFormat";
import BarChartGenres from "./BarChartGenres";

const BarChart = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <BarChartFormat />
        </Col>
        <Col>
          <BarChartGenres />
        </Col>
      </Row>
      <Row
        style={{
          height: "300px",
          overflowY: "auto",
          marginTop: "50px",
          textAlign: "start",
        }}
      >
        <Col>
          <h2>Purchases:</h2>
          <p>Total de Vendidas</p>
          <p>Total de vendidas en $ </p>
        </Col>
        <Col>
          <h2>Users</h2>
          <p>Total de Usuarios:</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BarChart;
