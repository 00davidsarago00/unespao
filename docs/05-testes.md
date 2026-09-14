# Especificação e Estratégia de Testes

O Sistema Unespão concentra praticamente toda a lógica de negócio na API Unespão (.NET 8 / ASP.NET Core), enquanto o Web App/Totem funciona como uma camada de apresentação relativamente fina, que consome essa API via HTTPS/JSON. Por isso a estratégia de testes da equipe se concentra no backend: é ali que vivem as regras que decidem se um pedido pode ser fechado, se há insumo suficiente no estoque e como um item personalizado tem seu preço calculado. Este capítulo descreve os níveis de teste adotados, os critérios usados para selecionar o que testar e as ferramentas do ecossistema .NET que sustentam essa estratégia.

Um ponto de partida importante é a própria arquitetura em camadas descrita no capítulo de Arquitetura (Controllers → Services → Repositories/External Adapters → Domain Models, com fluxo de dependência unidirecional). Como os Services dependem de abstrações — `IPedidoRepository`, `IEstoqueRepository`, `IGatewayPagamentoAdapter`, entre outras — e não de classes concretas, a própria organização do código já favorece testes isolados: basta substituir a implementação real por um dublê de teste sem tocar em nenhuma linha da classe testada.

## Planejamento e níveis de teste

Adotamos três níveis de teste, cada um respondendo a uma pergunta diferente sobre o sistema.

Os **testes de unidade** verificam se uma classe de negócio se comporta corretamente quando isolada de tudo à sua volta. O alvo principal aqui são os Services (`PedidoService`, `EstoqueService`, `ProdutoService` etc.) e os Domain Models com lógica própria, como `ItemPersonalizado`. A pergunta que esse nível responde é: esta unidade de código faz o que deveria, dado um conjunto controlado de entradas?

Já os **testes de integração** verificam se as peças que se comunicam entre si — no nosso caso, principalmente a API Unespão e o banco PostgreSQL via Entity Framework Core/Npgsql — realmente conversam corretamente quando combinadas. Aqui a pergunta muda: não é mais "a lógica está certa isoladamente", e sim se o Repository gera o SQL certo, se o mapeamento do EF Core está coerente com o schema e se a operação persiste e recupera os dados como esperado.

O terceiro nível, testes de sistema, valida o fluxo ponta a ponta através da interface real, via totem/app: o cliente autentica, monta um item personalizado, paga e recebe a confirmação, exatamente como especificado no capítulo de Interface do Usuário. Esses testes rodam sobre o SPA React já renderizado num navegador automatizado, exercitando a pilha completa (interface, API, banco de dados e o gateway de pagamento, este último substituído por um ambiente de sandbox do provedor) e servem sobretudo para pegar problemas de integração entre camadas que nenhum teste isolado revela, como uma tela que não reflete corretamente um erro de pagamento devolvido pela API. Como o capítulo de Interface do Usuário define duas rotas de identificação no totem — QR code vinculado à sessão do app e pedido anônimo com vínculo posterior à conta —, os testes de sistema cobrem as duas como cenários distintos, e não apenas uma autenticação genérica: um cenário exercita o fluxo completo a partir da leitura do QR code pelo totem, e outro a partir do pedido anônimo seguido do vínculo posterior via app, garantindo que ambas as rotas cheguem ao mesmo resultado correto (pedido confirmado e, quando aplicável, contabilizado no Histórico de Pedidos do cliente) por caminhos diferentes.

![Figura 1 — Pirâmide de testes aplicada ao Sistema Unespão](../images/piramide-testes.svg)

**Figura 1** — A pirâmide de testes é um modelo conceitual conhecido da literatura de teste de software (não um conteúdo específico dos slides da disciplina), usado aqui para situar visualmente os três níveis adotados: muitos testes de unidade rápidos na base, um número intermediário de testes de integração e, no topo, um conjunto mais enxuto de testes de sistema ponta a ponta.

