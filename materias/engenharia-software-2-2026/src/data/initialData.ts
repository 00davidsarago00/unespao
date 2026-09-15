import { ProdutoBase, Ingrediente, SugestaoPersonalizada, Pedido, ArchitectureDiagram, ReviewOnline } from '../types';

export const INITIAL_REVIEWS: ReviewOnline[] = [
  {
    id: 'rev-1',
    autorNome: 'Thiago Nomura',
    autorCargoOuCurso: 'Desenvolvedor de Software',
    nota: 5,
    data: 'Hoje às 18:45',
    comentario: 'A personalização no estilo iFood é excelente! Montei ciabatta com carne seca, queijo canastra e maionese verde. Chegou quentinho e super rápido.',
    lancheFavorito: 'Pão Ciabatta com Carne Seca e Canastra',
  },
  {
    id: 'rev-2',
    autorNome: 'Beatriz Silveira',
    autorCargoOuCurso: 'Designer Gráfica',
    nota: 5,
    data: 'Ontem',
    comentario: 'Poder remover a manteiga e escolher exatamente os vegetais e o molho pesto fez toda a diferença. O miolo do pão francês é impecável.',
    lancheFavorito: 'Pão Francês Artesanal com Frango e Pesto',
  },
  {
    id: 'rev-3',
    autorNome: 'Marcos Vinícius',
    autorCargoOuCurso: 'Engenheiro Eletricista',
    nota: 4,
    data: 'Há 2 dias',
    comentario: 'Atendimento muito ágil pelo sistema do Unespão. Acompanhar o status do pedido e só ir buscar quando o pão estiver pronto evita fila no balcão.',
    lancheFavorito: 'Brioche Folhado com Ovos Mexidos',
  },
  {
    id: 'rev-4',
    autorNome: 'Lucas Andrade',
    autorCargoOuCurso: 'Morador da Vila Universitária',
    nota: 5,
    data: 'Há 3 dias',
    comentario: 'O pão australiano com frango e mostarda com mel é imbatível. A interface é super limpa e direta, muito melhor que cardápios de papel.',
    lancheFavorito: 'Pão Australiano Especial',
  },
  {
    id: 'rev-5',
    autorNome: 'Camila Ferreira',
    autorCargoOuCurso: 'Analista de Sistemas',
    nota: 5,
    data: 'Há 4 dias',
    comentario: 'Adorei a transparência dos adicionais e valores calculados em tempo real. Pão crocante e saboroso.',
    lancheFavorito: 'Pão 7 Grãos com Tofu e Tomate Confit',
  },
];

export const INITIAL_BASES: ProdutoBase[] = [
  {
    id: 'base-1',
    nome: 'Pão Francês Artesanal',
    categoria: 'Pão Artesanal',
    descricao: 'Clássico da padaria Unespão, com casquinha estaladiça e miolo macio assado na hora.',
    precoBase: 6.50,
    estoque: 45,
    unidade: 'unid',
    icone: '🥖',
    calorias: 180,
    ingredientesInclusos: ['Manteiga artesanal na chapa', 'Orégano fresco da horta'],
  },
  {
    id: 'base-2',
    nome: 'Pão Ciabatta com Fermentação Natural',
    categoria: 'Pão Artesanal',
    descricao: 'Receita italiana com azeite de oliva extra virgem e alta hidratação. Textura aerada.',
    precoBase: 9.00,
    estoque: 28,
    unidade: 'unid',
    icone: '🍞',
    calorias: 210,
    ingredientesInclusos: ['Azeite de oliva extra virgem', 'Sal de ervas aromáticas'],
  },
  {
    id: 'base-3',
    nome: 'Pão Australiano com Mel',
    categoria: 'Pão Artesanal',
    descricao: 'Pão escuro macio e adocicado com mel puro e farinha integral selecionada.',
    precoBase: 9.50,
    estoque: 30,
    unidade: 'unid',
    icone: '🥐',
    calorias: 230,
    ingredientesInclusos: ['Manteiga cremosa aerada da casa'],
  },
  {
    id: 'base-4',
    nome: 'Pão Integral 7 Grãos',
    categoria: 'Pão Artesanal',
    descricao: 'Rico em fibras com sementes de girassol, linhaça, chia, aveia e gergelim.',
    precoBase: 8.50,
    estoque: 22,
    unidade: 'unid',
    icone: '🥪',
    calorias: 165,
    ingredientesInclusos: ['Azeite aromatizado com tomilho', 'Mix de sementes tostadas'],
  },
  {
    id: 'base-5',
    nome: 'Base Salada Fresca Bowl',
    categoria: 'Base Leve',
    descricao: 'Mix crocante de alfaces americana, crespa e rúcula baby servido em tigela.',
    precoBase: 8.00,
    estoque: 35,
    unidade: 'porção',
    icone: '🥗',
    calorias: 45,
    ingredientesInclusos: ['Mix de folhas verdes', 'Molho vinagrete de limão siciliano'],
  },
  {
    id: 'base-6',
    nome: 'Pão Brioche Folhado na Manteiga',
    categoria: 'Pão Artesanal',
    descricao: 'Massa leve e amanteigada, dourada na chapa para selar os sucos do recheio.',
    precoBase: 10.00,
    estoque: 18,
    unidade: 'unid',
    icone: '🥯',
    calorias: 260,
    ingredientesInclusos: ['Manteiga dourada na chapa'],
  }
];

