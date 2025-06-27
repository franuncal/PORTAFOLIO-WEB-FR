import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Home.css";

const Video = React.memo(function Video({
  videoUrl,
  title,
  description,
  onClick,
  isMobile,
}) {
  const [hovered, setHovered] = useState(false);

  const videoId = videoUrl.split("/").pop();
  const autoplayUrl = `${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0`;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const specialTitles = [
    "MI CIRCUITO PROFESIONAL RG",
    "LACOSTE CLUB BS.AS",
    "NIKE FOR THE ARTIST",
    "PUMA X SAN ISIDRO",
  ];
  const isSpecialTitle = specialTitles.includes(title);

  const specialDescriptions = ["DIRECTION CONTENT", "COLAPINTO-SABATINI"];
  const isSpecialDescription = specialDescriptions.includes(description);

  return (
    <div
      className="video-container"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={onClick}
    >
      {isMobile ? (
        <>
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="video-thumbnail"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="hover-info centered">
            <h4 className={isSpecialTitle ? "special-title" : ""}>{title}</h4>
            <p className={isSpecialDescription ? "special-description" : ""}>
              {description}
            </p>
          </div>
        </>
      ) : !hovered ? (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="video-thumbnail"
          onError={(e) => {
            if (videoId !== "VuH8aXg0xTI") {
              e.target.onerror = null;
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          }}
        />
      ) : (
        <>
          <iframe
            src={autoplayUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={`video-${videoId}`}
            className="video"
          ></iframe>
          <div className="hover-info centered">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </>
      )}
      <div className="overlay"></div>
    </div>
  );
});

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
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
    {
      url: "https://www.youtube.com/embed/90h_Ru0Mfhk",
      title: "RENAULT ARKANA",
      description: "COLAPINTO-SABATINI",
    },
    {
      url: "https://www.youtube.com/embed/VuH8aXg0xTI",
      title: "USA TOUR",
      description: "DUKI",
    },
    {
      url: "https://www.youtube.com/embed/GOW4kljLNXM",
      title: "LACOSTE",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/3wbo-rEKGNw",
      title: "MI CIRCUITO PROFESIONAL RG",
      description: "DIRECTION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/Wsw8ZgiPyIY",
      title: "AIR JORDAN 3 RIO",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/v5qvjvJxzRI",
      title: "ARGENTINA TOUR",
      description: "DUKI",
    },
    {
      url: "https://www.youtube.com/embed/Z3wRrLgSkDA",
      title: "SANTADER CLINICA",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/RQKjMQbYS20",
      title: "LACOSTE CLUB BS.AS",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/CWopIoxPtY8",
      title: "SIDRA 1888",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/wLSrCfRyAeI",
      title: "DUKI VIÑA DEL MAR",
      description: "AFTERMOVIE",
    },
    {
      url: "https://www.youtube.com/embed/Ulo2z6q8Sfc",
      title: "PUMA X SAN ISIDRO",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/d6WgQ7TvKL4",
      title: "CLINICA LACOSTE",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/4VdLAReBGCc",
      title: "NIKE FOR THE ARTIST",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/re75ORPz2tk",
      title: "NIKE X TOM",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/r44fbL9Tg_k",
      title: "MESSI EXPERIENCE",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Ug2KoGHsRf8",
      title: "SIDRA 1888",
      description: "DIRECTION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/OIGd7FdVU8I",
      title: "COPA DAVIS - ROSARIO",
      description: "DIRECTION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/Zt0uUcHv4qo",
      title: "SELECCION ARGENTINA",
      description: "CAMERA OPERATION",
    },
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

  const videosToShow = isMobile ? videos.slice(0, 13) : videos;

  return (
    <div className="home-container">
      <div className="video-grid">
        {videosToShow.map(({ url, title, description }, index) => (
          <Video
            key={index}
            videoUrl={url}
            title={title}
            description={description}
            onClick={() => openModal(url)}
            isMobile={isMobile}
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
