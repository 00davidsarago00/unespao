<!-- Última atualização: 2026-09-17 -->

# Deck do seminário — especificação de montagem no Canva

Entregável da tarefa **GP-02**. Este arquivo é a **fonte**: o Canva é só a renderização. Todo número
aqui vem de `../docs/` e traz o ID da fonte (`../docs/99-fontes.md`).

- **Conteúdo:** `../docs/08-roteiro-aula.md` (blocos e tempos) e `../docs/01`–`07`.
- **Estilo visual:** derivado do protótipo React do Unespão
  (`../../engenharia-software-2-2026/src/`), para o seminário ter a mesma identidade das outras
  entregas do grupo.
- **29 slides / 23 min**, sendo 26 de conteúdo, 2 divisores e 1 de referências.

**Mapa bloco do roteiro → slides** (os 8 blocos de `../docs/08-roteiro-aula.md`, na mesma ordem):

| Bloco | Tempo | Slides |
|---|---|---|
| 1. Abertura | 1,0 min | S1–S3 |
| 2. O que é | 3,0 min | S4–S6 |
| 3. Histórico | 3,0 min | S7–S9 |
| 4. Cenário atual | 3,0 min | S10–S13 |
| 5. Funciona × não funciona | 5,0 min | S14–S20 |
| 6. Conexão com GP | 4,0 min | S21–S25 |
| 7. Caso Unespão | 2,5 min | S26 |
| 8. Tendências e fechamento | 1,5 min | S27–S28 |
| — Referências (projetado nas perguntas) | — | S29 |

---

# Parte I — Especificações técnicas

## 1. Documento

| Item | Valor |
|---|---|
| Formato | 16:9, **1920 × 1080 px** (Canva: *Criar design → Tamanho personalizado → 1920 × 1080 px*) |
| Margem de segurança | **96 px** em todos os lados. Nada de texto fora dela |
| Coluna de conteúdo | 1728 px úteis; grid de **12 colunas**, medianiz de 24 px |
| Altura do bloco de título | 180 px a partir do topo da margem |
| Rodapé | faixa de 64 px na base: fonte à esquerda, número do slide à direita |
| Exportação | PDF Padrão (impressão/backup) + apresentação pelo próprio Canva |

## 2. Paleta

Cores extraídas do protótipo (valores reais usados em `src/components/*.tsx`). No Canva, cadastrar em
*Marca → Kit da marca → Cores*, nesta ordem.

| Papel | Hex | Uso |
|---|---|---|
| **Marrom-pão (primária)** | `#3E2512` | Títulos, texto de destaque, fundo dos slides escuros |
| Marrom profundo | `#2A180B` | Fundo dos divisores de seção |
| **Dourado Unespão (acento)** | `#DE9E1E` | Barra de acento, números-destaque, ícones, realces |
| Dourado escuro | `#9B6F26` | Texto sobre fundo claro quando o dourado puro não tem contraste |
| Dourado claro | `#E5A823` | Hover, segundo tom de gráfico |
| **Creme (fundo padrão)** | `#FAF6EF` | Fundo da maioria dos slides |
| Creme 2 | `#F2EADB` | Fundo de cartões sobre o creme |
| Areia | `#EADBCA` | Bordas, linhas de tabela, divisórias |
| Areia escura | `#E0D3C1` | Bordas de cartão sobre fundo claro |
| **Texto secundário** | `#75604C` | Legendas, rodapé, limitações de estudo |
| Marca do logo | `#BC8D4F` | Só no logo; não usar como cor de texto |

**Cores semânticas** (usar com parcimônia, só nas tabelas "funciona × não funciona"):

| Papel | Hex | Uso |
|---|---|---|
| Positivo | `#2F6B4F` | Ganho medido, prática recomendada |
| Negativo | `#A33A2A` | Prejuízo medido, incidente |
| Neutro/incerto | `#75604C` | Percepção, evidência fraca |

**Contraste** (WCAG AA, conferido): `#3E2512` sobre `#FAF6EF` e `#FAF6EF` sobre `#3E2512` passam com
folga. **`#DE9E1E` sobre creme não passa em texto pequeno** — dourado só em texto ≥ 40 px em negrito,
em elementos gráficos, ou sobre o marrom escuro.

## 3. Tipografia

Ambas existem no Canva. Se não aparecerem: *Plus Jakarta Sans* → **Poppins**; *Space Grotesk* →
**Archivo**.

