# ADR-0001: Organizar o trabalho multiusuário com tarefas em arquivo e protocolo de colaboração

- **Status:** Proposto
- **Data:** 2026-09-17
- **Decisores:** David Sarago (proposta); aceite pendente de revisão do grupo no PR
- **Relacionados:** `docs/COLABORACAO.md`, `docs/todo/_TEMPLATE.md`, `materias/gestao-de-projetos-2026/docs/05-o-que-funciona-e-nao.md`, `materias/gestao-de-projetos-2026/docs/07-caso-unespao.md`

## Contexto

O repositório é a base de conhecimento de um grupo de 4 pessoas que produz as entregas de várias
disciplinas (ESII, BD1, GP) sobre o Sistema Unespão, **com agentes de LLM (Claude Code)** fazendo a
maior parte da redação.

Forças em jogo:
- **Concentração.** O histórico tem commits de só 2 dos 4 membros, com identidades git inconsistentes.
  A continuidade depende de quem tem o contexto "na cabeça".
- **Contexto implícito.** Não havia registro de responsável, status, prazo nem critério de aceite. As
  pastas `docs/todo`, `docs/done` e `docs/adr` existiam vazias. O `CLAUDE.md` e o `README` da raiz já
  estavam desatualizados três dias depois de BD1 entrar.
- **Invenção quando falta contexto.** A auditoria de ESII encontrou conteúdo fabricado (capítulo
  inexistente, versões e issues inventadas) produzido pelo agente sem fonte explícita.
- **Prazos curtos e simultâneos** (seminário de GP em 18/09/2026).

**Evidência externa** (pesquisa do seminário de GP, `materias/gestao-de-projetos-2026/docs/`):
- A IA **amplifica** o processo existente. Ganha quem tem fundamentos: **lotes pequenos**, versionamento
  forte, dados internos acessíveis à IA e posição clara sobre o uso (DORA 2025 e AI Capabilities Model,
  [F-20][F-21]).
- Controles **antecipados** (especificação e instruções versionadas) e **de retorno** (testes,
  portões) são o que torna agentes confiáveis (Thoughtworks Radar vol. 34, [F-36]).
- Os ganhos medidos se concentram em **tarefas delimitadas** [F-12][F-14].
- A percepção de "pronto" não é confiável, então é preciso critério verificável e revisão humana
  [F-15][F-23][F-31].
- Conceito de aula: cada parte precisa de **dono claro com fronteira de interface** (Aula 8, s55).

## Opções consideradas

### Opção A — Tarefas como arquivos Markdown no repositório (`docs/todo` → `docs/done`)

- **Prós:**
  - O Claude de qualquer membro lê a tarefa direto, sem integração, token ou MCP.
  - Tarefa, contexto (`ler_antes`), saída e critério de aceite ficam **versionados junto** com o
    conteúdo.
  - A revisão acontece no mesmo PR.
  - Funciona offline e sobrevive ao fim do semestre.
  - Aproveita pastas que já existiam.
- **Contras:**
  - Não há quadro visual nem notificação.
  - O "cadeado" de posse depende de disciplina (commit imediato do `owner`), então é possível conflito
    se duas pessoas pegarem a mesma tarefa ao mesmo tempo.
  - Listar e filtrar tarefas exige grep ou pedir ao Claude.

### Opção B — GitHub Issues/Projects

- **Prós:** quadro visual, assignee nativo, notificações, vínculo automático issue ↔ PR.
- **Contras:**
  - O contexto para o agente fica fora do repositório, e o Claude precisa do `gh` autenticado para ler.
  - O texto da issue não é versionado junto com os arquivos que ela referencia.
  - Membros sem acesso configurado ao `gh` ficam de fora do fluxo com Claude.

### Opção C — Jira

- **Prós:** gestão de projeto completa (sprints, workflow, relatórios), próxima do conteúdo da disciplina
  de GP.
- **Contras:**
  - Exige conta e MCP configurados por membro.
  - Sobrecarga desproporcional para 4 pessoas e entregas de dias.
  - Contexto fora do repositório, com o mesmo problema da opção B, agravado.

## Decisão

Vamos usar a **Opção A**, escolhida pelo usuário em 2026-09-17:
- Cada atividade é um arquivo `docs/todo/<ID>-<slug>.md` com frontmatter: `id`, `materia`, `status`,
  `owner`, `prazo`, `depende_de`, `ler_antes`, `saida`, `criterios_de_aceite`, `fora_de_escopo`.
- O corpo traz um **prompt de partida** pronto para colar no Claude.
- O ciclo pegar → branch → PR com revisão de outro membro → `git mv` para `docs/done/` está em
  `docs/COLABORACAO.md`, referenciado no `CLAUDE.md` raiz.

**Racional:** o critério que mais pesou é que **o agente de qualquer membro precisa achar, sem ajuda
humana, todo o contexto necessário e o critério de pronto**. A pesquisa e o próprio caso Unespão
mostram que a falta disso é o que gera invenção e retrabalho. Tarefas pequenas com saída e aceite
explícitos aplicam diretamente "lotes pequenos", "controles antecipados e de retorno" e "revisão
humana". A reversibilidade é alta: migrar para Issues depois exige só converter arquivos.

## Consequências

- **Positivas:**
  - Qualquer membro pega uma tarefa com o próprio Claude sem precisar de explicação verbal.
  - Posse e fronteira de cada entrega ficam explícitas.
  - O histórico de decisões e entregas fica auditável no git.
  - Menos invenção, porque o contexto é declarado em `ler_antes` e as dúvidas vão para "Perguntas em
    aberto".
- **Negativas:**
  - Disciplina manual para atualizar `status` e `owner` e mover para `done`.
  - Não há visão de quadro.
  - Risco de duas pessoas pegarem a mesma tarefa se o commit de posse não for feito na hora.
  - Um arquivo a mais para manter a cada atividade.
- **Neutras / a observar:**
  - O `CLAUDE.md` raiz e os de cada matéria continuam sendo contexto crítico e precisam ser atualizados
    quando a estrutura mudar. Sugestão: criar tarefa `KB-xx` sempre que uma matéria nova entrar.
  - Se o grupo crescer ou os conflitos de posse se repetirem, reavaliar a Opção B em um novo ADR.

## Notas

- Tarefas iniciais criadas com esta decisão: GP-01 a GP-04, BD1-01 e ESII-01. Todas derivam de
  pendências já escritas nos arquivos do repositório.
- Os IDs `[F-xx]` citados remetem a `materias/gestao-de-projetos-2026/docs/99-fontes.md`.
