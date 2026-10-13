import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    question: "Quanto custa uma landing page?",
    answer:
      "Nossos projetos começam a partir de R$ 399, variando conforme a complexidade, número de seções e funcionalidades desejadas. Fazemos um orçamento personalizado após entender sua necessidade.",
  },
  {
    question: "A hospedagem está incluída no valor?",
    answer:
      "Sim! A hospedagem da sua landing page é gratuita durante os primeiros 12 meses, sem custo adicional e sem mensalidade. Após esse período, a hospedagem pode ser renovada por um valor acessível ou migrada para o provedor de sua preferência.",
  },
  {
    question: "A hospedagem gratuita tem algum limite?",
    answer:
      "A hospedagem gratuita de 12 meses está incluída enquanto o site operar dentro de um uso normal, compatível com um site institucional ou comercial padrão. Em casos de tráfego muito acima do esperado — como grandes campanhas de mídia paga ou picos virais — ou necessidade de recursos adicionais de infraestrutura, pode ser necessário migrar para um plano de hospedagem pago antes do fim do período gratuito, o que será sempre informado previamente ao cliente antes de qualquer cobrança.",
  },
  {
    question: "Quem tem acesso à hospedagem do site?",
    answer:
      "A hospedagem é administrada pela Binary Ten como parte do serviço incluso. O cliente é proprietário do conteúdo e do domínio (quando próprio), mas o deploy e a infraestrutura ficam sob gestão da Binary Ten durante a vigência do serviço.",
  },
  {
    question: "E o domínio (endereço do site), como funciona?",
    answer:
      "O registro e a renovação do domínio (ex: www.seunegocio.com.br) são de responsabilidade do cliente — o custo do domínio não está incluído no valor do projeto e não é de responsabilidade da Binary Ten. Podemos te orientar na escolha e no registro, mas a compra e a titularidade são sempre suas.",
  },
  {
    question: "Depois que o site estiver pronto, posso pedir alterações ou melhorias?",
    answer:
      "O valor contratado cobre a criação e entrega da landing page conforme o escopo combinado. Alterações, atualizações de conteúdo ou melhorias após a entrega são tratadas através de um contrato adicional de alterações, com valores à parte.",
  },
  {
    question: "Preciso pagar mensalidade?",
    answer:
      "Não. Você paga apenas pela criação do site. A hospedagem é gratuita nos primeiros 12 meses e não gera custo mensal nesse período. Os únicos custos externos são o domínio (se optar por um), a renovação da hospedagem após os 12 meses iniciais e eventuais contratos futuros de alteração, caso deseje atualizar o conteúdo depois da entrega.",
  },
  {
    question: "Quanto tempo leva para a landing page ficar pronta?",
    answer:
      "Em geral, entre 2 e 4 dias úteis após o briefing e aprovação do conteúdo, dependendo da complexidade do projeto.",
  },
  {
    question: "Posso usar um domínio que eu já tenho?",
    answer:
      "Sim, sem problema. Basta nos passar o acesso ou as informações necessárias para configurarmos o seu site nesse domínio.",
  },
];

const LpFaq = () => {
  return (
    <section id="lp-faq" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-12">
          <h2 className="text-h2 mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto prose">
            Transparência em cada detalhe do processo, do orçamento à entrega.
          </p>
        </Reveal>

        <Reveal className="max-w-3xl mx-auto glass-card p-6 md:p-10 rounded-3xl border border-border/50">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/40">
                <AccordionTrigger className="text-left text-h4 text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default LpFaq;
