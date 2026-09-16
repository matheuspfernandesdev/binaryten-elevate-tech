import { Building2, Cpu, Network, LayoutDashboard } from "lucide-react";

const Projects = () => {
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
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary))),
                           linear-gradient(150deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary)))`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Casos Práticos
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções entregues que geram resultados concretos e otimizam operações reais
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl animate-scale-in flex flex-col justify-between"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-15 group-hover:opacity-25 transition-opacity duration-300`} />
              
              {/* Glass Card */}
              <div className="relative glass-card p-8 h-full flex flex-col justify-between">
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 glow-primary">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground font-heading group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Key Results / Impacts */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Impactos Gerados:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.results.map((result, rIndex) => (
                      <span
                        key={rIndex}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg border border-primary/20 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
