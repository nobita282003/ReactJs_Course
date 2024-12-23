import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import HeaderAdminComponent from "./HeaderAdminComponent";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [brands, setBrands] = useState([]);
  const [status, setStatus] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    brands: "",
    status: "",
    price: "",
    images: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9999/products"); 
      setProducts(response.data);
      const response2 = await axios.get("http://localhost:9999/brands"); // 
      setBrands(response2.data);
      const response3 = await axios.get("http://localhost:9999/status"); // c
      setStatus(response3.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleShow = (product) => {
    setCurrentProduct(product);
    setFormData(
      product
        ? { ...product, images: product.images.join(", ") }
        : {
            name: "",
            brands: "",
            status: "",
            price: "",
            images: "",
            description: "",
          }
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      images: formData.images.split(",").map((img) => img.trim()),  
    };

    if (currentProduct) {
      try {
        await axios.put(
          `http://localhost:9999/products/${currentProduct.id}`,
          updatedData
        );
        fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Thêm sản phẩm mới
      try {
        await axios.post("http://localhost:9999/products", updatedData);
        fetchProducts();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
    handleClose();
  };

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmed) {
      axios.delete(`http://localhost:9999/products/${id}`);
      fetchProducts();
    }
  };

  const cloneProduct = products.filter((product) => {
    const dk1 =
      product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.description.toLowerCase().includes(searchValue.toLowerCase());

    return dk1;
  });

  return (
    <Container fluid>
      <Row style={{ display: "flex" }}>
        <HeaderAdminComponent />
        <Col md={9}>
          <h1>Product management</h1>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={() => handleShow(null)}>
            Thêm Sản Phẩm
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Thương Hiệu</th>
                <th>Trạng Thái</th>
                <th>Mô Tả</th>
                <th>Hình Ảnh</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {cloneProduct.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {brands.find((brand) => brand.id == product.brands)?.name ||
                      ""}
                  </td>
                  <td>
                    {status.find((stat) => stat.id == product.status)?.name ||
                      ""}
                  </td>
                  <td>{product.description}</td>
                  <td>
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${product.id}`}
                        style={{ width: "50px", marginRight: "5px" }}
                      />
                    ))}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShow(product)}
                    >
                      Sửa
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal cho thêm/sửa sản phẩm */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {currentProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductName">
                  <Form.Label>Tên Sản Phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                

                
                <Form.Group controlId="formProductBrands">
                  <Form.Label>Thương Hiệu</Form.Label>
                  <Form.Select
                    name="brands"
                    
                    value={formData.brands}
                    onChange={handleChange}
                    required
                  >
                    {brands.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formProductStatus">
                  <Form.Label>Trạng Thái</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {status.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label>Mô Tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </Form.Group>
                <Form.Group controlId="formProductImages">
                  <Form.Label>
                    Hình Ảnh (URL, cách nhau bằng dấu phẩy)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="Nhập URL hình ảnh, cách nhau bằng dấu phẩy"
                  />
                  <Form.Text className="text-muted">
                    Nhập URL của hình ảnh sản phẩm. Ví dụ:
                    https://example.com/image1.png,
                    https://example.com/image2.png
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Lưu
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductManager;
