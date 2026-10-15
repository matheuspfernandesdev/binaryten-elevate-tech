# 01 — Instagram, identidade visual e estratégia de conteúdo

> Contexto: Binary Ten, operação solo (Matheus), foco inicial em **landing pages a partir de R$ 399** para pequenos negócios (clínicas, escritórios, saúde, indústria, fotógrafos, autônomos). Região de origem: BH/MG (DDD 31). Orçamento de marketing: ~zero, aceitando ferramentas baratas.
> Pesquisa feita em out/2026. Dados de plataforma mudam rápido — revalidar a cada trimestre.

---

## 1. Veredito rápido

| Ideia original | Avaliação | Ajuste recomendado |
|---|---|---|
| 3 posts/semana | Cadência boa e sustentável para quem está sozinho. Consistência > volume. | Manter 3, mas **mudar o mix**: 2 Reels + 1 carrossel. Imagem estática única é o formato de menor alcance. |
| 1 story/dia "estilo blog" | Funciona, mas Stories **não alcançam quem não te segue** — servem para nutrir e converter, não para crescer. | Manter diário, feito **à mão pelo celular** (5 min), com rosto/voz, enquetes e caixinha. A API não publica stickers (link, enquete, localização). |
| Pipeline 100% IA no estilo odd-oddities | Tecnicamente funciona e a API oficial não é penalizada. O problema é **o conteúdo**, não o canal. | Reaproveitar o pipeline como **fábrica de rascunhos + renderizador com aprovação humana**, não como piloto automático. Detalhes na seção 3. |
| "Viralizar ao máximo" | Viral não é plano, é bônus. Conta B2B local cresce devagar. | Otimizar para **envios por DM e salvamentos** (os sinais que mais pesam para alcance) e usar o conteúdo como **ferramenta de prospecção** (seção 6). |

Expectativa honesta: para landing pages de R$ 399, o Instagram vai funcionar mais como **vitrine de credibilidade** (o lead que você prospectou vai olhar seu perfil antes de responder) do que como gerador direto de clientes nos primeiros 3–6 meses. A aquisição real vem da prospecção ativa (arquivo `03-captacao-de-leads.md`). Isso não diminui a importância do perfil — um perfil fraco derruba a taxa de resposta da prospecção.

---

## 2. O que o algoritmo valoriza em 2026 (o que importa para você)

Fontes: declarações públicas do Adam Mosseri (head do Instagram), memo de fim de ano de 31/12/2025 e guias compilados (Buffer, Later, Hootsuite, SocialPilot, set/2026).

- **Sinais mais fortes**: tempo de exibição (incluindo replays), **envios por DM por alcance**, curtidas por alcance. Envios pesam bem mais que curtidas para chegar em não-seguidores.
- **Originalidade**: conteúdo original recebe mais distribuição que repost; contas que repostam muito saem das recomendações.
- **Conteúdo humano e "cru" acima do polido/IA**: o memo de 31/12/2025 diz que o Instagram vai priorizar conteúdo real feito por humanos e dar mais peso a sinais de autenticidade/proveniência. Na prática: **rosto, voz e bastidor reais** passam a ser vantagem competitiva.
- **Sistema de "audição"**: conteúdo público é testado primeiro com um grupo pequeno de não-seguidores; se os sinais forem bons, expande.
- **Trial Reels** (Reels de teste mostrados só para não-seguidores) agora podem ser agendados — ótimo para testar ganchos sem "sujar" o perfil.
- **Publicar via API não é penalizado** por si só. A Graph API é oficial, e o Instagram já afirmou repetidamente que ferramentas de agendamento não afetam alcance. O que pode afetar é: conteúdo genérico, imagem com rótulo de IA sem valor, ausência de humano.

### Sobre imagem gerada por IA
- A Meta aplica o rótulo "Informações de IA" quando detecta metadados de proveniência (C2PA/IPTC) ou marca d'água invisível — modelos do Google (SynthID), OpenAI e outros já embutem isso. Não é oficialmente uma punição, mas para uma empresa que vende **confiança** um feed cheio de arte IA genérica comunica "terceirizei tudo para robô".
- Modelos de imagem ainda erram texto em português. Para carrossel educativo (que é 90% texto), **renderizar por template** é melhor, mais barato (custo zero) e mantém identidade consistente.
- IA de imagem continua útil para: fundos abstratos, ilustrações de apoio, mockups de conceito, thumbnails. Nunca como "peça principal" de prova social ou portfólio.

---

## 3. Reaproveitando a estrutura do odd-oddities

