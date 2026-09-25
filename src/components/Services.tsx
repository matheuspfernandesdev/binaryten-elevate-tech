import { Globe, Zap, Puzzle, Headphones, Gauge } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Desenvolvimento de Sistemas Web",
      description: "Aplicações web modernas, responsivas e de alta performance, desenvolvidas com as melhores tecnologias do mercado.",
      features: ["SPAs", "PWAs", "APIs RESTful", "Microservices"],
    },
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Automatize tarefas repetitivas, integre sistemas e otimize workflows com soluções inteligentes de automação.",
      features: ["RPA", "Web Scraping", "Integração de Sistemas", "CI/CD"],
    },
    {
      icon: Puzzle,
      title: "Integração de APIs",
      description: "Conecte diferentes plataformas e serviços através de integrações robustas e escaláveis.",
      features: ["REST APIs", "GraphQL", "Webhooks", "Message Queues"],
    },
    {
      icon: Headphones,
      title: "Consultoria em Arquitetura",
      description: "Orientação especializada em arquitetura de software, DevOps e boas práticas de desenvolvimento.",
      features: ["Clean Architecture", "DDD", "Cloud Native", "DevOps"],
    },
    {
      icon: Gauge,
      title: "Monitoramento e Manutenção",
      description: "Garantia de disponibilidade, performance e segurança das suas aplicações em produção.",
      features: ["Monitoring", "Logging", "Performance", "Security"],
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-h2 mb-4">
            O que <span className="text-gradient">Fazemos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Soluções completas para transformar seu negócio através da tecnologia
          </p>
        </Reveal>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 0.08} className="h-full">
              <div className="group glass-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 h-full relative overflow-hidden">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:glow-primary transition-all">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-h3 mb-4 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-body-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
