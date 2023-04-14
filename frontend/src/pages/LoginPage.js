import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../actions/userActions";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (!location.search.includes("success") && userInfo) navigate(redirect);
  }, [redirect, location, userInfo]);

  useEffect(() => {
    // check for url params
    if (window.location.search.includes("success")) {
      const queries = window.location.search.split("&");
      const isSuccess = queries[0].split("=")[1] === "success";
      const id = queries[1].split("=")[1];
      if (isSuccess) {
        // get user data and dispatch login success
        axios
          .post("/api/users/profile", {
            id,
          })
          .then(({ data }) => {
            const { id, email, name, isAdmin, isConfirmed } = data;
            const userData = {
              id,
              email,
              name,
              isAdmin,
              isConfirmed,
              isSocialLogin: true,
            };
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: userData,
            });
            localStorage.setItem("userInfo", JSON.stringify(userData));
            localStorage.removeItem("promptEmailVerfication");
            navigate("/shipping");
          });
      }
    }
  }, [dispatch, navigate, redirect]);

  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setType(type === "password" ? "text" : "password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <>
      <FormContainer>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
          }}
        >
          <h1>Sign In</h1>
          <h1
            style={{ marginLeft: "1em", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </h1>
        </div>

        {error && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={handleSubmit} style={{ width: "33em" }}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Enter Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="my-1">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    size="lg"
                    type={type}
                    placeholder="Enter your password"
                    value={password}
                    style={{ borderRight: "none" }}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <InputGroup.Text
                    id="basic-addon2"
                    onClick={showHide}
                    style={{
                      background: "transparent",
                      borderLeft: "none",
                      padding: "0.5em 0.5em 0.5em 0",
                    }}
                  >
                    {type === "text" ? (
                      <i className="far fa-eye-slash"></i>
                    ) : (
                      <i className="far fa-eye"></i>
                    )}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Col
                style={{
                  display: "flex",
                }}
              >
                <Button type="submit" variant="dark" className="my-1">
                  Login
                </Button>
              </Col>
            </Form>
            {/* <Row>
              <Col style={{ fontSize: "1.1em" }}>
                New Here?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Col>
            </Row> */}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default LoginPage;
