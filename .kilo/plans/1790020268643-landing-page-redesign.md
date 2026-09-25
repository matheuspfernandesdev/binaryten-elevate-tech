# Plano: Redesign Visual da Landing Page — Hero Disruptivo + Interações Disruptivas

## Contexto

**Projeto:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui
**Inspiração visual:** https://www.solly.stream/ (hierarquia ousada, tipografia grande, alto contraste, motion fluida)
**Escopo:** Redesign parcial — **não é um full rewrite**. Manter as mesmas seções e estrutura de conteúdo.
**Paleta:** Manter a família azul escuro / azul marinho / azul celeste, aprofundando o canvas para um "midnight" mais premium.

## Decisões de Design (confirmadas com o usuário)

| Decisão | Escolha |
|---------|---------|
| Hero copy | **A — Outcome-focused:** "Automação que / escala o seu / negócio." + sub-line benefit-driven |
| Carrossel (F) | **A — Clients + Technologies + Projects** |
| Hover reveal (A) | **A — Todos os grupos de cards** (Services, Projects, Technologies, About highlights, Clients) |
| Métricas animadas (D) | **A — Apenas Hero stats** (8+, 20+, 100%) |
| Tipografia | **A — Escala ampliada + tracking mais apertado** (Display `clamp(3rem, 8vw, 6rem)`, H1 `clamp(2.5rem, 6vw, 4.5rem)`, H2 `clamp(2rem, 4vw, 3rem)`) |
| Motion | **A — Framer Motion + hook custom `useCountUp`** |
| Paleta | **A — Deepen toward midnight** (background `220 40% 5%`, cards `218 35% 13%`, manter celeste primary + adicionar cyan secundário para gradientes) |

## Estrutura Atual (a preservar)

`Header → Hero → Clients → About → Technologies → Services → Projects → Contact → Footer`

## Tarefas de Implementação

### 1. Setup de dependências

- [ ] Adicionar `framer-motion` ao `package.json` (dependencies)
- [ ] Manter `embla-carousel-react` (já instalado) — reutilizar o componente `Carousel` existente em `src/components/ui/carousel.tsx`
- [ ] Não adicionar outras bibliotecas de animação

### 2. Sistema visual — tokens (`src/index.css`, `tailwind.config.ts`)

- [ ] Atualizar tokens de cor para a paleta midnight:
  - `--background`: `220 40% 5%` (quase preto azulado)
  - `--card`: `218 35% 13%` (navy mais profundo)
  - Manter `--primary` celeste (`199 89% 55%`)
  - Adicionar token secundário cyan mais brilhante para gradientes e acentos (ex: `--accent-cyan: 187 85% 60%`)
- [ ] Ampliar escala tipográfica semântica:
  - `--text-display-size`: `clamp(3rem, 8vw, 6rem)`
  - `--text-h1-size`: `clamp(2.5rem, 6vw, 4.5rem)`
  - `--text-h2-size`: `clamp(2rem, 4vw, 3rem)`
  - Ajustar `tracking` mais apertado em display/headings para matching solly-style
  - Aumentar contraste de peso entre display (700-800) e body (400)
- [ ] Revisar `--muted-foreground` para garantir legibilidade WCAG AA no novo canvas midnight

### 3. Hero redesign (`src/components/Hero.tsx`)

- [ ] Substituir headline atual por split headline com quebras visuais:
  - Linha 1: "Automação que"
  - Linha 2: "escala o seu"
  - Linha 3: "negócio." (com `text-gradient` em palavra-chave)
- [ ] Atualizar sub-line para copy benefit-driven:
  - "Desenvolvemos sistemas web inteligentes e processos automatizados que liberam seu time para focar no que importa."
- [ ] Aplicar `text-display` com framer-motion `stagger` (linhas entram sequencialmente)
- [ ] Refinar overlay/grid de fundo para padrão mais sutil e premium (reduzir opacidade, ajustar spacing)
- [ ] Stats (8+, 20+, 100%) → aplicar hook `useCountUp` com gatilho `IntersectionObserver`
- [ ] Melhorar hierarquia dos CTAs (primary com glow mais refinado, outline com hover state mais claro)
- [ ] Garantir `prefers-reduced-motion` respeitado em todas as animações do Hero

### 4. Carrossel horizontal (F) — Clients + Technologies + Projects

