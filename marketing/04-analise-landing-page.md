# 04 — Análise da landing page (captação e facilitação de contratação)

> Escopo: `/landing-pages` (`src/pages/LandingPages.tsx` + `src/components/landing-pages/*`), com pontos da home (`/`) que afetam quem chega por ela. Pós-contato (fechamento no WhatsApp) fica para depois.
> Base: leitura do código em out/2026. Não verifiquei o site em produção nem métricas reais (não há analytics instalado).

---

## 1. Diagnóstico geral

A página tem uma estrutura correta (Hero → Público → Preço → Processo → FAQ → CTA), visual consistente, CTAs de WhatsApp com mensagens pré-preenchidas e preço explícito — isso já está acima da média de freelancers.

O que falta é o que **faz um dono de pequeno negócio confiar o bastante para chamar**:

1. **Zero exemplos de landing pages.** A página vende site e não mostra nenhum site. É o maior problema.
2. **Zero prova social na página de landing pages** (os logos de clientes estão só na home e são de automação).
3. **Nenhum rosto.** "Atendimento direto com especialista" sem mostrar quem é o especialista.
4. **FAQ com tom defensivo/jurídico** que gera mais dúvida do que resolve.
5. **Nenhuma medição** (sem GA4, Meta Pixel ou eventos de clique). Hoje não dá para saber se a página converte.
6. **SEO da rota `/landing-pages` praticamente inexistente** (SPA sem meta própria, fora do sitemap, sem cidade).

---

## 2. Análise seção a seção

### 2.1 Header (compartilhado)
- Na rota `/landing-pages`, o menu mostra "Sobre, Tecnologias, Serviços, Projetos" da home. Cada clique **tira o visitante da página de venda** e o leva para um conteúdo de automação/ERP que não é o que ele procura.
- **Ação**: header focado nessa rota: `Exemplos • Preços • Como funciona • Dúvidas` + botão "Orçamento no WhatsApp". Logo continua levando para `/`.

### 2.2 Hero (`LpHero.tsx`)
Bom: proposta clara, preço visível, dois CTAs, selo de hospedagem.

Problemas:
- Headline genérica ("Sua presença online, pronta para converter clientes") — serve para qualquer agência.
- Falta **prazo** no hero (o "2 a 4 dias úteis" está escondido no FAQ — é um dos seus maiores diferenciais).
- Falta **imagem**: um mockup de celular/desktop com um site real feito por você. Hero só com texto em fundo escuro perde muito em página de serviço visual.
- Lista de nichos longa no parágrafo; já existe a seção de público.

Sugestão:
```
Overline:  Sites para clínicas, escritórios e negócios locais
H1:        Seu negócio no Google e no WhatsApp em até 4 dias.
Sub:       Site profissional, rápido no celular e feito por engenheiro de software —
           a partir de R$ 399, com 12 meses de hospedagem inclusos.
CTA 1:     Quero meu site → (WhatsApp)
CTA 2:     Ver exemplos
Selos:     ✓ No ar em até 4 dias úteis  ✓ Você só paga o restante após aprovar  ✓ Sem mensalidade no 1º ano
Visual:    mockup (celular + desktop) de um site de exemplo
```

### 2.3 Público (`LpAudience.tsx`)
- Bom para identificação. Cards genéricos, porém.
- **Ação**: cada card vira link para um **exemplo do nicho** (seção nova abaixo). Futuramente, páginas por nicho (`/sites-para-clinicas`, `/sites-para-advogados`) para SEO e anúncios.

### 2.4 ❌ Seção ausente: Exemplos / Portfólio (prioridade máxima)
- Criar **4–6 sites de demonstração**, um por nicho (Clínica Odonto, Escritório de Advocacia, Estética, Contabilidade, Fotógrafo, Pequena Indústria), publicados em subdomínios (`demo-clinica.binaryten.com.br`).
- Rotular honestamente: "Projeto conceito" para demos e "Cliente" para reais. Nunca apresentar demo como cliente.
- Cada card: print em mockup + nicho + "o que tem" (agendamento por WhatsApp, mapa, avaliações) + botão "Ver ao vivo".
- Esses demos são **os mesmos templates parametrizados** usados nas prévias de prospecção (arquivo 03). Um trabalho, três usos: portfólio, prospecção, conteúdo do Instagram.
- Posição: logo depois do Hero (ou depois do Público).

