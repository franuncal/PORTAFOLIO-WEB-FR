import "./SobreMiSection.css";

const SobreMiSection = () => {
  return (
    <section id="sobre-mi" className="aboutMono">
      <div className="aboutMono__container">
        <div className="aboutMono__grid">
          <h2 className="aboutMono__headline">
            Realizador
            <br />
            Audiovisual.
          </h2>

          <div className="aboutMono__side">
            <p className="aboutMono__copy">
              Dirección y edición audiovisual. <br />
              Música, deporte y eventos.
            </p>

            <p className="aboutMono__copy aboutMono__copy--muted">
              Preproducción, rodaje y postproducción.
            </p>

            <div className="aboutMono__meta">
              <span className="aboutMono__metaItem">Editor</span>
              <span className="aboutMono__metaSep">·</span>
              <span className="aboutMono__metaItem">Dirección</span>
              <span className="aboutMono__metaSep">·</span>
              <a className="aboutMono__metaLink" href="#contacto">
                Contacto
              </a>
            </div>
          </div>
        </div>

        <p className="aboutMono__hint" aria-hidden="true">
          Desplazate para explorar
        </p>
      </div>
    </section>
  );
};

export default SobreMiSection;
