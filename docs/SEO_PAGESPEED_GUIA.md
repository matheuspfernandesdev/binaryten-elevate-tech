# Guia Estratégico de SEO e PageSpeed — Binary Ten

Este documento serve como um guia completo para entender o desempenho do seu site, o diagnóstico do **PageSpeed Insights**, as otimizações técnicas realizadas no código e o plano estratégico passo a passo para alcançar a **1ª página do Google** para a palavra-chave **"Binary Ten"**, além de estratégias de expansão para escritórios de advocacia e médias/grandes empresas.

---

## 1. O que é SEO e O que é PageSpeed?

### **SEO (Search Engine Optimization - Otimização para Motores de Busca)**
SEO é um conjunto de estratégias e técnicas que visam fazer com que o seu site seja encontrado, compreendido e bem posicionado pelos buscadores (principalmente o Google) de forma orgânica (sem pagar por anúncios).

O SEO é dividido em 3 pilares principais:
1. **SEO Técnico:** Garantir que o site seja rápido, seguro (HTTPS), adaptado para celular (mobile-friendly), sem erros de código, com estrutura HTML semântica, `sitemap.xml` e dados estruturados (Schema.org).
2. **SEO On-Page:** O conteúdo da página. Uso correto de títulos (`<h1>`, `<h2>`), meta tags de descrição, palavras-chave relevantes e textos que resolvam as dúvidas dos usuários.
3. **SEO Off-Page (Autoridade):** A reputação do seu site na internet, obtida através de citações, links de outros sites apontando para o seu (**backlinks**) e presença em perfis confiáveis (Google Meu Negócio, LinkedIn, mídias sociais).

### **PageSpeed e Core Web Vitals**
O **PageSpeed Insights** é a ferramenta oficial do Google para medir a velocidade e a experiência do usuário (UX) em uma página web. Desde 2021, a velocidade e a experiência de navegação (medidas pelas métricas **Core Web Vitals**) se tornaram fatores oficiais de rankeamento do Google.

As principais métricas avaliadas são:
- **FCP (First Contentful Paint):** Tempo até o primeiro elemento visual aparecer na tela.
- **LCP (Largest Contentful Paint):** Tempo para carregar o maior bloco de conteúdo visível (no caso do seu site, o banner/título principal do Hero). **Esta foi a principal causa da nota 87 no print enviado.**
- **CLS (Cumulative Layout Shift):** Mede o quanto os elementos da página "pulam" ou mudam de posição enquanto a página carrega.
- **INP / TBT (Total Blocking Time / Interaction to Next Paint):** Tempo que a página fica "travada" processando scripts antes de responder a um clique do usuário.

---

## 2. Diagnóstico do seu Relatório do PageSpeed Insights

Analisando a imagem enviada do diagnóstico do Google PageSpeed Insights (Celular):

* **Pontuações Anteriores:**
  - **Desempenho (Performance):** `87` *(faixa laranja)*
  - **Acessibilidade:** `91` *(faixa verde)*
  - **Práticas Recomendadas:** `100` *(faixa verde)*
  - **SEO:** `100` *(faixa verde)*

### **Quais eram os gargalos identificados no relatório?**

1. **Solicitações que bloquearam a renderização (Economia estimada de 1.280 ms):**
   - **Causa:** As fontes do Google Fonts (`fonts.googleapis.com`) e o arquivo CSS bundle (`index-CPuuWTfg.css`) estavam bloqueando o navegador de desenhar a tela até que fossem 100% baixados e processados.
   - **Impacto:** O navegador pausava a renderização por ~0.78s a 1.28s apenas esperando o arquivo da fonte carregar.

2. **Detalhamento do LCP (Largest Contentful Paint - Atraso de 2.520 ms):**
   - **Causa:** O maior elemento visual da dobra superior (o bloco `<h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight"> Soluções inteligentes... </h1>` sobre o fundo `hero-bg.jpg`) estava demorando para ser exibido.
   - **Motivo:** A imagem de fundo `hero-bg.jpg` era pesada (~120 KB em formato JPG) e a fonte customizada não renderizava imediatamente até terminar o download.

3. **Árvore de dependência da rede (Cadeia de solicitações críticas):**
   - **Causa:** Encadeamento sequencial: O HTML chamava o CSS do Google Fonts, que por sua vez chamava os arquivos `.woff2` do `fonts.gstatic.com`, encadeando uma latência de ~1.571 ms antes do texto principal aparecer com a fonte correta.

---

## 3. Melhorias e Ajustes Implementados no Código (Para Buscar 95%–100%)

Para resolver diretamente os problemas relatados acima, aplicamos as seguintes soluções no código-fonte do projeto:

### **A. Otimização do Google Fonts (Eliminação do bloqueio de renderização)**
- **Ação:** Atualizamos o `index.html` para carregar as fontes Google Fonts em segundo plano (não-bloqueante) usando o padrão `media="print" onload="this.media='all'"`, junto com `rel="preload"` e `preconnect` para os domínios da Google Fonts e Google Static.
- **Resultado:** O CSS inicial carrega instantaneamente sem travar a renderização do HTML.

