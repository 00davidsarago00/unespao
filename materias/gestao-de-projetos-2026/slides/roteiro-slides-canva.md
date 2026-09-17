<!-- Última atualização: 2026-09-17 -->

# Deck do seminário — especificação de montagem no Canva

> **⚠️ PLANO B (desde 2026-09-17).** A espinha do seminário passou a ser
> `../material-base/Material-base.pdf`: 5 blocos, 5 apresentadores e um arquivo HTML único com demos
> funcionais offline (ver `../docs/08-roteiro-aula.md` e a tarefa GP-06). Esta especificação continua
> válida e pronta como **contingência**: se o HTML não ficar pronto ou falhar na sala, o deck do Canva
> cobre o mesmo conteúdo. O conteúdo dos dois é o mesmo; a estrutura de blocos é que difere.

Entregável da tarefa **GP-02**, revisado pela equipe revisora (GP-05) em 2026-09-17. Este arquivo é a
**fonte**: o Canva é só a renderização. Todo número aqui vem de `../docs/` e traz o ID da fonte
(`../docs/99-fontes.md`).

- **Conteúdo:** `../docs/08-roteiro-aula.md` (blocos e tempos) e `../docs/01`–`07`.
- **Estilo visual:** derivado do protótipo React do Unespão
  (`../../engenharia-software-2-2026/src/`), para o seminário ter a mesma identidade das outras
  entregas do grupo.
- **29 slides**, sendo 26 de conteúdo, 2 divisores e 1 de referências.
- **Orçamento: ~22,7 min de conteúdo**, com folga dentro da janela de 20–25 min. Cada ficha traz o
  **tempo alvo em segundos**. Esse orçamento existe porque a primeira versão deste deck estava
  dimensionada para ~28 min.

> **Mapa para a estrutura oficial (5 blocos).** Este deck foi desenhado antes da adoção do
> material-base e segue a divisão antiga de 8 blocos. Se o plano B for acionado, a correspondência é:
>
> | Bloco oficial | Slides deste deck |
> |---|---|
> | Abertura e tese | S1–S3 |
> | **1 · As origens (1948–2016)** | **não existe aqui** — ver lacuna abaixo |
> | **2 · O Transformer (2017–2022)** | S4–S6 (conceitos) + S7 até o marco de 2022 |
> | **3 · Hoje I: o ciclo de vida (2023–2026)** | S7 (2023 em diante), S9–S12, S22 |
> | **4 · Hoje II: a evidência (2026)** | S8, S13–S18, S24, S25–S26 |
> | **5 · Futuro (2027+)** | S13 (regulação), S23, S27 |
> | Fecho | S28 · Referências S29 |
>
> **Lacuna conhecida:** a nossa pesquisa começa em 2017, então **o bloco 1 (1948–2016) não tem slides
> aqui**. Se este deck virar o caminho principal, são necessários ~3 slides novos — Georgetown-IBM
> 1954, Shannon/Turing/ELIZA e os dois invernos —, cujo conteúdo está no `../material-base/` e com os
> números já verificados em `../docs/09-verificacao-material-base.md` (itens 22 e 23).

**Mapa interno deste deck** (a divisão antiga de 8 blocos, mantida para referência):

| Bloco | Alvo | Slides | Soma das fichas |
|---|---|---|---|
| 1. Abertura | 1,0 min | S1–S3 | 60 s |
| 2. O que é | 3,0 min | S4–S6 | 180 s |
| 3. Histórico | 3,0 min | S7–S8 | 165 s |
| 4. Cenário atual | 3,0 min | S9–S11 | 165 s |
| 5. Funciona × não funciona | 5,0 min | S12–S18 | 315 s |
| 6. Conexão com GP | 4,0 min | S19–S24 | 270 s |
| 7. Caso Unespão | 2,5 min | S25–S26 | 120 s |
| 8. Tendências e fechamento | 1,5 min | S27–S28 | 90 s |
| — Referências (projetado nas perguntas) | — | S29 | 0 s |
| **Total** | **23,0 min** | **29 slides** | **1.365 s ≈ 22,8 min** |

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

Cores extraídas do protótipo (valores reais usados em `src/components/*.tsx`), **com as correções de
contraste da revisão de design**. No Canva, cadastrar em *Marca → Kit da marca → Cores*.

### Fundo claro (a maioria dos slides)

| Papel | Hex | Contraste sobre `#FAF6EF` | Uso |
|---|---|---|---|
| **Marrom-pão (primária)** | `#3E2512` | 13,2:1 | Títulos e texto |
| **Dourado textual** | `#8E6522` | **4,8:1** | Qualquer dourado **em texto**: kickers, números pequenos, rótulos |
| Dourado de marca | `#DE9E1E` | 2,2:1 — **reprova em texto** | Só elemento **gráfico**: barras, marcos, setas, ícones — ou texto sobre fundo escuro |
| **Creme (fundo padrão)** | `#FAF6EF` | — | Fundo |
| Creme 2 | `#F2EADB` | — | Fundo de cartão |
| Areia | `#EADBCA` | — | Zebra de tabela, divisórias |
| Areia escura | `#E0D3C1` | — | Borda de cartão |
| Texto secundário | `#75604C` | 5,3:1 | Legendas e rodapé **em fundo claro** |