- [ ] **Clients:** converter grid de logos para `Carousel` (embla) com:
  - `CarouselContent`, `CarouselItem` por cliente
  - Controles `CarouselPrevious` / `CarouselNext`
  - Indicador visual de posição (dots ou counter)
  - Breakpoint: mostrar 1 card em mobile, 2-3 em desktop
- [ ] **Technologies:** converter grid de 4 steps para `Carousel` com:
  - Cada step como `CarouselItem`
  - Número do step com destaque tipográfico
  - Controles + indicadores
- [ ] **Projects:** converter grid de case studies para `Carousel` com:
  - Cada projeto como `CarouselItem`
  - Layout vertical (título + descrição + resultados)
  - Controles + indicadores
- [ ] Ajustar `opts` do embla (`slidesToScroll`, `align`, `loop` quando apropriado)
- [ ] Garantir que o carousel seja keyboard-navigable (já suportado pelo componente base)
- [ ] Manter `animate-slide-up`/`animate-scale-in` apenas nos items visíveis para evitar motion excessivo

### 5. Hover reveal layers (A) — todos os grupos de cards

- [ ] **Services (5 cards):** no hover, revelar overlay com:
  - Lista de features (atualmente visível) → mover para reveal layer
  - CTA "Saiba mais" ou seta
  - Background shift + border glow em celeste
- [ ] **Projects (4 cards):** no hover, revelar:
  - Métricas/resultados com destaque
  - Gradiente de fundo mais intenso
  - Seta/indicador de "ver caso"
- [ ] **Technologies (4 cards):** no hover, revelar:
  - Descrição expandida ou detalhe técnico
  - Ícone com glow/pulse
- [ ] **About highlights (4 cards):** no hover, revelar:
  - Detalhe adicional sobre o highlight
  - Ícone com scale/glow
- [ ] **Clients (3 cards):** no hover, revelar:
  - Descrição curta do projeto + métrica/segmento
  - Manter logo sempre visível
- [ ] Padrão comum de implementação:
  - Usar `group` + `opacity-0 group-hover:opacity-100` + `translate-y` transition
  - Duração consistente (`duration-300`/`duration-500`)
  - Garantir que conteúdo revelado não cause layout shift
  - Suportar `focus-within` para acessibilidade (além de hover)
  - Respeitar `prefers-reduced-motion`

### 6. Métricas animadas (D) — Hero stats

- [ ] Criar hook custom `useCountUp` (`src/hooks/use-count-up.ts`):
  - Props: `target` (number), `duration` (ms), `decimals` (optional), `suffix` (optional)
  - Usar `IntersectionObserver` para disparar apenas quando visível
  - Usar `requestAnimationFrame` para smooth count-up com easing
  - Retornar valor formatado como string
  - Respeitar `prefers-reduced-motion` (retornar valor final instantaneamente)
- [ ] Aplicar aos 3 stats do Hero:
  - `8+` Anos de Experiência
  - `20+` Tecnologias
  - `100%` Dedicação
- [ ] Garantir que números não "pulem" no layout (reservar espaço com `min-width` ou `tabular-nums`)

### 7. Motion global com Framer Motion

- [ ] Criar componente utilitário `Reveal` (`src/components/Reveal.tsx`):
  - Props: `children`, `delay`, `y` (offset), `duration`, `once`
  - Usa `motion.div` com `initial={{ opacity: 0, y }}` → `whileInView={{ opacity: 1, y: 0 }}`
  - `viewport={{ once: true, margin: "-80px" }}`
- [ ] Aplicar `Reveal` com stagger nas seções:
  - Hero: linhas do headline (stagger 0.1s)
  - About: paragraphs + highlights (stagger 0.08s)
  - Services: cards (stagger 0.06s)
  - Projects: cards (stagger 0.08s)
  - Technologies: steps (stagger 0.08s)
  - Clients: logos (stagger 0.05s)
  - Contact: card principal + badges (stagger 0.1s)
- [ ] Aplicar `Reveal` aos headers de seção (eyebrow + h2 + description)
- [ ] Usar `whileHover`/`whileTap` sutis nos CTAs principais
- [ ] Garantir que `Reveal` não quebre SSR/hydration (Vite é client-side, mas manter `once: true`)
- [ ] Respeitar `prefers-reduced-motion` globalmente (desabilitar transforms quando reduzido)

