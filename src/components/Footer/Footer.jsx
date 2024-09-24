import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/" className="logo">
            federementeria.
          </Link>
        </div>
        <div className="footer-right">
          <a
            href="https://www.instagram.com/federementeria27/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@federementeria27"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};