### Fundo escuro (S12, S14, S19, S28)

**Um único escuro no deck inteiro: `#2A180B`.** Não usar `#3E2512` como fundo — três marrons escuros
diferentes fazem o deck parecer inacabado.

| Papel | Hex | Contraste sobre `#2A180B` | Uso |
|---|---|---|---|
| Título e corpo | `#FAF6EF` | 16,8:1 | Texto principal |
| Número-destaque | `#DE9E1E` | 7,3:1 | Números grandes |
| **Legenda e rodapé** | `#C9B49C` | **7,1:1** | Substitui `#75604C`, que reprova (2,4:1) |
| Borda / divisória | `#5A3A22` | — | Linhas |

### Semânticas (com rótulo, nunca só cor)

| Papel | Hex | Uso |
|---|---|---|
| Ganho medido | `#2F6B4F` | Sempre com `▲` e o rótulo "ganho medido" |
| Perda medida | `#A33A2A` | Sempre com `▼` e o rótulo "perda medida" |
| Percepção / evidência fraca | `#75604C` | Rótulo "percepção" |

## 3. Tipografia

Ambas existem no Canva. Substitutas: *Plus Jakarta Sans* → **Poppins**; *Space Grotesk* → **Archivo**.

**Escala** (só estes valores): **180 · 120 · 96 · 72 · 54 · 40 · 32 · 28 · 24 · 22**.

| Estilo | Fonte | Tamanho | Peso | Cor |
|---|---|---|---|---|
| Número gigante (slide de um dado só) | Space Grotesk | 180 px | Bold | `#3E2512` ou `#DE9E1E` (fundo escuro) |
| Número-destaque | Space Grotesk | 120 px | Bold | idem |
| Título de capa | Space Grotesk | 96 px | Bold | `#3E2512` |
| Título de divisor | Space Grotesk | 72 px | Bold | `#FAF6EF` |
| Título de slide | Space Grotesk | 54 px | Bold | `#3E2512` |
| Subtítulo / número de apoio | Space Grotesk | 40 px | Bold | `#8E6522` |
| Corpo e bullet | Plus Jakarta Sans | 32 px | 400 (700 no destaque) | `#3E2512` |
| Texto de tabela | Plus Jakarta Sans | 28 px | 400 (600 no cabeçalho) | `#3E2512` |
| Legenda / limitação de estudo | Plus Jakarta Sans | 24 px | 400 itálico | `#75604C` / `#C9B49C` |
| Kicker | Space Grotesk | 24 px | Bold, CAIXA ALTA, +8% de entreletra | `#8E6522` |
| Rodapé de fonte | Plus Jakarta Sans | 22 px | 500 | `#75604C` / `#C9B49C` |

**Regra dura:** no máximo **5 linhas** de texto por slide e **12 palavras** por linha. O que não couber
vai para as notas. Nada abaixo de 22 px — a sala tem tela a até 6 m.

## 4. Componentes

1. **Cartão.** `#F2EADB`, cantos 16 px, borda 1 px `#E0D3C1`, padding 32 px, sombra suave (*Brilho
   suave*, desfoque 24, transparência 15%, Y 6).
2. **Barra de acento.** 6 × 64 px em `#DE9E1E`, à esquerda do título. É o elemento de unidade do deck.
3. **Etiqueta (pílula).** Fundo `#3E2512`, texto `#FAF6EF` 22 px caixa alta. Variante clara: `#EADBCA`
   com texto `#3E2512`.
4. **Faixa full-bleed.** Retângulo de 112 px de altura colado na base, `#2A180B`, texto `#FAF6EF`
   32 px. É onde mora a frase-síntese do slide (S11, S15, S18).
5. **Rodapé de fonte.** 22 px, formato `Fonte: METR, 2025 [F-15]`. **Todo slide com número tem um.**
6. **Tabela.** Sem grade externa. Cabeçalho `#3E2512` com texto `#FAF6EF`; zebra **`#F2EADB` /
   `#EADBCA`** (nunca `#FAF6EF`, que some no fundo); separadores 1 px `#E0D3C1`; linha de 64 px.
7. **Dot plot** (S13). Eixo horizontal, linha do zero de 2 px `#3E2512`, pontos de 28 px, rótulo do
   estudo à esquerda em 28 px e o `n` em 24 px logo abaixo.
8. **Seta de progressão.** Traço de 3 px `#8E6522` com ponta triangular (S5 e S14).
9. **Barra comparativa.** 56 px de altura, cantos 8 px, dois segmentos (`#DE9E1E` / `#A33A2A`).
10. **Marca-d'água do número do slide.** Inferior direito, Space Grotesk 22 px.

## 5. Grades de layout

