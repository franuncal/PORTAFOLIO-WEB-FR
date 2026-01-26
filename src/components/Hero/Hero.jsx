import { useState, useEffect, useRef } from "react";
import "./Hero.css";

// Helper para obtener el videoId desde la url
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

// Helper para construir la url de embed con loop
function getEmbedUrl(videoId, mute = true) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
    mute ? 1 : 0
  }&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
}

const Hero = ({ videoUrl }) => {
  const [videoExpanded, setVideoExpanded] = useState(false);
  const videoContainerRef = useRef(null);

  const videoId = videoUrl ? getVideoId(videoUrl) : "";
  const backgroundVideoUrl = videoId ? getEmbedUrl(videoId, true) : "";

  // Efecto para expandir el video después de 2 segundos
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
        {backgroundVideoUrl && (
          <iframe
            src={backgroundVideoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="background-video"
            className="hero-background-video"
          ></iframe>
        )}
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

export default Hero;
