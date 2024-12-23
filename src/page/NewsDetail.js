import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import TabBar from "./TabBar";

function NewsDetail() {
  const {
    news,
    products, 
  } = useContext(DataContext);
  const { id } = useParams();

  if (!news || news.length === 0) {
    return <p>Loading news...</p>;
  }

  const newsDetail = news.find((n) => n.id.toString() === id.toString());
  const contentParts = newsDetail.content.split('<br />');
  const firstPart = contentParts[0];  
  const remainingContent = contentParts.slice(1).join('<br />');  

  if (!newsDetail) {
    return <p>News not found!</p>;
  }

  const latestProducts = products.slice(0, 4);

  return (
    <Container>
      <Row>
        <TabBar />
      </Row>
      <Row id="top">
      <Col md={9} className="mb-4"> {/* Cột cho chi tiết bài viết */}
      <h1  className="display-4 text-primary mb-4">{newsDetail.title}</h1>
      <br></br>
      <Row> <Col md={6}>Author:{newsDetail.author}     
      <br></br>
      <br></br>

       <p className="lead mb-3">{firstPart}</p>
</Col>
      <Col md={6}><img 
        src={newsDetail.image} 
        alt={newsDetail.title} 
        
        className="img-fluid rounded mb-4" 
        style={{  objectFit: "cover" }} 
      /></Col></Row>
      

      <p className="mb-4" dangerouslySetInnerHTML={{ __html: remainingContent }}></p>

      {/* Nhúng video YouTube nếu có */}
      {newsDetail.video && (
        <div className="mb-4 shadow-sm rounded">
          <iframe
            width="100%"
            height="400"
            src={newsDetail.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>
      )}


      <Link to="#top" className="btn btn-secondary btn-lg">Back to News</Link>
      </Col>

        <Col md={3}> 
          <h3>Sản phẩm mới nhất</h3>
          {latestProducts.map((product) => (
            <Card key={product.id} style={{ marginBottom: "20px" }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
              <Link to={`/ProductDetail/${product.id}`}>              
                <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Img
                      style={{ height: "100px",width:"100px" }}
                      variant="top"
                      src={product.images[0]}
                    />
                <Card.Text>
                
                  Giá: {product.price} đ
                </Card.Text>
                
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsDetail;
