import { ClipboardList, PenTool, CheckCircle2, Rocket } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Briefing",
    description: "Entendemos seu negócio, público e o objetivo da sua página.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Criamos um layout alinhado à identidade do seu negócio.",
  },
  {
    icon: CheckCircle2,
    title: "Aprovação",
    description: "Você revisa e ajustamos juntos os detalhes finais.",
  },
  {
    icon: Rocket,
    title: "Publicação",
    description: "Colocamos no ar, prontinho para gerar contatos.",
  },
];

const LpProcess = () => {
  return (
    <section id="lp-process" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-h2 mb-4">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Um processo simples, direto e sem burocracia, do briefing até a sua página no ar.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 0.1} className="h-full">
              <div className="relative text-center h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-primary/20">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-overline text-primary mb-2">Passo {index + 1}</div>
                <h3 className="text-h3 mb-2 text-foreground">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LpProcess;
