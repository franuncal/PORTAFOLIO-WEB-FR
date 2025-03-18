import { Link } from "react-router-dom"; // Importa useLocation
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false); // Cierra el menú al hacer clic
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazamiento suave al inicio
  };

  return (
    <header>
      <Link to="/" className="logo" onClick={handleScrollToTop}>
        federementeria.
      </Link>
      <button id="abrir" className="abrir-menu" onClick={toggleMenu}>
        <i className="bi bi-list"></i>
      </button>
      <button
        id="cerrar"
        className={`cerrar-menu ${menuOpen ? "visible" : ""}`}
        onClick={toggleMenu}
      >
        <i className="bi bi-x"></i>
      </button>
      <nav className={`nav ${menuOpen ? "open" : ""}`} id="nav">
        <ul className="nav-list" id="nav-list">
          <li>
            <Link
              to="/"
              onClick={() => {
                handleMenuClick();
                handleScrollToTop();
              }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/SobreMi" onClick={handleMenuClick}>
              Sobre Mí
            </Link>
          </li>
          <li>
            <Link to="/Page" onClick={handleMenuClick}>
              Proyectos
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleMenuClick}>
              Contacto
            </Link>
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
              href="https://wa.me/2324503773?text=Hola Fede! Me comunico desde la pagina web, quiero consultarte por un trabajo..."
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
