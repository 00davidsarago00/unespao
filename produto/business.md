<!-- Last updated: 2026-09-15 -->

# Negócio — Sistema Unespão

Domínio de negócio, atores, escopo, requisitos e objetivos de qualidade do **Sistema Unespão** — conhecimento agnóstico de disciplina/apresentação. Esta é a versão em Markdown legível por humanos; para o texto completo e justificativas acadêmicas, consulte a seção "Fonte de evidência primária" ao final.

## O que é

Sistema Unespão: plataforma digital de pedidos personalizados para a padaria **Unespão**, no estilo adotado por redes como Subway/Spoleto — o cliente monta o próprio lanche a partir de um **produto base** (pão, massa de bolo, base de salada) combinado com **ingredientes** (recheios, molhos, coberturas, acompanhamentos).

**Finalidade:** otimizar o processo de pedido/personalização, melhorar a experiência do cliente e aumentar a fidelização via sugestões personalizadas baseadas em histórico.

**Escopo geográfico:** uma **loja única** — não há rede de lojas nem seleção de unidade no escopo atual.

## Atores

| Ator | Papel |
|---|---|
| **Cliente** | Monta, personaliza, paga e envia pedidos via totem físico (na loja) ou app móvel. Avalia pratos consumidos. Recebe sugestões personalizadas. |
| **Atendente/Administrador** | Perfil operacional de retaguarda. Cadastra e mantém produtos base, ingredientes e níveis de estoque. **Não** monta/paga pedidos nem gerencia contas de cliente. |

**Autenticação do cliente:** via provedor externo (Google, OAuth 2.0) — permite reconhecer cliente recorrente e sustentar as sugestões personalizadas.

## Escopo — dentro

- Cadastro/gestão de clientes (autônomo, via OAuth Google — sem intervenção do Atendente).
- Gestão de catálogo e estoque (produtos base, ingredientes) pelo Atendente/Administrador.
- Montagem, registro e gerenciamento de pedidos (itens personalizados agrupados em pedido; cliente pode cancelar/editar item **antes** da confirmação do pagamento).
- Processamento de pagamento via gateway externo.
- Avaliação de prato (nota + comentário, após conclusão do pedido).
- Geração de sugestões personalizadas (histórico + avaliações).
- Interação via totem físico ou app móvel.

## Escopo — fora

- Logística de entrega (consumo só dentro da loja, sem delivery).
- Gestão financeira/contábil da padaria (só processa pagamento pontual por pedido).
- Gestão de funcionários/RH.
- Atendimento presencial paralelo ao digital (operação humana, não é software).
- Rede de múltiplas lojas / seleção de unidade (API de Localização/CEP está mapeada na arquitetura só como reserva para expansão futura — **não implementada**).

## Requisitos funcionais (visão geral)

| Categoria | Requisitos |
|---|---|
| **Autenticação & Autorização** | Cadastro/consulta de cliente, autenticação via OAuth Google, perfis diferenciados (Cliente vs. Atendente/Administrador). |
| **Gestão de Catálogo** | Cadastro/edição de produtos base e ingredientes, consulta em tempo real. |
| **Controle de Estoque** | Visualização de disponibilidade, debito automático após confirmação de pedido, alertas de baixa quantidade. |
| **Montagem de Pedidos** | Composição de itens personalizados (produto base + ingredientes selecionados), edição/cancelamento antes de pagamento. |
| **Pagamento** | Integração com gateway externo, processamento seguro, confirmação de transação. |
| **Histórico & Sugestões** | Armazenamento de pedidos passados, avaliação de pratos, geração de recomendações personalizadas. |
| **Interação** | Disponibilidade via totem físico e app/navegador, UX responsiva e otimizada para toque. |

## Objetivos de qualidade (6, priorizados)

| Objetivo | Prioridade | Justificativa |
|---|---|---|
| **Usabilidade / Experiência do cliente** | Alta | Determinante direto da adoção e satisfação — interface intuitiva em totem e app é crítica para fidelização. |
| **Confiabilidade da informação de estoque** | Alta | Base das recomendações e evita sobrevenda — erros aqui causam decepção imediata do cliente. |
| **Segurança dos dados e transações do cliente** | Alta | Dados pessoais (histórico) e financeiros (pagamento) exigem compliance rigoroso. |
| **Relevância das sugestões personalizadas** | Média | Diferencial competitivo — mais valor ao cliente leal, mas falhas não quebram o fluxo. |
| **Desempenho do totem em horário de pico** | Média | Experiência degradada em momentos de alta demanda prejudica a percepção de qualidade. |
| **Manutenibilidade do software** | Média | Facilita correções e evoluções futuras sem risco de regressão; importante para sustentabilidade a longo prazo. |

## Retenção de dados

Histórico de pedidos mantido durante toda a vigência da conta do cliente, **sem expiração automática** — é a base das sugestões personalizadas e da fidelização.

## Compliance & Regulação

**_A confirmar_** — LGPD (Lei Geral de Proteção de Dados) ainda não foi formalmente adotada como requisito pelo grupo. O sistema trata dados de cliente (nome, e-mail, histórico), mas não há decisão registrada sobre tratamento formal de compliance (consentimento, direito ao esquecimento, portabilidade, etc.). **Perguntar ao grupo antes de tratar isso como requisito no documento final.**

## Estado atual vs. documentado

**Importante:** o negócio descrito acima é o **sistema-alvo documentado** para apresentações acadêmicas. O único código executável presente no repositório é um **protótipo de demonstração front-end em React** — não há backend, banco de dados ou pagamento real implementados. Ver `produto/architecture.md` § "Estado real do código" para o detalhamento dessa distinção.

## Fonte de evidência primária

Fonte primária: **`materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`** (minimundo, conceitos de domínio, C4 Nível 1/2/3, princípios SOLID aplicados). Mesmo com "ESII" no nome do arquivo, o conteúdo é sobre **o domínio do sistema**, não sobre a disciplina em si — reutilizável por outras apresentações.

Complemento: **`materias/engenharia-software-2-2026/iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf`** para detalhes de C4 Nível 3.

## Ver também

- [`produto/architecture.md`](architecture.md) — stack, C4, SOLID aplicado, estado real do código.
- [`produto/README.md`](README.md) — orientação sobre como usar esta pasta em diferentes contextos (disciplinas, novos projetos).