export const INITIAL_INGREDIENTS: Ingrediente[] = [
  // Proteínas / Recheios
  {
    id: 'ing-1',
    nome: 'Frango Desfiado com Ervas Finas',
    categoria: 'Recheio / Proteína',
    descricao: 'Peito de frango marinado, cozido lentamente e desfiado com alecrim e sálvia.',
    precoUnitario: 7.50,
    estoque: 40,
    unidade: '100g',
    icone: '🍗',
  },
  {
    id: 'ing-2',
    nome: 'Peito de Peru Defumado',
    categoria: 'Recheio / Proteína',
    descricao: 'Fatias finas de peito de peru com leve toque defumado de macieira.',
    precoUnitario: 6.80,
    estoque: 32,
    unidade: '80g',
    icone: '🥓',
  },
  {
    id: 'ing-3',
    nome: 'Carne Seca Acebolada na Manteiga de Garrafa',
    categoria: 'Recheio / Proteína',
    descricao: 'Carne desfiada tradicional, puxada com cebola caramelizada e especiarias.',
    precoUnitario: 9.50,
    estoque: 25,
    unidade: '100g',
    icone: '🥩',
  },
  {
    id: 'ing-4',
    nome: 'Cogumelos Paris e Shimeji Salteados',
    categoria: 'Recheio / Proteína',
    descricao: 'Cogumelos frescos salteados no azeite com shoyu e cebolinha fresca.',
    precoUnitario: 8.00,
    estoque: 20,
    unidade: '90g',
    icone: '🍄',
    isVegetariano: true,
  },
  {
    id: 'ing-5',
    nome: 'Rosbife Artesanal da Casa',
    categoria: 'Recheio / Proteína',
    descricao: 'Lagarto bovino assado ao ponto rosado com crosta de pimenta-do-reino.',
    precoUnitario: 10.50,
    estoque: 19,
    unidade: '90g',
    icone: '🍖',
  },

  // Queijos
  {
    id: 'ing-6',
    nome: 'Queijo Minas Padrão da Canastra',
    categoria: 'Queijo',
    descricao: 'Queijo mineiro autêntico com sabor suave e derretimento cremoso.',
    precoUnitario: 5.00,
    estoque: 50,
    unidade: '60g',
    icone: '🧀',
    isVegetariano: true,
  },
  {
    id: 'ing-7',
    nome: 'Mussarela de Búfala em Fatias',
    categoria: 'Queijo',
    descricao: 'Fresquíssima, cremosa e de textura sedosa.',
    precoUnitario: 6.50,
    estoque: 24,
    unidade: '60g',
    icone: '🧀',
    isVegetariano: true,
  },
  {
    id: 'ing-8',
    nome: 'Cheddar Inglês Maturado',
    categoria: 'Queijo',
    descricao: 'Sabor marcante e cor dourada clássica.',
    precoUnitario: 5.80,
    estoque: 35,
    unidade: '50g',
    icone: '🧀',
    isVegetariano: true,
  },
  {
    id: 'ing-9',
    nome: 'Gorgonzola Cremoso',
    categoria: 'Queijo',
    descricao: 'Toque picante e aroma característico de queijo azul nobre.',
    precoUnitario: 6.00,
    estoque: 15,
    unidade: '45g',
    icone: '🧀',
    isVegetariano: true,
  },

  // Vegetais / Saladas
  {
    id: 'ing-10',
    nome: 'Tomates Confitados no Azeite',
    categoria: 'Salada / Vegetal',
    descricao: 'Tomatinhos assados lentamente com dentes de alho e ramos de tomilho.',
    precoUnitario: 3.50,
    estoque: 40,
    unidade: '50g',
    icone: '🍅',
    isVegetariano: true,
  },
  {
    id: 'ing-11',
    nome: 'Rúcula Selvagem',
    categoria: 'Salada / Vegetal',
    descricao: 'Folhas picantes e crocantes higienizadas.',
    precoUnitario: 2.50,
    estoque: 45,
    unidade: 'porção',
    icone: '🥬',
    isVegetariano: true,
  },
  {
    id: 'ing-12',
    nome: 'Cebola Roxa Marinada no Limão',
    categoria: 'Salada / Vegetal',
    descricao: 'Acidez refrescante e crocância balanceada.',
    precoUnitario: 2.00,
    estoque: 50,
    unidade: 'porção',
    icone: '🧅',
    isVegetariano: true,
  },
  {
    id: 'ing-13',
    nome: 'Picles de Pepino Agridoce',
    categoria: 'Salada / Vegetal',
    descricao: 'Crocante clássico no vinagre de maçã com sementes de mostarda.',
    precoUnitario: 3.00,
    estoque: 30,
    unidade: 'porção',
    icone: '🥒',
    isVegetariano: true,
  },

  // Molhos Artesanais
  {
    id: 'ing-14',
    nome: 'Maionese Temperada Unespão',
    categoria: 'Molho Artesanal',
    descricao: 'Receita secreta da padaria com cebolinha, salsinha e alho confitado.',
    precoUnitario: 3.00,
    estoque: 60,
    unidade: '40ml',
    icone: '🍶',
    isVegetariano: true,
  },
  {
    id: 'ing-15',
    nome: 'Mostarda Dijon com Mel Silvestre',
    categoria: 'Molho Artesanal',
    descricao: 'Equilíbrio doce e pungente ideal para aves e embutidos.',
    precoUnitario: 3.50,
    estoque: 45,
    unidade: '40ml',
    icone: '🍯',
    isVegetariano: true,
  },
  {
    id: 'ing-16',
    nome: 'Pesto Genovês de Manjericão',
    categoria: 'Molho Artesanal',
    descricao: 'Azeite extra virgem, nozes, parmesão curado e manjericão fresco.',
    precoUnitario: 4.50,
    estoque: 30,
    unidade: '40ml',
    icone: '🌿',
    isVegetariano: true,
  },
  {
    id: 'ing-17',
    nome: 'Geleia de Pimenta Biquinho Suave',
    categoria: 'Molho Artesanal',
    descricao: 'Adocicada com brilho avermelhado e ardência sutil.',
    precoUnitario: 3.80,
    estoque: 25,
    unidade: '35ml',
    icone: '🌶️',
    isVegetariano: true,
  },

  // Crocantes e Toques Finais
  {
    id: 'ing-18',
    nome: 'Cebola Crispy Dourada',
    categoria: 'Crocante & Toque Final',
    descricao: 'Cebola frita sequinha e ultracrocante.',
    precoUnitario: 3.20,
    estoque: 40,
    unidade: 'porção',
    icone: '🧅',
    isVegetariano: true,
  },
  {
    id: 'ing-19',
    nome: 'Castanha-de-Caju Tostada Picada',
    categoria: 'Crocante & Toque Final',
    descricao: 'Castanhas brasileiras com flor de sal.',
    precoUnitario: 4.20,
    estoque: 28,
    unidade: 'porção',
    icone: '🥜',
    isVegetariano: true,
  },
  {
    id: 'ing-20',
    nome: 'Bacon em Tiras Crocante na Chapa',
    categoria: 'Crocante & Toque Final',
    descricao: 'Bacon defumado sequinho, dourado no momento.',
    precoUnitario: 4.50,
    estoque: 35,
    unidade: '40g',
    icone: '🥓',
  }
];

