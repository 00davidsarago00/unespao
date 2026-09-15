// Fonte de conteúdo da Apresentação Guiada — motor único e linear (28 passos,
// ~20-25 minutos): por capítulo, Teoria (com um ou mais elementos visuais
// reais embutidos: diagrama, código ou ilustração) → Prática no Cliente
// (destaque no app real) → Prática no Atendente (destaque no app real) →
// próximo capítulo. Capítulos mais densos (Arquitetura, Componentes,
// Interface, Testes) ganham um ou mais slides extras de teoria, sem
// adicionar novas fases de prática.
//
// Toda afirmação técnica aqui precisa ser rastreável a docs/*.md, ao
// Sistema-Unespao-ESII.pdf, ou ao código-fonte real do app (src/). Ver
// AUDITORIA-TOUR-GUIADO.md para o histórico de correções de fidelidade que
// motivou esse cuidado.

export type TeoriaVisual =
  | { tipo: 'diagrama'; diagramaId: string; regiao?: { x: number; y: number; w: number; h: number } }
  | { tipo: 'codigo'; linguagem: 'csharp' | 'typescript'; codigo: string; linhasDestaque?: [number, number] }
  | { tipo: 'codigo-duplo'; blocos: [CodigoBloco, CodigoBloco] }
  | { tipo: 'recap' }
  | { tipo: 'ilustracao' };

export interface CodigoBloco {
  titulo: string;
  linguagem: 'csharp' | 'typescript';
  codigo: string;
  linhasDestaque?: [number, number];
  descricao: string;
}

export interface TourStep {
  id: number;
  capitulo: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = abertura/encerramento
  fase: 'teoria' | 'cliente' | 'atendente';
  titulo: string;
  badge: string;
  fonte: string;
  // Passos de teoria:
  resumo?: string;
  conteudo?: string[];
  chips?: string[];
  visual?: TeoriaVisual;
  // Passos de prática (cliente/atendente):
  targetId?: string;
  focoLabel?: string;
  /** Passo de prática deliberadamente sem destaque — app livre desde o início. */
  semDestaque?: boolean;
}

const PEDIDO_SERVICE_CTOR = `public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _pedidoRepository;
    private readonly IEstoqueService _estoqueService;
    private readonly IGatewayPagamentoAdapter _gatewayPagamento;

    public PedidoService(
        IPedidoRepository pedidoRepository,
        IEstoqueService estoqueService,
        IGatewayPagamentoAdapter gatewayPagamento)
    {
        _pedidoRepository = pedidoRepository;
        _estoqueService = estoqueService;
        _gatewayPagamento = gatewayPagamento;
    }

    // ConfirmarPedido, AdicionarItem, RemoverItem, etc.
}`;

const MOQ_TEST_PEDIDO = `public class PedidoServiceComMockTests
{
    private readonly Mock<IPedidoRepository> _repositorioMock;
    private readonly Mock<IEstoqueService> _estoqueMock;
    private readonly Mock<IGatewayPagamentoAdapter> _gatewayMock;
    private readonly PedidoService _service;

    public PedidoServiceComMockTests()
    {
        _repositorioMock = new Mock<IPedidoRepository>();
        _estoqueMock = new Mock<IEstoqueService>();
        _gatewayMock = new Mock<IGatewayPagamentoAdapter>();
        _service = new PedidoService(_repositorioMock.Object, _estoqueMock.Object, _gatewayMock.Object);
    }

    [Fact]
    public void FinalizarPedido_PagamentoAprovado_AtualizaStatusParaConfirmado()
    {
        var pedido = new Pedido { Id = 1, Status = StatusPedido.Aberto, ValorTotal = 35.90m };
        _repositorioMock.Setup(r => r.GetById(1)).Returns(pedido);
        _estoqueMock.Setup(e => e.HaSaldoSuficiente(pedido)).Returns(true);
        _gatewayMock.Setup(g => g.Cobrar(It.IsAny<string>(), pedido.ValorTotal)).Returns(true);

        var resultado = _service.FinalizarPedido(1);

        Assert.Equal(StatusPedido.Confirmado, resultado.Status);
        _repositorioMock.Verify(r => r.Update(It.Is<Pedido>(p => p.Status == StatusPedido.Confirmado)), Times.Once);
    }
}`;

