<!-- Última atualização: 2026-09-15 -->
<!--
ENTREGÁVEL (iii) — slides da apresentação. Fonte em Markdown.
Cada `---` separa um slide. Compatível com Marp e com Pandoc/beamer.
O binário (PPTX/PDF) só é gerado sob pedido explícito — ver CLAUDE.md §4.

ARQUITETURA DESTA APRESENTAÇÃO
A ordem dos slides espelha deliberadamente a estrutura do enunciado
(arquivos_do_classroom/atividade_target.md): o slide "Os três entregáveis"
ancora tudo, três divisores rotulam as PARTES 1/2/3 exigidas pelo item (i), e o
checklist final permite conferência item a item. O clímax continua sendo o caso
AvaliacaoPrato, que mora dentro da PARTE 2.

Notas do apresentador ficam em blocos "> **Falar:**" e NÃO devem ir para o
slide renderizado — são roteiro, não conteúdo projetado.

⚠️ PENDÊNCIA: confirmar com o grupo se os quatro nomes da capa continuam
corretos (extraídos dos metadados de "UNESPao ERD Final.pdf"). RAs não foram
incluídos por não constarem de nenhuma fonte.
-->

# Sistema Unespão

## Projeto de Banco de Dados — Normalização e Implementação em MySQL

**Banco de Dados I — UNESP, 2026**

David Sarago · Guilherme Molina · Lucas Costa · Thiago Mitsuo

---

## Os três entregáveis

| | Entregável | Onde está |
|---|---|---|
| **i** | **Documento PDF** com três partes: modelo **conceitual** (minimundo, regras de negócio, DER), modelo **lógico** (diagrama normalizado + justificativas de design) e modelo **físico** (script `.sql` comentado) | Documento entregue — Capítulos 1, 2 e 3 |
| **ii** | **Script `.sql`**: cria um novo esquema com o nome do projeto, cria as tabelas com todas as restrições, e traz **3 SELECTs** das principais funcionalidades | `unespao.sql` |
| **iii** | **Slides** com os pontos principais do documento | Esta apresentação |

**Tarefa central:** *"a partir da última versão enviada, **normalize** o banco de
dados e o implemente no MySQL"*.

> **Falar:** este slide é o mapa. A apresentação segue exatamente esta ordem —
> Parte 1, Parte 2, Parte 3 — e fecha com um checklist do enunciado.

---

## Roteiro

**Ponto de partida** — o feedback recebido e o que fizemos com ele

**PARTE 1 — Modelo Conceitual**
Minimundo · Regras de negócio · DER

**PARTE 2 — Modelo Lógico**
Mapeamento MER → Relacional · Normalização · **o caso `AvaliacaoPrato`**

**PARTE 3 — Modelo Físico**
Esquema e tabelas · Restrições · Prova de execução · As 3 consultas

**Fechamento** — escopo e checklist do enunciado

> **Falar:** o clímax é o caso `AvaliacaoPrato`, dentro da Parte 2 — é onde o
> modelo conceitual e o modelo lógico deixam de ser a mesma coisa.

---

## O ponto de partida: o feedback recebido

| # | Apontamento | O que fizemos |
|---|---|---|
| 1 | Minimundo deve ser texto corrido; entidades derivam do domínio, não o contrário | Minimundo reescrito como **narrativa**, sem vocabulário de modelagem. Entidades aparecem só depois, derivadas dele |
| 2 | Falta o encadeamento de raciocínio entre as entidades | **21 regras de negócio** ligando cada entidade à sua motivação no domínio |
| 3 | `ItemPersonalizado` parece entidade fraca | Modelada como **fraca**, com chave parcial `numero_item` e relacionamento identificador |
| 4 | `AvaliacaoPrato` também seria fraca? Não deveria ter os identificadores de Cliente e ItemPersonalizado? | Modelada como **fraca com dois relacionamentos identificadores** — e é daí que sai o melhor caso de normalização do trabalho |
| 5 | Modelagem muito simples; MER e mapeamento relacional parecem a mesma coisa | **7 → 14 entidades**; e os dois modelos agora são **deliberadamente diferentes** |

