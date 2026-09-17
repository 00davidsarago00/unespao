<!-- Última atualização: 2026-09-17 -->

# 03 — Cenário atual global (2025–2026)

Critérios atendidos: **C2, C4**. Tempo no roteiro: ~3 min.

> **Alimenta:** **Bloco 3 — Hoje I: o ciclo de vida (2023–2026)** (§3.1 a §3.4) e **Bloco 5 — Futuro (2027+)** (§3.5 regulação e §3.6 mercado de trabalho).

## 3.1 Adoção: uso praticamente universal

| Indicador | Valor | Fonte (ano de coleta) |
|---|---|---|
| Profissionais que usam IA no trabalho de software | **90%** (+14 p.p. em relação ao ano anterior); mediana de **2 h/dia** | DORA 2025, ~5.000 respondentes [F-20] |
| Devs que usam ou planejam usar IA no desenvolvimento | **84%** (76% em 2024) | Stack Overflow 2025 [F-23] |
| Devs que usam IA regularmente para programar | **85%**; **62%** usam ao menos um assistente, agente ou editor com IA; **15%** ainda não adotaram | JetBrains 2025, 24.534 devs em 194 países [F-39] |
| Devs profissionais que usam IA **diariamente** | **51%** | Stack Overflow 2025 [F-23] |
| Novos devs no GitHub que usam Copilot na 1ª semana | **~80%** | Octoverse 2025 [F-24] |
| Repositórios públicos que usam SDK de LLM | **1,1 milhão** (+178% em 12 meses) | Octoverse 2025 [F-24] |
| Código novo no Google gerado por IA (e aprovado por engenheiros) | **75%** (abr/2026), contra 50% no outono anterior | Declaração do CEO [F-31] — ver nota de mecanismo abaixo |

## 3.2 Confiança: cai enquanto o uso sobe

**Stack Overflow 2025** [F-23]:
- **Confiança na precisão da IA:** "confia muito" 3,1% e "confia um pouco" 29,6%. Do outro lado, "desconfia
  um pouco" 26,1% e "desconfia muito" 19,6%. Ou seja, **mais gente desconfia (45,7%) do que confia
  (32,7%)**.
- **Favorabilidade:** caiu para **~60%** (59,7%), de mais de 70% em 2023–2024.
- **Maior frustração:** "soluções quase certas, mas não totalmente" (**66%**). Além disso, **45,2%**
  dizem que depurar código gerado por IA toma mais tempo.

**DORA 2025** [F-20]:
- Só **24%** confiam "muito" ou "bastante"; **30%** confiam "pouco" ou "nada".
- Ainda assim, mais de **80%** percebem ganho de produtividade.

**Leitura para a aula:** a adoção **não** é movida por confiança. É movida por pressão competitiva e
conveniência. Isso é um **risco de projeto**: a equipe usa uma ferramenta em cuja saída ela mesma não
confia.

> **Nota de mecanismo sobre os 75% do Google:** é declaração de empresa (N3) sobre uma métrica de
> *proporção de caracteres aceitos*, que inclui autocompletar e código repetitivo. Não significa que
> 75% das **decisões de projeto** sejam da IA. Usar como sinal de escala, nunca como medida de
> autoria ou de qualidade.

## 3.3 Agentes: ainda minoria

- **Stack Overflow 2025** [F-23]: **14,1%** usam agentes diariamente e **9%** semanalmente. **37,9%** não
  planejam adotar.
- **Claude Code (Anthropic, abr/2025)** [F-32]:
  - 79% das conversas são de automação.
  - O padrão "loop de feedback" (a IA faz e o humano corrige) aparece em 35,8% das conversas.
  - Startups respondem por 32,9% das conversas; empresas de grande porte, por 23,8%.
  - Limitação declarada: dado do próprio fornecedor, de usuários pioneiros.

## 3.4 Escala e Brasil

**GitHub** [F-24]:
- Mais de **180 milhões** de desenvolvedores; **36 milhões** novos em 2025.
- **Brasil:** **6,89 milhões** de desenvolvedores, **4º país** do mundo.
- TypeScript passou a ser a linguagem mais usada (ago/2025). O relatório atribui isso em parte à IA,
  porque tipagem torna o código gerado mais confiável.

**Brasil — empresas** (Cetic.br/CGI.br, *TIC Empresas 2025*, 4.174 empresas com 10+ pessoas, coleta
fev/2025–jan/2026) [F-40]:
- Uso de IA nas empresas brasileiras: **13% (2024) → 17% (2025)**.
- Grandes empresas: **38% → 50%**. Pequenas (10 a 49 pessoas): **10% → 15%**.
- O uso que mais cresceu foi **geração de linguagem natural: 20% → 30%**.
- **80%** adquiriram software pronto e **60%** contrataram fornecedor externo; entre as grandes, o
  desenvolvimento interno subiu de 24% para 37%.

**Contraste que vale citar na aula:** no mundo, ~85–90% dos **desenvolvedores** usam IA
[F-20][F-23][F-39]; no Brasil, só **17% das empresas** usam IA em qualquer atividade [F-40]. São
unidades de medida diferentes (pessoa × empresa), e é justamente por isso que a comparação é útil: a
adoção individual vai muito à frente da adoção organizacional.

**Lacuna:** continua sem survey com recorte de uso de LLM por **desenvolvedores brasileiros**. O
JetBrains trata o Brasil como região própria [F-39], mas não publica o recorte de IA por país.

## 3.5 Regulação

- **União Europeia, AI Act** [F-34]:
  - Proibições em vigor desde 02/02/2025.
  - Obrigações para modelos de propósito geral desde 02/08/2025.
  - Sistemas de alto risco: Anexo III a partir de 02/12/2027 e Anexo I a partir de 02/08/2028,
    conforme o cronograma vigente no rastreador consultado.
- **Brasil, PL 2338/2023 (Marco Legal da IA)** [F-35]:
  - Aprovado pelo Plenário do **Senado em 26/12/2024** e remetido à **Câmara em 17/03/2025**.
  - Em 09/2026 segue **em tramitação na Câmara**, sem aprovação final: a ficha registra movimentações
    de apensação de projetos relacionados até 02/09/2026.
  - Ou seja: quem desenvolve software com IA no Brasil ainda opera **sem marco legal específico**, sob
    LGPD e regras setoriais.

## 3.6 Mercado de trabalho

Stanford/ADP (atualização de ago/2026) [F-33]:
- O emprego de trabalhadores de **22 a 25 anos** em ocupações muito expostas à IA está **~19% abaixo**
  do que estaria se tivesse acompanhado ocupações menos expostas.
- **Os autores ressaltam** que são padrões descritivos, **não estimativas causais**, e que a diferença
  diminui quando se controla por escolaridade.

**Leitura para a aula:** o público desta sala é exatamente essa faixa etária. É um ponto de engajamento
com a turma (critério C6), não uma conclusão alarmista.
