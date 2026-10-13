import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const LpCta = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Quero criar uma landing page para o meu negócio. Pode me passar mais detalhes?"
    );
    window.open(`https://wa.me/5531996749066?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:contato@binaryten.com.br?subject=Quero%20uma%20landing%20page";
  };

  return (
    <section id="lp-contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-primary/20 shadow-2xl text-center">
          <h2 className="text-h2 mb-4">
            Vamos colocar seu negócio <span className="text-gradient">no ar?</span>
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-xl mx-auto prose">
            Fale agora com a gente e receba um orçamento sem compromisso para a landing page do
            seu negócio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Button
              onClick={handleWhatsApp}
              className="w-full justify-center bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/30 py-6 text-button"
              size="lg"
            >
              <MessageSquare className="mr-3 w-5 h-5 fill-current" />
              Falar no WhatsApp
            </Button>

            <Button
              onClick={handleEmail}
              variant="outline"
              className="w-full justify-center border-primary/50 hover:bg-primary/10 py-6 text-button text-foreground"
              size="lg"
            >
              <Mail className="mr-3 w-5 h-5 text-primary" />
              Enviar E-mail
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LpCta;
