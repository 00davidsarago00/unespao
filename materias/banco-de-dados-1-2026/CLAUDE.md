# CLAUDE.md — Banco de Dados I (UNESP, 2026)

Regras normativas **completas** desta entrega. Agentes que trabalharem nesta
pasta devem ler este arquivo integralmente antes de qualquer edição.

## 1. O que é esta pasta

Entregável autocontido da disciplina **Banco de Dados I (UNESP, 2026)** — projeto
final de normalização e implementação em MySQL do banco de dados do **Sistema
Unespão** (plataforma de pedidos personalizados estilo Subway/Spoleto para a
padaria Unespão).

Esta pasta vive dentro de um repositório maior (`../../` — raiz) que organiza:

- **`../../produto/`** — conhecimento central e agnóstico de disciplina sobre o
  Sistema Unespão (`business.md`, `architecture.md`).
- **`../../materias/<nome>/`** — entregáveis autocontidos por disciplina.

**Importante:** o **mesmo produto** é trabalhado em disciplinas diferentes, por
recortes e times diferentes. `../engenharia-software-2-2026/` documenta o mesmo
Sistema Unespão sob a ótica de Engenharia de Software II. Consulte aquela pasta
para **contexto de domínio**; nunca copie prosa de lá para cá — o recorte, o
público e os critérios de avaliação são outros.

## 2. O que a disciplina exige

### Enunciado literal do professor

> Para esta entrega final 3 entregas: i) o PDF com modelos e suas explicações,
> ii) o arquivo .sql para ser executado em outra máquina e recriar o BD e
> recriar todas as tabelas, e iii) os slides sobre o projeto;
>
> A partir da última versão enviada, normalize o banco de dados de seu projeto e
> o implemente no MySQL;
>
> **i) Documento PDF do projeto de banco de dados que deverá conter 3 partes:**
> - Modelo conceitual: explicação sobre o minimundo, regras de negócio e o DER
>   (Diagrama Entidade-Relacionamento);
> - Modelo lógico: diagrama lógico já normalizado, com possíveis justificativas
>   de design;
> - Modelo físico: arquivo .sql comentado
>
> **ii) Para o script .sql** (arquivo contendo todos os comandos SQL — como
> visto em aula):
> - Crie um novo esquema (com o nome de seu projeto)
> - Crie as tabelas (aplique todas as restrições (constraints) necessárias)
> - Crie 3 SELECTs que exemplifiquem as principais funcionalidades
>
> **iii) Para a apresentação** façam slides com os pontos principais do
> documento.
>
> Lembrando que a Nota do Projeto (NP) vale 1 na média e a apresentação (NA)
> vale 0.5 na média.

### Implicações diretas

- São **três entregáveis distintos**, não um. O PDF sozinho não fecha a entrega.
- A apresentação vale **um terço do peso total** (0,5 de 1,5). Os slides não são
  subproduto do documento — são entregável de peso próprio e devem ser escritos
  **em paralelo** com ele, não no final.
- O verbo é **"normalize"**, com a âncora *"a partir da última versão enviada"*.
  A entrega precisa demonstrar **continuidade e evolução** em relação ao DER já
  submetido, não um redesenho do zero.
- O enunciado pede explicitamente **"possíveis justificativas de design"** no
  modelo lógico. Um diagrama sem texto justificativo não atende ao pedido.
- "Para ser executado em outra máquina" significa que o script precisa ser
  **autocontido e idempotente** — cria o schema, cria todas as tabelas, sem
  depender de nada preexistente.

### Prazo

**16/09/2026.** Ver seção 9 sobre a priorização que este prazo impõe.

## 3. Feedback do professor sobre a versão anterior

Este feedback é **normativo** — a entrega é avaliada, entre outras coisas, por
respondê-lo. Cada ponto e onde é tratado:

