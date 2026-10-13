import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BrandIntro from "@/components/intro/BrandIntro";
import { useIntroGate } from "@/hooks/use-intro-gate";

const Index = () => {
  const { visible: introVisible, dismiss: dismissIntro } = useIntroGate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      {introVisible && <BrandIntro onDismiss={dismissIntro} />}
      <Header />
      <main>
        <Hero />
        <Clients />
        <About />
        <Technologies />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
