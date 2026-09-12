# Introdução e Objetivos

O Sistema Unespão é uma plataforma digital para a padaria Unespão que permite a clientes montarem e finalizarem pedidos de lanches personalizados, no estilo adotado por redes como Subway e Spoleto. Este capítulo situa o problema que o software resolve, delimita seu escopo, apresenta uma visão geral dos requisitos identificados a partir do domínio do negócio e estabelece os objetivos de qualidade que devem orientar as decisões de projeto detalhadas nos capítulos seguintes.

## Contexto do software

A padaria Unespão opera sob um modelo de atendimento em que o cliente não escolhe apenas entre itens de cardápio fixos, mas monta o próprio lanche a partir de uma base (por exemplo, tipo de pão, massa de bolo ou base de salada) combinada com ingredientes adicionais (recheios, molhos, coberturas e acompanhamentos). Esse processo de personalização, hoje realizado sem suporte informatizado dedicado, sofre com a lentidão no atendimento, com a dificuldade de manter o controle de estoque dos insumos disponíveis e com a ausência de mecanismos que aproveitem o histórico de consumo do cliente para oferecer recomendações relevantes.

A finalidade do sistema, conforme definida pela equipe, é otimizar o processo de pedido e personalização de produtos, melhorar a experiência do cliente e aumentar a fidelização por meio de sugestões personalizadas de lanches. Para isso, o sistema passa a intermediar toda a jornada do cliente: da escolha da base e dos ingredientes até o registro do pedido, o pagamento da transação, a avaliação do prato consumido e o recebimento de sugestões baseadas em seu histórico.

Dois pontos dessa jornada aparecem com mais destaque na Visão Arquitetural (C4 Nível 1 e Nível 2) do que no relato inicial de Minimundo, e por isso merecem uma menção explícita aqui. O primeiro é o pagamento: o sistema se integra a um gateway de pagamento externo para processar as transações financeiras dos pedidos, e o `PedidoService` responde pelo ciclo do pedido desde a criação até a personalização dos itens e o processamento do pagamento. Do ponto de vista do cliente da padaria, um pedido só está de fato concluído depois de pago; por isso tratamos pagamento como parte natural do fluxo descrito neste capítulo, não como uma etapa à parte. O segundo ponto é a autenticação: o cliente se identifica junto à plataforma por meio de um serviço de autenticação externo (Google, via OAuth 2.0), o que permite ao sistema reconhecer um cliente recorrente, associar seu histórico de pedidos e, a partir daí, sustentar a geração de sugestões personalizadas.

O principal interessado direto no sistema é o cliente, que interage com a plataforma por meio de totens físicos instalados na loja ou de um aplicativo móvel, ambos servindo como canal de montagem, pagamento e envio dos pedidos. A padaria, como operadora do negócio, é a parte interessada institucional: é ela quem se beneficia do aumento de fidelização e da otimização operacional que o sistema busca proporcionar. Quem de fato mantém o catálogo de produtos e ingredientes e cuida do controle de estoque no dia a dia, porém, não é a "padaria" em abstrato, e sim um segundo ator humano, o Atendente/Administrador, com um perfil de acesso mais simples do que o do cliente e voltado às tarefas operacionais de retaguarda. Ele não monta nem paga pedidos, nem gerencia contas de cliente; sua função no sistema é cadastrar e atualizar produtos base, ingredientes e níveis de estoque.

## Escopo

Com base no minimundo e nos conceitos-chave do domínio descritos pela equipe, o Sistema Unespão compreende as seguintes capacidades de negócio:

- **Cadastro e gestão de clientes**, realizado de forma autônoma pelo próprio cliente por meio da autenticação com um provedor de identidade externo (Google, OAuth 2.0), sem intervenção do Atendente/Administrador.
- **Gestão de catálogo e estoque** (produtos base, ingredientes e respectivos níveis de estoque), mantendo o catálogo e a disponibilidade dos insumos — capacidade operada pelo ator Atendente/Administrador.
- **Montagem, registro e gerenciamento de pedidos**, isto é, a combinação de um produto base com ingredientes selecionados em um ou mais itens personalizados, agrupados em um pedido, incluindo a possibilidade de o cliente cancelar ou editar um item do pedido antes da confirmação do pagamento.
- **Processamento de pagamento do pedido**, por meio de integração com um gateway de pagamento externo, e **autenticação do cliente**, por meio de um provedor de identidade externo (Google, OAuth 2.0), ambos como parte do ciclo de vida do pedido.
- **Avaliação de prato**, permitindo que o cliente forneça nota e comentários sobre um item personalizado após a conclusão do pedido.
- **Geração de sugestões personalizadas** de lanches para clientes recorrentes, com base no histórico de pedidos e nas avaliações registradas.
- **Interação do cliente com o sistema** por meio de totem físico ou aplicativo móvel.