- **L1 — Capa.** Logo no topo, título à esquerda, faixa `#DE9E1E` de 12 px na base.
- **L2 — Título + conteúdo.** Barra de acento + kicker + título; conteúdo em 12 colunas.
- **L3a — Duas colunas simétricas** (6 + 6, medianiz 48 px): comparação "de um lado × do outro".
- **L3b — Dois cartões grandes** (6 + 6, altura cheia).
- **L3c — Quatro cartões** (2 × 2, 6 colunas cada, altura de 340 px).
- **L4a — Um número gigante** (180 px) centralizado, apoio embaixo.
- **L4b — Números em sequência**, com setas entre eles.
- **L5 — Divisor.** Fundo `#2A180B`, título centralizado, barra dourada acima, logo 28 px na base.
- **L6 — Tabela ou quadrante.** Título curto no topo, o resto para o conteúdo.
- **L7 — Linha do tempo.** Eixo de 4 px `#EADBCA`, marcos de **28 px** `#DE9E1E`, rótulos alternando
  acima e abaixo do eixo.
- **L8 — Gráfico.** Título, área de plotagem de 1400 × 620 px, legenda em pastilhas embaixo.

**Ritmo:** nunca repetir o mesmo layout em dois slides seguidos.

## 6. Imagens e ícones

- **Logo:** `../../engenharia-software-2-2026/unespao_logo.svg` (*Uploads*). 64 px na capa, 28 px nos
  divisores.
- **Ícones:** um único conjunto de linha, espessura fina, `#3E2512` ou `#DE9E1E`, 96 px quando forem o
  elemento principal do cartão.
- **Proibido:** foto de banco de imagens de robô, cérebro digital ou aperto de mão homem-máquina. Num
  seminário de pesquisa, a ilustração é o dado.
- **Gráficos:** montar com formas do Canva na paleta acima, não com o gerador automático.

## 7. Acessibilidade

- Menor tamanho projetado: **22 px**.
- **Cor nunca é o único código:** todo verde/vermelho vem com `▲`/`▼` e rótulo.
- **Teste de 3 segundos:** ao abrir o slide, a mensagem principal tem que ser achada em 3 s. Se o olho
  vagueia, há mais de uma mensagem no slide.
- **Teste de 25% de zoom** no Canva: se o título e o número principal não são legíveis, está pequeno.

---

# Parte II — Os 29 slides

Cada ficha traz: **tempo alvo**, **Layout**, **Conteúdo** (texto exato), **Visual**, **Rodapé** e
**Notas** (fala do apresentador; vai no campo de notas do Canva, não na tela).

---

## S1 — Capa · 10 s
- **Layout:** L1, fundo `#FAF6EF`.
- **Conteúdo:**
  - Kicker: `GESTÃO DE PROJETOS · UNESP 2026 · SEMINÁRIO`
  - Título (96 px): `LLM e o Desenvolvimento de Software`
  - Subtítulo (32 px, `#75604C`): `O que a evidência mostra que funciona — e o que não funciona`
  - Autores (24 px): `David Sarago · Guilherme Molina · Lucas Costa · Thiago Mitsuo`
- **Visual:** logo 64 px no topo; faixa `#DE9E1E` de 12 px na base.
- **Notas:** ⚠ confirmar os nomes com o grupo antes de apresentar.

## S2 — Seis blocos, 23 minutos · 20 s
- **Layout:** L2, lista em 2 colunas.
- **Conteúdo:** título `Seis blocos, 23 minutos`; itens numerados: `1. O que é` · `2. Como chegamos
  aqui` · `3. Onde o mundo está` · `4. O que funciona e o que não` · `5. O que muda na gestão de
  projetos` · `6. O que aconteceu conosco`
- **Visual:** número de cada item em Space Grotesk 40 px `#8E6522`.
- **Notas:** dizer que o bloco 4 é o coração. O título já sinaliza controle de tempo (critério C6).

## S3 — Pergunta para a turma · 30 s
- **Layout:** L4a.
- **Conteúdo:** título `Antes de começar`; pergunta em 54 px `Quem usou IA para programar esta
  semana?`; segunda linha em 40 px `#8E6522` `Quanto acham que ganharam de velocidade?`; caixa vazia
  com o rótulo `resposta da turma: ____%`
- **Visual:** cartão central vazio, com o campo em destaque.
- **Notas:** **anotar o número.** Ele volta no S14, na tela. Não comentar nada agora.

## S4 — O que é um LLM · 60 s
- **Layout:** L2.
- **Conteúdo:** kicker `1. O QUE É`; título `Um modelo que prevê texto — e código é texto`; 3 bullets:
  - `Transformer (2017) tornou viável treinar em escala`
  - `Codex (2021): primeiro modelo treinado em código público a virar produto`
  - `Resolvia 28,8% do HumanEval com uma tentativa — GPT-3 resolvia 0%`
- **Visual:** cartão à direita com `2017 · 2021 · 28,8%` empilhados em 72 px.
- **Rodapé:** `Fontes: Vaswani et al., 2017 [F-01]; Chen et al., 2021 [F-02]`
- **Notas:** não detalhar arquitetura. O ponto é: a mesma máquina que escreve texto escreve código.