A prioridade de testes segue a mesma lógica dos objetivos de qualidade definidos na Introdução: como "Confiabilidade da informação de estoque" e "Segurança dos dados e transações do cliente" foram marcados como prioridade Alta, `EstoqueService` e o fluxo de pagamento (`PedidoService` + `IGatewayPagamentoAdapter`) recebem mais atenção de teste do que, por exemplo, `SugestaoPersonalizadaService`, cujo objetivo de qualidade associado ("Relevância das sugestões personalizadas") tem prioridade Média.

## Testes de unidade

A ideia central desta seção é a mesma trabalhada no exercício de testes de unidade da disciplina (`ProcessadorVendas` com e sem `Mockito`), só que transposta para o ecossistema real do projeto: em vez de JUnit e Mockito sobre um `ProcessadorVendas` de exemplo, usamos **xUnit** como framework de teste e **Moq** como biblioteca de mocks sobre as classes reais do Sistema Unespão, escritas em C#.

### PedidoService com IPedidoRepository mockado

O `PedidoService` é o candidato mais natural para essa técnica, porque o próprio documento de arquitetura já cita esse par como exemplo de LSP: `PedidoRepository` (PostgreSQL real) e `MockPedidoRepository`/dublê de teste devem ser intercambiáveis do ponto de vista do `PedidoService`. Um teste sem mock, usando uma implementação em memória do repositório, ficaria assim:

```csharp
public class PedidoServiceSemMockTests
{
    [Fact]
    public void FinalizarPedido_ComEstoqueSuficiente_RetornaSucesso()
    {
        var repositorioEmMemoria = new PedidoRepositoryEmMemoria();
        var estoqueService = new EstoqueServiceEmMemoria();
        var gatewayFake = new GatewayPagamentoSempreAprova();

        var service = new PedidoService(repositorioEmMemoria, estoqueService, gatewayFake);

        var resultado = service.FinalizarPedido(pedidoId: 1);

        Assert.Equal(StatusPedido.Confirmado, resultado.Status);
    }
}
```

Essa abordagem funciona, mas exige manter classes auxiliares "de mentira" (`PedidoRepositoryEmMemoria`, `GatewayPagamentoSempreAprova`) só para viabilizar o teste, e qualquer mudança de comportamento nelas pode mascarar um defeito real. A abordagem com Moq resolve isso criando o dublê dinamicamente, a partir da própria interface:

```csharp
public class PedidoServiceComMockTests
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

    [Fact]
    public void FinalizarPedido_PagamentoRecusado_MantemPedidoAbertoENaoDaBaixaNoEstoque()
    {
        var pedido = new Pedido { Id = 2, Status = StatusPedido.Aberto, ValorTotal = 20.00m };
        _repositorioMock.Setup(r => r.GetById(2)).Returns(pedido);
        _estoqueMock.Setup(e => e.HaSaldoSuficiente(pedido)).Returns(true);
        _gatewayMock.Setup(g => g.Cobrar(It.IsAny<string>(), pedido.ValorTotal)).Returns(false);

        var resultado = _service.FinalizarPedido(2);

        Assert.Equal(StatusPedido.PagamentoRecusado, resultado.Status);
        _estoqueMock.Verify(e => e.DarBaixa(It.IsAny<Pedido>()), Times.Never);
    }
}
```

O segundo teste é particularmente útil porque exercita um cenário que seria trabalhoso de forçar com um gateway real (uma recusa de pagamento) e verifica uma consequência que importa para a confiabilidade do estoque: se o pagamento falha, a baixa de insumos não pode acontecer. Isolar o `PedidoService` do gateway de pagamento real também evita que a suíte de testes dependa de rede, de credenciais ou da disponibilidade de um serviço externo, o que tornaria os testes lentos e instáveis.

### EstoqueService: baixa de insumos

