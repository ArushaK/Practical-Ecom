import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutStatus from "../components/CheckoutStatus";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems, shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  useEffect(() => {
    if (!(cartItems.length && userInfo)) {
      navigate("/");
    }
  }, [cartItems, navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStatus step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <FloatingLabel
            controlId="addressinput"
            label="Address"
            className="mb-3"
          >
            <Form.Control
              size="lg"
              placeholder="Enter address"
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="city">
          <FloatingLabel controlId="cityinput" label="City" className="mb-3">
            <Form.Control
              size="lg"
              placeholder="Enter City"
              type="text"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <FloatingLabel
            controlId="postalcodeinput"
            label="Postal Code"
            className="mb-3"
          >
            <Form.Control
              size="lg"
              placeholder="Enter Postal Code"
              type="text"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="country">
          <FloatingLabel
            controlId="countryinput"
            label="Country"
            className="mb-3"
          >
            <Form.Control
              size="lg"
              placeholder="Enter Country"
              type="text"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex">
          <Button
            type="submit"
            className="ms-auto"
            style={{
              padding: "0.5em 1em",
              width: "8rem",
            }}
          >
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
