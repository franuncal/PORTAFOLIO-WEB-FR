import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Home.css";

// Componente para el video con Lazy Loading
const Video = React.memo(function Video({ videoUrl, isVertical, onClick }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = videoUrl.split("/").pop();
          if (entry.isIntersecting) {
            videoRef.current.src = `${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0`;
            setIsLoaded(true);
          } else if (isLoaded) {
            videoRef.current.src = "";
            setIsLoaded(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    const currentRef = videoRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [videoUrl, isLoaded]);

  return (
    <div className={`video-container ${isVertical ? "vertical-video" : ""}`}>
      <iframe
        ref={videoRef}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={`video-${videoUrl}`}
        className={`video ${isVertical ? "vertical" : ""}`}
        aria-label="Video de la galería"
      ></iframe>
      <div className="overlay" onClick={onClick}></div>
    </div>
  );
});

// Validación de las props
Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  isVertical: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Componente principal Home
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const videos = [
    // Duki Viña
    "https://www.youtube.com/embed/wLSrCfRyAeI",
    // Gaby
    "https://www.youtube.com/embed/3wbo-rEKGNw",
    // Lacoste Del potro
    "https://www.youtube.com/embed/GOW4kljLNXM",
    // Duki
    "https://www.youtube.com/embed/FIxdxlcfHKQ",
    // Clinica lacoste
    "https://www.youtube.com/embed/RQKjMQbYS20",
    // Sidra 1888 -Nuevo
    "https://www.youtube.com/embed/CWopIoxPtY8",
    // Puma
    "https://www.youtube.com/embed/Ulo2z6q8Sfc",
    // Nike
    "https://www.youtube.com/embed/4VdLAReBGCc",
    // Nike 2
    "https://www.youtube.com/embed/Wsw8ZgiPyIY",
    // Lacoste clinica 2
    "https://www.youtube.com/embed/d6WgQ7TvKL4",
    // Nike 3
    "https://www.youtube.com/embed/re75ORPz2tk",
    // Messi
    "https://www.youtube.com/embed/r44fbL9Tg_k",
    // Sidra 1888 1
    "https://www.youtube.com/embed/Ug2KoGHsRf8",
    "https://www.youtube.com/embed/Zt0uUcHv4qo",
    "https://www.youtube.com/embed/OIGd7FdVU8I",
    "https://www.youtube.com/embed/OPkzqNS2KqU",

    // Verticales
    "https://www.youtube.com/embed/ZiK2uwovNZY",
    "https://www.youtube.com/embed/Hb8FbT47DtY",
    "https://www.youtube.com/embed/J6LuXJm--u8",
    "https://www.youtube.com/embed/fM-3BnaqYOU",
  ];

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedVideo("");
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="home-container">
      <div className="video-grid">
        {videos.slice(0, -4).map((videoUrl, index) => (
          <Video
            key={index}
            videoUrl={videoUrl}
            isVertical={index >= 6}
            onClick={() => openModal(videoUrl)}
          />
        ))}
      </div>

      {/* Contenedor de los 4 últimos videos */}
      <div className="four-videos-container">
        {videos.slice(-4).map((videoUrl, index) => (
          <Video
            key={index}
            videoUrl={videoUrl}
            isVertical={false}
            onClick={() => openModal(videoUrl)}
          />
        ))}
      </div>

      {/* Modal para ver el video */}
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <iframe
              src={`${selectedVideo}?autoplay=1&mute=0&controls=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="selected-video"
              className="video-full"
            ></iframe>
          </div>
        </div>
      )}

      <div className="more-projects-container">
        <Link to="/Page">
          <button className="more-projects-button">Ver más Proyectos</button>
        </Link>
      </div>
    </div>
  );
};

// Exportando el componente envuelto en React.memo
export default React.memo(Home);
