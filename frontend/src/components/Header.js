import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logoutUser } from "../actions/userActions";
import { listProducts } from "../actions/productActions";
import { Link, Route, Routes } from "react-router-dom";
import SearchBox from "./SearchBox";
import "../styles/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = userLogin;
  const { cartItems } = cart;

  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
  }, [cartItems]);

  const handleDropdown = (e) => {
    show ? setShow(false) : setShow(!show);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <header>
      <section
        style={{
          display: show ? "block" : "none",
          minWidth: "100%",
          height: "100%",
          zIndex: "100",
          position: "absolute",
        }}
        onClick={() => setShow(false)}
      ></section>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container style={{ maxWidth: "85%" }}>
          <Link to="/">
            <Navbar.Brand>BRAND</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Routes> */}
            <SearchBox />
            {/* </Routes> */}
            <Nav className="ms-auto">
              <Link to="/cart">
                {count ? (
                  <div className="nav-cart-size">
                    <span
                      style={
                        count > 10
                          ? { fontSize: "0.6em" }
                          : { fontSize: "0.7em" }
                      }
                    >
                      {count}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <i
                  style={{ fontSize: "1.2em" }}
                  className="fas fa-shopping-cart"
                ></i>
                Cart
              </Link>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id={userInfo.id}
                  show={show}
                  onClick={handleDropdown}
                >
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" variant="primary">
                  <i style={{ fontSize: "1.2em" }} className="fas fa-user"></i>
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