> **Falar:** os cinco pontos foram tratados como requisito, não como sugestão.

---

# PARTE 1

## Modelo Conceitual

### Minimundo · Regras de negócio · DER

> Item (i) do enunciado, primeira parte: *"explicação sobre o minimundo, regras
> de negócio e o DER"*.

---

## O minimundo

A Unespão adotou o modelo de **montagem personalizada** (estilo Subway/Spoleto)
e o pedido verbal no balcão virou gargalo: filas em horário de pico, pedidos
anotados de forma ambígua, divergência entre o pedido e o entregue — e **nenhum
registro** do que cada cliente costuma consumir.

No cenário reformulado, o cliente se identifica no totem ou no celular e monta
sua preparação em duas etapas: escolhe **uma fundação** (pão artesanal, massa
especial, base leve) e sobre ela acrescenta **quantos complementos quiser**
(proteínas, queijos, vegetais, molhos, crocantes). Monta quantas preparações
quiser, paga tudo de uma vez por um serviço externo, acompanha o preparo, e
depois **avalia cada preparação separadamente**.

Esse histórico de pedidos e avaliações é o que permite **sugerir**, na próxima
visita, o que aquele cliente mais consome e melhor avaliou.

Na retaguarda, um **atendente** mantém o cardápio e o estoque — porque um item
sem insumo não pode ser oferecido no totem.

> **Falar:** nenhuma palavra de modelagem neste slide. Foi exatamente o pedido do
> ponto 1 do feedback. As entidades vêm do texto, não antes dele.

---

## As regras de negócio

**21 regras (RN-01 a RN-21)** derivam o modelo do minimundo. As estruturantes:

| RN | Regra |
|---|---|
| **01–02** | Toda preparação tem **exatamente uma** fundação e **de zero a N** complementos |
| **03** | Um complemento pode ser repetido por **quantidade de porções**, não por repetição de linha |
| **04** | A compatibilidade fundação × complemento define **se é permitida** e se o complemento é padrão ou acréscimo pago |
| **06–07** | `ItemPersonalizado` **não existe fora** de um pedido; e todo pedido tem **ao menos um** item |
| **09–11** | A avaliação incide sobre **uma preparação específica**, não sobre o pedido inteiro; uma por cliente por prato |
| **13–14** | Cada insumo tem **um registro de estoque** e um **limiar próprio** de reposição |
| **16–17** | O preço é **congelado** na preparação no momento da compra; os totais são **derivados** |
| **18** | O pagamento é externo: o banco guarda só **meio e desfecho**, nunca dados de cartão |
| **19–20** | O atendente mantém catálogo e estoque — e o estoque **registra quem** o atualizou |

> **Falar:** cada uma dessas regras responde ao ponto 2 do feedback — o
> encadeamento de raciocínio entre as entidades.

---

## Duas regras que o feedback cobrou diretamente

**"Qual a diferença entre `ProdutoBase` e `Ingrediente`?"**

| Critério | `ProdutoBase` (fundação) | `Ingrediente` (complemento) |
|---|---|---|
| Papel | Define formato e preparo | Aplicado **sobre** a fundação |
| Quantidade por preparação | Exatamente **1** | **0..N** |
| Preço | Define o **preço de partida** | **Acresce** ao de partida |
| Sozinho é vendável? | **Sim** | **Não** |

**"Por que um `Pedido` precisa obrigatoriamente de um `ItemPersonalizado`?"**

> Um pedido vazio não representa fato nenhum do mundo real. Não há o que
> preparar, o que cobrar, nem o que entregar.

No DER, isso é a cardinalidade **(1, N)** de `Pedido` no relacionamento
identificador `contem`.

---

## O DER — de 7 para 14 entidades

![DER do Sistema Unespão em notação de Chen](../images/der-conceitual.png)

**Figura 1** — DER em notação de Chen. Entidades fracas em borda dupla;
relacionamentos identificadores em losango de borda dupla; atributos derivados
em elipse tracejada.

