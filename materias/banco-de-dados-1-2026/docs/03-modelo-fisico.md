# 3. Modelo Físico

Este capítulo descreve e justifica as decisões de implementação do banco de dados
do Sistema Unespão no MySQL. A implementação propriamente dita — o DDL completo,
comentado — está no arquivo **`sql/unespao.sql`**, entregue junto com este
documento.

> **Nota sobre a organização do documento.** O DDL não é reproduzido aqui.
> Manter o mesmo código em dois lugares garante que, na primeira correção feita
> em um deles, documento e script passem a divergir. O script é a fonte única de
> verdade; este capítulo explica *por que* ele é como é.

---

## 3.1 Ambiente alvo

| Item | Definição | Justificativa |
|---|---|---|
| SGBD | **MySQL 8.0.16 ou superior** | Versão mínima obrigatória — ver §3.2 |
| Engine | **InnoDB** | Único mecanismo do MySQL com suporte a chave estrangeira e transações |
| Charset | **utf8mb4** | Cobertura completa do Unicode |
| Collation | **utf8mb4_0900_ai_ci** | Padrão do MySQL 8, insensível a acento e caixa |
| Ferramenta | MySQL Workbench | Execução do script e engenharia reversa do diagrama |

### Por que a versão mínima é 8.0.16

O modelo usa **13 restrições `CHECK`** para garantir domínios (nota entre 1 e 5,
preços não negativos, situação de pagamento dentro de um conjunto fechado). O
MySQL só passou a **validar** essas restrições a partir da versão **8.0.16**. Em
versões anteriores — incluindo todo o 5.7 e as primeiras 8.0 — a cláusula `CHECK`
é analisada sintaticamente e **ignorada em silêncio**: o script executa sem
qualquer erro e sem nenhuma validação ativa.

Esse é o tipo de falha que não se manifesta na criação do banco, e sim meses
depois, como dado inválido em produção. Por isso o script começa com um comentário
de advertência e a verificação:

```sql
SELECT VERSION();
```

### Por que InnoDB é obrigatório, e não uma preferência

Se as tabelas fossem criadas com o mecanismo **MyISAM**, todas as cláusulas
`FOREIGN KEY` seriam aceitas na sintaxe e **descartadas sem aviso**. O banco
pareceria correto, o diagrama de engenharia reversa viria sem nenhuma linha de
relacionamento, e a integridade referencial — que é o objeto central deste
trabalho — simplesmente não existiria. Por isso `ENGINE=InnoDB` é declarado
explicitamente em cada uma das 14 tabelas, em vez de confiar no padrão do
servidor.

### Por que `utf8mb4` e não `utf8`

No MySQL, o nome `utf8` é um apelido histórico para `utf8mb3`, uma codificação de
até **3 bytes** que não cobre todo o Unicode. As colunas `observacoes` e
`comentarios` recebem texto livre digitado pelo cliente no totem, incluindo
acentuação e emoji, que exigem 4 bytes. `utf8mb4` é a codificação UTF-8 completa.

A collation `utf8mb4_0900_ai_ci` é *accent-insensitive* e *case-insensitive*: uma
busca por "pao italiano" encontra "Pão Italiano", comportamento adequado à busca
de catálogo em um totem de autoatendimento.

---

## 3.2 Convenção de nomenclatura

### Objetos: `snake_case` minúsculo

Toda tabela e coluna usa letras minúsculas separadas por sublinhado
(`item_personalizado`, `preco_base_aplicado`). A razão é de **portabilidade**, e
decorre diretamente do enunciado, que exige um script capaz de "ser executado em
outra máquina":

O MySQL trata a sensibilidade a maiúsculas em nomes de tabela conforme a variável
`lower_case_table_names`, cujo valor **padrão depende do sistema operacional**: no
Windows e no macOS o comportamento usual é insensível a caixa; no Linux, é
**sensível**. Um script escrito com `ItemPersonalizado` em um notebook e executado
em um servidor Linux passa a exigir a grafia exata em toda consulta. Com todos os
nomes em minúsculas, a questão deixa de existir em qualquer plataforma.

Tabelas estão no **singular** (`pedido`, e não `pedidos`), porque cada tabela
modela um *tipo de entidade*, e essa escolha mantém a correspondência direta com
os nomes do modelo conceitual.

> **Observação sobre a arquitetura da aplicação.** O domínio do Sistema Unespão,
> implementado em C#, usa `PascalCase` (`ProdutoBase`, `ItemPersonalizado`). A
> divergência é intencional e não gera custo: mapeadores objeto-relacional
> traduzem nomes de tabela e coluna por configuração, de modo que o código da
> aplicação permanece idiomático em sua própria linguagem, e o banco permanece
> idiomático na sua.