O odd-oddities (`C:\binaryten-git\odd-oddities`) tem: Worker .NET hexagonal, pipeline `TextGeneration → ImageGeneration → Publication`, OpenRouter com cadeia de fallback por custo, anti-repetição (SHA-256 + Jaccard 90 dias), ImageSharp para marca d'água, MinIO para URL pública, Graph API com renovação de token, auditoria em Postgres.

### O que reaproveitar como está
- `MetaInstagramPublishingAdapter` + `TokenRenewalService` + `TokenEncryptionService` (o token já tem `instagram_business_content_publish`, `instagram_business_manage_messages`, `instagram_business_manage_comments`, `instagram_business_manage_insights`).
- MinIO + URL pré-assinada (a Graph API exige URL pública HTTPS).
- Seleção dinâmica de modelo no OpenRouter (texto grátis/barato).
- Anti-repetição de pautas (Jaccard sobre os últimos 90 dias) — muito útil para não repetir dica.
- Agendamento (`ScheduleService`) e endpoint manual `/run`.

### O que mudar
1. **Human-in-the-loop obrigatório**: o pipeline gera o rascunho (pauta, roteiro, legenda, slides renderizados) e **para** em estado `PendingApproval`. Você aprova/edita por um canal simples (bot no Telegram é o mais barato e rápido de fazer; ou uma página admin mínima). Só depois publica/agenda.
2. **Trocar `ImageGeneration` por `TemplateRendering`** para carrosséis: o LLM devolve JSON com slides (`titulo`, `corpo`, `destaque`), e um renderizador aplica o template da marca. Opções:
   - **HTML/CSS + Playwright screenshot** (você domina React/Tailwind; reaproveita fontes e cores do site). Recomendado.
   - **Satori** (JSX → SVG → PNG, sem browser), mais leve.
   - ImageSharp (já existe), mas montar layout tipográfico nele é trabalhoso.
3. **Novo tipo de mídia: carrossel** (container por item + container pai, até 10 itens via API) e **Reels** (`media_type=REELS`, vídeo por URL).
4. **Reels templados com Remotion** (React → MP4). Licença gratuita para pessoa física e empresas de até 3 pessoas. Útil para: "3 erros do site da sua clínica" com texto animado sobre gravação de tela. **Mas o melhor Reel ainda é você falando** — use Remotion para legendas/motion, não para substituir sua presença.
5. **Comentário → DM automático** (o famoso "comenta SITE que eu te mando"): com `manage_comments` + `manage_messages` dá para responder comentário com private reply via webhook. Isso substitui o ManyChat (que tem plano free limitado). Volume baixo, risco zero, alto impacto em sinais de engajamento.
6. **Insights**: puxar métricas por post (`reach`, `saved`, `shares`, `profile_visits`) para o Postgres e alimentar o prompt da pauta da semana seguinte ("o que funcionou").

### Custo
- Texto: modelos `:free` do OpenRouter ou Gemini Flash barato → ~US$ 0.
- Imagem IA (quando usar): ~US$ 0,01/img como você já tem.
- Render de template: US$ 0 (roda na VPS existente).
- Total realista: **< US$ 1/mês**.

### Fluxo semanal proposto (tempo seu: ~2h/semana + 5 min/dia)

```
Domingo (automático)
  Pauta: LLM gera 3 ideias com base em pilares + calendário + insights da semana anterior
  → anti-repetição → você recebe no Telegram

Domingo (você, ~20 min)
  Aprova/edita as 3 pautas

Domingo (automático)
  Carrossel: LLM gera slides (JSON) → render template → legenda → PendingApproval
  Reels: LLM gera roteiro de 30–45s + legenda + gancho alternativo para Trial Reel

Domingo/segunda (você, ~1h30)
  Grava 2 Reels (celular, luz de janela, microfone de lapela barato) usando o roteiro
  Edita no app Edits (Meta, grátis) ou CapCut; legendas automáticas
  Aprova o carrossel

Seg/Qua/Sex (automático)
  Publicação via API no horário definido; Trial Reel quando houver gancho alternativo

Diário (você, 5 min)
  Story manual: bastidor, enquete, caixinha, repost do post do dia com comentário
```

Se preferir não codar nada agora: a mesma rotina funciona com **Meta Business Suite** (agenda posts, Reels e Stories de graça) ou o agendamento nativo do app do Instagram. A automação é otimização, não pré-requisito.

---

## 4. Identidade visual