| # | Apontamento do professor | Onde é respondido |
|---|---|---|
| 1 | "Na seção da descrição do minimundo, adicione texto corrido sobre o cenário a ser tratado; e não a explicação de cada Entidade. As entidades devem ser derivadas do minimundo (domínio) e não o contrário." | `docs/01-modelo-conceitual.md` §1 — minimundo em narrativa pura, sem vocabulário de modelagem; entidades derivadas depois |
| 2 | "Não consigo entender qual o encadeamento de raciocínio entre as entidades (ex.: pq um Pedido precisa obrigatoriamente de um ItemPersonalizado? Qual a diferença entre ProdutoBase e Ingrediente?)" | `docs/01-modelo-conceitual.md` §2 — regras de negócio RN-01 a RN-21, com §2.1 e §2.4 respondendo literalmente às duas perguntas |
| 3 | "ItemPersonalizado parece ser uma entidade fraca — atualize o diagrama para que isso seja refletido." | RN-06, RN-07; borda dupla no DER, chave parcial `numero_item` |
| 4 | "AvaliacaoPrato também seria uma entidade fraca? Não deveria ter os identificadores de Cliente e ItemPersonalizado?" | RN-10, RN-11; entidade fraca com **dois** relacionamentos identificadores |
| 5 | "A modelagem ainda está muito simples. É necessário adicionar mais umas 3-4 entidades... Aqui parece que o MER e o mapeamento Relacional estão como a mesma coisa, mas não devem ser (faltou o mapeamento para o relacional?)" | Modelo passa de 7 para **14 entidades**; e `docs/02-modelo-logico.md` traz o **mapeamento explícito** MER → relacional, com o conceitual e o lógico deliberadamente **diferentes entre si** |

> **O ponto 5 é o mais estruturante.** O modelo conceitual e o modelo lógico
> **não podem ser o mesmo diagrama com outro nome.** A diferença mais visível
> entre eles é o tratamento de `AvaliacaoPrato`: o conceitual mostra os dois
> vínculos identificadores (com `Cliente` e com `ItemPersonalizado`); o lógico
> **elimina** o vínculo com `Cliente` por ser transitivo, e documenta a regra de
> 3FN que motiva a eliminação. Essa diferença precisa ficar **visual e
> textualmente óbvia** no documento — ela é a evidência de que o mapeamento foi
> feito.

## 4. Pipeline de produção

Trabalho em **Markdown primeiro**, sempre. São **três saídas** distintas:

### (a) `docs/*.md` → PDF — entregável (i)

Toda redação e iteração acontece nos `.md` de `docs/`. O PDF é gerado **apenas
sob pedido explícito** ("gera o pdf", "compila").

### (b) `sql/unespao.sql` → entregável (ii)

**Exceção documentada à regra "Markdown primeiro".** O `.sql` é
simultaneamente um entregável autônomo e o conteúdo da parte "Modelo físico" do
PDF. Por isso:

- **`sql/unespao.sql` é a fonte única e canônica de todo o DDL.** É escrito como
  código, não transcrito de prosa Markdown.
- **`docs/03-modelo-fisico.md` não duplica o DDL.** Contém apenas a narrativa
  (por que InnoDB, por que `utf8mb4`, por que esses tipos, por que esses
  índices, o que cada SELECT demonstra). Na geração do PDF, o script é anexado
  **verbatim** como apêndice.
- Qualquer duplicação de DDL entre `.md` e `.sql` **vai divergir** e é
  considerada defeito.

### (c) `slides/slides.md` → PPTX/PDF — entregável (iii)

Fonte em Markdown; o binário é gerado **apenas sob pedido explícito**.

### Regra dura

**Nenhum binário — PDF, PPTX — é gerado sem pedido explícito do usuário.** Nunca
como efeito colateral de uma edição de conteúdo.

## 5. Estrutura de arquivos

Caminhos relativos a esta pasta (`materias/banco-de-dados-1-2026/`):

```
CLAUDE.md                          # este arquivo — regras normativas
README.md                          # visão geral da entrega

docs/
  01-modelo-conceitual.md          # Parte I: minimundo, regras de negócio, DER
  02-modelo-logico.md              # Parte II: mapeamento MER→relacional, normalização
  03-modelo-fisico.md              # Parte III: decisões físicas (narrativa; DDL vive em sql/)
  99-divergencias-produto.md       # interno — NÃO entra no PDF

sql/
  unespao.sql                      # ENTREGÁVEL (ii) — fonte canônica do DDL

slides/
  slides.md                        # ENTREGÁVEL (iii) — fonte em Markdown

images/
  der-conceitual.png               # figura do DER (notação de Chen)
  diagrama-logico.png              # figura do modelo lógico normalizado

arquivos_do_classroom/             # fontes — não editar
build/                             # saídas geradas (PDF, PPTX) — só sob pedido
```

## 6. Fontes e como usá-las

### (a) Normativo — a coisa contra a qual a entrega é conferida

