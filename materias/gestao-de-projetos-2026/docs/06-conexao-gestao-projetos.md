<!-- Última atualização: 2026-09-17 -->

# 06 — Conexão com os conceitos de Gestão de Projetos das aulas

Critério atendido: **C3**. Tempo no roteiro: ~4 min.

Estrutura: para cada aula, **o conceito visto** → **o que o LLM muda** → **a evidência**. Os slides
de aula estão identificados como `A-xx sNN` (ver `99-fontes.md`).

## 6.1 Visão geral: as 5 variáveis de Pressman (A-10 s4)

| Variável | Efeito do LLM | Evidência |
|---|---|---|
| **Custo** | Cai o custo de *escrever* código; sobe o custo de *revisar e validar* | [F-38]; 45,2% dizem que depurar código de IA toma mais tempo [F-23] |
| **Tempo** | Ganho em tarefas delimitadas; em repositórios maduros o ganho não é garantido | [F-12][F-14] vs. [F-15] |
| **Escopo** | Gerar ficou barato, então cresce a tentação de "só mais uma funcionalidade" | Caso Unespão, tour guiado (`07`) |
| **Qualidade** | Mais código duplicado, menos refatoração, segurança estagnada | [F-25][F-27] |
| **Risco** | Novos riscos: alucinação, pacotes falsos, agente com permissão destrutiva | [F-28][F-30] |

## 6.2 Aula 2: Alinhamento estratégico e OKR

- **Conceito:** projeto como gerador de valor alinhado à estratégia (A-02 s13).
- **O que muda:**
  - Adotar IA também é uma decisão estratégica e precisa de **posição clara e comunicada** (a 1ª das 7
    capacidades do DORA [F-21]). Na prática, isso já virou documento: 83,3% das políticas de projetos
    open source populares permitem IA, mas com condições (envolvimento humano, declaração de uso,
    responsável definido) [F-44]. Neste repositório, o equivalente é o `CLAUDE.md`.
  - O retorno segue uma **curva J** [F-22]. O *business case* precisa prever a queda inicial.

## 6.3 Aula 3: Escopo, PMBOK e scope creep

- **Conceito:** *scope creep* e escopo negativo (A-03 s73); no ágil, o backlog cresce sem fim (A-03 s92).
- **O que muda:**
  - O custo marginal de "adicionar mais" cai muito, então **escopo negativo explícito** fica mais
    importante.
  - O DORA recomenda **lotes pequenos** como capacidade central [F-21].
- **Caso real:** a avaliação do grupo recomendou **não** construir um tour interativo de BD1 que não
  tinha sido pedido [R-06].

## 6.4 Aula 5: Estimativas (LOC, COCOMO, APF, Story Points)

- **Conceito:**
  - LOC e COCOMO II paramétricos; story points relativos e velocidade da equipe (A-05 s66–s84).
  - A própria aula pediu **"Estimativa de KLOC via ChatGPT"** (A-05 s53).
- **O que muda:**
  - **LOC perde o sentido como medida de esforço.** O LLM produz muito código em segundos. O esforço
    migra para cinco dimensões: complexidade de raciocínio do modelo, completude do contexto, impacto da
    transformação, ciclos de iteração e **esforço de supervisão humana** [F-38]. Limitação: artigo
    conceitual, sem validação de campo.
  - **O LLM como estimador.** Um preprint de 2026 relata que LLMs sem nenhum dado de treino (zero-shot)
    estimam story points melhor que modelos supervisionados treinados com 80% dos dados, em 16 projetos
    [F-37].
  - **Estimativa "por experiência" fica mais enviesada.** Os devs erraram o próprio ganho em cerca de
    40 p.p. [F-15][F-17]. Ecoa a **Lei de Hofstadter** (A-06 s16).
- **Caso real:** o comparativo da turma mostra, para o **Unespão**, de **R$ 60.000/2 meses** (Story
  Points) a **R$ 356.000/11 meses** (COCOMO II) (A-06 s6). Com LLM na equipe, qual dessas bases continua
  válida? (ver `07`).

## 6.5 Aula 6: Cronograma e Lei de Brooks

- **Conceito:** "Adicionar gente a um projeto atrasado o atrasa mais" (A-06 s21–s22): custo de
  comunicação e tempo de aceleração.
- **Pergunta para a turma** (não é afirmação: não há estudo controlado sobre isso):
  - Adicionar **agentes** a um projeto atrasado tem custo de comunicação?
  - A evidência indireta sugere que sim, na forma de **especificar, dar contexto e revisar**
    [F-36][F-38]. E o DORA mediu queda de estabilidade quando a adoção cresce sem fundamentos
    [F-19][F-20].