| Estilo | Fonte | Tamanho | Peso | Cor | Espaçamento |
|---|---|---|---|---|---|
| Título de capa | Space Grotesk | 96 px | Bold (700) | `#3E2512` | Entrelinha 1,05 |
| Título de slide | Space Grotesk | 54 px | Bold | `#3E2512` | Entrelinha 1,15 |
| Título de divisor | Space Grotesk | 72 px | Bold | `#FAF6EF` | Entrelinha 1,1 |
| Kicker (etiqueta acima do título) | Space Grotesk | 18 px | Bold, CAIXA ALTA | `#9B6F26` | Entreletra +8% |
| Número-destaque | Space Grotesk | 120 px | Bold | `#DE9E1E` ou `#3E2512` | Entrelinha 1,0 |
| Corpo / bullet | Plus Jakarta Sans | 30 px | Regular (400) | `#3E2512` | Entrelinha 1,45 |
| Corpo em destaque | Plus Jakarta Sans | 30 px | Bold (700) | `#3E2512` | — |
| Texto de tabela | Plus Jakarta Sans | 24 px | 400 / 600 no cabeçalho | `#3E2512` | Entrelinha 1,3 |
| Legenda / limitação | Plus Jakarta Sans | 20 px | Regular, itálico | `#75604C` | Entrelinha 1,35 |
| Rodapé de fonte | Plus Jakarta Sans | 18 px | Medium (500) | `#75604C` | — |

**Regra dura:** no máximo **6 linhas de texto** por slide e **12 palavras** por linha. O que não couber
vai para as notas do apresentador.

## 4. Componentes (montar uma vez e duplicar)

1. **Cartão.** Retângulo `#F2EADB`, cantos **16 px**, borda 1 px `#E0D3C1`, padding interno 32 px,
   sombra suave (Canva: *Sombra → Brilho suave*, desfoque 24, transparência 15%, deslocamento Y 6).
2. **Barra de acento.** Retângulo de **6 × 64 px** em `#DE9E1E`, cantos arredondados, à esquerda do
   título do slide. É o elemento que dá unidade ao deck.
3. **Etiqueta (badge).** Retângulo `#3E2512`, cantos 999 px (pílula), texto `#FAF6EF` 18 px caixa alta.
   Variante clara: fundo `#EADBCA`, texto `#3E2512`.
4. **Rodapé de fonte.** Texto 18 px `#75604C` no formato `Fonte: METR, 2025 [F-15]`. **Todo slide com
   número tem um.**
5. **Tabela.** Sem grade externa. Cabeçalho com fundo `#3E2512` e texto `#FAF6EF`; linhas alternadas
   `#FAF6EF` / `#F2EADB`; separadores 1 px `#EADBCA`; altura mínima de linha 56 px.
6. **Marca-d'água do número do slide.** Canto inferior direito, Space Grotesk 18 px `#75604C`.

## 5. Grades de layout usadas

- **L1 — Capa:** logo no topo, título centralizado à esquerda, faixa dourada de 12 px na base.
- **L2 — Título + conteúdo:** barra de acento + kicker + título (topo), conteúdo em 12 colunas.
- **L3 — Duas colunas:** 6 + 6 colunas, medianiz de 48 px. Para "de um lado × do outro".
- **L4 — Número-destaque:** número enorme à esquerda (5 colunas), explicação à direita (7 colunas).
- **L5 — Divisor de seção:** fundo `#2A180B`, título centralizado, barra dourada acima.
- **L6 — Tabela cheia:** título curto no topo, tabela ocupando o resto.
- **L7 — Linha do tempo:** eixo horizontal 4 px `#EADBCA` com marcos em círculos de 16 px `#DE9E1E`.

## 6. Imagens e ícones

- **Logo:** `../../engenharia-software-2-2026/unespao_logo.svg` (enviar no Canva em *Uploads*).
  Altura de 64 px na capa e 28 px no rodapé dos divisores.
- **Ícones:** usar um único conjunto de linha, espessura fina, cor `#3E2512` ou `#DE9E1E`. Não misturar
  ícones preenchidos com vazados.
- **Proibido:** foto de banco de imagens de "robô", "cérebro digital" ou "mão de robô apertando mão
  humana". O deck é de pesquisa; a ilustração é o dado.
- **Gráficos:** montar com as formas do Canva nas cores da paleta, não com o gerador automático de
  gráfico, que traz outra paleta.

## 7. Acessibilidade e sala de aula

- Menor texto projetado: **20 px** (só legenda). Corpo nunca abaixo de 28 px.
- Não usar cor como único código: sempre acompanhar de rótulo ("ganho medido" / "percepção").
- Cada slide precisa ser legível a 6 m da tela: teste reduzindo o Canva a 25% de zoom; se não dá para
  ler o título e o número principal, está pequeno.

---

# Parte II — Os 29 slides

Convenções de cada ficha: **Layout** (L1–L7), **Conteúdo** (texto exato do slide), **Visual**,
**Rodapé** (fonte) e **Notas** (roteiro de fala, vai no campo de notas do Canva, não na tela).

