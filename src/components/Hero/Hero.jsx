import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Hero.css";

const Hero = ({ videoSrc = "/hero-720.mp4" }) => {
  const [videoExpanded, setVideoExpanded] = useState(false);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  // Intenta reproducir el video explícitamente (necesario en mobile)
  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Si falla, espera interacción del usuario
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forzar reproducción en cuanto el video tenga datos suficientes
    const handleCanPlay = () => attemptPlay();
    video.addEventListener("canplay", handleCanPlay);

    // Fallback: cualquier toque del usuario dispara la reproducción
    const handleUserInteraction = () => {
      attemptPlay();
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
    document.addEventListener("touchstart", handleUserInteraction, { passive: true });
    document.addEventListener("click", handleUserInteraction);

    // Intentar ya si el video ya cargó
    attemptPlay();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  // Expande el video después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoExpanded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToProyectos = () => {
    document
      .getElementById("proyectos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <div
        className={`hero-video-background ${videoExpanded ? "expanded" : ""}`}
        ref={videoContainerRef}
      >
        <video
          ref={videoRef}
          className="hero-background-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Video de fondo del hero"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">FEDEREMENTERIA</h1>
      </div>

      <div
        className="scroll-indicator"
        onClick={scrollToProyectos}
        style={{ cursor: "pointer" }}
      >
        <div className="scroll-circle">
          <svg viewBox="0 0 100 100" className="scroll-svg">
            {/* Círculo blanco interno */}
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#fff"
              strokeWidth="0.8"
            />
            {/* Texto PROYECTOS alrededor */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="sans-serif"
              fill="#fff"
            >
              <textPath href="#scroll-path" startOffset="0%">
                PROYECTOS • PROYECTOS • PROYECTOS • PROYECTOS • PROYECTOS
              </textPath>
            </text>
            <path
              id="scroll-path"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </svg>
          {/* Flecha roja dentro del círculo blanco */}
          <div className="scroll-arrow">
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  videoSrc: PropTypes.string,
};

export default Hero;
