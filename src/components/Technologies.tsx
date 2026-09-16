import { Lightbulb, Layers, Zap, ShieldCheck } from "lucide-react";

const Methodology = () => {
  const steps = [
    {
      step: "01",
      title: "Entendimento do Negócio",
      description:
        "Mergulhamos nos seus processos e objetivos para mapear gargalos e desenhar a melhor estratégia tecnológica.",
      icon: Lightbulb,
    },
    {
      step: "02",
      title: "Arquitetura Sob Medida",
      description:
        "Projetamos soluções personalizadas com foco em escalabilidade, segurança e integração perfeita com seus sistemas.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Entregas Ágeis & Código Limpo",
      description:
        "Desenvolvemos com ciclos curtos de validação, garantia de qualidade contínua e código totalmente seu.",
      icon: Zap,
    },
    {
      step: "04",
      title: "Suporte & Evolução Contínua",
      description:
        "Garantimos o funcionamento impecável no pós-lançamento, com suporte dedicado e melhorias constantes.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="technologies" className="py-24 bg-card/30 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Processo de Trabalho
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Nossa <span className="text-gradient">Metodologia</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Como transformamos desafios de negócios em software de alto impacto em 4 passos simples
          </p>
        </div>

        {/* Methodology Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 group animate-slide-up relative flex flex-col justify-between"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:glow-primary transition-all">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl font-extrabold font-heading text-primary/80 group-hover:text-primary transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