- **`arquivos_do_classroom/atividade_target.md`** — enunciado literal. Toda
  revisão final confere a entrega item a item contra este arquivo.
- **Feedback do professor** (seção 3 acima) — igualmente normativo.

### (b) Conteúdo do sistema

- **`../../produto/business.md`** — domínio, atores, escopo, requisitos,
  objetivos de qualidade. **Leitura rápida de partida.**
- **`../../produto/architecture.md`** — arquitetura do sistema-alvo, fronteiras
  de sistema, integrações externas.
- **`arquivos_do_classroom/UNESPao ERD Final.pdf`** — a **"última versão
  enviada"** a que o enunciado se refere. É o **insumo a normalizar**, não um
  arquivo de aula. Ponto de partida obrigatório: a entrega deve evidenciar
  evolução em relação a ele.

### (c) Apoio teórico

- **`arquivos_do_classroom/*.pptx`** (11 arquivos) — slides de aula sobre
  normalização, formas normais, mapeamento MER→relacional e DDL.
  **O conteúdo teórico relevante já foi extraído. NÃO reprocessar estes
  arquivos** — são pesados e o custo de releitura não se justifica.
- São apoio de **vocabulário e critério**, nunca fonte de conteúdo sobre o
  Sistema Unespão.

### (d) Referência cruzada

- **`../engenharia-software-2-2026/`** — mesmo produto, outra disciplina.
  Consultar para contexto de domínio. **Nunca copiar prosa de lá para cá.**

### Regra de separação

**Nunca misture:** conteúdo do sistema vem de `produto/` + do DER anterior +
input do usuário. Forma e vocabulário de como documentar vêm dos slides de aula
e do enunciado.

## 7. Divergências intencionais em relação a `produto/`

Esta entrega diverge deliberadamente do conhecimento canônico do produto em
alguns pontos. **Nenhuma dessas divergências justifica alterar
`../../produto/architecture.md` ou `../../produto/business.md`.**

| # | Divergência | Natureza |
|---|---|---|
| D-01 | **MySQL 8.0.16+** em vez do PostgreSQL de `produto/architecture.md` | Restrição de ferramenta da disciplina. O que é avaliado aqui — entidades, cardinalidades, formas normais, constraints — é portável entre SGBDs; só o dialeto DDL muda |
| D-02 | **`INT UNSIGNED AUTO_INCREMENT`** em vez de `Guid` | Aderência ao conteúdo de aula + adequação ao índice clusterizado do InnoDB |
| D-03 | `Atendente` e pagamento **incluídos** no modelo | Mudança de estratégia motivada pelo feedback do professor; aproxima o modelo de `produto/business.md` |
| D-04 | Escopo reduzido (OAuth, sugestões, canais, CEP não modelados) | Consequência correta de o modelo representar fatos persistidos, não canais nem integrações |
| D-05 | Nomenclatura `snake_case` no relacional | Convenção da disciplina; conversão ocorre no mapeamento (Parte II) |

Detalhamento completo em **`docs/99-divergencias-produto.md`**.

**Se um agente identificar uma "inconsistência" entre esta entrega e
`produto/`: consultar aquele arquivo antes de corrigir qualquer coisa.** Muito
provavelmente é intencional.

## 8. Convenções de nomenclatura e físicas

Fixadas antes da primeira linha de DDL. **Não reabrir.**

| Item | Convenção |
|---|---|
| SGBD alvo | **MySQL 8.0.16+** (a versão importa: `CHECK` só é efetivamente aplicado a partir dela) |
| Chave primária | `INT UNSIGNED AUTO_INCREMENT` |
| Nomes de tabelas e colunas | `snake_case` minúsculo, tabelas no **singular** |
| Nome da PK | `id` (simples, dentro da própria tabela) |
| Nome da FK | `<tabela_referenciada>_id` (ex.: `cliente_id` → `cliente(id)`) |
| Engine | `InnoDB` |
| Charset / collation | `utf8mb4` / `utf8mb4_0900_ai_ci` |
| Valores monetários | `DECIMAL`, nunca `FLOAT`/`DOUBLE` |
| Nome do schema | `unespao` |

Os nomes **conceituais** das entidades permanecem em `PascalCase` no texto de
`docs/01-modelo-conceitual.md`, por continuidade com a versão anterior entregue
ao professor. A conversão para `snake_case` é parte do mapeamento para o
relacional (Parte II).