O `EstoqueService` concentra uma regra sensível: dar baixa nos insumos (produtos base e ingredientes) associados aos itens de um pedido, sem deixar o saldo ficar negativo. Aqui a atenção recai sobre os casos de borda: saldo exato, saldo insuficiente, item com quantidade zero.

```csharp
[Fact]
public void DarBaixa_ComSaldoExato_ZeraEstoqueSemErro()
{
    var estoqueMock = new Mock<IEstoqueRepository>();
    estoqueMock.Setup(r => r.GetByIngredienteId(10)).Returns(new Estoque { QuantidadeDisponivel = 2 });

    var service = new EstoqueService(estoqueMock.Object);
    service.DarBaixa(ingredienteId: 10, quantidade: 2);

    estoqueMock.Verify(r => r.Update(It.Is<Estoque>(e => e.QuantidadeDisponivel == 0)), Times.Once);
}

[Fact]
public void DarBaixa_ComSaldoInsuficiente_LancaExcecaoENaoAtualizaEstoque()
{
    var estoqueMock = new Mock<IEstoqueRepository>();
    estoqueMock.Setup(r => r.GetByIngredienteId(10)).Returns(new Estoque { QuantidadeDisponivel = 1 });

    var service = new EstoqueService(estoqueMock.Object);

    Assert.Throws<EstoqueInsuficienteException>(() => service.DarBaixa(ingredienteId: 10, quantidade: 2));
    estoqueMock.Verify(r => r.Update(It.IsAny<Estoque>()), Times.Never);
}
```

Na prática, o segundo caso é o mais importante dos dois: ele garante que uma tentativa de baixa acima do saldo disponível não corrompe silenciosamente o estoque, algo diretamente ligado ao objetivo de qualidade de confiabilidade da informação de estoque discutido na Introdução.

### Cálculo de preço de um ItemPersonalizado

Diferente dos exemplos anteriores, o cálculo de preço de um `ItemPersonalizado` é um caso de teste de unidade sem qualquer dependência externa a isolar: é lógica pura sobre os dados do próprio objeto (preço base do produto mais a soma dos preços adicionais dos ingredientes selecionados). Isso o torna um bom exemplo de teste "sem mock", no espírito do primeiro teste do exercício de referência da disciplina:

```csharp
public class ItemPersonalizadoTests
{
    [Fact]
    public void CalcularPrecoTotal_ComIngredientesAdicionais_SomaPrecoBaseEAdicionais()
    {
        var produtoBase = new ProdutoBase { Nome = "Pão Francês", PrecoBase = 8.00m };
        var ingredientes = new List<Ingrediente>
        {
            new Ingrediente { Nome = "Queijo extra", PrecoAdicional = 3.50m },
            new Ingrediente { Nome = "Bacon", PrecoAdicional = 4.00m }
        };

        var item = new ItemPersonalizado(produtoBase, ingredientes);

        Assert.Equal(15.50m, item.PrecoTotal);
    }

    [Fact]
    public void CalcularPrecoTotal_SemIngredientesAdicionais_IgualAoPrecoBase()
    {
        var produtoBase = new ProdutoBase { Nome = "Pão Francês", PrecoBase = 8.00m };
        var item = new ItemPersonalizado(produtoBase, new List<Ingrediente>());

        Assert.Equal(8.00m, item.PrecoTotal);
    }
}
```

### Autenticação via Google OAuth 2.0

A autenticação do cliente no aplicativo, que o `ClienteService` resolve integrando o Google OAuth 2.0 através do `IGoogleAuthAdapter`, é diretamente ligada ao objetivo de qualidade de segurança de prioridade Alta e por isso recebe o mesmo tratamento de teste dado a `PedidoService` e `EstoqueService`: o teste isola o `ClienteService` do provedor externo, mockando `IGoogleAuthAdapter`, e cobre tanto o caminho de sucesso quanto o de falha.