---

## S1 — Capa
- **Layout:** L1. Fundo `#FAF6EF`.
- **Conteúdo:**
  - Kicker: `GESTÃO DE PROJETOS · UNESP 2026 · SEMINÁRIO`
  - Título (96 px): `LLM e o Desenvolvimento de Software`
  - Subtítulo (30 px, `#75604C`): `O que a evidência mostra que funciona — e o que não funciona`
  - Autores (24 px): `David Sarago · Guilherme Molina · Lucas Costa · Thiago Mitsuo`
- **Visual:** logo do Unespão no topo (64 px); faixa `#DE9E1E` de 12 px colada na base do slide.
- **Notas:** ⚠ confirmar os nomes com o grupo antes de apresentar (GP-02, Perguntas em aberto).

## S2 — O que vamos ver
- **Layout:** L2, lista em 2 colunas.
- **Conteúdo:** título `O caminho de hoje` e 6 itens numerados:
  `1. O que é` · `2. Como chegamos aqui` · `3. Onde o mundo está` · `4. O que funciona e o que não`
  · `5. O que isso muda na gestão de projetos` · `6. O que aconteceu conosco`
- **Visual:** número de cada item em Space Grotesk 40 px `#DE9E1E`.
- **Notas:** 15 s. Anunciar que o bloco 4 é o coração da apresentação.

## S3 — Pergunta para a turma
- **Layout:** L4 (número-destaque vazio, preenchido na hora).
- **Conteúdo:**
  - Título: `Antes de começar`
  - Pergunta (54 px, centralizada): `Quem usou IA para programar esta semana?`
  - Segunda linha (40 px, `#9B6F26`): `Quanto acham que ganharam de velocidade?`
  - Caixa vazia rotulada `resposta da turma: ____%`
- **Visual:** cartão grande e vazio no centro, para anotar a resposta ao vivo (à mão, se impresso; ou
  só memorizar).
- **Notas:** anotar o número que a turma disser. Ele volta no S15. Não comentar nada agora — a
  surpresa é o efeito.

## S4 — O que é um LLM
- **Layout:** L2.
- **Conteúdo:**
  - Kicker: `1. O QUE É`
  - Título: `Um modelo que prevê texto — e código é texto`
  - 3 bullets:
    - `Arquitetura Transformer (2017) tornou viável treinar em escala [F-01]`
    - `Codex (2021): primeiro modelo treinado em código público a virar produto [F-02]`
    - `Resolvia 28,8% dos problemas do HumanEval com uma tentativa — GPT-3 resolvia 0% [F-02]`
- **Visual:** à direita, cartão com os três números `2017 · 2021 · 28,8%` empilhados.
- **Rodapé:** `Fontes: Vaswani et al., 2017 [F-01]; Chen et al., 2021 [F-02]`
- **Notas:** não entrar em detalhe técnico de arquitetura. O ponto é: a mesma máquina que escreve texto
  escreve código.

## S5 — Três modos de uso
- **Layout:** L6 (tabela de 3 linhas).
- **Conteúdo:** título `Completar → Conversar → Delegar`

  | Modo | O humano | O LLM | Exemplo |
  |---|---|---|---|
  | Completar | escreve e aceita ou rejeita | sugere a próxima linha | Copilot, 2021 |
  | Conversar | descreve, copia e cola | explica e gera trechos | ChatGPT, 2022 |
  | **Delegar** | **especifica, revisa e aceita** | **planeja, edita, executa** | **agentes, 2024–** |
- **Visual:** a linha "Delegar" com fundo `#3E2512` e texto `#FAF6EF`. Seta dourada apontando para ela.
- **Rodapé:** `Fontes: GitHub [F-03]; ChatGPT [F-05]; Devin [F-07]; Claude Code [F-09]`
- **Notas:** a frase da aula: "quando se delega, programar vira **gestão de trabalho delegado**". Esse é
  o fio que amarra o seminário à disciplina.

## S6 — O vocabulário que vamos usar
- **Layout:** L3 (4 cartões, 2 × 2).
- **Conteúdo:** título `Quatro palavras que voltam o tempo todo`
  - `Contexto` — tudo que o modelo vê; sem contexto, ele preenche com o que é plausível
  - `Alucinação` — saída plausível e falsa; em código, vira dependência que não existe [F-28]
  - `Benchmark` — HumanEval (funções) → SWE-bench (issues reais de repositórios) [F-02][F-06]
  - `Vibe coding` — aceitar sem ler o código; palavra do ano do Collins em 2025 [F-10]
