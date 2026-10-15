# 02 — WhatsApp e E-mail

> Pesquisa feita em out/2026. Preços da Meta e planos gratuitos mudam com frequência — revalidar antes de implementar.

---

## 1. Resumo

- **WhatsApp é o canal certo** para o público de landing pages no Brasil. Você não está errado. Só um ajuste: o que passa confiança não é "ter um número da empresa" em si, e sim um **perfil comercial completo, resposta rápida e consistência** (mesmo número no site, no Instagram, no Google e nas propostas).
- **Dois chips + WhatsApp Business no segundo chip resolve** o começo. Custo zero, risco zero.
- **Ferramentas não oficiais (Evolution API em modo Baileys, WAHA, whatsapp-web.js, Z-API) têm risco real de banimento**, e o risco é **máximo** justamente no seu caso de uso (mandar mensagem para quem nunca falou com você). Recomendação: não usar para prospecção.
- **Correção importante: o Resend proíbe cold outreach.** A política de uso aceitável diz literalmente: proibido enviar mensagens não solicitadas, *incluindo cold outreach, listas compradas ou contatos raspados*. Use o Resend para e-mail transacional (resposta a quem te procurou, notificação de formulário, confirmação), não para prospecção.
- **Caixa de entrada grátis**: a combinação **Cloudflare Email Routing (receber) + Gmail (ler no celular) + Resend SMTP (enviar como contato@)** é mais robusta que o Zoho Free e custa zero. Zoho Free continua sendo um plano B válido.

---

## 2. WhatsApp

### 2.1 Setup recomendado agora

1. Chip pré-pago novo no segundo slot (ou eSIM). Android e iPhone permitem **WhatsApp (pessoal) e WhatsApp Business (empresa) lado a lado** com números diferentes.
2. Instalar **WhatsApp Business** com o chip novo.
3. **Atenção ao chip pré-pago**: operadoras desativam e reciclam números sem recarga (geralmente após 90–180 dias sem uso/recarga). Se o número for reciclado, outra pessoa pode registrar seu WhatsApp. Faça recargas mínimas periódicas e ative **verificação em duas etapas** (PIN) no WhatsApp.
4. Atualizar o número em: site (hoje está fixo `5531996749066` em `Contact.tsx`, `LpHero.tsx`, `LpPricing.tsx`, `LpCta.tsx` — centralizar em uma constante), Instagram, Google Business Profile, assinatura de e-mail.

> Se o número atual do site (`31 99674-9066`) já é o seu pessoal, decidir agora: migrar para o novo antes da divulgação é muito mais fácil do que depois.

### 2.2 Perfil comercial que passa confiança

- Nome: **Binary Ten** (não "Matheus Dev").
- Foto: logo (mesma do Instagram).
- Categoria: Serviços de TI / Design de sites.
- Descrição: "Sites profissionais para negócios locais. No ar em 4 dias. Por Matheus Pires."
- Horário comercial, e-mail `contato@binaryten.com.br`, site `binaryten.com.br/landing-pages`.
- **Catálogo** com 3 itens (os pacotes de landing page) com preço — reduz a pergunta "quanto custa?" e filtra curioso.
- **Mensagem de saudação** (dispara no primeiro contato):
  > "Oi! Aqui é o Matheus, da Binary Ten 👋 Já vou te responder. Para agilizar: qual é o seu negócio e você já tem site hoje?"
- **Mensagem de ausência** (fora do horário): "Recebi sua mensagem! Respondo amanhã a partir das 9h."
- **Respostas rápidas** (`/preco`, `/prazo`, `/portfolio`, `/como-funciona`, `/pagamento`).
- **Etiquetas** como mini-CRM: `Novo lead`, `Prospecção enviada`, `Respondeu`, `Orçamento enviado`, `Fechado`, `Perdido`.

Isso tudo é grátis no app e cobre 100% da necessidade até ~30–50 conversas ativas por semana.

### 2.3 Opções de automação comparadas

| Opção | Custo | Risco de ban | Serve para prospecção fria? | Comentário |
|---|---|---|---|---|
| **App Business manual + links `wa.me`** | R$ 0 | Muito baixo (só por denúncias) | **Sim, a melhor opção para você** | Ver "semi-automação" abaixo |
| **Cloud API oficial (Meta)** + Coexistência | Plataforma grátis; paga por mensagem template | Nenhum por "uso de API"; pode ter qualidade rebaixada por denúncias | **Não**, exige opt-in | Ótima para responder leads que chegam e para lembretes |
| **Evolution API em modo Cloud API** | R$ 0 (self-host) + tarifas Meta | Igual à Cloud API | Não | Evolution também suporta o conector oficial; serve como gateway |
| **Evolution/Baileys/WAHA (não oficial)** | R$ 0 (self-host) | **Alto**, permanente, sem recurso | Tecnicamente sim, na prática é como queimar o número | Viola os Termos do WhatsApp; risco subiu muito desde 2025; Baileys teve CVE em 2026 |
| **Z-API e similares pagos (não oficiais)** | ~R$ 100+/mês | Alto (mesmo protocolo não oficial) | Idem | Pagar não reduz o risco, só terceiriza a infraestrutura |

