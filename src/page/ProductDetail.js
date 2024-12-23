import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../GetData";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import TabBar from "./TabBar";

function ProductDetail() {
  const { id } = useParams();
  const { products, brands, statuss,addToCart, users } = useContext(DataContext);

  const product = products.find((p) => p.id.toString() === id);

  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0] : ""
  );

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  const handleAddToCart = (product) => {
    addToCart({ userId: users, productId: product.id, quantity: 1 });
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const getNameBrand = (id) => {
    const brand = brands.find((brand) => brand.id.toString() === id.toString());
    return brand ? brand.name : "Unknown Brand";
  };

  const getNameStatus = (id) => {
    const status = statuss.find((status) => status.id.toString() === id.toString());
    return status ? status.name : "Unknown Status";
  };

  if (!product) {
    return <h2>Sản phẩm không tồn tại</h2>;
  }

  return (
    <Container>
      <Row>
       
        <TabBar></TabBar>
      </Row>
      <Row>
        <Col md="6">
          <Row>
            
            {/* Ảnh lớn */}
            <div
              style={{
                width: "100%",
                height: "400px", //
                overflow: "hidden", // 
                display: "flex", // 
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc", //
              }}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                style={{
                  maxHeight: "100%", 
                  maxWidth: "100%", 
                }}
              />
            </div>
          </Row>

          {/* Hàng chứa 4 ảnh nhỏ */}
          <Row style={{ marginTop: "10px" }}>
            {product.images.slice(0, 4).map((img, index) => (
              <Col key={index} xs={3}>
                <Image
                  src={img}
                  alt={`product-image-${index}`}
                  thumbnail
                  onClick={() => handleImageClick(img)}
                  style={{
                    cursor: "pointer",
                    border: selectedImage === img ? "2px solid blue" : "none",
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
         
        <Col md="6" className=" justify-content-center align-items-center">
    <Row className="mt-3"></Row>
  <Card className="w-100">
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>Thương hiệu: {getNameBrand(product.brands)}</Card.Text>
            <Card.Text>Mô tả: {product.description}</Card.Text>

      <Card.Text>Trạng thái: {getNameStatus(product.status)}</Card.Text>
      <Card.Text>
        Giá:{" "}
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </Card.Text>
      
      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Link to={`/CartPage`} >
                      <Button
                       onClick={() => handleAddToCart(product)}
                        variant="danger"
                      >
                        Buy Now
                      </Button></Link>


    </Card.Body>
  </Card>
</Col>


      </Row>
    </Container>
  );
}

export default ProductDetail;