### Restrições: prefixo em maiúsculas

| Prefixo | Uso | Exemplo |
|---|---|---|
| `PK_` | Chave primária | `PK_item_personalizado` |
| `FK_` | Chave estrangeira | `FK_item_ingrediente_ingrediente` |
| `UQ_` | Restrição de unicidade | `UQ_cliente_email` |
| `CK_` | Restrição de verificação | `CK_avaliacao_prato_nota` |
| `IX_` | Índice | `IX_pedido_cliente_data` |

**Todas** as restrições são nomeadas explicitamente. O ganho é concreto e foi
comprovado nos testes de §3.6: quando uma inserção inválida é rejeitada, a
mensagem de erro cita o nome da restrição —

```
ERROR 3819 (HY000): Check constraint 'CK_avaliacao_prato_nota' is violated.
```

— em vez de um identificador gerado automaticamente. Isso torna o diagnóstico
imediato, tanto em desenvolvimento quanto em produção.

> **Detalhe técnico do MySQL.** O MySQL aceita a sintaxe
> `CONSTRAINT PK_tabela PRIMARY KEY (...)`, mas **descarta o nome**: toda chave
> primária é registrada internamente como `PRIMARY`. A declaração foi mantida
> assim mesmo, por consistência de estilo, valor documental na leitura do script e
> portabilidade para SGBDs que preservam o nome.

---

## 3.3 Escolha dos tipos de dados

### Chaves primárias: `INT UNSIGNED AUTO_INCREMENT`

O modelo conceitual tipa os identificadores como `Guid`, em coerência com a
arquitetura da aplicação. No modelo físico optou-se pela **chave substituta
numérica sequencial**, por quatro razões:

1. **Armazenamento e desempenho de índice.** No InnoDB, a chave primária é o
   índice *clusterizado*, e **todo índice secundário armazena a chave primária
   como ponteiro para a linha**. Uma chave de 4 bytes em vez de 36 (`CHAR(36)`)
   reduz o tamanho de cada chave estrangeira e de cada índice secundário do banco
   inteiro.
2. **Localidade de inserção.** Valores `AUTO_INCREMENT` são monotonicamente
   crescentes, e cada nova linha é anexada ao final do índice clusterizado. Um
   identificador universal aleatório (UUIDv4) faz o oposto: as inserções caem em
   páginas dispersas, provocando divisões de página e fragmentação.
3. **Legibilidade da entrega.** As consultas, os dados de demonstração e o
   diagrama de engenharia reversa ficam substancialmente mais legíveis com
   `cliente_id = 1` do que com `'f47ac10b-58cc-4372-a567-0e02b2c3d479'`.
4. **Aderência às convenções da disciplina.**

**Coerência com a aplicação.** Caso o sistema fosse implantado com a arquitetura
em `Guid`, o equivalente correto no MySQL seria `BINARY(16)` com identificador
ordenado — `UUID_TO_BIN(UUID(), 1)`, disponível a partir do MySQL 8 —, cujo bit de
reordenação preserva a localidade de inserção do índice clusterizado. Registra-se
aqui que a escolha por chave numérica nesta entrega é **didática e deliberada**,
e não desconhecimento da alternativa.

**Nota de implementação.** Toda chave estrangeira é declarada com **tipo e
sinalização idênticos** aos da chave referenciada (`INT UNSIGNED`). Uma divergência
de sinalização — `INT` referenciando `INT UNSIGNED` — faz o InnoDB rejeitar a
criação da chave estrangeira com o erro 3780, uma das causas mais comuns de falha
em scripts de criação de esquema.

### Valores monetários: `DECIMAL(10,2)`

Todo valor em dinheiro usa `DECIMAL(10,2)` — **nunca `FLOAT` ou `DOUBLE`**. Tipos
de ponto flutuante binário não representam frações decimais como 0,10 de forma
exata; o erro é individualmente ínfimo, mas **se acumula em somatórios**. Como o
preço de um item do Sistema Unespão é justamente uma soma de adicionais
(`preco_base_aplicado + Σ preco_adicional_aplicado × quantidade`), o uso de ponto
flutuante produziria divergências de centavos em pedidos com muitos ingredientes.
`DECIMAL` armazena o valor em representação decimal exata.

A precisão 10 com escala 2 comporta até R$ 99.999.999,99 — folgado para o domínio.

### Datas: `DATETIME`, não `TIMESTAMP`

`TIMESTAMP` no MySQL é armazenado em UTC e **convertido conforme o fuso da
sessão**, além de saturar em **19 de janeiro de 2038**. `DATETIME` armazena o
valor literal, sem conversão. Como a padaria é loja única e opera em horário
local, `DATETIME` é o tipo semanticamente correto e evita que a mesma linha seja
lida com horários diferentes por sessões de fusos distintos.

