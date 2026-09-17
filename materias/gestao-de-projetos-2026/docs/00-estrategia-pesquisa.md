<!-- Última atualização: 2026-09-17 -->

# 00 — Estratégia de pesquisa

Documento de método. Define **o que** pesquisamos, **como** escolhemos fontes e **como** um número
chega ao slide. Qualquer membro que continue a pesquisa com o próprio Claude parte daqui.

## 1. Objetivo

Dar uma "quase aula" de 20–25 min sobre **LLM e o Desenvolvimento de Software** que cubra o
cenário global atual, a trajetória histórica, as tendências e o que a evidência diz que funciona e
que não funciona, conectando tudo aos conceitos de Gestão de Projetos das aulas e usando o próprio
Unespão como caso real.

**Critérios do professor** (`../arquivos_do_classroom/atividade.md`), que guiam cada decisão:

| # | Critério | Onde atendemos |
|---|---|---|
| C1 | O que é o tópico | `01-o-que-e.md` |
| C2 | Profundidade da pesquisa | `02`–`05` + este método + `99-fontes.md` |
| C3 | Conexão com conceitos de GP vistos em aula | `06-conexao-gestao-projetos.md` |
| C4 | Exemplos práticos e casos reais | `05` (incidentes, estudos), `07-caso-unespao.md` |
| C5 | Clareza, organização e qualidade do material | `08-roteiro-aula.md` → slides (tarefa GP-02) |
| C6 | Comunicação, postura e gestão do tempo | `08-roteiro-aula.md` (tempos) → ensaio (tarefa GP-03) |

## 2. Perguntas de pesquisa

| Eixo | Pergunta central | Subperguntas |
|---|---|---|
| Q1 O que é (`01`) | O que muda quando um LLM entra no ciclo de desenvolvimento? | Diferença entre autocompletar, chat e agente; o que é "contexto" |
| Q2 Histórico (`02`) | Como chegamos aqui, e em quais fases? | Marcos técnicos (Transformer, Codex), de produto (Copilot, ChatGPT, agentes) e de avaliação (HumanEval → SWE-bench) |
| Q3 Cenário atual (`03`) | Quem usa, quanto e com que confiança, no mundo e no Brasil? | Adoção, confiança, agentes, empresas, regulação, mercado de trabalho |
| Q4 Tendências (`04`) | Para onde a evidência aponta nos próximos 1–2 anos? | Autonomia dos agentes, padrões de contexto/spec, segurança, benchmarks, regulação |
| Q5 Funciona / não funciona (`05`) | Onde há ganho **medido**, onde há prejuízo **medido** e onde só há percepção? | Produtividade individual vs. entrega da equipe; qualidade; segurança; percepção vs. medida |
| Q6 Conexão GP (`06`) | O que o LLM muda em escopo, estimativa, cronograma, risco, equipe, qualidade e controle? | Mapeamento aula a aula |
| Q7 Caso (`07`) | O que o próprio grupo viveu usando LLM neste projeto? | Evidência rastreável no repositório |

## 3. Hierarquia de evidência

1. **N1: experimento controlado ou artigo revisado por pares.** Único nível que sustenta frase causal
   ("X **causou** Y").
2. **N2: survey ou relatório de pesquisa com amostra grande e método publicado** (DORA, Stack
   Overflow, METR). Sustenta "N% **relatam** / **estão associados a**".
3. **N3: fornecedor ou parte interessada** (GitHub, Google, Anthropic, Veracode, GitClear). Sustenta
   "a empresa **afirma**". O conflito de interesse aparece na fala.

**Survey não é telemetria.** Mesmo em N2, DORA e Stack Overflow medem **percepção e associação**, não
execução observada. O verbo correto é "associou-se a", nunca "causou".
4. **N4: imprensa, blog ou enciclopédia.** Só para datas, contexto ou ilustração.

Regras derivadas:
- **Contraponto obrigatório.** Todo resultado favorável aparece ao lado do desfavorável mais forte
  disponível, e vice-versa.
- **Percepção ≠ medida.** Número autorreportado nunca é apresentado como ganho real. A razão está em
  [F-15]: devs previram +24% de velocidade, mediram −19% e ainda acreditaram em +20%.
- **Datado.** Todo número traz o ano da coleta. Em IA, dado de 2023 é histórico, não cenário atual.

## 4. Protocolo

1. **Busca.** Começar pela fonte primária (paper, página do relatório), não pela notícia. Queries
   usadas em 2026-09-17, entre outras: `METR experienced open-source developers RCT`, `DORA 2025
   State of AI-assisted Software Development`, `Stack Overflow Developer Survey 2025 AI trust`,
   `GitClear 2025 code quality`, `Veracode GenAI code security 2026`, `package hallucination USENIX
   2025`, `SWE-bench Verified contamination`, `LLM story point estimation 2026`, `EU AI Act
   timeline`, `PL 2338/2023`.
2. **Janela.** De 2017 (Transformer) a 09/2026. O cenário atual usa dados de 2025–2026.
3. **Ficha.** Cada fonte vira uma linha em `99-fontes.md` com tipo, nível, status de verificação e
   URL, **no momento em que é lida**.
4. **Checagem cruzada.** Número que aparece diferente em fontes secundárias é conferido na primária.
   Exemplo real: notícias citavam "29%" e "33%" de confiança no Stack Overflow 2025. A página
   primária mostra 3,1% de "confia muito" + 29,6% de "confia um pouco" [F-23].
5. **Limitações.** Cada estudo usado em `05` traz sua limitação principal escrita ao lado.
6. **Lacunas.** Onde não achamos evidência sólida, o texto diz isso explicitamente, em vez de
   preencher com opinião.

## 5. Estado da pesquisa (2026-09-17)

- 58 fontes externas registradas, 8 aulas mapeadas e 7 evidências do repositório.
- **Validação (GP-01) concluída em 2026-09-17:** 48 das 49 fontes estão conferidas na origem (**P**).
  A exceção é F-11 (página da OpenAI responde HTTP 403), marcada **X** e conferida em cobertura
  secundária.
- **Revisão por equipe de especialistas (GP-05), 2026-09-17:** quatro revisões independentes
  (narrativa, relevância, rigor e design de informação). As correções de conteúdo estão aplicadas;
  o registro está em `../../../docs/done/GP-05-revisao-especialistas.md`.
- **Integração do material-base e auditoria (2026-09-17):** o roteiro mestre de outro membro do grupo
  virou a espinha; suas 25 alegações foram auditadas em `09-verificacao-material-base.md`. Depois da
  tarefa GP-07, o placar é **19 ✅ e 6 ⚠️**, sem nenhum item sem veredito.
- **Lacunas conhecidas:**
  - Não há survey de adoção de LLM por **desenvolvedores brasileiros**. O que existe é adoção de IA por
    **empresas** brasileiras [F-40] e o tamanho da base brasileira no GitHub [F-24]. A comparação entre
    as duas coisas está em `03` §3.4, com a diferença de unidade explicitada.
  - Não há estudo controlado sobre LLM **em gestão de projetos** (estimativa, cronograma). Há preprints
    e artigos conceituais [F-37][F-38].
  - Custo: há preço de licença [F-47] e um contraponto agregado de ROI [F-45], mas **não** há estudo
    independente de TCO (licença + inferência + tempo de revisão) por projeto.
  - Os resultados do Stack Overflow Developer Survey 2026 ainda não tinham sido publicados (a coleta
    abriu em 23/06/2026).
  - Os números de ROI do relatório DORA 2026 vêm do modelo do relatório, lido em cobertura secundária
    [F-22]; são ilustrativos de uma organização-modelo, não medição de campo.
