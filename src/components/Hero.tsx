import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const heroBg = "/hero-bg.jpg";

const Hero = () => {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const onChange = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const yearsExperience = useCountUp({ target: 8, suffix: "+" });
  const technologies = useCountUp({ target: 20, suffix: "+" });
  const dedication = useCountUp({ target: 100, suffix: "%" });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      {/* Animated Grid */}
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

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-12 md:pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-display mb-8">
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Automação que
            </motion.span>
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              escala o seu
            </motion.span>
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-gradient">negócio.</span>
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto prose"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Desenvolvemos sistemas web inteligentes e processos automatizados que liberam seu time para focar no que importa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("about")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary group px-8 py-6 text-button"
            >
              Conheça a Bi.Ten
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-button"
            >
              Entre em contato
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center">
              <div className="text-stat text-primary mb-2 font-variant-numeric tabular-nums">{yearsExperience}</div>
              <div className="text-body-sm text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-stat text-primary mb-2 font-variant-numeric tabular-nums">{technologies}</div>
              <div className="text-body-sm text-muted-foreground">Tecnologias</div>
            </div>
            <div className="text-center">
              <div className="text-stat text-primary mb-2 font-variant-numeric tabular-nums">{dedication}</div>
              <div className="text-body-sm text-muted-foreground">Dedicação</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
