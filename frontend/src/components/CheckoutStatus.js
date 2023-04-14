import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutStatus = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-3">
      <div>
        {step1 ? (
          <Link to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </div>
    </Nav>
  );
};

export default CheckoutStatus;
