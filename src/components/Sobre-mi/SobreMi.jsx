import imgPerfil from "../../assets/Img-fotos/sobreMi.webp";
import "./SobreMi.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const SobreMi = () => {
  const titleRef = useRef(null);

  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Animación de escritura para el título
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span style="opacity:0;display:inline-block;">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
      const letters = titleRef.current.querySelectorAll("span");
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        stagger: 0.09,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.3,
      });
    }
    // Animación de fade y desplazamiento para el texto y la imagen
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
    );
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power2.out", delay: 1.1 }
    );
  }, []);

  return (
    <section className="about-me" id="about-me">
      <h3 className="about-me-title" ref={titleRef}>
        SOBRE MI
      </h3>
      <div className="about-me-grid">
        <div className="about-me-text" ref={textRef}>
          <p>
            Desde 2013, trabajo como realizador audiovisual freelance,
            colaborando con grandes marcas en la cobertura de eventos
            deportivos, recitales y otros proyectos. Mi enfoque está en crear
            contenido visual que transmita emociones y conecte con el público,
            desde la planificación hasta la ejecución.
          </p>
        </div>
        <div className="about-me-image" ref={imgRef}>
          <img src={imgPerfil} alt="perfil" />
        </div>
      </div>
    </section>
  );
};
