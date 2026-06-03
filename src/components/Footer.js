import { Container, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.png";
import { openResume } from "../site";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <img src={logo} alt="Logo" />
          <div className="social-icon">
            <a
              href="https://www.linkedin.com/in/samiur-rahman-1a09b6271/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={navIcon1} alt="LinkedIn Icon" />
            </a>
            <a
              href="https://github.com/Samiurr10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={navIcon2} alt="GitHub Icon" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openResume();
              }}
            >
              <img src={navIcon3} alt="Resume Icon" />
            </a>
          </div>
          <p>Copyright 2026. All Rights Reserved</p>
        </div>
      </Container>
    </footer>
  );
};
