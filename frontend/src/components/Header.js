import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logoutUser } from "../actions/userActions";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleDropdown = (e) => {
    show ? setShow(false) : setShow(!show);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(listProducts());
  };

  return (
    <header>
      <section
        style={{
          display: show ? "block" : "none",
          minWidth: "100%",
          height: "100%",
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
            <Nav className="ms-auto">
              <Link to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
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
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
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