// Implementação em código das classes mostradas na Figura 5 (Adapter) — nomes de
// interface, classe e assinatura de método idênticos aos do diagrama UML real.
const ADAPTER_PAGAMENTO_CODE = `public interface IGatewayPagamentoAdapter
{
    Task<ResultadoPagamento> ProcessarPagamento(Pedido pedido);
}

public class GatewayPagamentoAdapter : IGatewayPagamentoAdapter
{
    private readonly GatewaySdkExterno _sdk;

    public GatewayPagamentoAdapter(GatewaySdkExterno sdk)
    {
        _sdk = sdk;
    }

    public async Task<ResultadoPagamento> ProcessarPagamento(Pedido pedido)
    {
        var resposta = await _sdk.Charge(pedido.ValorTotal, pedido.ClienteId);
        return new ResultadoPagamento(resposta.Status == "approved");
    }
}`;

// Implementação em código das classes mostradas na Figura 6 (Decorator) — mesma
// interface, componente concreto e decorador abstrato do diagrama UML real.
const DECORATOR_PERSONALIZACAO_CODE = `public interface IItemPersonalizavel
{
    string GetDescricao();
    decimal GetPreco();
}

public class ProdutoBase : IItemPersonalizavel
{
    private readonly string _nome;
    private readonly decimal _preco;

    public ProdutoBase(string nome, decimal preco)
    {
        _nome = nome;
        _preco = preco;
    }

    public string GetDescricao() => _nome;
    public decimal GetPreco() => _preco;
}

public abstract class IngredienteDecorator : IItemPersonalizavel
{
    protected readonly IItemPersonalizavel _item;
    protected readonly Ingrediente _ingrediente;

    protected IngredienteDecorator(IItemPersonalizavel item, Ingrediente ingrediente)
    {
        _item = item;
        _ingrediente = ingrediente;
    }

    public string GetDescricao() => $"{_item.GetDescricao()} + {_ingrediente.Nome}";
    public decimal GetPreco() => _item.GetPreco() + _ingrediente.Preco;
}`;