## 9. Processo de revisão

Três vertentes, **executadas em sequência**, mais um gate não negociável.

| Vertente | Responsabilidade | Critério de saída |
|---|---|---|
| **1. Modelador** | Produz conceitual → lógico → físico em Markdown + o `.sql`, a partir do DER anterior e de `produto/` | As 3 partes do enunciado estão cobertas |
| **2. Revisor técnico (DBA)** | Formas normais justificadas (1FN → 3FN/BCNF), completude de constraints (PK, FK, UNIQUE, NOT NULL, CHECK, políticas `ON DELETE`/`ON UPDATE`), tipos, índices, engine e charset; e se os 3 SELECTs são de fato representativos | Nenhuma anomalia de normalização sem justificativa escrita; nenhuma FK sem política referencial |
| **3. Avaliador (professor)** | Confere **literalmente** contra `arquivos_do_classroom/atividade_target.md` e contra os 5 pontos de feedback da seção 3 | Checklist do enunciado 100% marcado; os 5 apontamentos respondidos de forma verificável |
| **GATE — Execução real** | Rodar o `.sql` de ponta a ponta em MySQL 8 limpo (`docker run --rm mysql:8`), com DROP + CREATE, e executar os 3 SELECTs | Saída limpa, **zero erros** — reproduzido após **toda** edição no `.sql` |

### Por que este processo difere do de ESII

Em `../engenharia-software-2-2026/` as vertentes são Redator → PO → Avaliador. O
PO existe lá porque o entregável é prosa cuja fidelidade ao minimundo é
subjetiva. Aqui o domínio já está congelado em `produto/` e o professor avalia
**normalização**, não coerência de produto — o valor do PO é baixo e o do DBA é
alto. A substituição é deliberada.

O **gate de execução** não tem equivalente em ESII porque prosa não compila.
Aqui metade do entregável é código verificável: um script não executado é, de
longe, a forma mais provável de perder nota nesta entrega.

### Ordem de execução

As três partes são **estritamente encadeadas** (conceitual → lógico → físico):
uma mudança no conceitual invalida tudo abaixo. As vertentes rodam **em
sequência por artefato**, nunca em paralelo por capítulo. **O modelo conceitual
congela primeiro**; só então o lógico é tocado.

## 10. Regras gerais

- **Nunca gerar PDF ou slides sem pedido explícito.**
- **Nunca declarar o `.sql` pronto sem tê-lo executado** em MySQL limpo. "Deve
  funcionar" não é critério de saída.
- **Nunca duplicar DDL** entre `docs/*.md` e `sql/unespao.sql`. Fonte única em
  `sql/`.
- **Nunca inventar** regra de negócio, dado, membro do grupo, RA ou data que não
  esteja nas fontes ou não tenha sido confirmado pelo usuário. Toda dúvida real
  não resolvida pelas fontes vira **pergunta ao usuário**, nunca suposição
  silenciosa.
- **Não reprocessar os `.pptx`** de `arquivos_do_classroom/` — conteúdo já
  extraído.
- **Não alterar `produto/`** por conta de decisões locais desta disciplina (ver
  seção 7).
- **`docs/99-divergencias-produto.md` não entra no PDF** entregue.

### Sobre priorização — e a diferença em relação a ESII

O `CLAUDE.md` de Engenharia de Software II contém a regra *"Não há pressa"*.
**Essa regra não vale aqui, e copiá-la para cá seria erro operacional.**

O prazo é **16/09/2026** e o entregável é parcialmente verificável por execução.
A prioridade, nesta ordem:

1. **Entregável completo** — os três itens existem (PDF, `.sql`, slides).
2. **Script executável** — o `.sql` roda sem erro em máquina limpa.
3. **Feedback do professor respondido** — os 5 pontos da seção 3, de forma
   verificável.
4. **Refinamento de prosa.**

Diante de escassez de tempo, corta-se de baixo para cima. Um documento
primoroso acompanhado de um script que não executa vale menos que o inverso.

## 11. Ver também

- `README.md` (nesta pasta) — visão geral da entrega.
- `../../CLAUDE.md` (raiz) — roteamento entre `produto/` e `materias/`.
- `../../produto/business.md` e `../../produto/architecture.md` — conhecimento
  canônico do Sistema Unespão.
- `../engenharia-software-2-2026/CLAUDE.md` — o mesmo produto sob a ótica de
  Engenharia de Software II.