## S5 — Completar → Conversar → Delegar · 75 s
- **Layout:** L6 (tabela).
- **Conteúdo:**

  | Modo | O humano | O LLM | Exemplo |
  |---|---|---|---|
  | Completar | escreve, aceita ou rejeita | sugere a próxima linha | Copilot, 2021 |
  | Conversar | descreve, copia e cola | explica e gera trechos | ChatGPT, 2022 |
  | **Delegar** | **especifica, revisa e aceita** | **planeja, edita, executa** | **agentes, 2024–** |
- **Visual:** linha "Delegar" com fundo `#3E2512` e texto `#FAF6EF`; seta dourada apontando para ela.
- **Rodapé:** `Fontes: [F-03][F-05][F-07][F-09]`
- **Notas:** frase-âncora do seminário: **quando se delega, programar vira gestão de trabalho
  delegado**. É o fio que paga no fechamento.

## S6 — Quatro palavras · 45 s
- **Layout:** L3c.
- **Conteúdo:** título `Quatro palavras que voltam o tempo todo`
  - `Contexto` — tudo que o modelo vê; sem contexto, ele preenche com o plausível
  - `Alucinação` — saída plausível e falsa; em código, vira dependência que não existe
  - `Benchmark` — HumanEval (funções) → SWE-bench (issues reais)
  - `Vibe coding` — aceitar sem ler o código; palavra do ano do Collins em 2025
- **Visual:** 4 cartões; no de vibe coding, pílula `só 11,9% fazem isso profissionalmente`.
- **Rodapé:** `Fontes: [F-28][F-02][F-06][F-10]; Stack Overflow 2025 [F-23]`
- **Notas:** 72,2% dizem que **não** faz parte do trabalho profissional — o termo é mais famoso que a
  prática. Ponte para o próximo: *"com esse vocabulário, a linha do tempo mostra onde a promessa e a
  evidência se separam."*

## S7 — Linha do tempo, 2017–2026 · 105 s
- **Layout:** L7 (eixo único, marcos alternando acima e abaixo).
- **Conteúdo:** título `Como chegamos aqui`
  - `2017` Transformer · `2021` Copilot e Codex (28,8% do HumanEval) · `2022` ChatGPT ·
    `2023` SWE-bench: melhor modelo resolve **1,96%** · `2024` Devin e MCP; **Cui et al.: +26,08% com
    4.867 devs** · `2025` "vibe coding"; **METR: 19% mais lentos**; **Replit apaga produção** ·
    `2026` OpenAI abandona o SWE-bench; **Google: 75% do código novo**
- **Visual:** marcos de 28 px; 2023 e 2025 em `#A33A2A`; 2026 em `#DE9E1E`. Três faixas rotuladas sob o
  eixo: `COMPLETAR (2021–22)` · `CONVERSAR (2022–24)` · `DELEGAR (2024–)`.
- **Rodapé:** `Fontes: [F-01]–[F-31]`
- **Notas:** a fusão das duas linhas do tempo é proposital: o que interessa são as **três fases**, não
  a lista de produtos. Em 2024–2026, os problemas deixam de ser de qualidade da sugestão e passam a ser
  **operacionais**.

## S8 — A promessa chega antes da evidência · 60 s
- **Layout:** L3a.
- **Conteúdo:** título `A promessa chega antes da evidência`
  - Esquerda: `2023 — "55,8% mais rápido"` · legenda `uma tarefa isolada, um servidor HTTP`
  - Direita: `2025 — "19% mais lentos"` · legenda `repositórios reais e maduros, devs experientes`
- **Visual:** metades simétricas, divisória de 2 px `#E0D3C1`. Sem cor semântica: os dois lados são
  evidência válida.
- **Rodapé:** `Fontes: Peng et al., 2023 [F-12]; METR, 2025 [F-15]`
- **Notas:** nenhum dos dois está errado — **mediram coisas diferentes**. Guardar para o bloco 4.

## S9 — Adoção · 45 s
- **Layout:** L4a.
- **Conteúdo:** número gigante `84–90%` (180 px); subtítulo 40 px `dos desenvolvedores usam IA`;
  terceira linha 32 px `mediana de 2 h por dia`; três pastilhas de 24 px: `DORA 90%` ·
  `Stack Overflow 84%` · `JetBrains 85%`
- **Visual:** nada além disso. É o slide mais simples do deck, de propósito.
- **Rodapé:** `Coletas de 2025 · [F-20][F-23][F-39]`
- **Notas:** três pesquisas independentes, amostras diferentes, mesmo resultado — é o dado mais sólido
  do cenário. Se quiser, citar de cabeça: ~80% dos novos devs do GitHub usam Copilot na primeira
  semana [F-24].

## S10 — Confiança · 45 s
- **Layout:** L4a.
- **Conteúdo:** número gigante `45,7%` em `#A33A2A` com `▼`; rótulo 40 px `desconfiam da precisão`;
  duas linhas de apoio (32 px): `confiam: 32,7% — e só 3,1% "confiam muito"` · `a favorabilidade caiu
  de +70% para ~60%`
