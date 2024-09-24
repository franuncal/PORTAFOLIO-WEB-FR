import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const videos = [
    {
      url: "https://www.youtube.com/embed/7_-FIF8zWVs",
      title: "YSY A - Estadio Huracan",
      description: "Camara 1",
    },
    {
      url: "https://www.youtube.com/embed/gkGI1lF42ak",
      title: "YSY A - Estadio Huracan",
      description: "Camara 2",
    },
    {
      url: "https://www.youtube.com/embed/Iljv_FFUhdc",
      title: "YSY A - Estadio Huracan",
      description: "Camara 3",
    },
    {
      url: "https://www.youtube.com/embed/OPkzqNS2KqU",
      title: "Torneo Internacional de Tenis",
      description: "Cobertura del torneo en Argentina",
    },
    {
      url: "https://www.youtube.com/embed/cvqEv0VVxkM",
      title: "Bizarrap - Recital en vivo",
      description: "Evento en Buenos Aires",
    },
    {
      url: "https://www.youtube.com/embed/pQmg2R_zhmw",
      title: "Banco Santander - Publicidad",
      description: "Campaña publicitaria regional",
    },
    {
      url: "https://www.youtube.com/embed/iMO_tpYp9ss",
      title: "Copa Davis - Final",
      description: "Cobertura de la final de la Copa Davis",
    },
    {
      url: "https://www.youtube.com/embed/Z3wRrLgSkDA",
      title: "Banco Santander - Evento Corporativo",
      description: "Evento empresarial 2023",
    },
    {
      url: "https://www.youtube.com/embed/Ct9ZKfPg27o",
      title: "Universidad del Salvador - Video Institucional",
      description: "Video promocional para la universidad",
    },
    {
      url: "https://www.youtube.com/embed/wNeaLHuaFDc",
      title: "El Kuelgue - Videoclip",
      description: "Videoclip oficial de la banda El Kuelgue",
    },
    {
      url: "https://www.youtube.com/embed/3wbo-rEKGNw",
      title: "Gaby Amarantos - Concierto en Vivo",
      description: "Cobertura del concierto en vivo de Gaby Amarantos",
    },
    {
      url: "https://www.youtube.com/embed/re75ORPz2tk",
      title: "Nike - Publicidad",
      description: "Campaña de lanzamiento para Nike",
    },
    {
      url: "https://www.youtube.com/embed/r44fbL9Tg_k",
      title: "Lionel Messi - Video Homenaje",
      description: "Video tributo a Messi por su trayectoria",
    },
    {
      url: "https://www.youtube.com/embed/d6WgQ7TvKL4",
      title: "Lacoste - Evento Corporativo",
      description: "Cobertura del evento de Lacoste",
    },
    {
      url: "https://www.youtube.com/embed/Zt0uUcHv4qo",
      title: "Evento Deportivo",
      description: "Cobertura de evento de atletismo",
    },
    {
      url: "https://www.youtube.com/embed/Ug2KoGHsRf8",
      title: "Video Institucional",
      description: "Video institucional para una empresa",
    },
    {
      url: "https://www.youtube.com/embed/OIGd7FdVU8I",
      title: "Evento Musical",
      description: "Concierto en Buenos Aires",
    },
    {
      url: "https://www.youtube.com/embed/AjPANMagV_g",
      title: "Campaña Publicitaria",
      description: "Campaña publicitaria regional",
    },
    {
      url: "https://www.youtube.com/embed/8jCvH47oepw",
      title: "Evento Deportivo",
      description: "Cobertura audiovisual del evento",
    },
    {
      url: "https://www.youtube.com/embed/vDWve7oPfo0",
      title: "Concierto en Vivo",
      description: "Cobertura del concierto en vivo",
    },
    {
      url: "https://www.youtube.com/embed/ZiK2uwovNZY",
      title: "Lali - Concierto en vivo",
      description: "Evento en Buenos Aires",
    },
    {
      url: "https://www.youtube.com/embed/Hb8FbT47DtY",
      title: "Emilia Mernes - Concierto",
      description: "Cobertura audiovisual del concierto de Emilia",
    },
    {
      url: "https://www.youtube.com/embed/J6LuXJm--u8",
      title: "Miranda - Concierto",
      description: "Cobertura audiovisual del concierto de Miranda",
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

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba cuando se monta el componente
  }, []);

  return (
    <div className="home-container-p">
      <h1 className="title">PROYECTOS</h1>
      <div className="video-grid-p">
        {videos.map((video, index) => (
          <div key={index} className="video-container-p">
            {/* Video miniatura en mute y loop */}
            <iframe
              src={`${video.url}?autoplay=1&mute=1&loop=1&playlist=${video.url
                .split("/")
                .pop()}&controls=0&modestbranding=1&showinfo=0&rel=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`video-${index}`}
              className="video-p"
            ></iframe>
            <div className="descripcion">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            {/* Overlay transparente para capturar clic y abrir modal */}
            <div
              className="overlay-p"
              onClick={() => openModal(video.url)}
            ></div>
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
      {/* Call to Action */}
      <div className="call-to-action">
        <h2>TENÉS ALGÚN PROYECTO EN MENTE?</h2>
        <Link to="/contact" className="cta-button">
          ~ Hablemos...
        </Link>
      </div>
    </div>
  );
};

export default Page;
