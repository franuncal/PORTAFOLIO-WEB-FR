import React from "react";
import "./BackToHero.css";

const BackToHero = () => {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="back-to-hero" aria-label="Volver al inicio">
      <button
        type="button"
        className="back-to-hero__circle"
        onClick={scrollToHero}
        aria-label="Volver al inicio"
      >
        <svg viewBox="0 0 100 100" className="back-to-hero__svg">
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="#fff"
            strokeWidth="0.8"
          />
          <path
            id="back-to-hero-path"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="sans-serif"
            fill="#fff"
          >
            <textPath href="#back-to-hero-path" startOffset="0%">
              HERO - HERO - HERO - HERO - HERO - HERO - HERO - HERO -
            </textPath>
          </text>
        </svg>
        <span className="back-to-hero__arrow" aria-hidden="true">
          ↑
        </span>
      </button>
    </section>
  );
};

export default React.memo(BackToHero);
