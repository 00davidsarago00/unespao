<!-- Last updated: 2026-09-15 -->

# Arquitetura — Sistema Unespão

Arquitetura documentada (sistema-alvo) e decisões do **Sistema Unespão** — conhecimento agnóstico de disciplina/apresentação. Esta é a versão em Markdown; para justificativas completas e diagramas detalhados, consulte a seção "Fonte de evidência primária" ao final.

## Aviso importante

**Duas coisas distintas convivem neste repositório — não confundir:**

1. A **arquitetura documentada/alvo** do Sistema Unespão para apresentações (descrita abaixo).
2. O **código real presente em `materias/engenharia-software-2-2026/src/`**, que é um **protótipo de demonstração** — **não implementa** a arquitetura abaixo.

Ver seção "Estado real do código" ao final para esclarecimento completo.

## Estilo arquitetural

**Clean Architecture** — camadas concêntricas com fluxo unidirecional de dependência:

```
Controllers → Services → Repositories/External Adapters → Domain Models
```

Domain Models não dependem de nenhuma camada superior — inversão de controle garantida.

## C4 Nível 1 — Contexto

- **Atores humanos:** Cliente, Atendente/Administrador.
- **Sistema:** Sistema Unespão (caixa preta — toda lógica de negócio mora dentro).
- **Sistemas externos consumidos** (nunca o contrário):
  - **Google Auth** — HTTPS/OAuth 2.0, autenticação do cliente.
  - **API de Localização/CEP** — REST/JSON, reservada para expansão futura a múltiplas lojas; **não usada no escopo atual**.
  - **Gateway de Pagamento** — REST/HTTPS, processamento financeiro de pedidos.

Diagrama: em `materias/engenharia-software-2-2026/images/c4-nivel1-contexto.svg`.

## C4 Nível 2 — Containers

| Container | Tecnologia | Responsabilidade |
|---|---|---|
| **Web App (Totem e Cliente)** | SPA único em **React 18 + TypeScript**, responsivo. | Interface única para totem físico e navegador do cliente, com permissões diferenciadas por perfil (Cliente vs. Atendente/Administrador) controladas pela API. Sem app móvel nativo separado, sem duplicação de código. |
| **API Unespão** | **.NET 8 / ASP.NET Core** | Concentra toda a lógica de negócio: cadastro de produtos/ingredientes, composição de itens personalizados, controle de estoque, ciclo de vida do pedido, histórico, sugestões personalizadas. Único ponto que acessa o banco e os sistemas externos. |
| **Banco de dados** | **PostgreSQL** (via Entity Framework Core + provider Npgsql) | Persiste clientes, produtos base, ingredientes, pedidos, itens personalizados, avaliações e estoque. |

**Comunicação:** Web App → API via HTTPS/JSON. Só a API acessa o banco e os sistemas externos — nenhuma integração externa é feita diretamente pelo frontend (**decisão de segurança**).

Diagrama: em `materias/engenharia-software-2-2026/images/c4-nivel2-containers.svg`.

## C4 Nível 3 — Componentes da API (seis grupos)

| Grupo | Exemplos |
|---|---|
| **Controllers** | `ClientesController`, `PedidosController`, `ProdutosController`, `AvaliacoesController`, `EstoqueController` |
| **Services** | `ClienteService`, `ProdutoService`, `PedidoService`, `AvaliacaoService`, `EstoqueService`, `SugestaoPersonalizadaService` |
| **Repositories** | `IRepository<T>` + interfaces específicas via Entity Framework Core/Npgsql |
| **External Adapters** | `GoogleAuthAdapter`, `LocalizacaoAdapter`, `GatewayPagamentoAdapter` |
| **Domain Models** | `Cliente`, `ProdutoBase`, `Ingrediente`, `ItemPersonalizado`, `Pedido`, `AvaliacaoPrato`, `Estoque` |
| **Infrastructure** | `UnespaoDbContext` (mapeamento para o schema PostgreSQL) |

Diagrama: em `materias/engenharia-software-2-2026/images/c4-nivel3-diagrama-classes.png`/`.svg`.

## SOLID — Aplicação relevante

### SRP (Single Responsibility Principle)

`EstoqueService` é o **único ponto autorizado** a debitar estoque após um pedido — centraliza a lógica crítica e sustenta o objetivo de qualidade "Confiabilidade da informação de estoque".

### DIP (Dependency Inversion Principle)

Services (ex.: `PedidoService`) dependem **apenas de interfaces** (`IGatewayPagamentoAdapter`, `IPedidoRepository`), nunca de implementações concretas. Isola credenciais de integrações externas dentro dos adapters e sustenta o objetivo "Segurança dos dados e transações do cliente".

