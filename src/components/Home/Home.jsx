import React from "react";
import Hero from "../Hero/Hero";
import SobreMiSection from "../SobreMiSection/SobreMiSection";
import ProyectosSection from "../ProyectosSection/ProyectosSection";
import BackToHero from "../BackToHero/BackToHero";
import ContactoSection from "../ContactoSection/ContactoSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <SobreMiSection />
      <ProyectosSection />
      <BackToHero />
      <ContactoSection />
    </div>
  );
};

export default React.memo(Home);
