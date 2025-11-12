import { Code2, Database, Cloud, Cog, TestTube, FileCode } from "lucide-react";

const Technologies = () => {
  const techCategories = [
    {
      category: "Backend",
      icon: Code2,
      techs: [".NET", "C#", "Java", "Entity Framework Core"],
    },
    {
      category: "Frontend",
      icon: FileCode,
      techs: ["Angular", "TypeScript", "React"],
    },
    {
      category: "Database",
      icon: Database,
      techs: ["PostgreSQL", "SQL Server", "MongoDB"],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      techs: ["Azure", "AWS", "Docker", "CI/CD"],
    },
    {
      category: "Testing",
      icon: TestTube,
      techs: ["Selenium", "Puppeteer", "Playwright", "SonarQube"],
    },
    {
      category: "Architecture",
      icon: Cog,
      techs: ["DDD", "CQRS", "Clean Code", "AutoMapper", "FluentValidation"],
    },
  ];

  return (
    <section id="technologies" className="py-24 bg-card/30 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossas <span className="text-gradient">Tecnologias</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stack moderna e robusta para desenvolver soluções de alta performance
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                <category.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Category Title */}
              <h3 className="text-xl font-bold mb-4 text-foreground">{category.category}</h3>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tech List */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            E muito mais: Git, REST APIs, Microservices, OAuth, JWT, RabbitMQ, Redis
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
