import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Form,
  ButtonGroup,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addItem, removeItem } from "../actions/cartActions";

const CartPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [totalItems, setTotalItems] = useState(0);
  const productID = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addItem(productID, qty));
    }
  }, [dispatch, productID, qty]);

  useEffect(() => {
    if (cartItems) {
      setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };
  const handleCheckout = (e) => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart.</h1>
        {!cartItems.length ? (
          <Message>
            Your Cart is empty. <Link to="/">Go Back.</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={1}>
                    <div>
                      <i
                        style={{ fontSize: "0.7em" }}
                        className="fas fa-times"
                      ></i>{" "}
                      {item.qty}
                    </div>
                  </Col>
                  <Col md={2}>
                    {/* <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addItem(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((ele) => (
                        <option key={ele + 1} value={ele + 1}>
                          {ele + 1}
                        </option>
                      ))}
                   </Form.Control> */}
                    <ButtonGroup aria-label="Addtocart">
                      <Button
                        style={{
                          outline: "none",
                          borderRight: "1px solid white",
                        }}
                        disabled={item.qty >= item.countInStock}
                        onClick={() => {
                          dispatch(addItem(item.product, Number(item.qty + 1)));
                        }}
                        variant="primary"
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                      <Button
                        style={{
                          outline: "none",
                          borderLeft: "1px solid white",
                        }}
                        variant="primary"
                        disabled={item.qty === 1}
                        onClick={() => {
                          dispatch(addItem(item.product, Number(item.qty - 1)));
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </Button>
                    </ButtonGroup>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="mt-3">
        <ListGroup>
          <Card variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({totalItems}) Item
                {totalItems > 1 && "s"}
              </h2>
              <strong>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  type="button"
                  size="lg"
                  // variant='dark'
                  disabled={!cartItems.length}
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </Button>
              </div>
            </ListGroup.Item>
          </Card>
        </ListGroup>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartPage;
