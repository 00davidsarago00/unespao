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
materias/<nome>/docs/01-06,99.md     ← Conteúdo da disciplina (Markdown primeiro)
materias/<nome>/template-*.tex        ← Gerado a partir do Markdown (nunca editado)
materias/<nome>/template-*.pdf        ← Compilado a partir do .tex (sob pedido)
```

## Roteamento para agentes

### Contexto sobre Sistema Unespão

Dúvida sobre **domínio** (atores, requisitos, escopo, objetivos de qualidade)?
→ Leia `produto/business.md` + se necessário, `materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`.

Dúvida sobre **arquitetura** (stack, C4, Clean Architecture, SOLID, decisões)?
→ Leia `produto/architecture.md` + se necessário, `materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`.

### Trabalho de redação/documento em uma disciplina específica

Seguindo ESII 2026?
→ Leia `materias/engenharia-software-2-2026/CLAUDE.md` completamente — contém pipeline MD→tex→PDF, processo das três vertentes (Redator, PO, Avaliador), fontes de conteúdo vs. forma, regras que valem para aquela entrega.

### Criando uma nova disciplina/apresentação

Copie a estrutura de `materias/engenharia-software-2-2026/` como **modelo**:
1. `materias/<nome-da-sua-materia>/` — cria a pasta.
2. Copia os arquivos-base: `docs/`, `CLAUDE.md`, `template-*`, `refs.bib`, `exercicios-referencia/`, `slides-teoricos/`, `images/`, e o app React se aplicável.
3. Adapta `CLAUDE.md` para o contexto da sua disciplina.
4. Usa `produto/business.md` e `produto/architecture.md` como **ponto de partida** — não repete perguntas sobre domínio/arquitetura.
5. Confirma com stakeholders (usuário, professor) **quaisquer diferenças de escopo** em relação ao documentado em `produto/`.

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

docs/
  adr/                      # Decisões arquiteturais (ADRs)
  todo/
  done/

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
