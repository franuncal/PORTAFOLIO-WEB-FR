// // Navbar.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// /**
//  * Navbar — estilo "AU/USSHER"
//  * - Desktop: burbuja centrada con logo + links
//  * - Mobile: pill logo + pill burger, dropdown corto (solo links)
//  * - Sin texto gigante en el overlay
//  * - Sin subrayados/lineas raras en CONTACT (reset fuerte)
//  */
// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const lastFocusedRef = useRef(null);

//   const navItems = useMemo(
//     () => [
//       { label: "ABOUT", hash: "#sobre-mi", targetId: "sobre-mi" },
//       { label: "PROJECTS", hash: "#proyectos", targetId: "proyectos" },
//       { label: "CONTACT", hash: "#contacto", targetId: "contacto" },
//     ],
//     [],
//   );

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 10);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === "Escape") closeMenu();
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [menuOpen]);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   const scrollToId = (id) => {
//     const el = document.getElementById(id);
//     if (!el) return;
//     el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const isActive = (hash) =>
//     location.pathname === "/" && location.hash === hash;

//   const closeMenu = () => {
//     setMenuOpen(false);
//     if (lastFocusedRef.current instanceof HTMLElement) {
//       lastFocusedRef.current.focus();
//     }
//   };

//   const toggleMenu = () => {
//     if (!menuOpen) lastFocusedRef.current = document.activeElement;
//     setMenuOpen((prev) => !prev);
//   };

//   const goHomeTop = (e) => {
//     e?.preventDefault?.();
//     closeMenu();

//     if (location.pathname === "/") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }
//     navigate("/");
//   };

//   const handleNav = (hash, targetId) => {
//     closeMenu();

//     // si no estás en home, navegá a /#hash y al montar scrollea
//     if (location.pathname !== "/") {
//       navigate(`/${hash}`);
//       return;
//     }

//     scrollToId(targetId);

//     // set hash sin salto
//     if (window.history?.replaceState) {
//       window.history.replaceState(null, "", hash);
//     }
//   };

//   // Si llegás a /#hash desde otra ruta, scrollea al montar
//   useEffect(() => {
//     if (location.pathname !== "/") return;
//     if (!location.hash) return;

//     const id = location.hash.replace("#", "");
//     const t = window.setTimeout(() => scrollToId(id), 60);
//     return () => window.clearTimeout(t);
//   }, [location.pathname, location.hash]);

//   return (
//     <header className="navX">
//       {/* DESKTOP */}
//       <div className={`navX__desktop ${isScrolled ? "is-scrolled" : ""}`}>
//         <Link
//           to="/"
//           className="navX__desktopLogo"
//           onClick={goHomeTop}
//           aria-label="Ir al inicio"
//         >
//           FR
//         </Link>

//         <nav className="navX__desktopNav" aria-label="Navegación principal">
//           <ul className="navX__desktopList">
//             {navItems.map((item) => (
//               <li key={item.targetId} className="navX__desktopItem">
//                 <button
//                   type="button"
//                   className={`navX__desktopLink ${isActive(item.hash) ? "is-active" : ""}`}
//                   onClick={() => handleNav(item.hash, item.targetId)}
//                 >
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* MOBILE */}
//       <div className="navX__mobile">
//         <div className="navX__mobileTop">
//           <Link
//             to="/"
//             className={`navX__pill navX__pill--logo ${isScrolled ? "is-scrolled" : ""}`}
//             onClick={goHomeTop}
//             aria-label="Ir al inicio"
//           >
//             FR
//           </Link>

//           <button
//             type="button"
//             className={`navX__pill navX__pill--burger ${menuOpen ? "open" : ""} ${
//               isScrolled ? "is-scrolled" : ""
//             }`}
//             onClick={toggleMenu}
//             aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
//             aria-expanded={menuOpen}
//             aria-controls="navX-mobile-panel"
//           >
//             <span className="navX__burgerLine" aria-hidden="true" />
//           </button>
//         </div>

//         <div
//           id="navX-mobile-panel"
//           className={`navX__mobilePanel ${menuOpen ? "open" : ""}`}
//           role="dialog"
//           aria-modal="true"
//           aria-hidden={!menuOpen}
//         >
//           <ul className="navX__mobileList">
//             {navItems.map((item) => (
//               <li key={item.targetId}>
//                 <button
//                   type="button"
//                   className={`navX__mobileLink ${isActive(item.hash) ? "is-active" : ""}`}
//                   onClick={() => handleNav(item.hash, item.targetId)}
//                 >
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Overlay (cierra afuera) */}
//       <button
//         type="button"
//         className={`navX__overlay ${menuOpen ? "open" : ""}`}
//         onClick={closeMenu}
//         aria-hidden={!menuOpen}
//         tabIndex={menuOpen ? 0 : -1}
//       />
//     </header>
//   );
// };

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

    // set hash sin salto
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

      {/* MOBILE */}
      <div className="usherNav__mobile">
        <div className="usherNav__mobileTop">
          <Link
            to="/"
            className="usherNav__brand"
            onClick={goHomeTop}
            aria-label="Ir al inicio"
          >
            FR
          </Link>

          <button
            type="button"
            className={`usherNav__toggle ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="usher-nav-panel"
          >
            <span aria-hidden="true" className="usherNav__chev" />
          </button>
        </div>

        {/* Panel (solo links, nada más) */}
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

        {/* Click outside */}
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