- **Visual:** 4 cartões iguais; no cartão "vibe coding", etiqueta `11,9% fazem isso profissionalmente`.
- **Rodapé:** `Fonte: Stack Overflow Developer Survey 2025 [F-23]`
- **Notas:** 72,2% dizem que vibe coding **não** faz parte do trabalho profissional [F-23]. O termo é
  mais famoso que a prática.

## S7 — Linha do tempo (2017–2023)
- **Layout:** L7.
- **Conteúdo:** título `Como chegamos aqui — parte 1`
  - `2017` Transformer [F-01]
  - `jun/2021` Copilot em preview técnico [F-03]
  - `jul/2021` Codex e HumanEval [F-02]
  - `jun/2022` Copilot disponível para todos [F-04]
  - `nov/2022` ChatGPT: 100 mi de usuários em ~2 meses [F-05]
  - `2023` SWE-bench: melhor modelo resolve **1,96%** das issues reais [F-06]
- **Visual:** eixo horizontal com 6 marcos; o marco de 2023 em `#A33A2A` (é o contraponto).
- **Rodapé:** `Fontes: [F-01]–[F-06]`
- **Notas:** 1,96% é o número que mostra a distância entre "escrever uma função" e "resolver um problema
  num repositório de verdade".

## S8 — Linha do tempo (2024–2026)
- **Layout:** L7.
- **Conteúdo:** título `Como chegamos aqui — parte 2`
  - `mar/2024` Devin, "engenheiro de software autônomo" [F-07]
  - `nov/2024` MCP: contexto e ferramentas viram padrão [F-08]
  - `fev–mai/2025` "vibe coding" e Claude Code [F-10][F-09]
  - `jul/2025` METR: devs experientes **19% mais lentos** [F-15]
  - `jul/2025` Replit apaga base de produção em *code freeze* [F-30]
  - `fev/2026` OpenAI abandona o SWE-bench Verified [F-11]
  - `abr/2026` Google: **75%** do código novo é gerado por IA [F-31]
- **Visual:** mesmo eixo; marcos de jul/2025 em `#A33A2A`, abr/2026 em `#DE9E1E`.
- **Rodapé:** `Fontes: [F-07]–[F-31]`
- **Notas:** 2024–2026 é a fase de **delegar**. Os problemas deixam de ser de qualidade de sugestão e
  passam a ser **operacionais**.

## S9 — O padrão que se repete
- **Layout:** L3.
- **Conteúdo:** título `A promessa sempre chega antes da evidência`
  - Esquerda (`#DE9E1E`): `2023 — "55,8% mais rápido"` / legenda: `uma tarefa isolada, 1 servidor HTTP [F-12]`
  - Direita (`#3E2512`): `2025 — "19% mais lentos"` / legenda: `repositórios reais e maduros, devs experientes [F-15]`
- **Visual:** duas metades simétricas, divisória vertical de 2 px `#EADBCA`.
- **Rodapé:** `Fontes: Peng et al., 2023 [F-12]; METR, 2025 [F-15]`
- **Notas:** não é que um estudo esteja errado. Eles mediram **coisas diferentes**. Guardar isso para o
  bloco 4.

## S10 — Adoção: quase todo mundo
- **Layout:** L6.
- **Conteúdo:** título `Onde o mundo está: uso`

  | Indicador | Valor | Fonte |
  |---|---|---|
  | Profissionais que usam IA no trabalho de software | **90%** (mediana de 2 h/dia) | DORA 2025 [F-20] |
  | Devs que usam ou planejam usar | **84%** | Stack Overflow 2025 [F-23] |
  | Devs que usam IA regularmente | **85%** | JetBrains 2025 [F-39] |
  | Profissionais que usam **todo dia** | **51%** | Stack Overflow 2025 [F-23] |
  | Novos devs no GitHub usando Copilot na 1ª semana | **~80%** | Octoverse 2025 [F-24] |
- **Visual:** valores em Space Grotesk 36 px `#3E2512`.
- **Rodapé:** `Coletas de 2025 · [F-20][F-23][F-24][F-39]`
- **Notas:** três pesquisas independentes, com amostras diferentes, chegam ao mesmo lugar: 84–90%.

## S11 — Confiança: cai enquanto o uso sobe
- **Layout:** L4.
- **Conteúdo:**
  - Número-destaque: `45,7%` (em `#A33A2A`) com rótulo `desconfiam da precisão`
  - Ao lado, em bullets:
    - `Confiam: 32,7% (só 3,1% "confiam muito") [F-23]`
    - `Favorabilidade caiu de +70% para 59,7% [F-23]`
    - `Maior frustração: soluções "quase certas" — 66% [F-23]`
    - `Depurar código de IA toma mais tempo: 45,2% [F-23]`
    - `No DORA: 24% confiam muito ou bastante; 30% pouco ou nada [F-20]`
