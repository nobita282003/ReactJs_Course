import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TabBar from "./TabBar";

function HomePage() {

  const { brands, statuss, products, users, addToCart, searchItem, setSearchIteam, news } = useContext(DataContext);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; 

  const handleChange = (event) => {
    setSelectedBrand(event.target.checked ? event.target.value : null);
    setCurrentPage(1); 
  };

  function getNameBrand(id) {
    const brand = brands.find((brand) => brand.id.toString() === id.toString());
    return brand ? brand.name : "Unknown Brand";
  }

  function getNameStatus(id) {
    const status = statuss.find(
      (status) => status.id.toString() === id.toString()
    );
    return status ? status.name : "Unknown Status";
  }
  const filteredProducts = products.filter((nvHome) => {
    const matchesDepartment = selectedBrand === "all" || !selectedBrand ? true : nvHome.brands.toString() === selectedBrand;

    const matchesSearch = searchItem ? nvHome.name.toLowerCase().includes(searchItem.toLowerCase()) : true; // Nếu searchItem rỗng, hiển thị tất cả sản phẩm
  
    return matchesDepartment && matchesSearch;
  });
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (product) => {
    addToCart({ userId: users, productId: product.id, quantity: 1 });
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const latestNews = news.slice(0, 4);

  return (
    <Container fluid style={{ padding: "0px", fontFamily: "serif" }}>
      <Row>
        <TabBar />
      </Row>
      <Row
        style={{
          textAlign: "center",
          backgroundImage: `url("https://dknstore.vn/wp-content/uploads/2022/04/banner-dkn-store-01.jpg")`,
          height: "500px",
        }}
      ></Row>

      <br />
      <Row>
        <Col md="1"></Col>

        <Col md="1">
          <h3>Categories</h3>
          <Form>
            <ul style={{ marginLeft: "0px" }}>
              <Form.Check
                type="radio"
                label="All"
                value="all"
                checked={selectedBrand === "all"}
                onChange={handleChange}
              />
              {brands.map((brand) => (
                <Form.Check
                  type="radio"
                  label={brand.name}
                  id={brand.id}
                  value={brand.id}
                  checked={selectedBrand === brand.id}
                  onChange={handleChange}
                  key={brand.id} 
                />
              ))}
            </ul>
          </Form>

          <hr />
          <Link to={`/NewsPage/1`}>
            <div>Link to News</div>
          </Link>
        </Col>
        <Col md="9">
          <Row>
            <Col className="d-flex justify-content-end">
              <div>
                <Link to={`/CartPage`}>
                  <ShoppingCartIcon />
                  Cart
                </Link>
              </div>
            </Col>
          </Row>

          <Row>
            {currentProducts.map((product) => (
              <Col md="3" key={product.id}>
                <div style={{ marginLeft: "20px" }}>
                  <Card style={{ width: "14rem", margin: "20px" }}>
                    <Card.Img
                      style={{ height: "150px" }}
                      variant="top"
                      src={product.images[0]}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{getNameBrand(product.brands)}</Card.Text>
                      <Card.Text>
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Card.Text>
                      <Card.Text>{getNameStatus(product.status)}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Link to={`/ProductDetail/${product.id}`}>
                        <Button variant="primary">Detail</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>

          {/* Thêm điều khiển phân trang */}
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span style={{ margin: "0 10px" }}>
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Hiển thị 4 bài viết mới nhất */}
      <Row className="mt-4">
        <Col>
          <h3>Bài viết mới nhất</h3>
          <Row>
            {latestNews.map((newsItem) => (
              <Col md="3" key={newsItem.id}>
          <Card style={{ width: '80%', margin: '0 auto' }}> {/* Giảm chiều rộng và căn giữa thẻ */}
            <Card.Img
              variant="top"
              src={newsItem.image}
              style={{ height: "400px", objectFit: "cover" }} // Giữ chiều cao hình ảnh
            />
            <Card.Body ><Link to={`/NewsPage/${newsItem.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }} // Remove underline and inherit color

            >
              <Card.Title style={{ fontSize: '1,2rem',color: 'red' }} >{newsItem.title}</Card.Title> {/* Kích thước chữ tiêu đề */}
              
               
              </Link>
            </Card.Body>
          </Card>
        </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