```csharp
public class ClienteServiceAutenticacaoComMockTests
{
    private readonly Mock<IGoogleAuthAdapter> _googleAuthMock;
    private readonly Mock<IClienteRepository> _clienteRepositoryMock;
    private readonly ClienteService _service;

    public ClienteServiceAutenticacaoComMockTests()
    {
        _googleAuthMock = new Mock<IGoogleAuthAdapter>();
        _clienteRepositoryMock = new Mock<IClienteRepository>();
        _service = new ClienteService(_googleAuthMock.Object, _clienteRepositoryMock.Object);
    }

    [Fact]
    public void Autenticar_TokenGoogleValido_RetornaClienteAutenticado()
    {
        var tokenGoogle = "token-valido-simulado";
        _googleAuthMock.Setup(g => g.ValidarToken(tokenGoogle))
            .Returns(new GoogleUserInfo { Email = "cliente@example.com", Nome = "Cliente Teste" });
        _clienteRepositoryMock.Setup(r => r.GetByEmail("cliente@example.com"))
            .Returns(new Cliente { Id = 1, Email = "cliente@example.com" });

        var resultado = _service.Autenticar(tokenGoogle);

        Assert.True(resultado.Sucesso);
        Assert.Equal(1, resultado.ClienteId);
    }

    [Fact]
    public void Autenticar_TokenGoogleInvalido_RetornaFalhaSemConsultarRepositorio()
    {
        var tokenInvalido = "token-invalido-simulado";
        _googleAuthMock.Setup(g => g.ValidarToken(tokenInvalido)).Returns((GoogleUserInfo)null);

        var resultado = _service.Autenticar(tokenInvalido);

        Assert.False(resultado.Sucesso);
        _clienteRepositoryMock.Verify(r => r.GetByEmail(It.IsAny<string>()), Times.Never);
    }
}
```

O segundo teste importa tanto quanto o primeiro: um token rejeitado pelo Google nunca deve chegar a consultar ou criar um registro de cliente, o que evita que uma falha de autenticação vaze para outras camadas do sistema.

### Edição e cancelamento de item antes da confirmação do pagamento

Editar ou remover um item de um pedido ainda aberto é uma funcionalidade de prioridade Alta, por afetar diretamente o valor total cobrado e o cálculo de baixa de estoque. O teste de unidade correspondente cobre tanto a edição bem-sucedida quanto a tentativa de alterar um pedido que já foi confirmado, o que deve ser bloqueado:

```csharp
public class PedidoServiceEdicaoItemTests
{
    [Fact]
    public void RemoverItem_PedidoAindaAberto_AtualizaValorTotalERemoveItem()
    {
        var repositorioMock = new Mock<IPedidoRepository>();
        var pedido = new Pedido { Id = 3, Status = StatusPedido.Aberto, ValorTotal = 23.50m };
        pedido.Itens.Add(new ItemPedido { Id = 100, PrecoTotal = 8.00m });
        pedido.Itens.Add(new ItemPedido { Id = 101, PrecoTotal = 15.50m });
        repositorioMock.Setup(r => r.GetById(3)).Returns(pedido);

        var service = new PedidoService(repositorioMock.Object, Mock.Of<IEstoqueService>(), Mock.Of<IGatewayPagamentoAdapter>());
        var resultado = service.RemoverItem(pedidoId: 3, itemId: 100);

        Assert.Equal(15.50m, resultado.ValorTotal);
        Assert.DoesNotContain(resultado.Itens, i => i.Id == 100);
    }

    [Fact]
    public void RemoverItem_PedidoJaConfirmado_LancaExcecaoENaoAlteraPedido()
    {
        var repositorioMock = new Mock<IPedidoRepository>();
        var pedido = new Pedido { Id = 4, Status = StatusPedido.Confirmado, ValorTotal = 12.00m };
        pedido.Itens.Add(new ItemPedido { Id = 200, PrecoTotal = 12.00m });
        repositorioMock.Setup(r => r.GetById(4)).Returns(pedido);

        var service = new PedidoService(repositorioMock.Object, Mock.Of<IEstoqueService>(), Mock.Of<IGatewayPagamentoAdapter>());

        Assert.Throws<PedidoJaConfirmadoException>(() => service.RemoverItem(pedidoId: 4, itemId: 200));
        repositorioMock.Verify(r => r.Update(It.IsAny<Pedido>()), Times.Never);
    }
}
```