- **Visual:** barra horizontal única mostrando confia × desconfia, em `#DE9E1E` e `#A33A2A`.
- **Rodapé:** `Fontes: Stack Overflow 2025 [F-23]; DORA 2025 [F-20]`
- **Notas:** **a adoção não é movida por confiança.** Isso é risco de projeto: a equipe usa uma
  ferramenta em cuja saída ela mesma não confia.

## S12 — Brasil
- **Layout:** L3.
- **Conteúdo:** título `E o Brasil?`
  - Esquerda — `Pessoas`: `6,89 milhões de desenvolvedores no GitHub` · `4º país do mundo` [F-24]
  - Direita — `Empresas`: `17% das empresas brasileiras usam IA (13% em 2024)` · `Grandes: 50%` ·
    `Pequenas: 15%` [F-40]
  - Faixa inferior (`#3E2512`, texto claro): `A adoção individual está muito à frente da organizacional.`
- **Visual:** duas colunas com ícone simples (pessoa / prédio).
- **Rodapé:** `Fontes: Octoverse 2025 [F-24]; Cetic.br, TIC Empresas 2025, 4.174 empresas [F-40]`
- **Notas:** dizer em voz alta que são **unidades diferentes** (pessoa × empresa). É exatamente por isso
  que o contraste é interessante, e não uma contradição.

## S13 — Regulação
- **Layout:** L3.
- **Conteúdo:** título `As regras estão chegando em etapas`
  - `União Europeia (AI Act)` [F-34]: proibições desde 02/02/2025 · modelos de propósito geral desde
    02/08/2025 · alto risco a partir de 02/12/2027 e 02/08/2028
  - `Brasil (PL 2338/2023)` [F-35]: aprovado no Senado em 26/12/2024 · na Câmara desde 17/03/2025 ·
    **ainda sem aprovação final em 09/2026**
  - Fecho: `quem desenvolve com IA no Brasil ainda opera sem marco legal específico`
- **Visual:** dois eixos verticais curtos, um por jurisdição.
- **Rodapé:** `Fontes: rastreador do AI Act [F-34]; Senado e Câmara [F-35]`
- **Notas:** 30 s. Não abrir discussão jurídica; é contexto de risco (volta no S21).

## S14 — Divisor
- **Layout:** L5. Fundo `#2A180B`.
- **Conteúdo:** `O que funciona e o que não funciona` + subtítulo `o que a medição mostra`
- **Visual:** barra `#DE9E1E` de 6 × 120 px acima do título; logo 28 px na base.
- **Notas:** avisar: "daqui em diante, todo número vem com a limitação do estudo junto".

## S15 — Os estudos, lado a lado
- **Layout:** L6 (é o slide mais denso do deck; por isso ganha 5 linhas e nada mais).
- **Conteúdo:** título `Cinco medições, cinco resultados diferentes`

  | Estudo | Desenho | Resultado | Limitação |
  |---|---|---|---|
  | Peng et al., 2023 [F-12] | tarefa única, servidor HTTP | **+55,8% mais rápido** | tarefa isolada; autores ligados à GitHub |
  | Cui et al. (Management Science) [F-13] | 3 RCTs, **4.867 devs** | **+26,08%** tarefas concluídas | mede tarefas, não valor |
  | Paradis et al., Google [F-14] | RCT, 96 engenheiros | **−21% de tempo** | intervalo largo; ferramenta interna |
  | **METR, 2025** [F-15] | RCT, 16 devs, 246 issues reais | **19% mais lentos** | amostra pequena; autores não generalizam |
  | METR, 2026 [F-16] | 57 devs, 800+ tarefas | −18% e −4% de tempo | os autores chamam de evidência **muito fraca** |
- **Visual:** coluna "Resultado" com fundo alternado `#2F6B4F` (ganho) e `#A33A2A` (perda), texto claro.
- **Rodapé:** `Fontes: [F-12]–[F-16]`
- **Notas:** ganho medido aparece em **tarefa delimitada e código novo**, e é maior para quem tem menos
  experiência [F-13]. Perda aparece em **base grande e madura**, com gente experiente [F-15].

## S16 — O slide-chave: percepção ≠ medida
- **Layout:** L4, fundo `#3E2512` (único slide escuro fora dos divisores).
- **Conteúdo:**
  - Título (`#FAF6EF`): `O que os próprios devs acharam`
  - Três números em sequência, Space Grotesk 96 px:
    - `+24%` — `previram antes`
    - `−19%` — `foi o que mediram` (em `#DE9E1E`)
    - `+20%` — `acharam depois`
