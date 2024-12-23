import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { DataContext } from "../GetData";
import { useContext } from "react";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import "./CartPage.css";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const {
    brands,
    statuss,
    products,
    accounts,
    users,
    setUsers,
    addAccount,
    cart,
    setCart,
  } = useContext(DataContext);

  const currentUserId = users; // L

const deleteFromCart = async (productId) => {
  try {
    await axios.delete("http://localhost:9999/cart", {
      params: {
        productId: productId,
        userId: users, // 
      },
    });

    
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.productId !== productId || item.userId !== users
      )
    );
  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
};




  const totalPrice = cart.reduce((total, cartItem) => {
    if (cartItem.userId === currentUserId) {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );
      return total + (product ? product.price * cartItem.quantity : 0);
    }
    return total;
  }, 0);

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.userId === currentUserId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
        <Link to="/HomePage">
  <Button variant="danger">Back</Button>
</Link>
          <Button variant="warning" onClick={() => console.log("MY CART")}>
            <ShoppingCartIcon /> MY CART
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart
                .filter((cartItem) => cartItem.userId === currentUserId) // Lọc các sản phẩm của người dùng hiện tại
                .map((cartItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        products.find(
                          (product) => product.id === cartItem.productId
                        )?.name
                      }
                    </td>
                    <td>
                      {
                        products.find(
                          (product) => product.id === cartItem.productId
                        )?.price
                      }
                    </td>
                    <td>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) =>
                          handleQuantityChange(e, cartItem.productId)
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={
                          products.find(
                            (product) => product.id === cartItem.productId
                          )?.images[0]
                        }
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteFromCart(cartItem.productId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="total-row">
        <Col>
          <h5 className="text-end">
            Total Price:{" "}
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
            VND
          </h5>
          <div className="text-end">
          <Button variant="success" style={{ marginBottom: "20px" }} onClick={() => navigate("/CheckOut")}>
            CheckOut
          </Button></div>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
