// Componente Contacto
import "./Contacto.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Contacto = () => {
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "bounce.out",
        stagger: 0.18,
      }
    );
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-info">
        <div className="contact-item" ref={(el) => (itemsRef.current[0] = el)}>
          <strong>EMAIL</strong>
          <a
            href="mailto:federementeria@hotmail.com"
            className="contact-detail"
          >
            federementeria@hotmail.com
          </a>
        </div>
        <div className="contact-item" ref={(el) => (itemsRef.current[1] = el)}>
          <strong>TELEFONO</strong>
          <a
            href="https://wa.me/2324503773?text=Hola Fede! Me comunico desde la pagina web, quiero consultarte por un trabajo..."
            className="contact-detail"
            target="_blank"
            rel="noopener noreferrer"
          >
            +54 9 2324 50-3773
          </a>
        </div>
        <div className="contact-item" ref={(el) => (itemsRef.current[2] = el)}>
          <strong>INSTAGRAM</strong>
          <a
            href="https://www.instagram.com/federementeria27/"
            className="contact-detail"
            target="_blank"
            rel="noopener noreferrer"
          >
            @federementeria27
          </a>
        </div>
      </div>
    </div>
  );
};
