export interface SpotlightTourStep {
  topicNumber: number;
  topicCode: string;
  topicTitle: string;
  topicBadge: string;
  targetId: string; // DOM element ID to spotlight
  targetName: string; // Human-friendly name of the tool in the software
  role: 'cliente' | 'padeiro';
  targetDescription: string;
  softwareEngineeringApplication: {
    secaoDocumento: string;
    conceitoChave: string;
    explicacaoDetalhada: string;
    pontosPraticos: string[];
    padroesOuNormas: string[];
  };
  demoAction?: {
    label: string;
    type: 'open_c4' | 'open_customizer' | 'simulate_order' | 'run_tests' | 'open_cart' | 'open_adapter';
  };
}

export const CLIENT_SPOTLIGHT_STEPS: SpotlightTourStep[] = [
  {
    topicNumber: 1,
    topicCode: '1',
    topicTitle: '1. Introdução e Objetivos',
    topicBadge: 'Contexto & Requisitos',
    targetId: 'tour-client-padarias-header',
    targetName: 'Catálogo de Padarias Próximas no Campus UNESP & Filtros',
    role: 'cliente',
    targetDescription: 'Header com geolocalização no campus UNESP Bauru, filtros de raio (< 0.8 km) e busca dinâmica.',
    softwareEngineeringApplication: {
      secaoDocumento: '1.1 Contexto, 1.2 Escopo, 1.3 Requisitos e 1.4 Qualidade (ISO/IEC 25010)',
      conceitoChave: 'Adequação Funcional e Escopo Delimitado para o Intervalo Universitário',
      explicacaoDetalhada: 'O intervalo de 15 a 20 minutos entre aulas na UNESP Bauru gera filas insustentáveis nas padarias vizinhas. Esta ferramenta materializa o RF01 (Listagem de estabelecimentos parceiros com distância em km, nota média e tempo estimado) e o RNF02 (Usabilidade: localização em 1 toque). Pela ISO/IEC 25010, atende à Adequação Funcional (Completude) e Usabilidade (Operabilidade imediata pelo estudante).',
      pontosPraticos: [
        'RF01: Busca e filtragem em tempo real com distância calculada para o campus.',
        'RNF02: Carga cognitiva mínima, dispensando digitação manual de endereço.',
        'ISO 25010: Eficiência de Desempenho na filtragem client-side sem latência de rede.'
      ],
      padroesOuNormas: ['ISO/IEC 25010', 'RF01', 'RNF02', 'Engenharia de Requisitos']
    }
  },
  {
    topicNumber: 2,
    topicCode: '2',
    topicTitle: '2. Arquitetura do Sistema',
    topicBadge: 'Clean Arch & C4',
    targetId: 'tour-client-padaria-card-first',
    targetName: 'Card da Padaria Parceira & Fronteira de Domínio',
    role: 'cliente',
    targetDescription: 'Entidade de Padaria renderizada com notas, tempo de forno e catálogo de produtos.',
    softwareEngineeringApplication: {
      secaoDocumento: '2.1 Contexto C4, 2.2 Clean Architecture, 2.4 SOLID e 2.5 ADRs',
      conceitoChave: 'Desacoplamento Concêntrico e Princípio de Inversão de Dependência (DIP)',
      explicacaoDetalhada: 'No Modelo C4 (Nível 2 e 3), este componente atua como a interface web do contêiner Frontend, comunicando-se estritamente com a camada de aplicação por meio de DTOs imutáveis (PadariaDTO). Pelo princípio SRP (Single Responsibility), o catálogo de padarias não conhece detalhes de persistência de banco; e por DIP (Dependency Inversion), depende apenas da abstração IPadariaService. A ADR-001 homologa o desacoplamento do frontend.',
      pontosPraticos: [
        'Clean Architecture: Entidade Padaria no núcleo de domínio imune a mudanças de layout.',
        'Modelo C4: Representação clara do Contêiner SPA Web comunicando com a API REST.',
        'SOLID - SRP: Componente renderiza apenas dados de exibição; lógica de distância fica no domínio.'
      ],
      padroesOuNormas: ['Clean Architecture', 'Modelo C4 Nível 2/3', 'SOLID (SRP & DIP)', 'ADR-001']
    },
    demoAction: {
      label: 'Abrir Galeria de Diagramas C4',
      type: 'open_c4'
    }
  },
  {
    topicNumber: 3,
    topicCode: '3',
    topicTitle: '3. Projeto de Componentes',
    topicBadge: 'Padrões GoF',
    targetId: 'tour-client-product-first',
    targetName: 'Lanche Personalizável & Padrões GoF (Adapter e Factory)',
    role: 'cliente',
    targetDescription: 'Módulo de composição do lanche: pão artesanal com ingredientes padrão e adicionais.',
    softwareEngineeringApplication: {
      secaoDocumento: '3.1 Visão Geral, 3.2 Detalhamento e 3.3 Padrões de Projeto GoF',
      conceitoChave: 'Padrão GoF Factory Method e Adapter de Pagamentos',
      explicacaoDetalhada: 'A criação de um item customizado exige o Factory Method para instanciar instâncias válidas de ItemPersonalizado com cálculo dinâmico de adicionais e validação de ingredientes inclusos. No momento do checkout, o padrão GoF Adapter (IPagamentoAdapter) unifica os provedores divergentes (Pix Banco Central, Cartão de Crédito e Pagamento no Balcão) sob o mesmo contrato de domínio executePayment().',
      pontosPraticos: [
        'GoF Factory Method: Monta a estrutura hierárquica ProdutoBase + Ingredientes extras.',
        'GoF Adapter: Padroniza payloads distintos de gateway de pagamento para o domínio.',
        'GoF Repository: IProdutoRepository garante isolamento das fontes de dados de cardápio.'
      ],
      padroesOuNormas: ['GoF Factory Method', 'GoF Adapter', 'GoF Repository', 'Design Patterns']
    },
    demoAction: {
      label: 'Testar Adapter de Pagamentos',
      type: 'open_adapter'
    }
  },
  {
    topicNumber: 4,
    topicCode: '4',
    topicTitle: '4. Projeto de Interface do Usuário',
    topicBadge: 'UX & Nielsen',
    targetId: 'tour-client-customizer-trigger',
    targetName: 'Customizador Estilo iFood & Heurísticas de Jakob Nielsen',
    role: 'cliente',
    targetDescription: 'Botão e fluxo de personalização de ingredientes com recálculo instantâneo de valor.',
    softwareEngineeringApplication: {
      secaoDocumento: '4.1 Ergonomia, 4.2 Heurísticas de Nielsen e 4.3 Prevenção de Erros',
      conceitoChave: 'Aplicação Rigorosa das 10 Heurísticas de Nielsen para Mobile',
      explicacaoDetalhada: 'A interface de montagem aplica a Heurística 5 (Prevenção de Erros) destacando em vermelho ingredientes retirados para evitar alergias alimentares; a Heurística 1 (Visibilidade do Status) atualizando o subtotal a cada clique; e a Heurística 6 (Reconhecimento em vez de Memorização) exibindo ícones visuais e preços unitários ao lado de cada ingrediente, eliminando a sobrecarga da memória de trabalho do aluno.',
      pontosPraticos: [
        'Heurística 1: Feedback imediato de valor e quantidade.',
        'Heurística 5: Prevenção de contaminação cruzada por marcação explícita de itens excluídos.',
        'Acessibilidade: Contraste WCAG AA e áreas de toque com no mínimo 44x44px.'
      ],
      padroesOuNormas: ['10 Heurísticas de Nielsen', 'WCAG AA', 'Ergonomia de Software', 'UX Design']
    },
    demoAction: {
      label: 'Abrir Customizador ao Vivo',
      type: 'open_customizer'
    }
  },
  {
    topicNumber: 5,
    topicCode: '5',
    topicTitle: '5. Especificação e Estratégia de Testes',
    topicBadge: 'xUnit & Moq',
    targetId: 'tour-client-cart-button',
    targetName: 'Sacola de Compras & Cálculo Matemático com Cobertura xUnit',
    role: 'cliente',
    targetDescription: 'Botão e painel da Sacola onde os itens personalizados têm valores somados e validados.',
    softwareEngineeringApplication: {
      secaoDocumento: '5.1 Planejamento, 5.2 Testes de Unidade, 5.4 Cobertura (80%+) e 5.5 xUnit/Moq',
      conceitoChave: 'Pirâmide de Testes de Mike Cohn e Padrão Arrange-Act-Assert (AAA)',
      explicacaoDetalhada: 'O cálculo matemático do pedido é o núcleo mais crítico para a integridade financeira do Unespão. A suíte de testes de unidade com xUnit e Moq cobre 86.4% das linhas lógicas, verificando: cálculo de adicionais múltiplos, prevenção de valores negativos, exclusão de itens e cálculo do frete por distância. O isolamento de dependências com Moq garante testes determinísticos que rodam em menos de 50ms.',
      pontosPraticos: [
        'Pirâmide de Testes: 70% de testes de unidade xUnit no domínio de pedidos.',
        'Padrão AAA: Arrange (prepara lanche e adicionais), Act (calcula total), Assert (verifica precisão).',
        'Critério de Aceite: Cobertura mínima de 80% exigida para aprovação nos builds de CI.'
      ],
      padroesOuNormas: ['xUnit', 'Moq', 'Pirâmide de Mike Cohn', 'Arrange-Act-Assert', 'Cobertura 80%+']
    },
    demoAction: {
      label: 'Abrir Sacola e Simular',
      type: 'open_cart'
    }
  },
  {
    topicNumber: 6,
    topicCode: '6',
    topicTitle: '6. Gestão de Configuração e Manutenção',
    topicBadge: 'CI/CD & Git',
    targetId: 'tour-client-search-input',
    targetName: 'Módulo de Busca Rastreável (Requisito ↔ Commit ↔ Teste)',
    role: 'cliente',
    targetDescription: 'Barra de busca integrada ao catálogo com controle semântico de versões e build contínuo.',
    softwareEngineeringApplication: {
      secaoDocumento: '6.1 Itens de Configuração, 6.2 GitFlow, 6.3 Rastreabilidade e 6.4 CI/CD',
      conceitoChave: 'Rastreabilidade Bidirecional e Pipeline Automatizado no GitHub Actions',
      explicacaoDetalhada: 'Cada componente visual e regra de negócio é um Item de Configuração (IC) rastreável. A funcionalidade de busca, por exemplo, mapeia o Requisito RF01 -> Issue #12 no GitHub -> Branch feature/busca-padarias -> Commit semântico feat(search) -> Suíte de testes BuscaPadariasTests.cs -> Pipeline CI/CD com etapas automatizadas de Lint, Test, Build e Deploy.',
      pontosPraticos: [
        'Rastreabilidade: Do requisito na documentação ao teste de unidade homologado.',
        'Pipeline CI/CD: 4 etapas automáticas executadas em todos os Pull Requests.',
        'Trunk-Based / GitFlow: Ramificações protegidas com code review obrigatório.'
      ],
      padroesOuNormas: ['GitHub Actions', 'GitFlow', 'Rastreabilidade Bidirecional', 'Semantic Versioning']
    }
  },
  {
    topicNumber: 7,
    topicCode: '7',
    topicTitle: '7. Glossário e Siglas',
    topicBadge: 'Vocabulário Técnico',
    targetId: 'tour-client-tabs-selector',
    targetName: 'Navegação Cardápio / Avaliações & Terminologia Acadêmica',
    role: 'cliente',
    targetDescription: 'Seletor de abas conectando métricas de satisfação, SLA de preparo e DTOs de catálogo.',
    softwareEngineeringApplication: {
      secaoDocumento: '7. Glossário e Siglas de Engenharia de Software',
      conceitoChave: 'Linguagem Ubíqua de Domínio (DDD) e Vocabulário Técnico Padronizado',
      explicacaoDetalhada: 'O glossário do Unespão padroniza os conceitos fundamentais para alinhamento entre a equipe de desenvolvimento e os avaliadores da UNESP: DTO (Data Transfer Object), SLA (Service Level Agreement de 10 min de preparo), KDS (Kitchen Display System), C4 Model, SOLID, ISO/IEC 25010 e NPS (Net Promoter Score nas avaliações dos estudantes).',
      pontosPraticos: [
        'Linguagem Ubíqua: Termos comuns utilizados tanto no código quanto na documentação formal.',
        'SLA de Entrega: Métricas claras de tempo de espera monitoradas pelo sistema.',
        'DTO: Objeto de transporte leve garantindo performance em conexões 4G/Wi-Fi do campus.'
      ],
      padroesOuNormas: ['DDD (Domain-Driven Design)', 'Glossário IEEE', 'Terminologia ISO']
    }
  },
  {
    topicNumber: 8,
    topicCode: '8',
    topicTitle: '8. Controle de Versões do Documento',
    topicBadge: 'Governança & Histórico',
    targetId: 'tour-client-footer-meta',
    targetName: 'Rodapé de Homologação & Histórico de Versões da UNESP Bauru',
    role: 'cliente',
    targetDescription: 'Rodapé institucional auditável com versão homologada para a banca de Engenharia de Software II.',
    softwareEngineeringApplication: {
      secaoDocumento: '8. Controle de Versões do Documento',
      conceitoChave: 'Ciclo de Vida Auditável da Documentação Acadêmica (v0.1 a v1.0)',
      explicacaoDetalhada: 'A documentação técnica do Unespão seguiu marcos rigorosos durante o semestre letivo: v0.1 (Concepção de Requisitos e Escopo Inicial), v0.5 (Definição da Clean Architecture e Diagramas C4), v0.8 (Especificação de Testes xUnit e Pipeline CI/CD) e v1.0 (Versão Final Consolidada para Apresentação e Defesa na UNESP Bauru). Cada release possui data, autores e aprovação auditável.',
      pontosPraticos: [
        'Governança de Documento: Tabela formal de versões mantida no repositório.',
        'Conformidade Acadêmica: Alinhamento completo com os objetivos de Engenharia de Software II.',
        'Homologação: Sistema e documentação prontos para inspeção da banca examinadora.'
      ],
      padroesOuNormas: ['Governança de Projetos', 'Controle de Versão IEEE 1074', 'UNESP FC Bauru']
    }
  }
];

