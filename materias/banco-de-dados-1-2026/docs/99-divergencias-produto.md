<!-- Última atualização: 2026-09-15 -->

# Divergências intencionais em relação a `produto/`

**Este documento é de uso interno do repositório — não integra o PDF entregue à
disciplina.**

O Sistema Unespão é documentado de forma canônica e agnóstica de disciplina em
`../../produto/business.md` e `../../produto/architecture.md`. Esta entrega de
Banco de Dados I diverge daquele conhecimento em alguns pontos, **de forma
deliberada**.

O propósito deste arquivo é evitar dois erros opostos:

1. Que alguém leia uma divergência como inconsistência e "corrija" a entrega de
   BD1 para alinhá-la a `produto/`.
2. Que alguém propague uma decisão local desta disciplina para `produto/`,
   contaminando o conhecimento canônico do produto com uma restrição acadêmica.

> **Regra:** nenhuma das divergências abaixo justifica alterar
> `../../produto/architecture.md` ou `../../produto/business.md`.

---

## D-01 — MySQL 8 em vez de PostgreSQL

| | |
|---|---|
| **`produto/` diz** | PostgreSQL, acessado via Entity Framework Core com provider Npgsql |
| **BD1 faz** | MySQL 8.0.16+ |
| **Natureza** | Restrição de ferramenta imposta pelo professor da disciplina |

**Por que não é contradição arquitetural.** A menção a PostgreSQL em
`produto/architecture.md` descreve a stack do **sistema-alvo documentado**
(.NET 8 + EF Core/Npgsql), decidida no contexto de Engenharia de Software II. A
exigência de MySQL em Banco de Dados I é uma restrição de ferramenta aplicável a
um exercício acadêmico de modelagem e implementação — não uma reavaliação da
decisão de produto.

Os dois convivem sem conflito porque **o que esta disciplina avalia é portável
entre SGBDs**: entidades, relacionamentos, cardinalidades, formas normais e
restrições de integridade são idênticos em PostgreSQL e MySQL. Apenas o dialeto
DDL do modelo físico difere (`AUTO_INCREMENT` vs. `SERIAL`, `ENUM`,
`ENGINE=InnoDB`, collation `utf8mb4`). O modelo conceitual e o lógico produzidos
aqui são, inclusive, reutilizáveis por uma eventual implementação PostgreSQL
futura.

Alterar `produto/architecture.md` para "MySQL" propagaria uma restrição local de
disciplina para o conhecimento canônico do produto — exatamente o que a
separação `produto/` ↔ `materias/` existe para evitar.

---

## D-02 — Chaves primárias `INT UNSIGNED AUTO_INCREMENT` em vez de GUID

| | |
|---|---|
| **DER anterior / `produto/` implicam** | `Guid` como identificador em todas as entidades |
| **BD1 faz** | `INT UNSIGNED AUTO_INCREMENT` |
| **Natureza** | Decisão técnica local, alinhada ao conteúdo da disciplina |

**Motivação.** Duas razões, ambas locais a esta entrega:

1. **Aderência ao conteúdo ensinado.** Chaves substitutas inteiras
   autoincrementais são a construção trabalhada em aula e a esperada no script
   de entrega.
2. **Adequação ao SGBD exigido.** Em InnoDB, a chave primária é o índice
   clusterizado. Identificadores aleatórios armazenados como `CHAR(36)`
   provocam inserção em pontos arbitrários da árvore, causando divisão de
   páginas e crescimento do índice — penalidade inexistente com chaves
   monotônicas de 4 bytes.

Não há implicação para a arquitetura do produto: a escolha do tipo de chave
substituta é decisão da camada de persistência.

---

## D-03 — `Atendente` e pagamento **incluídos** no modelo

| | |
|---|---|
| **Recomendação anterior (rodada de planejamento)** | Deixar `Atendente` e pagamento fora do recorte, declarando-os como simplificação intencional |
| **BD1 faz** | `Atendente` modelada como entidade; pagamento representado por dois atributos de `Pedido` |
| **Natureza** | **Mudança de estratégia**, motivada por feedback do professor |

**Por que mudou.** A recomendação original de excluí-los baseava-se em economia
de retrabalho às vésperas da entrega, partindo da premissa de que o DER
conceitual não seria alterado. Essa premissa caiu: o professor apontou
explicitamente que *"a modelagem ainda está muito simples"* e solicitou a adição
de 3 a 4 entidades. Com o modelo conceitual sendo revisto de qualquer forma, o
custo marginal de incluir `Atendente` passou a ser próximo de zero, e a inclusão
tem duas vantagens:

- Elimina uma divergência real em relação a `produto/business.md`, que lista o
  Atendente/Administrador como ator oficial do sistema.
- Dá sustentação à rastreabilidade de estoque (quem atualizou, quando), que
  atende ao objetivo de qualidade "confiabilidade da informação de estoque"
  registrado em `produto/business.md`.

**Pagamento — escopo deliberadamente contido.** Optou-se por `metodo_pagamento`
e `status_pagamento` como atributos de `Pedido`, **sem entidade `Pagamento`
própria**. O processamento financeiro ocorre em serviço externo à fronteira do
sistema (conforme `produto/architecture.md`); o banco registra apenas o meio
escolhido e o desfecho informado. Não há, dentro da fronteira, conjunto de fatos
rico o bastante para justificar entidade separada. A contenção também equilibra
o tamanho do modelo, que já cresceu de 7 para 14 entidades.

**Esta divergência é de aproximação, não de afastamento:** o modelo de BD1 ficou
*mais* próximo de `produto/business.md` do que estava, não menos.

---

## D-04 — Escopo reduzido em relação ao produto documentado

| Conceito em `produto/business.md` | Situação em BD1 | Motivo |
|---|---|---|
| Autenticação via OAuth Google | Representada apenas por `Cliente.email` como identificador alternativo | Credenciais e tokens são responsabilidade do provedor externo; não são fatos persistidos pelo sistema |
| Sugestões personalizadas | Sem entidade correspondente | São derivadas por consulta sobre histórico e avaliações (RN-21), não estrutura armazenada |
| Totem físico vs. app móvel | Não representado | Canal de acesso é característica da camada de apresentação, sem efeito sobre o modelo de dados |
| API de Localização/CEP | Não representado | Já documentada em `produto/architecture.md` como reserva para expansão futura, não implementada |
| Gateway de pagamento | Representado apenas pelo desfecho (D-03) | Sistema externo à fronteira |

Nenhum destes é lacuna acidental: todos são consequências corretas de o modelo
de dados representar **fatos persistidos**, e não canais de acesso, integrações
externas ou resultados de consulta.

---

## D-05 — Nomenclatura `snake_case`

| | |
|---|---|
| **DER anterior** | `PascalCase` (`ItemPersonalizado`, `PrecoTotal`) |
| **BD1 faz** | `snake_case` minúsculo (`item_personalizado`, `preco_total`) |
| **Natureza** | Convenção local, alinhada à prática da disciplina |

Os nomes conceituais das **entidades** são mantidos em `PascalCase` no texto do
modelo conceitual, por continuidade com a versão anterior entregue ao professor
e por legibilidade da narrativa. A conversão para `snake_case` ocorre no
**mapeamento para o modelo relacional** (Parte II) e vale para todos os
identificadores de tabelas e colunas.

---

## Ver também

- [`01-modelo-conceitual.md`](01-modelo-conceitual.md)
- [`../CLAUDE.md`](../CLAUDE.md) — regras normativas desta entrega
- [`../../../produto/business.md`](../../../produto/business.md)
- [`../../../produto/architecture.md`](../../../produto/architecture.md)