export const INITIAL_SUGGESTIONS: SugestaoPersonalizada[] = [
  {
    id: 'sug-1',
    titulo: 'O Campeão da Padaria',
    motivo: 'Baseado nos pedidos mais bem avaliados (nota média 4.9)',
    produtoBaseId: 'base-2', // Ciabatta
    ingredientesIds: ['ing-3', 'ing-6', 'ing-14', 'ing-18'], // Carne Seca + Minas + Maionese + Cebola Crispy
    precoEstimado: 33.20,
    popularidade: 98,
  },
  {
    id: 'sug-2',
    titulo: 'Unespão Leve & Gourmet',
    motivo: 'Recomendação balanceada rica em proteínas magras',
    produtoBaseId: 'base-4', // Integral
    ingredientesIds: ['ing-1', 'ing-7', 'ing-10', 'ing-11', 'ing-16'], // Frango + Búfala + Tomate Confit + Rúcula + Pesto
    precoEstimado: 31.00,
    popularidade: 92,
  },
  {
    id: 'sug-3',
    titulo: 'Australiano Especial da Casa',
    motivo: 'Combinação premiada com molho de mostarda e mel',
    produtoBaseId: 'base-3', // Australiano
    ingredientesIds: ['ing-5', 'ing-8', 'ing-13', 'ing-15', 'ing-20'], // Rosbife + Cheddar + Picles + Mostarda Mel + Bacon
    precoEstimado: 39.10,
    popularidade: 89,
  }
];

