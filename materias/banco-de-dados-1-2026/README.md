# Banco de Dados I (UNESP, 2026) — Projeto Final Sistema Unespão

Esta pasta é o **entregável completo e autocontido** da disciplina Banco de
Dados I (UNESP, 2026): normalização e implementação em **MySQL** do banco de
dados do **Sistema Unespão** (plataforma de pedidos personalizados estilo
Subway/Spoleto para a padaria Unespão).

**Prazo: 16/09/2026.**

## Os três entregáveis

| # | Entregável | Fonte no repositório | Peso |
|---|---|---|---|
| i | **PDF** com modelo conceitual + lógico + físico e suas explicações | `docs/01`, `docs/02`, `docs/03` | NP = 1,0 |
| ii | **Script `.sql`** executável em outra máquina, recriando schema e tabelas | `sql/unespao.sql` | (integra NP) |
| iii | **Slides** com os pontos principais do documento | `slides/slides.md` | NA = 0,5 |

Os slides valem **um terço do peso total** — são entregável de peso próprio, não
subproduto do documento.

## Estrutura

```
docs/
  01-modelo-conceitual.md          # Parte I: minimundo, regras de negócio, DER (Chen)
  02-modelo-logico.md              # Parte II: mapeamento MER→relacional, normalização
  03-modelo-fisico.md              # Parte III: decisões físicas (narrativa)
  99-divergencias-produto.md       # interno — NÃO entra no PDF

sql/
  unespao.sql                      # ENTREGÁVEL (ii) — fonte canônica de todo o DDL

slides/
  slides.md                        # ENTREGÁVEL (iii) — fonte em Markdown

images/
  der-conceitual.png               # DER em notação de Chen
  diagrama-logico.png              # modelo lógico normalizado

arquivos_do_classroom/             # fontes da disciplina — não editar
  atividade_target.md              # enunciado literal (normativo)
  UNESPao ERD Final.pdf            # "última versão enviada" — insumo a normalizar
  *.pptx                           # slides de aula (conteúdo já extraído, não reprocessar)

build/                             # saídas geradas (PDF, PPTX) — só sob pedido

CLAUDE.md                          # regras normativas completas desta entrega
README.md                          # este arquivo
```

## Pipeline de produção

Trabalho em **Markdown primeiro**, com três saídas:

1. **`docs/*.md` → PDF** — gerado apenas sob pedido explícito.
2. **`sql/unespao.sql`** — entregável direto. **Exceção à regra Markdown-first:**
   é escrito como código e é a **fonte única do DDL**; `docs/03-modelo-fisico.md`
   traz só a narrativa e o script é anexado verbatim ao PDF.
3. **`slides/slides.md` → PPTX/PDF** — gerado apenas sob pedido explícito.

**Nenhum binário é gerado sem pedido explícito do usuário.**

## O modelo em uma olhada

**14 entidades**, evoluídas a partir das 7 da versão anterior, em resposta ao
feedback do professor:

| Grupo | Entidades |
|---|---|
| Atores | `Cliente`, `Atendente`* |
| Catálogo | `CategoriaProdutoBase`*, `ProdutoBase`, `CategoriaIngrediente`*, `Ingrediente`, `ProdutoBaseIngredienteCompativel`* |
| Estoque | `EstoqueProdutoBase`, `EstoqueIngrediente` |
| Pedido | `StatusPedido`*, `Pedido`, `ItemPersonalizado` (fraca), `ItemIngrediente` |
| Avaliação | `AvaliacaoPrato` (fraca) |

`*` = introduzida nesta revisão.

Mudanças estruturais: `ItemPersonalizado` passa a **entidade fraca** de `Pedido`
(chave parcial `numero_item`); `AvaliacaoPrato` passa a **entidade fraca com dois
relacionamentos identificadores**; o antigo `Estoque` polimórfico é desdobrado
em duas entidades; o atributo `Opcional` migra de `Ingrediente` para a
associativa de compatibilidade.

O **modelo conceitual e o modelo lógico são deliberadamente diferentes** — o
lógico elimina o vínculo `Cliente ↔ AvaliacaoPrato` por transitividade (3FN), e
essa diferença é a evidência do mapeamento MER → relacional que o professor
apontou estar faltando.

## Conhecimento compartilhado

Esta pasta reutiliza conhecimento documentado em **`../../produto/`**:

- **`../../produto/business.md`** — domínio, atores, escopo, objetivos de
  qualidade.
- **`../../produto/architecture.md`** — arquitetura do sistema-alvo e fronteiras
  de sistema.

**Divergências intencionais** em relação a esse conhecimento (MySQL em vez de
PostgreSQL, `INT` em vez de `Guid`, escopo reduzido) estão registradas em
`docs/99-divergencias-produto.md`. Nenhuma delas justifica alterar `produto/`.

O mesmo produto é documentado sob outra ótica em
`../engenharia-software-2-2026/` — consulte para contexto de domínio, mas não
copie prosa de lá para cá.

## Consulte também

- **`CLAUDE.md`** (nesta pasta) — regras normativas completas: enunciado
  literal, feedback do professor, pipeline, convenções de nomenclatura, processo
  de revisão com gate de execução.
- **`../../CLAUDE.md`** (raiz) — roteamento entre `produto/` e `materias/`.