- **Visual:** três blocos lado a lado; setas finas entre eles; fundo escuro para dar peso dramático.
- **Rodapé (claro):** `Fonte: METR, RCT com 16 devs experientes, 2025 [F-15]`
- **Notas:** **voltar à resposta da turma do S3** e comparar. Fechar com: no survey de 2026 do mesmo
  grupo, a mediana autorreportada é de 1,4× a 2×, mas os autores lembram que, no RCT, as pessoas
  erraram por **40 pontos percentuais** [F-17].

## S17 — Do indivíduo para a equipe
- **Layout:** L3.
- **Conteúdo:** título `A IA amplifica o processo que já existe`
  - Esquerda `DORA 2024` [F-19]: `+7,5% documentação` · `+3,4% qualidade do código` ·
    `+3,1% velocidade de review` · **`−1,5% vazão`** · **`−7,2% estabilidade`**
  - Direita `DORA 2025` [F-20]: `agora a adoção se associa a mais vazão` · `a instabilidade continua` ·
    `>80% percebem ganho de produtividade`
  - Faixa inferior: `AI amplifica forças e fraquezas — quem não tem fundamento, acelera o problema`
- **Visual:** ganhos em `#2F6B4F`, perdas em `#A33A2A`.
- **Rodapé:** `Fontes: DORA 2024 [F-19]; DORA 2025, ~5.000 respondentes [F-20]`
- **Notas:** é o slide que liga o seminário à gestão: o ganho individual não vira entrega da equipe
  sozinho.

## S18 — Qualidade e segurança
- **Layout:** L3 (2 cartões grandes).
- **Conteúdo:** título `Dois problemas que não se resolveram sozinhos`
  - Cartão `Manutenção` [F-25]: `código clonado: 8,3% → 12,3% das linhas alteradas` ·
    `refatoração: 25% → menos de 10%` · legenda: `GitClear, 211 mi de linhas (2020–2024); fornecedor de métricas`
  - Cartão `Segurança` [F-26][F-27][F-28]: `2021: ~40% dos programas gerados eram vulneráveis` ·
    `2025–26: só ~55% das gerações são seguras — sem melhora em 2 anos` ·
    `pacotes inventados: 5,2% (comerciais) e 21,7% (abertos)`
- **Visual:** ícone de linha em cada cartão; números em 48 px.
- **Rodapé:** `Fontes: GitClear [F-25]; Pearce et al., IEEE S&P [F-26]; Veracode [F-27]; USENIX Security 2025 [F-28]`
- **Notas:** o Thoughtworks chama o efeito acumulado de **dívida cognitiva**: a IA gera mais código do
  que a equipe entende [F-36].

## S19 — O gargalo mudou de lugar
- **Layout:** L2, com 3 blocos horizontais.
- **Conteúdo:** título `Gerar ficou barato. Revisar, não.`
  - `Open source`: mais PRs, menos merges — queda de **18,18%** na taxa de merge de quem contribui uma
    vez só (294 repositórios, 2 mi de PRs) [F-42]
  - `curl`: encerrou o bug bounty em 31/01/2026 — relatos válidos caíram de **>15% para <5%** [F-41]
  - `Contraponto`: código de agente **sobrevive mais** que o humano (−15,8 p.p. de modificação, 201
    projetos); o gargalo é a prática organizacional, não a geração [F-43]
- **Visual:** três cartões em fila; o terceiro com borda `#DE9E1E` para marcar que é o contraponto.
- **Rodapé:** `Fontes: [F-41]–[F-43]`
- **Notas:** manter o contraponto. Sem ele, o slide vira opinião.

## S20 — Quando o agente tem permissão de verdade
- **Layout:** L4.
- **Conteúdo:**
  - Número-destaque: `18/07/2025`
  - Título: `O agente apagou a base de produção durante um code freeze`
  - Bullets: `gerou mais de 4.000 registros falsos` · `afirmou que o rollback era impossível — não era`
  - Faixa: `instrução em linguagem natural não é controle de acesso`
- **Visual:** fundo creme, faixa inferior `#A33A2A` com texto claro.
- **Rodapé:** `Fonte: AI Incident Database, incidente 1152 [F-30]`
- **Notas:** ligar com a aula 7: separar ambientes e menor privilégio são **respostas a risco**, não
  detalhe técnico.

## S21 — Divisor
- **Layout:** L5.
- **Conteúdo:** `E o que isso muda na Gestão de Projetos?`
- **Notas:** é o bloco que o professor avalia no critério C3. Falar com calma.

