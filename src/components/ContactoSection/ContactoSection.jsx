import React from "react";
import { FaInstagram, FaEnvelope, FaWhatsapp, FaYoutube } from "react-icons/fa";
import "./ContactoSection.css";

const ContactoSection = () => {
  return (
    <section id="contacto" className="contact-section">
      <h2 className="contact-title">
        <div className="contact-title-wrapper">
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
          <span className="contact-title-text">contacto</span>
        </div>
      </h2>
      <div className="contact-content">
        <div className="contact-icons">
          <a
            href="https://www.instagram.com/federementeria27/"
            className="contact-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="contact-icon" />
          </a>
          <a
            href="mailto:federementeria@hotmail.com"
            className="contact-icon-link"
            aria-label="Email"
          >
            <FaEnvelope className="contact-icon" />
          </a>
          <a
            href="https://wa.me/2324503773?text=Hola Fede! Me comunico desde la pagina web, quiero consultarte por un trabajo..."
            className="contact-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="contact-icon" />
          </a>
          <a
            href="https://www.youtube.com/@federementeria"
            className="contact-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube className="contact-icon" />
          </a>
        </div>
        <div className="contact-footer">
          <span className="footer-copyright">
            © Fede Rementeria {new Date().getFullYear()}
          </span>
          <span className="footer-separator">|</span>
          <span className="footer-credit">
            creado por{" "}
            <a
              href="https://franuncal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              fran.dev
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
