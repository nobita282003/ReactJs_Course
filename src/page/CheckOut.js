import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useContext, useState } from "react";
import React from "react";
import axios from 'axios';  // Đảm bảo bạn đã cài axios nếu chưa
import { Link } from "react-router-dom";

function CheckoutPage() {
  const { products, cart, users } = useContext(DataContext);

  const [receiverName, setReceiverName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");
  
  const totalPrice = cart.reduce((total, cartItem) => {
    if (cartItem.userId === users) {
        const product = products.find(product => product.id === cartItem.productId);
        return total + (product ? product.price * cartItem.quantity : 0);
    }
    return total; 
  }, 0);

  const handleCheckout = async () => {
    try {
      const orderResponse = await axios.post("http://localhost:9999/orders", {
        userId: users,
        totalPrice: totalPrice,
        statusV: "Đang vận chuyển", 
        statusPay: "Đã thanh toán", 
        address: deliveryAddress,  
        receiverName: receiverName, 
        phoneNumber: phoneNumber,   
        note: note,                 
      });

      const orderId = orderResponse.data.id;

    const orderDetails = cart.filter(cartItem => cartItem.userId === users).map(cartItem => ({
  id: `OD-${Math.random().toString(36).substr(2, 9)}`, // 
  orderId: orderId, 
  productId: cartItem.productId,
  quantity: cartItem.quantity,
  price: products.find(product => product.id === cartItem.productId)?.price || 0,
}));

await axios.post("http://localhost:9999/odersDetails", orderDetails);

      alert(`Đơn hàng đã được đặt thành công! Tổng giá: ${totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND"
      })}`);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    }
    
  };

  return (
    <Container className="checkout-container" style={{ marginTop: "20px", fontFamily: "serif" }}>
      <Link to="/HomePage">
  <Button variant="danger">Back</Button>
</Link>
      <Row>
        <Col>
          <h2 className="text-center">Checkout</h2>
          <Button variant="danger" style={{ marginBottom: "20px" }} href="/HomePage">Quay lại trang chính</Button>
        </Col>
      </Row>

      <Row>
        <Col md="8">
          <h4>Thông tin đơn hàng</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hình ảnh</th>
              </tr>
            </thead>
            <tbody>
              {cart.filter(cart => cart.userId === users).map((cartItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{products.find(product => product.id === cartItem.productId)?.name}</td>
                  <td>{products.find(product => product.id === cartItem.productId)?.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}</td>
                  <td>{cartItem.quantity}</td>
                  <td>
                    <img 
                      src={products.find(product => product.id === cartItem.productId)?.images[0]} 
                      alt="" 
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end">Tổng giá: {totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
          })}</h5>
        </Col>

        <Col md="4">
          <Card style={{ padding: "20px" }}>
            <h4>Thông tin giao hàng</h4>
            <Form>
              <Form.Group controlId="formReceiverName">
                <Form.Label>Tên Người nhận</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Tên Người nhận"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDeliveryAddress">
                <Form.Label>Địa chỉ giao hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNote">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Nhập ghi chú nếu có"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </Form.Group>

              <Button 
                variant="success" 
                onClick={handleCheckout} 
                style={{ marginTop: "20px" }}
                disabled={!receiverName || !phoneNumber || !deliveryAddress}
              >
                Thanh toán
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