- **Visual:** barra comparativa (componente 9) sob os números.
- **Rodapé:** `Fonte: Stack Overflow Developer Survey 2025 [F-23]`
- **Notas:** o fecho é: **a adoção não é movida por confiança**. No DORA, 24% confiam muito ou bastante
  e 30% confiam pouco ou nada [F-20]. Não nomear ainda "percepção ≠ medida" — isso é do S14.

## S11 — Brasil · 75 s
- **Layout:** L3a + faixa full-bleed.
- **Conteúdo:** título `E o Brasil?`
  - Esquerda `Pessoas`: `6,89 milhões de desenvolvedores no GitHub` · `4º país do mundo`
  - Direita `Empresas`: `17% das empresas usam IA (13% em 2024)` · `grandes: 50% · pequenas: 15%`
  - Faixa: `A adoção individual está muito à frente da organizacional.`
  - Canto inferior direito, 24 px: `Regulação: UE já em vigor · PL 2338 na Câmara desde 2025`
- **Visual:** dois cartões com ícone de 96 px (pessoa / prédio).
- **Rodapé:** `Fontes: Octoverse 2025 [F-24]; Cetic.br, TIC Empresas 2025 [F-40]; [F-34][F-35]`
- **Notas:** dizer em voz alta que são **unidades diferentes** (pessoa × empresa) — por isso o contraste
  é interessante, não contraditório. A regulação virou uma linha porque é contexto, não operação: o AI
  Act tem obrigações desde 08/2025 e o PL 2338 está na Câmara desde 03/2025, sem aprovação final. Quem
  desenvolve com IA no Brasil ainda opera sem marco legal específico.

## S12 — Divisor · 5 s
- **Layout:** L5.
- **Conteúdo:** `O que funciona e o que não funciona` · subtítulo `o que a medição mostra`
- **Notas:** avisar: daqui em diante, todo número vem com a limitação do estudo junto.

## S13 — Cinco medições, cinco resultados · 75 s
- **Layout:** L8 — **dot plot**, substituindo a tabela da versão anterior.
- **Conteúdo:** título `Cinco medições, cinco resultados diferentes`
  - Eixo horizontal de efeito, linha do zero em 2 px `#3E2512`
  - `Peng et al., 2023` · **+55,8%** de velocidade · `n = 1 tarefa isolada`
  - `Cui et al., Management Science` · **+26,1%** de tarefas concluídas · `n = 4.867 devs, 3 RCTs`
  - `Paradis et al., Google` · **−21%** de tempo na tarefa · `n = 96 engenheiros`
  - `METR, 2025` · **+19%** de tempo (mais lento) · `n = 16 devs, 246 issues reais`
  - `METR, 2026` · **−18%** de tempo, zero dentro do intervalo · `n = 57 devs; evidência muito fraca`
- **Visual:** pontos de 28 px; `▲ #2F6B4F` do lado favorável, `▼ #A33A2A` do lado desfavorável, com
  rótulo. Legenda de limitação em 24 px sob cada estudo.
- **Rodapé:** `Fontes: [F-12][F-13][F-14][F-15][F-16]`
- **Notas:** atenção ao sinal do METR 2026: no original é "speedup de −18%", que significa **18% mais
  rápido** — o post abre dizendo *"some evidence for speedup"*. Plotar do lado favorável, com a
  ressalva de que o zero está dentro do intervalo e os próprios autores chamam de evidência muito
  fraca. Dizer que RCT é *estudo com grupo de controle*. Mensagem: **o resultado depende do desenho do
  estudo** — a maior amostra (4.867 devs) é favorável; a que mede repositório real e maduro é
  desfavorável.

## S14 — Percepção ≠ medida · 60 s
- **Layout:** L4b, fundo `#2A180B`.
- **Conteúdo:** título (`#FAF6EF`) `O que os próprios devs acharam`; quatro valores em sequência,
  96 px:
  - `___%` — `o que vocês acharam` (preenchido com a resposta do S3)
  - `+24%` — `os devs previram`
  - `−19%` — `foi o que mediram` (em `#DE9E1E`)
  - `+20%` — `acharam depois`
- **Visual:** quatro blocos com setas entre eles; o primeiro com borda tracejada `#C9B49C`, indicando
  que é preenchido ao vivo. Legendas e rodapé em `#C9B49C`.
- **Rodapé:** `Fonte: METR, RCT com 16 devs experientes, 2025 [F-15]`
- **Notas:** **este é o clímax.** Voltar à resposta da turma do S3 e comparar. Fechar com: no survey de
  2026 do mesmo grupo, a mediana autorreportada é de 1,4× a 2×, mas os autores lembram que, no RCT, as
  pessoas erraram o próprio ganho em ~40 pontos percentuais [F-17].

