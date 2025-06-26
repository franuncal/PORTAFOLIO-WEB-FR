// import { Link } from "react-router-dom";
// import "./Footer.css";

// export const Footer = () => {
//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="footer" id="footer">
//       <div className="footer-content">
//         <Link to="/" className="logo" onClick={handleScrollToTop}>
//           federementeria.
//         </Link>
//         <div className="footer-socials">
//           {[
//             {
//               href: "https://www.instagram.com/federementeria27/",
//               label: "Instagram",
//             },
//             {
//               href: "https://www.youtube.com/@federementeria27",
//               label: "YouTube",
//             },
//           ].map((social, index) => (
//             <a
//               key={index}
//               href={social.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-link"
//             >
//               {social.label}
//             </a>
//           ))}
//         </div>
//       </div>
//       <p className="footer-copy">
//         © {new Date().getFullYear()} federementeria | Todos los derechos
//         reservados.
//       </p>
//       <p className="footer-dev">
//         Desarrollado por{" "}
//         <a
//           href="https://unquidev.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           unqui
//         </a>
//       </p>
//     </footer>
//   );
// };


import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      href: "https://www.instagram.com/federementeria27/",
      label: "Instagram",
      icon: <FaInstagram aria-label="Instagram" />,
    },
    {
      href: "https://www.youtube.com/@federementeria27",
      label: "YouTube",
      icon: <FaYoutube aria-label="YouTube" />,
    },
  ];

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <Link to="/" className="logo" onClick={handleScrollToTop}>
          federementeria.
        </Link>
        <div className="footer-socials">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} federementeria | Todos los derechos reservados.
      </p>
      <p className="footer-dev">
        Desarrollado por{" "}
        <a href="https://unquidev.com" target="_blank" rel="noopener noreferrer">
          unqui
        </a>
      </p>
    </footer>
  );
};