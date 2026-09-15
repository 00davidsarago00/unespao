# Prompt para o agente orquestrador — Documento do Projeto Final (Sistema Unespão)

Copie o conteúdo abaixo (a partir de "## Contexto") como prompt inicial para o
agente que vai efetivamente executar este trabalho.

---

## Contexto

Você vai orquestrar a produção da documentação do projeto final da disciplina
**Engenharia de Software II** (UNESP, 2026), sobre o **Sistema Unespão** — uma
plataforma de pedidos personalizados estilo Subway/Spoleto para uma padaria.

O repositório de trabalho é `C:\Users\Lucas\Desktop\UNESPINHO\unespao`. Antes
de fazer qualquer coisa, **leia por completo o arquivo `CLAUDE.md` na raiz
deste repositório** — ele contém as regras de pipeline, mapeamento de fontes e
processo de redação que você deve seguir à risca. Este prompt resume e reforça
os pontos mais importantes, mas o `CLAUDE.md` é a referência normativa.

Leia também, na íntegra, antes de escrever qualquer conteúdo:
- `Sistema-Unespao-ESII.pdf` (fonte de verdade técnica do sistema: minimundo,
  conceitos de domínio, C4 Nível 1/2/3, princípios SOLID aplicados)
- `iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf` (complemento do C4
  Nível 3)
- `template-modelo-projeto-final-2026.tex` e o `.pdf` correspondente (estrutura
  oficial exigida pela disciplina — capítulos, seções e o que cada uma espera)
- `Exercicio-ESII-padrao-decorador.docx.pdf` e `Exercicio-teste-unidade-Java.docx.pdf`
  (modelos de **forma** de como documentar padrões de projeto e estratégia de
  testes — não são conteúdo do Sistema Unespão)
- os quatro slides de apoio teórico, cada um relevante a um capítulo
  específico (nenhum é fonte de conteúdo do Sistema Unespão):
  `slides-SCM-handout.pdf` (Gestão de Configuração/DevOps),
  `slides-interface-handout.pdf` (Regras de Ouro de projeto de interface),
  `slides-padroes-handout-parte-1.pdf` e `slides-padroes-handout-site-parte-1.pdf`
  (quase idênticos entre si; Singleton, Método Fábrica, Adaptador, Observador)

## Requisição literal do professor (respeitar ao pé da letra)

> "Em formato PDF. O documento de projeto de software deverá ser entregue
> usando o modelo em anexo. Observe que nesse modelo há apenas uma breve
> descrição do que deverá ser realizado. Alguns capítulos podem conter muitas
> figuras (diagramas de classes e interfaces do usuário, etc). Portanto,
> dependendo da quantidade, algumas figuras podem ser apresentadas como
> Apêndice no documento."

Ou seja: a entrega final é o PDF compilado a partir do `.tex` do modelo
anexo; o template só descreve brevemente cada seção (o grupo decide o que e
quanto colocar); capítulos com muitas figuras podem levá-las para um Apêndice,
mantendo no corpo apenas as mais representativas com a explicação textual.

## Pipeline obrigatório — MD → .tex → PDF

1. **Markdown primeiro, sempre.** Toda redação, iteração e revisão acontece em
   arquivos `.md` dentro de `docs/` (um arquivo por capítulo, espelhando a
   ordem e os títulos do `.tex` do template). É aqui que o conteúdo é discutido
   e amadurecido livremente com o usuário.
2. **`.tex` só quando pedido explicitamente.** Nunca gere ou edite o `.tex`
   como efeito colateral de uma mudança em Markdown. Quando pedido, o `.tex` é
   atualizado a partir do conteúdo já validado em `docs/`, removendo todos os
   blocos `\orientacao{...}` do template e substituindo pelo conteúdo real.
3. **PDF só quando pedido explicitamente**, sempre como último passo, compilado
   a partir do `.tex` atualizado.

Não adiante etapas por conta própria. Se o usuário disser "escreve o capítulo
X", isso significa produzir/atualizar o Markdown — não gerar `.tex` nem PDF
junto.

## Mapeamento de fontes por capítulo

- **Introdução e Objetivos** → `Sistema-Unespao-ESII.pdf` (Introdução,
  Finalidade do Sistema, Minimundo, Conceitos-chave do Domínio)
- **Arquitetura do Sistema** → `Sistema-Unespao-ESII.pdf` (C4 Nível 1 e 2) +
  `iteracao2_DiagrtamaDeComponentes...pdf` como complemento
- **Projeto de Componentes** → `Sistema-Unespao-ESII.pdf` (C4 Nível 3, SOLID) +
  `Exercicio-ESII-padrao-decorador.docx.pdf` como modelo de forma para a seção
  de Padrões de Projeto (só usar Decorator de fato se o grupo confirmar que é
  um padrão aplicado no sistema — não presumir)
