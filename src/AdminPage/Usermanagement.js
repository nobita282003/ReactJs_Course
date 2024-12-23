import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import HeaderAdminComponent from "./HeaderAdminComponent";
import useAdminAuth from "../page/Navigation";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Usermanagement() {
  useAdminAuth();

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchValue2, setSearchValue2] = useState("");

  const [reload, setReload] = useState(true); // mặc định là true để load dữ liệu từ server
  const [showModal, setShowModal] = useState(false); // quản lý trạng thái của modal
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  }); // lưu trữ thông tin user mới

  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFetchData = async () => {
    try {
      const request = await axios.get("http://localhost:9999/accounts");
      if (request.status === 200) {
        const response = request.data;
        setData(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:9999/accounts", newUser);
      setReload(true); 
      handleCloseModal(); 
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteUser = async (idAcc) => {
    console.log("Deleting user with ID:", idAcc); 

    try {
        const response = await axios.delete(
            `http://localhost:9999/accounts/${idAcc}`
        );
        console.log("Response from delete request:", response); 

        if (response.status === 200) {
            setReload(true); 
            console.log("User deleted successfully");
            window.alert("User deleted successfully!"); 
            navigate(`/admin/Usermanagement`);
        }
    } catch (error) {
        console.error(
            "Error deleting user:",
            error.response ? error.response.data : error
        );
    }
};


  useEffect(() => {
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  const filterSTd = data.filter((st) => {
    const dk1 = st.username.toLowerCase().includes(searchValue.toLowerCase())||st.email.toLowerCase().includes(searchValue.toLowerCase())
    const dk2 =
      st.role.toLowerCase().includes(searchValue2.toLowerCase()) ||
      searchValue2.toLowerCase() === "all";

    return dk1 && dk2;
  });
  return (
    <Container fluid>
      <Row style={{ display: "flex" }}>
        <HeaderAdminComponent />
        <Col md={9}>
          <Row>
            <h1>
              <strong>User management</strong>
            </h1>
            <Col md={5}>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={4}>
              <Form>
                <Form.Check
                  type="radio"
                  id="custom-switch"
                  label="Admin"
                  checked={searchValue2 === "admin"}
                  value="admin"
                  onChange={(e) => setSearchValue2(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="custom-switch"
                  label="User"
                  value="user"
                  checked={searchValue2 === "user"}
                  onChange={(e) => setSearchValue2(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="custom-switch"
                  label="ALL"
                  value="all"
                  checked={searchValue2 === "all"}
                  onChange={(e) => setSearchValue2(e.target.value)}
                />
              </Form>
              <Button variant="primary" onClick={handleShowModal}>
                Add user
              </Button>
            </Col>
          </Row>

          <Table style={{ marginTop: "50px" }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {filterSTd.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.password}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this user?"
                        );
                        if (confirmDelete) {
                          handleDeleteUser(item.id);
                        }
                      }}
                    >
                      Delete user
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Usermanagement;
