import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import rumoLogo from "@/assets/logo-rumo.jpg";
import uaisougueLogo from "@/assets/logo-uaisougue.jpg";
import etusLogo from "@/assets/logo-etus.jpg";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Clients = () => {
  const reduceMotion = useReducedMotion();

  const clients = [
    {
      name: "Rumo",
      tagline: "Tecnologia & Infraestrutura",
      description: "Testes automatizados para produtos internos + webscrapings e automações.",
      logo: rumoLogo,
      bgStyle: "bg-black/80",
    },
    {
      name: "Uaisougue",
      tagline: "Varejo & Gestão Alimentícia",
      description: "Integração de APIs e criação de dashboards analíticos.",
      logo: uaisougueLogo,
      bgStyle: "bg-[#d6001c]/10",
    },
    {
      name: "Etus",
      tagline: "Marketing & Mídia Digital",
      description: "Automação Descadastro integrando todo o Google Workspace do suporte.",
      logo: etusLogo,
      bgStyle: "bg-black/80",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card/20 relative overflow-hidden border-y border-border/40">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-overline text-primary mb-3">Prova Social</p>
          <h2 className="text-h2 text-foreground mb-4">
            Empresas que <span className="text-gradient">confiam no nosso trabalho</span>
          </h2>
           <p className="text-body text-muted-foreground max-w-2xl mx-auto prose">
            Projetos sob medida desenvolvidos para otimizar processos e impulsionar resultados reais.
          </p>
          <p className="md:hidden text-caption text-muted-foreground flex items-center gap-1 mt-2">
            <ArrowRight className="h-3 w-3" /> Deslize para ver mais
          </p>
        </Reveal>

         {/* Logo Cards */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          autoPlay={!reduceMotion}
          autoPlayDelay={4000}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-6">
            {clients.map((client, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <div className="group glass-card p-5 md:p-10 rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,242,254,0.25)] flex flex-col justify-between h-full">
                    <div>
                      {/* Logo Container */}
                      <div
                        className={`relative flex items-center justify-center h-24 md:h-32 mb-6 md:mb-8 rounded-2xl p-4 border border-border/40 overflow-hidden transition-all duration-300 group-hover:border-primary/40 ${client.bgStyle}`}
                      >
                        <img
                          src={client.logo}
                          alt={client.name}
                          width={160}
                          height={160}
                          loading="lazy"
                          decoding="async"
                          className="max-h-20 max-w-[85%] object-contain rounded-lg filter grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_12px_rgba(0,242,254,0.3)]"
                        />
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="text-h3 text-foreground mb-1 group-hover:text-primary transition-colors">
                          {client.name}
                        </h3>
                        <p className="text-caption font-semibold uppercase tracking-wider text-primary mb-3 md:mb-4">
                          {client.tagline}
                        </p>
                        <p className="text-body-sm text-muted-foreground leading-relaxed">
                          {client.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
</CarouselContent>
          <CarouselPagination />
        </Carousel>
      </div>
    </section>
  );
};

export default Clients;
