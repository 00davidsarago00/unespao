export interface GuidedTopic {
  id: string;
  stepNumber: number;
  codigo: string;
  titulo: string;
  subtitulo: string;
  resumoDidatico: string;
  subsecoes: {
    numero: string;
    titulo: string;
    conteudoDidatico: string;
    pontosChave?: string[];
  }[];
  tipoInteratividade: 'requisitos_iso' | 'diagramas_c4' | 'padroes_adapter' | 'interface_comparativo' | 'runner_testes' | 'pipeline_cicd' | 'glossario_interativo' | 'controle_versoes';
  badge: string;
}

export const GUIDED_TOPICS: GuidedTopic[] = [
  {
    id: 'topico-1',
    stepNumber: 1,
    codigo: '1',
    titulo: '1. Introdução e Objetivos',
    subtitulo: 'Contexto acadêmico da UNESP Bauru, fronteiras de produto, requisitos do sistema e conformidade com ISO/IEC 25010.',
    resumoDidatico: 'O Unespão resolve o gargalo de filas nos intervalos do campus da UNESP Bauru e padroniza a montagem de lanches sob medida nas padarias do entorno, substituindo anotações manuais em papel por comandas digitais e autoatendimento.',
    badge: 'Fundamentação & Requisitos',
    tipoInteratividade: 'requisitos_iso',
    subsecoes: [
      {
        numero: '1.1',
        titulo: 'Contexto do Software',
        conteudoDidatico: 'No campus da UNESP Bauru, centenas de alunos, professores e funcionários dispõem de intervalos curtos (15 a 20 minutos) entre aulas e atividades de laboratório. As padarias e lanchonetes da região concentram alta demanda nesses horários, resultando em filas extensas, erros na anotação de lanches customizados e atrasos nos pedidos. O Unespão surge como uma ponte digital que conecta os clientes às padarias parceiras, permitindo a descoberta de estabelecimentos próximos, a montagem milimétrica de pães artesanais e o despacho direto para a chapa do padeiro.',
        pontosChave: [
          'Público-alvo: Comunidade universitária da UNESP Bauru (alunos, docentes, servidores) e proprietários/padeiros locais.',
          'Dor resolvida: Filas no balcão, pedidos anotados incorretamente em papel e lentidão na transmissão à cozinha.',
          'Proposta de valor: Autoatendimento rápido (mobile/totem) aliado a uma comanda digital clara na cozinha do padeiro.'
        ]
      },
      {
        numero: '1.2',
        titulo: 'Escopo do Projeto',
        conteudoDidatico: 'O escopo do Unespão delimita claramente o que faz parte do sistema (dentro da fronteira) e o que está fora para manter o foco arquitetural.',
        pontosChave: [
          'Dentro do Escopo: Geolocalização de padarias próximas no campus e Bauru; Catálogo de produtos artesanais personalizáveis; Mecanismo de inclusão de adicionais e exclusão de ingredientes padrão; Carrinho e Checkout com múltiplos meios de pagamento (Pix, Cartão, Balcão); Painel do Padeiro (KDS) em tempo real com controle de status (Aguardando -> Em Preparo -> Pronto -> Concluído); Sistema de avaliações e notas verificadas.',
          'Fora do Escopo: Frota própria de entregadores motorizados (o foco é retirada no balcão ou delivery gerido pela própria padaria); Módulo de folha de pagamento ou contabilidade fiscal profunda dos estabelecimentos parceiros.'
        ]
      },
      {
        numero: '1.3',
        titulo: 'Visão Geral dos Requisitos',
        conteudoDidatico: 'A especificação de engenharia divide-se em Requisitos Funcionais (RF) que entregam valor direto ao negócio e Requisitos Não-Funcionais (RNF) que regem os atributos de qualidade e restrições.',
        pontosChave: [
          'RF01 - Catálogo de Padarias: O sistema deve listar estabelecimentos parceiros com distância, tempo estimado e nota média.',
          'RF02 - Personalização de Lanches: O cliente deve conseguir remover ingredientes padrão inclusos e selecionar adicionais com recálculo automático de preço.',
          'RF03 - Comanda Digital da Chapa (KDS): O padeiro deve visualizar pedidos em tempo real, destacando com precisão adições e remoções.',
          'RF04 - Gestão de Status: O padeiro deve avançar o ciclo de vida do pedido em um único toque.',
          'RF05 - Avaliações Online: Clientes devem avaliar padarias com notas de 1 a 5 estrelas e comentários.',
          'RNF01 - Usabilidade no Processo de Personalização: Interface responsiva permitindo concluir a montagem em até 3 minutos no totem.',
          'RNF02 - Confiabilidade da Informação de Estoque: Baixa atômica e bloqueio em tempo real de itens esgotados.',
          'RNF03 - Segurança dos Dados e Transações: OAuth 2.0 Google, tokens JWT e segregação de credenciais fora do Git.',
          'RNF04 - Relevância das Sugestões Personalizadas: Sugestões geradas com base no histórico real de pedidos e avaliações.',
          'RNF05 - Desempenho no Catálogo e Cálculo: Recálculo incremental do preço em menos de 200ms.',
          'RNF06 - Manutenibilidade e Modularidade: Clean Architecture concêntrica com inversão de dependência (DIP).'
        ]
      },
      {
        numero: '1.4',
        titulo: 'Objetivos de Qualidade (ISO/IEC 25010)',
        conteudoDidatico: 'Baseando-se no modelo internacional de qualidade de produto de software ISO/IEC 25010, foram formalizados 6 objetivos de qualidade com priorização de risco:',
        pontosChave: [
          '1. Usabilidade (Prioridade Alta): Navegação fluida no totem físico e app móvel, prevenindo erros de pedidos e garantindo visualização clara de ingredientes alérgenos.',
          '2. Confiabilidade da Informação de Estoque (Prioridade Alta): Integridade atômica para impedir a venda de produtos sem estoque em horários de pico universitário.',
          '3. Segurança dos Dados e Transações (Prioridade Alta): Criptografia TLS/HTTPS, integração isolada com gateway de pagamento e conformidade com LGPD.',
          '4. Relevância das Sugestões Personalizadas (Prioridade Média): Algoritmo de recomendação baseado no histórico de pedidos e avaliações prévias do cliente.',
          '5. Desempenho nas Operações de Catálogo e Cálculo (Prioridade Alta): Recálculo do preço incremental do item em menos de 200ms a cada ingrediente selecionado.',
          '6. Manutenibilidade e Modularidade do Código (Prioridade Alta): Estrutura em camadas concêntricas (Clean Architecture), desacoplamento via interfaces e alta testabilidade.'
        ]
      }
    ]
  },
  {
    id: 'topico-2',
    stepNumber: 2,
    codigo: '2',
    titulo: '2. Arquitetura do Sistema',
    subtitulo: 'Clean Architecture, Modelo C4 (Contexto, Contêineres e Componentes), Princípios SOLID e ADRs.',
    resumoDidatico: 'O Unespão adota Clean Architecture concêntrica com regra estrita de dependências voltadas para o interior. Detalhada pelo Modelo C4 de Simon Brown, a arquitetura garante independência de frameworks e alta testabilidade.',
    badge: 'Arquitetura & Decisões',
    tipoInteratividade: 'diagramas_c4',
    subsecoes: [
      {
        numero: '2.1',
        titulo: 'Contexto e Fronteiras do Sistema (C4 Nível 1)',
        conteudoDidatico: 'O Diagrama de Contexto delimita o Sistema Unespão no centro, interagindo com dois atores humanos (Cliente da UNESP e Padeiro/Operador da Chapa) e dois sistemas externos principais: o Gateway de Pagamento Bancário (processamento de Pix e cartões) e o Serviço de Mensageria/Notificações (alertas em tempo real).',
        pontosChave: [
          'Ator Cliente: Faz pedidos, personaliza pães, acompanha status e publica avaliações.',
          'Ator Padeiro: Recebe comandas na tela da cozinha, controla a fila de chapas e atualiza disponibilidade de ingredientes.',
          'Sistemas Externos: Gateway de Pagamentos e Provedor de Notificações Push/SMS.'
        ]
      },
      {
        numero: '2.2',
        titulo: 'Estilo e Padrão Arquitetural: Clean Architecture',
        conteudoDidatico: 'A solução estrutura-se em camadas concêntricas segundo Robert C. Martin (Uncle Bob): (1) Domain/Entities no núcleo contendo as entidades Produto, Ingrediente e Pedido; (2) Use Cases/Application orquestrando regras de negócio puras (ex: CriarPedido, BaixarEstoque); (3) Interface Adapters convertendo dados de controladores HTTP e repositórios; (4) Frameworks & Drivers externos (Bancos de dados, React, APIs).',
        pontosChave: [
          'Regra de Dependência: O código de dentro NUNCA sabe nada sobre o código de fora. O domínio é puro TypeScript/C# sem dependência de ORMs ou UI.',
          'Testabilidade Máxima: Casos de uso podem ser 100% testados sem banco de dados nem internet ligada.'
        ]
      },
      {
        numero: '2.3',
        titulo: 'Contêineres e Componentes (C4 Nível 2)',
        conteudoDidatico: 'O sistema físico divide-se em contêineres desacoplados: SPA Client-Side em React/Vite (executado no navegador do usuário/totem), API Backend REST stateless e Banco de Dados Relacional/Documental para pedidos e estoque.',
        pontosChave: [
          'Frontend SPA (React + TypeScript): Renderização rápida e reativa para customização visual instantânea.',
          'Backend API REST: Endpoints `/api/pedidos`, `/api/padarias`, `/api/estoque` com validação de regras de negócio.',
          'Armazenamento de Dados: Tabelas normalizadas de estabelecimentos, itens e movimentações de estoque.'
        ]
      },
      {
        numero: '2.4',
        titulo: 'Princípios de Projeto (SOLID)',
        conteudoDidatico: 'Aplicação didática dos cinco princípios SOLID no Unespão:',
        pontosChave: [
          'SRP (Responsabilidade Única): PedidoService cuida apenas do ciclo do pedido; EstoqueService gerencia saldos; PrecoCalculadora cuida dos acréscimos.',
          'OCP (Aberto/Fechado): Novos adicionais ou taxas são integrados através de classes que implementam interfaces de precificação, sem editar a classe base.',
          'LSP (Substituição de Liskov): Qualquer implementação de IPagamentoGateway (Pix, Cartão) pode ser substituída sem corromper o fluxo de checkout.',
          'ISP (Segregação de Interfaces): Padeiro consome `IPedidoCozinhaReader`, enquanto o caixa consome `IFaturamentoWriter`.',
          'DIP (Inversão de Dependência): Use cases dependem de interfaces abstratas (`IPedidoRepository`), não de classes concretas de banco de dados.'
        ]
      },
      {
        numero: '2.5',
        titulo: 'Decisões Arquiteturais Relevantes (ADRs)',
        conteudoDidatico: 'Três Registros de Decisão Arquitetural (ADR) foram formalizados para a banca:',
        pontosChave: [
          'ADR-01: Adoção de Clean Architecture com Modelo C4 para garantir clareza pedagógica e manutenção futura por novas turmas da UNESP.',
          'ADR-02: Padrão Adapter para Gateways de Pagamento (isolando mudanças na API do Banco Central ou adquirentes).',
          'ADR-03: Single Page Application com reatividade direta para garantir resposta instantânea na chapa (< 1s).'
        ]
      },
      {
        numero: '2.6',
        titulo: 'Restrições de Arquitetura',
        conteudoDidatico: 'O projeto opera sob restrições acadêmicas e de infraestrutura: execução em navegadores modernos via HTTPS, compatibilidade responsiva estrita com telas móveis e contêinerização padronizada via Docker.',
        pontosChave: [
          'Portabilidade: Execução multiplataforma sem necessidade de download em lojas de apps fechadas.',
          'Segurança: Tratamento estrito de dados conforme a LGPD brasileira (sem armazenamento indevido de dados bancários).'
        ]
      }
    ]
  },
  {
    id: 'topico-3',
    stepNumber: 3,
    codigo: '3',
    titulo: '3. Projeto de Componentes',
    subtitulo: 'C4 Nível 3, colaboração entre serviços, decomposição modular e Padrões de Projeto GoF.',
    resumoDidatico: 'Neste nível detalhamos a orquestração interna entre PedidoService, EstoqueService e PagamentoAdapter, além da aplicação de padrões consolidados como Adapter, Repository e Observer.',
    badge: 'Componentes & Padrões GoF',
    tipoInteratividade: 'padroes_adapter',
    subsecoes: [
      {
        numero: '3.1',
        titulo: 'Visão Geral dos Componentes',
        conteudoDidatico: 'A aplicação web é decomposta em módulos independentes e altamente coesos: Módulo de Descoberta de Padarias, Módulo de Personalização de Lanches, Módulo de Pagamento, Módulo da Cozinha/KDS e Módulo de Avaliações.',
        pontosChave: [
          'Alta Coesão: Cada componente agrupa exclusivamente funções de um mesmo domínio de panificação.',
          'Baixo Acoplamento: Comunicação mediada por contratos e DTOs (Data Transfer Objects).'
        ]
      },
      {
        numero: '3.2',
        titulo: 'Detalhamento dos Componentes Principais',
        conteudoDidatico: 'O fluxo de execução do pedido percorre uma cadeia atômica de responsabilidades:',
        pontosChave: [
          '1. ValidadorDePersonalizacao: Verifica se os adicionais escolhidos estão em estoque e se o pão base é válido.',
          '2. CalculadoraDePreco: Soma o valor base do pão, multiplica os adicionais e aplica regras de promoção vigentes.',
          '3. EstoqueService: Decrementa preventivamente as unidades de pão e porções de ingredientes.',
          '4. PedidoService: Gera a senha única (ex: UNESP-104) e persiste o pedido com status "Aguardando Preparo".',
          '5. KdsNotifier: Envia o evento de novo pedido para a tela do forno do padeiro.'
        ]
      },
      {
        numero: '3.3',
        titulo: 'Padrões de Projeto (GoF) e Arquiteturais',
        conteudoDidatico: 'Padrões de projeto aplicados com propósito prático e justificativa arquitetural documentada:',
        pontosChave: [
          'Adapter (Estrutural): O padrão GoF Adapter (`GatewayPagamentoAdapter`) converte as chamadas heterogêneas dos SDKs bancários e adquirentes na interface única `IGatewayPagamentoAdapter`.',
          'Strategy (Comportamental): Combinado ao Adapter, viabiliza a alternância dinâmica entre estratégias de liquidação de pagamento (Pix, Cartão de Crédito/Débito, Pagamento no Balcão) em tempo de execução sem modificar `PedidoService`.',
          'Decorator (Estrutural): Modela a personalização dinâmica do lanche (`IItemPersonalizavel`), onde uma base concreta (`ProdutoBase`) é envolvida recursivamente por `IngredienteDecorator` (ex: `QueijoDecorator`, `BaconDecorator`), eliminando explosão combinatória de subclasses e calculando preço e calorias em tempo de execução.',
          'Repository (Arquitetural): Encapsula as operações de CRUD, isolando o mecanismo de persistência dos casos de uso através de `IPedidoRepository`, `IProdutoRepository` e `IEstoqueRepository`.',
          'Dependency Injection (Inversão de Controle): Registro e resolução de dependências no contêiner nativo do ASP.NET Core / TypeScript, garantindo alto isolamento e testabilidade com mocks.'
        ]
      }
    ]
  },
  {
    id: 'topico-4',
    stepNumber: 4,
    codigo: '4',
    titulo: '4. Projeto de Interface do Usuário',
    subtitulo: 'Design centrado no usuário, heurísticas de Nielsen, acessibilidade e ergonomia na cozinha e no celular.',
    resumoDidatico: 'A interface do Unespão foi projetada em duas frentes com ergonomias opostas: a Visão do Cliente (descoberta acolhedora e montagem visual tipo iFood) e a Visão do Padeiro (KDS industrial de alto contraste para leitura à distância na chapa).',
    badge: 'Design de Interface & UX',
    tipoInteratividade: 'interface_comparativo',
    subsecoes: [
      {
        numero: '4.1',
        titulo: 'Duas Visões Ergonômicas Distintas',
        conteudoDidatico: 'A ergonomia de software considera o ambiente onde o operador está inserido:',
        pontosChave: [
          'Visão do Cliente: Ambiente calmo ou corrido de smartphone. Foco em imagens apetitosas, seleção visual de adicionais, tags de ingredientes inclusos ("Sem manteiga", "Sem cebola") e barra inferior fixa com valor total atualizado instantaneamente.',
          'Visão do Padeiro (KDS): Ambiente quente, com farinha, óleo e chapa. Foco em tipografia grande e legível à distância de 2 metros, senhas em negrito (UNESP-104), cores semafóricas (Amarelo = Na Chapa, Verde = Pronto no Balcão) e lista clara de itens proibidos/removidos destacados em vermelho com tachado.'
        ]
      },
      {
        numero: '4.2',
        titulo: 'Heurísticas de Usabilidade de Jakob Nielsen',
        conteudoDidatico: 'Avaliação heurística do Unespão:',
        pontosChave: [
          '1. Visibilidade do Status do Sistema: O cliente vê o preço subindo a cada queijo selecionado e acompanha se seu lanche está na chapa ou pronto.',
          '2. Correspondência com o Mundo Real: Uso de termos nativos de padarias ("Na Chapa", "No Balcão", "Pão Francês na Chapa", "Sacola").',
          '3. Prevenção de Erros: Impossibilidade de selecionar ingredientes esgotados; destaque para itens retirados antes da confirmação para evitar crises alérgicas.',
          '4. Consistência e Padrões: Padrão mental consagrado de apps como iFood e Subway na montagem de camadas de alimentos.'
        ]
      }
    ]
  },
  {
    id: 'topico-5',
    stepNumber: 5,
    codigo: '5',
    titulo: '5. Especificação e Estratégia de Testes',
    subtitulo: 'Pirâmide de testes de Mike Cohn, testes de unidade com xUnit e Moq, testes de integração com EF Core, testes de sistema com Playwright e cobertura Coverlet.',
    resumoDidatico: 'A qualidade de código do Unespão é assegurada por testes automatizados em três níveis formais: 47 testes de unidade rápidos, 14 testes de integração com banco relacional e 6 cenários de sistema ponta a ponta com Playwright, mantendo cobertura acima de 85% nos serviços de maior criticidade.',
    badge: 'Qualidade & Testes',
    tipoInteratividade: 'runner_testes',
    subsecoes: [
      {
        numero: '5.1',
        titulo: 'Planejamento e Níveis de Teste',
        conteudoDidatico: 'A estratégia divide a verificação da qualidade em três níveis complementares da Pirâmide de Testes:',
        pontosChave: [
          'Testes de Unidade (Base - 47 testes): Validam regras de negócio atômicas (soma de adicionais, validação de disponibilidade de insumos, geração de senha única e cálculos de descontos). Isolam dependências com Moq e executam em menos de 10ms por teste.',
          'Testes de Integração (Meio - 14 testes): Verificam a persistência real no PostgreSQL via Entity Framework Core, garantindo integridade transacional, rollback em falhas e comunicação dos adaptadores de pagamento.',
          'Testes de Sistema / E2E (Topo - 6 cenários): Executados com Microsoft Playwright, simulam o fluxo completo do usuário no navegador: autenticação Google, montagem do lanche no totem/app, despacho para a cozinha e transição no painel do padeiro.'
        ]
      },
      {
        numero: '5.2',
        titulo: 'Testes de Unidade e Integração (xUnit, Moq e EF Core)',
        conteudoDidatico: 'Implementados no padrão AAA (Arrange, Act, Assert). Isola-se contratos externos através de mocks e banco de dados de teste dedicado:',
        pontosChave: [
          'Cenário 1: Teste de soma de adicionais (Pão R$ 8,00 + Queijo Canastra R$ 4,50 = R$ 12,50).',
          'Cenário 2: Teste de barramento de estoque esgotado (lança `IngredienteEsgotadoException` e bloqueia transação).',
          'Cenário 3: Teste de idempotência no pagamento (mesmo ID de transação não pode ser processado duplamente).',
          'Cenário 4: Teste de persistência de pedido com rollback automático em falha simulada do banco.'
        ]
      },
      {
        numero: '5.3',
        titulo: 'Critérios de Conclusão e Cobertura de Código',
        conteudoDidatico: 'Metas formais de cobertura auditadas via Coverlet no pipeline:',
        pontosChave: [
          'Módulos Críticos (Domínio e Serviços de Pedido/Estoque): Cobertura mínima de 80% (atingido: 85% de cobertura de linhas).',
          'Cobertura Global do Projeto: Mínimo de 65% (atingido: 68% consolidado incluindo adapters e controllers).',
          'Zero Falhas Regressivas: Bloqueio estrito de merges caso qualquer teste falhe no runner.',
          'Critério de Aceite: Todos os 6 cenários Playwright e 61 testes xUnit passando com sucesso.'
        ]
      },
      {
        numero: '5.4',
        titulo: 'Automação, Ferramentas e CI',
        conteudoDidatico: 'Ecossistema integrado de qualidade contínua:',
        pontosChave: [
          'Runners de Testes: xUnit para unidade/integração e Playwright para testes de sistema.',
          'Mocking: Moq para criação de objetos simulados e verificação de chamadas de métodos.',
          'Medição de Cobertura: Coverlet com geração de relatórios Cobertura / lcov para o SonarQube.',
          'Pipeline Automatizado: Execução a cada commit em Pull Request via GitHub Actions.'
        ]
      }
    ]
  },
  {
    id: 'topico-6',
    stepNumber: 6,
    codigo: '6',
    titulo: '6. Gestão de Configuração e Manutenção',
    subtitulo: 'Controle de versão no Git, GitFlow, rastreabilidade bidirecional, gestão de segredos e pipeline CI via GitHub Actions.',
    resumoDidatico: 'Todos os artefatos (código-fonte, documentação LaTeX/Markdown, diagramas C4 vetoriais e arquivos de migração) são gerenciados sob estrito controle de configuração no Git, com segredos isolados e CI automatizado.',
    badge: 'Gerência de Configuração & CI/CD',
    tipoInteratividade: 'pipeline_cicd',
    subsecoes: [
      {
        numero: '6.1',
        titulo: 'Repositório, Itens de Configuração (IC) e Gestão de Segredos',
        conteudoDidatico: 'Cada artefato é catalogado como Item de Configuração sujeito a controle formal de versão:',
        pontosChave: [
          'IC-01: Código-fonte do Frontend SPA (React/TypeScript) e Backend (.NET 8).',
          'IC-02: Scripts de migração de banco de dados (Entity Framework Migrations).',
          'IC-03: Documentação Acadêmica da UNESP (relatório em LaTeX, arquivos Markdown e diagramas SVG).',
          'IC-04: Configurações de automação e pipelines de CI (.github/workflows/ci.yml).',
          'Gestão Segura de Segredos: Chaves de API, credenciais do banco e tokens OAuth NUNCA são commitados; são injetados via variáveis de ambiente e GitHub Secrets, com o arquivo .gitignore bloqueando arquivos sensíveis locais (appsettings.Development.json, .env).'
        ]
      },
      {
        numero: '6.2',
        titulo: 'Gestão de Dependências e Estratégia de Branches',
        conteudoDidatico: 'Adota-se uma variação do GitFlow com branches curtas protegidas:',
        pontosChave: [
          'Branch `main`: Versão estável e auditada entregue para a banca avaliadora.',
          'Branch `develop`: Linha base de integração para desenvolvimento contínuo.',
          'Branches de Feature (`feat/personalizacao-ingredientes`): Desenvolvimento isolado com Pull Request obrigatório e aprovação de ao menos um revisor.',
          'Gestão de Pacotes: Bloqueio estrito de versões via `package-lock.json` e pacotes NuGet versionados com precisão.'
        ]
      },
      {
        numero: '6.3',
        titulo: 'Rastreabilidade Bidirecional',
        conteudoDidatico: 'Garante que todo código e teste derive de um requisito justificado:',
        pontosChave: [
          'Caminho para Frente: RF02 (Personalização) -> Issue #14 -> Commit `b7a1f` -> Teste `CalculoPrecoTests` -> Componente `ProductCustomizerModal`.',
          'Caminho Reverso: Ao auditar um teste ou linha de código, é possível rastrear o commit, o autor e o requisito original que motivou a implementação.'
        ]
      },
      {
        numero: '6.4',
        titulo: 'Build, Integração e Testes Contínuos (CI com GitHub Actions)',
        conteudoDidatico: 'Pipeline automatizado configurado no GitHub Actions (.github/workflows/ci.yml) disparado a cada `push` ou `pull_request`:',
        pontosChave: [
          'Job 1 - Lint & Typecheck: Validação estática de código com ESLint e verificação de tipos TypeScript.',
          'Job 2 - Build Backend & Frontend: Compilação dos projetos .NET e empacotamento Vite do frontend.',
          'Job 3 - Testes Automatizados: Execução dos testes unitários e de integração com coleta de métricas Coverlet.',
          'Job 4 - Testes de Sistema: Execução headless dos testes de interface via Playwright.',
          'Garantia de Qualidade: Falhas no pipeline bloqueiam automaticamente a mesclagem do Pull Request na branch main.'
        ]
      }
    ]
  },
  {
    id: 'topico-7',
    stepNumber: 7,
    codigo: '7',
    titulo: '7. Glossário e Siglas',
    subtitulo: 'Dicionário técnico consolidado da disciplina de Engenharia de Software II e do domínio de panificação.',
    resumoDidatico: 'Centralização didática de siglas, acrônimos e termos especializados utilizados em todo o projeto final, permitindo consulta rápida para avaliadores e novos desenvolvedores.',
    badge: 'Vocabulário Controlado',
    tipoInteratividade: 'glossario_interativo',
    subsecoes: [
      {
        numero: '7.1',
        titulo: 'Termos de Engenharia de Software e Domínio',
        conteudoDidatico: 'Lista selecionada de vocabulário técnico com definições aplicadas ao contexto do Unespão.',
        pontosChave: [
          'KDS (Kitchen Display System): Sistema digital de telas instalado na área de produção para substituir comandas de papel.',
          'POS (Point of Sale): Frente de caixa tradicional onde ocorrem recebimentos e controle de gaveta.',
          'C4 Model: Notação arquitetural de 4 níveis hierárquicos: Contexto, Contêineres, Componentes e Código.',
          'Clean Architecture: Arquitetura em anéis com regras de negócio independentes de banco de dados e UI.',
          'Adapter (GoF): Padrão estrutural que converte a interface de uma classe em outra esperada pelos clientes.',
          'SOLID: Cinco princípios de design orientado a objetos: SRP, OCP, LSP, ISP e DIP.',
          'ADR (Architectural Decision Record): Documento curto que captura uma decisão arquitetural relevante e suas justificativas.',
          'ISO/IEC 25010: Padrão internacional para modelos de qualidade de produtos de software.'
        ]
      }
    ]
  },
  {
    id: 'topico-8',
    stepNumber: 8,
    codigo: '8',
    titulo: '8. Controle de Versões do Documento',
    subtitulo: 'Histórico auditável de revisões, autores, datas e evolução dos artefatos da disciplina de ES II.',
    resumoDidatico: 'Registro cronológico formal das iterações do documento de entrega final na UNESP Bauru, garantindo governança acadêmica e transparência para a banca.',
    badge: 'Governança & Histórico',
    tipoInteratividade: 'controle_versoes',
    subsecoes: [
      {
        numero: '8.1',
        titulo: 'Registro Formal de Versões',
        conteudoDidatico: 'A evolução do documento reflete o ciclo de vida da disciplina, desde a elicitação preliminar até a entrega do relatório consolidado e protótipo funcional.',
        pontosChave: [
          'v0.1 (12/09/2026): Versão inicial da estrutura do documento, com capítulos organizados conforme o template.',
          'v1.0 (12/09/2026): Versão consolidada para entrega, com revisão geral de conteúdo de todos os capítulos.',
          'v1.1 (13/09/2026): Inclusão do padrão Decorator na personalização de lanches, automação de testes ponta a ponta com Playwright e pipeline de CI via GitHub Actions.'
        ]
      }
    ]
  }
];