## Decisões arquiteturais relevantes

| Decisão | Justificativa |
|---|---|
| **Clean Architecture em camadas** | Separação de responsabilidades, testabilidade, independência de frameworks. |
| **Comunicação centralizada na API** | Nenhum acesso direto do frontend a bancos ou integrações externas — garante segurança de credenciais e autorização consistente. |
| **SPA único em React vs. app nativo separado** | Reduz duplicação de código, facilita manutenção, permite reutilização de lógica de validação/estado. |
| **Loja única (CEP reservado)** | Simplifica escopo inicial; API de CEP já está mapeada e pronta para expansão futura sem redesenho. |
| **EstoqueService isolado** | Garante confiabilidade — mudanças no fluxo de pedido não afetam a lógica de debit de estoque. |
| **Dependência de abstrações nos services** | Facilita testes unitários via mock, isolamento de credenciais externas, evolução sem impacto em camadas superiores. |

## Restrições de arquitetura

- **Stack já definida e não é objeto de discussão:** .NET 8/ASP.NET Core + PostgreSQL + SPA React — herdada da documentação arquitetural anterior do grupo.
- **Restrições acadêmicas:** prazo fixo no semestre, equipe pequena sem dedicação exclusiva, documentação precisa evidenciar explicitamente C4 e SOLID.
- **Integrações obrigatórias, todas partindo exclusivamente da API:** Google OAuth 2.0, gateway de pagamento externo, API de CEP (reservada, não usada hoje).

## Qualidade — Desempenho e Manutenibilidade

### Desempenho

API resolve consultas de cardápio/estoque otimizadas para **leitura frequente**, sustentando resposta em tempo real do totem/app mesmo em **horário de pico**.

### Manutenibilidade

Resultado direto da arquitetura em camadas + SOLID aplicado de forma consistente no backend — reduz acoplamento, facilita testes e evolução.

## Compliance & Regulação

**_A confirmar_** — nenhuma decisão formal do grupo sobre LGPD/PCI-DSS ou outra exigência regulatória até o momento. Ver [`produto/business.md`](business.md) para detalhes.

## Estado real do código neste repositório

### Situação atual

**Nenhum backend, banco de dados ou pagamento real existe neste repositório.** O único código executável é:

- **`materias/engenharia-software-2-2026/src/`** — protótipo **React 18 + TypeScript + Vite 6 + Tailwind CSS 4** (`package.json`, `vite.config.ts`, `tsconfig.json`). **Confirmado como ferramental de demonstração/apresentação**, não o início da implementação do SPA real descrito acima.
  - Estado 100% client-side via `useState` em `src/App.tsx`; nenhuma chamada de rede/API.
  - Dados mock em `src/data/initialData.ts` (produtos base, ingredientes, pedidos, reviews).
  - Contém telas que espelham o fluxo de pedido real (`ClientView`, `TotemOrdering`, `AdminStockPanel`, `CartModal`, `ProductCustomizerModal`, `OrderReviewModal`) e componentes puramente ferramental de apresentação (`GuidedPresentationTour`, `DocumentationViewer`, `ArchitectureDiagrams`, `ProjectFilesViewer`, `SpotlightTourOverlay`).
- Sem CI configurado, sem Docker/IaC, sem testes automatizados no repositório.
- Estratégia de testes em `materias/engenharia-software-2-2026/docs/05-testes.md` descreve o que **deveria** existir para a API .NET (xUnit/NUnit + Moq/NSubstitute), mas ainda não foi decidido/confirmado pelo grupo.

### Quando implementar de verdade

Quando o grupo decidir de fato implementar a **API .NET 8 / PostgreSQL real**, este arquivo deve ser atualizado para refletir o código real, e a seção "Estado real do código" deixa de divergir da arquitetura documentada acima.

## Fonte de evidência primária

Fonte primária: **`materias/engenharia-software-2-2026/Sistema-Unespao-ESII.pdf`** (C4 Nível 1/2/3, decisões arquiteturais, princípios SOLID aplicados). Mesmo com "ESII" no nome, o conteúdo é sobre **a arquitetura do sistema**, não sobre a disciplina em si — reutilizável por outras apresentações.

Complemento: **`materias/engenharia-software-2-2026/iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf`** para C4 Nível 3 detalhado.

## Ver também

- [`produto/business.md`](business.md) — domínio, atores, escopo, objetivos de qualidade.
- [`produto/README.md`](README.md) — como usar esta pasta em diferentes contextos.
