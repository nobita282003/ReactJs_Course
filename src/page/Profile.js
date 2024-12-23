import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function ProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = sessionStorage.getItem("userid");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/accounts/${userId}`
        );
        setFormData(response.data);
      } catch (error) {
        setError("Không thể lấy thông tin người dùng");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:9999/accounts/${userId}`,
        formData
      );
      setSuccess("Cập nhật thông tin thành công!");
      setFormData(response.data);
      setError("");
    } catch (error) {
      setError("Cập nhật thông tin không thành công");
      setSuccess("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Tên người dùng:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Địa chỉ:</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Cập nhật thông tin
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
