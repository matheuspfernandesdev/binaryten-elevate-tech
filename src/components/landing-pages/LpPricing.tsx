import { Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const includedItems = [
  "Design responsivo e moderno",
  "Hospedagem gratuita por 12 meses",
  "Otimização básica para buscas (SEO)",
  "Entrega rápida",
];

const LpPricing = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Vi a página de landing pages e quero saber mais sobre os planos e preços."
    );
    window.open(`https://wa.me/5531996749066?text=${message}`, "_blank");
  };

  return (
    <section id="lp-pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-12">
          <p className="text-overline text-primary mb-2">Investimento</p>
          <h2 className="text-h2 mb-4">
            Transparência também é <span className="text-gradient">diferencial</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </Reveal>

        <Reveal className="max-w-2xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-primary/30 shadow-2xl glow-primary">
          <div className="text-center mb-8">
            <p className="text-body text-muted-foreground mb-2">A partir de</p>
            <p className="text-stat text-gradient mb-2">R$ 399</p>
            <p className="text-body-sm text-muted-foreground">
              Sua landing page pronta, no ar, com 12 meses de hospedagem gratuita.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-body text-foreground/90">{item}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleWhatsApp}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary py-6 text-button"
          >
            <MessageSquare className="mr-2 w-5 h-5" />
            Quero um orçamento
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default LpPricing;
