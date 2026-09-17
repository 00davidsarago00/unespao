# CLAUDE.md — Orientação para Agentes

Este arquivo é o índice para agentes trabalhando com este repositório. Para conteúdo normativo **completo** de uma disciplina específica, ver `materias/<nome>/CLAUDE.md`.

## O que é este repositório

KB (knowledge base) do grupo sobre o **Sistema Unespão** — plataforma de pedidos personalizados estilo Subway/Spoleto para a padaria Unespão. Organiza conhecimento em duas camadas:

1. **`produto/`** (raiz) — conhecimento central, agnóstico de disciplina (domínio, arquitetura, decisões reutilizáveis).
2. **`materias/<nome-da-materia>/`** (raiz) — entregáveis autocontidos por disciplina, cada um com regras próprias.

## Como conhecimento flui

```
produto/{business,architecture}.md   ← Fonte canônica de domínio/arquitetura
         ↓ (referência rápida)
materias/<nome>/CLAUDE.md             ← Regras normativas específicas da disciplina
materias/<nome>/docs/*.md             ← Conteúdo da disciplina (Markdown primeiro)
materias/<nome>/<artefato final>      ← Gerado a partir do Markdown (tex/PDF, .sql, slides — ver CLAUDE.md da matéria)
```

## Roteamento para agentes

### Contexto sobre Sistema Unespão

Dúvida sobre **domínio** (atores, requisitos, escopo, objetivos de qualidade)?
→ Leia `produto/business.md` + se necessário, `materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`.

Dúvida sobre **arquitetura** (stack, C4, Clean Architecture, SOLID, decisões)?
→ Leia `produto/architecture.md` + se necessário, `materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`.

### Trabalho de redação/documento em uma disciplina específica

Leia **inteiro** o `CLAUDE.md` da matéria antes de editar — cada uma tem pipeline, papéis de revisão e prazo próprios:

| Matéria | Pasta | Entregável | Prazo |
|---|---|---|---|
| Engenharia de Software II | `materias/engenharia-software-2-2026/` | Documento MD→tex→PDF + protótipo React | sem data registrada |
| Banco de Dados I | `materias/banco-de-dados-1-2026/` | PDF (modelos) + `.sql` MySQL + slides | 16/09/2026 |
| Gestão de Projetos | `materias/gestao-de-projetos-2026/` | Seminário "LLM e o Desenvolvimento de Software" (pesquisa + slides) | 18/09/2026 |

### Trabalho em equipe — pegar ou criar uma atividade

Atividades atribuíveis a qualquer membro ficam em **`docs/todo/<ID>-<slug>.md`** (frontmatter com `owner`, `status`, `ler_antes`, `saida`, `criterios_de_aceite`). Antes de executar uma tarefa:
1. Leia `docs/COLABORACAO.md` (protocolo: pegar → branch → PR com revisão → `docs/done/`).
2. Leia a tarefa e **todos** os arquivos de `ler_antes`.
3. Altere **somente** o que está em `saida` (e o próprio arquivo da tarefa); respeite `fora_de_escopo`.
4. Dúvida → registre em "Perguntas em aberto" da tarefa e pergunte ao usuário. Nunca invente.

Decisões estruturais do repositório ficam em `docs/adr/` (índice em `docs/adr/README.md`).

### Criando uma nova disciplina/apresentação

Use como **modelo** a matéria mais parecida (documento → ESII; banco/script → BD1; seminário/pesquisa → GP):
1. `materias/<nome-da-sua-materia>/` — cria a pasta, com `arquivos_do_classroom/` para enunciado e slides de aula.
2. Copia os arquivos-base relevantes: `CLAUDE.md`, `README.md`, `docs/` (e `template-*`, `refs.bib`, app React etc. se aplicável).
3. Adapta `CLAUDE.md` para o contexto da sua disciplina (enunciado literal, prazo, papéis de revisão, fontes).
4. Adiciona a matéria na tabela acima, na estrutura abaixo e no `README.md` raiz; cria tarefas em `docs/todo/` com o prefixo da matéria (registrar o prefixo em `docs/COLABORACAO.md`).
5. Usa `produto/business.md` e `produto/architecture.md` como **ponto de partida** — não repete perguntas sobre domínio/arquitetura.
6. Confirma com stakeholders (usuário, professor) **quaisquer diferenças de escopo** em relação ao documentado em `produto/`.

Se a nova disciplina exigir ajustes no produto (novos requisitos, decisões diferentes), **atualiza `produto/` com consenso** — assim todas as disciplinas reutilizam o conhecimento consolidado.

## Regra geral que vale para QUALQUER matéria

**Nunca inventar** dados de negócio, decisões arquiteturais, métricas, nomes de RA ou datas que não estejam nas fontes ou confirmadas pelo usuário. **Perguntar em vez de assumir.**

## Estrutura do repositório

```
produto/
  README.md                 # O que é a pasta produto/
  business.md               # Domínio agnóstico de disciplina
  architecture.md           # Arquitetura agnóstica de disciplina

materias/
  engenharia-software-2-2026/
    CLAUDE.md               # Regras normativas DESTA disciplina
    README.md               # Entregável ESII 2026
    docs/
      01-introducao-objetivos.md
      02-arquitetura-sistema.md
      ... (capítulos 03-06, 99)
    exercicios-referencia/
    slides-teoricos/
    images/
    src/                    # Protótipo React (demo)
    template-*.tex, .pdf
    Sistema-Unespao-ESII.pdf
    ... (mais arquivos)
  banco-de-dados-1-2026/
    CLAUDE.md, README.md
    arquivos_do_classroom/  # Enunciado + slides de aula
    docs/                   # 01-03 modelos conceitual/lógico/físico, 99 divergências
    sql/unespao.sql         # Fonte única do DDL
    slides/slides.md
  gestao-de-projetos-2026/
    CLAUDE.md, README.md
    arquivos_do_classroom/  # Enunciado + 9 pptx de aula
    docs/                   # 00 estratégia, 01-07 pesquisa, 08 roteiro, 99 fontes

docs/
  COLABORACAO.md            # Protocolo multiusuário (pegar/entregar tarefas)
  adr/                      # Decisões estruturais (ADRs) + README.md (índice)
  todo/                     # _TEMPLATE.md + tarefas abertas/em andamento
  done/                     # Tarefas concluídas

.claude/
  memory/
    business.md             # Resumo curto + link para produto/business.md
    architecture.md         # Resumo curto + link para produto/architecture.md
    guidelines.md           # Convenções e processo de redação

README.md                   # Índice visual do repositório
CLAUDE.md                   # Este arquivo
```

## Ver também

- `README.md` (raiz) — visão geral do repositório.
- `produto/README.md` — orientação para usar `produto/` em diferentes contextos.
- `materias/engenharia-software-2-2026/README.md` — estrutura de ESII 2026.
- `materias/engenharia-software-2-2026/CLAUDE.md` — normas completas para ESII 2026 (pipeline, três vertentes, fontes, regras).
- `materias/banco-de-dados-1-2026/CLAUDE.md` — normas completas para BD1 2026.
- `materias/gestao-de-projetos-2026/CLAUDE.md` — normas completas para o seminário de GP 2026.
- `docs/COLABORACAO.md` — protocolo de trabalho em equipe; `docs/adr/0001-tarefas-em-arquivo-para-kb-multiusuario.md` — por que é assim.
