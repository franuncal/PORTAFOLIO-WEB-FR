// Navbar.jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const lastFocusedRef = useRef(null);

  const navItems = useMemo(
    () => [
      { label: "SOBRE MI", hash: "#sobre-mi", targetId: "sobre-mi" },
      { label: "PROYECTOS", hash: "#proyectos", targetId: "proyectos" },
      { label: "CONTACTO", hash: "#contacto", targetId: "contacto" },
    ],
    [],
  );

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus();
    }
  }, []);

  const toggleMenu = () => {
    if (!menuOpen) lastFocusedRef.current = document.activeElement;
    setMenuOpen((prev) => !prev);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHomeTop = (e) => {
    e?.preventDefault?.();
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const handleNav = (hash, targetId) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate(`/${hash}`);
      return;
    }

    scrollToId(targetId);

    if (window.history?.replaceState) {
      window.history.replaceState(null, "", hash);
    }
  };

  const isActive = (hash) =>
    location.pathname === "/" && location.hash === hash;

  // Scroll state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  // Lock body on open (mobile)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // If arrives at /#hash from another route, scroll after mount
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const t = window.setTimeout(() => scrollToId(id), 60);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <header className={`usherNav ${isScrolled ? "is-scrolled" : ""}`}>
      {/* DESKTOP */}
      <div className="usherNav__desktop">
        <div className="usherNav__inner">
          <Link
            to="/"
            className="usherNav__brand"
            onClick={goHomeTop}
            aria-label="Ir al inicio"
          >
            FR.
          </Link>

          <nav className="usherNav__center" aria-label="Navegación principal">
            <ul className="usherNav__list">
              {navItems.map((item) => (
                <li key={item.targetId} className="usherNav__item">
                  <button
                    type="button"
                    className={`usherNav__link ${isActive(item.hash) ? "is-active" : ""}`}
                    onClick={() => handleNav(item.hash, item.targetId)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* MOBILE */}
      <div className="usherNav__mobile">
        <div className="usherNav__mobileTop">
          <div className={`usherNav__mobileBar ${menuOpen ? "open" : ""}`}>
            <Link
              to="/"
              className="usherNav__brand"
              onClick={goHomeTop}
              aria-label="Ir al inicio"
            >
              FR.
            </Link>

            <button
              type="button"
              className={`usherNav__toggle ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="usher-nav-panel"
            >
              <span aria-hidden="true" className="usherNav__burger">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div
          id="usher-nav-panel"
          className={`usherNav__panel ${menuOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
        >
          <ul className="usherNav__panelList">
            {navItems.map((item) => (
              <li key={item.targetId}>
                <button
                  type="button"
                  className={`usherNav__panelLink ${isActive(item.hash) ? "is-active" : ""}`}
                  onClick={() => handleNav(item.hash, item.targetId)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={`usherNav__overlay ${menuOpen ? "open" : ""}`}
          onClick={closeMenu}
          aria-hidden={!menuOpen}
          tabIndex={menuOpen ? 0 : -1}
        />
      </div>
    </header>
  );
};
