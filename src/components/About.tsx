import { Award, Code, Rocket, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const About = () => {
  const highlights = [
    {
      icon: Award,
      title: "Experiência Comprovada",
      description: "8+ anos no setor de TI",
      detail: "Histórico consistente de entregas em projetos críticos.",
    },
    {
      icon: Code,
      title: "Código de Qualidade",
      description: "Clean Code e boas práticas",
      detail: "Padrões rigorosos para manutenção e evolução.",
    },
    {
      icon: Rocket,
      title: "Soluções Escaláveis",
      description: "Do MVP à produção",
      detail: "Arquitetura preparada para crescer com seu negócio.",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Aplicações robustas e seguras",
      detail: "Proteção de dados desde a primeira linha de código.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-h2 mb-4">
              Quem <span className="text-gradient">Somos</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="flex flex-col">
              <Reveal className="space-y-6">
                <p className="text-body-lg text-muted-foreground leading-relaxed prose">
                  Com mais de <span className="text-primary font-semibold">8 anos de atuação e inteligência técnica</span> no setor de TI,
                  a Binary Ten desenvolve soluções tecnológicas altamente escaláveis, seguras e orientadas ao crescimento do seu negócio.
                </p>

                <p className="text-body-lg text-muted-foreground leading-relaxed prose">
                  Nossa atuação combina engenharia de software rigorosa, automação de processos inteligentes e arquitetura moderna para transformar desafios operacionais complexos em sistemas simples e eficientes.
                </p>

                <div className="glass-card p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-body-lg font-semibold text-foreground">
                    Especialistas em automação de processos e desenvolvimento web sob medida
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <Reveal key={index} className="h-full">
                  <div className="group glass-card p-5 rounded-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 glow-primary group-hover:glow-accent transition-all">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-h3 mb-2">{item.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{item.description}</p>
                    <p className="text-body-sm text-primary mt-3">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