---

## As 5 entidades novas — e por que cada uma existe

| Entidade nova | Problema que resolve |
|---|---|
| **`Atendente`** | Ator do domínio que estava ausente. Dá rastreabilidade ao estoque: **quem** atualizou e **quando** |
| **`CategoriaProdutoBase`** | Organiza o cardápio. Sem ela, a categoria seria texto repetido em cada produto |
| **`CategoriaIngrediente`** | Idem, para os complementos |
| **`ProdutoBaseIngredienteCompativel`** | Corrige um erro de alocação: `Opcional` **não é** propriedade do ingrediente |
| **`StatusPedido`** | Substitui texto livre por domínio fechado, com as regras de cada estado |

**Mais duas correções estruturais:** `Estoque` genérico (com discriminador
`TipoItem`) foi **desdobrado em duas entidades**, eliminando a associação
polimórfica; e `ItemIngrediente` foi explicitada como associativa, para hospedar
quantidade e preço.

---

## O erro que `ProdutoBaseIngredienteCompativel` corrige

**Antes:** `Ingrediente.Opcional` — um booleano na entidade Ingrediente.

Isso afirma que *"ser opcional"* é propriedade intrínseca do ingrediente.
**O negócio não sustenta isso:**

> O mesmo queijo é **padrão** em um pão (já incluso no preço base) e
> **adicional pago** em uma base de salada.

Um atributo em `Ingrediente` só conseguiria representar **uma** das duas
situações.

**Depois:** a propriedade pertence ao **par** (fundação × complemento) — e
portanto mora na tabela associativa.

**Ganho extra:** a tabela passa a definir *quais combinações são permitidas*.
Sem ela, o banco aceitaria **brigadeiro em uma salada**.

---

# PARTE 2

## Modelo Lógico

### Mapeamento MER → Relacional · Normalização · Justificativas de design

> Item (i) do enunciado, segunda parte: *"diagrama lógico já normalizado, com
> possíveis justificativas de design"*.

---

## O método de mapeamento

A tradução do DER para o esquema relacional seguiu o **algoritmo de mapeamento
ER → Relacional de sete passos**:

| Passo | Regra | Onde foi aplicado |
|---|---|---|
| 1 | Entidade forte → tabela | 8 tabelas |
| 3 | Entidade fraca → PK = chave da proprietária + chave parcial | `item_personalizado` — **com trade-off** |
| 4 | Relacionamento 1:1 → FK no lado de participação total | As duas tabelas de estoque |
| 5 | Relacionamento 1:N → PK do lado "1" vira FK no lado "N" | 5 tabelas |
| 6 | Relacionamento M:N → tabela associativa com PK composta | `item_ingrediente`, `produto_base_ingrediente_compativel` |

Resultado: **14 tabelas e 1 visão**, todas em **BCNF**.

**As quatro formas normais, cada uma com exemplo do próprio projeto:**
1FN — a lista de ingredientes vira tabela · 2FN — nenhum atributo descritivo
replicado nas associativas · **3FN — o caso `AvaliacaoPrato`** · BCNF — nenhum
determinante que não seja superchave.

---

# O ponto central da entrega

## `AvaliacaoPrato`: onde o MER e o Relacional deixam de ser a mesma coisa

> **Falar:** este é o bloco que responde ao ponto 5 do feedback — *"faltou o
> mapeamento para o relacional?"*.

---

## Conceitual: dois vínculos identificadores

No **DER**, `AvaliacaoPrato` é entidade fraca com **dois** relacionamentos
identificadores:

```
Cliente ═══faz═══► AvaliacaoPrato ◄═══avaliado_em═══ ItemPersonalizado
```

Identificador: (`cliente_id`, `pedido_id`, `numero_item`)

**Isso está certo — e é o que o feedback pediu.** Uma avaliação é, no domínio,
*"a opinião **de um cliente** sobre **uma preparação**"*. Os dois vínculos
comunicam o conceito.

> **Falar:** este slide responde literalmente à pergunta do ponto 4. Mas é só
> metade da história — o próximo slide é a outra metade.

