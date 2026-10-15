# 03 — Captação de leads

> Premissa: operação solo, captação calma e qualificada (não "disparo em massa"). Foco: landing pages para pequenos negócios locais.

---

## 1. Resumo

- O canal que vai trazer os primeiros clientes é **prospecção ativa qualificada** (Google Maps → diagnóstico → mensagem personalizada), não o Instagram. O Instagram serve de vitrine que aumenta a taxa de resposta.
- Use a **Google Places API oficial** em vez de robô de scraping: tem cota gratuita mensal suficiente para o seu volume e não viola os Termos do Google.
- O diferencial que mais converte: **mostrar o problema e a solução antes de vender** (diagnóstico do site atual + prévia/mockup para os melhores leads).
- Volume sugerido: **10–20 abordagens novas por dia útil**, 2 follow-ups no máximo. Isso dá ~250–400 abordagens/mês, mais que suficiente para uma pessoa.
- A automação faz a pesquisa, o diagnóstico e o rascunho; **o envio é manual** (ver `02-whatsapp-e-email.md`, seção 2.4).

---

## 2. Cliente ideal (ICP)

Melhor lead para landing page de R$ 399–1.200:

| Critério | Sinal positivo |
|---|---|
| Tem perfil no Google Maps | Sim, com fotos e horário |
| **Não tem site** ou o site é ruim | Campo "site" vazio, aponta para Instagram/Linktree/Facebook, site não abre, sem HTTPS, não é responsivo, lento |
| Tem demanda | **20+ avaliações** e nota ≥ 4,3 (negócio que fatura e se importa com reputação) |
| Tem ticket médio razoável | Clínicas, odonto, estética, advocacia, contabilidade, arquitetura, psicologia, fisioterapia, veterinária, pequenas indústrias, fotógrafos |
| Região | Começar por BH e região metropolitana (vantagem de "sou daqui", possibilidade de reunião presencial) e depois capitais |

Evitar no começo: franquias (decisão centralizada), negócios com site de agência recente e bom, MEIs muito pequenos sem avaliações (pouco orçamento).

---

## 3. Fontes de leads

### 3.1 Google Places API (New) — recomendada
- Desde mar/2025 o crédito de US$ 200 foi substituído por **cota gratuita por SKU/mês**: ~10.000 chamadas (Essentials), ~5.000 (Pro), ~1.000 (Enterprise).
- Campos como site, telefone e avaliação ficam nos SKUs mais altos. Use **FieldMask** pedindo só o necessário; você é cobrado pelo SKU mais alto dos campos solicitados. Conferir a tabela atual antes de rodar.
- Estratégia de custo zero:
  1. `Text Search` com campos baratos (id, nome, endereço, tipo) para varrer "clínica odontológica em Savassi, Belo Horizonte".
  2. `Place Details` só para os candidatos que passarem no filtro inicial, pedindo `websiteUri`, `nationalPhoneNumber`, `rating`, `userRatingCount`.
  3. Colocar **limite de orçamento e alerta de billing** no Google Cloud (US$ 1) para nunca ter surpresa.
- 1.000 consultas detalhadas/mês ≫ suas 300 abordagens.

### 3.2 Scraping do Google Maps (Apify, Outscraper, robôs próprios)
- Viola os Termos do Google Maps Platform; as ferramentas pagas existem e funcionam, mas é zona cinzenta e desnecessário no seu volume. Não recomendado.

### 3.3 Outras fontes (complementares e de alta qualidade)
- **Instagram de negócios locais** com bio "agende pelo direct" / Linktree sem site → mesmo ICP, abordagem por DM.
- **Indicação de parceiros**: contadores, gráficas, agências de tráfego pago (que precisam de landing page para rodar anúncio), fotógrafos, designers de logo. Oferecer **10–15% de comissão** ou reciprocidade.
- **Clientes atuais/antigos** e sua rede (ex-colegas de 8 anos de TI conhecem donos de negócio).
- **Google Business Profile da própria Binary Ten** ("criação de sites em Belo Horizonte"): gratuito, aceita negócio sem endereço público (área de atendimento). Avaliações aqui viram prova social no site.
- Plataformas de freelance (Workana, 99Freelas) e GetNinjas (paga por lead): úteis para portfólio inicial, margem baixa.
- Grupos locais de empreendedores (WhatsApp/Facebook/associações comerciais, CDL) — participar e ajudar, não spammar.

---

## 4. Pipeline de prospecção com IA (MCP/skills)

### 4.1 Arquitetura