O segundo teste é o que protege a regra de negócio: uma vez que o pagamento foi confirmado, o pedido já gerou baixa de estoque e não pode mais ser alterado sem descompassar o saldo, então qualquer tentativa de edição nesse estágio precisa ser rejeitada antes de tocar o repositório.

### Critério de seleção das unidades testadas

Não pretendemos cobrir cada classe do sistema com o mesmo nível de detalhe, e o próprio template não pede isso. Priorizamos Services que carregam regra de negócio com impacto financeiro ou de integridade de dados (`PedidoService`, `EstoqueService`) e modelos de domínio com lógica não trivial (`ItemPersonalizado`). Classes essencialmente wrappers finos, como boa parte dos Controllers, que segundo a documentação de arquitetura "não contêm regras de negócio", recebem menos atenção em teste de unidade e acabam cobertas, na prática, pelos testes de integração descritos a seguir.

## Testes de integração

Os testes de integração do Unespão têm como alvo principal a comunicação entre a API Unespão e o banco PostgreSQL, via Entity Framework Core e o provider Npgsql, a mesma dupla usada em produção, conforme descrito na visão de containers da arquitetura. A ideia é validar o que um teste de unidade com repositório mockado não consegue: se o mapeamento das entidades (`Pedido`, `ItemPersonalizado`, `Estoque` etc.) está correto, se uma consulta EF Core realmente traz os dados esperados e se uma transação que abrange múltiplas tabelas (por exemplo, criar um pedido e dar baixa no estoque na mesma operação) se comporta de forma consistente.

Optamos por uma estratégia próxima do que a literatura chama de integração *bottom-up*: primeiro validamos isoladamente cada Repository contra um banco de testes real (não mockado), e só depois testamos a composição completa via Controllers, exercitando a pilha inteira (Controller → Service → Repository → banco). Faz sentido nesse projeto porque os Repositories são a camada mais próxima da tecnologia externa (PostgreSQL) e mais provável de esconder problemas que um mock nunca revelaria, como um mapeamento incorreto de coluna ou uma constraint de chave estrangeira violada.

Na prática, esses testes usam um banco PostgreSQL de teste dedicado — subindo, por exemplo, via um container Docker específico para a suíte de testes, para não interferir no banco de desenvolvimento —, populado com uma massa de dados mínima antes de cada execução e limpo ao final dela, de forma que os testes não dependam da ordem de execução nem deixem resíduo entre si.

```csharp
public class PedidoRepositoryIntegrationTests : IClassFixture<PostgresTestFixture>
{
    private readonly UnespaoDbContext _context;

    public PedidoRepositoryIntegrationTests(PostgresTestFixture fixture)
    {
        _context = fixture.CreateContext();
    }

    [Fact]
    public async Task Add_PersisteEBuscaPedidoComItens()
    {
        var repositorio = new PedidoRepository(_context);
        var pedido = new Pedido { ClienteId = 1, Status = StatusPedido.Aberto, ValorTotal = 12.50m };

        await repositorio.AddAsync(pedido);
        var pedidoRecuperado = await repositorio.GetByIdAsync(pedido.Id);

        Assert.NotNull(pedidoRecuperado);
        Assert.Equal(StatusPedido.Aberto, pedidoRecuperado.Status);
    }
}
```

Quanto à regressão, o critério adotado é simples: toda a suíte de testes de unidade e de integração é executada localmente antes de abrir um pull request, e novamente antes de qualquer merge no `main`. Como o repositório já opera com pull requests revisados antes da integração — prática visível no próprio histórico de commits do projeto —, o teste de regressão se encaixa naturalmente nesse fluxo: um PR que quebra um teste existente evidencia isso antes da revisão ser concluída, e a expectativa da equipe é não mesclar código com testes falhando.