---

## Lógico: o vínculo com Cliente é removido — 3FN

O cliente **já é determinado** pelo caminho de chaves estrangeiras:

```
avaliacao_prato → item_personalizado → pedido → cliente
```

Manter `cliente_id` em `avaliacao_prato` criaria a cadeia

```
id → item_personalizado_id → pedido_id → cliente_id
```

em que `item_personalizado_id` **não é chave candidata** — a definição exata de
**dependência transitiva**, violação da 3ª Forma Normal.

**E o risco não é teórico:** com as duas colunas, o banco aceitaria uma avaliação
do cliente A sobre um prato que consta ter sido pedido pelo cliente B. Removida
a coluna, essa inconsistência torna-se **estruturalmente impossível**.

---

## Lado a lado

| | Modelo Conceitual (DER) | Modelo Lógico (Relacional) |
|---|---|---|
| Vínculo com `Cliente` | **Presente** — relacionamento identificador | **Removido** |
| Vínculo com `ItemPersonalizado` | Presente | Presente, com `UNIQUE` |
| Identificador | (`cliente_id`, `pedido_id`, `numero_item`) | `id` substituta + `UQ` em `item_personalizado_id` |
| Cliente avaliador | Atributo do identificador | Obtido por **junção** |
| Por quê | Clareza de **domínio** | **3FN** — eliminar dependência transitiva |

**Esta diferença é o mapeamento MER → Relacional.** Os dois diagramas *não podem*
ser iguais — se fossem, o mapeamento não teria acontecido.

> **Falar:** este é o slide para o qual a apresentação inteira converge.

---

## O diagrama lógico normalizado

![Diagrama lógico do Sistema Unespão](../images/diagrama-logico.png)

**Figura 2** — 14 tabelas agrupadas por área. Compare com a Figura 1: aqui
`avaliacao_prato` **não tem** coluna `cliente_id`.

> **Falar:** apontar para `avaliacao_prato` na figura e voltar à Figura 1. É a
> evidência visual do mapeamento — a diferença entre os dois diagramas se vê,
> não só se lê.

---

## Há um segundo caso de divergência

`Pedido.ValorTotal` e `ItemPersonalizado.PrecoTotal` são **atributos derivados** —
aparecem no DER em elipse tracejada, e **não viram coluna** no relacional.

Armazená-los produziria anomalia de atualização: alterada a composição de um
item, o total gravado passaria a mentir.

**Mas o histórico precisa ser imutável** — se o cardápio subir de preço amanhã,
o pedido de ontem não pode mudar de valor. A solução foi congelar o preço **no
nível correto**:

- `item_personalizado.preco_base_aplicado`
- `item_ingrediente.preco_adicional_aplicado`

Resultado: o total é ao mesmo tempo **derivável** (visão `vw_pedido_total`) e
**historicamente imutável** — sem redundância.

---

## `ItemPersonalizado` — entidade fraca e seu trade-off

**No conceitual:** entidade fraca de `Pedido`, chave parcial `numero_item`,
identificador (`pedido_id`, `numero_item`).

**No físico:** `id` substituta + `UNIQUE (pedido_id, numero_item)`.

| | Chave composta (literal) | Substituta + UNIQUE (adotada) |
|---|---|---|
| `item_ingrediente` | PK **tripla** | PK dupla |
| `avaliacao_prato` | **2 colunas** de FK | 1 coluna |
| Índices secundários | Maiores | Menores |
| Unicidade garantida | Sim | **Sim — idêntica** |
| Dependência existencial | Sim | **Sim** — FK `NOT NULL` + `ON DELETE CASCADE` |

**Não há estado do banco que este esquema aceite e a chave composta rejeitaria.**
É trade-off consciente e documentado — e foi **verificado por teste**.

---

## Outras justificativas de design

