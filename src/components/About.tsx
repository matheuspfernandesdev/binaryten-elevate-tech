import { Award, Code, Rocket, Shield } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Award,
      title: "Experiência Comprovada",
      description: "8+ anos no setor de TI",
    },
    {
      icon: Code,
      title: "Código de Qualidade",
      description: "Clean Code e boas práticas",
    },
    {
      icon: Rocket,
      title: "Soluções Escaláveis",
      description: "Do MVP à produção",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Aplicações robustas e seguras",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Quem <span className="text-gradient">Somos</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 animate-slide-up">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com mais de <span className="text-primary font-semibold">8 anos de atuação e inteligência técnica</span> no setor de TI,
                a Binary Ten desenvolve soluções tecnológicas altamente escaláveis, seguras e orientadas ao crescimento do seu negócio.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa atuação combina engenharia de software rigorosa, automação de processos inteligentes e arquitetura moderna para transformar desafios operacionais complexos em sistemas simples e eficientes.
              </p>

              <div className="glass-card p-6 rounded-xl border-l-4 border-primary">
                <p className="text-xl font-semibold text-foreground font-heading">
                  Especialistas em automação de processos e desenvolvimento web sob medida
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 glow-primary">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