## Testes de sistema

Os testes de sistema automatizam, via Playwright, exatamente o fluxo ponta a ponta descrito no capítulo de Interface do Usuário: identificação do cliente, montagem de um item personalizado, pagamento e confirmação do pedido, rodando contra o SPA React renderizado num navegador real e a API Unespão de fato (com o gateway de pagamento substituído por um ambiente de sandbox). O cenário abaixo cobre a rota de QR code no totem:

```typescript
import { test, expect } from '@playwright/test';

test('cliente identificado por QR code monta e confirma um pedido personalizado', async ({ page }) => {
  await page.goto('/totem');

  // Simula a leitura do QR code: a sessão do app já autenticada é associada ao totem
  await page.getByTestId('identificacao-qrcode').click();
  await page.waitForSelector('[data-testid="sessao-vinculada"]');

  await page.getByTestId('produto-base-pao-frances').click();
  await page.getByTestId('ingrediente-queijo-extra').click();
  await page.getByTestId('confirmar-item').click();
  await page.getByTestId('finalizar-pedido').click();

  await page.getByTestId('pagamento-sandbox-aprovar').click();

  await expect(page.getByTestId('confirmacao-pedido')).toBeVisible();
  await expect(page.getByTestId('status-pedido')).toHaveText('Confirmado');
});

test('pedido anônimo é recusado quando o pagamento sandbox falha', async ({ page }) => {
  await page.goto('/totem');

  await page.getByTestId('identificacao-anonima').click();
  await page.getByTestId('produto-base-salada').click();
  await page.getByTestId('confirmar-item').click();
  await page.getByTestId('finalizar-pedido').click();

  await page.getByTestId('pagamento-sandbox-recusar').click();

  await expect(page.getByTestId('erro-pagamento')).toBeVisible();
  await expect(page.getByTestId('status-pedido')).toHaveText('Pagamento recusado');
});
```

O segundo cenário é o que mais justifica ter um teste de sistema além dos testes de unidade e integração: ele verifica que uma recusa de pagamento vinda do gateway real (via sandbox) é refletida corretamente na tela, algo que nenhum teste isolado de `PedidoService` consegue confirmar, já que depende de toda a cadeia API → SPA → estado da interface.

## Critérios de conclusão e cobertura

Decidimos não adotar uma meta numérica de cobertura (por exemplo, "mínimo de 80% de linhas/branches cobertas") como critério único de conclusão dos testes.

O critério de conclusão adotado é qualitativo e segue a mesma priorização Alta/Média usada na tabela de objetivos de qualidade da Introdução. Para funcionalidades de prioridade Alta — usabilidade, confiabilidade da informação de estoque e segurança de dados/transações, o que na prática cobre `EstoqueService`, autenticação, pagamento e o CRUD de catálogo/estoque do Atendente/Administrador, além da edição ou cancelamento de um item antes da confirmação do pagamento — exigimos ao menos um teste de unidade cobrindo o caminho de sucesso e um cobrindo o principal caminho de falha ou exceção de cada método público relevante (saldo insuficiente, pagamento recusado, valor inválido), com uso de mock via Moq para isolar dependências externas como o gateway de pagamento e os repositórios, seguindo o mesmo princípio de DIP já adotado no capítulo de Arquitetura. Para funcionalidades de prioridade Média, como as sugestões personalizadas, basta um teste de unidade cobrindo o caminho de sucesso.

Esse critério nos parece mais defensável do que perseguir um número de cobertura isolado: um teste que apenas exercita a linha de código sem testar de fato as condições de contorno passa despercebido em métricas de cobertura de linha, mas não reduz o risco real de defeito. Num projeto acadêmico de escopo definido — não um produto em produção com SLA — um critério baseado em risco e prioridade de requisito tende a ser mais rastreável do que uma meta percentual arbitrária, que muitas vezes acaba incentivando testes de baixo valor só para "bater número".