## S15 — A IA amplifica o que já existe · 60 s
- **Layout:** L3a + faixa full-bleed.
- **Conteúdo:** título `Do indivíduo para a organização`
  - Esquerda `DORA 2024`: `▲ +7,5% documentação` · `▲ +3,4% qualidade` · `▼ −1,5% vazão` ·
    `▼ −7,2% estabilidade`
  - Direita `Empresas`: `95% dos pilotos sem retorno mensurável em ~6 meses` · legenda `153
    respondentes; definição estreita de sucesso`
  - Faixa: `A IA amplifica forças e fraquezas — quem não tem fundamento, acelera o problema.`
- **Visual:** `▲`/`▼` com rótulo, nunca só cor.
- **Rodapé:** `Fontes: DORA 2024 [F-19] e 2025 [F-20]; MIT NANDA, 2025 [F-45]`
- **Notas:** dizer que DORA e Stack Overflow são **surveys**: medem associação e percepção, não
  telemetria — por isso "associou-se a", não "causou". Em 2025 o DORA já associa adoção a **mais**
  vazão, mas a instabilidade continua.

## S16 — Qualidade e segurança · 45 s
- **Layout:** L3b.
- **Conteúdo:** título `Dois problemas que não se resolveram sozinhos`
  - Cartão `Manutenção`: número 72 px `12,3%` · `de código clonado, contra 8,3% em 2021` · legenda
    `GitClear, 211 mi de linhas; fornecedor de métricas`
  - Cartão `Segurança`: número 72 px `~55%` · `das gerações são seguras quando o prompt não pede
    segurança` · legenda `Veracode, 80 tarefas, 150+ modelos; sem melhora em 2 anos`
- **Visual:** um ícone de 96 px por cartão.
- **Rodapé:** `Fontes: GitClear [F-25]; Veracode [F-27]`
- **Notas:** a condição "quando o prompt não pede segurança" é o detalhe que vira recomendação:
  instrua segurança no contexto, não só revise depois. Se houver tempo, citar de cabeça: refatoração
  caiu de 25% para menos de 10% das linhas alteradas, e ~40% do código gerado já era vulnerável em
  2021 [F-26].

## S17 — O gargalo mudou de lugar · 40 s
- **Layout:** L2, três cartões horizontais.
- **Conteúdo:** título `Gerar ficou barato. Revisar, não.`
  - `Open source`: mais PRs, menos merges — **−18,18%** na taxa de merge de quem contribui uma vez só
  - `curl`: encerrou o bug bounty em 01/2026, afogado em relatos gerados por IA
  - `Contraponto`: código de agente **sobrevive mais** que o humano; o gargalo é a prática
    organizacional, não a geração
- **Visual:** terceiro cartão com borda `#DE9E1E`, marcando que é o contraponto.
- **Rodapé:** `Fontes: [F-41][F-42][F-43]`
- **Notas:** os números do curl vão na fala: relatos válidos caíram de mais de 15% para menos de 5% em
  2025. O DORA chama esse custo de **imposto de verificação** — a expressão volta no S24.

## S18 — Quando o agente tem permissão de verdade · 30 s
- **Layout:** L4a + faixa full-bleed.
- **Conteúdo:** número gigante `18/07/2025`; título `O agente apagou a base de produção durante um
  code freeze`; uma linha: `gerou 4.000 registros falsos e afirmou que o rollback era impossível`;
  faixa: `Instrução em linguagem natural não é controle de acesso.`
- **Visual:** faixa inferior em `#A33A2A` com texto `#FAF6EF` — exceção deliberada ao escuro padrão.
- **Rodapé:** `Fonte: AI Incident Database, incidente 1152 [F-30]`
- **Notas:** ligar com a aula 7: separar ambientes e menor privilégio são **respostas a risco**.

## S19 — Divisor · 5 s
- **Layout:** L5.
- **Conteúdo:** `E o que isso muda na Gestão de Projetos?`
- **Notas:** é o bloco avaliado no critério C3. Falar com calma.

## S20 — As cinco variáveis · 50 s
- **Layout:** L6.
- **Conteúdo:** título `Custo, tempo, escopo, qualidade e risco`

  | Variável | O que o LLM muda |
  |---|---|
  | Custo | licença é barata (US$ 10–39/mês); o caro é o tempo de revisão |
  | Tempo | ganha em tarefa delimitada; não garante em base madura |
  | Escopo | gerar é barato → pressão por "só mais uma coisa" |
  | Qualidade | mais duplicação, menos refatoração, segurança parada |
  | Risco | alucinação, pacote falso, agente com permissão, licença e autoria |
- **Visual:** primeira coluna em pílulas `#EADBCA`. Os IDs de fonte saem da tabela e vão para o rodapé.
- **Rodapé:** `Pressman (Aula 10, s4) · [F-47][F-23][F-25][F-27][F-28][F-30][F-38][F-48]`
- **Notas:** nenhum conceito da disciplina caiu; o esforço é que mudou de lugar.