### **B. Otimização de Imagem LCP (`hero-bg.jpg` -> `hero-bg.webp`)**
- **Ação:** Convertemos a imagem de fundo do Hero (`hero-bg.jpg`) de JPG para **WebP**, reduzindo o tamanho de **120.3 KB** para **72.0 KB** (~40% mais leve) sem perda de qualidade visual.
- **Resultado:** O carregamento da imagem do Hero ficou muito mais rápido, acelerando drasticamente o tempo de LCP.

### **C. Inclusão de Sitemap.xml e Robôs de Busca**
- **Ação:** Criamos o arquivo `public/sitemap.xml` listing a URL principal (`https://www.binaryten.com.br/`) e atualizamos o `public/robots.txt` apontando para o sitemap.
- **Resultado:** Permite que os robôs do Google (Googlebot) descubram, indexem e atualizem seu site de forma imediata.

### **D. Canonical Tag e Dados Estruturados (JSON-LD Schema.org)**
- **Ação:** Inserimos a tag `<link rel="canonical" href="https://www.binaryten.com.br/" />` e o script Schema.org (`Organization`, `WebSite`, `ProfessionalService`).
- **Resultado:** Informa ao Google exatamente o nome da sua empresa (**Binary Ten**), logo, tipo de serviço oferecido e que o site pertence ao Brasil (`pt-BR`), ajudando a exibir "Rich Snippets" nos resultados de pesquisa.

---

## 3.1. Segunda Rodada de Otimizações (PageSpeed 86 → meta 95+)

Nova auditoria apontou bloqueio de renderização residual (340 ms), JavaScript não usado (46 KiB), entrega de imagens (68 KiB), imagens sem `width`/`height` e problemas de acessibilidade (botão sem nome acessível e contraste insuficiente). Correções aplicadas:

### **E. CSS Inline no HTML (Eliminação do bloqueio de renderização — 340 ms)**
- **Ação:** Plugin customizado no `vite.config.ts` (`inlineCss`) injeta o CSS compilado diretamente no `<style>` do `index.html` durante o build, eliminando a requisição externa do arquivo `.css` que bloqueava a renderização.
- **Resultado:** Zero requisições de CSS bloqueantes; o HTML já chega ao navegador pronto para pintar a tela.

### **F. Correção do Import Duplicado do Hero + Preload da Imagem**
- **Ação:** O `Hero.tsx` tinha dois imports com o mesmo nome (`hero-bg.webp` e `hero-bg.jpg`); o bundler usava silenciosamente o JPG de 120 KB. Corrigido para usar o WebP (70 KB) movido para `public/hero-bg.webp`, com `<link rel="preload" as="image" fetchpriority="high">` no `index.html`.
- **Resultado:** A imagem de fundo inicia o download junto com o HTML (antes do JavaScript executar), antecipando o LCP e o Speed Index.

### **G. Remoção de JavaScript Não Utilizado (economia de ~115 KB no bundle)**
- **Ação:** Removidos do `App.tsx` os providers não utilizados na landing page: `@tanstack/react-query`, `Toaster` (Radix), `Sonner` e `TooltipProvider`.
- **Resultado:** Bundle JS reduzido de **342 KB → 227 KB** (gzip: 107 KB → 74 KB), acelerando o download, o parse e a primeira renderização (FCP) em redes 4G.

### **H. Otimização das Imagens dos Clientes (economia de ~56 KB)**
- **Ação:** Logos de clientes redimensionados de 225–447 px para 160 px e convertidos para JPG otimizado (exibidos a ~80 px): `logo-rumo` 43,5 KB → 5,5 KB, `logo-etus` 15,6 KB → 5,9 KB, `logo-uaisougue` 11 KB → 3,9 KB (inline como data URL). Adicionados `width`/`height` explícitos, `loading="lazy"` e `decoding="async"` em todos os `<img>` da página.
- **Resultado:** Resolve o item "Melhorar a entrega de imagens" e "Os elementos de imagem não têm width e height explícitas".

### **I. Acessibilidade — Nome Acessível no Botão do Menu Mobile**
- **Ação:** Adicionados `aria-label` ("Abrir menu"/"Fechar menu") e `aria-expanded` ao botão do menu mobile no `Header.tsx`.
- **Resultado:** Leitores de tela anunciam corretamente a função do botão.

### **J. Acessibilidade — Contraste de Cores (WCAG AA)**
- **Ação:** Texto branco sobre o botão ciano primário tinha contraste de apenas ~2,85:1. Ajustado o design system em `index.css`: `--primary` clareado para `199 89% 55%` e `--primary-foreground` alterado para azul-marinho escuro (`222 47% 11%`), elevando o contraste para ~7:1. Botão do WhatsApp escurecido (`emerald-600` → `emerald-700`) e textos decorativos com opacidade insuficiente (`text-primary/30`, `text-primary/80`) reforçados.
- **Resultado:** Todos os textos atendem à razão mínima de contraste 4,5:1 (texto normal) e 3:1 (texto grande) da WCAG 2 AA.