Esses pontos correspondem aos conceitos centrais do domínio descritos no Minimundo (Cliente, Produto Base, Ingrediente, Pedido, Item Personalizado, Avaliação de Prato, Sugestão Personalizada, Totem/Aplicativo, Histórico de Pedidos e Gerenciamento de Estoque), complementados pelo pagamento e pela autenticação, que tratamos aqui como parte inseparável, do ponto de vista do cliente, da ação de montar e finalizar um pedido.

A padaria Unespão modelada neste projeto é uma loja única. A menção a uma API de Localização/CEP na Visão de Contexto C4 (Nível 1), voltada a "identificar a unidade mais próxima" do cliente, é um recurso pensado para uma eventual expansão futura do produto a múltiplas unidades, e não algo implementado no escopo atual. Por isso, o sistema aqui descrito não trata de rede de lojas nem de seleção de unidade.

### Fora do escopo

Ficam fora do escopo do Sistema Unespão:

- **Logística de entrega**: o modelo de negócio é de consumo dentro da própria loja, via totem ou aplicativo, sem serviço de delivery.
- **Gestão financeira e contábil da padaria**: o sistema processa o pagamento pontual de cada pedido através do gateway externo, mas não cobre fluxo de caixa, contabilidade ou relatórios financeiros do negócio.
- **Gestão de funcionários e recursos humanos**: folha de pagamento, escalas de trabalho e demais processos de RH não são tratados pelo sistema e não aparecem em nenhuma das fontes do projeto.
- **Atendimento presencial paralelo ao digital**: esse é um aspecto da operação humana da padaria, e não uma funcionalidade a ser suportada pelo software.

## Visão geral dos requisitos

A partir do minimundo, dos conceitos-chave do domínio e da visão de contexto/containers da arquitetura, dá para inferir com segurança o seguinte conjunto de capacidades funcionais que o sistema deve oferecer:

| Requisito funcional (inferido) | Descrição |
| --- | --- |
| Cadastro e consulta de clientes | Registrar informações básicas do cliente e associar seu histórico de pedidos. |
| Autenticação do cliente | Validar a identidade do cliente por meio de um provedor de identidade externo (Google, OAuth 2.0) antes de permitir a montagem e o envio de pedidos. |
| Gestão de catálogo e estoque pelo Atendente/Administrador | Permitir que o ator Atendente/Administrador cadastre, edite e mantenha produtos base, ingredientes e os respectivos níveis de estoque. |
| Montagem de item personalizado | Permitir a combinação de um produto base com um ou mais ingredientes, gerando um item personalizado único. |
| Realização de pedido | Registrar uma transação de cliente contendo um ou mais itens personalizados. |
| Cancelamento ou edição de item do pedido | Permitir que o cliente remova ou altere um item já incluído no pedido, desde que isso ocorra antes da confirmação do pagamento. |
| Processamento de pagamento | Processar o pagamento do pedido por meio de um gateway de pagamento externo, como etapa de conclusão da transação. |
| Avaliação de prato | Coletar nota e comentários do cliente sobre um item personalizado, após a conclusão do pedido. |
| Geração de sugestões personalizadas | Propor novos itens personalizados a clientes recorrentes, com base em histórico de pedidos e avaliações. |
| Consulta de histórico de pedidos | Disponibilizar o registro detalhado dos pedidos anteriores de um cliente. |
| Gerenciamento de estoque | Controlar e monitorar a quantidade disponível de produtos base e ingredientes. |
| Interação via totem/aplicativo | Oferecer interface digital (totem físico ou app móvel) para o cliente montar, pagar e enviar pedidos. |

