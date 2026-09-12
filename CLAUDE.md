# unespao — Documento do Projeto Final (Engenharia de Software II)

Este repositório é a KB do grupo para o projeto final da disciplina Engenharia de
Software II (UNESP, 2026) — **Sistema Unespão** (plataforma de pedidos
personalizados estilo Subway/Spoleto para a padaria Unespão).

O objetivo central deste repo, no momento, é produzir a **documentação do
projeto final** exigida pela disciplina.

## Pipeline de produção do documento — MD → .tex → PDF

O documento final é entregue em PDF, gerado a partir do `.tex`, mas **todo o
trabalho de redação e iteração acontece em Markdown primeiro**. Não pule
etapas.

1. **MD (padrão de trabalho)** — toda escrita, revisão e discussão de conteúdo
   acontece em arquivos `.md` dentro de `docs/`. É aqui que iteramos livremente.
2. **.tex** — só é gerado/atualizado quando explicitamente solicitado
   ("passa pro tex", "gera o tex"). Nunca gerar `.tex` como efeito colateral de
   uma edição de conteúdo em Markdown.
3. **PDF** — só é compilado quando explicitamente solicitado ("gera o pdf",
   "compila"). É sempre o último passo, a partir do `.tex` atualizado.

Nunca escreva conteúdo novo diretamente no `.tex` — ele é gerado/atualizado a
partir do Markdown, não editado como fonte primária de conteúdo.

## Requisição literal do professor

> "Em formato PDF. O documento de projeto de software deverá ser entregue
> usando o modelo em anexo. Observe que nesse modelo há apenas uma breve
> descrição do que deverá ser realizado. Alguns capítulos podem conter muitas
> figuras (diagramas de classes e interfaces do usuário, etc). Portanto,
> dependendo da quantidade, algumas figuras podem ser apresentadas como
> Apêndice no documento."

Implicações diretas para este trabalho:

- A entrega final é **PDF gerado a partir do `.tex`** do modelo anexo — não um
  documento em outro formato/template.
- O template só dá uma descrição breve de cada seção (os textos
  `\orientacao{...}`): a responsabilidade de decidir *o que* e *quanto* colocar
  em cada capítulo é do grupo — está tudo aberto a critério e não deve ser
  tratado como um formulário a preencher mecanicamente.
- Capítulos com muitas figuras (ex.: diagramas de classes detalhados, várias
  telas de interface) podem levar essas figuras para um **Apêndice**,
  mantendo no corpo do capítulo apenas as figuras mais representativas e a
  explicação textual delas. Avaliar caso a caso por capítulo, não uma regra
  fixa — perguntar ao usuário quando a quantidade de figuras de um capítulo
  parecer estar no limite entre "cabe no corpo" e "vai para apêndice".

## Estrutura de arquivos

```
docs/
  01-introducao-objetivos.md
  02-arquitetura-sistema.md
  03-projeto-componentes.md
  04-interface-usuario.md
  05-testes.md
  06-gestao-configuracao.md
  99-controle-versoes.md
template-modelo-projeto-final-2026.tex   # estrutura/esqueleto oficial do template
template-modelo-projeto-final-2026.pdf   # como o template renderizado deve ficar
Sistema-Unespao-ESII.pdf                 # fonte de verdade do conteúdo técnico
refs.bib
images/
```

Cada arquivo em `docs/` corresponde a um capítulo do `.tex` (mesma ordem e
títulos de `template-modelo-projeto-final-2026.tex`). Ao converter para `.tex`,
os textos de `\orientacao{...}` do template devem ser removidos/substituídos
pelo conteúdo real — nunca devem sobrar no documento final.

## Fontes e como usá-las

- **`Sistema-Unespao-ESII.pdf`** — fonte de verdade do sistema (minimundo,
  conceitos de domínio, C4 Nível 1/2/3, princípios SOLID aplicados). Use como
  base primária para responder aos tópicos de Introdução, Arquitetura e
  Projeto de Componentes. Se um tópico do template não tiver informação
  suficiente aqui, **pergunte ao usuário** em vez de inventar decisões de
  projeto, dados de negócio ou justificativas.
- **`iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf`** — detalhamento do
  C4 Nível 3 (mesmo conteúdo do Sistema-Unespao-ESII.pdf, granularidade de
  classes); usar como complemento/checagem cruzada da seção de Componentes.
- **`Exercicio-ESII-padrao-decorador.docx.pdf`** — referência de como
  documentar um padrão de projeto (motivação, diagrama UML, código). Usar como
  *modelo de forma* para a seção "Padrões de Projeto", não como conteúdo do
  Sistema Unespão em si (a menos que o grupo decida usar Decorator de fato no
  projeto).
- **`Exercicio-teste-unidade-Java.docx.pdf`** — referência de estratégia de
  teste (JUnit + Mockito + JaCoCo). Usar como *modelo de forma* para a seção de
  Especificação e Estratégia de Testes.