export const INITIAL_ORDERS: Pedido[] = [
  {
    id: 'ped-104',
    codigo: 'UNESPAO-104',
    canal: 'app_mobile',
    clienteNome: 'Gabriel Santos',
    clienteEmail: 'gabriel.santos@gmail.com',
    valorTotal: 26.50,
    status: 'confirmado',
    metodoPagamento: 'pix',
    criadoEm: 'Agora mesmo',
    tempoEstimadoMin: 12,
    itens: [
      {
        id: 'item-novo-1',
        produtoBase: INITIAL_BASES[0], // Pão Francês
        ingredientes: [
          INITIAL_INGREDIENTS[0], // Frango Desfiado
          INITIAL_INGREDIENTS[4], // Queijo Canastra
          INITIAL_INGREDIENTS[13], // Maionese temperada
        ],
        ingredientesRemovidos: ['Orégano fresco da horta'],
        quantidade: 1,
        precoTotal: 26.50,
        observacoes: 'Pão bem tostado na chapa com casquinha crocante!'
      }
    ]
  },
  {
    id: 'ped-102',
    codigo: 'UNESPAO-102',
    canal: 'totem_anonimo',
    clienteNome: 'Cliente Balcão #12',
    valorTotal: 34.00,
    status: 'confirmado',
    metodoPagamento: 'cartao_credito',
    criadoEm: 'Há 4 min',
    tempoEstimadoMin: 10,
    itens: [
      {
        id: 'item-2',
        produtoBase: INITIAL_BASES[1], // Ciabatta
        ingredientes: [
          INITIAL_INGREDIENTS[2], // Carne seca
          INITIAL_INGREDIENTS[7], // Cheddar
          INITIAL_INGREDIENTS[17], // Cebola crispy
        ],
        quantidade: 1,
        precoTotal: 34.00,
        observacoes: 'Sem pressa, bem prensado.'
      }
    ]
  },
  {
    id: 'ped-103',
    codigo: 'UNESPAO-103',
    canal: 'app_mobile',
    clienteNome: 'Mariana Souza',
    clienteEmail: 'mariana.souza@gmail.com',
    valorTotal: 33.20,
    status: 'confirmado',
    metodoPagamento: 'pix',
    criadoEm: 'Há 8 min',
    tempoEstimadoMin: 15,
    itens: [
      {
        id: 'item-3',
        produtoBase: INITIAL_BASES[4], // Salada Bowl
        ingredientes: [
          INITIAL_INGREDIENTS[3], // Cogumelos
          INITIAL_INGREDIENTS[6], // Búfala
          INITIAL_INGREDIENTS[15], // Pesto
          INITIAL_INGREDIENTS[18], // Castanha
        ],
        quantidade: 1,
        precoTotal: 33.20,
      }
    ]
  },
  {
    id: 'ped-101',
    codigo: 'UNESPAO-101',
    canal: 'totem_qrcode',
    clienteNome: 'Thiago Nomura',
    clienteEmail: 'thiago.nomura@gmail.com',
    valorTotal: 29.50,
    status: 'confirmado',
    metodoPagamento: 'pix',
    criadoEm: 'Há 18 min',
    tempoEstimadoMin: 8,
    itens: [
      {
        id: 'item-1',
        produtoBase: INITIAL_BASES[0],
        ingredientes: [
          INITIAL_INGREDIENTS[0], // Frango
          INITIAL_INGREDIENTS[5], // Minas
          INITIAL_INGREDIENTS[13], // Maionese
          INITIAL_INGREDIENTS[9], // Tomate
        ],
        quantidade: 1,
        precoTotal: 29.50,
        observacoes: 'Pão bem tostado na chapa, por favor.'
      }
    ],
    avaliacao: {
      id: 'aval-1',
      pedidoId: 'ped-101',
      clienteNome: 'Thiago Nomura',
      nota: 5,
      comentario: 'O pão francês com frango e maionese temperada estava espetacular! Pedido no totem foi rápido e prático.',
      dataHora: '18:45 - Hoje'
    }
  }
];

