import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LpHero from "@/components/landing-pages/LpHero";
import LpAudience from "@/components/landing-pages/LpAudience";
import LpPricing from "@/components/landing-pages/LpPricing";
import LpProcess from "@/components/landing-pages/LpProcess";
import LpFaq from "@/components/landing-pages/LpFaq";
import LpCta from "@/components/landing-pages/LpCta";

const LandingPages = () => {
  useEffect(() => {
    document.title = "Site para o seu Negócio a partir de R$ 399 | Binary Ten";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <LpHero />
        <LpAudience />
        <LpPricing />
        <LpProcess />
        <LpFaq />
        <LpCta />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPages;