Quanto aos requisitos não funcionais, cabe registrar que as fontes utilizadas neste capítulo não constituem uma especificação formal de requisitos, de modo que os atributos de qualidade não aparecem detalhados de forma exaustiva. Ainda assim, dá para observar três indícios textuais relevantes, desenvolvidos na próxima seção: a finalidade do sistema enfatiza "melhorar a experiência do cliente" (usabilidade); o Minimundo destaca a necessidade de "garantir a disponibilidade dos itens" por meio do Gerenciamento de Estoque (confiabilidade/disponibilidade de dados); e a Visão Arquitetural descreve explicitamente uma preocupação de segurança ao isolar tokens de autenticação e dados de pagamento no backend, "fora do navegador" (segurança dos dados e das transações do cliente).

Sobre retenção de dados, optamos por manter o histórico de pedidos de um cliente enquanto sua conta permanecer ativa na plataforma, sem definir um prazo de expiração. Não há, nas fontes do projeto, indicação de uma política de retenção mais restritiva, e um histórico persistente é justamente o que sustenta a geração de sugestões personalizadas. Já metas quantitativas de desempenho em horário de pico e requisitos formais de portabilidade entre totem e aplicativo não são detalhados neste trabalho: tratamos esses pontos como não especificados no escopo acadêmico deste projeto, o que é compatível com o nível de detalhamento pedido para este documento.

## Objetivos de qualidade

Quatro objetivos de qualidade emergem com segurança do texto de Introdução, do Minimundo e da Visão Arquitetural, por estarem diretamente ligados à finalidade declarada do sistema:

| Objetivo | Prioridade | Impacto esperado no projeto |
| --- | --- | --- |
| Usabilidade / Experiência do cliente | Alta | A finalidade do sistema é explicitamente "melhorar a experiência do cliente" na personalização e no pedido de produtos; isso deve orientar o projeto das interfaces de totem e aplicativo para que a montagem de um item personalizado, o pagamento e o envio do pedido sejam simples e rápidos. |
| Confiabilidade da informação de estoque | Alta | O Minimundo indica que o sistema "considera o Gerenciamento de Estoque de Produtos Base e Ingredientes" para "garantir a disponibilidade dos itens"; isso implica que as informações de estoque exibidas ao cliente e usadas na montagem de itens personalizados precisam refletir corretamente a disponibilidade real, evitando pedidos de itens indisponíveis. |
| Segurança dos dados e transações do cliente | Alta | O sistema integra um provedor de autenticação externo (Google OAuth 2.0) e um gateway de pagamento para processar as transações financeiras dos pedidos; a própria Visão Arquitetural registra a preocupação de manter tokens de autenticação fora do navegador. Isso implica que credenciais do cliente e dados de pagamento não devem ser armazenados ou expostos indevidamente pelo sistema, delegando ao gateway externo o tratamento de informações financeiras sensíveis. |
| Relevância das sugestões personalizadas | Média | A finalidade do sistema também menciona "aumentar a fidelização através de sugestões personalizadas"; isso implica que a funcionalidade de sugestão deve gerar recomendações que efetivamente reflitam o histórico e as avaliações do cliente, sob risco de comprometer o objetivo de fidelização. |

Os dois primeiros objetivos de prioridade alta, confiabilidade da informação de estoque e segurança dos dados e transações do cliente, não se esgotam aqui: eles voltam a aparecer no capítulo de Arquitetura, junto da discussão dos princípios SOLID, quando tratamos de como o `EstoqueService` isola a lógica de estoque (princípio da responsabilidade única) e de como os adaptadores externos isolam credenciais e dados sensíveis do restante do sistema.

Outros atributos de qualidade comuns em sistemas desse tipo, como o desempenho do totem em horário de pico, a manutenibilidade do software (também retomada no capítulo de Arquitetura) e a portabilidade entre totem físico e aplicativo móvel, não são detalhados neste capítulo pelos mesmos motivos apontados na seção anterior, e ficam fora do escopo de detalhamento deste trabalho acadêmico.

---

*Dados de capa (RA dos integrantes, subtítulo do software, data de entrega): (A PREENCHER PELO GRUPO).*