export const BAKER_SPOTLIGHT_STEPS: SpotlightTourStep[] = [
  {
    topicNumber: 1,
    topicCode: '1',
    topicTitle: '1. Introdução e Objetivos',
    topicBadge: 'Contexto & KDS',
    targetId: 'tour-baker-header-kds',
    targetName: 'Header KDS (Kitchen Display System) & Fila da Chapa',
    role: 'padeiro',
    targetDescription: 'Painel da cozinha industrial substituindo comandas de papel por fila digital em tempo real.',
    softwareEngineeringApplication: {
      secaoDocumento: '1.1 Contexto, 1.2 Escopo e 1.3 Requisitos RF03/RF04 e RNF01',
      conceitoChave: 'Eliminação de Gargalo Operacional e Eficiência Temporal (RNF01)',
      explicacaoDetalhada: 'Na chapa da padaria, o padeiro recebia anotações em papel manchadas de manteiga, gerando erros recorrentes na montagem de lanches e reclamações de clientes. Esta tela implementa o RF03 (Comanda digital da chapa com destaque imediato de adições e remoções) e o RNF01 (Eficiência Temporal: tempo de transmissão entre o pagamento do cliente e a tela do padeiro menor que 1 segundo).',
      pontosPraticos: [
        'RF03: Fila da chapa organizada com visualização de alta visibilidade.',
        'RNF01: Latência sub-segundo na chegada de novos pedidos via WebSockets/Eventos.',
        'ISO 25010: Eficiência de Desempenho e Confiabilidade operacional na cozinha.'
      ],
      padroesOuNormas: ['ISO/IEC 25010', 'RF03', 'RF04', 'RNF01', 'KDS Industrial']
    }
  },
  {
    topicNumber: 2,
    topicCode: '2',
    topicTitle: '2. Arquitetura do Sistema',
    topicBadge: 'Eventos & Clean Arch',
    targetId: 'tour-baker-simular-btn',
    targetName: 'Barramento de Eventos de Pedidos & Clean Architecture',
    role: 'padeiro',
    targetDescription: 'Mecanismo de recepção de eventos Publish/Subscribe conectando o Checkout do Cliente à Cozinha.',
    softwareEngineeringApplication: {
      secaoDocumento: '2.1 Contexto C4, 2.2 Clean Architecture, 2.3 Contêineres e 2.5 ADR-002',
      conceitoChave: 'Arquitetura Orientada a Eventos (EDA) e Desacoplamento de Produtor/Consumidor',
      explicacaoDetalhada: 'Na Clean Architecture, o Padeiro é um consumidor (Observer/Subscriber) de eventos de domínio gerados pelo Use Case CriarPedido. A ADR-002 aprovou a arquitetura orientada a eventos para que a tela do padeiro nunca precise fazer refresh ou requisições repetitivas de polling, mantendo os recursos do servidor otimizados mesmo durante o pico de intervalo da UNESP.',
      pontosPraticos: [
        'C4 Nível 2: Mensageria em tempo real conectando o contêiner API ao KDS Web.',
        'Clean Architecture: Use Case NotificarCozinha executa sem acoplamento com a UI do padeiro.',
        'ADR-002: Adoção de WebSockets/Event-Driven para garantir notificações instantâneas.'
      ],
      padroesOuNormas: ['Event-Driven Architecture', 'Clean Architecture', 'Observer Pattern', 'ADR-002']
    },
    demoAction: {
      label: 'Simular Chegada de Pedido',
      type: 'simulate_order'
    }
  },
  {
    topicNumber: 3,
    topicCode: '3',
    topicTitle: '3. Projeto de Componentes',
    topicBadge: 'GoF Decorator/Adapter',
    targetId: 'tour-baker-comanda-card-first',
    targetName: 'Comanda Digital & DTO de Personalização de Lanches',
    role: 'padeiro',
    targetDescription: 'Card estruturado de comanda separando itens de base, adições e exclusões.',
    softwareEngineeringApplication: {
      secaoDocumento: '3.1 Visão Geral e 3.3 Padrões de Projeto GoF (Decorator & Adapter)',
      conceitoChave: 'GoF Decorator para Montagem Dinâmica e Adapter de Notificação',
      explicacaoDetalhada: 'O lanche que chega à chapa foi montado conceitualmente usando o padrão GoF Decorator: sobre a base (ex: Pão Francês com Manteiga), decoram-se ingredientes adicionais (ex: Queijo Prato, Bacon) ou suprimem-se itens padrão. O PedidoService gera o PedidoDTO já pré-processado para que o padeiro não precise deduzir informações complexas durante o preparo.',
      pontosPraticos: [
        'GoF Decorator: Composição de ingredientes agregados dinamicamente ao produto base.',
        'DTO de Comanda: Estrutura leve e estrita com código, nome do cliente e lista de itens.',
        'Repository Pattern: Atualização atômica do status do pedido no banco de dados.'
      ],
      padroesOuNormas: ['GoF Decorator', 'GoF Adapter', 'DTO (Data Transfer Object)', 'Repository']
    }
  },
  {
    topicNumber: 4,
    topicCode: '4',
    topicTitle: '4. Projeto de Interface do Usuário',
    topicBadge: 'Ergonomia Industrial',
    targetId: 'tour-baker-action-buttons-first',
    targetName: 'Botões de Ação Industriais & Heurísticas de Nielsen',
    role: 'padeiro',
    targetDescription: 'Botões grandes de alta visibilidade ("Iniciar Preparo", "Marcar como Pronto") para a chapa.',
    softwareEngineeringApplication: {
      secaoDocumento: '4.1 Ergonomia e Contexto de Uso, 4.2 Heurísticas de Nielsen e 4.3 Acessibilidade',
      conceitoChave: 'Ergonomia de Cozinha: Alvos de Toque Grandes e Heurística 4 (Consistência)',
      explicacaoDetalhada: 'O ambiente da chapa de padaria envolve alta temperatura, vapor e operadores com mãos sujas de farinha ou luvas térmicas. Por isso, a interface aplica Ergonomia de Software: botões de ação com mais de 50px de altura, contraste máximo WCAG AAA, cores padronizadas (Amarelo para "Na Chapa" e Verde para "Pronto") e confirmação com um único toque sem caixas de diálogo modais intrusivas.',
      pontosPraticos: [
        'Heurística 4 (Consistência e Padrões): Semáforo operacional universal de cores.',
        'Ergonomia: Alvos de toque generosos permitindo acionamento rápido até com o cotovelo ou luva.',
        'Heurística 1 (Visibilidade): O status muda imediatamente no visor com feedback visual evidente.'
      ],
      padroesOuNormas: ['Heurísticas de Nielsen', 'Ergonomia Industrial ISO 9241', 'WCAG AAA', 'UI KDS']
    }
  },
  {
    topicNumber: 5,
    topicCode: '5',
    topicTitle: '5. Especificação e Estratégia de Testes',
    topicBadge: 'Máquina de Estados',
    targetId: 'tour-baker-status-filter-bar',
    targetName: 'Filtros da Fila & Validação da Máquina de Estados com xUnit',
    role: 'padeiro',
    targetDescription: 'Barra de filtros por fase: Fila Ativa, Aguardando Preparo, Na Chapa e Prontos.',
    softwareEngineeringApplication: {
      secaoDocumento: '5.1 Planejamento, 5.2 Testes de Unidade xUnit e 5.4 Critérios de Aceite',
      conceitoChave: 'Teste Automatizado da Máquina de Estados Finitos (FSM) de Pedidos',
      explicacaoDetalhada: 'O ciclo de vida do pedido segue uma máquina de estados finitos estrita: Aguardando -> Em Preparo -> Pronto -> Concluído. A suíte de testes xUnit valida regras invioláveis, tais como: "Um pedido não pode ir de Aguardando direto para Concluído sem passar pelo preparo" e "Pedidos cancelados não podem ser iniciados na chapa". Mocks com Moq garantem que eventos de notificação são disparados a cada transição.',
      pontosPraticos: [
        'xUnit FSM: Testes parametrizados (Theory/InlineData) cobrindo todas as transições de status permitidas e proibidas.',
        'Moq: Mock de IPushNotificationService para validar envio de alerta ao cliente no status "Pronto".',
        'Critério de Conclusão: 100% de aprovação na máquina de estados para liberar o deploy.'
      ],
      padroesOuNormas: ['xUnit', 'Moq', 'Máquina de Estados Finitos', 'Theory / InlineData']
    },
    demoAction: {
      label: 'Executar Suíte de Testes',
      type: 'run_tests'
    }
  },
  {
    topicNumber: 6,
    topicCode: '6',
    topicTitle: '6. Gestão de Configuração e Manutenção',
    topicBadge: 'Segurança Alimentar',
    targetId: 'tour-baker-ingredients-box',
    targetName: 'Destaque de Itens Removidos (Prevenção Alérgica & Rastreabilidade)',
    role: 'padeiro',
    targetDescription: 'Bloco de alta prioridade destacando em vermelho tachado o que NÃO colocar no lanche.',
    softwareEngineeringApplication: {
      secaoDocumento: '6.1 Itens de Configuração, 6.3 Rastreabilidade e 6.4 Pipeline CI/CD',
      conceitoChave: 'Rastreabilidade de Requisitos Críticos de Segurança e Gestão de Alterações',
      explicacaoDetalhada: 'O requisito de segurança alimentar (impedir contaminação por ingredientes alergênicos solicitados para remoção) é tratado como Item de Configuração de Alta Criticidade. Qualquer alteração no código de parsing de ingredientes removidos exige aprovação de Pull Request com pelo menos 2 revisores no GitHub e execução obrigatória dos testes de regressão no GitHub Actions.',
      pontosPraticos: [
        'Rastreabilidade Crítica: Requisito RF02 -> Módulo de Parsing -> Testes de Não-Contaminação.',
        'Gestão de Mudanças: Branch protection rules que barram commits diretos na main.',
        'Auditoria: Log de preparação guardado com timestamp e ID do operador.'
      ],
      padroesOuNormas: ['Gestão de Configuração (IEEE 828)', 'Branch Protection', 'GitHub Actions', 'Segurança']
    }
  },
  {
    topicNumber: 7,
    topicCode: '7',
    topicTitle: '7. Glossário e Siglas',
    topicBadge: 'Vocabulário da Cozinha',
    targetId: 'tour-baker-time-meta',
    targetName: 'Timestamp do Pedido & Métricas de SLA (KDS, FIFO, Lead Time)',
    role: 'padeiro',
    targetDescription: 'Indicadores cronológicos de quando a comanda entrou na chapa e tempo de permanência.',
    softwareEngineeringApplication: {
      secaoDocumento: '7. Glossário e Siglas Técnicas do Projeto',
      conceitoChave: 'Termos e Métricas Operacionais de Engenharia e Negócio',
      explicacaoDetalhada: 'Na visão do padeiro, o glossário formaliza métricas essenciais: KDS (Kitchen Display System), SLA (Service Level Agreement de 10 min de preparo para atendimento no intervalo da UNESP), FIFO (First-In, First-Out: pedidos mais antigos devem ser preparados primeiro), Lead Time (tempo entre a confirmação do pedido e a entrega ao estudante) e Polling vs Push.',
      pontosPraticos: [
        'FIFO: Ordenação automática dos pedidos por tempo de chegada para evitar atrasos.',
        'SLA: Alertas visuais quando o tempo de espera do lanche ultrapassa o limite tolerado.',
        'KDS: Terminologia padrão da indústria de Food Service implementada no Unespão.'
      ],
      padroesOuNormas: ['Glossário de Engenharia de Software', 'Métricas de SLA', 'Metodologias Ágeis']
    }
  },
  {
    topicNumber: 8,
    topicCode: '8',
    topicTitle: '8. Controle de Versões do Documento',
    topicBadge: 'Auditoria de Entrega',
    targetId: 'tour-baker-system-footer',
    targetName: 'Versão do Sistema na Cozinha & Controle de Versões UNESP',
    role: 'padeiro',
    targetDescription: 'Assinatura do software em operação com identificador de versão do projeto acadêmico.',
    softwareEngineeringApplication: {
      secaoDocumento: '8. Controle de Versões do Documento',
      conceitoChave: 'Sincronização entre Versão da Documentação e Versão do Software em Produção',
      explicacaoDetalhada: 'O controle de versão v1.0 assegura que a tela do Padeiro reflete exatamente o que foi especificado nas seções 1 a 6 da documentação técnica. Registra os testes realizados no ambiente simulado com múltiplos pedidos simultâneos, garantindo à banca da UNESP Bauru que todos os requisitos foram implementados, testados e validados.',
      pontosPraticos: [
        'Convergência Doc-Código: Nenhuma funcionalidade existe no código sem respaldo no documento.',
        'Histórico Auditável: Registros das versões v0.1, v0.5, v0.8 e v1.0 assinados pela equipe.',
        'Entrega Final: Sistema pronto para homologação na disciplina de Engenharia de Software II.'
      ],
      padroesOuNormas: ['IEEE 1074', 'Controle de Versão Semântico (SemVer)', 'UNESP FC Bauru 2026']
    }
  }
];
