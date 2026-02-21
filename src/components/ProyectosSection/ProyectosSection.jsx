import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import "./ProyectosSection.css";

/* =========================
   Helpers (limpios y reutilizables)
   ========================= */
function getVideoId(url) {
  const patterns = [
    /embed\/([\w-]+)/,
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function getEmbedUrl(videoId, mute = true) {
  const muted = mute ? 1 : 0;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
}

function getThumbnailUrl(videoId) {
  // algunos videos no tienen maxres real
  const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const standard = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return videoId === "p2QlsA3SOrs" ? standard : maxRes;
}

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

/* =========================
   VideoCard
   ========================= */
const VideoCard = React.memo(function VideoCard({
  videoUrl,
  title,
  description,
  isMobile,
  onOpen,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Dot cursor
  const [dot, setDot] = useState({ x: 0.5, y: 0.5, visible: false });
  const mediaRef = useRef(null);
  const rafRef = useRef(null);
  const revealTimerRef = useRef(null);

  const videoId = useMemo(() => getVideoId(videoUrl), [videoUrl]);
  const autoplayUrl = useMemo(() => getEmbedUrl(videoId, true), [videoId]);
  const thumbUrl = useMemo(() => getThumbnailUrl(videoId), [videoId]);

  // Desktop: hover revela. Mobile: tap 1 revela, tap 2 abre.
  const shouldShowMeta = isMobile ? isRevealed : isHovered;

  const clearRevealTimer = () => {
    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearRevealTimer();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const revealOnMobile = () => {
    clearRevealTimer();
    setIsRevealed(true);

    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealed(false);
    }, 1400);
  };

  const handlePress = () => {
    if (isMobile && !isRevealed) {
      revealOnMobile();
      return;
    }
    onOpen();
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    setDot((prev) => ({ ...prev, visible: true }));
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setDot((prev) => ({ ...prev, visible: false }));
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const el = mediaRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clamp01((e.clientX - rect.left) / rect.width);
      const y = clamp01((e.clientY - rect.top) / rect.height);
      setDot({ x, y, visible: true });
    });
  };

  return (
    <div
      className={`projectCard ${!isMobile ? "projectCard--dotCursor" : ""} ${
        shouldShowMeta ? "is-revealed" : ""
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Abrir video: ${title}`}
      onClick={handlePress}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handlePress();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="projectCard__media" ref={mediaRef}>
        {/* Preview: imagen siempre; iframe SOLO cuando hover en desktop */}
        {isMobile || !isHovered ? (
          <img
            src={thumbUrl}
            alt={`Thumbnail de ${title}`}
            className="projectCard__thumb"
            loading="lazy"
          />
        ) : (
          <iframe
            src={autoplayUrl}
            className="projectCard__iframe"
            frameBorder="0"
            allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`preview-${videoId}`}
          />
        )}

        {/* Capa para que el iframe no robe el click */}
        <span className="projectCard__clickLayer" aria-hidden="true" />

        {/* Overlay MUY sutil (casi nada) */}
        <span className="projectCard__overlay" aria-hidden="true" />

        {/* Dot cursor (desktop) */}
        <span
          className={`projectCard__dot ${dot.visible ? "is-visible" : ""}`}
          style={{ left: `${dot.x * 100}%`, top: `${dot.y * 100}%` }}
          aria-hidden="true"
        />

        <div
          className="projectCard__meta"
          aria-hidden={!shouldShowMeta}
          // evita que el lector “confunda” el estado visual
        >
          <h4 className="projectCard__title" title={title}>
            {title}
          </h4>
          <p className="projectCard__subtitle">{description}</p>
        </div>
      </div>
    </div>
  );
});

VideoCard.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

/* =========================
   Section
   ========================= */
const ProyectosSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const lastFocusedRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videos = useMemo(
    () => [
      {
        url: "https://youtu.be/TsRBpXc20bs",
        title: "VILLAVICENCIO - IEB + ARG OPEN",
        description: "DIRECCIÓN",
      },
      {
        url: "https://youtu.be/UOHSOm47a5A",
        title: "SIDRA 1888 X TORNEO ARGENTINO DE POLO",
        description: "DIRECCIÓN",
      },
      {
        url: "https://youtu.be/VgcNdQ-hZe4",
        title: "DUKI - MEXICO I SEPTIEMBRE 2025",
        description: "RECAP",
      },
      // {
      //   url: "https://www.youtube.com/embed/p2QlsA3SOrs",
      //   title: "DUKI - TOUR ESPAÑA OCTUBRE 2025",
      //   description: "RECAP",
      // },
      {
        url: "https://www.youtube.com/embed/90h_Ru0Mfhk",
        title: "RENAULT ARKANA",
        description: "DIRECCIÓN",
      },
      {
        url: "https://www.youtube.com/embed/AE1WT17_3k4",
        title: "ESPAÑA TOUR - DUKI",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/GOW4kljLNXM",
        title: "LACOSTE DJOKOVIC",
        description: "RECAP",
      },
      {
        url: "https://www.youtube.com/embed/VuH8aXg0xTI",
        title: "USA TOUR - DUKI",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/3wbo-rEKGNw",
        title: "RENAULT X GABY SABATINI",
        description: "DIRECCIÓN",
      },
      {
        url: "https://www.youtube.com/embed/Wsw8ZgiPyIY",
        title: "AIR JORDAN 3 RIO",
        description: "RECAP",
      },
      {
        url: "https://www.youtube.com/embed/v5qvjvJxzRI",
        title: "ARGENTINA TOUR - DUKI",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/Z3wRrLgSkDA",
        title: "CLINICA SANTADER",
        description: "RECAP",
      },
      {
        url: "https://www.youtube.com/embed/RQKjMQbYS20",
        title: "LACOSTE CLUB BS.AS",
        description: "RECAP",
      },
      {
        url: "https://www.youtube.com/embed/CWopIoxPtY8",
        title: "SIDRA 1888 X ARG OPEN",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/Ulo2z6q8Sfc",
        title: "PUMA 10K SAN ISIDRO",
        description: "RECAP",
      },
      {
        url: "https://www.youtube.com/embed/d6WgQ7TvKL4",
        title: "CLINICA LACOSTE",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/4VdLAReBGCc",
        title: "NIKE FOR THE ARTIST",
        description: "DIRECCIÓN",
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
        title: "SIDRA 1888 X ARG OPEN",
        description: "AFTERMOVIE",
      },
      {
        url: "https://www.youtube.com/embed/OIGd7FdVU8I",
        title: "COPA DAVIS - ROSARIO",
        description: "DIRECCIÓN",
      },
    ],
    [],
  );

  const openModal = (videoUrl) => {
    lastFocusedRef.current = document.activeElement;
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedVideo("");

    if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const videosToShow = isMobile ? videos.slice(0, 15) : videos;

  return (
    <>
      <section id="proyectos" className="projectsSection">
        <h2 className="projectsSection__title" aria-label="proyectos">
          <span className="projectsSection__marquee" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="projectsSection__word">
                proyectos
              </span>
            ))}
          </span>
        </h2>

        <div className="projectsSection__grid">
          {videosToShow.map(({ url, title, description }) => (
            <VideoCard
              key={url}
              videoUrl={url}
              title={title}
              description={description}
              isMobile={isMobile}
              onOpen={() => openModal(url)}
            />
          ))}
        </div>
      </section>

      {isOpen && (
        <div
          className="projectsModal"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="projectsModal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="projectsModal__close"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="projectsModal__videoWrap">
              <iframe
                src={getEmbedUrl(getVideoId(selectedVideo), false)}
                frameBorder="0"
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="selected-video"
                className="projectsModal__video"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProyectosSection;