### O que já existe
- Logo: "10" em neon com circuitos, metade **laranja** (1) e metade **ciano** (0), fragmentos de vidro, fundo escuro com trilhas de circuito.
- Site (`src/index.css`): tema "Midnight" azul-marinho + ciano. Fontes **Space Grotesk** (títulos) e **Plus Jakarta Sans** (texto).
- **Inconsistência**: o laranja da logo não aparece em nenhum lugar do site. A identidade precisa assumir as duas cores.

### Paleta proposta

| Papel | Cor | HEX aprox. | Origem |
|---|---|---|---|
| Fundo principal | Midnight | `#080B12` | `--background` |
| Superfície/cards | Navy | `#161E2D` | `--card` |
| Primária (marca, títulos de destaque) | Ciano | `#26B2F2` | `--primary` |
| Secundária (gradiente) | Celeste | `#42DBF0` | `--accent` |
| **Acento de ação/alerta** | Laranja neon | `#FF7A1A` (extrair o tom exato da logo) | logo |
| Texto | Gelo | `#F5F8FC` | `--foreground` |
| Texto secundário | Cinza azulado | `#AEB6C4` | `--muted-foreground` |

Regras:
- Ciano = marca/confiança/solução. Laranja = **o problema, o erro, o "antes"**, ou o CTA. Isso cria uma linguagem visual narrativa: laranja aponta o defeito, ciano mostra a solução — exatamente o "1" e o "0" da logo.
- No máximo 1 acento laranja por peça.
- Fundo sempre escuro no feed (diferencia da maioria das agências, que usam fundo branco).
- Glow só em 1 elemento por slide; excesso vira "template gamer".

### Tipografia
- Títulos: Space Grotesk Bold, tracking negativo, máx. 7 palavras por slide.
- Corpo: Plus Jakarta Sans Medium, mín. 28 px no canvas 1080×1350.
- Números/dados: Space Grotesk, tamanho grande, em ciano.

### Elementos gráficos
- Trilhas de circuito finas (opacidade 10–15%) como textura de fundo.
- Grid 60 px (já usado no hero do site).
- "Moldura de navegador" e "moldura de celular" para mostrar sites (mockups) — será o elemento mais usado.
- Marcador de erro: círculo/seta laranja. Marcador de acerto: check ciano.
- Assinatura fixa no último slide: logo + `binaryten.com.br` + "Matheus • Binary Ten".

### Templates a criar (5 bastam)
1. **Capa de carrossel**: gancho grande + mockup ou número.
2. **Slide de conteúdo**: título curto + 1 ideia + ícone.
3. **Antes/Depois**: split laranja/ciano com dois mockups.
4. **Prova**: print de mensagem/resultado + citação do cliente.
5. **CTA final**: "Comenta SITE" / "Link na bio" + foto sua.

Formato: **1080×1350 (4:5)** para feed; 1080×1920 para Reels/Stories (área segura central).

### Rosto da marca
Para pequeno negócio, quem compra site de R$ 399 compra **de uma pessoa**. Use sua foto no perfil? Recomendação: **logo no avatar** (consistência com site), mas **você aparece** nos Reels, nos Stories e no destaque "Quem sou". "Binary Ten, por Matheus Pires" na bio.

---

## 5. Posicionamento, arquétipos e voz

### Posicionamento (uma frase)
> "Site profissional para pequeno negócio, feito por um engenheiro de software sênior, pelo preço de um template — no ar em dias, não em meses."

Diferencial real que concorrente de R$ 399 (geralmente freelancer de WordPress/Wix ou agência pequena) não tem: **8+ anos de engenharia, código próprio, rápido e otimizado, e domínio de automação** (upsell natural: botão de WhatsApp com mensagem automática, agendamento, integração).

### Arquétipos
- **Primário: Mago** — transformação. "De invisível no Google para encontrado." A logo explodindo em neon já é Mago. Conteúdo de antes/depois é Mago puro.
- **Secundário: Sábio** — autoridade por clareza. Explica sem tecniquês, dá diagnóstico grátis, mostra o porquê. É o que torna a empresa "séria".
- **Tempero: Cara Comum** — fala como gente, mostra bastidor, assume que é uma operação enxuta. Evita a distância fria de "agência".

Evitar: Herói exagerado ("vamos revolucionar seu negócio!"), Bobo da corte (memes de programador não vendem para dona de clínica).

### Voz
- Direta, didática, levemente provocativa. Frases curtas.
- Fala com o **dono do negócio**, não com dev. Proibido: "SPA", "SEO on-page", "deploy", "stack". Traduzir: "aparece no Google", "abre rápido no celular", "o cliente chama no WhatsApp com 1 toque".
- Sempre concreto: número, exemplo, print.
- Exemplo de tom: "Seu site demora 8 segundos para abrir no celular. Metade das pessoas desiste em 3. Não é falta de cliente, é porta emperrada."

