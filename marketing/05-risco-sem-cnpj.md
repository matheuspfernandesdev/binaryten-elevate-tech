# 05 — Risco de operar sem CNPJ

> Isto é análise de negócio, não parecer contábil/jurídico. Antes de abrir empresa, validar números e CNAEs com um contador. Dados de out/2026.

---

## 1. Veredito

Você está **parcialmente certo**. Para landing pages de R$ 399–1.200 vendidas a pequenos negócios e autônomos, **a falta de CNPJ quase não afeta a captação** — esse público raramente pergunta, e muitos deles também são PF ou MEI. O impacto maior não é de imagem, é **fiscal, comercial (B2B) e operacional**, e cresce conforme você fatura e sobe de ticket.

| Dimensão | Impacto hoje (landing pages, baixo volume) | Impacto ao crescer / vender sistemas e automações |
|---|---|---|
| Percepção de amadorismo para o cliente final | **Baixo** | Médio |
| Clientes que exigem nota fiscal | Baixo–médio (escritórios, clínicas maiores, indústria pedem) | **Alto** (empresa média/grande quase sempre exige NF e cadastro de fornecedor) |
| Custo tributário | Depende de você ter ou não salário CLT (ver seção 3) | **Alto** se continuar como PF |
| Ferramentas (Meta Business verificado, WhatsApp API em escala, gateways com limites maiores) | Baixo | Médio |
| Proteção da marca e do patrimônio | Médio | Médio–alto |

Conclusão prática: **não precisa travar a divulgação por causa do CNPJ**, mas defina hoje os **gatilhos** para abrir (seção 5), porque o prazo de abertura + escolha certa de CNAE leva algumas semanas.

---

## 2. Percepção e marketing

### O que realmente passa amadorismo (mais que a falta de CNPJ)
- Site sem exemplos, sem rosto, com promessas genéricas (arquivo 04).
- E-mail que não existe (`contato@` hoje).
- WhatsApp pessoal misturado.
- Contrato inexistente ou improvisado.
- Não ter forma de pagamento com cartão.

Tudo isso é resolvível sem CNPJ.

### Como comunicar sendo PF (sem mentir e sem se diminuir)
- Marca "founder-led": **"Binary Ten, estúdio de software do Matheus Pires."** Atendimento direto com quem faz vira o argumento de venda (agências põem estagiário no seu projeto; aqui é o engenheiro sênior).
- Usar "nós/a gente" é aceitável como voz de marca, mas **não inventar equipe**, endereço comercial ou números de empresa.
- No FAQ, uma pergunta do tipo "Preciso ter CNPJ para contratar?" → "Não". Se perguntarem do seu lado: "Atendo como profissional autônomo e emito recibo; para quem precisa de nota fiscal, me avise antes que a gente combina." (ver opções na seção 4).
- Footer: mostrar nome do responsável e cidade. Para venda online de serviço, o Decreto 7.962/2013 (comércio eletrônico) pede identificação do fornecedor (nome e CPF/CNPJ, endereço). Como a contratação acontece pelo WhatsApp e por contrato, e não por checkout no site, há margem de interpretação — mas é exatamente o tipo de coisa que um CNPJ resolve sem expor seu CPF publicamente. Enquanto PF, coloque a identificação completa **no contrato e na proposta**.

### Plataformas
- **Instagram/Google Business Profile**: funcionam sem CNPJ.
- **Meta Business – verificação de empresa** (útil para WhatsApp Cloud API com limites maiores, selo e anúncios com mais estabilidade): normalmente pede documento empresarial. Sem CNPJ você fica no limite básico — suficiente para a fase atual.
- **Gateways de pagamento** (Mercado Pago, InfinitePay, PagBank, Asaas): aceitam CPF, com limites e taxas às vezes piores.
- **Domínio `.com.br`**: já está registrado (provavelmente no seu CPF). Ao abrir CNPJ, pode transferir a titularidade no Registro.br.

---

## 3. Tributação: PF x CNPJ

### 3.1 MEI não é opção para você
- Desenvolvimento de software/sites **não está na lista de ocupações permitidas do MEI** (467 ocupações em 2026; "web designer" e "desenvolvedor" não constam).
- Abrir MEI com uma ocupação "parecida" que não corresponde ao que você faz é **enquadramento indevido**: risco de desenquadramento retroativo e cobrança de diferenças. Não recomendado.
- O teto do MEI continua R$ 81 mil/ano em 2026 (o PLP que sobe para R$ 130 mil ainda não foi sancionado na data desta pesquisa). Mesmo que suba, a atividade continua vedada.

### 3.2 Como PF (autônomo)
- **Recebendo de pessoa física**: carnê-leão mensal (tabela progressiva).
  - **Desde jan/2026 (Lei 15.270/2025)** há redução que zera o IR para rendimentos tributáveis de até **R$ 5.000/mês**, com redução parcial até R$ 7.350.
  - **Mas**: se você também tem **salário CLT**, na declaração anual tudo é somado — a renda freelance acaba tributada na alíquota marginal do seu salário (provavelmente **27,5%**).
- **Recebendo de pessoa jurídica (RPA)**: a empresa retém IR na fonte e INSS (11%) e **paga 20% de INSS patronal sobre o seu RPA**. Ou seja, você fica **mais caro para clientes PJ** que um concorrente com CNPJ — motivo comum de clientes empresariais preferirem quem emite nota.
- **INSS** como contribuinte individual (opcional para quem já contribui via CLT; necessário para quem não tem outro vínculo, para aposentadoria/benefícios).
- **ISS**: autônomo deveria ter inscrição municipal (em BH, cadastro como autônomo na Prefeitura). Muitos ignoram; é risco baixo no seu volume, mas existe.
- **Recibo**: sempre emitir, guardar e declarar.