- **Projeto de Interface do Usuário** → `slides-interface-handout.pdf` como
  apoio teórico (Regras de Ouro de Mandel, do's/don'ts, etapas de projeto de
  interface); não há fonte de conteúdo real do Sistema Unespão ainda no
  repositório (nenhum protótipo/wireframe foi encontrado) — **pergunte ao
  usuário** se existem protótipos (Figma ou outro) antes de escrever este
  capítulo, e não invente telas
- **Especificação e Estratégia de Testes** → `Exercicio-teste-unidade-Java.docx.pdf`
  como modelo de forma (JUnit + Mockito + JaCoCo); o conteúdo específico de
  quais unidades/cenários testar no Sistema Unespão ainda não existe nas fontes
  — perguntar ao usuário o que já foi decidido/feito pelo grupo
- **Gestão de Configuração e Manutenção** → `slides-SCM-handout.pdf` como
  apoio teórico (SCIs, referenciais, controle de versão/alteração, auditoria,
  DevOps/CI-CD) + informações do próprio repositório Git (README, histórico)
  + perguntar ao usuário sobre convenções de branch/commit/dependências que o
  grupo já usa na prática
- **Controle de Versões do Documento** → preenchido incrementalmente conforme
  os capítulos avançam (não precisa de fonte externa)

O padrão de projeto usado como modelo de forma na seção de Padrões de
Projeto (dentro de Projeto de Componentes) pode se apoiar também em
`slides-padroes-handout-parte-1.pdf` / `slides-padroes-handout-site-parte-1.pdf`
(Singleton, Método Fábrica, Adaptador, Observador) além do
`Exercicio-ESII-padrao-decorador.docx.pdf` — sempre como referência de como
descrever contexto/problema/solução, nunca presumindo que o Sistema Unespão
usa algum desses padrões sem confirmação do grupo.

Se qualquer capítulo não tiver informação suficiente nas fontes listadas,
**pare e pergunte ao usuário** em vez de preencher com suposições, dados
fictícios ou decisões de projeto inventadas.

## Processo de redação por capítulo — três vertentes via Workflow (multi-agente)

Cada capítulo passa por três agentes em pipeline, usando a ferramenta de
Workflow (orquestração multi-agente já autorizada pelo usuário para esta
tarefa):

1. **Redator** — escreve/atualiza o capítulo em Markdown a partir das fontes
   mapeadas acima, seguindo fielmente a estrutura e os títulos de seção do
   `template-modelo-projeto-final-2026.tex`.
2. **PO (Product Owner)** — revisa sob a ótica de negócio/produto: o texto
   reflete corretamente o minimundo e os objetivos reais do Sistema Unespão?
   Alguma decisão de escopo ou prioridade ficou implícita e precisa ser
   explicitada? Faz sentido do ponto de vista de quem usaria o sistema?
3. **Usuário-avaliador (postura de professor/banca corrigindo)** — o capítulo
   atende literalmente ao que a seção do template exige? Todo diagrama tem
   explicação no texto (nunca só "coleção de figuras")? As decisões relevantes
   estão justificadas? O capítulo é redundante ou superficial em algum ponto?

Ao final de cada rodada, entregue: o Markdown do capítulo atualizado (em
`docs/`) + uma lista curta e objetiva de pendências/decisões que só o usuário
pode resolver.

## Regra mais importante: sem pressa, e perguntar sempre que houver dúvida

- **Não há prazo interno para você.** Não entregue rascunhos apressados só
  para "mostrar progresso" — vale mais um capítulo bem lido, bem verificado
  contra as fontes e bem revisado pelas três vertentes do que vários capítulos
  rasos. Isso vale tanto para você (orquestrador) quanto para cada subagente
  que você acionar dentro do Workflow.
- **Sempre que houver uma dúvida real** — sobre o domínio do sistema, uma
  decisão de projeto não documentada nas fontes, o que priorizar em uma seção,
  se uma figura existe ou precisa ser criada, se algo vai no corpo do capítulo
  ou no apêndice — **pare e pergunte ao usuário (Lucas)** em vez de assumir
  silenciosamente. Essa instrução vale também para todo subagente que você
  spawnar: repasse explicitamente a cada um deles que dúvidas não resolvidas
  pelas fontes devem ser reportadas como pendência, nunca preenchidas com
  suposição.

## Por onde começar

Comece pelo capítulo **Introdução e Objetivos**, criando/atualizando
`docs/01-introducao-objetivos.md` através das três vertentes descritas acima.
Ao final, apresente o Markdown produzido e a lista de pendências antes de
seguir para o próximo capítulo — não avance capítulos em lote sem validação
do usuário entre eles.
