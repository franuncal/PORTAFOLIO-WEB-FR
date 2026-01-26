import React from "react";
import Hero from "../Hero/Hero";
import SobreMiSection from "../SobreMiSection/SobreMiSection";
import ProyectosSection from "../ProyectosSection/ProyectosSection";
import ContactoSection from "../ContactoSection/ContactoSection";
import "./Home.css";

const Home = () => {
  // Video único para el Hero con loop
  const heroVideoUrl = "https://www.youtube.com/embed/p2QlsA3SOrs";

  return (
    <div className="home-container">
      <Hero videoUrl={heroVideoUrl} />
      <SobreMiSection />
      <ProyectosSection />
      <ContactoSection />
    </div>
  );
};

export default React.memo(Home);
