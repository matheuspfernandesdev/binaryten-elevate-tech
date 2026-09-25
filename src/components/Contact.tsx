import { Mail, MessageSquare, ShieldCheck, Clock, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const Contact = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá Binary Ten! Gostaria de falar com um especialista e saber mais sobre os serviços.`
    );
    window.open(`https://wa.me/5531996749066?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:contato@binaryten.com.br";
  };

  const qualityBadges = [
    {
      icon: ShieldCheck,
      title: "Garantia de Entrega & Suporte",
      description: "Acompanhamento pós-lançamento com SLA de atendimento e evolução contínua.",
    },
    {
      icon: Code2,
      title: "Código 100% Próprio e Escalável",
      description: "Sem plataformas engessadas. Você é o único dono do código-fonte do seu projeto.",
    },
    {
      icon: Clock,
      title: "Atendimento Direto com Especialista",
      description: "Comunicação transparente e sem intermediários na execução do seu software.",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <p className="text-overline text-primary mb-2">Atendimento Rápido</p>
          <h2 className="text-h2 mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Vamos transformar seus desafios operacionais em software de alta performance. Fale conosco hoje mesmo!
          </p>
        </Reveal>

        {/* Contact Buttons Block */}
        <Reveal className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-primary/20 shadow-2xl mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-h3 mb-3 text-foreground">
              Fale Conosco
            </h3>
            <p className="text-body-sm text-muted-foreground leading-relaxed">
              Escolha o canal de sua preferência. Estamos prontos para entender suas necessidades e apresentar a melhor solução.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            <Button
              onClick={handleWhatsApp}
              className="w-full justify-center bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/30 py-6 text-button"
              size="lg"
            >
              <MessageSquare className="mr-3 w-5 h-5 fill-current" />
              WhatsApp
            </Button>

            <Button
              onClick={handleEmail}
              variant="outline"
              className="w-full justify-center border-primary/50 hover:bg-primary/10 py-6 text-button text-foreground"
              size="lg"
            >
              <Mail className="mr-3 w-5 h-5 text-primary" />
              E-mail
            </Button>
          </div>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/40 max-w-xl mx-auto">
            <div className="text-center p-3 rounded-xl bg-background/40 border border-border/30">
              <p className="text-caption text-muted-foreground mb-1">Horário de Atendimento</p>
              <p className="font-semibold text-body-sm text-foreground">Segunda a Sexta, 9h às 18h</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/40 border border-border/30">
              <p className="text-caption text-muted-foreground mb-1">Tempo de Resposta</p>
              <p className="font-semibold text-body-sm text-primary">Atendimento imediato via WhatsApp</p>
            </div>
          </div>
        </Reveal>

        {/* Quality Badges */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/40">
          {qualityBadges.map((badge, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="h-full">
              <div className="group glass-card p-6 rounded-2xl border border-primary/15 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20 group-hover:glow-primary transition-all">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-h4 text-foreground mb-1">{badge.title}</h4>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">{badge.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
