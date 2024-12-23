import React, { useContext, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useNavigate } from "react-router-dom"; 

import "./HomePage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 
  const { accounts, setUsers } = useContext(DataContext);

  const navigate = useNavigate(); //

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = accounts.find(
      (acc) =>
        acc.email.toString() === email.toString() &&
        acc.password.toString().toString() === password.toString()
    );
    if (account) {
      if (account.role === "user") {
        setError("");
        setUsers(account.id);
        navigate("/Homepage");
        sessionStorage.setItem("userid", account.id);
        sessionStorage.setItem("userrole", "user");
      } else {
        setUsers(account.id);
        sessionStorage.setItem("userid", account.id);
        sessionStorage.setItem("userrole", "admin");
        navigate("/HomePageAdmin");
      }
    } else {
      setError("Email hoặc mật khẩu không đúng!"); 
    }
  };

  return (
    <Container className="container-background" fluid>
      <Row>
        <Col>
          <h1
            style={{
              textAlign: "center",
              marginTop: "70px",
              color: "white",
              fontWeight: "bold",
              fontSize: "50px",
            }}
          >
            Login
          </h1>
        </Col>
      </Row>

      <Row>
        <Col md="3"></Col>

        <Col
          md="6"
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "100px" }}
        >
          <div
            style={{
              width: "500px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Form onSubmit={handleSubmit}>
              {error && ( 
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  {error}
                </Alert>
              )}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <a
                    href="/forgot"
                    className="d-flex justify-content-start"
                    style={{ color: "red", textDecoration: "none" }}
                  >
                    Forgot Password?
                  </a>
                </Col>
              </Row>

              <Form.Group as={Row}>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button type="submit" className="me-2" variant="primary">
                      Login
                    </Button>
                    <Button href="/register" variant="secondary">
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Col md="3"></Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