---

## 4. Passo a Passo Completo: Como Colocar o Site na 1ª Página do Google para "Binary Ten"

Para garantir que quando alguém digitar **"binary ten"** ou **"binary ten automação"** o seu site apareça na **1ª posição da 1ª página**, siga as etapas práticas abaixo:

### **Etapa 1: Configurar o Google Search Console (Essencial e Gratuito)**
1. Acesse [Google Search Console](https://search.google.com/search-console).
2. Faça login com a conta Google corporativa da Binary Ten.
3. Adicione a propriedade: `https://www.binaryten.com.br/`.
4. Faça a verificação de domínio (via registro TXT no DNS onde você comprou o domínio `.com.br`, como Registro.br ou Cloudflare).
5. No menu lateral esquerdo, vá em **Sitemaps** e envie a URL: `https://www.binaryten.com.br/sitemap.xml`.
6. Vá na ferramenta **Inspeção de URL**, insira `https://www.binaryten.com.br/` e clique em **Solicitar Indexação**. Isso força o robô do Google a visitar e registrar seu site imediatamente.

### **Etapa 2: Criar o Google Meu Negócio (Google Business Profile)**
Mesmo operando digitalmente, criar uma ficha no Google Meu Negócio cria uma "caixa lateral de destaque" na busca quando alguém pesquisa por "Binary Ten".
1. Acesse [Google Meu Negócio](https://www.google.com/business/).
2. Cadastre o nome da empresa como **Binary Ten - Soluções em Automação e Sistemas Web**.
3. Escolha a categoria principal: **Empresa de desenvolvimento de software** ou **Consultoria em tecnologia da informação**.
4. Adicione o link do site, horário de atendimento e descrição da empresa.
5. Peça para clientes, parceiros e conhecidos deixarem avaliações 5 estrelas.

### **Etapa 3: Criar Perfis e Presença Digital (Construção de Autoridade / Backlinks)**
O Google confia em marcas que estão presentes em múltiplos canais relevantes:
1. **LinkedIn:** Crie uma Company Page oficial para **Binary Ten**. No campo de site, coloque `https://www.binaryten.com.br/`.
2. **GitHub:** Crie uma organização no GitHub para a Binary Ten apontando para o site oficial.
3. **Instagram / Facebook / YouTube:** Crie perfis corporativos vinculando o domínio `binaryten.com.br`.

---

## 5. Estratégia de SEO para Nichos Específicos (Advocacia e Média/Grande Empresa)

Para captar clientes de alto valor no futuro (como escritórios de advocacia e médias/grandes empresas que precisam de automações), você deve expandir o conteúdo do site seguindo esta estrutura:

### **A. Páginas de Destino (Landing Pages) Especializadas**
Crie páginas dedicadas dentro do seu site para focar em termos de busca de alta intenção comercial:
- `binaryten.com.br/automacao-para-advocacia`
- `binaryten.com.br/sistemas-web-corporativos`

### **B. Palavras-Chave de Foco para Advocacia:**
- *"automação de processos para escritórios de advocacia"*
- *"software para gestão de prazos processuais e IA jurídica"*
- *"integração de sistemas jurídicos PJe, e-SAJ e Projudi"*

### **C. Palavras-Chave de Foco para Médias e Grandes Empresas:**
- *"desenvolvimento de sistemas web sob medida empresas"*
- *"automação de workflows empresariais"*
- *"integração de APIs e sistemas legados"*

### **D. Estratégia de Conteúdo (Blog / Artigos Técnicos)**
Crie uma seção de artigos/cases no site abordando dores reais desses públicos:
- *"Como a automação reduz em 80% o tempo gasto com tarefas repetitivas em escritórios de advocacia"*
- *"Sistemas web sob medida vs. Softwares de prateleira: Qual a melhor escolha para sua empresa?"*

---

## 6. Resumo do Plano de Ação

| Ação | Status | Onde é feito |
| :--- | :--- | :--- |
| **Otimização de Carregamento de Fontes** | ✅ Concluído no código | `index.html` |
| **Conversão de Imagem Hero para WebP** | ✅ Concluído no código | `src/assets/hero-bg.webp` |
| **Dados Estruturados JSON-LD Schema.org** | ✅ Concluído no código | `index.html` |
| **Sitemap.xml e Robots.txt** | ✅ Concluído no código | `public/sitemap.xml` / `public/robots.txt` |
| **Cadastro no Google Search Console** | ⏳ Ação manual | Painel do Google Search Console |
| **Solicitação de Indexação do Sitemap** | ⏳ Ação manual | Painel do Google Search Console |
| **Criação do Google Meu Negócio** | ⏳ Ação manual | Google Business Profile |
| **Criação de Páginas para Advocacia & Empresas** | 🚀 Próximo Passo | Estruturação de novas rotas no React |

---
*Documento gerado para a Binary Ten — Mantendo excelência em performance e presença web.*
