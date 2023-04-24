import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../actions/userActions";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import "../styles/login-register.css";

const LoginPage = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  console.log(location);

  useEffect(() => {
    if (!location.search.includes("success") && userInfo) navigate(redirect);
  }, [redirect, location, userInfo]);

  useEffect(() => {
    console.log(window.location.search);
    // check for url params
    if (window.location.search.includes("success")) {
      console.log("yeaaaa");
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
            navigate("../shipping");
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
        <div className="form-inner-container">
          <div className="form-heading">
            <h1
              style={{
                background: "ghostwhite",
                boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
                WebkitBoxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
                MozBoxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
              }}
            >
              Sign In
            </h1>
            <h1 onClick={() => navigate("/register")}>Sign Up</h1>
          </div>

          {error && (
            <Message variant="danger" duration={10}>
              {error}
            </Message>
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <FloatingLabel
                    controlId="emailinput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      size="lg"
                      placeholder="Enter Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <InputGroup>
                    <FloatingLabel
                      controlId="passwordinput"
                      label="Password"
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        size="lg"
                        type={type}
                        placeholder="Enter your password"
                        value={password}
                        style={{
                          borderRight: "none",
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <InputGroup.Text
                          onClick={showHide}
                          style={{
                            fontSize: "1rem",
                            height: "100%",
                            marginLeft: "-0.5em",
                            background: "transparent",
                            borderLeft: "none",
                          }}
                        >
                          {type === "text" ? (
                            <i className="far fa-eye-slash"></i>
                          ) : (
                            <i className="far fa-eye"></i>
                          )}
                        </InputGroup.Text>
                      </div>
                    </FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Col
                  style={{
                    display: "flex",
                  }}
                >
                  <Button
                    type="submit"
                    className="ms-auto"
                    style={{
                      padding: "0.5em 1em",
                      width: "8rem",
                    }}
                  >
                    Login
                  </Button>
                </Col>
              </Form>
            </>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default LoginPage;
