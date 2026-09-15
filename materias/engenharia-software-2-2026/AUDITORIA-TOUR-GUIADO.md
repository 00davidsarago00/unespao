# Auditoria de Fidelidade — Apresentação Guiada (Spotlight Tour) vs. Fontes

**Escopo auditado:** `src/components/GuidedPresentationTour.tsx`, `SpotlightTourOverlay.tsx`,
`SpotlightRoleSelectorModal.tsx`, `src/data/spotlightTourData.ts` (`CLIENT_SPOTLIGHT_STEPS` /
`BAKER_SPOTLIGHT_STEPS`).

**Fontes usadas:**
- Domínio: `Sistema-Unespao-ESII.pdf` (15 p.) + `iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf` (2 p.)
- Estrutura oficial: `template-modelo-projeto-final-2026.tex` (= `.pdf`, confirmados idênticos)
- Documento já escrito pelo grupo: `docs/01` a `docs/06` e `docs/99`
- Código-fonte: `src/` inteiro (React/Vite/TypeScript puro — **sem backend .NET, sem C#, sem testes
  automatizados reais**; confirmado por busca exaustiva: zero arquivos `.cs`/`.csproj` no repositório)

**Nota metodológica importante, achada logo de início:** existem **dois arquivos de dados de tour**
no projeto — `spotlightTourData.ts` (o que efetivamente roda, importado por `SpotlightTourOverlay.tsx`,
que por sua vez é montado por `GuidedPresentationTour.tsx`) e `guidedTourData.ts`, um segundo arquivo
com conteúdo semelhante (e com o mesmo tipo de invenções) que **não é importado por nenhum componente
do projeto** — é código morto. Esta auditoria foca em `spotlightTourData.ts` (o tour real), mas sinaliza
`guidedTourData.ts` como limpeza pendente ao final.

---

## Achado estrutural prévio (antes do Fator 0/1/2 por capítulo)

O template oficial (`.tex`, idêntico ao `.pdf`) tem exatamente estes blocos, nesta ordem, e **nenhum
outro**:

1. Introdução e Objetivos (1.1–1.4)
2. Arquitetura do Sistema (2.1–2.5)
3. Projeto de Componentes (3.1–3.4, incluindo 3.4 "Padrões de projeto")
4. Projeto de Interface do Usuário (4.1–4.5)
5. Especificação e Estratégia de Testes (5.1–5.6)
6. Gestão de Configuração e Manutenção (6.1–6.4)
7. **Controle de Versões do Documento** — capítulo **não numerado** (`\chapter*`), mas é o único bloco
   depois do capítulo 6.

Não existe, em nenhum lugar do template, capítulo ou seção chamada **"Glossário e Siglas"**, nem
**Apêndice**. O agente que leu o `.tex` buscou literalmente por "Glossário", "Siglas" e "Apêndice"
no arquivo inteiro: zero ocorrências.

O tour guiado (`spotlightTourData.ts`) usa **8 tópicos fixos**, iguais para os dois papéis:

| # no tour | Título no tour | Capítulo real correspondente no template |
|---|---|---|
| 1 | Introdução e Objetivos | Cap. 1 ✅ |
| 2 | Arquitetura do Sistema | Cap. 2 ✅ |
| 3 | Projeto de Componentes | Cap. 3 ✅ |
| 4 | Projeto de Interface do Usuário | Cap. 4 ✅ |
| 5 | Especificação e Estratégia de Testes | Cap. 5 ✅ |
| 6 | Gestão de Configuração e Manutenção | Cap. 6 ✅ |
| 7 | **Glossário e Siglas** | **Não existe no template.** |
| 8 | Controle de Versões do Documento | É o 7º bloco real (não numerado), não o 8º. |

**Isto é o achado estrutural mais importante da auditoria (Fator 1, gravidade alta):** o tour inventa
um capítulo 7 ("Glossário e Siglas") que não existe na estrutura oficial que o próprio documento do
grupo segue, e por causa disso desloca "Controle de Versões do Documento" para a posição 8, quando na
estrutura real ele é o bloco seguinte ao capítulo 6, sem um capítulo de Glossário entre eles. Um membro
da banca comparando o tour com o documento entregue notará que o "Tópico 7" do tour não tem capítulo
correspondente no PDF final.

---

## Achado estrutural prévio #2 — o cenário de negócio do tour contradiz `docs/01` e `docs/02`

Antes de entrar capítulo a capítulo, um segundo achado atravessa o tour inteiro e por isso é reportado
aqui, uma única vez, em vez de repetido em cada capítulo:

- `docs/01-introducao-objetivos.md`: *"A padaria Unespão modelada neste projeto é uma loja única (...)
  por isso o sistema aqui descrito não trata de rede de lojas nem de seleção de unidade."*
- `docs/02-arquitetura-sistema.md`: *"O sistema modela uma única loja da padaria Unespão, não uma rede
  de unidades."*