| Decisão | Justificativa |
|---|---|
| **Estoque desdobrado em 2 tabelas** | A associação polimórfica (`TipoItem`) **impede chave estrangeira** — nenhum SGBD valida uma coluna contra duas tabelas. A integridade migraria para o código da aplicação |
| **`status` → tabela de domínio** | Além de fechar o domínio, carrega as regras de cada estado (`permite_edicao`, `permite_avaliacao`): mudar a política vira `UPDATE`, não alteração de código |
| **`CASCADE` vs. `RESTRICT`** | `CASCADE` só onde há **composição real** (item não existe sem pedido); `RESTRICT` onde há **referência histórica** (não se apaga cliente com pedidos) |
| **`SET NULL` em `estoque → atendente`** | O registro de estoque sobrevive ao desligamento do funcionário; perde-se apenas a autoria |

---

# PARTE 3

## Modelo Físico

### Esquema · Tabelas e restrições · Consultas

> Item (i) do enunciado, terceira parte: *"arquivo .sql comentado"* — e item (ii)
> integralmente.

---

## O script: esquema novo com o nome do projeto

```sql
DROP SCHEMA IF EXISTS unespao;
CREATE SCHEMA unespao
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE unespao;
```

**Seis seções, na ordem em que precisam rodar:**

| Seção | Conteúdo |
|---|---|
| 1 | Criação do **esquema** `unespao` |
| 2 | As **14 tabelas**, em ordem topológica de chave estrangeira |
| 3 | A visão `vw_pedido_total` |
| 4 | Carga das tabelas de domínio (parte da **definição**, não exemplo) |
| 5 | Dados de demonstração (removível) |
| 6 | As **3 consultas** exigidas |

O `DROP SCHEMA IF EXISTS` inicial torna o script **idempotente** — ele roda em
outra máquina, mais de uma vez, sem erro e sem duplicar dados.

---

## "Aplique todas as restrições necessárias"

| Tipo de restrição | Quantidade |
|---|---|
| Chaves primárias | **14** |
| Chaves estrangeiras | **15** |
| Restrições de unicidade (`UNIQUE`) | **9** |
| Restrições de verificação (`CHECK`) | **13** |
| Índices adicionais (cada um justificado por uma consulta) | 2 |

**Todas as restrições são nomeadas** (`CK_`, `FK_`, `UQ_`, `IX_`) — quando uma
inserção é rejeitada, a mensagem cita o nome:

```
ERROR 3819 (HY000): Check constraint 'CK_avaliacao_prato_nota' is violated.
```

**Duas exigências de ambiente, e por quê:** MySQL **8.0.16+**, porque antes disso
o `CHECK` é aceito e **ignorado em silêncio**; e **InnoDB** explícito em cada
tabela, porque em MyISAM as `FOREIGN KEY` são descartadas sem aviso.

---

## Prova de execução

Executado num servidor **MySQL 8.0.46** real antes da entrega.

| Verificação | Resultado |
|---|---|
| Execução completa sem erro | código de saída **0** |
| Tabelas criadas | **14** + 1 visão |
| Tabelas fora do InnoDB | **0** |
| Chaves estrangeiras ativas | **15** |
| Execuções repetidas (idempotência) | **3 seguidas**, sem erro e sem duplicar dados |

**7 testes de violação, 7 rejeições corretas:**

nota 9 → `CK_avaliacao_prato_nota` · avaliação duplicada →
`UQ_avaliacao_prato_item` · **número de item repetido** →
`UQ_item_personalizado_pedido_numero` · preço negativo →
`CK_produto_base_preco` · pagamento fora do domínio →
`CK_pedido_status_pagamento` · excluir cliente com pedidos →
`FK_pedido_cliente` · excluir pedido → **cascata** correta

> **Falar:** o teste do número de item repetido é a confirmação prática de que a
> chave substituta preserva a semântica de entidade fraca.

---

## As três consultas