### 2.5 ❌ Seção ausente: Quem faz
- Foto real, nome, 3 linhas: "Sou o Matheus, engenheiro de software há 8+ anos, já desenvolvi automações para empresas como Rumo e Etus. Criei a Binary Ten para levar a mesma qualidade para negócios locais. Você fala direto comigo, do orçamento à entrega."
- Para ticket de R$ 399, a pessoa compra de uma pessoa. Isso também transforma o fato de ser solo (e sem CNPJ ainda) em vantagem — ver arquivo 05.

### 2.6 ❌ Seção ausente: Prova social
- Logos Rumo/Uaisougue/Etus podem aparecer aqui também com o texto "Também atendemos empresas como…" — dá autoridade técnica, mesmo sendo outro serviço.
- Assim que houver o 1º cliente de landing page: depoimento (print do WhatsApp com autorização ou vídeo curto) + link do site.
- Avaliações do Google Business Profile da Binary Ten (quando criar) com widget simples.
- Estratégia para os primeiros depoimentos: 2–3 projetos com desconto em troca de depoimento + autorização para usar no portfólio.

### 2.7 Preço (`LpPricing.tsx`)
Bom: transparência, "a partir de".

Problemas:
- Um único card "a partir de R$ 399" sem dizer **o que exatamente é o R$ 399** → o cliente imagina que o dele vai custar o triplo e não chama, ou chama achando que tudo custa 399.
- Faltam formas de pagamento.
- Falta âncora.

Sugestão de 3 pacotes (valores ilustrativos, ajustar à sua realidade):

| | Essencial | **Profissional** (destacado) | Completo |
|---|---|---|---|
| Preço | R$ 399 | R$ 699 | R$ 1.190 |
| Seções | 1 página, até 5 seções | até 8 seções | até 12 seções + página extra |
| WhatsApp com mensagem pronta | ✓ | ✓ | ✓ |
| Mapa e horário | ✓ | ✓ | ✓ |
| Hospedagem 12 meses | ✓ | ✓ | ✓ |
| Configuração do domínio | — | ✓ | ✓ |
| Google Meu Negócio configurado | — | ✓ | ✓ |
| Formulário/agendamento integrado | — | — | ✓ (seu diferencial de automação) |
| Ajustes após a entrega | 7 dias | 30 dias | 60 dias |
| Prazo | 3 dias úteis | 4 dias úteis | 7 dias úteis |

- Pagamento: "50% para começar, 50% após aprovar. Pix ou cartão em até 3x." (Mercado Pago/InfinitePay/PagBank geram link de cartão para pessoa física.)
- O pacote do meio vende mais (efeito âncora). Cada card com CTA de WhatsApp com mensagem que já diz o pacote ("Quero o pacote Profissional").

### 2.8 Processo (`LpProcess.tsx`)
- Bom e simples. Adicionar **dias** em cada passo ("Dia 1 — Briefing de 20 min no WhatsApp", "Dia 2 — Layout", "Dia 3 — Ajustes", "Dia 4 — No ar") e **o que o cliente precisa enviar** (logo, fotos, textos ou "a gente escreve para você").
- Reduz a percepção de esforço — muita gente não contrata site por achar que vai dar trabalho.

### 2.9 FAQ (`LpFaq.tsx`) — reescrever o tom
Problemas concretos:
- "**não é de responsabilidade da Binary Ten**" (domínio) — frase de contrato, soa como "se der problema, não é comigo".
- "Alterações… são tratadas através de **um contrato adicional**, com valores à parte" — soa como armadilha. Para um leigo, "e se eu quiser trocar uma foto?" é a pergunta nº 1.
- "**A hospedagem é administrada pela Binary Ten… o deploy e a infraestrutura ficam sob gestão da Binary Ten**" — gera medo de ficar refém. E **contradiz** a home ("Você é o único dono do código-fonte do seu projeto", em `Contact.tsx`).
- Resposta longa sobre "limite de hospedagem / picos virais" — preocupação que o cliente não tinha e passa a ter.
- Não diz **quanto custa a hospedagem depois de 12 meses**. Custo futuro desconhecido trava decisão.

