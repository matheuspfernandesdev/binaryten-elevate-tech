import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { Building2, Cpu, Network, LayoutDashboard, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Projects = () => {
  const reduceMotion = useReducedMotion();

  const projects = [
    {
      title: "Sistema de Gestão Empresarial",
      description: "Plataforma completa de ERP corporativo integrada com módulos de vendas, estoque, financeiro e inteligência de negócios.",
      results: [
        "Integração total de processos",
        "Redução de custos operacionais",
        "Relatórios em tempo real",
      ],
      gradient: "from-blue-500 to-cyan-500",
      icon: Building2,
    },
    {
      title: "Automação de Processos RPA",
      description: "Solução de automação robótica para tarefas repetitivas de backoffice com alta precisão e conformidade.",
      results: [
        "Redução de 80% no tempo de execução",
        "Zero erros manuais",
        "Operação 24/7 ininterrupta",
      ],
      gradient: "from-purple-500 to-pink-500",
      icon: Cpu,
    },
    {
      title: "API Gateway e Microserviços",
      description: "Arquitetura distribuída de altíssima velocidade para alta demanda de requisições e integração entre sistemas.",
      results: [
        "99.99% de disponibilidade (SLA)",
        "Escalabilidade automática",
        "Segurança de dados reforçada",
      ],
      gradient: "from-green-500 to-emerald-500",
      icon: Network,
    },
    {
      title: "Dashboard de Analytics em Tempo Real",
      description: "Painel executivo com cruzamento de dados estratégicos, gráficos interativos e exportação automatizada de relatórios.",
      results: [
        "Tomada de decisão 5x mais rápida",
        "Visão 360° do negócio",
        "Acesso seguro multi-dispositivo",
      ],
      gradient: "from-orange-500 to-red-500",
      icon: LayoutDashboard,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-card/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(30deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary))),
                             linear-gradient(150deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary)))`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <p className="text-overline text-primary mb-2">Casos Práticos</p>
          <h2 className="text-h2 mb-4">
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Soluções entregues que geram resultados concretos e otimizam operações reais
          </p>
          <p className="md:hidden text-caption text-muted-foreground flex items-center gap-1 mt-2">
            <ArrowRight className="h-3 w-3" /> Deslize para ver os casos
          </p>
        </Reveal>

        {/* Projects Carousel */}
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
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2"
              >
                <div className="h-full">
                  <div className="group relative overflow-hidden rounded-2xl flex flex-col justify-between h-full">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-15 group-hover:opacity-25 transition-opacity duration-300`}
                    />

                    {/* Glass Card */}
                    <div className="relative glass-card p-8 h-full flex flex-col justify-between">
                      <div>
                        {/* Icon */}
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 glow-primary">
                          <project.icon className="w-6 h-6 text-primary" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-h3 mb-3 text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Key Results / Impacts */}
                      <div>
                        <p className="text-caption font-semibold tracking-wider text-primary mb-3">
                          Impactos gerados:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.results.map((result, rIndex) => (
                            <span
                              key={rIndex}
                              className="px-3 py-1.5 bg-primary/10 text-primary text-caption font-medium rounded-lg border border-primary/20 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {result}
                            </span>
                          ))}
                        </div>
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

export default Projects;
