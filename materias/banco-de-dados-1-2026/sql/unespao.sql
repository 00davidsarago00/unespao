-- =============================================================================
--  SISTEMA UNESPÃO — MODELO FÍSICO
--  Banco de Dados 1 (2026) — UNESP
-- =============================================================================
--  SGBD alvo ......: MySQL 8.0.16 ou superior
--  Engine .........: InnoDB (obrigatório — MyISAM ignora silenciosamente FKs)
--  Charset ........: utf8mb4 / utf8mb4_0900_ai_ci
--  Modelo .........: 14 tabelas + 1 VIEW, todas em BCNF
--
--  ATENÇÃO — VERSÃO MÍNIMA: este script depende de CHECK constraints, que só
--  passaram a ser efetivamente VALIDADAS a partir do MySQL 8.0.16. Em versões
--  anteriores (5.7, 8.0.0-8.0.15) a cláusula CHECK é analisada sintaticamente e
--  IGNORADA EM SILÊNCIO: o script executa sem erro e sem nenhuma validação de
--  domínio. Confira a versão antes de executar:
--      SELECT VERSION();
--
--  O script é IDEMPOTENTE: pode ser executado quantas vezes for necessário.
--  O DROP SCHEMA inicial apaga integralmente o banco anterior.
-- =============================================================================


-- =============================================================================
--  SEÇÃO 1 — CRIAÇÃO DO ESQUEMA
-- =============================================================================
-- utf8mb4 (e não o legado "utf8", que é de 3 bytes e não cobre todo o Unicode)
-- porque as colunas de texto livre (observacoes, comentarios) recebem conteúdo
-- digitado pelo cliente no totem, incluindo acentuação e emoji.

DROP SCHEMA IF EXISTS unespao;

CREATE SCHEMA unespao
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE unespao;


-- =============================================================================
--  SEÇÃO 2 — TABELAS
--  A ordem de criação segue a ordem topológica das chaves estrangeiras:
--  nenhuma tabela é criada antes daquela que ela referencia.
-- =============================================================================

