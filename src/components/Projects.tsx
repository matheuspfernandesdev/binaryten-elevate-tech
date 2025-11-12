import { ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Sistema de Gestão Empresarial",
      description: "Plataforma completa de ERP com módulos de vendas, estoque, financeiro e relatórios avançados.",
      tags: [".NET", "Angular", "PostgreSQL", "Azure"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Automação de Processos RPA",
      description: "Solução de automação robótica para processos de backoffice, reduzindo tempo em 80%.",
      tags: ["C#", "Selenium", "Docker", "CI/CD"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "API Gateway Microservices",
      description: "Arquitetura de microserviços com gateway centralizado e autenticação OAuth.",
      tags: ["Java", "Spring Boot", "RabbitMQ", "AWS"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Dashboard Analytics",
      description: "Painel de business intelligence com visualizações em tempo real e relatórios customizados.",
      tags: ["React", "TypeScript", "MongoDB", "Charts"],
      gradient: "from-orange-500 to-red-500",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Casos de sucesso que demonstram nossa expertise técnica
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              {/* Glass Card */}
              <div className="relative glass-card p-8 h-full">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 glow-primary">
                  <Code className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
          >
            Ver mais projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
