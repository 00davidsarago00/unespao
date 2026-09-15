# produto — Conhecimento Central do Sistema Unespão

Esta pasta contém a documentação de **domínio e arquitetura** do **Sistema Unespão** — conhecimento central, reutilizável entre disciplinas e apresentações.

## O que é o Sistema Unespão

Plataforma digital de pedidos personalizados para a padaria **Unespão**, no estilo adotado por redes como Subway/Spoleto: o cliente monta o próprio lanche a partir de um **produto base** (pão, massa de bolo, base de salada) combinado com **ingredientes** (recheios, molhos, coberturas, acompanhamentos). Otimiza o processo de pedido e melhora a experiência via sugestões personalizadas baseadas em histórico.

## Estrutura desta pasta

### `business.md`
Domínio do Sistema Unespão: atores (Cliente, Atendente/Administrador), escopo dentro/fora, requisitos funcionais, 6 objetivos de qualidade priorizados, retenção de dados, compliance. Leia aqui para entender o **minimundo** do sistema de forma agnóstica de disciplina.

### `architecture.md`
Arquitetura documentada (sistema-alvo): Clean Architecture, C4 Nível 1/2/3, SOLID aplicado, decisões e restrições, stack (.NET 8/ASP.NET Core + PostgreSQL + React SPA). Inclui uma seção "Estado real do código" explicando que o protótipo React em `materias/engenharia-software-2-2026/src/` é ferramental de demo/apresentação, não implementação real. Leia aqui para entender a **estrutura e justificativas** arquiteturais.

## Fonte de evidência primária

Os conceitos nesta pasta foram extraídos de:
- **`materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`** — minimundo, C4 Nível 1/2/3, SOLID aplicado.
- **`materias/engenharia-software-2-2026/iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf`** — detalhamento do C4 Nível 3.

Esses PDFs continuam fisicamente alojados em `materias/engenharia-software-2-2026/` porque o app React daquela matéria depende de servi-los; mas o conteúdo já foi destilado aqui em Markdown para **reutilização por outras disciplinas/apresentações** sem duplicação.

## Como usar esta pasta

### Se você está trabalhando em uma disciplina específica

Verifique a pasta `materias/<nome-da-disciplina>/` — ela é o entregável autocontido daquela disciplina. Comece lendo o `CLAUDE.md` dessa pasta para orientações normativas. Quando tiver dúvidas sobre **domínio ou arquitetura do produto**, volte aqui (`produto/business.md` e `produto/architecture.md`) como referência rápida antes de mergulhar nos PDFs completos.

### Se você está criando uma nova disciplina/apresentação

1. Copie a estrutura de `materias/engenharia-software-2-2026/` como modelo (já que ela é hoje a única matéria documentada).
2. Renomeie para `materias/<nome-da-sua-materia>/` e adapte o `CLAUDE.md` interno para o contexto da sua disciplina.
3. Use `produto/business.md` e `produto/architecture.md` como **ponto de partida** — não repita perguntas sobre o domínio/arquitetura do Sistema Unespão já documentadas aqui.
4. Confirme com os stakeholders (usuário, professor, equipe) **quaisquer diferenças de escopo ou requisitos** daquela disciplina em relação ao que está documentado em `produto/`.
5. Se a nova disciplina precisar de ajustes no produto (ex.: novos requisitos, decisões diferentes), atualize `produto/business.md` e/ou `produto/architecture.md` com consenso, para que todas as disciplinas reutilizem o conhecimento atualizado.

## Convenção de roteamento (para agentes)

- **Dúvida sobre domínio/negócio do Sistema Unespão?** → Comece em `produto/business.md`.
- **Dúvida sobre arquitetura/design do sistema?** → Comece em `produto/architecture.md`.
- **Trabalho de redação/produção de documento de uma disciplina específica?** → Consulte o `CLAUDE.md` da pasta `materias/<nome>/` para as regras normativas daquela entrega.
- **Dúvida não resolvida por nenhuma das fontes acima?** → Pergunte ao usuário — não invente decisões de produto ou arquitetura.