- `Sistema-Unespao-ESII.pdf`: também descreve uma única padaria ("Padaria Unespão"), sem qualquer
  menção a múltiplas padarias parceiras, UNESP Bauru, campus específico ou "intervalo entre aulas".

O tour (Tópico 1, papel Cliente) e o código que ele demonstra (`src/data/initialData.ts`,
`INITIAL_BAKERIES`) descrevem e implementam o oposto: um **marketplace de múltiplas padarias parceiras**
próximas ao "Campus UNESP Bauru", com geolocalização, filtro de raio (`< 0.8 km`), nomes fictícios de
estabelecimentos ("Padaria Central Unesp", "Cantina & Padaria da Geologia", "Panificadora Trigo Dourado
Bauru", "Forno & Grãos da Vila"), endereços fictícios detalhados, notas e contagens de avaliação
fabricadas. Isso é **conteúdo não rastreável apresentado como se fosse o sistema documentado**: nenhuma
fonte (nem o PDF de domínio, nem `docs/`) sustenta um modelo de múltiplas padarias.

Isso não é um erro isolado do Tópico 1 — ele se propaga: RF01 do tour ("Listagem de estabelecimentos
parceiros") também aparece com o mesmo enquadramento em `guidedTourData.ts` (`REQUIREMENTS_DATA`,
RF-01), e o código do app de fato implementa esse marketplace fictício (não é só texto do tour — é o
próprio produto demonstrado). **Isto é uma inconsistência interna grave**: o código/demo e o tour
descrevem um sistema; `docs/01` e `docs/02` (já escritos e aparentemente validados pelo grupo) descrevem
outro. Antes de qualquer correção pontual no texto do tour, o grupo precisa decidir qual das duas
versões é a verdadeira (ver pergunta P1 ao final).

---

## Achado estrutural prévio #3 — o papel "Padeiro/KDS" não corresponde ao ator documentado

`docs/04-interface-usuario.md` define apenas dois perfis de usuário: **Cliente** e
**Atendente/Administrador**. O Atendente/Administrador é descrito assim: *"Esse é um perfil de uso
interno (...) não há personalização de pedido nem etapas sequenciais a percorrer, apenas duas telas de
gestão (Catálogo e Estoque)"* — ou seja, um perfil de back-office que faz CRUD de produtos/estoque, **sem
fila de pedidos em tempo real, sem KDS, sem transição de status de pedido.**

O tour (papel "Padeiro") e o código (`BakerView.tsx`, `type UserRole = 'cliente' | 'padeiro'` em
`src/types.ts`) descrevem e implementam algo bem diferente: um **Kitchen Display System (KDS)** com fila
de pedidos em tempo real, filtros por status (`aguardando_preparo`, `em_preparo`, `pronto`,
`concluido`), avanço de status pelo padeiro, "chapa", WebSockets/eventos, SLA de preparo etc. **Nada
disso está em `docs/04`, nem em nenhuma outra fonte.** O `Sistema-Unespao-ESII.pdf` também não descreve
um segundo ator "Padeiro" — a Visão de Contexto (C4 Nível 1) do PDF cita apenas "Cliente [Pessoa]" como
ator humano, sem um segundo ator "Padeiro" ou "Atendente".

Assim como o achado anterior, isto é uma inconsistência interna que atravessa o tour inteiro (todos os
8 tópicos do papel "Padeiro" partem dessa premissa) e não um erro pontual de um tópico — reportado aqui
uma vez, referenciado adiante.

---

## Capítulo 1 — Introdução e Objetivos

### Fator 0 — Fidelidade narrativa

| Afirmação do tour (Cliente, Tópico 1) | Status | Evidência |
|---|---|---|
| "Catálogo de Padarias Próximas no Campus UNESP" / geolocalização / filtro de raio < 0.8 km | **CONTEÚDO NÃO RASTREÁVEL** | Contradiz `docs/01` ("loja única"); não há menção a campus/geolocalização/raio em nenhuma fonte de domínio. |
| "RF01 (Listagem de estabelecimentos parceiros...)" | **CONTEÚDO NÃO RASTREÁVEL** | `docs/01` não numera requisitos (tabela sem código); PDF de domínio não tem seção de RF/RNF. Código "RF01" com esse conteúdo específico não existe em nenhuma fonte. |
| "RNF02 (Usabilidade: localização em 1 toque)" | **CONTEÚDO NÃO RASTREÁVEL** | Mesma razão acima — nem o código RNF02, nem "localização em 1 toque" aparecem em `docs/01` (lá RNF de usabilidade fala em "poucos toques" para montar o item, não em localização). |
| "Pela ISO/IEC 25010, atende à Adequação Funcional... e Usabilidade" | Paráfrase aceitável quanto ao uso da norma ISO 25010 em si (citada no PDF de domínio? **Não** — a ISO 25010 não aparece no `Sistema-Unespao-ESII.pdf`; aparece em `docs/01` como elaboração do próprio grupo, o que é legítimo) | O enquadramento ISO 25010 é do grupo (`docs/01`), o que é aceitável; mas aplicado aqui a um recurso (geolocalização multi-padaria) que não existe nas fontes. |
| Baker Tópico 1: "RF03 (Comanda digital da chapa)", "RNF01 (latência < 1s)", "KDS Industrial" | **CONTEÚDO NÃO RASTREÁVEL** | Ver achado estrutural #3 — papel Padeiro/KDS não documentado em `docs/04` nem no PDF de domínio. |

**Fidelidade de nomenclatura Unespão vs. UNESP:** o tour usa consistentemente "Unespão" para o sistema/
padaria e "UNESP" para a universidade — sem trocas indevidas encontradas neste capítulo.

### Fator 1 — Conformidade com o template
O template pede, em 1.3, uma "Visão geral dos requisitos" em **tabela sem codificação RF/RNF** e, em
1.4, "Objetivos de qualidade" com tabela Objetivo/Prioridade/Impacto. O tour usa codificação RF01/RNF02
que não existe em nenhuma versão do documento (nem no `.tex` nem em `docs/01`) — um formato que o próprio
grupo decidiu não adotar. Divergência de forma, não apenas de conteúdo.

### Fator 2 — Cobertura do enunciado
O enunciado do professor não entra em nível de detalhe de capítulo; nada a reportar aqui além do achado
estrutural geral (capítulo 7 "Glossário" inexistente, já reportado acima).

### Fator 3 — Code review breve
Nada crasco identificado neste tópico especificamente (ver seção geral de performance ao final).

---

## Capítulo 2 — Arquitetura do Sistema

### Fator 0

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "PadariaDTO", "IPadariaService" (Cliente, Tópico 2) | **CONTEÚDO NÃO RASTREÁVEL** | Nenhuma fonte cita `PadariaDTO` ou `IPadariaService`. Decorre do modelo de múltiplas padarias já sinalizado como inconsistência interna. |
| "ADR-001 homologa o desacoplamento do frontend" | **CONTEÚDO NÃO RASTREÁVEL** | Nenhuma fonte (PDF de domínio, `docs/02`, `.tex`) usa numeração "ADR-001"/"ADR-01". `docs/02` documenta decisões em **tabela** ("Decisões arquiteturais relevantes"), sem numerar como ADR formal. O PDF de domínio confirmadamente não tem seção de ADR. |
| "SRP: catálogo de padarias não conhece detalhes de persistência" | Paráfrase aceitável do princípio SRP em si (citado no PDF e em `docs/02`), mas aplicado a um componente (catálogo de padarias) que não existe nas fontes. |
| Baker Tópico 2: "ADR-002... arquitetura orientada a eventos", "Use Case NotificarCozinha", "Observer/Subscriber" | **CONTEÚDO NÃO RASTREÁVEL** | Nenhuma fonte menciona EDA, WebSockets, Observer Pattern ou "NotificarCozinha". Decorre da inconsistência do papel Padeiro/KDS (achado #3). |

**Padrão citado vs. implementado:** o tour (Baker, Tópico 2) descreve uma "Arquitetura Orientada a
Eventos" e um "Observer Pattern" como algo que está em execução no sistema. No código real, o botão de
demo ("Simular Chegada de Pedido") apenas chama uma função `onSimulateOrder` que insere um pedido mockado
via `useState`/callback do React — não há barramento de eventos, não há padrão Observer implementado, é
simulação de UI. Isso deveria ser marcado no tour como demonstração conceitual, não como "arquitetura
orientada a eventos... aprovada pela ADR-002" (um ADR que não existe).

### Fator 1
O template (2.1–2.5) pede Contexto/Fronteiras, Estilo Arquitetural, Contêineres, Decisões Arquiteturais,
Restrições — o tour cobre esses temas em espírito, mas usando nomenclatura de ADR numerada que `docs/02`
não usa (lá é uma tabela, sem "ADR-XX"). Divergência de forma.

### Fator 2
Nada adicional além do já registrado.

### Fator 3
Nada crasco identificado.

---

## Capítulo 3 — Projeto de Componentes

### Fator 0 — o capítulo com mais achados de padrão citado vs. implementado

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "GoF Factory Method... instanciar ItemPersonalizado" (Cliente, Tópico 3) | **CONTEÚDO NÃO RASTREÁVEL** | Nem o PDF de domínio, nem `docs/03` mencionam Factory Method em nenhum momento. `docs/03` documenta explicitamente "apenas os padrões cuja aplicação está de fato evidenciada": Repository, Adapter, Injeção de Dependência, Strategy, Decorator — **Factory Method não está nessa lista.** |
| "GoF Adapter (IPagamentoAdapter) unifica... Pix Banco Central, Cartão de Crédito e Pagamento no Balcão" | Nome de interface **parcialmente divergente** + conteúdo de negócio não rastreável | `docs/03` e o PDF de domínio usam `IGatewayPagamentoAdapter`, não `IPagamentoAdapter`. "Pix Banco Central" como nome específico do provedor Pix não aparece em nenhuma fonte; "Pagamento no Balcão" como terceira opção implementada não é citado em nenhuma fonte (docs/03 cita Stripe/PagSeguro/Pix apenas como exemplo hipotético de OCP, nunca "Balcão"). |
| "GoF Repository: IProdutoRepository" | Paráfrase aceitável | `IProdutoRepository` existe em `docs/03` e no PDF de domínio. Correto. |
| Baker Tópico 3: "GoF Decorator... base é montada usando IngredienteDecorator (ex: QueijoDecorator, BaconDecorator)" | **Inconsistência interna com `docs/03` (a própria fonte que o tour deveria refletir)** | `docs/03` é explícito: existe **uma única classe** `IngredienteDecorator`, **parametrizada** pelo `Ingrediente` que representa — e o texto de `docs/03` explica que essa é justamente a forma de **evitar** criar uma subclasse por ingrediente ("eliminando explosão combinatória de subclasses"). O tour cita `QueijoDecorator` e `BaconDecorator` como se fossem classes concretas separadas — o oposto do que a própria arquitetura documentada pelo grupo decidiu fazer, e por um motivo explícito (evitar exatamente esse tipo de subclasse). Isto é o achado mais irônico da auditoria: o tour erra justamente o ponto central do padrão que está tentando explicar. |

**Padrão citado vs. implementado (verificação em `src/`):** busquei por `Decorator`, `Factory`,
`Adapter`, `Strategy`, `Observer`, `Singleton` em todo `src/`. Não existe nenhuma classe/estrutura em
TypeScript que implemente formalmente esses padrões — os únicos resultados são: (a) esses nomes citados
como texto dentro dos arquivos de dados do próprio tour/documentação (`spotlightTourData.ts`,
`guidedTourData.ts`, `docsContent.ts`), e (b) menções em componentes que apenas **exibem** diagramas/
texto sobre os padrões (`ArchitectureDiagrams.tsx`, `ProjectFilesViewer.tsx`). O cálculo de preço real
em `ProductCustomizerModal.tsx` é uma soma direta via `.reduce()` sobre a lista de ingredientes
selecionados — **não há encadeamento de decoradores em tempo de execução**, é aritmética simples em
`useState`. Isso é esperado (o app é um frontend de demonstração, não a API .NET descrita em `docs/`),
mas o modal de demo "Adapter de Pagamentos" (`SpotlightTourOverlay.tsx`, linhas 914–1011) reforça a
confusão ao apresentar o rótulo **"Padrão GoF Adapter em Execução"** sobre dados 100% mockados em
`useState` (inclusive inventando nomes novos não presentes em nenhuma fonte: **"Cielo/Stone"** como
processadora de cartão, e nomes de classe como `PixGatewayAdapter`, `CartaoCreditoAdapter`,
`BalcaoPresencialAdapter`, nenhum dos quais existe em `docs/03` ou no PDF de domínio, que usam
uniformemente `GatewayPagamentoAdapter`/`IGatewayPagamentoAdapter` como a única classe/interface real).

### Fator 1
Template pede (3.1–3.4): Visão geral dos componentes, Detalhamento, Princípios de projeto (SOLID) e
Padrões de projeto. O tour cobre GoF mas com o mix de invenção (Factory Method) e erro conceitual
(Decorator com subclasses) descritos acima.

### Fator 2
Nada adicional.

### Fator 3
Nada crasco quanto a referências quebradas neste tópico. O modal de demo do Adapter (ver Fator 0) é mais
um problema de fidelidade de conteúdo do que um bug técnico.

---

## Capítulo 4 — Projeto de Interface do Usuário

### Fator 0

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "Heurística 5 (Prevenção de Erros)... Heurística 1... Heurística 6" (Cliente, Tópico 4) | Paráfrase aceitável quanto às heurísticas de Nielsen em si (matéria da disciplina, apoiada por `slides-interface-handout.pdf`), mas a numeração específica das heurísticas **não é usada dessa forma em `docs/04`** — `docs/04` não faz nenhuma referência às Heurísticas de Nielsen por número; é um capítulo inteiro descrevendo fluxo de atividade, sem menção a Nielsen. | Isso não é necessariamente invenção (as heurísticas de Nielsen existem como matéria), mas é conteúdo que `docs/04` (a fonte oficial já escrita) simplesmente não contém — se a banca ler `docs/04` e depois ver o tour citando "10 Heurísticas de Nielsen" como se fosse conteúdo do capítulo 4 documentado, vai notar a ausência. |
| "WCAG AA... áreas de toque com no mínimo 44x44px" | **CONTEÚDO NÃO RASTREÁVEL** | Nenhuma fonte menciona WCAG ou tamanho de alvo de toque em pixels. |
| Baker Tópico 4: "WCAG AAA", "mais de 50px de altura", "Amarelo = Na Chapa, Verde = Pronto" | **CONTEÚDO NÃO RASTREÁVEL** | Mesma razão — nenhuma fonte especifica esses valores; decorre também da inconsistência do papel Padeiro/KDS (achado #3), já que `docs/04` não descreve tela de chapa/cores semafóricas para o Atendente/Administrador. |

### Fator 1
O template (4.1–4.5) pede Artefatos de interface, Canais do Cliente, Fluxo principal (8 etapas),
Decisão de autenticação no totem, Interface do Atendente/Administrador. `docs/04` já cobre isso em
detalhe e de forma consistente com o resto do documento (loja única, dois papéis: Cliente e
Atendente/Administrador). O tour, ao usar o papel "Padeiro" em vez de "Atendente/Administrador", **não
mapeia** para a seção 4.5 do template como escrita — mapeia para uma tela que `docs/04` não descreve.

### Fator 2
Nada adicional.

### Fator 3
Nada crasco.

---

## Capítulo 5 — Especificação e Estratégia de Testes

### Fator 0 — divergência de política de cobertura

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "cobre 86,4% das linhas lógicas" (Cliente, Tópico 5) | **CONTEÚDO NÃO RASTREÁVEL / número não bate com a fonte** | `docs/05` cita números diferentes: "85% nos Services de prioridade Alta" e "68% no backend como um todo" — **86,4% não aparece em nenhuma fonte.** |
| "Critério de Aceite: Cobertura mínima de 80% exigida para aprovação nos builds de CI" | **Contradiz `docs/05` diretamente (inconsistência interna grave)** | `docs/05`, seção "Critérios de conclusão e cobertura": *"Decidimos não adotar uma meta numérica de cobertura (por exemplo, 'mínimo de 80% de linhas/branches cobertas') como critério único de conclusão dos testes."* O tour afirma exatamente o critério que o documento oficial já escrito diz explicitamente **não** ter sido adotado. |
| Modal de demo "Execução de Testes" — "Critério de cobertura > 80% e regressão" | Mesma contradição acima, reforçada no código (`SpotlightTourOverlay.tsx`, linha 1026). |
| Baker Tópico 5: "100% de aprovação na máquina de estados para liberar o deploy" | **CONTEÚDO NÃO RASTREÁVEL** | Não há esse critério em nenhuma fonte. |

**Fidelidade dos nomes de teste citados (verificação obrigatória):** o modal de demo "Execução de Testes
Automatizados" (`SpotlightTourOverlay.tsx`, linhas 1043–1046) exibe como testes reais:
```
✓ CalculoPreco_Personalizacao_RetornaTotalExato (18ms)
✓ MaquinaDeEstados_TransicoesValidas_AtualizaStatus (24ms)
✓ IngredientesRemovidos_LancheSemCebola_AlertaPadeiro (31ms)
✓ AdapterPagamento_PixInvalido_LancaFalhaAutorizacao (14ms)
```
**Nenhum desses quatro nomes de teste existe em nenhuma fonte.** `docs/05` documenta nomes de teste
reais e diferentes (`FinalizarPedido_PagamentoAprovado_AtualizaStatusParaConfirmado`,
`DarBaixa_ComSaldoInsuficiente_LancaExcecaoENaoAtualizaEstoque`,
`CalcularPrecoTotal_ComIngredientesAdicionais_SomaPrecoBaseEAdicionais`, etc.). Além disso, **não existe
nenhum arquivo de código de teste no repositório** — busca exaustiva por `.cs`/`.csproj` no projeto
inteiro não encontrou nada; o backend .NET descrito em `docs/` não está implementado neste repositório.
Portanto os quatro nomes do modal são, com certeza, **invenção do demo**, e o "100% PASS" exibido é uma
animação fixa (`useState` local com `testsPassed: true` nunca alterado por lógica real), não o resultado
de nenhuma execução. Isto precisa ser marcado sem ambiguidade como conteúdo fabricado para efeito de
demonstração visual, e — como pede a REGRA MÁXIMA — reportado mesmo não contradizendo nada explicitamente
(a mera apresentação como se fossem testes reais já configura o problema).

### Fator 1
Template (5.1–5.6): Planejamento, Unidade, Integração, Sistema, Critérios/Cobertura, Automação. O tour
cobre a ideia de pirâmide de testes e ferramentas (xUnit/Moq, corretos e batendo com `docs/05`), mas erra
especificamente no critério de cobertura (Fator 0 acima) — que é justamente um ponto onde `docs/05` fez
uma escolha deliberada e explicada, e o tour a contradiz sem necessidade.

### Fator 2
Nada adicional.

### Fator 3 — risco de apresentação ao vivo
Nada crasco de performance identificado no runner de testes (é só um modal estático). Ver seção geral
abaixo sobre o polling de posição do spotlight.

---

## Capítulo 6 — Gestão de Configuração e Manutenção

### Fator 0

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "RF01 -> Issue #12 no GitHub -> Branch feature/busca-padarias -> Commit feat(search) -> BuscaPadariasTests.cs" (Cliente, Tópico 6) | **CONTEÚDO NÃO RASTREÁVEL** | Nenhuma fonte cita Issue #12, a branch `feature/busca-padarias` ou o arquivo `BuscaPadariasTests.cs`. `docs/06` usa como exemplo real e verificável os PRs #1 e #2 já existentes no histórico do Git — não inventa números de issue. Esse trecho do tour inventa um exemplo fictício em vez de usar o exemplo real e rastreável que `docs/06` já documenta. Além disso, decorre de novo do recurso de busca de padarias (achado #2), que não é real. |
| "Pipeline CI/CD: 4 etapas automáticas" | Paráfrase aceitável quanto à existência de um pipeline com etapas (Lint, Build, Test, Deploy citadas de forma consistente com `docs/06` e `docs/05`), mas **nenhum arquivo `.github/workflows/ci.yml` existe de fato no repositório** — é um pipeline descrito na documentação como projetado, não implementado. O tour não deixa claro que é uma descrição de projeto e não uma pipeline em execução. |
| Baker Tópico 6: "Branch protection rules... aprovação de PR com pelo menos 2 revisores" | **CONTEÚDO NÃO RASTREÁVEL** | `docs/06` menciona "ao menos um revisor" para features, sem especificar 2 revisores nem branch protection formalizada; nenhuma fonte confirma esse número específico. |

### Fator 1
Template (6.1–6.4): Repositório/ICs, Dependências/Alterações, Rastreabilidade, Build/Integração/Entrega.
O tour cobre os temas certos, mas com exemplos fabricados em vez dos exemplos reais e verificáveis que
`docs/06` já usa (PRs #1/#2 do histórico real do Git) — uma perda de oportunidade, já que a fonte real é
mais forte para a banca do que um exemplo inventado.

### Fator 2
Nada adicional.

### Fator 3
Nada crasco.

---

## "Capítulo 7" do tour — Glossário e Siglas

Como já registrado no achado estrutural prévio, **este capítulo não existe no template oficial nem em
`docs/`.** Todo o conteúdo aqui (DTO, SLA de 10 min, KDS, NPS) é, portanto, adicional ao que o documento
final terá — o que por si só não é "invenção" no sentido de dado de negócio falso (são definições de
termos técnicos corretas em si), mas é uma seção que não tem onde pousar na estrutura entregável. O "SLA
de 10 min de preparo" citado aqui não aparece em nenhuma fonte (nem `docs/`, nem o PDF de domínio).

---

## Capítulo 8 do tour / "Controle de Versões do Documento" (7º bloco real)

### Fator 0

| Afirmação do tour | Status | Evidência |
|---|---|---|
| "v0.1... v0.5... v0.8... v1.0" (Cliente, Tópico 8) | **Contradiz `docs/99-controle-versoes.md`** | `docs/99` registra apenas duas entradas reais: v0.1 e v1.0, ambas datadas de 12/09/2026, sem v0.5 nem v0.8. O tour inventa dois marcos intermediários (v0.5, v0.8) com descrições de conteúdo ("Definição da Clean Architecture e Diagramas C4", "Especificação de Testes xUnit e Pipeline CI/CD") que não correspondem a nenhuma entrada real da tabela de controle de versões. |

### Fator 1/2
Nada adicional além do já registrado no achado estrutural (posição 8 vs. 7 real).

### Fator 3
Nada crasco.

---

## Fator 3 geral — riscos de performance na apresentação ao vivo

`SpotlightTourOverlay.tsx` mantém, durante todo o tempo em que o tour está aberto, um
`setInterval(updateTargetPosition, 500)` (linha 253) que faz `getBoundingClientRect()` a cada 500ms,
mais os handlers de `resize`/`scroll` que já recalculam a posição a cada evento (linhas 245–251). Isso é
redundante (o polling de 500ms roda mesmo sem scroll/resize), mas é um `getBoundingClientRect()` simples
sobre um único elemento — não é uma operação pesada o suficiente para travar visivelmente uma
apresentação em hardware normal. **Reportado como observação de baixo risco, não como bug** (o próprio
enunciado da missão pede para reportar `setInterval` de polling contínuo, mas o impacto real aqui parece
pequeno; incluído por transparência, não como um problema que precise de correção antes da defesa).

Nenhuma referência quebrada a `targetId` foi encontrada por leitura de código (os IDs usados em
`spotlightTourData.ts` seguem o padrão `tour-client-*`/`tour-baker-*"` que aparenta corresponder aos
elementos renderizados por `ClientView`/`BakerView`, mas **não confirmei renderização ao vivo no
navegador** — isso ficaria mais seguro validando com o app rodando, o que não foi feito nesta auditoria
de conteúdo).

---

## Síntese geral

### Conteúdo marcado como invenção/não rastreável (lista consolidada)
1. Modelo de negócio inteiro de "múltiplas padarias parceiras" + geolocalização + filtro de raio
   (contradiz `docs/01`/`docs/02`, que definem loja única) — **gravidade máxima**, atravessa todo o
   Tópico 1 e reaparece nos Tópicos 2, 3 e 6.
2. Papel "Padeiro"/KDS com fila de pedidos em tempo real e máquina de estados (não documentado em
   `docs/04`, que define apenas Cliente e Atendente/Administrador, sem KDS) — **gravidade máxima**,
   atravessa todos os 8 tópicos do papel Padeiro.
3. Capítulo "7. Glossário e Siglas" — não existe no template oficial nem em `docs/`.
4. Toda a codificação RF01/RF02/RF03/RF04/RNF01/RNF02 usada pelo tour — não existe nem no PDF de
   domínio, nem em `docs/01` (que usa tabela sem código).
5. Todos os "ADR-001"/"ADR-01"/"ADR-002" citados — nenhuma fonte tem ADRs numerados formalmente;
   `docs/02` usa uma tabela de decisões, sem numeração ADR.
6. "GoF Factory Method" para criação de item personalizado — `docs/03` lista explicitamente os padrões
   aplicados e Factory Method não está entre eles.
7. `QueijoDecorator`/`BaconDecorator` como subclasses do Decorator — contradiz o próprio `docs/03`, que
   usa uma única classe parametrizada exatamente para evitar esse tipo de subclasse.
8. `IPagamentoAdapter` (nome divergente de `IGatewayPagamentoAdapter`), "Pix Banco Central", "Pagamento
   no Balcão", "Cielo/Stone" — nenhum aparece em nenhuma fonte.
9. Coeficiente de cobertura de testes "86,4%" e "cobertura mínima de 80% exigida" — contradiz `docs/05`,
   que registra 85%/68% e explicitamente rejeita adotar um gate de 80%.
10. Os 4 nomes de teste do modal de demonstração (`CalculoPreco_Personalizacao_RetornaTotalExato` etc.)
    — não existem em nenhum arquivo de teste real (que também não existe no repositório) nem em
    `docs/05`.
11. Exemplo de rastreabilidade "Issue #12", branch `feature/busca-padarias`, `BuscaPadariasTests.cs` —
    inventado; `docs/06` já tem um exemplo real (PRs #1/#2) que poderia ter sido reusado.
12. Marcos de versão "v0.5" e "v0.8" — não existem em `docs/99`, que só registra v0.1 e v1.0.
13. Números de acessibilidade específicos (WCAG AA/AAA, 44x44px, 50px) — não aparecem em nenhuma fonte.
14. "SLA de 10 min de preparo" — não aparece em nenhuma fonte.

### Inconsistências internas entre tour e `docs/*.md` (as mais graves da lista acima)
- #1 e #2 são, ao mesmo tempo, inconsistências internas *e* invenções: o código do app realmente
  implementa esse modelo de negócio (múltiplas padarias, papel Padeiro/KDS), então não é só o texto do
  tour que diverge de `docs/` — é o **produto de software auditado inteiro**. Isso é o problema mais
  sério encontrado: a defesa vai mostrar ao vivo um sistema que a documentação escrita descreve como
  sendo outra coisa.
- #9 é uma inconsistência interna direta e categórica (o tour afirma o oposto do que `docs/05` decide
  explicitamente).
- #7 é uma inconsistência interna com a própria justificativa do padrão que o tour está tentando ilustrar.
- #12 é uma inconsistência interna simples com uma tabela de 2 linhas que já existe.

### Padrões de projeto citados sem implementação real correspondente
Todos os padrões citados pelo tour (Adapter, Decorator, Factory Method, Repository, Observer/EDA) são
teatro de UI com `useState` — nenhum existe como estrutura de código real no projeto (que é um front-end
puro, sem o backend .NET descrito em `docs/`). Isso é esperado dado que o repositório ainda não tem o
backend implementado, **mas o tour não sinaliza isso em nenhum momento** — os textos ("Padrão GoF Adapter
em Execução") e os rótulos dos modais de demo dão a entender que o padrão está de fato rodando, quando é
uma simulação visual com dados de mentira.

### Diferenças por fator, ranqueadas por gravidade
1. **Fator 0 (invenção de conteúdo)** — gravidade máxima. Dois achados estruturais (multi-padaria,
   papel Padeiro/KDS) comprometem a coerência de todo o tour com `docs/`. Números de cobertura de teste
   contradizem uma decisão explícita de `docs/05`.
2. **Fator 1 (conformidade com template)** — gravidade alta. Capítulo "Glossário e Siglas" inexistente;
   uso de codificação RF/RNF e ADR que o próprio grupo não adotou no documento real.
3. **Fator 2 (cobertura do enunciado)** — gravidade baixa a média; o enunciado do professor é genérico
   o suficiente para não ser violado diretamente, mas a divergência estrutural do item 1 acima dificulta
   a leitura cruzada tour↔documento pela banca.
4. **Fator 3 (code review)** — gravidade baixa; nenhum erro crasco de apresentação encontrado, só uma
   observação de polling redundante de baixo risco.

### Avaliação honesta
**Hoje, não.** A apresentação guiada, como está, **não** sustenta uma defesa 100% rastreável às fontes.
O problema não está em detalhes pontuais fáceis de corrigir — está em duas premissas de negócio inteiras
(marketplace de múltiplas padarias; papel Padeiro com KDS) que o próprio código do app materializa e que
contradizem o que `docs/01`, `docs/02` e `docs/04` já documentam formalmente como decisão do grupo (loja
única; papel Atendente/Administrador sem KDS). Antes de qualquer ajuste de texto no tour, é necessário
decidir qual das duas visões é a que vai para a banca — porque hoje o app "ao vivo" mostra uma coisa e o
PDF que será entregue mostra outra.

Além disso, há um conjunto de invenções pontuais mais fáceis de corrigir (nomes de teste fabricados,
números de cobertura contraditórios, "Glossário" sem capítulo correspondente, ADRs numerados
inexistentes, `QueijoDecorator`/`BaconDecorator` que contradiz o próprio padrão documentado) que, mesmo
isolando o problema estrutural maior, ainda impediriam uma defesa 100% rastreável.

---

## Perguntas para decisão do usuário (Lucas) — não resolvidas por suposição

**P1 — Modelo de negócio: loja única ou marketplace de múltiplas padarias?**
`docs/01`/`docs/02` (e o PDF de domínio) descrevem uma padaria única. O app implementado e o tour
descrevem um marketplace de múltiplas padarias parceiras no campus da UNESP Bauru. Qual das duas visões
é a que deve ir para a banca? Se for o marketplace, `docs/01`/`docs/02` (e provavelmente outros
capítulos) precisam ser reescritos para refletir isso — é uma mudança de escopo, não um ajuste de texto.
Se for a loja única, o app/tour precisam ser refeitos para remover a lista de padarias, distância, etc.

**P2 — Papel "Padeiro"/KDS: existe ou não no sistema?**
`docs/04` define apenas Cliente e Atendente/Administrador (sem KDS). O tour e o código implementam um
papel Padeiro completo com fila de pedidos em tempo real. Isso é uma funcionalidade que o grupo decidiu
adicionar depois de escrever `docs/04` e simplesmente esqueceu de atualizar a documentação? Ou é um
recurso do protótipo de UI que não deveria fazer parte do escopo formal do sistema? Preciso saber qual
documento está desatualizado antes de sugerir qualquer correção.

**P3 — Critério de cobertura de testes: 80% obrigatório ou critério qualitativo por prioridade?**
`docs/05` decide explicitamente não adotar um gate numérico de 80%. O tour afirma o contrário. Qual dos
dois é a decisão real do grupo?

**P4 — Capítulo "Glossário e Siglas": deve ser incluído no documento final?**
O template não tem esse capítulo, e nem o enunciado do professor nem `docs/` prevê um. O tour trata como
se fosse o capítulo 7 oficial. O grupo quer adicionar esse capítulo ao `.tex` (ficaria fora do padrão do
template, mas o professor deu liberdade sobre o que incluir), ou o tour deveria remover esse tópico e
recontar os 8 blocos como 7?

**P5 — `guidedTourData.ts` (código morto): remover ou é um work-in-progress a ser conectado depois?**
Esse arquivo não é usado por nenhum componente hoje. Contém o mesmo tipo de conteúdo não rastreável do
`spotlightTourData.ts` (e mais: nomes de teste diferentes, como `CalculoPrecoTests`, também não
verificados). Se não houver plano de uso, recomendo removê-lo para não induzir confusão futura sobre
qual arquivo é a fonte real do tour.

**P6 — Exemplos fabricados de rastreabilidade e de nomes de teste no modal de demo: substituir pelos
exemplos reais já existentes em `docs/`?**
`docs/06` já tem um exemplo real e verificável (PRs #1/#2 do histórico do Git); `docs/05` já tem nomes de
teste reais. O tour poderia citar esses exemplos reais em vez de inventar novos (`Issue #12`,
`BuscaPadariasTests.cs`, os 4 nomes do modal de testes). Confirma que é essa a direção antes de eu propor
o texto de substituição?
