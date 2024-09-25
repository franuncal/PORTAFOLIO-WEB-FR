// Componente Contacto
import "./Contacto.css";

export const Contacto = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <div className="contact-item">
          <strong>EMAIL</strong>
          <a
            href="mailto:federementeria@hotmail.com"
            className="contact-detail"
          >
            federementeria@hotmail.com
          </a>
        </div>
        <div className="contact-item">
          <strong>TELEFONO</strong>
          <a href="tel:+5492324503773" className="contact-detail">
            +54 9 2324 50-3773
          </a>
        </div>
        <div className="contact-item">
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