export interface RequirementItem {
  id: string;
  tipo: 'RF' | 'RNF';
  titulo: string;
  descricao: string;
  criterioAceite: string;
  isoClassificacao?: string;
  prioridade?: 'Alta' | 'Média' | 'Baixa';
}

export const REQUIREMENTS_DATA: RequirementItem[] = [
  {
    id: 'RF-01',
    tipo: 'RF',
    titulo: 'Descoberta de Padarias Parceiras',
    descricao: 'O sistema deve listar as padarias próximas ao campus da UNESP com distância, tempo estimado e nota.',
    criterioAceite: 'Listagem ordenada por proximidade ou avaliação em raio menor que 3 km.',
    isoClassificacao: 'Adequação Funcional',
    prioridade: 'Alta'
  },
  {
    id: 'RF-02',
    tipo: 'RF',
    titulo: 'Personalização Avançada de Lanches',
    descricao: 'Permitir que o cliente retire ingredientes inclusos (ex: sem cebola) e adicione complementos com recálculo instantâneo.',
    criterioAceite: 'Recálculo do valor na sacola em menos de 200ms a cada ingrediente marcado.',
    isoClassificacao: 'Usabilidade & Adequação Funcional',
    prioridade: 'Alta'
  },
  {
    id: 'RF-03',
    tipo: 'RF',
    titulo: 'Comanda Digital KDS para o Forno',
    descricao: 'Exibir em tempo real os pedidos para o padeiro com destaque visual em itens adicionados e itens proibidos.',
    criterioAceite: 'Novos pedidos aparecem na tela do padeiro sem necessidade de refresh manual.',
    isoClassificacao: 'Eficiência de Desempenho',
    prioridade: 'Alta'
  },
  {
    id: 'RF-04',
    tipo: 'RF',
    titulo: 'Transição Unidirecional de Status',
    descricao: 'O padeiro avança o pedido: Aguardando -> Em Preparo -> Pronto no Balcão -> Concluído.',
    criterioAceite: 'Mudança de estado refletida com timestamp para cálculo de tempo de chapa.',
    isoClassificacao: 'Confiabilidade',
    prioridade: 'Alta'
  },
  {
    id: 'RF-05',
    tipo: 'RF',
    titulo: 'Reviews e Avaliações da Comunidade',
    descricao: 'Clientes podem avaliar com 1 a 5 estrelas e comentários o lanche e a padaria.',
    criterioAceite: 'Média ponderada atualizada imediatamente após publicação da avaliação.',
    isoClassificacao: 'Adequação Funcional',
    prioridade: 'Média'
  },
  {
    id: 'RNF-01',
    tipo: 'RNF',
    titulo: 'Usabilidade no Processo de Personalização',
    descricao: 'A interface deve ser intuitiva tanto no totem quanto no smartphone, permitindo a conclusão da montagem em tempo hábil para os intervalos.',
    criterioAceite: 'Tempo máximo para conclusão da montagem e envio do pedido em até 3 minutos.',
    isoClassificacao: 'Usabilidade',
    prioridade: 'Alta'
  },
  {
    id: 'RNF-02',
    tipo: 'RNF',
    titulo: 'Confiabilidade da Informação de Estoque',
    descricao: 'A lista de ingredientes disponíveis deve ser mantida consistente entre o catálogo de seleção e o estoque do estabelecimento.',
    criterioAceite: 'Bloqueio imediato da seleção de ingredientes com quantidade zerada no estoque.',
    isoClassificacao: 'Confiabilidade',
    prioridade: 'Alta'
  },
  {
    id: 'RNF-03',
    tipo: 'RNF',
    titulo: 'Segurança dos Dados e Transações do Cliente',
    descricao: 'Credenciais de acesso e dados de pagamento devem ser protegidos com protocolos modernos de autenticação e comunicação.',
    criterioAceite: 'Uso de OAuth 2.0 (Google), HTTPS/TLS e isolamento de dados de pagamento fora da aplicação.',
    isoClassificacao: 'Segurança',
    prioridade: 'Alta'
  },
  {
    id: 'RNF-04',
    tipo: 'RNF',
    titulo: 'Relevância das Sugestões Personalizadas',
    descricao: 'As recomendações de combinações de lanche devem ser geradas a partir do histórico de pedidos e avaliações dos usuários.',
    criterioAceite: 'Pelo menos uma sugestão com nota média superior a 4,0 exibida no início do fluxo.',
    isoClassificacao: 'Adequação Funcional / Relevância',
    prioridade: 'Média'
  },
  {
    id: 'RNF-05',
    tipo: 'RNF',
    titulo: 'Desempenho nas Operações de Catálogo e Cálculo',
    descricao: 'A navegação e a atualização de preços devem responder com agilidade para não gerar atrasos no atendimento.',
    criterioAceite: 'Recálculo do valor total do lanche personalizado em menos de 200 milissegundos após cada alteração.',
    isoClassificacao: 'Eficiência de Desempenho',
    prioridade: 'Alta'
  },
  {
    id: 'RNF-06',
    tipo: 'RNF',
    titulo: 'Manutenibilidade e Modularidade do Código',
    descricao: 'O código deve ser estruturado em camadas desacopladas com baixo acoplamento e alta coesão, facilitando testes e evolução.',
    criterioAceite: 'Camadas independentes com dependência apontando sempre para dentro (Clean Architecture e DIP).',
    isoClassificacao: 'Manutenibilidade',
    prioridade: 'Alta'
  }
];