## S21 — Escopo, cronograma e equipe · 50 s
- **Layout:** L2, três blocos.
- **Conteúdo:** título `Três aulas que ficam de pé`
  - `Escopo (Aula 3)`: gerar barato alimenta *scope creep*; escopo negativo explícito fica mais
    importante — o DORA põe **lotes pequenos** entre as 7 capacidades
  - `Cronograma (Aula 6)`: a Lei de Brooks vale para agentes? O custo não é de comunicação, é de
    **especificar e revisar** — e o DORA prevê uma **curva J**: piora antes de melhorar
  - `Equipe (Aula 8)`: um agente não passa por "formação" nem "confrontação" — as normas precisam
    estar **escritas**; 67,3% das políticas de IA em open source exigem envolvimento humano
- **Visual:** três cartões com a etiqueta da aula no topo.
- **Rodapé:** `Aulas 3, 6 e 8 · [F-21][F-22][F-44]`
- **Notas:** slide criado na revisão, porque três aulas estavam documentadas e invisíveis no deck. Se o
  tempo apertar, falar só de escopo e equipe.

## S22 — A âncora da estimativa sumiu · 60 s
- **Layout:** L3a.
- **Conteúdo:** título `Quanto custa o Unespão?`
  - Esquerda: dois números grandes lado a lado — `R$ 60.000 / 2 meses` (Story Points) e
    `R$ 356.000 / 11 meses` (COCOMO II), com `6×` em 120 px `#8E6522` entre eles
  - Direita: `COCOMO II parte de KLOC` · `o LLM gera KLOC quase de graça` · `o esforço migra para
    contexto, iteração e supervisão humana`
  - Pergunta em 54 px: `Qual método vocês ajustariam?`
- **Visual:** a tabela completa das quatro estimativas fica só nas notas.
- **Rodapé:** `Aula 6, s6 · Alaswad et al., 2026 [F-38]; Shetty et al., 2026 [F-37]`
- **Notas:** os quatro valores da turma: Experiência R$ 200.000/6 meses · EAP R$ 293.000/4 meses ·
  COCOMO II R$ 356.000/11 meses · Story Points R$ 60.000/2 meses. Pergunta aberta de verdade: não há
  estudo de campo que responda. Se ninguém falar em 10 s, seguir.

## S23 — Riscos · 60 s
- **Layout:** L6 — **quadrante 2 × 2 real** (900 × 720 px), não tabela linear.
- **Conteúdo:** título `Onde cada risco de IA cai na matriz de Rumsfeld`
  - Conhecido-conhecido: `vulnerabilidade no código gerado` → `mitigar: pedir segurança no prompt + SAST`
  - Conhecido-desconhecido: `pacote inventado vira ataque de cadeia` → `mitigar: travar dependências`
  - Desconhecido-conhecido: `já aconteceu com outros (Replit)` → `evitar: menor privilégio`
  - Desconhecido-desconhecido: `regulação e autoria do código gerado` → `aceitar e monitorar`
- **Visual:** eixos rotulados; no máximo 8 palavras por célula.
- **Rodapé:** `Aula 7, s12 · [F-27][F-28][F-30][F-34][F-48][F-49]`
- **Notas:** SAST é *ferramenta que varre o código atrás de falhas de segurança*. Contar Knight Capital
  **na fala**: US$ 460 milhões em 45 minutos por código morto reativado (Aula 7, s22), e emendar: *"a
  gente tem um arquivo assim no nosso repositório; já volto nisso"*. Citar também que, para o US
  Copyright Office, prompt sozinho não gera autoria [F-48], e que o caso *Doe v. GitHub* segue vivo em
  licença e contrato [F-49].

## S24 — Monitoramento · 45 s
- **Layout:** L2.
- **Conteúdo:** título `"Parece pronto" não é indicador`
  - Citação da Aula 10 em 40 px: `"Não confiar só em 'parece pronto' — é preciso indicadores
    mensuráveis"`
  - `66% reclamam de soluções "quase certas"`
  - `Burndown e velocidade inflam quando se gera mais rápido do que se valida`
  - `Medir vazão E estabilidade`
  - `Termo de aceite = revisão humana; a capacidade de revisão é recurso escasso — o "imposto de
    verificação" da curva J`
- **Visual:** aspas grandes em `#DE9E1E` atrás da citação.
- **Rodapé:** `Aula 10, s14 · [F-23][F-19][F-20][F-22]`
- **Notas:** amarrar com o S14: percepção não é indicador. Ponte para o próximo bloco: **o que vem
  agora não é hipótese — aconteceu com a gente.**

## S25 — O caso do próprio grupo · 75 s
- **Layout:** L3a.
- **Conteúdo:** título `Nós fizemos isso em 4 dias`
  - Coluna `▲ Funcionou`: `contexto escrito e versionado` · `revisão em papéis separados` ·
    `portão executável: o .sql tem que rodar em MySQL limpo` · `decisão explícita de não fazer`
  - Coluna `▼ Não funcionou`: `capítulo, versões e uma issue inventados` · `arquivo gerado e não usado
    ainda no repositório` · `instruções do projeto desatualizadas em 3 dias` · `commits de 2 dos 4`