export const TOUR_STEPS: TourStep[] = [
  // ───────────────────────────── Abertura ─────────────────────────────
  {
    id: 1,
    capitulo: 0,
    fase: 'teoria',
    titulo: 'Sistema Unespão',
    badge: 'Documento de Projeto de Software',
    fonte: 'Capa do documento de projeto final',
    resumo: 'Plataforma de pedidos personalizados, no estilo Subway/Spoleto, para a padaria Unespão.',
    conteudo: [
      'Apresentação guiada em 6 capítulos: teoria fundamentada, seguida da aplicação real no Cliente e no Atendente.',
    ],
    visual: { tipo: 'ilustracao' },
  },

  // ───────────────────────── Cap. 1 — Introdução ─────────────────────────
  {
    id: 2,
    capitulo: 1,
    fase: 'teoria',
    titulo: 'Introdução e Objetivos',
    badge: 'Minimundo & Escopo',
    fonte: 'docs/01-introducao-objetivos.md',
    resumo: 'O cliente monta um lanche a partir de um produto base e ingredientes; o sistema intermedia toda a jornada, do pedido ao pagamento.',
    conteudo: [
      'Dois atores: o Cliente, que monta e paga pedidos, e o Atendente/Administrador, que mantém catálogo e estoque.',
      'Loja única — não uma rede. Fora do escopo: entrega, financeiro e RH.',
    ],
    chips: ['Confiabilidade de Estoque', 'Usabilidade', 'Segurança dos Dados'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-c4-1' },
  },
  {
    id: 3,
    capitulo: 1,
    fase: 'teoria',
    titulo: 'Objetivos de Qualidade',
    badge: 'Prioridades do Projeto',
    fonte: 'docs/01-introducao-objetivos.md',
    resumo: 'Seis objetivos de qualidade emergem diretamente do Minimundo e da finalidade declarada do sistema, cada um com prioridade Alta ou Média.',
    conteudo: [
      'Prioridade Alta: Usabilidade/experiência do cliente, Confiabilidade da informação de estoque e Segurança dos dados e transações.',
      'Também tratados: Relevância das sugestões personalizadas (Média), desempenho do totem em pico e manutenibilidade do backend.',
    ],
    chips: ['Usabilidade', 'Confiabilidade de Estoque', 'Segurança dos Dados', 'Desempenho', 'Manutenibilidade'],
    visual: { tipo: 'ilustracao' },
  },
  {
    id: 4,
    capitulo: 1,
    fase: 'cliente',
    titulo: 'Introdução e Objetivos',
    badge: 'Prática · Cliente',
    fonte: 'docs/01-introducao-objetivos.md',
    targetId: 'tour-client-catalog-header',
    focoLabel: 'Catálogo da Padaria Unespão',
  },
  {
    id: 5,
    capitulo: 1,
    fase: 'atendente',
    titulo: 'Introdução e Objetivos',
    badge: 'Prática · Atendente',
    fonte: 'docs/01-introducao-objetivos.md',
    targetId: 'tour-atendente-banner',
    focoLabel: 'Painel do Atendente/Administrador',
  },

  // ───────────────────────── Cap. 2 — Arquitetura ─────────────────────────
  {
    id: 6,
    capitulo: 2,
    fase: 'teoria',
    titulo: 'Arquitetura do Sistema',
    badge: 'Clean Architecture & C4',
    fonte: 'docs/02-arquitetura-sistema.md',
    resumo: 'Backend em camadas concêntricas: Controllers, Services, Repositories/Adapters e Domain Models — cada camada só depende da de baixo.',
    conteudo: [
      'C4 Nível 1: dois atores humanos e três sistemas externos (Google Auth, CEP, Gateway de Pagamento).',
      'SRP: EstoqueService isola a baixa de insumos. DIP: PedidoService depende só de interfaces.',
    ],
    chips: ['Modelo C4 Nível 1', 'SOLID (SRP, DIP)'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-c4-1', regiao: { x: 30, y: 28, w: 40, h: 42 } },
  },
  {
    id: 7,
    capitulo: 2,
    fase: 'teoria',
    titulo: 'Contêineres do Sistema',
    badge: 'C4 Nível 2',
    fonte: 'docs/02-arquitetura-sistema.md',
    resumo: 'Três peças tecnológicas: o Web App (SPA React) no totem e no navegador, a API Unespão (.NET 8/ASP.NET Core) e o banco PostgreSQL.',
    conteudo: [
      'Só a API acessa o banco e os sistemas externos — nunca o frontend diretamente.',
      'Um único SPA responsivo atende totem e navegador, sem duplicar código.',
    ],
    chips: ['SPA React', '.NET 8 / ASP.NET Core', 'PostgreSQL'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-c4-2', regiao: { x: 38, y: 29, w: 24, h: 20 } },
  },
  {
    id: 8,
    capitulo: 2,
    fase: 'cliente',
    titulo: 'Arquitetura do Sistema',
    badge: 'Prática · Cliente',
    fonte: 'docs/02-arquitetura-sistema.md',
    targetId: 'tour-client-catalog-grid',
    focoLabel: 'SPA React consumindo a API via HTTPS/JSON',
  },
  {
    id: 9,
    capitulo: 2,
    fase: 'atendente',
    titulo: 'Arquitetura do Sistema',
    badge: 'Prática · Atendente',
    fonte: 'docs/02-arquitetura-sistema.md',
    targetId: 'tour-atendente-base-table',
    focoLabel: 'Mesmo Domain Model consumido pelo Atendente',
  },

  // ───────────────────────── Cap. 3 — Componentes ─────────────────────────
  {
    id: 10,
    capitulo: 3,
    fase: 'teoria',
    titulo: 'Projeto de Componentes',
    badge: 'DIP & ISP na Prática',
    fonte: 'docs/03-projeto-componentes.md',
    resumo: 'Nenhum parâmetro do construtor é uma classe concreta — todas as dependências de PedidoService são interfaces, resolvidas por injeção de dependência.',
    conteudo: [
      'PedidoService orquestra pedido, estoque e pagamento sem conhecer nenhuma implementação concreta.',
    ],
    chips: ['DIP', 'ISP', 'Injeção de Dependência'],
    visual: { tipo: 'codigo', linguagem: 'csharp', codigo: PEDIDO_SERVICE_CTOR, linhasDestaque: [4, 6] },
  },
  {
    id: 11,
    capitulo: 3,
    fase: 'teoria',
    titulo: 'Princípios SOLID',
    badge: 'SOLID',
    fonte: 'docs/03-projeto-componentes.md',
    resumo: 'Os cinco princípios SOLID guiaram cada decisão de projeto: cada Service, cada interface e cada injeção de dependência tem um motivo específico de existir.',
    conteudo: [
      'SRP: PedidoService cuida só do pedido, EstoqueService só do estoque, AvaliacaoService só das avaliações.',
      'OCP + LSP: uma nova implementação de IGatewayPagamentoAdapter ou IPedidoRepository entra sem alterar quem já os consome.',
    ],
    chips: ['SRP', 'OCP', 'LSP', 'ISP', 'DIP'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-c4-3' },
  },
  {
    id: 12,
    capitulo: 3,
    fase: 'teoria',
    titulo: 'Padrão Adapter',
    badge: 'GoF Adapter',
    fonte: 'docs/03-projeto-componentes.md',
    resumo: 'GatewayPagamentoAdapter implementa IGatewayPagamentoAdapter e traduz cada gateway externo para o mesmo contrato que o PedidoService consome.',
    conteudo: [
      'Target = IGatewayPagamentoAdapter. Adapter = GatewayPagamentoAdapter. Adaptee = o SDK do gateway externo.',
      'Se o gateway externo mudar sua API, o impacto fica contido no adapter — PedidoService não muda.',
    ],
    chips: ['GoF Adapter', 'Target / Adapter / Adaptee'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-adapter-pagamento' },
  },
  {
    id: 13,
    capitulo: 3,
    fase: 'teoria',
    titulo: 'Padrão Decorator',
    badge: 'GoF Decorator',
    fonte: 'docs/03-projeto-componentes.md',
    resumo: 'Cada Ingrediente adicionado envolve o item corrente numa única classe IngredienteDecorator, parametrizada por esse ingrediente — sem gerar subclasses.',
    conteudo: [
      'Evita a explosão combinatória de subclasses: dezenas de ingredientes, uma única classe decoradora.',
      'O preço acumula a cada decorador empilhado — o mesmo mecanismo do cálculo em tempo real na tela do cliente.',
    ],
    chips: ['GoF Decorator', 'Composição sobre Herança'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-decorator-sanduiche' },
  },
  {
    id: 14,
    capitulo: 3,
    fase: 'teoria',
    titulo: 'Adapter & Decorator em Código',
    badge: 'C# · .NET 8',
    fonte: 'docs/03-projeto-componentes.md',
    resumo: 'As mesmas classes e assinaturas das Figuras 5 e 6, lado a lado: interface, componente concreto e decorador abstrato.',
    chips: ['GoF Adapter', 'GoF Decorator'],
    visual: {
      tipo: 'codigo-duplo',
      blocos: [
        {
          titulo: 'Adapter',
          linguagem: 'csharp',
          codigo: ADAPTER_PAGAMENTO_CODE,
          descricao: 'IGatewayPagamentoAdapter.ProcessarPagamento(pedido) — GatewayPagamentoAdapter traduz a chamada para o SDK externo.',
        },
        {
          titulo: 'Decorator',
          linguagem: 'csharp',
          codigo: DECORATOR_PERSONALIZACAO_CODE,
          descricao: 'IngredienteDecorator envolve um IItemPersonalizavel e acumula o preço a cada ingrediente empilhado.',
        },
      ],
    },
  },
  {
    id: 15,
    capitulo: 3,
    fase: 'cliente',
    titulo: 'Projeto de Componentes',
    badge: 'Prática · Cliente',
    fonte: 'docs/03-projeto-componentes.md',
    targetId: 'tour-client-customizer-trigger',
    focoLabel: 'Decorator ao vivo: personalização do lanche',
  },
  {
    id: 16,
    capitulo: 3,
    fase: 'atendente',
    titulo: 'Projeto de Componentes',
    badge: 'Prática · Atendente',
    fonte: 'docs/03-projeto-componentes.md',
    targetId: 'tour-atendente-ingredient-table',
    focoLabel: 'Repository: CRUD de catálogo isolado da persistência',
  },

  // ───────────────────────── Cap. 4 — Interface ─────────────────────────
  {
    id: 17,
    capitulo: 4,
    fase: 'teoria',
    titulo: 'Projeto de Interface do Usuário',
    badge: 'Fluxo do Cliente',
    fonte: 'docs/04-interface-usuario.md',
    resumo: 'A cada ingrediente adicionado ou removido, o preço é recalculado e exibido imediatamente — sem esperar a etapa de revisão.',
    conteudo: [
      'Painel do Atendente é deliberadamente mais simples: só Catálogo e Estoque.',
    ],
    chips: ['Atualização Incremental'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-tela-escolha-base', regiao: { x: 67, y: 43, w: 31, h: 15 } },
  },
  {
    id: 18,
    capitulo: 4,
    fase: 'teoria',
    titulo: 'Autenticação no Totem',
    badge: 'Decisão de Projeto',
    fonte: 'docs/04-interface-usuario.md',
    resumo: 'O totem é compartilhado por vários clientes ao longo do dia — por isso a autenticação segue duas rotas, nunca OAuth completo digitado num teclado público.',
    conteudo: [
      'QR code: o cliente usa a sessão já autenticada no próprio celular; nenhuma credencial é digitada no totem.',
      'Pedido anônimo: monta e paga sem identificação, com vínculo à conta possível depois.',
    ],
    chips: ['QR Code', 'Pedido Anônimo'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-atividade-autenticacao-totem', regiao: { x: 14, y: 25, w: 15, h: 13 } },
  },
  {
    id: 19,
    capitulo: 4,
    fase: 'cliente',
    titulo: 'Projeto de Interface do Usuário',
    badge: 'Prática · Cliente',
    fonte: 'docs/04-interface-usuario.md',
    targetId: 'tour-client-cart-button',
    focoLabel: 'Revisão do pedido antes do pagamento',
  },
  {
    id: 20,
    capitulo: 4,
    fase: 'atendente',
    titulo: 'Projeto de Interface do Usuário',
    badge: 'Prática · Atendente',
    fonte: 'docs/04-interface-usuario.md',
    targetId: 'tour-atendente-subtabs',
    focoLabel: 'Duas telas: Catálogo & Estoque',
  },

  // ───────────────────────── Cap. 5 — Testes ─────────────────────────
  {
    id: 21,
    capitulo: 5,
    fase: 'teoria',
    titulo: 'Especificação e Estratégia de Testes',
    badge: 'Pirâmide de Testes',
    fonte: 'docs/05-testes.md',
    resumo: '47 testes de unidade, 14 de integração e 6 cenários de sistema — critério de conclusão qualitativo por prioridade, sem meta numérica única.',
    conteudo: [
      'Cobertura (Coverlet): ~85% nos Services de prioridade Alta, ~68% no backend como um todo.',
    ],
    chips: ['xUnit', 'Moq', 'Testes de Integração'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-piramide-testes' },
  },
  {
    id: 22,
    capitulo: 5,
    fase: 'teoria',
    titulo: 'Teste de Unidade com Moq',
    badge: 'Código Real · C#',
    fonte: 'docs/05-testes.md',
    resumo: 'Moq cria o dublê diretamente a partir da interface, isolando o PedidoService de rede, credenciais e disponibilidade de serviço externo.',
    conteudo: [
      'Padrão AAA: Arrange (setup dos mocks), Act (FinalizarPedido), Assert (status e chamada ao repositório).',
    ],
    chips: ['xUnit', 'Moq', 'Arrange-Act-Assert'],
    visual: { tipo: 'codigo', linguagem: 'csharp', codigo: MOQ_TEST_PEDIDO, linhasDestaque: [26, 27] },
  },
  {
    id: 23,
    capitulo: 5,
    fase: 'cliente',
    titulo: 'Especificação e Estratégia de Testes',
    badge: 'Prática · Cliente',
    fonte: 'docs/05-testes.md',
    targetId: 'tour-client-cart-button',
    focoLabel: 'Preço e confirmação: cobertos por teste real',
  },
  {
    id: 24,
    capitulo: 5,
    fase: 'atendente',
    titulo: 'Especificação e Estratégia de Testes',
    badge: 'Prática · Atendente',
    fonte: 'docs/05-testes.md',
    targetId: 'tour-atendente-lowstock-filter',
    focoLabel: 'EstoqueService: casos de borda testados',
  },

  // ───────────────────────── Cap. 6 — Gestão de Configuração ─────────────────────────
  {
    id: 25,
    capitulo: 6,
    fase: 'teoria',
    titulo: 'Gestão de Configuração e Manutenção',
    badge: 'Rastreabilidade Real',
    fonte: 'docs/06-gestao-configuracao.md',
    resumo: 'A rastreabilidade liga um requisito (Issue) ao Pull Request que o implementa e aos testes que o cobrem — observável no histórico real deste repositório.',
    conteudo: [
      'Pull Requests #1 e #2 já mesclados na branch main, cada um vindo de uma branch de feature revisada.',
      'CI em GitHub Actions: só mescla depois que build e testes passam.',
    ],
    chips: ['Item de Configuração', 'Pull Requests', 'CI/CD'],
    visual: { tipo: 'diagrama', diagramaId: 'diag-fluxo-git' },
  },
  {
    id: 26,
    capitulo: 6,
    fase: 'cliente',
    titulo: 'Gestão de Configuração e Manutenção',
    badge: 'Prática · Cliente',
    fonte: 'docs/06-gestao-configuracao.md',
    targetId: 'tour-client-tabs-selector',
    focoLabel: 'Cada tela é um Item de Configuração rastreável',
  },
  {
    id: 27,
    capitulo: 6,
    fase: 'atendente',
    titulo: 'Gestão de Configuração e Manutenção',
    badge: 'Prática · Atendente',
    fonte: 'docs/06-gestao-configuracao.md',
    targetId: 'tour-atendente-footer-meta',
    focoLabel: 'Painel sincronizado com o capítulo de Interface',
  },

  // ───────────────────────────── Encerramento ─────────────────────────────
  {
    id: 28,
    capitulo: 0,
    fase: 'teoria',
    titulo: 'Recapitulação',
    badge: 'Encerramento',
    fonte: 'Síntese dos 6 capítulos',
    resumo: 'Seis capítulos, da fundamentação teórica à prática real no Cliente e no Atendente.',
    conteudo: ['Perguntas da banca.'],
    visual: { tipo: 'recap' },
  },
];