-- -----------------------------------------------------------------------------
--  2.1  cliente
--  Passo 1 do algoritmo de mapeamento (entidade forte -> tabela).
--  Forma normal: BCNF.
--  Possui duas chaves candidatas: a substituta (id) e a natural (email). O
--  e-mail é único porque a autenticação do cliente é feita por provedor externo
--  (OAuth Google), que usa o e-mail como identidade.
-- -----------------------------------------------------------------------------
CREATE TABLE cliente (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(120)    NOT NULL,
    -- Telefone é VARCHAR e não tipo numérico: preserva zero à esquerda, código
    -- de país (+55) e formatação, e não existe aritmética sobre telefone.
    telefone        VARCHAR(20)     NULL,
    email           VARCHAR(160)    NOT NULL,
    data_cadastro   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_cliente         PRIMARY KEY (id),
    CONSTRAINT UQ_cliente_email   UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.2  atendente
--  Passo 1. Forma normal: BCNF.
--  Segundo ator do minimundo. Mantém o catálogo e os níveis de estoque; por
--  isso é referenciado pelas duas tabelas de estoque (rastreabilidade de quem
--  realizou a última atualização).
-- -----------------------------------------------------------------------------
CREATE TABLE atendente (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(120)    NOT NULL,
    email           VARCHAR(160)    NOT NULL,
    -- Desligamento de funcionário NÃO apaga a linha (o histórico de quem
    -- atualizou o estoque precisa continuar íntegro): usa-se exclusão lógica.
    ativo           BOOLEAN         NOT NULL DEFAULT TRUE,
    data_admissao   DATE            NULL,

    CONSTRAINT PK_atendente        PRIMARY KEY (id),
    CONSTRAINT UQ_atendente_email  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.3  categoria_produto_base
--  Passo 1. Forma normal: BCNF.
--  Tabela de domínio. Existe para eliminar a categoria como texto livre dentro
--  de produto_base: repetir a string "Pão" em N linhas geraria redundância e
--  anomalia de atualização (renomear a categoria exigiria UPDATE em massa).
-- -----------------------------------------------------------------------------
CREATE TABLE categoria_produto_base (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nome        VARCHAR(60)     NOT NULL,
    descricao   VARCHAR(255)    NULL,

    CONSTRAINT PK_categoria_produto_base       PRIMARY KEY (id),
    CONSTRAINT UQ_categoria_produto_base_nome  UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.4  categoria_ingrediente
--  Passo 1. Forma normal: BCNF. Mesma justificativa da tabela anterior.
-- -----------------------------------------------------------------------------
CREATE TABLE categoria_ingrediente (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nome        VARCHAR(60)     NOT NULL,
    descricao   VARCHAR(255)    NULL,

    CONSTRAINT PK_categoria_ingrediente       PRIMARY KEY (id),
    CONSTRAINT UQ_categoria_ingrediente_nome  UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.5  produto_base
--  Passo 1 (entidade) + Passo 5 (categoria 1:N produto_base -> FK no lado "N").
--  Forma normal: BCNF.
--  Sem a tabela de categoria, guardar "nome_categoria" aqui criaria a
--  dependência transitiva id -> categoria -> descricao_categoria, violando 3FN.
--  Todo valor monetário é DECIMAL(10,2) — nunca FLOAT/DOUBLE, que não
--  representam frações decimais exatamente e acumulam erro de centavos.
-- -----------------------------------------------------------------------------
CREATE TABLE produto_base (
    id                          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    categoria_produto_base_id   INT UNSIGNED    NOT NULL,
    nome                        VARCHAR(100)    NOT NULL,
    descricao                   VARCHAR(255)    NULL,
    preco_base                  DECIMAL(10,2)   NOT NULL,
    -- Exclusão lógica: um produto retirado do cardápio não pode ser apagado
    -- fisicamente, pois é referenciado por itens de pedidos já concluídos.
    ativo                       BOOLEAN         NOT NULL DEFAULT TRUE,

    CONSTRAINT PK_produto_base PRIMARY KEY (id),
    CONSTRAINT FK_produto_base_categoria_produto_base
        FOREIGN KEY (categoria_produto_base_id)
        REFERENCES categoria_produto_base (id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT CK_produto_base_preco CHECK (preco_base >= 0),
    CONSTRAINT UQ_produto_base_nome  UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.6  ingrediente
--  Passo 1 + Passo 5. Forma normal: BCNF.
--  O atributo "opcional", que no modelo conceitual anterior estava AQUI, foi
--  movido para produto_base_ingrediente_compativel (seção 2.7): ser opcional é
--  propriedade da COMBINAÇÃO produto x ingrediente, não do ingrediente isolado
--  (queijo pode ser padrão em um produto e adicional pago em outro).
-- -----------------------------------------------------------------------------
CREATE TABLE ingrediente (
    id                       INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    categoria_ingrediente_id INT UNSIGNED   NOT NULL,
    nome                     VARCHAR(100)   NOT NULL,
    preco_adicional          DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
    ativo                    BOOLEAN        NOT NULL DEFAULT TRUE,

    CONSTRAINT PK_ingrediente PRIMARY KEY (id),
    CONSTRAINT FK_ingrediente_categoria_ingrediente
        FOREIGN KEY (categoria_ingrediente_id)
        REFERENCES categoria_ingrediente (id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT CK_ingrediente_preco CHECK (preco_adicional >= 0),
    CONSTRAINT UQ_ingrediente_nome  UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.7  produto_base_ingrediente_compativel
--  PASSO 6 do algoritmo (relacionamento M:N -> tabela associativa nova, com as
--  duas chaves estrangeiras formando a chave primária composta, mais os
--  atributos próprios do relacionamento).
--  Forma normal: BCNF.
--
--  Regra de negócio: define QUAIS ingredientes podem ser combinados com QUAL
--  produto base, e se a combinação é opcional (adicional pago) ou padrão
--  (já incluída no preço base).
--
--  Observação de 2FN: se guardássemos aqui "nome_ingrediente", ele dependeria
--  apenas de ingrediente_id — metade da chave composta —, configurando
--  dependência parcial e violando a 2ª Forma Normal.
-- -----------------------------------------------------------------------------
CREATE TABLE produto_base_ingrediente_compativel (
    produto_base_id INT UNSIGNED NOT NULL,
    ingrediente_id  INT UNSIGNED NOT NULL,
    -- TRUE  = adicional opcional, cobrado à parte (ingrediente.preco_adicional)
    -- FALSE = ingrediente padrão, já embutido em produto_base.preco_base
    opcional        BOOLEAN      NOT NULL DEFAULT TRUE,

    CONSTRAINT PK_produto_base_ingrediente_compativel
        PRIMARY KEY (produto_base_id, ingrediente_id),
    CONSTRAINT FK_produto_base_ingrediente_compativel_produto_base
        FOREIGN KEY (produto_base_id) REFERENCES produto_base (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_produto_base_ingrediente_compativel_ingrediente
        FOREIGN KEY (ingrediente_id) REFERENCES ingrediente (id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.8  estoque_produto_base
--  PASSO 4 do algoritmo (relacionamento 1:1 com participação total do lado do
--  estoque -> a chave da entidade proprietária vira, ao mesmo tempo, chave
--  primária E chave estrangeira do lado dependente).
--  Forma normal: BCNF.
--
--  DECISÃO DE PROJETO: a entidade genérica "Estoque" do modelo conceitual, que
--  rastreava tanto ProdutoBase quanto Ingrediente por meio de um atributo
--  discriminador TipoItem, foi ESPECIALIZADA em duas tabelas. A alternativa
--  genérica (TipoItem + ItemId) é um antipadrão: torna impossível declarar a
--  chave estrangeira (o SGBD não valida uma coluna contra duas tabelas) e
--  permite tuplas espúrias em junções que esqueçam o predicado do discriminador.
-- -----------------------------------------------------------------------------
CREATE TABLE estoque_produto_base (
    produto_base_id      INT UNSIGNED NOT NULL,
    quantidade_disponivel INT         NOT NULL DEFAULT 0,
    -- Limiar próprio por item: alimenta o alerta de estoque baixo (Consulta 3)
    -- sem valores fixos embutidos na consulta.
    quantidade_minima    INT          NOT NULL DEFAULT 0,
    -- ON UPDATE CURRENT_TIMESTAMP: recurso nativo do MySQL que mantém o
    -- atributo "última atualização" do modelo conceitual sem trigger nem código
    -- de aplicação.
    ultima_atualizacao   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                      ON UPDATE CURRENT_TIMESTAMP,
    atendente_id         INT UNSIGNED NULL,

    CONSTRAINT PK_estoque_produto_base PRIMARY KEY (produto_base_id),
    CONSTRAINT FK_estoque_produto_base_produto_base
        FOREIGN KEY (produto_base_id) REFERENCES produto_base (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_estoque_produto_base_atendente
        FOREIGN KEY (atendente_id) REFERENCES atendente (id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT CK_estoque_produto_base_quantidade
        CHECK (quantidade_disponivel >= 0),
    CONSTRAINT CK_estoque_produto_base_minima
        CHECK (quantidade_minima >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.9  estoque_ingrediente
--  PASSO 4. Forma normal: BCNF. Mesma justificativa da tabela 2.8.
-- -----------------------------------------------------------------------------
CREATE TABLE estoque_ingrediente (
    ingrediente_id        INT UNSIGNED NOT NULL,
    quantidade_disponivel INT          NOT NULL DEFAULT 0,
    quantidade_minima     INT          NOT NULL DEFAULT 0,
    ultima_atualizacao    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                       ON UPDATE CURRENT_TIMESTAMP,
    atendente_id          INT UNSIGNED NULL,

    CONSTRAINT PK_estoque_ingrediente PRIMARY KEY (ingrediente_id),
    CONSTRAINT FK_estoque_ingrediente_ingrediente
        FOREIGN KEY (ingrediente_id) REFERENCES ingrediente (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_estoque_ingrediente_atendente
        FOREIGN KEY (atendente_id) REFERENCES atendente (id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT CK_estoque_ingrediente_quantidade
        CHECK (quantidade_disponivel >= 0),
    CONSTRAINT CK_estoque_ingrediente_minima
        CHECK (quantidade_minima >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.10  status_pedido
--  Passo 1 (tabela de domínio). Forma normal: BCNF.
--  Substitui o antigo atributo "Status" como texto livre em Pedido. Além de
--  garantir o domínio, a tabela carrega as REGRAS associadas a cada estado:
--   - permite_edicao: o cliente só pode editar/cancelar itens ANTES da
--     confirmação do pagamento (regra do minimundo virou dado, não código);
--   - permite_avaliacao: a avaliação de prato só ocorre após a conclusão.
-- -----------------------------------------------------------------------------
CREATE TABLE status_pedido (
    id                INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    codigo            VARCHAR(30)   NOT NULL,
    descricao         VARCHAR(120)  NOT NULL,
    permite_edicao    BOOLEAN       NOT NULL DEFAULT FALSE,
    permite_avaliacao BOOLEAN       NOT NULL DEFAULT FALSE,
    e_final           BOOLEAN       NOT NULL DEFAULT FALSE,

    CONSTRAINT PK_status_pedido        PRIMARY KEY (id),
    CONSTRAINT UQ_status_pedido_codigo UNIQUE (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.11  pedido
--  PASSO 5 do algoritmo, aplicado duas vezes (Cliente 1:N Pedido e
--  StatusPedido 1:N Pedido -> a chave do lado "1" vira FK no lado "N").
--  Forma normal: BCNF.
--
--  DECISÃO DE PROJETO — ATRIBUTO DERIVADO: o atributo "ValorTotal" do modelo
--  conceitual NÃO existe nesta tabela. Ele é integralmente derivável dos itens
--  do pedido e mantê-lo armazenado geraria redundância com anomalia de
--  atualização (alterar um item deixaria o total mentindo). O valor é calculado
--  pela VIEW vw_pedido_total (seção 3).
--
--  DATETIME e não TIMESTAMP: TIMESTAMP converte por fuso horário e satura em
--  2038; a padaria é loja única e opera em horário local.
-- -----------------------------------------------------------------------------
CREATE TABLE pedido (
    id               INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    cliente_id       INT UNSIGNED  NOT NULL,
    status_pedido_id INT UNSIGNED  NOT NULL,
    data_pedido      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Pagamento processado por gateway externo: o banco registra apenas o meio
    -- escolhido e a situação da transação, nunca dados de cartão.
    -- NULL enquanto o cliente ainda não escolheu a forma de pagamento.
    metodo_pagamento VARCHAR(20)   NULL,
    status_pagamento VARCHAR(20)   NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT PK_pedido PRIMARY KEY (id),
    CONSTRAINT FK_pedido_cliente
        FOREIGN KEY (cliente_id) REFERENCES cliente (id)
        -- RESTRICT: o histórico de vendas não pode ser destruído pela exclusão
        -- de um cliente.
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_pedido_status_pedido
        FOREIGN KEY (status_pedido_id) REFERENCES status_pedido (id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    -- Comparação com NULL resulta em UNKNOWN, que a CHECK aceita: por isso a
    -- condição é escrita de forma explícita para o caso "ainda não escolhido".
    CONSTRAINT CK_pedido_metodo_pagamento CHECK (
        metodo_pagamento IS NULL
        OR metodo_pagamento IN ('PIX', 'CREDITO', 'DEBITO', 'DINHEIRO')
    ),
    CONSTRAINT CK_pedido_status_pagamento CHECK (
        status_pagamento IN ('PENDENTE', 'AUTORIZADO', 'RECUSADO', 'ESTORNADO')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Índice de apoio à Consulta 1 (histórico do cliente ordenado por data).
CREATE INDEX IX_pedido_cliente_data ON pedido (cliente_id, data_pedido DESC);
-- Índice de apoio ao painel operacional (pedidos por situação).
CREATE INDEX IX_pedido_status ON pedido (status_pedido_id);


-- -----------------------------------------------------------------------------
--  2.12  item_personalizado
--  Forma normal: BCNF.
--
--  ENTIDADE FRACA — DECISÃO DE PROJETO EXPLÍCITA: no modelo conceitual,
--  ItemPersonalizado é entidade fraca de Pedido, com chave parcial
--  "numero_item". O PASSO 3 do algoritmo mapearia isso para a chave primária
--  composta (pedido_id, numero_item). Adotamos aqui uma CHAVE SUBSTITUTA (id)
--  porque esta tabela é referenciada por outras duas (item_ingrediente e
--  avaliacao_prato), e a chave composta se propagaria para ambas, tornando a
--  chave de item_ingrediente uma tripla.
--
--  A semântica de entidade fraca NÃO se perde: ela é preservada por
--  (a) UQ_item_personalizado_pedido_numero, que garante a unicidade da chave
--      parcial dentro do pedido — exatamente o que a PK composta garantiria; e
--  (b) FK_item_personalizado_pedido com ON DELETE CASCADE, que impõe a
--      dependência existencial do item em relação ao pedido.
--
--  preco_base_aplicado: cópia congelada de produto_base.preco_base no momento
--  da compra. É o que preserva a integridade histórica do pedido quando o
--  cardápio muda de preço — e é o que torna o total plenamente derivável.
-- -----------------------------------------------------------------------------
CREATE TABLE item_personalizado (
    id                  INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    pedido_id           INT UNSIGNED     NOT NULL,
    numero_item         SMALLINT UNSIGNED NOT NULL,
    produto_base_id     INT UNSIGNED     NOT NULL,
    preco_base_aplicado DECIMAL(10,2)    NOT NULL,
    observacoes         VARCHAR(255)     NULL,

    CONSTRAINT PK_item_personalizado PRIMARY KEY (id),
    CONSTRAINT UQ_item_personalizado_pedido_numero
        UNIQUE (pedido_id, numero_item),
    CONSTRAINT FK_item_personalizado_pedido
        FOREIGN KEY (pedido_id) REFERENCES pedido (id)
        -- CASCADE: composição real — o item não existe fora do pedido.
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_item_personalizado_produto_base
        FOREIGN KEY (produto_base_id) REFERENCES produto_base (id)
        -- RESTRICT: item de catálogo referenciado por histórico não é apagado
        -- fisicamente (usa-se produto_base.ativo = FALSE).
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT CK_item_personalizado_preco CHECK (preco_base_aplicado >= 0),
    CONSTRAINT CK_item_personalizado_numero CHECK (numero_item >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.13  item_ingrediente
--  PASSO 6 do algoritmo (M:N entre ItemPersonalizado e Ingrediente -> tabela
--  associativa com chave primária composta pelas duas FKs, mais os atributos
--  do próprio relacionamento).
--  Forma normal: BCNF.
--
--  É esta tabela que resolve a 1ª Forma Normal do modelo: a alternativa
--  não-normalizada seria armazenar a composição do lanche como lista em uma
--  única coluna ("queijo, alface, tomate"), atributo multivalorado, impossível
--  de consultar, agregar ou validar por chave estrangeira.
--
--  preco_adicional_aplicado: mesmo princípio de congelamento histórico usado em
--  item_personalizado.preco_base_aplicado.
-- -----------------------------------------------------------------------------
CREATE TABLE item_ingrediente (
    item_personalizado_id   INT UNSIGNED      NOT NULL,
    ingrediente_id          INT UNSIGNED      NOT NULL,
    quantidade              SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    preco_adicional_aplicado DECIMAL(10,2)    NOT NULL DEFAULT 0.00,

    CONSTRAINT PK_item_ingrediente
        PRIMARY KEY (item_personalizado_id, ingrediente_id),
    CONSTRAINT FK_item_ingrediente_item_personalizado
        FOREIGN KEY (item_personalizado_id) REFERENCES item_personalizado (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_item_ingrediente_ingrediente
        FOREIGN KEY (ingrediente_id) REFERENCES ingrediente (id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT CK_item_ingrediente_quantidade CHECK (quantidade >= 1),
    CONSTRAINT CK_item_ingrediente_preco
        CHECK (preco_adicional_aplicado >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------------------------------
--  2.14  avaliacao_prato
--  PASSO 5. Forma normal: 3FN e BCNF.
--
--  NORMALIZAÇÃO CENTRAL DO PROJETO: o modelo conceitual vincula a avaliação
--  tanto ao Cliente quanto ao ItemPersonalizado. No modelo lógico, a chave
--  estrangeira para cliente foi REMOVIDA: o cliente já é alcançável pelo
--  caminho avaliacao -> item_personalizado -> pedido -> cliente. Mantê-la
--  produziria a dependência transitiva
--        id -> item_personalizado_id -> pedido_id -> cliente_id
--  na qual item_personalizado_id não é chave candidata desta tabela —
--  violação clássica da 3ª Forma Normal, com risco de o cliente registrado na
--  avaliação divergir do cliente que efetivamente fez o pedido.
--
--  UQ_avaliacao_prato_item: uma avaliação por prato consumido.
-- -----------------------------------------------------------------------------
CREATE TABLE avaliacao_prato (
    id                    INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    item_personalizado_id INT UNSIGNED     NOT NULL,
    nota                  TINYINT UNSIGNED NOT NULL,
    comentarios           VARCHAR(500)     NULL,
    data_avaliacao        DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_avaliacao_prato PRIMARY KEY (id),
    CONSTRAINT UQ_avaliacao_prato_item UNIQUE (item_personalizado_id),
    CONSTRAINT FK_avaliacao_prato_item_personalizado
        FOREIGN KEY (item_personalizado_id) REFERENCES item_personalizado (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT CK_avaliacao_prato_nota CHECK (nota BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================================================
--  SEÇÃO 3 — VISÃO (VIEW)
-- =============================================================================
-- vw_pedido_total devolve à aplicação o atributo derivado "ValorTotal" que foi
-- removido da tabela pedido pela normalização — sem custo de redundância e sem
-- risco de divergência, porque é sempre recalculado a partir dos preços
-- congelados nos itens.
--
-- A subconsulta na cláusula FROM (tabela derivada "adicionais") agrega os
-- ingredientes ANTES da junção com os itens. Sem ela, a junção de pedido com
-- item e com item_ingrediente multiplicaria as linhas e o somatório dos preços
-- base seria contado uma vez por ingrediente.

CREATE OR REPLACE VIEW vw_pedido_total AS
SELECT
    p.id                                              AS pedido_id,
    p.cliente_id,
    c.nome                                            AS cliente_nome,
    p.data_pedido,
    sp.codigo                                         AS status_pedido,
    p.status_pagamento,
    COUNT(ip.id)                                      AS quantidade_itens,
    ROUND(
        COALESCE(SUM(ip.preco_base_aplicado), 0.00)
      + COALESCE(SUM(adicionais.valor_adicionais), 0.00)
    , 2)                                              AS valor_total
FROM pedido p
    INNER JOIN cliente       c  ON c.id  = p.cliente_id
    INNER JOIN status_pedido sp ON sp.id = p.status_pedido_id
    -- LEFT JOIN: um pedido recém-criado, ainda sem itens, deve aparecer com
    -- total 0,00 em vez de desaparecer do resultado.
    LEFT  JOIN item_personalizado ip ON ip.pedido_id = p.id
    LEFT  JOIN (
        SELECT
            ii.item_personalizado_id,
            SUM(ii.preco_adicional_aplicado * ii.quantidade) AS valor_adicionais
        FROM item_ingrediente ii
        GROUP BY ii.item_personalizado_id
    ) AS adicionais ON adicionais.item_personalizado_id = ip.id
GROUP BY
    p.id, p.cliente_id, c.nome, p.data_pedido, sp.codigo, p.status_pagamento;


-- =============================================================================
--  SEÇÃO 4 — CARGA DAS TABELAS DE DOMÍNIO
--  Estas linhas não são dados de demonstração: são parte da definição do banco.
--  Sem elas, nenhum pedido pode ser inserido (status_pedido) e nenhum produto
--  ou ingrediente pode ser cadastrado (tabelas de categoria).
-- =============================================================================

INSERT INTO status_pedido
    (codigo, descricao, permite_edicao, permite_avaliacao, e_final) VALUES
    ('CRIADO',               'Pedido em montagem pelo cliente',        TRUE,  FALSE, FALSE),
    ('AGUARDANDO_PAGAMENTO', 'Enviado ao gateway, aguardando retorno', TRUE,  FALSE, FALSE),
    ('PAGO',                 'Pagamento autorizado pelo gateway',      FALSE, FALSE, FALSE),
    ('EM_PREPARO',           'Em produção na cozinha',                 FALSE, FALSE, FALSE),
    ('CONCLUIDO',            'Entregue ao cliente no balcão',          FALSE, TRUE,  TRUE),
    ('CANCELADO',            'Cancelado antes da confirmação',         FALSE, FALSE, TRUE);

INSERT INTO categoria_produto_base (nome, descricao) VALUES
    ('Pão',          'Pães para lanches montados pelo cliente'),
    ('Massa de bolo','Bases doces para bolos personalizados'),
    ('Base de salada','Bases verdes para saladas montadas');

INSERT INTO categoria_ingrediente (nome, descricao) VALUES
    ('Proteína',      'Carnes, frango, ovo e substitutos'),
    ('Queijo',        'Queijos e derivados'),
    ('Vegetal',       'Folhas, legumes e vegetais frescos'),
    ('Molho',         'Molhos e temperos'),
    ('Cobertura doce','Coberturas e confeitos para bolos');


-- =============================================================================
--  SEÇÃO 5 — DADOS DE DEMONSTRAÇÃO (OPCIONAL)
--  Conjunto mínimo para que as consultas da seção 6 retornem resultado ao serem
--  executadas na avaliação. Esta seção inteira pode ser removida sem qualquer
--  impacto sobre a estrutura do banco.
-- =============================================================================

INSERT INTO cliente (nome, telefone, email) VALUES
    ('Ana Lima',      '(14) 99812-4455', 'ana.lima@exemplo.com'),
    ('Bruno Prado',   '(14) 99700-1122', 'bruno.prado@exemplo.com'),
    ('Carla Menezes', NULL,              'carla.menezes@exemplo.com');

INSERT INTO atendente (nome, email, data_admissao) VALUES
    ('Diego Farias', 'diego.farias@unespao.com', '2025-02-10'),
    ('Elisa Rocha',  'elisa.rocha@unespao.com',  '2025-08-01');

INSERT INTO produto_base (categoria_produto_base_id, nome, descricao, preco_base) VALUES
    (1, 'Pão Italiano',      'Pão italiano assado na casa',        14.00),
    (1, 'Pão Integral',      'Pão integral com grãos',             15.50),
    (2, 'Massa de Chocolate','Base de bolo de chocolate',          18.00),
    (3, 'Base Verde',        'Mix de folhas para salada montada',  16.00);

INSERT INTO ingrediente (categoria_ingrediente_id, nome, preco_adicional) VALUES
    (1, 'Frango Desfiado',   4.50),
    (1, 'Rosbife',           6.00),
    (2, 'Queijo Prato',      3.00),
    (2, 'Queijo Cheddar',    3.50),
    (3, 'Alface',            0.00),
    (3, 'Tomate',            0.00),
    (4, 'Molho Especial',    1.50),
    (5, 'Brigadeiro',        5.00);

INSERT INTO produto_base_ingrediente_compativel (produto_base_id, ingrediente_id, opcional) VALUES
    (1, 1, TRUE), (1, 2, TRUE), (1, 3, TRUE), (1, 4, TRUE),
    (1, 5, FALSE), (1, 6, FALSE), (1, 7, TRUE),
    (2, 1, TRUE), (2, 3, TRUE), (2, 5, FALSE), (2, 6, FALSE),
    (3, 8, TRUE),
    (4, 1, TRUE), (4, 3, TRUE), (4, 5, FALSE), (4, 6, FALSE), (4, 7, TRUE);

INSERT INTO estoque_produto_base
    (produto_base_id, quantidade_disponivel, quantidade_minima, atendente_id) VALUES
    (1, 40, 15, 1),
    (2,  8, 15, 1),
    (3, 12, 10, 2),
    (4, 25, 10, 2);

INSERT INTO estoque_ingrediente
    (ingrediente_id, quantidade_disponivel, quantidade_minima, atendente_id) VALUES
    (1, 60, 20, 1),
    (2, 10, 20, 1),
    (3, 55, 20, 2),
    (4, 30, 20, 2),
    (5, 80, 25, 1),
    (6, 18, 25, 1),
    (7, 45, 10, 2),
    (8,  5, 10, 2);

-- status_pedido_id: 5 = CONCLUIDO, 3 = PAGO, 1 = CRIADO
INSERT INTO pedido (cliente_id, status_pedido_id, data_pedido, metodo_pagamento, status_pagamento) VALUES
    (1, 5, '2026-09-01 12:30:00', 'PIX',     'AUTORIZADO'),
    (1, 5, '2026-09-08 19:05:00', 'CREDITO', 'AUTORIZADO'),
    (2, 5, '2026-09-09 13:15:00', 'DEBITO',  'AUTORIZADO'),
    (3, 1, '2026-09-14 18:40:00', NULL,      'PENDENTE');

INSERT INTO item_personalizado
    (pedido_id, numero_item, produto_base_id, preco_base_aplicado, observacoes) VALUES
    (1, 1, 1, 14.00, 'Sem cebola'),
    (1, 2, 4, 16.00, NULL),
    (2, 1, 2, 15.50, 'Bem tostado'),
    (3, 1, 1, 14.00, NULL),
    (3, 2, 3, 18.00, 'Escrever "Parabéns" na cobertura'),
    (4, 1, 1, 14.00, NULL);

INSERT INTO item_ingrediente
    (item_personalizado_id, ingrediente_id, quantidade, preco_adicional_aplicado) VALUES
    (1, 1, 1, 4.50), (1, 3, 2, 3.00), (1, 5, 1, 0.00), (1, 6, 1, 0.00),
    (2, 1, 1, 4.50), (2, 5, 1, 0.00), (2, 6, 1, 0.00), (2, 7, 1, 1.50),
    (3, 2, 1, 6.00), (3, 4, 1, 3.50), (3, 6, 1, 0.00),
    (4, 1, 1, 4.50), (4, 3, 1, 3.00), (4, 5, 1, 0.00),
    (5, 8, 2, 5.00),
    (6, 2, 1, 6.00), (6, 5, 1, 0.00);

INSERT INTO avaliacao_prato (item_personalizado_id, nota, comentarios, data_avaliacao) VALUES
    (1, 5, 'Melhor lanche da praça de alimentação.', '2026-09-01 13:10:00'),
    (2, 4, 'Salada fresca, porção poderia ser maior.','2026-09-01 13:12:00'),
    (3, 5, 'Pão integral excelente.',                 '2026-09-08 19:50:00'),
    (4, 3, 'Veio menos queijo do que pedi.',          '2026-09-09 14:00:00'),
    (5, 5, 'Bolo perfeito para o aniversário.',       '2026-09-09 14:02:00');


-- =============================================================================
--  SEÇÃO 6 — CONSULTAS DE EXEMPLO
--  As três consultas exigidas pelo enunciado, demonstrando as principais
--  funcionalidades do Sistema Unespão. Estão ativas para permitir verificação
--  imediata após a execução do script.
-- =============================================================================

-- -----------------------------------------------------------------------------
--  CONSULTA 1 — Histórico de pedidos de um cliente, com a composição completa
--               de cada item e o preço calculado
--
--  Funcionalidade demonstrada: montagem personalizada + histórico de pedidos,
--  que é o insumo das sugestões personalizadas.
--  Recursos: junção de 7 tabelas, GROUP_CONCAT (agregação de texto nativa do
--  MySQL) para reconstituir a composição do lanche em uma única linha, e o
--  cálculo do preço do item a partir dos preços congelados — prova prática de
--  que remover o atributo derivado não fez o modelo perder informação.
-- -----------------------------------------------------------------------------
SELECT
    p.id                                  AS pedido,
    p.data_pedido,
    sp.codigo                             AS status,
    ip.numero_item                        AS item,
    cpb.nome                              AS categoria,
    pb.nome                               AS produto_base,
    GROUP_CONCAT(ing.nome ORDER BY ing.nome SEPARATOR ', ') AS ingredientes,
    ip.observacoes,
    ROUND(ip.preco_base_aplicado
          + COALESCE(SUM(ii.preco_adicional_aplicado * ii.quantidade), 0.00)
    , 2)                                  AS preco_item
FROM cliente c
    INNER JOIN pedido                 p   ON p.cliente_id  = c.id
    INNER JOIN status_pedido          sp  ON sp.id         = p.status_pedido_id
    INNER JOIN item_personalizado     ip  ON ip.pedido_id  = p.id
    INNER JOIN produto_base           pb  ON pb.id         = ip.produto_base_id
    INNER JOIN categoria_produto_base cpb ON cpb.id        = pb.categoria_produto_base_id
    LEFT  JOIN item_ingrediente       ii  ON ii.item_personalizado_id = ip.id
    LEFT  JOIN ingrediente            ing ON ing.id        = ii.ingrediente_id
WHERE c.email = 'ana.lima@exemplo.com'
GROUP BY p.id, p.data_pedido, sp.codigo, ip.id, ip.numero_item,
         cpb.nome, pb.nome, ip.observacoes, ip.preco_base_aplicado
ORDER BY p.data_pedido DESC, ip.numero_item ASC;


-- -----------------------------------------------------------------------------
--  CONSULTA 2 — Ranking de produtos base por avaliação média
--
--  Funcionalidade demonstrada: avaliação de pratos e geração de sugestões
--  personalizadas.
--  Esta consulta é a justificativa prática da normalização de avaliacao_prato:
--  enquanto a avaliação estava vinculada apenas ao Cliente, ela era IMPOSSÍVEL
--  de escrever, pois não havia caminho até o produto avaliado.
--  Recursos: AVG, COUNT, GROUP BY e HAVING (filtro sobre o agregado, em
--  oposição ao WHERE, que filtra antes do agrupamento).
-- -----------------------------------------------------------------------------
SELECT
    pb.nome                    AS produto_base,
    cpb.nome                   AS categoria,
    COUNT(a.id)                AS total_avaliacoes,
    ROUND(AVG(a.nota), 2)      AS nota_media,
    MIN(a.nota)                AS pior_nota,
    MAX(a.nota)                AS melhor_nota
FROM avaliacao_prato a
    INNER JOIN item_personalizado     ip  ON ip.id  = a.item_personalizado_id
    INNER JOIN produto_base           pb  ON pb.id  = ip.produto_base_id
    INNER JOIN categoria_produto_base cpb ON cpb.id = pb.categoria_produto_base_id
GROUP BY pb.id, pb.nome, cpb.nome
HAVING COUNT(a.id) >= 1          -- em produção, elevar o piso (ex.: >= 10)
ORDER BY nota_media DESC, total_avaliacoes DESC;


-- -----------------------------------------------------------------------------
--  CONSULTA 3 — Alerta unificado de estoque baixo
--
--  Funcionalidade demonstrada: controle de estoque com alerta de baixa
--  quantidade — objetivo de qualidade de prioridade alta do projeto
--  ("confiabilidade da informação de estoque").
--  Recursos: UNION ALL para reunir as duas especializações de estoque em um
--  único relatório operacional, com coluna discriminadora de tipo. É também a
--  contrapartida assumida da decisão de especializar a entidade genérica
--  Estoque em duas tabelas — decisão que, em troca, garantiu integridade
--  referencial real nos dois lados.
-- -----------------------------------------------------------------------------
SELECT
    'PRODUTO_BASE'         AS tipo_item,
    pb.nome                AS item,
    cpb.nome               AS categoria,
    e.quantidade_disponivel,
    e.quantidade_minima,
    e.ultima_atualizacao,
    at.nome                AS atualizado_por
FROM estoque_produto_base e
    INNER JOIN produto_base           pb  ON pb.id  = e.produto_base_id
    INNER JOIN categoria_produto_base cpb ON cpb.id = pb.categoria_produto_base_id
    LEFT  JOIN atendente              at  ON at.id  = e.atendente_id
WHERE e.quantidade_disponivel <= e.quantidade_minima
  AND pb.ativo = TRUE

UNION ALL

SELECT
    'INGREDIENTE'          AS tipo_item,
    ing.nome               AS item,
    ci.nome                AS categoria,
    e.quantidade_disponivel,
    e.quantidade_minima,
    e.ultima_atualizacao,
    at.nome                AS atualizado_por
FROM estoque_ingrediente e
    INNER JOIN ingrediente            ing ON ing.id = e.ingrediente_id
    INNER JOIN categoria_ingrediente  ci  ON ci.id  = ing.categoria_ingrediente_id
    LEFT  JOIN atendente              at  ON at.id  = e.atendente_id
WHERE e.quantidade_disponivel <= e.quantidade_minima
  AND ing.ativo = TRUE

ORDER BY quantidade_disponivel ASC, item ASC;


-- -----------------------------------------------------------------------------
--  CONSULTA COMPLEMENTAR — Visão do total do pedido
--  Demonstra a VIEW que substitui o atributo derivado removido de pedido.
-- -----------------------------------------------------------------------------
SELECT * FROM vw_pedido_total ORDER BY data_pedido DESC;

-- =============================================================================
--  FIM DO SCRIPT
-- =============================================================================
