import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { Lightbulb, Layers, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Methodology = () => {
  const reduceMotion = useReducedMotion();

  const steps = [
    {
      step: "01",
      title: "Entendimento do Negócio",
      description:
        "Mergulhamos nos seus processos e objetivos para mapear gargalos e desenhar a melhor estratégia tecnológica.",
      detail: "Diagnóstico completo do seu cenário atual.",
      icon: Lightbulb,
    },
    {
      step: "02",
      title: "Arquitetura Sob Medida",
      description:
        "Projetamos soluções personalizadas com foco em escalabilidade, segurança e integração perfeita com seus sistemas.",
      detail: "Desenho técnico alinhado ao seu negócio.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Entregas Ágeis & Código Limpo",
      description:
        "Desenvolvemos com ciclos curtos de validação, garantia de qualidade contínua e código totalmente seu.",
      detail: "Iterações rápidas com qualidade garantida.",
      icon: Zap,
    },
    {
      step: "04",
      title: "Suporte & Evolução Contínua",
      description:
        "Garantimos o funcionamento impecável no pós-lançamento, com suporte dedicado e melhorias constantes.",
      detail: "Parceria de longo prazo com evolução constante.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="technologies" className="py-24 bg-card/30 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <p className="text-overline text-primary mb-2">Processo de Trabalho</p>
          <h2 className="text-h2 mb-4">
            Nossa <span className="text-gradient">Metodologia</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Como transformamos desafios de negócios em software de alto impacto em 4 passos simples
          </p>
          <p className="md:hidden text-caption text-muted-foreground flex items-center gap-1 mt-2">
            <ArrowRight className="h-3 w-3" /> Deslize para ver o processo completo
          </p>
        </Reveal>

        {/* Methodology Steps Carousel */}
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
            {steps.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <div className="h-full">
                  <div className="group glass-card p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between h-full">
                    {/* Step Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:glow-primary transition-all">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-h2 text-primary/80 group-hover:text-primary transition-colors">
                        {item.step}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-h3 mb-3 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-body-sm text-primary mt-3">
                        {item.detail}
                      </p>
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

export default Methodology;
