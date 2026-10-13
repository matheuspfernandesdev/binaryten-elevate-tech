import { Stethoscope, Scale, HeartPulse, Factory, Camera, Store } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const audiences = [
  {
    icon: Stethoscope,
    title: "Clínicas e Consultórios",
    description: "Agende consultas e transmita confiança desde o primeiro clique.",
  },
  {
    icon: Scale,
    title: "Escritórios de Advocacia e Contabilidade",
    description: "Credibilidade profissional com um site que fala a língua do seu cliente.",
  },
  {
    icon: HeartPulse,
    title: "Médicos e Profissionais da Saúde",
    description: "Apresente especialidades, convênios e formas de contato de forma clara.",
  },
  {
    icon: Factory,
    title: "Indústrias e Fábricas",
    description: "Mostre estrutura, catálogo e diferenciais para fechar negócios B2B.",
  },
  {
    icon: Camera,
    title: "Fotógrafos e Criativos",
    description: "Um portfólio elegante que valoriza seu trabalho visual.",
  },
  {
    icon: Store,
    title: "Autônomos e Pequenos Negócios",
    description: "Presença profissional sem o custo de uma agência tradicional.",
  },
];

const LpAudience = () => {
  return (
    <section id="lp-audience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-h2 mb-4">
            Feito para o <span className="text-gradient">seu segmento</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Não importa a sua área — se o seu negócio precisa ser encontrado e gerar contato,
            nós construímos a página certa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {audiences.map((item, index) => (
            <Reveal key={index} delay={index * 0.08} className="h-full">
              <div className="group glass-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:glow-primary transition-all">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-h3 mb-3 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LpAudience;