Reescrita sugerida (mesma informação, tom de solução):
- **Domínio**: "Te ajudo a registrar o domínio no seu nome (cerca de R$ 40/ano no Registro.br). Ele é seu para sempre. No pacote Profissional, eu faço a configuração toda."
- **Alterações**: "Você tem X dias de ajustes inclusos após a entrega. Depois disso, pequenas alterações saem a partir de R$ Y, ou você pode assinar o plano de manutenção."
- **Hospedagem depois de 12 meses**: "A renovação custa R$ Z/ano. Se preferir, transfiro o site para a sua própria hospedagem sem custo."
- **Dono do site**: "O site é seu. Se um dia quiser sair, eu te entrego os arquivos."
- Remover ou condensar a pergunta sobre limites de tráfego (deixar no contrato).
- Adicionar perguntas que **vendem**:
  - "Preciso ter CNPJ para contratar?" → "Não."
  - "Meu site vai aparecer no Google?" → explicar honestamente o básico + Google Meu Negócio.
  - "E se eu não gostar do layout?" → garantia.
  - "Vocês escrevem os textos?" → sim/opção.
  - "Atende fora de BH?" → sim, 100% online.

### 2.10 CTA final (`LpCta.tsx`)
- Bom. Adicionar reforço de risco zero ("Orçamento grátis em 5 minutos, sem compromisso") e o rosto/foto pequena ao lado do botão ("Fale direto com o Matheus").
- Botão de e-mail usa `mailto:` — muitos celulares não têm app de e-mail configurado e o clique "não faz nada". Trocar por um **formulário curto** (nome, negócio, WhatsApp) → Resend notifica você e manda auto-resposta. Captura quem não quer abrir o WhatsApp agora.

### 2.11 Footer
- `instagram.com/binaryten` — confirmar que o @ é seu antes de divulgar.
- E-mail `contato@binaryten.com.br` **ainda não existe** (arquivo 02) — hoje é um link quebrado.
- Adicionar: cidade ("Belo Horizonte – MG, atendimento em todo o Brasil"), link de Política de Privacidade, nome do responsável. Ver arquivo 05 sobre identificação do fornecedor.

---

## 3. Elementos de conversão ausentes

| Elemento | Por quê | Esforço |
|---|---|---|
| **Botão flutuante de WhatsApp** (mobile e desktop) | Hoje o visitante precisa rolar até um CTA. É o padrão de mercado para serviço local | Baixo |
| **CTA fixo no rodapé no mobile** ("Orçamento no WhatsApp") | Mobile é a maior parte do tráfego vindo do Instagram | Baixo |
| **Garantia explícita** | Reduz risco percebido | Baixo (texto) |
| **Prazo no hero** | Diferencial forte, hoje escondido | Baixo |
| **Exemplos** | Prova de competência | Médio |
| **Foto + "quem faz"** | Confiança | Baixo |
| **Depoimentos** | Prova social | Depende de clientes |
| **Analytics + eventos** | Sem isso, toda otimização é chute | Baixo |
| **Formulário curto** | Captura quem não quer abrir WhatsApp | Médio |

---

## 4. Medição (instalar antes de divulgar)

- **GA4** (grátis) ou alternativa leve sem cookie (Umami self-hosted na VPS — grátis, LGPD-friendly).
- **Meta Pixel** (grátis) — necessário se um dia rodar anúncio; também permite públicos de remarketing desde já.
- Eventos: `click_whatsapp` com parâmetro `posicao` (`hero`, `pricing-essencial`, `pricing-profissional`, `cta-final`, `flutuante`), `click_email`, `form_submit`, `view_exemplo`.
- **UTMs** em todo link externo (bio do Instagram, assinatura do e-mail, mensagens de prospecção) para saber a origem de cada visita.
- Identificar origem também na conversa: mensagens pré-preenchidas ligeiramente diferentes por CTA (já existe parcialmente — hero e pricing têm textos distintos).
- Se usar cookies de marketing (Pixel), exibir aviso de consentimento.

---

## 5. SEO e compartilhamento

