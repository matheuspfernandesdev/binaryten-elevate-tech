import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
