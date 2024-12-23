import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import HeaderAdminComponent from "./HeaderAdminComponent";
import useAdminAuth from "../page/Navigation";

function HomePageAdmin() {
  useAdminAuth();

  return (
    <Container fluid>
      <Row style={{ display: "flex" }}>
        <HeaderAdminComponent></HeaderAdminComponent>
        <Col
          md={9}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>
            <strong>Welcome to the admin page</strong>
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePageAdmin;
