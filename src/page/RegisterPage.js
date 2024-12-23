import React, { useContext, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const { accounts, addAccount } = useContext(DataContext); 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const emailExists = accounts.some((acc) => acc.email === email);
    if (emailExists) {
      setError("Email is already registered!");
    } else {
      const newAccount = {
        accountID: accounts.length + 1, 
        username, 
        email,
        password,
        role: "user" 
      };
      addAccount(newAccount); 
      setError(""); 
      navigate("/LoginPage"); 
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
            Register
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
              {error && ( // Hiển thị lỗi nếu có
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  {error}
                </Alert>
              )}

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                <Form.Label column sm="2">Full Name</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%",marginTop: "10px" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername">
                <Form.Label column sm="2">Username</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">Password</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formConfirmPassword">
                <Form.Label column sm="2">Confirm Password</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: "100%",marginTop: "10px" }}

                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button type="submit" className="me-2" variant="primary">
                      Register
                    </Button>
                    <Button href="/Login" variant="secondary">
                      Back to Login
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

export default RegisterPage;