export const ARCHITECTURE_DIAGRAMS: ArchitectureDiagram[] = [
  {
    id: 'diag-c4-1',
    titulo: 'C4 Nível 1 — Diagrama de Contexto',
    nivel: 'Nível 1 (Contexto)',
    arquivo: '/images/c4-nivel1-contexto.svg',
    descricao: 'Trata o Sistema Unespão como uma caixa-preta e delimita suas fronteiras externas com os dois atores humanos (Cliente e Atendente/Administrador) e os três sistemas externos (Google OAuth 2.0, Gateway de Pagamento e API de Localização/CEP).',
    conceitosSolid: ['Fronteiras de Sistema', 'Isolamento de Credenciais', 'Segurança Fora do Navegador']
  },
  {
    id: 'diag-c4-2',
    titulo: 'C4 Nível 2 — Diagrama de Contêineres',
    nivel: 'Nível 2 (Contêineres)',
    arquivo: '/images/c4-nivel2-containers.svg',
    descricao: 'Abre a caixa-preta do sistema e revela as três peças tecnológicas fundamentais: Web App (Totem & Cliente em SPA React/Angular responsivo), API Unespão (.NET 8 / ASP.NET Core) e Banco de Dados PostgreSQL (Entity Framework Core).',
    conceitosSolid: ['Clean Architecture em Camadas', 'SPA Responsivo Único', 'Comunicação Unidirecional']
  },
  {
    id: 'diag-c4-3',
    titulo: 'C4 Nível 3 — Diagrama de Classes e Componentes',
    nivel: 'Nível 3 (Classes & Interfaces)',
    arquivo: '/images/c4-nivel3-diagrama-classes.svg',
    descricao: 'Detalhamento de componentes internos da API Unespão: Controllers, Services, Repositories, External Adapters e Domain Models, demonstrando que toda injeção é realizada via interfaces e abstrações puras.',
    conceitosSolid: ['DIP (Inversão de Dependência)', 'ISP (Segregação de Interfaces)', 'LSP (Substituição de Liskov)']
  },
  {
    id: 'diag-seq-pedido',
    titulo: 'Diagrama de Sequência — Confirmação de Pedido',
    nivel: 'Dinâmica de Execução',
    arquivo: '/images/diagrama-sequencia-confirmar-pedido.svg',
    descricao: 'Orquestração do ciclo de vida crítico do pedido: PedidosController invoca PedidoService, que coordena EstoqueService (baixa de insumos), IGatewayPagamentoAdapter (cobrança segura) e IPedidoRepository (persistência de estado).',
    conceitosSolid: ['SRP (Responsabilidade Única)', 'Transação Coordenada', 'Desacoplamento de Gateway']
  },
  {
    id: 'diag-adapter-pagamento',
    titulo: 'Padrão GoF Adapter — Gateway de Pagamento',
    nivel: 'Padrão de Projeto Estrutural',
    arquivo: '/images/padrao-adapter-pagamento.svg',
    descricao: 'Estrutura clássica Target / Adapter / Adaptee: PedidoService (Client) depende apenas da interface limpa IGatewayPagamentoAdapter (Target), enquanto GatewayPagamentoAdapter traduz as chamadas para o SDK do Gateway externo (Adaptee).',
    conceitosSolid: ['Padrão GoF Adapter', 'OCP (Aberto/Fechado)', 'Substitutibilidade de Gateways']
  },
  {
    id: 'diag-decorator-sanduiche',
    titulo: 'Padrão GoF Decorator — Personalização de Lanche',
    nivel: 'Padrão de Projeto Estrutural',
    arquivo: '/images/padrao-decorator-personalizacao.svg',
    descricao: 'Estrutura Component / ConcreteComponent / Decorator: IItemPersonalizavel implementada por ProdutoBase e decorada dinamicamente por uma única classe IngredienteDecorator, parametrizada pelo Ingrediente que representa, eliminando explosão combinatória de subclasses e permitindo recálculo de preço incremental em tempo de execução.',
    conceitosSolid: ['Padrão GoF Decorator', 'OCP (Aberto/Fechado)', 'Composição sobre Herança']
  },
  {
    id: 'diag-piramide-testes',
    titulo: 'Pirâmide de Testes — Estratégia de Qualidade',
    nivel: 'Garantia de Qualidade & Testes',
    arquivo: '/images/piramide-testes.svg',
    descricao: 'Pirâmide de testes adotada pelo projeto em três níveis: 47 testes de unidade rápidos com xUnit e Moq (base), 14 testes de integração com EF Core e PostgreSQL dedicado (meio), e 6 cenários de testes de sistema automatizados com Playwright cobrindo o fluxo ponta a ponta no totem e app.',
    conceitosSolid: ['Testes de Sistema com Playwright', 'Testes de Integração com EF Core', 'Mocks Dinâmicos via Moq']
  },
  {
    id: 'diag-fluxo-git',
    titulo: 'Gestão de Configuração — Fluxo Git e CI/CD',
    nivel: 'SCM & Rastreabilidade',
    arquivo: '/images/fluxo-git-repositorio.svg',
    descricao: 'Rastreabilidade demonstrada no repositório GitHub através do histórico real de branches e Pull Requests revisados integrados à branch main, com pipeline automatizado via GitHub Actions executando build, migrations e suíte de testes.',
    conceitosSolid: ['Pipeline GitHub Actions', 'Baseline de Configuração', 'Revisão por Pares em PRs']
  },
  {
    id: 'diag-iso-25010',
    titulo: 'ISO/IEC 25010 — Características de Qualidade',
    nivel: 'Engenharia de Requisitos',
    arquivo: '/images/01_2_iso-25010-topics-EN.drawio.png',
    descricao: 'As 8 características de qualidade de software segundo a norma ISO/IEC 25010 aplicadas aos requisitos do Sistema Unespão (Usabilidade, Segurança, Confiabilidade de Estoque e Relevância de Sugestões).',
    conceitosSolid: ['Requisitos Não Funcionais', 'Critérios de Aceitação', 'ISO 25010']
  },
  {
    id: 'diag-tela-escolha-base',
    titulo: 'Tela de Escolha da Base com Resumo em Tempo Real',
    nivel: 'Projeto de Interface do Usuário',
    arquivo: '/images/tela-escolha-base-resumo.svg',
    descricao: 'Passo 1 do fluxo do Cliente (escolha da base do lanche), com o painel de resumo em tempo real ao lado: o preço do item é recalculado a cada seleção.',
    conceitosSolid: ['Atualização Incremental de Preço', 'Fluxo de Interação do Cliente']
  },
  {
    id: 'diag-atividade-fluxo-cliente',
    titulo: 'Diagrama de Atividade — Fluxo Principal do Cliente',
    nivel: 'Projeto de Interface do Usuário',
    arquivo: '/images/atividade-fluxo-cliente.svg',
    descricao: 'As etapas do fluxo do Cliente, da identificação no canal até a geração de sugestões personalizadas em pedidos futuros.',
    conceitosSolid: ['Fluxo de Interação do Cliente']
  },
  {
    id: 'diag-atividade-autenticacao-totem',
    titulo: 'Diagrama de Atividade — Identificação no Totem Físico',
    nivel: 'Projeto de Interface do Usuário',
    arquivo: '/images/atividade-autenticacao-totem.svg',
    descricao: 'As duas rotas de identificação no totem: QR code vinculado à sessão do app, ou pedido anônimo com vínculo posterior à conta.',
    conceitosSolid: ['Decisão de Projeto: Autenticação no Totem']
  }
];
