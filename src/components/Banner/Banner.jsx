import "./Banner.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Banner = () => {
  const bannerRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Fondo negro fijo
    if (bannerRef.current) {
      bannerRef.current.style.background = "#000";
    }
    // Animación de logo: entrada suave con slow
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { y: -120, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "slow(0.7,0.7,false)",
          delay: 0.2,
        }
      );
    }
    // Animación de subtítulo: letras aparecen una a una
    if (subtitleRef.current) {
      const subtitleText = subtitleRef.current.textContent;
      subtitleRef.current.innerHTML = subtitleText
        .split("")
        .map(
          (char) =>
            `<span style="opacity:0;display:inline-block;">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
      const subtitleLetters = subtitleRef.current.querySelectorAll("span");
      gsap.to(subtitleLetters, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.1,
      });
    }
  }, []);

  return (
    <section
      className="banner"
      id="banner"
      ref={bannerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="banner-content"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="logo-container">
          <h1 className="logo-v" ref={logoRef}>
            federementeria.
          </h1>
          <h2 className="logo-vp" ref={subtitleRef}>
            REALIZADOR AUDIOVISUAL
          </h2>
        </div>
      </div>
    </section>
  );
};