## S22 — As cinco variáveis, revisitadas
- **Layout:** L6.
- **Conteúdo:** título `Custo, tempo, escopo, qualidade e risco (Pressman)`

  | Variável | O que o LLM muda | Evidência |
  |---|---|---|
  | Custo | cai escrever, sobe revisar e validar | [F-38]; 45,2% [F-23] |
  | Tempo | ganha em tarefa delimitada; não garante em base madura | [F-12][F-14] × [F-15] |
  | Escopo | gerar é barato → pressão por "só mais uma coisa" | caso Unespão |
  | Qualidade | mais duplicação, menos refatoração, segurança parada | [F-25][F-27] |
  | Risco | alucinação, pacote falso, agente com permissão | [F-28][F-30] |
- **Visual:** primeira coluna com etiquetas em pílula `#EADBCA`.
- **Rodapé:** `Aula 10, slide 4 (Pressman) + fontes indicadas`
- **Notas:** "nenhum conceito da disciplina caiu; o esforço é que mudou de lugar".

## S23 — Estimativa: a âncora sumiu
- **Layout:** L3.
- **Conteúdo:** título `Quanto custa o Unespão?`
  - Esquerda — tabela da própria turma (Aula 6, slide 6):

    | Método | Custo | Prazo |
    |---|---|---|
    | Experiência | R$ 200.000 | 6 meses |
    | EAP | R$ 293.000 | 4 meses |
    | COCOMO II | R$ 356.000 | 11 meses |
    | Story Points | R$ 60.000 | 2 meses |
  - Direita: `COCOMO parte de KLOC` · `o LLM gera KLOC quase de graça` ·
    `o esforço migra para contexto, iterações e supervisão humana [F-38]` ·
    `LLMs já estimam story points melhor que modelos supervisionados [F-37]`
  - Pergunta em destaque: `Qual método vocês ajustariam?`
- **Visual:** a linha "Story Points" e a "COCOMO II" destacadas, para mostrar a variação de ~6×.
- **Rodapé:** `Aula 6, slide 6; Alaswad et al., 2026 [F-38]; Shetty et al., 2026 [F-37]`
- **Notas:** pergunta aberta de verdade: não há estudo de campo que responda. Se ninguém falar, seguir.

## S24 — Riscos, com a matriz da aula
- **Layout:** L6.
- **Conteúdo:** título `Onde cada risco de IA cai na matriz de Rumsfeld`

  | Quadrante | Risco | Resposta |
  |---|---|---|
  | Conhecido-conhecido | ~45% das gerações com vulnerabilidade [F-27] | mitigar: SAST + revisão |
  | Conhecido-desconhecido | pacote alucinado vira ataque à cadeia [F-28] | mitigar: travar dependências |
  | Desconhecido-conhecido | caso Replit já aconteceu com outros [F-30] | evitar: menor privilégio |
  | Desconhecido-desconhecido | mudança regulatória [F-34][F-35] | aceitar e monitorar |
- **Visual:** cartão à direita, em `#3E2512`: `Knight Capital: US$ 460 mi em 45 min por código morto
  reativado (Aula 7)` e, abaixo, em `#DE9E1E`: `no nosso repositório há um arquivo gerado, não usado e
  cheio de invenções`.
- **Rodapé:** `Aula 7, slides 12 e 22 + fontes indicadas`
- **Notas:** é a ponte mais forte com a disciplina. Não correr.

## S25 — Monitoramento: "parece pronto" não serve
- **Layout:** L2.
- **Conteúdo:** título `O que medir quando a IA escreve`
  - `A aula 10 já avisava: "não confiar só em 'parece pronto'"`
  - `66% reclamam de soluções "quase certas" [F-23]`
  - `Burndown e velocidade inflam quando se gera mais rápido do que se valida`
  - `Medir vazão E estabilidade [F-19][F-20]`
  - `Termo de aceite = revisão humana; o Google diz que 75% do código é gerado "e aprovado por engenheiros" [F-31]`
  - `Capacidade de revisão vira recurso escasso: o DORA chama de "imposto de verificação" (curva J) [F-22]`
- **Visual:** citação da aula 10 em destaque, com aspas grandes em `#DE9E1E`.
- **Rodapé:** `Aula 10, slide 14 + fontes indicadas`
- **Notas:** amarrar com o S16: percepção não é indicador.

## S26 — O caso do próprio grupo
- **Layout:** L3.
- **Conteúdo:** título `Nós fizemos isso em 4 dias — o que deu certo e o que não`
  - Coluna `Funcionou` (`#2F6B4F`):
    - `contexto escrito e versionado (CLAUDE.md por matéria)`
    - `revisão em papéis separados (redator → PO → avaliador)`
    - `portão executável: o .sql tem que rodar em MySQL limpo`
    - `decisão de não fazer: 6 análises recomendaram cortar um escopo extra`
  - Coluna `Não funcionou` (`#A33A2A`):
    - `capítulo "Glossário" que não existe, versões e uma issue inventadas`
    - `arquivo gerado, não usado, ainda no repositório`
    - `instruções do projeto desatualizadas 3 dias depois`
    - `commits de 2 dos 4 integrantes`
