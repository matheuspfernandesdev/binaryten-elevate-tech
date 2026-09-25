---
version: 1
slug: "src-components-intro-brandintro-tsx"
primary_target: "src/components/intro/BrandIntro.tsx"
related_targets: ["src/pages/Index.tsx"]
---

# Intro de marca (Bi.Ten)

- **Scope:** overlay de primeira visita na rota `/`, montado no Index. Modo **Persuade** (anúncio de marca) dentro do mundo visual estabelecido "Binary Ten Midnight" — extensão local, não identidade nova.
- **Audience / job:** visitante recorrente (já conhece "Binary Ten"); em ~9,1s (corte de 20% sobre as ~11,4s anteriores, a pedido) entender que o nome agora é **Bi.Ten** e seguir para o site sem atrito.
- **Constraints:** aparece no máximo 1× a cada 30 dias (`localStorage` timestamp + guarda de sessão), saída sempre disponível (Pular / Esc / clique), `prefers-reduced-motion` respeitado, zero dependências novas (framer-motion já é dep), nenhum texto/token/asset do site existente alterado.
- **Memorable moment:** a contração — "Binary Ten" escrito letra a letra, o meio ("nary ") colapsando e o "." entrando, fechando em "Bi.Ten".

## Direction contract

THESIS: Esta tela existe para ensinar a contração Binary Ten → Bi.Ten; o morfo é o produto. Recusa-se a sequência typewriter (apagar e redigitar), que troca um texto por outro sem explicar a relação entre eles.

OWN-WORLD: Só tokens do `index.css` — fundo `--background`, grid animado `glow-pulse` do Hero, nome em Space Grotesk `text-display` com gradiente por caractere `from-primary to-accent` (`.text-gradient`), tagline `text-body-lg` em `--muted-foreground`, ponto em `--accent` com glow. Nada de cor, fonte ou efeito novo.

STORY: o visitante vê "Binary Ten" ser escrito de cima com stagger, vê o meio colapsar enquanto "Bi" e "Ten" fecham a distância e o "." acende, lê "Conheça a transformação digital que sua empresa precisa", e o overlay sai revelando o site.

FIRST VIEWPORT: overlay full-bleed `z-[100]`; nome centralizado em display clamp(3rem, 8vw, 6rem); tagline centralizada max-w-2xl já reservando espaço abaixo (sem salto de layout); "PULAR" discreto no canto inferior direito com focus ring do sistema; grid sutil + glow radial atrás.

FORM: extensão de superfície existente (local addition no mundo estabelecido); sem concept-seed. Implementação: framer-motion (`AnimatePresence mode="popLayout"` + `layout="position"` por caractere), sem dependências novas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
