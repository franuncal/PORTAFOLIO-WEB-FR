import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Home.css";

// Componente para el video con Lazy Loading
const Video = React.memo(function Video({ videoUrl, onClick }) {
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
    <div className="video-container">
      <iframe
        ref={videoRef}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={`video-${videoUrl}`}
        className="video"
        aria-label="Video de la galería"
      ></iframe>
      <div className="overlay" onClick={onClick}></div>
    </div>
  );
});

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videos = [
    //Alpine-Renault - gaby y colapinto
    "https://www.youtube.com/embed/90h_Ru0Mfhk",
    // Duki USA
    "https://www.youtube.com/embed/VuH8aXg0xTI",
    // Lacoste Del potro
    "https://www.youtube.com/embed/GOW4kljLNXM",
    // Nike 2
    "https://www.youtube.com/embed/Wsw8ZgiPyIY",
    // Gaby - Roland
    "https://www.youtube.com/embed/3wbo-rEKGNw",
    // Duki LATAM
    "https://www.youtube.com/embed/v5qvjvJxzRI",
    // Clinica lacoste
    "https://www.youtube.com/embed/RQKjMQbYS20",
    // Duki
    "https://www.youtube.com/embed/FIxdxlcfHKQ",
    // Duki Viña
    "https://www.youtube.com/embed/wLSrCfRyAeI",
    // Sidra 1888 -Nuevo
    "https://www.youtube.com/embed/CWopIoxPtY8",
    // Puma
    "https://www.youtube.com/embed/Ulo2z6q8Sfc",
    // Nike
    "https://www.youtube.com/embed/4VdLAReBGCc",
    // Lacoste clinica 2
    "https://www.youtube.com/embed/d6WgQ7TvKL4",
    // Nike 3
    "https://www.youtube.com/embed/re75ORPz2tk",
    // Messi
    "https://www.youtube.com/embed/r44fbL9Tg_k",
    // Sidra 1888 1
    "https://www.youtube.com/embed/Ug2KoGHsRf8",
    // ARG EZEIZA
    "https://www.youtube.com/embed/Zt0uUcHv4qo",
    // COPA DAVIS - ROSARIO
    "https://www.youtube.com/embed/OIGd7FdVU8I",
    // TANDIL ACDEMIA TENIS
    "https://www.youtube.com/embed/OPkzqNS2KqU",
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

  const videosToShow = isMobile ? videos.slice(0, 6) : videos;

  return (
    <div className="home-container">
      <div className="video-grid">
        {videosToShow.map((videoUrl, index) => (
          <Video
            key={index}
            videoUrl={videoUrl}
            onClick={() => openModal(videoUrl)}
          />
        ))}
      </div>

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
          <button className="more-projects-button">
            Ver más Proyectos <span className="arrow">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Home);