- **Curva J** [F-22]: a adoção entra no cronograma como uma fase de aprendizagem.

## 6.6 Aula 7: Riscos

**Conceito:** matriz de Rumsfeld (A-07 s12) e respostas evitar/mitigar/transferir/aceitar (A-07 s33).

| Quadrante | Risco com LLM | Resposta sugerida |
|---|---|---|
| Conhecido-conhecido | Código gerado com vulnerabilidade (~45% das gerações) [F-27] | **Mitigar**: SAST, revisão obrigatória |
| Conhecido-desconhecido | Pacote alucinado vira ataque à cadeia de suprimentos [F-28][F-29] | **Mitigar**: travar dependências, verificar no registro |
| Desconhecido-conhecido | Outra empresa já sofreu com agente destrutivo (Replit) [F-30], mas a equipe não sabe | **Evitar**: menor privilégio, separar dev/prod |
| Desconhecido-desconhecido | Mudança regulatória (AI Act, PL 2338) [F-34][F-35] | **Aceitar e monitorar** |

**Ponte com o caso da aula:** a Knight Capital quebrou em 45 min por **código morto reativado**
(A-07 s22). No Unespão, um arquivo **gerado e não usado** continua no repositório com conteúdo
inventado [R-04]. É o mesmo tipo de risco, em escala acadêmica.

## 6.7 Aula 8: Equipes e stakeholders

- **Tuckman** (A-08 s21): um agente entra na equipe sem passar por "formação" e "confrontação", mas
  **também não normatiza** sozinho. As normas precisam estar **escritas** (instruções de agente, *team
  charter*, A-08 s71).
- **Estruturas de equipe** (A-08 s31–s39): o fluxo "dev + agentes" lembra o *chief programmer*: uma
  pessoa especifica e revisa, vários executam.
- **Dono claro por domínio** (A-08 s55): com agentes e várias pessoas no mesmo repositório, cada tarefa
  precisa de **dono e fronteira explícitos**. Foi assim que estruturamos este repositório (`docs/adr/0001-tarefas-em-arquivo-para-kb-multiusuario.md`).
- **Contribuidores externos viram stakeholders difíceis:** o volume de PRs cresce e a taxa de merge
  cai (queda de 18,18% para quem contribui uma vez só) [F-42]; o curl encerrou seu bug bounty por
  excesso de relatos gerados por IA [F-41]. Gerir expectativa e canal de entrada é trabalho de
  *Stakeholder Performance Domain* (A-08 s81–s85).
- **Stakeholders:**
  - Os menos experientes ganham mais com IA [F-13].
  - As vagas de entrada estão sob pressão [F-33].
  - Formar júniores passa a ser uma decisão de gestão.

## 6.8 Aula 9: Qualidade

- **Conceito:** "qualidade não pode ser incorporada depois do produto pronto" (A-09 s11); ISO/IEC 25010
  (A-09 s31–s41); custo da qualidade = prevenção + avaliação + falhas internas + falhas externas
  (A-09 s70).
- **O que muda:**
  - **Manutenibilidade** (ISO 25010) piora sem refatoração [F-25].
  - **Segurança** não melhora sozinha [F-27].
  - Prevenção barata (especificação, testes, revisão) evita falha externa cara. É o princípio do custo
    da qualidade aplicado a código gerado [F-36].

## 6.9 Aula 10: Monitoramento, controle e encerramento

- **Conceito:**
  - "Não confiar só em 'parece pronto'; é preciso indicadores mensuráveis" (A-10 s14).
  - EVA e burndown (A-10 s29–s54).
  - Termo de aceite (A-10 s68).
- **O que muda:**
  - **"Parece pronto" é exatamente a armadilha do LLM**: 66% reclamam de soluções "quase certas"
    [F-23], e a percepção de ganho erra por ~40 p.p. [F-15][F-17].
  - **Burndown e velocidade inflam** quando o código é gerado mais rápido do que é validado. É preciso
    medir **estabilidade** junto com **vazão** [F-19][F-20].
  - **Termo de aceite = revisão humana.** Aceite formal continua sendo do humano [F-31], e 67,3% das
    políticas de IA em open source exigem envolvimento humano forte [F-44].
  - **A capacidade de revisão vira recurso escasso** a ser planejado, como qualquer outro recurso do
    projeto: o DORA chama a revisão de código gerado de "imposto de verificação", uma das causas da
    queda inicial de produtividade na curva J [F-22].

## 6.10 Mensagem para o slide

> Todo conceito da disciplina continua valendo. O LLM **muda onde está o esforço**: sai da
> *construção* e vai para *especificação, validação e controle*. Isso é Gestão de Projetos.