export interface GlossaryItem {
  termo: string;
  categoria: 'Engenharia de Software' | 'Arquitetura' | 'Panificação & Negócio' | 'Testes & DevOps';
  significado: string;
  exemploUnespao: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    termo: 'KDS (Kitchen Display System)',
    categoria: 'Panificação & Negócio',
    significado: 'Sistema eletrônico de exibição de pedidos na área de preparo da cozinha/chapa.',
    exemploUnespao: 'Painel do Padeiro do Unespão com comandas que alertam itens retirados e adicionados.'
  },
  {
    termo: 'Clean Architecture',
    categoria: 'Arquitetura',
    significado: 'Padrão arquitetural em camadas concêntricas onde a regra de negócio independe de frameworks.',
    exemploUnespao: 'Entidade `Pedido` e `ItemPersonalizado` no núcleo, isolados de banco de dados e React.'
  },
  {
    termo: 'Adapter Pattern (GoF)',
    categoria: 'Arquitetura',
    significado: 'Padrão de projeto estrutural que converte a interface de uma classe em outra esperada pelo cliente.',
    exemploUnespao: '`GatewayPagamentoAdapter` unifica APIs de Pix e Cartão na interface `IGatewayPagamentoAdapter`.'
  },
  {
    termo: 'Strategy Pattern (GoF)',
    categoria: 'Arquitetura',
    significado: 'Padrão comportamental que define uma família de algoritmos intercambiáveis em tempo de execução.',
    exemploUnespao: 'Alternância entre estratégias de pagamento (Pix, Cartão de Crédito, Balcão) sem modificar PedidoService.'
  },
  {
    termo: 'Decorator Pattern (GoF)',
    categoria: 'Arquitetura',
    significado: 'Padrão estrutural que anexa responsabilidades e estados adicionais a um objeto dinamicamente por composição.',
    exemploUnespao: '`IngredienteDecorator` (ex: `QueijoDecorator`, `BaconDecorator`) decorando a base `ProdutoBase` e recalculando preço em tempo real.'
  },
  {
    termo: 'Playwright',
    categoria: 'Testes & DevOps',
    significado: 'Framework moderno da Microsoft para automação de testes de sistema e ponta a ponta (E2E) em navegadores.',
    exemploUnespao: '6 cenários de teste ponta a ponta que executam o fluxo completo desde o totem até a comanda na chapa.'
  },
  {
    termo: 'Coverlet',
    categoria: 'Testes & DevOps',
    significado: 'Ferramenta multiplataforma de análise de cobertura de código para .NET com suporte a relatórios lcov/Cobertura.',
    exemploUnespao: 'Auditoria de cobertura de código no CI, validando que serviços de Domínio superam 85% de cobertura.'
  },
  {
    termo: 'C4 Model',
    categoria: 'Arquitetura',
    significado: 'Abordagem de quatro níveis (Contexto, Contêineres, Componentes, Código) para documentar arquiteturas de software.',
    exemploUnespao: 'Diagramas do Unespão detalhando a fronteira com a UNESP e a relação entre frontend e serviços.'
  },
  {
    termo: 'xUnit & Moq',
    categoria: 'Testes & DevOps',
    significado: 'Frameworks de testes de unidade e geração de objetos simulados (mocks) para isolamento de dependências.',
    exemploUnespao: '47 testes unitários que validam regras de negócio sem chamar banco de dados real.'
  },
  {
    termo: 'CI/CD (GitHub Actions)',
    categoria: 'Testes & DevOps',
    significado: 'Prática de engenharia onde mudanças de código são testadas, empacotadas e validadas automaticamente.',
    exemploUnespao: 'Workflow `.github/workflows/ci.yml` executando lint, compilação, testes xUnit e testes Playwright a cada PR.'
  },
  {
    termo: 'ISO/IEC 25010',
    categoria: 'Engenharia de Software',
    significado: 'Norma internacional que estabelece modelos de qualidade para produtos de software.',
    exemploUnespao: 'Baliza para os 6 objetivos formais de qualidade do Sistema Unespão com classificação de risco.'
  },
  {
    termo: 'Item de Configuração (IC)',
    categoria: 'Engenharia de Software',
    significado: 'Qualquer elemento do projeto sujeito a controle formal de versão e rastreabilidade.',
    exemploUnespao: 'Códigos TypeScript/.NET, scripts SQL, templates LaTeX, arquivos Markdown e diagramas SVG do Unespão.'
  }
];
