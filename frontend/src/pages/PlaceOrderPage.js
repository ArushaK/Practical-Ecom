import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import CheckoutStatus from "../components/CheckoutStatus";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { CART_RESET } from "../constants/cartConstants";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      localStorage.removeItem("cartItems");
      dispatch({ type: CART_RESET, payload: shippingAddress });
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate]);

  // All prices
  cart.itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 100 : 250).toFixed(2);
  cart.taxPrice = (0.18 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutStatus step1 step2 step3 step4 />
      <Row>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address: </strong> {shippingAddress.address},{" "}
                    {shippingAddress.city}-{shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong> {paymentMethod}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Cart Items</h2>
                  {cartItems.length !== 0 ? (
                    <ListGroup variant="flush">
                      <div
                        style={{
                          background: "red",
                        }}
                      ></div>
                      {cartItems.map((item, idx) => (
                        <ListGroup.Item key={idx}>
                          <Row>
                            <Col md={2}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} ={" "}
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Message variant="info">Your cart is empty</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Subtotal</strong>
                      </Col>
                      <Col>$ {cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Shipping</strong>
                      </Col>
                      <Col>$ {cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Tax</strong>
                      </Col>
                      <Col>$ {cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Total</strong>
                      </Col>
                      <Col>$ {cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {error && (
                    <ListGroup.Item>
                      <Message variant="danger">{error}</Message>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      // variant="dark"
                      type="button"
                      size="lg"
                      disabled={!cartItems.length}
                      onClick={handleOrder}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default PlaceOrderPage;
