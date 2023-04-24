import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/footer.css";

const Footer = () => {
  return (
    <Container>
      <footer className="footer-container">
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
      </footer>
    </Container>
  );
};

export default Footer;
