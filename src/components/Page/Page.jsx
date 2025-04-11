import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const videos = [
    {
      url: "https://www.youtube.com/embed/wLSrCfRyAeI",
      title: "DUKI - VIÑA DEL MAR 2025",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/CWopIoxPtY8",
      title: "ARG OPEN TENIS IEB+ - SIDRA 1888",
      description: "RECAP",
    },
    // {
    //   url: "https://www.youtube.com/embed/10xx_kpNIes",
    //   title: "DUKI - TOUR COCHABAMBA - SANTA CRUZ 2025",
    //   description: "RECAP",
    // },

    {
      url: "https://www.youtube.com/embed/GOW4kljLNXM",
      title: "DEL POTRO - DJOKOVIC x LACOSTE M&G",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/FIxdxlcfHKQ",
      title: "ESTADIO MONUMENTAL COLO COLO - A.D.A TOUR 2024 - DUKI",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Ulo2z6q8Sfc",
      title: "PUMA X SAN ISIDRO - 10K",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/RQKjMQbYS20",
      title: "LE CLUB LACOSTE RACKET 2024 - SUMMA SPORT",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/4VdLAReBGCc",
      title: "NIKE FOR THE ARTIST - NIKE MAX",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/7_-FIF8zWVs",
      title: "YSY A - ESTADIO 'ADOLFO DUCO' HURACAN",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/gkGI1lF42ak",
      title: "JUAN ROMAN RIQUELME - DESPEDIDA",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Iljv_FFUhdc",
      title: "USTED SEÑALEMELO - TRIPOLAR COMP. ART MEDIA",
      description: "STEADY CAM. OPERATOR",
    },
    {
      url: "https://www.youtube.com/embed/OPkzqNS2KqU",
      title: "TANDIL TENIS - ACADEMIA FORMATIVA - CAMPAÑA",
      description: "CAMERA OP./EDIT",
    },
    {
      url: "https://www.youtube.com/embed/cvqEv0VVxkM",
      title: "BIZARRAP - HIPODROMO DE PALERMO",
      description: "CAMERA OP.",
    },
    {
      url: "https://www.youtube.com/embed/pQmg2R_zhmw",
      title: "SANTANDER CLINIC TENIS - PILARA",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/iMO_tpYp9ss",
      title: "COPA DAVIS 2023 - SUMMA SPORTS",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Z3wRrLgSkDA",
      title: "SANTANDER CLINIC TENIS - CORDOBA",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Ct9ZKfPg27o",
      title: "USTED SEÑALEMELO DOCUMENTAL TRIPOLAR 360",
      description: "CAMERA OP. /STAGE",
    },
    {
      url: "https://www.youtube.com/embed/wNeaLHuaFDc",
      title: "EL KUELGUE - COMPLEJO ART MEDIA ",
      description: "EDIT",
    },
    {
      url: "https://www.youtube.com/embed/3wbo-rEKGNw",
      title: "RENAULT X GABRIELA SABATINI X ROLAND GARROS",
      description: "DIRECTION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/re75ORPz2tk",
      title: "NIKE X TOM",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Wsw8ZgiPyIY",
      title: "AIR JORDAN 3 RÍO X J BALVIN",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/r44fbL9Tg_k",
      title: "THE MESSI EXPERIENCE - LUNA PARK",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/d6WgQ7TvKL4",
      title: "LACOSTE CLINIC - PILARÁ",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Zt0uUcHv4qo",
      title: "AFA - CAMPEONES LLEGADA",
      description: "CAMERA OP.",
    },
    {
      url: "https://www.youtube.com/embed/Ug2KoGHsRf8",
      title: "SIDRA 1888 TORNEO IEB + ARG OPEN",
      description: "DIRECTION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/OIGd7FdVU8I",
      title: "SIDRA 1888 COPA DAVIS ROSARIO",
      description: "DIRECCION CONTENT",
    },
    {
      url: "https://www.youtube.com/embed/AjPANMagV_g",
      title: "ADIDAS RENOVACION LOCAL",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/8jCvH47oepw",
      title: "EMILIA MERNES MOVISTAR ARENA - TU CREES EN MI",
      description: "STEADY CAM. OPERATOR",
    },
    {
      url: "https://www.youtube.com/embed/vDWve7oPfo0",
      title: "PHILADELPHIA TANGO - WINNIE CHEUNG X EMILIANO MEZZIES",
      description: "DIRECCION",
    },
    {
      url: "https://www.youtube.com/embed/ZiK2uwovNZY",
      title: "EMILIA MOVISTAR ARENA - MP3 TOUR",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/Hb8FbT47DtY",
      title: "LALI CONSQUIN ROCK",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/J6LuXJm--u8",
      title: "MIRANDA EN FERRO",
      description: "RECAP",
    },
    {
      url: "https://www.youtube.com/embed/fM-3BnaqYOU",
      title: "BRESH X GUARDIANES DEL ESPACIO",
      description: "RECAP",
    },
  ];

  const openModal = useCallback((videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedVideo("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba cuando se monta el componente
  }, []);

  return (
    <section className="home-container-p">
      <h1 className="title">PROYECTOS</h1>
      <div className="video-grid-p">
        {videos.map((video, index) => (
          <div key={index} className="video-container-p">
            {/* Mostrar miniatura del video */}
            <img
              src={`https://img.youtube.com/vi/${video.url
                .split("/")
                .pop()}/0.jpg`}
              alt={video.title}
              className="video-thumbnail"
              onClick={() => openModal(video.url)}
              title={`Ver video: ${video.title}`} // Título para mejorar la accesibilidad
            />
            <div className="descripcion">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
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
          ~ Contactame...
        </Link>
      </div>
    </section>
  );
};

export default Page;
