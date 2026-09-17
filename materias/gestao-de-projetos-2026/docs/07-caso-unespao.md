<!-- Última atualização: 2026-09-17 -->

# 07 — Caso real: o próprio projeto Unespão

Critério atendido: **C4**. Tempo no roteiro: ~2,5 min.

> **Alimenta:** fecho do **Bloco 3 — Hoje I (2023–2026)**, e serve de resposta na seção de perguntas prováveis.

**Regra deste capítulo:** só entra o que é **verificável no repositório** (`R-xx`) ou nos slides de aula
(`A-xx`). Nada de "achamos que". A pergunta a responder é: o que o grupo viveu usando LLM (Claude Code)
para produzir as entregas de três disciplinas?

## 7.1 Contexto

- O repositório nasceu em **12/09/2026**. Até **15/09/2026** já reunia as entregas de Engenharia de
  Software II e Banco de Dados I, em 5 PRs [R-01].
- O trabalho foi feito com **agentes de LLM guiados por arquivos de instrução** (`CLAUDE.md` na raiz e
  em cada matéria), todos com a regra explícita **"Nunca inventar dados… perguntar em vez de assumir"**
  [R-02].
- Nas estimativas da disciplina, o Unespão foi avaliado em (A-05 s14; A-06 s6):

  | Método | Custo | Prazo |
  |---|---|---|
  | Experiência | R$ 200.000 | 6 meses |
  | EAP | R$ 293.000 | 4 meses |
  | COCOMO II | R$ 356.000 | 11 meses |
  | Story Points | R$ 60.000 | 2 meses |

## 7.2 O que funcionou

| Prática | Evidência no repo | Conceito de GP / pesquisa |
|---|---|---|
| **Contexto escrito e versionado** (`CLAUDE.md` por matéria, `produto/` como fonte única de domínio) | [R-02] | Controle antecipado / spec [F-36]; *team charter* (A-08 s71) |
| **Revisão em papéis separados** (Redator → PO → Avaliador em ESII; Modelador → DBA → Avaliador em BD1) | [R-02][R-05] | Garantia da qualidade (A-09) |
| **Portão executável**: o `.sql` precisa rodar em MySQL limpo após toda edição | [R-05] | Controle de retorno [F-36]; "não confiar em 'parece pronto'" (A-10 s14) |
| **Auditoria que achou invenções** antes da banca | [R-03] | Monitoramento e controle (A-10) |
| **Decisão de não fazer**: 6 agentes independentes avaliaram o tour de BD1 e recomendaram **não** construir | [R-06] | Escopo negativo, *scope creep* (A-03 s73) |

## 7.3 O que não funcionou

| Problema | Evidência no repo | Conceito de GP / pesquisa |
|---|---|---|
| **Conteúdo fabricado com aparência de real.** O tour guiado gerado inventou um capítulo "Glossário" inexistente, versões v0.5/v0.8, o exemplo "Issue #12" e uma rede de padarias que contradiz os documentos | [R-03] | Alucinação; "quase certo" [F-23] |
| **Código morto com invenções ficou no repositório** (`guidedTourData.ts`, sem nenhum import) | [R-04] | Caso Knight Capital (A-07 s22) |
| **Contexto desatualizado.** O `CLAUDE.md` e o `README` da raiz ainda diziam que só havia ESII, depois que BD1 entrou | Corrigido nesta entrega (ver ADR-0001) | O contexto também é artefato que precisa de manutenção [F-36] |
| **Trabalho concentrado.** Commits de 2 dos 4 membros, com identidades git inconsistentes | [R-07] | Estrutura *chief programmer*, risco de dependência de pessoas-chave (A-08 s31–s39) |

## 7.4 Pergunta de estimativa para a turma

As estimativas do Unespão variaram de **R$ 60 mil a R$ 356 mil** (A-06 s6). COCOMO II parte de KLOC.
Se o LLM gera KLOC quase de graça, o esforço real está em **especificar e validar** [F-38]. **Qual
método vocês ajustariam, e como?** (Pergunta aberta; não há resposta validada em estudo de campo.)

## 7.5 Mensagem para o slide

> Os três problemas que a pesquisa global aponta (**invenção plausível, código que ninguém revisa e
> contexto desatualizado**) aconteceram conosco em **4 dias** (12–15/09/2026). O que nos salvou foram práticas de
> gestão, não um modelo melhor: **contexto escrito, papéis de revisão, portões executáveis e decisão
> explícita de escopo**.
