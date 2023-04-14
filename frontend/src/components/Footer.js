import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "-3em",
            marginBottom: "1em",
          }}
        >
          <div className="footer-icons">
            <a
              href="https://github.com/ArushaK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github footer-icon"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/arusha-kamate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in footer-icon"></i>
            </a>
          </div>
          <div className="footer-copyright">Footer</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