Problemas verificados no código:
- `index.html` tem `lang="en"` → deveria ser `pt-BR`.
- `/landing-pages` muda só o `document.title` via `useEffect`; **meta description, Open Graph e Twitter Card são os da home** (automação). Quando você compartilhar o link no WhatsApp/Instagram, a prévia vai mostrar "Soluções em Automação e Sistemas Web".
- `public/sitemap.xml` só contém `/`. Falta `/landing-pages`.
- JSON-LD: `description` menciona "escritórios de advocacia e empresas de médio e grande porte" (sobra de posicionamento antigo); `sameAs` vazio; `logo.svg` com 1,7 MB.
- Nenhuma menção a cidade/região → não ranqueia para "criação de site BH".

Ações:
1. `lang="pt-BR"`.
2. Pré-renderizar as rotas (ex.: `vite-plugin-prerender`/`vite-react-ssg`) e usar `react-helmet-async` para meta por rota — ou, mais simples, gerar um `landing-pages/index.html` estático com as metas certas no build.
3. OG image específica para `/landing-pages` (mockup + "Site para o seu negócio a partir de R$ 399").
4. Adicionar a rota ao sitemap.
5. JSON-LD `Service`/`Offer` com preço e `areaServed` (BH + Brasil); `sameAs` com Instagram e Google Business Profile.
6. Texto com termos locais: "criação de sites em Belo Horizonte", "site para clínica em BH".
7. Otimizar `logo.svg` (1,7 MB é provavelmente um raster embutido).
8. Rodar PageSpeed Insights mobile após as mudanças — vender "site rápido" exige que o seu seja rápido (há um `docs/SEO_PAGESPEED_GUIA.md` no repo para isso).

---

## 6. Home (`/`) — pontos que afetam a venda de landing pages

- O hero da home fala só de automação ("Automação que escala o seu negócio"). Quem chega pelo domínio puro não vê landing pages até o 2º card de serviços. **Ação**: faixa/banner no topo da home: "Precisa de um site para o seu negócio? A partir de R$ 399 →". O link da bio deve apontar direto para `/landing-pages`.
- Estatísticas "100% Dedicação" e "20+ Tecnologias" não significam nada para o comprador de landing page. Em `/landing-pages`, usar números úteis: "4 dias", "R$ 399", "12 meses de hospedagem".
- `Projects.tsx`: projetos genéricos ("ERP", "99,99% de SLA", "Tomada de decisão 5x mais rápida") sem cliente nomeado soam como texto de template. Um lead desconfiado percebe. **Ação**: substituir por cases reais (Rumo, Uaisougue, Etus — o que foi feito e o resultado), ou rotular como "tipos de solução".
- "Atendimento imediato via WhatsApp" (`Contact.tsx`) é uma promessa difícil de cumprir sozinho. Trocar por "Resposta em até 2h no horário comercial" — e cumprir.
- A animação de introdução (`BrandIntro`) só aparece na home. Manter assim — **nunca** na página de venda.

---

## 7. Plano de ação priorizado

### P0 — antes de começar a divulgar
- [ ] Criar a caixa `contato@` (arquivo 02).
- [ ] Botão flutuante de WhatsApp + CTA fixo no mobile.
- [ ] Prazo e garantia no hero.
- [ ] Seção "Quem faz" com foto.
- [ ] Reescrever o FAQ (tom, preço de renovação, propriedade do site, alterações).
- [ ] Instalar analytics + eventos de clique + UTMs.
- [ ] `lang="pt-BR"`, sitemap, meta/OG próprias para `/landing-pages`.
- [ ] Header focado na rota `/landing-pages`.

### P1 — primeiras 2–3 semanas
- [ ] 4–6 demos por nicho + seção de Exemplos.
- [ ] 3 pacotes de preço com formas de pagamento.
- [ ] Processo com dias e "o que você precisa enviar".
- [ ] Logos de clientes + primeiros depoimentos.
- [ ] Banner na home apontando para landing pages.
- [ ] Revisar `Projects.tsx` para cases reais.

### P2 — depois dos primeiros clientes
- [ ] Formulário curto com Resend.
- [ ] Páginas por nicho para SEO/anúncios.
- [ ] Google Business Profile + widget de avaliações.
- [ ] Pré-renderização completa das rotas.
- [ ] Teste A/B de headline (manual: trocar a cada 2 semanas e comparar taxa de clique no WhatsApp).