- **Visual:** duas colunas simétricas; ícones de check e alerta em linha.
- **Rodapé:** `Evidência: repositório do grupo (git log, auditoria do tour) [R-01]–[R-07]`
- **Notas:** o fecho: **os três problemas que a pesquisa global aponta aconteceram conosco em 4 dias**,
  e o que salvou foram práticas de gestão, não um modelo melhor.

## S27 — Tendências
- **Layout:** L6 (5 linhas, com a força do sinal).
- **Conteúdo:** título `Para onde aponta`

  | Tendência | Sinal |
  |---|---|
  | Tarefas que o agente faz sozinho dobram a cada ~7 meses [F-18] | médio |
  | Fundamentos importam mais, não menos [F-20][F-21][F-36] | forte |
  | Segurança não acompanha a capacidade [F-27][F-29] | forte |
  | Política de uso de IA vira artefato do projeto: 83,3% permitem, 67,3% exigem humano, 48,8% exigem declarar [F-44] | forte |
  | O gargalo passa a ser revisar, não gerar [F-41][F-42] | médio |
- **Visual:** coluna "sinal" como etiquetas (forte `#3E2512`, médio `#75604C`).
- **Rodapé:** `Fontes indicadas · classificação de sinal descrita em docs/04`
- **Notas:** explicar em uma frase o que é "força do sinal": quantas fontes independentes sustentam.

## S28 — Fechamento
- **Layout:** L5 invertido (fundo `#3E2512`, texto claro).
- **Conteúdo:**
  - Frase central (54 px): `Mais delegação → mais especificação, revisão e controle`
  - Três recomendações numeradas:
    1. `Delegue em lotes pequenos, com contexto e critério de pronto escritos`
    2. `Nada entra sem revisão humana e verificação automática`
    3. `Meça estabilidade e resultado — não percepção`
- **Visual:** números em `#DE9E1E` 72 px; logo pequeno na base.
- **Rodapé:** `Síntese de docs/05 §5.8`
- **Notas:** terminar com: "o trabalho do desenvolvedor está ficando parecido com o trabalho de gestão
  de projetos — que é o nome desta disciplina". Abrir para perguntas.

## S29 — Referências
- **Layout:** L2, texto 20 px em 2 colunas.
- **Conteúdo:** título `Fontes` e a lista **só das fontes citadas no deck**, copiada de
  `../docs/99-fontes.md` no formato `F-15 · METR (2025) · metr.org`.
- **Visual:** sem enfeite; é slide de consulta.
- **Notas:** deixar projetado durante as perguntas.

> **Contagem:** 29 fichas, das quais S14 e S21 são divisores e S29 é referência — **26 slides de
> conteúdo** para 23 minutos. Se o ensaio (GP-03) estourar o tempo, os candidatos a corte, nesta ordem,
> são **S13 (regulação)**, **S7/S8 (fundir as duas linhas do tempo em uma)** e **S27 (tendências,
> reduzir para 3 linhas)**. Nunca cortar S15, S16, S22 e S26.

---

# Parte III — Montagem no Canva, passo a passo

1. **Criar o design:** *Criar design → Tamanho personalizado → 1920 × 1080 px*.
2. **Kit da marca:** cadastrar as cores da seção 2 e as duas fontes da seção 3. Se o plano não tiver Kit
   da marca, montar o S4 uma vez e usá-lo como molde para os demais (*Duplicar página*).
3. **Uploads:** subir `unespao_logo.svg`.
4. **Montar os 7 layouts** (seção 5) como páginas-modelo antes de escrever qualquer conteúdo. Isso é o
   que garante que o deck pareça um sistema, e não 29 slides avulsos.
5. **Preencher** slide a slide seguindo a Parte II. Copiar o texto **exatamente** como está aqui; o
   texto já passou pela revisão de fontes (GP-01).
6. **Notas do apresentador:** colar o campo "Notas" de cada ficha em *Notas* (embaixo do editor). Elas
   aparecem no modo apresentador e não vão para a tela.
7. **Conferir antes de fechar:**
   - [ ] todo slide com número tem rodapé de fonte;
   - [ ] nenhum texto menor que 20 px;
   - [ ] nenhum dourado em texto pequeno sobre fundo claro;
   - [ ] os nomes da capa foram confirmados pelo grupo;
   - [ ] nada no deck que não esteja em `../docs/`.
8. **Exportar** em PDF Padrão e salvar o link do design em `LINK.md`.
9. **Ensaiar** com o cronômetro do Canva (*Apresentar → Visualização do apresentante*) — isso já é a
   tarefa **GP-03**.
