import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LpHero = () => {
  const reduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Quero criar uma landing page para o meu negócio. Pode me passar mais detalhes?"
    );
    window.open(`https://wa.me/5531996749066?text=${message}`, "_blank");
  };

  return (
    <section
      id="lp-hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-28 md:py-32"
    >
      {/* Background grid + glow, consistent with the main Hero */}
      <div className="absolute inset-0 bg-gradient-dark" style={{ backgroundImage: "var(--gradient-dark)" }} />
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-overline text-primary mb-4"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            Site para o seu Negócio
          </motion.p>

          <motion.h1
            className="text-h1 mb-6"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Sua presença online, pronta para <span className="text-gradient">converter clientes.</span>
          </motion.h1>

          <motion.p
            className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto prose-lg"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Criamos landing pages modernas, rápidas e sob medida para clínicas,
            escritórios, consultórios, indústrias, fotógrafos e profissionais autônomos — a
            partir de <strong className="text-foreground">R$ 399</strong>, com 12 meses de
            hospedagem gratuita e sem mensalidade escondida.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary group px-8 py-6 text-button"
            >
              Quero meu site
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("lp-pricing")}
              className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-button"
            >
              Ver planos e preços
            </Button>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 text-body-sm text-muted-foreground glass-card px-4 py-2 rounded-full"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <BadgeCheck className="w-4 h-4 text-primary" />
            Hospedagem gratuita por 12 meses • Sem mensalidade escondida
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LpHero;