| # | Consulta | Funcionalidade | O que exercita |
|---|---|---|---|
| **1** | Histórico de pedidos de um cliente com a composição dos itens | Montagem personalizada e histórico | **7 tabelas** em junção + `GROUP_CONCAT` para reconstituir cada lanche numa linha |
| **2** | Ranking de produtos base por avaliação média | Avaliação e sugestões personalizadas | `AVG`, `COUNT`, `GROUP BY` e `HAVING` — filtro **sobre o agregado** |
| **3** | Alerta unificado de estoque baixo | Controle de estoque | `UNION ALL` dos dois estoques, comparando com o limiar **próprio de cada item** |

Juntas, as três **percorrem as 14 tabelas**.

---

## As consultas provam decisões de projeto

**Consulta 2 é a justificativa empírica da normalização.**
Enquanto a avaliação estava ligada apenas ao cliente, **não havia caminho de
junção até o produto avaliado** — a consulta era literalmente impossível de
escrever. Foi a normalização em 3FN que tornou a funcionalidade viável.

**Consulta 1 prova que remover os derivados não perdeu informação.**
O total do pedido 1 calculado pela visão `vw_pedido_total` — **R$ 46,50** —
confere com a soma manual dos seus dois itens (R$ 24,50 + R$ 22,00).

**Consulta 3 é a contrapartida assumida.**
O `UNION ALL` é o custo de ter desdobrado o estoque em duas tabelas. Uma cláusula
a mais na consulta, em troca de integridade referencial real.

---

## Escopo: o que ficou de fora, e por quê

| Fora do modelo | Razão |
|---|---|
| Tokens e credenciais de **OAuth** | Responsabilidade do provedor externo. O banco guarda só o e-mail como chave natural |
| **Dados de cartão** | Processados por gateway externo. Guardamos apenas meio de pagamento e situação — decisão **de segurança**, não omissão |
| **Sugestões personalizadas** | São resultado de **consulta** sobre histórico e avaliações, não estrutura armazenada. Modelá-las seria redundância |
| **Totem vs. app** | Canal de acesso é camada de apresentação — não altera o modelo de dados |
| Múltiplos telefones por cliente | Regra adotada: **um telefone por cliente**. Se mudar, o passo 2 do algoritmo exige tabela própria — registrado, não esquecido |

**Um modelo de dados representa fatos persistidos** — não canais, não integrações
externas, não resultados de consulta.

---

## Checklist do enunciado

**i) Documento PDF com três partes**

- ✅ **Modelo conceitual** — minimundo em texto corrido, 21 regras de negócio e o DER em notação de Chen *(Cap. 1, Figura 1)*
- ✅ **Modelo lógico** — diagrama já normalizado (BCNF) + justificativas de design, com o mapeamento MER → Relacional explícito *(Cap. 2, Figura 2)*
- ✅ **Modelo físico** — script `.sql` comentado, com as decisões justificadas *(Cap. 3 + apêndice)*

**ii) Script `.sql`**

- ✅ **Novo esquema com o nome do projeto** — `CREATE SCHEMA unespao`
- ✅ **Tabelas com todas as restrições** — 14 PKs, 15 FKs, 9 UNIQUEs, 13 CHECKs, todas nomeadas
- ✅ **3 SELECTs das principais funcionalidades** — histórico, ranking de avaliação, alerta de estoque
- ✅ **Executável em outra máquina** — autocontido e idempotente, verificado em MySQL 8.0.46

**iii) Slides com os pontos principais** — ✅ esta apresentação

---

## Fechamento

**7 → 14 entidades.** Todas derivadas do minimundo, não o contrário.

**Todo o esquema em BCNF**, com a normalização justificada caso a caso — 1FN,
2FN, 3FN e BCNF, cada uma com exemplo extraído do próprio Sistema Unespão.

**MER ≠ Relacional.** Dois pontos de divergência deliberada (`AvaliacaoPrato` e
os atributos derivados), ambos documentados com a regra que os motiva.

**Verificado, não afirmado.** 14 tabelas, 15 FKs, 13 CHECKs, 7 testes de
restrição, 3 execuções idempotentes — em MySQL 8.0.46 real.

### Obrigado

> **Falar:** se houver pergunta sobre a chave substituta de `item_personalizado`,
> a resposta está no slide de trade-off: a unicidade é idêntica, e foi testada.