---

## 6. Pilares de conteúdo

| Pilar | % | Formato principal | Objetivo |
|---|---|---|---|
| **Antes/Depois e Redesign** | 35% | Reels (tela + voz) e carrossel | Alcance + prova de competência |
| **Educação prática para dono de negócio** | 30% | Carrossel | Salvamentos + autoridade |
| **Prova e bastidor** (entregas, feedback, processo) | 15% | Reels/Stories | Confiança |
| **Oferta direta** | 10% | Carrossel/Reel | Conversão |
| **Opinião/pessoal** (por que abriu a Binary Ten, rotina) | 10% | Reels falando | Conexão, rosto da marca |

### A tática que une conteúdo e prospecção: "Refazendo o site de..."
1. Escolhe um negócio local real (do funil de leads) com site ruim ou sem site.
2. Grava a tela: diagnóstico em 15s (lento, sem WhatsApp, quebra no celular).
3. Mostra a sua versão (mockup feito em 1–2h a partir do seu template de nicho).
4. Publica **sem expor negativamente** o negócio: borrar nome/marca, ou pedir autorização antes (e aí vira elogio público + presente).
5. Envia o resultado para o dono: "Fiz uma versão do seu site como estudo, quer ver?"

Um único conteúdo vira: Reel (alcance), carrossel (salvamento), story (bastidor) **e** abordagem de venda com prova embutida. É o formato com maior chance de compartilhamento ("manda pro seu amigo que tem clínica").

Variações de série:
- "Site de R$ 399 vs. site de R$ 5.000: qual a diferença real?"
- "Avaliei o site de 5 clínicas de BH" (sem nomes).
- "Construindo uma landing page em 60 segundos" (timelapse).
- "Quanto custa de verdade ter um site em 2026" (domínio, hospedagem, manutenção).
- "Seu Instagram não é seu site" (risco de depender só de rede social).

---

## 7. Banco de ganchos (primeiros 1–2 segundos / capa)

Padrões que funcionam: erro + consequência, número específico, contraste, curiosidade, identificação com nicho.

1. "Seu site está espantando cliente e você não sabe."
2. "3 segundos. É o tempo que o cliente espera seu site abrir."
3. "Refiz o site de uma clínica de BH em 2 horas. Olha o antes."
4. "Dentista, para de mandar paciente para o seu Instagram."
5. "Esse botão sozinho dobra os contatos no WhatsApp."
6. "Site de R$ 399 presta? Vou ser honesto."
7. "O Google não acha seu negócio. Aqui está o porquê."
8. "Pergunta que todo cliente faz antes de te chamar — e seu site não responde."
9. "Não contrate um site antes de ver isso."
10. "Seu concorrente aparece primeiro no Google por um motivo bobo."
11. "Linktree não é site. E está te custando cliente."
12. "Advogado: o site do seu escritório passa confiança ou passa 2012?"
13. "Fiz o teste: abri o site de 10 restaurantes no 4G."
14. "O que eu faria se tivesse um negócio e R$ 400."
15. "Essa é a página que mais vende serviço local. Ela tem 5 partes."
16. "Seu site não tem preço, não tem foto sua e não tem WhatsApp. Adivinha."
17. "Mandei mensagem para 10 empresas pelo site. Só 2 responderam."
18. "Engenheiro de software sênior fazendo site de R$ 399? Explico."
19. "Você paga mensalidade de site? Talvez não precise."
20. "Antes / depois. Mesma empresa, 4 dias de diferença."

Para Trial Reels: publicar o mesmo vídeo com gancho alternativo e manter o vencedor como referência para a próxima pauta.

---

## 8. Estrutura de copy

### Legenda de carrossel/Reel (PAS + CTA)
```
[Linha 1 — gancho que repete/complementa a capa, < 125 caracteres]

[Problema em 1–2 frases, na língua do dono do negócio]
[Agitação: o que isso custa — cliente perdido, concorrente na frente]
[Solução: o que fazer, em passos ou bullets curtos]

[CTA único] Comenta SITE que eu te mando o checklist / Link na bio / Manda para quem tem [nicho]

[2–4 palavras-chave naturais no texto: "criação de site", "Belo Horizonte", "clínica"]
```
Hashtags: pouco impacto em 2026; 3–5 relevantes no máximo. **Palavras-chave na legenda** e texto na tela ajudam mais (busca do Instagram).