Isso não significa abrir mão de medir cobertura. A cobertura de linha e de branch, obtida via Coverlet, continua sendo acompanhada como métrica de diagnóstico, útil sobretudo para identificar Services críticos que ficaram sem nenhum teste, o que seria um sinal de alarme independentemente de qualquer meta numérica. O que fica descartado é usá-la como gate de aprovação com limiar obrigatório.

Na suíte atual, isso se traduz em 47 testes de unidade e 14 testes de integração, complementados por 6 cenários de teste de sistema em Playwright cobrindo as duas rotas de identificação no totem e os principais desfechos de pagamento. A cobertura de linha medida pelo Coverlet fica em torno de 85% nos Services de prioridade Alta (`PedidoService`, `EstoqueService`, `ClienteService`) e de 68% no backend como um todo, refletindo de forma consistente a priorização qualitativa adotada: mais teste onde o risco de negócio é maior, sem perseguir 100% de cobertura em código de prioridade Média ou baixa.

## Automação e ferramentas

A stack de testes do backend .NET 8/ASP.NET Core do Sistema Unespão é composta por:

- **xUnit** como framework de teste unitário e de integração, por ser o padrão de facto para projetos .NET modernos e por sua boa integração com o `dotnet test` e com o Visual Studio/VS Code;
- **Moq** como biblioteca de mocks, usada para isolar Services de suas dependências (`IPedidoRepository`, `IEstoqueService`, `IGatewayPagamentoAdapter`, `IGoogleAuthAdapter` etc.) nos testes de unidade, no mesmo espírito do Mockito no exercício de referência da disciplina, porém aplicado às interfaces reais do projeto;
- **Coverlet** como ferramenta de medição de cobertura de código, integrado ao `dotnet test` via `dotnet test --collect:"XPlat Code Coverage"`, gerando relatórios que podem ser convertidos para HTML (por exemplo, via ReportGenerator) e inspecionados da mesma forma que o relatório do JaCoCo no exercício em Java;
- um **banco PostgreSQL de teste**, isolado do banco de desenvolvimento/produção, para os testes de integração que envolvem EF Core/Npgsql;
- **Playwright** para os testes de sistema ponta a ponta, automatizando a interação com o SPA React num navegador real (login, montagem de pedido, pagamento em ambiente de sandbox do gateway);
- **GitHub Actions** como plataforma de integração contínua, executando toda a suíte a cada Pull Request.

Essa troca de ferramentas em relação ao material de referência é deliberada: o exercício de testes de unidade da disciplina usa Java, JUnit, Mockito e JaCoCo, mas o backend real do Sistema Unespão é .NET 8/ASP.NET Core em C#. Documentar as ferramentas Java descreveria uma stack que o projeto não usa; por isso a equipe optou por reproduzir a mesma forma de trabalho — teste com e sem dublê, medição de cobertura — dentro do ecossistema .NET efetivamente empregado no projeto.

Sobre integração contínua: um workflow de GitHub Actions roda a cada Pull Request aberto contra a `main`, complementando a revisão humana do PR com uma verificação automática antes do merge. O pipeline restaura as dependências via NuGet, compila a solução, executa `dotnet test` com coleta de cobertura para toda a suíte de testes de unidade e integração contra o banco PostgreSQL de teste, publica o relatório de cobertura do Coverlet como artefato do workflow e, na sequência, sobe o SPA React e a API num ambiente efêmero para rodar a suíte Playwright de testes de sistema contra o gateway de pagamento em sandbox. Qualquer revisor consegue inspecionar tanto o relatório de cobertura quanto o resultado dos testes de sistema diretamente no próprio PR antes de aprovar o merge, o mesmo pipeline de unidade, integração e sistema descrito no capítulo de Gestão de Configuração e Manutenção.