```
[1. Descoberta]  Places API (Text Search) por nicho + bairro
      ↓
[2. Filtro]      avaliações ≥ 20, nota ≥ 4.3, aberto, categoria-alvo, não está no CRM
      ↓
[3. Enriquecimento] Place Details (site, telefone) + busca do Instagram do negócio
      ↓
[4. Diagnóstico do site] (se houver site)
      - abre? HTTPS? redireciona para Instagram/Linktree?
      - PageSpeed Insights API (grátis): performance mobile, LCP
      - responsivo? tem botão/link de WhatsApp? tem telefone clicável?
      - tem título/descrição para Google? ano do copyright?
      ↓
[5. Score]       A (sem site, muitas avaliações) / B (site ruim) / C (site ok → descarta ou guarda)
      ↓
[6. Rascunho]    LLM escreve mensagem personalizada citando 1 fato concreto
      ↓
[7. Fila diária] 10–20 leads com link wa.me pré-preenchido + link do Instagram + resumo
      ↓
[8. Envio humano] você toca, revisa, envia, marca status
      ↓
[9. Follow-up]   sistema lembra D+3 e D+7; encerra depois
```

### 4.2 Implementação
- **Opção rápida (agente + MCP)**: no Kiro/Claude, conectar:
  - MCP de Google Maps/Places (há servidores comunitários; ou escrever o seu — é um wrapper simples de 2 endpoints).
  - MCP de fetch/browser (Playwright) para abrir o site e checar WhatsApp/HTTPS/responsividade.
  - MCP de banco (Postgres) ou planilha (Google Sheets) como CRM.
  - Uma **skill** "prospectar-nicho" com o passo a passo acima, critérios de score e o tom das mensagens.
  - Bom para começar: você roda 1×/semana ("prospecte 60 clínicas odontológicas em BH") e revisa.
- **Opção robusta (reaproveitando odd-oddities)**: um Worker .NET com o mesmo padrão de pipeline/steps/ports: `DiscoveryStep → FilterStep → EnrichStep → AuditStep → ScoreStep → DraftStep`, Postgres como CRM, fila diária entregue via bot do Telegram com botões ("Enviei", "Pular", "Não é ICP"). Fallback de modelos via OpenRouter igual ao atual.
- **n8n self-hosted** na VPS também resolve sem código, se preferir.

### 4.3 Modelo de dados mínimo (CRM)
```
lead: id, place_id, nome, nicho, bairro, cidade, telefone, instagram, site,
      rating, reviews, diagnostico_json, score, status, origem,
      primeira_abordagem_em, ultimo_contato_em, follow_ups, opt_out (bool),
      observacoes, criado_em
status: novo → abordado → respondeu → reuniao/orcamento → fechado | perdido | opt_out
```
Guardar `origem` (de onde veio o dado) e `opt_out` é importante para LGPD.

---

## 5. A tática da prévia (para leads nota A)

Para os melhores leads (muitas avaliações, sem site), gerar uma **prévia real** antes de abordar:

1. Ter **1 template de landing page por nicho** (clínica, advocacia, estética, indústria, fotógrafo, genérico) parametrizado por JSON (nome, serviços, endereço, horário, WhatsApp, cores).
2. A IA preenche o JSON com dados públicos do perfil do Google (nome, endereço, horário, categoria, avaliações destacadas).
3. Deploy em `preview.binaryten.com.br/<slug>` com `noindex` e aviso discreto "Prévia de conceito criada pela Binary Ten".
4. Abordagem: "Montei uma prévia de como ficaria o site da [negócio], sem compromisso. Posso te mandar o link?" (link só depois do "sim").

Cuidados:
- Não usar fotos do negócio sem autorização na prévia pública — use fotos de banco (Unsplash/Pexels) e troque depois.
- Tirar a prévia do ar em 30 dias se não houver interesse.
- Limitar a ~5 prévias/semana para o esforço não explodir. Com template bom, cada uma leva 15–30 min.
- Essa mesma prévia vira conteúdo de "Antes/Depois" para o Instagram (com autorização ou anonimizado) — ver arquivo 01.

---

## 6. Mensagens

Regras: curta, personalizada com 1 fato verificável, sem link na primeira mensagem, pergunta fácil de responder, saída educada.

### WhatsApp — sem site
> Oi, tudo bem? Sou o Matheus, da Binary Ten, aqui de BH. Vi a [Clínica X] no Google — 87 avaliações com nota 4,9, parabéns! Reparei que vocês ainda não têm um site, então quem pesquisa no Google cai direto no Instagram. Eu faço sites rápidos para clínicas, com botão de agendamento no WhatsApp. Posso te mostrar um exemplo de como ficaria o de vocês? Se não fizer sentido, é só me avisar 🙂

### WhatsApp — site ruim
> Oi! Sou o Matheus, da Binary Ten. Estava pesquisando escritórios de contabilidade na Pampulha e abri o site de vocês pelo celular: ele levou uns 9 segundos para carregar e o botão de contato não aparece na tela. Isso costuma fazer o cliente desistir antes de chamar. Tenho uma sugestão rápida de como resolver, quer que eu te mande?

