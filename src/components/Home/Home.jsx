import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const videos = [
    "https://www.youtube.com/embed/3wbo-rEKGNw", // Gaby
    "https://www.youtube.com/embed/re75ORPz2tk", // Nike
    "https://www.youtube.com/embed/r44fbL9Tg_k", // Messi
    "https://www.youtube.com/embed/d6WgQ7TvKL4", // Lacoste
    "https://www.youtube.com/embed/Zt0uUcHv4qo", // Reci. Argentina
    "https://www.youtube.com/embed/Ug2KoGHsRf8", // Sidra 1888
    "https://www.youtube.com/embed/OIGd7FdVU8I", // Sidra 1888 2
    "https://www.youtube.com/embed/AjPANMagV_g", // Adidas
    "https://www.youtube.com/embed/8jCvH47oepw", // Emilia
    "https://www.youtube.com/embed/vDWve7oPfo0", // Tengo 1
    "https://www.youtube.com/embed/ZiK2uwovNZY", // Emilia vert.
    "https://www.youtube.com/embed/Hb8FbT47DtY", // Lali Mov. vert.
    "https://www.youtube.com/embed/J6LuXJm--u8", // Miranda vert.
    "https://www.youtube.com/embed/fM-3BnaqYOU", // Bresh vert.
  ];

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedVideo("");
  };

  return (
    <div className="home-container">
      {/* Grid original para los videos anteriores */}
      <div className="video-grid">
        {videos.slice(0, -4).map((videoUrl, index) => (
          <div
            key={index}
            className={`video-container ${index >= 6 ? "vertical-video" : ""}`}
          >
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl
                .split("/")
                .pop()}&controls=0&modestbranding=1&showinfo=0&rel=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`video-${index}`}
              className={`video ${index >= 6 ? "vertical" : ""}`}
            ></iframe>
            <div className="overlay" onClick={() => openModal(videoUrl)}></div>
          </div>
        ))}
      </div>

      {/* Nuevo contenedor para los 4 últimos videos */}
      <div className="four-videos-container">
        {videos.slice(-4).map((videoUrl, index) => (
          <div key={index} className="video-container">
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl
                .split("/")
                .pop()}&controls=0&modestbranding=1&showinfo=0&rel=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`video-${index}`}
              className="video"
            ></iframe>
            <div className="overlay" onClick={() => openModal(videoUrl)}></div>
          </div>
        ))}
      </div>

      {/* Modal para ver el video con sonido y controles */}
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

      {/* Botón para ver más proyectos */}
      <div className="more-projects-container">
        <Link to="/Page">
          <button className="more-projects-button">Ver más Proyectos</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
