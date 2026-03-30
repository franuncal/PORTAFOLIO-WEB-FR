import "./SobreMiSection.css";
import sobreMiImage from "../../assets/Img-fotos/sobreMi.webp";

const SobreMiSection = () => {
  return (
    <section id="sobre-mi" className="aboutMono">
      <div className="aboutMono__container">
        <div className="aboutMono__grid">
          <div className="aboutMono__imageWrap">
            <img src={sobreMiImage} alt="" className="aboutMono__image" />
          </div>

          <div className="aboutMono__side">
            <h2 className="aboutMono__headline">Realizador Audiovisual.</h2>

            <p className="aboutMono__copy">
              Dirección y edición audiovisual.
              <br />
              Música, deporte y eventos.
            </p>
            <p className="aboutMono__copy aboutMono__copy--muted">
              Preproducción, rodaje y postproducción.
            </p>

            <div className="aboutMono__meta">
              <span className="aboutMono__metaItem">EDITOR</span>
              <span className="aboutMono__metaSep">·</span>
              <span className="aboutMono__metaItem">DIRECCIÓN</span>
              <span className="aboutMono__metaSep">.</span>
              <a className="aboutMono__metaLink" href="#contacto">
                CONTACTO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreMiSection;