### 8. Ajustes de conteúdo/copy (leve, sem reestruturar seções)

- [ ] Refinar sub-lines das seções para tom mais direto e benefit-driven (inspirado em solly's punchy style)
- [ ] Manter todos os títulos principais e estrutura de cards
- [ ] Opcional: encurtar descrições longas em Services/Projects para melhor scanability
- [ ] Não alterar fluxos de CTA ou links existentes

### 9. Validação

- [ ] `npm run build` — deve passar sem errors
- [ ] `npm run lint` — verificar que não há novos errors (warnings pre-existentes em shadcn/ui são aceitáveis)
- [ ] Rodar detector: `.\.agents\skills\impeccable\scripts\impeccable.cmd detect --json --scope type src/`
  - Verificar findings de typography, spacing, color contrast
  - Corrigir qualquer finding novo introduzido
- [ ] Testar responsivo em 3 breakpoints: mobile (375px), tablet (768px), desktop (1440px)
- [ ] Testar `prefers-reduced-motion` (via devtools) — animações devem estar desabilitadas
- [ ] Testar keyboard navigation nos carrosséis e botões
- [ ] Verificar contraste de texto no novo canvas midnight (WCAG AA)
- [ ] Verificar que carrosséis não causam horizontal overflow na página

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| `framer-motion` aumenta bundle size | Usar tree-shaking, importar apenas `motion`, `AnimatePresence` se necessário. Não importar biblioteca inteira |
| Carrossel embla com muitos items pode travar em mobile | Limitar `slidesToScroll: 1`, usar `loop: false` onde houver poucos items, lazy render |
| Hover reveal pode esconder conteúdo importante em touch devices | Em mobile, revelar conteúdo sempre visível (usar `md:opacity-0 md:group-hover:opacity-100` — em touch, conteúdo base fica legível) |
| Over-animation pode cansar o usuário | Stagger curto (≤0.1s), durations ≤0.6s, respeitar `prefers-reduced-motion`, aplicar `once: true` |
| Midnight background pode reduzir contraste | Validar `--muted-foreground` e textos em `text-primary-foreground` contra novo `--background` com checker WCAG AA |
| Count-up pode causar layout shift | Usar `font-variant-numeric: tabular-nums`, reservar largura fixa nos stats |
| Framer Motion + Tailwind classes podem conflitar | Usar framer-motion apenas para transforms/opacity, Tailwind para cores/spacing. Não duplicar as mesmas propriedades |

## Arquivos a modificar

- `package.json` — adicionar `framer-motion`
- `src/index.css` — tokens de cor midnight + escala tipográfica ampliada
- `tailwind.config.ts` — ajustar tokens se necessário (fontes, cores)
- `src/components/Hero.tsx` — split headline + count-up stats + motion
- `src/components/Clients.tsx` — carousel + hover reveal
- `src/components/Technologies.tsx` — carousel + hover reveal
- `src/components/Services.tsx` — hover reveal + motion stagger
- `src/components/Projects.tsx` — carousel + hover reveal
- `src/components/About.tsx` — hover reveal + motion stagger
- `src/components/Contact.tsx` — motion stagger (leve, sem reestruturar)
- `src/components/Header.tsx` — ajustes mínimos de consistência visual (opcional)
- `src/components/Footer.tsx` — ajustes mínimos de consistência visual (opcional)
- `src/hooks/use-count-up.ts` — **novo arquivo** (hook custom)
- `src/components/Reveal.tsx` — **novo arquivo** (componente framer-motion)

## Critérios de Aceitação

- [ ] Hero tem split headline "Automação que / escala o seu / negócio." com animação stagger
- [ ] Stats do Hero fazem count-up ao entrar em view
- [ ] Clients, Technologies, Projects usam carousel horizontal com controles
- [ ] Todos os grupos de cards têm hover reveal funcional
- [ ] Tipografia ampliada (display/h1/h2) aplicada consistentemente
- [ ] Paleta midnight aplicada em todo o site mantendo azul escuro/navy/celeste
- [ ] Framer Motion aplicado com `prefers-reduced-motion` respeitado
- [ ] Build, lint, e detector impeccável passam sem novos errors
- [ ] Responsivo em mobile/tablet/desktop sem overflow horizontal