### Instagram DM (perfil com Linktree)
> Oi! Adorei o trabalho de vocês [comentário específico sobre um post]. Vi que o link da bio é um Linktree — já pensaram em ter um site próprio para aparecer no Google quando alguém pesquisa "[serviço] em [bairro]"? Faço isso para negócios daqui de BH, posso te mostrar um exemplo?

### Follow-up 1 (D+3)
> Oi, [nome]! Só retomando: montei um exemplo rápido para [negócio]. Quer dar uma olhada? Leva 1 minuto.

### Follow-up 2 (D+7, último)
> Última mensagem para não te incomodar 🙂 Se em algum momento quiser um site para [negócio], é só me chamar aqui. Abraço!

### E-mail (indústria/B2B)
```
Assunto: Site da [Empresa] no celular

Olá, [nome],

Sou o Matheus, engenheiro de software e fundador da Binary Ten, em BH.
Abri o site da [Empresa] pelo celular e notei [problema concreto: não carrega o catálogo / formulário quebrado / sem HTTPS].
Para empresas B2B isso costuma custar pedidos de orçamento que nunca chegam.

Faço landing pages rápidas e focadas em gerar contato, a partir de R$ 399, no ar em poucos dias.
Faz sentido eu te mandar uma proposta de melhoria em uma página?

Matheus Pires
Binary Ten • binaryten.com.br
Se preferir não receber mais mensagens minhas, é só responder "não".
```

---

## 7. Automação de mensagens: até onde ir

| Canal | Primeira mensagem | Follow-up | Resposta a quem chegou sozinho |
|---|---|---|---|
| WhatsApp | **Semi-automática** (link `wa.me`, envio manual) | Semi-automática (lembrete) | Pode ser automática (saudação do app; fase 2: Cloud API com coexistência) |
| Instagram DM | Manual (DM fria por API não é permitida; a Graph API só responde quem iniciou ou comentou) | Manual | **Automática** (comentário → DM via webhook) |
| E-mail | Semi-automática, caixa normal, domínio secundário, ≤ 20/dia | Semi-automática | Automática via Resend (transacional) |

Não automatizar o envio frio em nenhum canal. O ganho de tempo é pequeno (você já economizou 90% automatizando pesquisa e rascunho) e o risco (ban, spam, reputação) é alto.

---

## 8. LGPD na prospecção

- Prospecção B2B usando **dados públicos de contato comercial** pode se apoiar no **legítimo interesse** (LGPD art. 7º, IX), desde que:
  - a finalidade seja compatível (oferta de serviço relevante ao negócio);
  - você colete o **mínimo necessário** (nome do negócio, telefone/e-mail comercial, site);
  - haja **transparência**: dizer quem é e de onde tirou o contato se perguntado ("vi vocês no Google");
  - haja **opt-out fácil e respeitado** (campo `opt_out` no CRM, nunca mais contatar);
  - você **elimine** dados de quem não virou cliente após um prazo (ex.: 12 meses).
- Evitar: dados de pessoa física não comercial, CPF, celulares pessoais claramente não divulgados como contato do negócio.
- Ter uma página simples de **Política de Privacidade** no site explicando isso (a ANPD tem guia sobre legítimo interesse publicado em 2024).
- Isto não é parecer jurídico; para escalar, vale uma revisão com advogado.

---

## 9. Ofertas que facilitam o "sim"

- **Diagnóstico grátis** do site/perfil (entregue em 1 imagem ou áudio de 1 min).
- **Prévia grátis** para leads A.
- **Garantia**: "Você só paga o restante depois de aprovar o layout" (sinal de 50%).
- **Prazo concreto**: "No ar em até 4 dias úteis".
- **Escassez real**: "Pego até 4 projetos por mês" (é verdade para uma pessoa só).
- **Upsell natural** (seu diferencial em automação): botão de agendamento, formulário que cai no WhatsApp, integração com Google Agenda — vira pacote superior.

---

## 10. Metas e funil (primeiros 90 dias)

| Etapa | Taxa de referência (prospecção personalizada local) | Exemplo com 300 abordagens/mês |
|---|---|---|
| Responde | 15–30% | 45–90 |
| Aceita ver exemplo/prévia | 40–60% das respostas | 20–50 |
| Pede orçamento | 30–50% | 8–20 |
| Fecha | 25–40% | **2–8 clientes/mês** |

São estimativas para calibrar, não promessa. Medir semanalmente e ajustar mensagem/nicho. Se a taxa de resposta ficar < 10%, o problema é mensagem ou nicho; se a de fechamento ficar < 20%, é oferta/preço/prova social (ver arquivo 04).

---

## 11. Rotina semanal

| Quando | O quê | Tempo |
|---|---|---|
| Segunda | Rodar descoberta de 1–2 nichos/bairros (agente ou worker) | 20 min de revisão |
| Seg–Sex | Fila diária: 10–20 envios + responder | 30–45 min/dia |
| Ter/Qui | Montar 2–3 prévias para leads A | 1h |
| Sexta | Revisar métricas do funil, ajustar mensagem | 20 min |
