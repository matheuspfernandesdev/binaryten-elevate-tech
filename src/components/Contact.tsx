import { useState } from "react";
import { Mail, MessageSquare, Send, ShieldCheck, Clock, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

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
      description: "Acompanhamento pós-lançamento com SLA de atendimento e evolução.",
    },
    {
      icon: Code2,
      title: "Código 100% Próprio e Escalável",
      description: "Sem plataformas engessadas. Você é o único dono do seu código.",
    },
    {
      icon: Clock,
      title: "Atendimento Direto com Especialista",
      description: "Comunicação transparente e sem intermediários na execução do projeto.",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Atendimento Rápido
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamos transformar seus desafios operacionais em software de alta performance. Fale conosco hoje mesmo!
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-heading">Fale Conosco Direct</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Escolha o canal de sua preferência. Estamos prontos para entender suas necessidades e montar uma proposta sob medida.
              </p>

              {/* Quick Contact Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full justify-start bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/30"
                  size="lg"
                >
                  <MessageSquare className="mr-3 w-5 h-5 fill-current" />
                  Falar no WhatsApp: (31) 99674-9066
                </Button>

                <Button
                  onClick={handleEmail}
                  variant="outline"
                  className="w-full justify-start border-primary/50 hover:bg-primary/10"
                  size="lg"
                >
                  <Mail className="mr-3 w-5 h-5" />
                  contato@binaryten.com.br
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-4">
              <div className="glass-card p-4 rounded-xl border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Horário de Atendimento</p>
                <p className="font-semibold text-sm">Segunda a Sexta, 9h às 18h</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Tempo Médio de Resposta</p>
                <p className="font-semibold text-sm text-primary">Atendimento imediato via WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl animate-slide-up border border-primary/20">
            <h3 className="text-xl font-bold mb-6 font-heading">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome ou da sua empresa"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail Profissional
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Como podemos ajudar?
                </label>
                <Textarea
                  id="message"
                  placeholder="Descreva brevemente seu projeto ou necessidade..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                size="lg"
              >
                Enviar Mensagem
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 pt-8 border-t border-border/40">
          {qualityBadges.map((badge, idx) => (
            <div key={idx} className="glass-card p-5 rounded-xl border border-primary/10 flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground mb-1">{badge.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