#### Por que não oficial é ruim para o seu caso
O principal gatilho de banimento não é "usar API", é **comportamento**: muitas mensagens para quem não te tem salvo, padrões repetitivos, denúncias e bloqueios. Prospecção fria tem exatamente esse perfil. Um banimento queima o número que está no seu site, no Instagram e nas propostas — o prejuízo é muito maior que o ganho de automação.

#### Por que a API oficial também não resolve prospecção fria
- Mensagem iniciada pela empresa precisa ser um **template aprovado** e a política do WhatsApp Business exige **opt-in** (a pessoa aceitou receber mensagens suas). Telefone tirado do Google Maps não é opt-in.
- Templates de marketing no Brasil custam **~R$ 0,32 por mensagem** (tabela Meta 2026, cobrança em BRL). Utility ~R$ 0,035.
- **A partir de 01/10/2026**, mensagens de serviço (resposta dentro da janela de 24h após o cliente falar) passaram a ser cobradas a ~R$ 0,035 **após 1.000 grátis por número/mês**. No seu volume, continua efetivamente grátis.

#### Onde a API oficial vale a pena (fase 2)
- **Coexistência**: desde 2025 a Meta permite usar **o mesmo número no app Business do celular e na Cloud API ao mesmo tempo**. Você continua conversando pelo celular e uma automação lê/responde em paralelo (registro via Embedded Signup, normalmente por um provedor/BSP — verificar requisitos atuais na documentação da Meta antes).
- Casos de uso bons: resposta automática qualificadora para quem chega pelo site, envio do PDF de proposta, lembrete de reunião, aviso "seu site está no ar" (utility), integração com seu CRM/Postgres.
- Verificação de empresa no Meta Business costuma exigir documento da empresa (CNPJ) — ver `05-risco-sem-cnpj.md`.

### 2.4 Semi-automação: o melhor dos dois mundos para prospecção

A automação faz **tudo menos o envio**; o envio é um toque seu.

```
Lead qualificado (arquivo 03)
  → IA gera mensagem personalizada (cita o negócio e 1 problema real do site/perfil)
  → sistema gera link: https://wa.me/55DDDNUMERO?text=<mensagem url-encoded>
  → lista diária no seu painel/Telegram/planilha: 10–20 links
  → você toca no link no celular → WhatsApp Business abre com o texto pronto
  → revisa em 5 segundos → envia
  → marca etiqueta "Prospecção enviada"
```

Por que funciona:
- Não existe automação de protocolo → nada para o WhatsApp detectar como bot.
- Você lê cada mensagem → evita gafe da IA.
- 15 mensagens/dia ≈ 10 minutos.
- Ritmo humano naturalmente baixo.

Boas práticas para não ser denunciado:
- No máximo **15–25 primeiras mensagens por dia**, aumentando aos poucos nas primeiras semanas (número novo precisa "aquecer": use-o normalmente, converse com conhecidos, receba mensagens).
- Mensagem curta, personalizada, **sem link na primeira mensagem** (links em primeira mensagem de desconhecido elevam denúncia).
- Sempre dar saída: "Se não fizer sentido, é só me falar que não mando mais."
- **Máximo 2 follow-ups**. Sem resposta depois disso, encerrar.
- Nunca mandar para pessoa física/celular pessoal claramente não comercial.
- Preferir números que aparecem como **contato comercial** no Google/Instagram do negócio.

Templates de primeira mensagem: ver `03-captacao-de-leads.md`.

---

## 3. E-mail

### 3.1 O que você quer
1. Endereço `contato@binaryten.com.br`.
2. Ler e responder pelo celular.
3. Enviar automações via Resend.
4. Custo zero.

> **Urgente**: o site já exibe `contato@binaryten.com.br` no footer e nos botões, mas a caixa não existe. E-mails enviados hoje estão voltando ou se perdendo.

### 3.2 Opção A (recomendada): Cloudflare Email Routing + Gmail + Resend SMTP

| Peça | Função | Custo |
|---|---|---|
| **Cloudflare Email Routing** | Recebe `contato@` (e quantos aliases quiser, ex.: `matheus@`, `financeiro@`) e encaminha para seu Gmail | R$ 0 |
| **Gmail** (conta dedicada, ex.: `binaryten.contato@gmail.com`) | Caixa de entrada, app no celular, busca, filtro anti-spam excelente | R$ 0 |
| **Gmail "Enviar e-mail como"** usando SMTP do Resend | Responder do Gmail **como** `contato@binaryten.com.br` | R$ 0 (plano free do Resend) |
| **Resend API** | Automações (notificação de formulário, auto-resposta, envio de proposta) | R$ 0 até 100 e-mails/dia |

