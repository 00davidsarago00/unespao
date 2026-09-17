# unespao — Base de Conhecimento do Sistema Unespão

KB do grupo sobre o **Sistema Unespão** (plataforma de pedidos personalizados estilo Subway/Spoleto para a padaria Unespão).

## Estrutura

Este repositório organiza conhecimento em duas camadas:

- **`produto/`** — conhecimento central e agnóstico de disciplina. Contém `business.md` (domínio, atores, requisitos) e `architecture.md` (stack, C4, SOLID, decisões). Reutilizável por múltiplas disciplinas/apresentações sobre o mesmo sistema.

- **`materias/<nome-da-matéria>/`** — entregável autocontido de uma disciplina. Hoje:
  - `materias/engenharia-software-2-2026/` — documento final + protótipo React (ESII 2026);
  - `materias/banco-de-dados-1-2026/` — modelos, script MySQL e slides (BD1 2026);
  - `materias/gestao-de-projetos-2026/` — pesquisa e roteiro do seminário "LLM e o Desenvolvimento de Software" (GP 2026).

  Cada matéria tem seu próprio `CLAUDE.md` com regras normativas.

- **`docs/`** — trabalho em equipe e decisões: `COLABORACAO.md` (protocolo), `todo/` e `done/` (tarefas atribuíveis), `adr/` (decisões estruturais).

## Como navegar

- **Dúvida sobre domínio ou arquitetura do Sistema Unespão?** → Comece em `produto/business.md` e `produto/architecture.md`.
- **Trabalho em uma disciplina específica?** → Consulte o `CLAUDE.md` da pasta `materias/<nome>/` para regras normativas daquela entrega.
- **Vai pegar uma atividade do grupo?** → Leia `docs/COLABORACAO.md`, escolha uma tarefa sem `owner` em `docs/todo/` e cole o "Prompt de partida" dela no seu Claude.
- **Quer criar uma nova matéria/apresentação?** → Copie a matéria mais parecida como modelo (ver `CLAUDE.md` raiz), reutilizando `produto/` como referência compartilhada.

Consulte também `CLAUDE.md` (nesta raiz) para detalhes de roteamento entre agentes.
