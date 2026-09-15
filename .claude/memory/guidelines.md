<!-- Last updated: 2026-09-15 -->

# Guidelines — unespao

> Fonte de verdade para **roteamento:** `../../CLAUDE.md` (raiz do repo).
> Fonte de verdade para **processo de redação ESII:** `../../materias/engenharia-software-2-2026/CLAUDE.md`.
> Este arquivo é um resumo de roteamento para agentes — em caso de divergência, as fontes acima prevalecem.

## Roteamento — produto/ vs. materias/

Por decisão do usuário (2026-09-15), este repositório agora organiza conhecimento em duas camadas:

| Camada | Contém | Agnóstico? |
|---|---|---|
| **`../../produto/`** | `business.md`, `architecture.md` — domínio, atores, stack, C4, SOLID, decisões do Sistema Unespão. | **Sim** — reutilizável por múltiplas disciplinas/apresentações. |
| **`../../materias/<nome>/`** | Entregável completo de uma disciplina: documento final, protótipo, `CLAUDE.md` com regras normativas. | **Não** — específico de uma disciplina. Hoje: `materias/engenharia-software-2-2026/`. |

**Roteamento para agentes:**
- Dúvida sobre domínio/arquitetura do Sistema Unespão? → `../../produto/{business,architecture}.md`.
- Trabalho de redação em ESII? → `../../materias/engenharia-software-2-2026/CLAUDE.md` (normas completas).
- Criando nova matéria? → Copie `materias/engenharia-software-2-2026/` como modelo, reutilize `produto/`.

## O que este repositório é

KB do grupo sobre o **Sistema Unespão** — organizado em duas camadas (acima).
O objetivo **em ESII 2026** é produzir a documentação do projeto final exigida pela disciplina.

## Pipeline de produção do documento (ESII 2026) — nunca pular etapas

**Nota:** Este pipeline é o **padrão para ESII**. Outras disciplinas podem ter pipelines diferentes — consulte o `CLAUDE.md` específico da matéria.

1. **Markdown** (`materias/engenharia-software-2-2026/docs/*.md`) — padrão de trabalho; toda redação e iteração
   de conteúdo acontece aqui.
2. **`.tex`** — só gerado/atualizado sob pedido explícito ("passa pro tex",
   "gera o tex"). Nunca como efeito colateral de uma edição em Markdown.
3. **PDF** — só compilado sob pedido explícito ("gera o pdf", "compila"),
   sempre a partir do `.tex` atualizado.

Nunca escrever conteúdo novo diretamente no `.tex` — ele é gerado a partir do
Markdown, não editado como fonte primária.

## Regras que todo agente deve seguir neste repo

**Aplicáveis a QUALQUER disciplina/matéria:**
- **Nunca inventar** dados de negócio, métricas, decisões arquiteturais, RAs
  ou datas que não estejam nas fontes ou confirmadas pelo usuário — perguntar
  em vez de assumir. Isso vale para o orquestrador e para qualquer subagente.
- Quando dúvida sobre domínio/arquitetura do Sistema Unespão: consultar `../../produto/{business,architecture}.md` **antes** dos PDFs completos.

**Específicas de ESII 2026:**
- Estrutura de capítulos em `materias/engenharia-software-2-2026/docs/` deve espelhar
  `template-modelo-projeto-final-2026.tex` (mesma ordem/títulos).
- Capítulos com muitas figuras podem mover parte delas para Apêndice — decidir
  caso a caso, perguntando ao usuário quando estiver no limite.
- **Sem pressa** — qualidade/correção priorizam sobre velocidade; pesquisar as
  fontes com calma, revisar de verdade.
- Antes da entrega final: trocar `\orientacoestrue` → `\orientacoesfalse` no
  `.tex`.

## Fontes de conteúdo vs. fontes de forma (ESII 2026)

- **Conteúdo do sistema**: `../../produto/{business,architecture}.md` (versão Markdown, rápido), 
  `materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf` (PDF completo),
  `materias/engenharia-software-2-2026/iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf` (C4 N3 complemento) +
  input do usuário.
- **Forma/modelo de como documentar** (nunca conteúdo do Sistema Unespão em
  si): `materias/engenharia-software-2-2026/exercicios-referencia/Exercicio-ESII-padrao-decorador.docx.pdf` (padrões de projeto),
  `exercicios-referencia/Exercicio-teste-unidade-Java.docx.pdf` (estratégia de testes),
  `slides-teoricos/slides-SCM-handout.pdf` (gestão de configuração),
  `slides-teoricos/slides-interface-handout.pdf` (UI), `slides-teoricos/slides-padroes-handout-*.pdf`
  (padrões de projeto). Nunca misturar as duas categorias.

## Workflow multi-agente das três vertentes

Só disparar quando o usuário pedir explicitamente para escrever/revisar um
capítulo "com as três vertentes" ou equivalente — roda via `Workflow`, não
como personas na mesma resposta:

1. **Redator** — escreve o capítulo em Markdown a partir das fontes.
2. **PO** — revisa sob ótica de negócio/produto.
3. **Usuário-avaliador (professor/banca)** — revisa como quem vai corrigir.

Resultado esperado: Markdown atualizado + lista curta de pendências/decisões
que exigem input do grupo.

## Convenções de código (src/)

**_A confirmar_** — fora do escopo deste arquivo por decisão do usuário. Se o
grupo formalizar convenções para o protótipo React (ou para uma futura
implementação real da API .NET/SPA), registrar aqui.

## Resumo de roteamento (para agentes)

```
Dúvida sobre domínio/requisitos?     → ../../produto/business.md
Dúvida sobre arquitetura/stack?      → ../../produto/architecture.md
Redação de capítulo em ESII?         → ../../materias/engenharia-software-2-2026/CLAUDE.md
Criando nova matéria/disciplina?     → Copie materias/engenharia-software-2-2026/ como modelo
Mais detalhes?                       → ../../CLAUDE.md (raiz)
```

## Ver também

- [[business]] — domínio do Sistema Unespão (resumo + link para produto/).
- [[architecture]] — arquitetura documentada (resumo + link para produto/).
