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
          {[
            {
              href: "https://www.instagram.com/federementeria27/",
              label: "Instagram",
            },
            {
              href: "https://www.youtube.com/@federementeria27",
              label: "YouTube",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