### 3.3 Como ME no Simples Nacional
- CNAEs típicos: **6201-5/01** (desenvolvimento de programas sob encomenda), **6311-9/00** (hospedagem/tratamento de dados) e, se fizer design/marketing, avaliar CNAE complementar com o contador.
- Desenvolvimento de software cai no **Anexo V (alíquota inicial 15,5%)**, mas com **Fator R ≥ 28%** (pró-labore ≥ 28% do faturamento) vai para o **Anexo III (alíquota inicial 6%)**.
- Custos fixos: contador online (~R$ 100–300/mês), INSS sobre pró-labore (11%), eventuais taxas municipais.
- Distribuição de lucros: isenta de IR na pessoa física (a nova retenção de 10% sobre dividendos da Lei 15.270 só incide acima de R$ 50 mil/mês por empresa — irrelevante no seu porte).
- Emite NFS-e (padrão nacional) → atende clientes PJ sem fricção.
- Reforma tributária (CBS/IBS): 2026 é ano de teste; o Simples segue com regras próprias na transição. Acompanhar com o contador a partir de 2027.

### 3.4 Exemplo ilustrativo (faturamento R$ 4.000/mês, valores aproximados)

| Cenário | Imposto/encargos aproximados | Observação |
|---|---|---|
| PF, **sem CLT**, clientes PF | IR ≈ R$ 0 (redução até R$ 5 mil) + INSS se contribuir | **Mais barato** nesse nível |
| PF, **com CLT**, clientes PF | IR ≈ até 27,5% do lucro no ajuste anual (≈ R$ 1.000+) | Caro |
| ME Simples, Fator R (Anexo III) | 6% (R$ 240) + INSS do pró-labore de R$ 1.120 (≈ R$ 123) + contador (≈ R$ 150–250) ≈ **R$ 510–610** | Previsível, emite NF |
| ME Simples, sem Fator R (Anexo V) | 15,5% (R$ 620) + contador ≈ **R$ 770–870** | Pior caso do Simples |

Leitura: **sem CLT e faturando pouco**, ficar PF é mais barato; **com CLT** ou faturando acima de ~R$ 5–6 mil/mês, o CNPJ tende a compensar rapidamente. Confirmar com contador usando seus números reais.

---

## 4. Riscos de operar como PF (além de imposto)

1. **Responsabilidade ilimitada**: problema com cliente (atraso, site fora do ar, dado vazado) atinge seu patrimônio pessoal. Mitigação: contrato com **limite de responsabilidade**, escopo claro, SLA realista. (Uma ME/SLU também não blinda tudo, mas separa melhor.)
2. **Perder clientes PJ** que exigem nota ou que não querem pagar 20% de INSS patronal no RPA.
3. **Marca**: alguém pode registrar "Binary Ten" no INPI antes de você. PF pode registrar marca se comprovar que exerce a atividade (LPI, art. 128) — vale fazer uma busca no INPI agora e considerar o depósito (taxa com desconto para PF; algumas centenas de reais).
4. **Mistura financeira**: dinheiro da empresa na conta pessoal dificulta saber se o negócio dá lucro. Mitigação imediata: conta separada (mesmo PF) só para a Binary Ten.
5. **Hospedagem dos clientes no seu nome/cartão**: se você gerencia a infraestrutura (como diz o FAQ), qualquer problema de cobrança ou termos de uso do provedor recai sobre você pessoalmente. Documentar no contrato.
6. **Fiscal**: receita não declarada (Pix recebido sem declarar) é cruzada pela Receita com dados das instituições de pagamento. Declarar tudo.

---

## 5. Gatilhos para abrir o CNPJ

Abra quando **qualquer um** acontecer:
- [ ] Faturamento recorrente acima de **~R$ 5 mil/mês** por 2–3 meses (ou acima de ~R$ 2–3 mil se você tem CLT).
- [ ] Primeiro cliente que **exige nota fiscal** e não aceita RPA — ou perda de um negócio por isso.
- [ ] Início da venda ativa de **sistemas e automações** para empresas (ticket alto, contratos B2B).
- [ ] Necessidade de **Meta Business verificado** / WhatsApp Cloud API com volume.
- [ ] Decisão de contratar alguém ou terceirizar parte do trabalho.

Prazo prático: 1–3 semanas com contador online (Contabilizei, Agilize e similares abrem a empresa, muitas vezes sem custo de abertura, cobrando mensalidade). Natureza jurídica mais comum: **Sociedade Limitada Unipessoal (SLU)**, sem capital mínimo.

---

## 6. O que fazer agora (sem CNPJ)

- [ ] **Contrato padrão** de prestação de serviço PF: escopo, prazo, pagamento (50/50), rodadas de ajuste, propriedade do código/conteúdo, hospedagem (quem paga, por quanto tempo, renovação), limite de responsabilidade, LGPD, foro.
- [ ] **Recibo** para todo pagamento + declarar via carnê-leão.
- [ ] **Conta bancária separada** para a Binary Ten.
- [ ] Gateway de pagamento PF para aceitar cartão/parcelado.
- [ ] Busca de marca no INPI; avaliar depósito.
- [ ] Planilha simples de faturamento mensal para acompanhar os gatilhos da seção 5.
- [ ] Conversa de 30 min com um contador para validar: (a) seu caso com/sem CLT, (b) CNAEs, (c) Fator R, (d) ISS em BH.
- [ ] No site/FAQ: "Não precisa ter CNPJ para contratar" e identificação completa no contrato e na proposta.