- **Visual:** duas colunas simétricas, com `▲`/`▼` e rótulo.
- **Rodapé:** `Evidência: repositório do grupo [R-01]–[R-07]`
- **Notas:** aqui fecha o gancho do Knight Capital do S23: o arquivo gerado e não usado é o nosso
  código morto.

## S26 — O que nos salvou · 45 s
- **Layout:** L2.
- **Conteúdo:** título `O que nos salvou não foi um modelo melhor`
  - Frase central em 54 px: `Os três problemas que a pesquisa global aponta apareceram num projeto de
    faculdade em 4 dias.`
  - Três itens: `contexto escrito` · `papéis de revisão` · `portões executáveis`
- **Visual:** três pílulas grandes lado a lado.
- **Rodapé:** `[R-02][R-03][R-05][R-06]`
- **Notas:** transição para o fechamento: *"se isso aconteceu num projeto de 4 dias, o que sugere para
  um projeto real? Três sinais fortes."*

## S27 — Os sinais fortes · 40 s
- **Layout:** L6 (3 linhas, não 5).
- **Conteúdo:** título `Os sinais apontam para revisão, não para geração`

  | Tendência | Sinal |
  |---|---|
  | Fundamentos importam mais, não menos | forte |
  | Segurança não acompanha a capacidade | forte |
  | Política de uso de IA vira artefato do projeto: 83,3% permitem, 67,3% exigem revisão humana | forte |
- **Visual:** coluna "sinal" em pílulas.
- **Rodapé:** `[F-20][F-21][F-27][F-36][F-44]`
- **Notas:** as outras tendências ficam na fala, se sobrar tempo: as tarefas que o agente faz sozinho
  dobram a cada ~7 meses — com a limitação de serem tarefas autocontidas — e o gargalo passa a ser
  revisar.

## S28 — Fechamento · 50 s
- **Layout:** L5, fundo `#2A180B`.
- **Conteúdo:** frase central em 54 px `Mais delegação → mais especificação, revisão e controle`; três
  recomendações numeradas:
  1. `Delegue em lotes pequenos, com contexto e critério de pronto escritos`
  2. `Nada entra sem revisão humana e verificação automática`
  3. `Meça estabilidade e resultado — não percepção`
- **Visual:** números em `#DE9E1E` 72 px; logo 28 px na base.
- **Rodapé:** `Síntese de docs/05 §5.8`
- **Notas:** terminar em: *"o trabalho de programar está ficando parecido com gerenciar projetos."*
  Abrir para perguntas.

## S29 — Referências · projetado nas perguntas
- **Layout:** L2, duas colunas, 24 px.
- **Conteúdo:** título `Fontes`; lista **só das fontes citadas no deck** (~28 das 49), no formato
  `F-15 · METR (2025) · metr.org`.
- **Notas:** deixar projetado durante as perguntas.

> **Ordem de corte**, se o ensaio (GP-03) estourar: **S21** (falar só de escopo e equipe, −20 s) →
> **S27** (2 linhas, −15 s) → **S16** (um cartão só, −20 s) → **S8** (dizer na fala do S7, −60 s).
> **Nunca cortar:** S13, S14, S20, S23, S25.

---

# Parte III — Montagem no Canva, passo a passo

1. **Criar o design:** *Criar design → Tamanho personalizado → 1920 × 1080 px*.
2. **Kit da marca:** cadastrar as cores da seção 2 e as duas fontes. Sem Kit da marca, montar o S4 uma
   vez e usá-lo como molde (*Duplicar página*).
3. **Uploads:** subir `unespao_logo.svg`.
4. **Montar os layouts** da seção 5 como páginas-modelo **antes** de escrever conteúdo. É isso que faz
   o deck parecer um sistema, e não 29 slides avulsos.
5. **Preencher** slide a slide seguindo a Parte II. Copiar o texto **exatamente** como está aqui: ele
   já passou pela validação de fontes (GP-01) e pela revisão de especialistas (GP-05).
6. **Notas do apresentador:** colar o campo "Notas" de cada ficha em *Notas*. Elas não vão para a tela.
7. **Conferir antes de fechar:**
   - [ ] todo slide com número tem rodapé de fonte;
   - [ ] nenhum texto menor que 22 px;
   - [ ] nenhum `#DE9E1E` em texto sobre fundo claro (usar `#8E6522`);
   - [ ] um único escuro (`#2A180B`) em S12, S14, S19 e S28;
   - [ ] todo verde/vermelho acompanhado de `▲`/`▼` e rótulo;
   - [ ] teste de 3 segundos em S9, S13, S14 e S23;
   - [ ] os nomes da capa foram confirmados pelo grupo;
   - [ ] nada no deck que não esteja em `../docs/`.
8. **Exportar** em PDF Padrão e salvar o link em `LINK.md`.
9. **Ensaiar** com o cronômetro do Canva (*Apresentar → Visualização do apresentante*), comparando com
   o tempo alvo de cada ficha. Isso é a tarefa **GP-03**.
