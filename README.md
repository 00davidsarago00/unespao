# unespao — Base de Conhecimento do Sistema Unespão

KB do grupo sobre o **Sistema Unespão** (plataforma de pedidos personalizados estilo Subway/Spoleto para a padaria Unespão).

## Estrutura

Este repositório organiza conhecimento em duas camadas:

- **`produto/`** — conhecimento central e agnóstico de disciplina. Contém `business.md` (domínio, atores, requisitos) e `architecture.md` (stack, C4, SOLID, decisões). Reutilizável por múltiplas disciplinas/apresentações sobre o mesmo sistema.

- **`materias/<nome-da-matéria>/`** — entregável autocontido de uma disciplina. Hoje: `materias/engenharia-software-2-2026/` (documento final + protótipo React para apresentação de ESII 2026). Cada matéria tem seu próprio `CLAUDE.md` com regras normativas.

## Como navegar

- **Dúvida sobre domínio ou arquitetura do Sistema Unespão?** → Comece em `produto/business.md` e `produto/architecture.md`.
- **Trabalho em uma disciplina específica?** → Consulte o `CLAUDE.md` da pasta `materias/<nome>/` para regras normativas daquela entrega.
- **Quer criar uma nova matéria/apresentação?** → Copie `materias/engenharia-software-2-2026/` como modelo e adapte para sua disciplina, reutilizando `produto/` como referência compartilhada.

Consulte também `CLAUDE.md` (nesta raiz) para detalhes de roteamento entre agentes.
