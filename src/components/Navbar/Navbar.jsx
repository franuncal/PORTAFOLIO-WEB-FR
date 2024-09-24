import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <header>
      <Link to="/" className="logo">
        federementeria.
      </Link>
      <button id="abrir" className="abrir-menu">
        <i className="bi bi-list"></i>
      </button>
      <nav className="nav" id="nav">
        <button id="cerrar" className="cerrar-menu">
          <i className="bi bi-x"></i>
        </button>
        <ul className="nav-list" id="nav-list">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/SobreMi">Sobre Mí</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
          <div className="social-icons-nav">
            <a
              href="https://www.instagram.com/federementeria27/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://wa.me/2324503773"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </ul>
      </nav>
    </header>
  );
};