A exceção é `atendente.data_admissao`, que usa `DATE`: não há informação de hora e
o tipo não deve sugerir que haja.

### Campo automático de auditoria

As duas tabelas de estoque declaram:

```
ultima_atualizacao DATETIME NOT NULL
    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

A cláusula `ON UPDATE CURRENT_TIMESTAMP` é um recurso nativo do MySQL que faz o
atributo `UltimaAtualizacao` do modelo conceitual se manter **sozinho**, a cada
alteração da linha, sem gatilho e sem código de aplicação. Isso impede a classe
mais comum de erro nesse tipo de coluna: a alteração de quantidade feita por um
caminho de código que esqueceu de atualizar a data.

### Demais tipos

| Coluna | Tipo | Justificativa |
|---|---|---|
| `telefone` | `VARCHAR(20)` | Telefone é **cadeia de caracteres**, não número: preserva zero à esquerda, código de país e formatação, e não admite aritmética |
| `email` | `VARCHAR(160)` | Com `UNIQUE`: 160 × 4 bytes = 640 B, dentro do limite de 3072 B para índice do InnoDB em `utf8mb4` |
| `nota` | `TINYINT UNSIGNED` | Domínio de 1 a 5; 1 byte é suficiente |
| `numero_item`, `quantidade` | `SMALLINT UNSIGNED` | Contadores pequenos, sempre positivos |
| `observacoes` | `VARCHAR(255)` | Preferido a `TEXT`: permanece na linha, é indexável e impõe limite coerente com a interface do totem |
| `comentarios` | `VARCHAR(500)` | Idem, com folga para o texto da avaliação |
| booleanos | `BOOLEAN` | Apelido nativo do MySQL para `TINYINT(1)` |

---

## 3.4 Restrições implementadas

O esquema declara, ao todo:

| Tipo | Quantidade |
|---|---|
| Chaves primárias | 14 |
| Chaves estrangeiras | 15 |
| Restrições de unicidade | 9 |
| Restrições de verificação (`CHECK`) | 13 |

As restrições `CHECK` cobrem: faixa da nota de avaliação (1 a 5), não negatividade
de todos os valores monetários e de todas as quantidades de estoque, quantidade
mínima de 1 por ingrediente de item, numeração de item a partir de 1, e os
domínios fechados de `metodo_pagamento` e `status_pagamento`.

### Por que `CHECK` e não `ENUM`

O MySQL oferece o tipo `ENUM`, que também restringiria o domínio. Optou-se por
`VARCHAR` com `CHECK` porque `ENUM` não pertence ao SQL padrão, e porque acrescentar
um valor a um `ENUM` exige `ALTER TABLE` — operação de alteração de estrutura — ao
passo que a lista de um `CHECK` é uma regra explícita e legível no script.

Para o estado do pedido, adotou-se a solução ainda mais forte da **tabela de
domínio** `status_pedido`, que além de restringir o conjunto de valores carrega as
regras associadas a cada estado (§2.4.3 do modelo lógico).

### Comportamento de `CHECK` com valor nulo

A coluna `metodo_pagamento` é anulável, pois o cliente ainda não escolheu a forma
de pagamento enquanto monta o pedido. Como uma comparação com `NULL` resulta em
`UNKNOWN`, e o `CHECK` aceita `UNKNOWN`, a restrição foi escrita de forma
explícita — `metodo_pagamento IS NULL OR metodo_pagamento IN (...)` — para que a
intenção fique documentada no próprio código, e não dependa do conhecimento da
lógica ternária por quem for lê-lo.

---

## 3.5 Índices

O InnoDB cria automaticamente um índice para cada chave estrangeira, e as
restrições `UNIQUE` já geram os seus. Apenas **dois índices adicionais** foram
declarados, cada um justificado por uma consulta concreta:

| Índice | Colunas | Consulta que o justifica |
|---|---|---|
| `IX_pedido_cliente_data` | `(cliente_id, data_pedido DESC)` | Consulta 1 — histórico do cliente ordenado por data |
| `IX_pedido_status` | `(status_pedido_id)` | Painel operacional de pedidos por situação |

A contenção é deliberada. Todo índice acelera leitura, mas **onera toda inserção e
atualização** e ocupa espaço; criar índices sem uma consulta que os justifique é
custo sem contrapartida.

---

## 3.6 Validação da implementação

O script foi executado em um servidor **MySQL 8.0.46** real antes da entrega. Os
resultados:

**Execução do script**

| Verificação | Resultado |
|---|---|
| Execução completa sem erro | ✅ código de saída 0 |
| Tabelas criadas | ✅ 14 |
| Visão criada | ✅ 1 |
| Tabelas fora do InnoDB | ✅ 0 |
| Chaves estrangeiras ativas | ✅ 15 |
| Execução repetida (idempotência) | ✅ 3 execuções seguidas, sem erro e sem duplicação de dados |

**Testes de restrição — todas as tentativas inválidas foram rejeitadas**

| Teste | Resultado |
|---|---|
| Avaliação com nota 9 | ✅ rejeitado por `CK_avaliacao_prato_nota` |
| Duas avaliações para o mesmo prato | ✅ rejeitado por `UQ_avaliacao_prato_item` |
| Número de item repetido no mesmo pedido | ✅ rejeitado por `UQ_item_personalizado_pedido_numero` |
| Produto com preço negativo | ✅ rejeitado por `CK_produto_base_preco` |
| Situação de pagamento fora do domínio | ✅ rejeitado por `CK_pedido_status_pagamento` |
| Exclusão de cliente com pedidos | ✅ rejeitado por `FK_pedido_cliente` (`RESTRICT`) |
| Exclusão de pedido | ✅ removeu em cascata os itens e as avaliações correspondentes |

O terceiro teste é a confirmação prática de que a **chave substituta de
`item_personalizado` preserva integralmente a semântica de entidade fraca**
(§2.5 do modelo lógico): o esquema rejeita exatamente o mesmo estado inválido que
a chave primária composta rejeitaria.

**Conferência das consultas.** As três consultas exigidas retornaram resultado
correto sobre os dados de demonstração. O valor calculado pela visão
`vw_pedido_total` para o pedido 1 — R$ 46,50 — confere com a soma manual dos seus
dois itens (R$ 24,50 + R$ 22,00), confirmando que a remoção do atributo derivado
não causou perda de informação.

---

## 3.7 Organização do script

O arquivo `sql/unespao.sql` está dividido em seis seções:

| Seção | Conteúdo |
|---|---|
| 1 | Criação do esquema (`DROP SCHEMA IF EXISTS` + `CREATE SCHEMA` + `USE`) |
| 2 | As 14 tabelas, em ordem topológica de chave estrangeira |
| 3 | A visão `vw_pedido_total` |
| 4 | Carga das tabelas de domínio |
| 5 | Dados de demonstração (removível) |
| 6 | As três consultas exigidas pelo enunciado |

**Idempotência.** O script inicia com `DROP SCHEMA IF EXISTS unespao`, podendo ser
executado repetidamente sem erro e sem duplicar dados — comportamento verificado
em §3.6. Isso importa porque o script será executado em outra máquina, possivelmente
mais de uma vez.

**Ordem topológica.** As tabelas são criadas na ordem em que suas dependências já
existem, de modo que nenhuma chave estrangeira referencie uma tabela ainda não
criada. Isso evita a necessidade de criar as restrições depois, com `ALTER TABLE`.

**Sobre a Seção 4 (tabelas de domínio).** Essas linhas não são dados de exemplo:
são parte da **definição** do banco. Sem elas, nenhum pedido pode ser registrado
(não haveria situação válida) e nenhum produto pode ser cadastrado (não haveria
categoria). Por isso são carregadas pelo próprio script de criação.

**Sobre a Seção 5 (demonstração).** Conjunto mínimo de clientes, produtos,
pedidos e avaliações, presente apenas para que as consultas da Seção 6 retornem
resultado durante a avaliação. A seção pode ser removida integralmente sem
qualquer efeito sobre a estrutura do banco.

---

## 3.8 Diagrama gerado por engenharia reversa

O diagrama do modelo físico é produzido a partir do **banco já criado**, pela
funcionalidade de engenharia reversa do MySQL Workbench:

1. Executar `sql/unespao.sql` integralmente em um servidor MySQL 8.0.16+;
2. `Database → Reverse Engineer`, selecionando o esquema `unespao`;
3. Reorganizar o posicionamento das tabelas geradas (o arranjo automático do
   Workbench não considera a legibilidade);
4. Exportar a imagem para o apêndice deste documento.

Gerar o diagrama a partir do banco real, e não desenhá-lo manualmente, assegura
que documento e implementação não divirjam.

Esse procedimento funciona também como **teste de aceitação** da entrega: se o
diagrama gerado vier sem as linhas de relacionamento entre as tabelas, é sinal de
que as chaves estrangeiras não foram efetivamente criadas — tipicamente por uso do
mecanismo MyISAM ou por incompatibilidade de tipo ou sinalização entre a chave
estrangeira e a chave referenciada (§3.3).
