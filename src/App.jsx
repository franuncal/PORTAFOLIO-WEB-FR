import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Banner } from "./components/Banner/Banner";
import Home from "./components/Home/Home";
import { SobreMi } from "./components/Sobre-mi/SobreMi";
import { Contacto } from "./components/Contacto/Contacto";
import Page from "./components/Page/Page";
import { Footer } from "./components/Footer/Footer";
import ScrollToTop from "./components/scrollToTop";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Home />
            </>
          }
        />
        <Route path="/SobreMi" element={<SobreMi />} />
        <Route path="/Contact" element={<Contacto />} />
        <Route path="/Page" element={<Page />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
