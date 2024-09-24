import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const videos = [
    // Gaby
    "https://www.youtube.com/embed/3wbo-rEKGNw",
    // Nike
    "https://www.youtube.com/embed/re75ORPz2tk",
    // Messi
    "https://www.youtube.com/embed/r44fbL9Tg_k",
    //Lacoste
    "https://www.youtube.com/embed/d6WgQ7TvKL4",
    //Reci. Argentina
    "https://www.youtube.com/embed/Zt0uUcHv4qo",
    // Sidra 1888
    "https://www.youtube.com/embed/Ug2KoGHsRf8",
    // Sidra 1888 2
    "https://www.youtube.com/embed/OIGd7FdVU8I",
    // Adidas
    "https://www.youtube.com/embed/AjPANMagV_g",
    // Emilia
    "https://www.youtube.com/embed/8jCvH47oepw",
    // Tengo 1
    "https://www.youtube.com/embed/vDWve7oPfo0",
    // Emilia vert.
    "https://www.youtube.com/embed/ZiK2uwovNZY",
    // Lali Mov.
    "https://www.youtube.com/embed/Hb8FbT47DtY",
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
      <div className="video-grid">
        {videos.map((videoUrl, index) => (
          <div key={index} className="video-container">
            {/* Video miniatura en mute y loop */}
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
            {/* Overlay transparente para capturar clic y abrir modal */}
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
              src={`${selectedVideo}?autoplay=1&mute=0&controls=1`} // Video con sonido y controles
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
