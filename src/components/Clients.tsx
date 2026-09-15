import rumoLogo from "@/assets/client-rumo.svg";
import uaisougueLogo from "@/assets/client-uaisougue.svg";
import etusLogo from "@/assets/client-etus.svg";

const Clients = () => {
  const clients = [
    {
      name: "Rumo Soluções IT",
      location: "Lagoa Santa - MG",
      description: "Soluções e infraestrutura em tecnologia da informação",
      logo: rumoLogo,
    },
    {
      name: "Uaisougue",
      location: "Brasil",
      description: "Inovação e gestão no setor alimentício e varejo",
      logo: uaisougueLogo,
    },
    {
      name: "Etus Media Holding",
      location: "Brasil",
      description: "Holding de mídia, marketing digital e inteligência corporativa",
      logo: etusLogo,
    },
  ];

  return (
    <section className="py-16 bg-card/20 relative overflow-hidden border-y border-border/40">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Prova Social
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Empresas que <span className="text-gradient">confiam no nosso trabalho</span>
          </h2>
        </div>

        {/* Carousel / Logo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:glow-primary flex flex-col justify-between"
            >
              <div className="flex items-center justify-center h-20 mb-4 bg-background/40 rounded-xl p-3 border border-border/30">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,242,254,0.2)]"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground text-center mb-1">
                  {client.name}
                </h3>
                <p className="text-xs font-medium text-primary text-center mb-2">
                  {client.location}
                </p>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
