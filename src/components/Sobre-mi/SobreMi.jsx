import imgPerfil from "../../assets/Img-fotos/perfilF1.png";
import "./SobreMi.css";

export const SobreMi = () => {
  return (
    <section className="about-me" id="about-me">
      <h3 className="about-me-title">SOBRE MI</h3> {/* Título fuera del grid */}
      <div className="about-me-grid">
        <div className="about-me-text">
          <p>
            Desde 2013, trabajo como realizador audiovisual freelance,
            colaborando con grandes marcas en la cobertura de eventos
            deportivos, recitales y otros proyectos. Mi enfoque está en crear
            contenido visual que transmita emociones y conecte con el público,
            desde la planificación hasta la ejecución.
          </p>
        </div>
        <div className="about-me-image">
          <img src={imgPerfil} alt="perfil" />
        </div>
      </div>
    </section>
  );
};