### Tipos de CTA (alternar)
- **Envio** (alcance): "Manda para aquele amigo que ainda não tem site."
- **Salvamento**: "Salva para revisar seu site depois."
- **Comentário → DM** (lead): "Comenta SITE que eu te mando o diagnóstico grátis."
- **Direto** (conversão, só no pilar oferta): "Link na bio, orçamento em 5 minutos pelo WhatsApp."

### Bio
```
Binary Ten | Sites para negócios locais
Seu negócio no Google e no WhatsApp em 4 dias
Engenharia de software de verdade, a partir de R$ 399
Por Matheus Pires • BH e todo Brasil
👇 Orçamento no WhatsApp
[link: binaryten.com.br/landing-pages?utm_source=instagram&utm_medium=bio]
```
Botão de contato: WhatsApp (perfil profissional permite).

### Destaques
`Quem sou` • `Antes/Depois` • `Como funciona` • `Preços` • `Clientes` • `Dúvidas`

---

## 9. Calendário-modelo (semana)

| Dia | Feed | Story |
|---|---|---|
| Seg | Reel — Antes/Depois ou Redesign | Bastidor do Reel + enquete "seu site tem botão de WhatsApp?" |
| Ter | — | Dica rápida em selfie (15s) |
| Qua | Carrossel — Educação | Repost do carrossel + "qual desses erros seu site tem?" |
| Qui | — | Caixinha de perguntas |
| Sex | Reel — Opinião/Prova/Oferta (alternar) | Repost + CTA direto |
| Sáb | — | Pessoal/rotina (leve) |
| Dom | — | Resultado da enquete / prévia da semana |

Uma vez por mês: post do pilar Oferta com condição concreta (ex.: "3 vagas para entrega em 4 dias em novembro").

---

## 10. Ferramentas

| Necessidade | Grátis | Baixo custo (se valer a pena) |
|---|---|---|
| Agendamento | Meta Business Suite, agendamento nativo do app, seu pipeline via API | Metricool (plano free para 1 marca tem análise básica) |
| Edição de vídeo | **Edits** (app da Meta), CapCut (atenção a recursos pagos e marca d'água) | — |
| Design de templates | Seu renderizador HTML/Satori; Canva free como plano B | Canva Pro (só se não automatizar) |
| Vídeo templado | **Remotion** (grátis para até 3 pessoas) | — |
| Texto/roteiro/legenda | OpenRouter `:free`, Gemini, ChatGPT/Claude free | OpenRouter pago com teto (já tem) |
| Imagem de apoio | Modelo barato no OpenRouter (~US$ 0,01) | — |
| Comentário → DM | Webhook próprio com Graph API | ManyChat (free com limites) |
| Orquestração no-code (opcional) | **n8n self-hosted** na VPS atual | — |
| Captação de áudio | Celular | Microfone de lapela (R$ 50–150) — melhor investimento do arquivo |
| Métricas | Insights nativos + puxar via API para o Postgres | — |

---

## 11. Métricas e metas (primeiros 90 dias)

Não olhar seguidores como meta principal.

| Métrica | Por quê | Meta inicial |
|---|---|---|
| Envios por alcance | Sinal de alcance mais forte | Acompanhar tendência; identificar os 3 melhores formatos |
| Salvamentos por alcance (carrossel) | Autoridade | > 2% |
| Visitas ao perfil → cliques no link | Interesse real | Medir com UTM no link da bio |
| Conversas no WhatsApp com origem Instagram | O que paga as contas | 4–8/mês no 3º mês |
| Taxa de resposta da prospecção ativa | Efeito "vitrine" do perfil | Comparar antes/depois de ter 15–20 posts |

Regra prática: só começar a prospecção pesada depois de ter **~12–15 posts publicados** (4–5 semanas), para o perfil passar credibilidade quando o lead clicar.

---

## 12. Checklist de lançamento

- [ ] Garantir o @ (o footer do site aponta para `instagram.com/binaryten` — confirmar se o handle é seu).
- [ ] Conta profissional (Empresa), categoria "Serviço de design de sites" ou "Desenvolvedor de software".
- [ ] Vincular Página do Facebook (necessária para algumas funções da API e para o Business Suite).
- [ ] Bio, link com UTM, botão WhatsApp, 6 destaques com capas no padrão da marca.
- [ ] Criar os 5 templates (seção 4).
- [ ] Produzir **9 posts antes de divulgar** (grade inicial de 3×3: 3 antes/depois, 3 educação, 1 quem sou, 1 como funciona, 1 oferta).
- [ ] Adaptar o odd-oddities: estado `PendingApproval`, renderizador de template, carrossel, Reels, aprovação via Telegram.
- [ ] Atualizar `sameAs` no JSON-LD do site com o perfil do Instagram.