- **`slides-SCM-handout.pdf`** — Gestão de Configuração de Software (SCIs,
  referenciais, controle de versão/alteração, auditoria de configuração,
  DevOps/CI-CD). Usar como apoio teórico/vocabulário para o capítulo
  **Gestão de Configuração e Manutenção**.
- **`slides-interface-handout.pdf`** — Regras de Ouro de Mandel, do's/don'ts
  de UI, etapas de projeto de interface (com exemplo didático "CasaSegura").
  Usar como apoio teórico para o capítulo **Projeto de Interface do Usuário**.
- **`slides-padroes-handout-parte-1.pdf`** e
  **`slides-padroes-handout-site-parte-1.pdf`** — praticamente o mesmo
  conteúdo (o segundo é uma versão levemente estendida: mais um padrão
  criacional e a caracterização de Coplien de padrão eficaz). Cobrem
  Singleton, Método Fábrica, Adaptador e Observador com exemplos em Java.
  Usar como apoio teórico/modelo de forma para a seção **Padrões de
  Projeto** (dentro de Projeto de Componentes) — só usar Decorator, Singleton
  etc. como conteúdo real se o grupo confirmar que o Sistema Unespão de fato
  aplica esses padrões.
- Nenhum dos quatro slides acima é fonte de conteúdo do Sistema Unespão —
  são apoio teórico da disciplina (vocabulário, critérios, exemplos didáticos
  não relacionados à padaria).
- **`README.md`** — apenas identifica o repositório como KB do grupo; sem
  conteúdo técnico relevante para os capítulos.
- **`images/AV01A.jpg`** — logo da UNESP, já referenciado na capa do `.tex`
  do template; não mexer.
- **`images/01_2_iso-25010-topics-EN.drawio.png`** — diagrama com as oito
  características de qualidade da ISO/IEC 25010 (Functional Suitability,
  Reliability, Security, Maintainability, Performance Efficiency, Usability,
  Compatibility, Transferability). Usar como apoio visual na seção
  **Objetivos de qualidade** do capítulo de Introdução, se o grupo optar por
  estruturar os objetivos de qualidade segundo a ISO 25010 (o próprio `.tex`
  sugere esse modelo como opção).
- **`images/`** — ativos gráficos para o `.tex`. Novos diagramas gerados
  durante a redação também vão aqui.

Nunca misture: conteúdo do sistema vem do Sistema-Unespao-ESII.pdf (+ input do
usuário); forma/padrão de como documentar vem dos exercícios e slides.

## Processo de redação — três vertentes (Workflow multi-agente)

Cada capítulo, antes de ser considerado pronto, passa pelas três vertentes
abaixo. Isso roda via `Workflow` (multi-agente), não como personas dentro da
mesma resposta — só disparar quando o usuário pedir para escrever/revisar um
capítulo "com as três vertentes" ou equivalente.

1. **Redator** — escreve o capítulo em Markdown a partir das fontes acima,
   seguindo a estrutura do template. Objetivo: cobrir os tópicos exigidos com
   clareza técnica.
2. **PO (Product Owner)** — revisa sob a ótica de negócio/produto: o conteúdo
   reflete corretamente o minimundo e os objetivos do Sistema Unespão? As
   justificativas de decisões fazem sentido para o produto? Falta alguma
   decisão de escopo/prioridade que precise ser explicitada?
3. **Usuário-avaliador (professor/banca)** — revisa como quem vai corrigir:
   o capítulo atende literalmente ao que a seção do template pede? Diagramas
   têm explicação no texto? Decisões relevantes estão justificadas? Não é só
   uma coleção de diagramas sem análise?

O resultado esperado de cada rodada é o Markdown do capítulo atualizado, mais
uma lista curta de pendências/decisões que exigem input do grupo.

## Regras gerais

- Nunca gerar `.tex`/PDF sem pedido explícito.
- Nunca inventar dados de negócio, métricas, nomes de RA, datas de entrega ou
  decisões arquiteturais que não estejam nas fontes ou não tenham sido
  confirmadas pelo usuário — perguntar em vez de assumir.
- Manter a estrutura de capítulos idêntica à do template oficial; se um
  capítulo não se aplicar, explicar brevemente o motivo (conforme já orienta o
  próprio `.tex`).
- Antes da entrega final, lembrar de trocar `\orientacoestrue` para
  `\orientacoesfalse` no `.tex`.
- **Não há pressa.** Qualidade e correção do conteúdo importam mais que
  velocidade — o orquestrador e todos os subagentes envolvidos na produção do
  documento devem levar o tempo que for necessário (pesquisar as fontes com
  calma, revisar de verdade em cada vertente) em vez de entregar rascunhos
  apressados.
- **Perguntar sempre que houver dúvida real** — sobre o domínio do sistema,
  sobre uma decisão de projeto não documentada, sobre o que priorizar em um
  capítulo, sobre figuras que faltam, etc. Isso vale para o orquestrador e
  para cada subagente que ele acionar: dúvida não resolvida pelas fontes deve
  virar pergunta ao usuário (Lucas), nunca uma suposição silenciosa.