Vantagens sobre o Zoho Free: app do Gmail (melhor que o do Zoho), sem limite de 5 GB por usuário (15 GB do Google), aliases ilimitados, e **a mesma infraestrutura de envio** (Resend) para manual e automático → um único SPF/DKIM para manter.

Configuração resumida:
1. Mover os nameservers do domínio (`registro.br`) para a Cloudflare (gratuito). Recriar antes os registros DNS existentes do site — conferir onde o site está hospedado para não derrubá-lo.
2. Cloudflare → Email → Email Routing → criar `contato@binaryten.com.br` → destino: seu Gmail. A Cloudflare cria os MX e o SPF de recebimento.
3. Resend → adicionar domínio `binaryten.com.br` → criar os registros DKIM/SPF que ele indicar (o Resend usa um subdomínio tipo `send.binaryten.com.br` para o MAIL FROM, sem conflito com os MX da Cloudflare).
4. Gmail → Configurações → Contas → "Enviar e-mail como" → `contato@binaryten.com.br` → SMTP `smtp.resend.com`, porta 465 (SSL) ou 587 (TLS), usuário `resend`, senha = API key do Resend (criar uma key só com permissão de envio).
5. Marcar "responder do mesmo endereço para o qual a mensagem foi enviada".
6. Publicar **DMARC** começando em monitoramento: `v=DMARC1; p=none; rua=mailto:dmarc@binaryten.com.br` → depois de 2–4 semanas sem problemas, subir para `p=quarantine`.
7. Testar com mail-tester.com (meta: 9+/10).

Limitações:
- Plano free do Resend: **100 e-mails/dia**, 3 domínios, inbound incluído, 1 webhook. Suficiente para operação solo.
- Encaminhamento pode, raramente, falhar com remetentes com DMARC muito estrito; a Cloudflare usa SRS para mitigar. Monitorar no início.
- Se não quiser mover o DNS para a Cloudflare: **ImprovMX** (free, encaminhamento) faz o mesmo papel com menos aliases.

### 3.3 Opção B: Zoho Mail Forever Free

- Até 5 usuários, 5 GB por usuário, 1 domínio, webmail + app mobile.
- **Sem IMAP/POP no plano grátis** → não dá para ler no Gmail/Outlook, só no app do Zoho.
- Plano free disponível "em regiões selecionadas" — a página de cadastro às vezes esconde a opção free; procurar o link "Forever Free".
- Funciona bem; é a escolha se você quiser uma caixa "de verdade" separada do Google.
- Para enviar automações, continua usando o Resend no mesmo domínio (sem conflito: Zoho cuida dos MX, Resend usa o subdomínio de envio).

Não use as duas (Zoho e Cloudflare Routing) no domínio raiz ao mesmo tempo — os MX conflitam.

### 3.4 Resend: para que usar (e para que não usar)

Usar para:
- Notificação para você quando alguém preencher o formulário do site.
- Auto-resposta ao lead que preencheu: "Recebi seu pedido, te chamo no WhatsApp em até 2h."
- Envio de proposta/contrato para quem pediu.
- E-mail de "seu site está no ar" + dados de acesso.
- Respostas manuais via Gmail (SMTP).

**Não usar para**:
- Prospecção fria / e-mails para contatos tirados do Google Maps → viola a política de uso do Resend e pode suspender sua conta **e prejudicar a reputação do seu domínio principal**.

### 3.5 E-mail frio, se decidir fazer

Prospecção por e-mail B2B é legal no Brasil sob legítimo interesse da LGPD (ver arquivo 03), mas:
- Faça **1:1, manual ou semiautomático, em volume baixo (≤ 20/dia)**, a partir de uma caixa normal (Gmail/Zoho), não de API transacional.
- Idealmente em um **domínio secundário** (ex.: `binaryten.com` ou `usebinaryten.com.br`, ~R$ 40/ano) para proteger a reputação de `binaryten.com.br`, com SPF/DKIM/DMARC configurados e aquecimento de 2–3 semanas.
- Texto simples, sem imagem, 1 link no máximo, opção clara de "não quero receber".
- Na prática, para dono de clínica/escritório pequeno, **WhatsApp e Instagram DM respondem muito mais que e-mail**. E-mail faz mais sentido para indústria/B2B e escritórios maiores.

---

## 4. Checklist

- [ ] Comprar chip, instalar WhatsApp Business, ativar PIN de duas etapas.
- [ ] Preencher perfil comercial, catálogo, saudação, ausência, respostas rápidas, etiquetas.
- [ ] Centralizar o número do WhatsApp em uma constante no site e atualizar.
- [ ] Criar Gmail dedicado.
- [ ] Mover DNS para Cloudflare (cuidado com os registros do site) e configurar Email Routing.
- [ ] Verificar domínio no Resend (DKIM/SPF), configurar "Enviar como" no Gmail.
- [ ] DMARC `p=none` → `p=quarantine`.
- [ ] Testar envio e recebimento (mail-tester.com, envio para Outlook/Hotmail também).
- [ ] Fase 2: avaliar Cloud API com Coexistência quando houver volume de leads entrando (e CNPJ).
