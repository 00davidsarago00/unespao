<!-- Última atualização: 2026-09-17 -->

# 02 — Análise histórica

Critério atendido: **C2**. Tempo no roteiro: ~3 min.

> **Alimenta:** **Bloco 1 — As origens (1948–2016)** e **Bloco 2 — O Transformer (2017–2022)**. A linha do tempo se parte nesses dois blocos, não é apresentada inteira de uma vez.

## 2.1 Linha do tempo

| Data | Marco | Por que importa | Fonte |
|---|---|---|---|
| 06/2017 | Artigo do **Transformer** (*Attention Is All You Need*) | Arquitetura que viabiliza os LLMs atuais | [F-01] |
| 06/2021 | **GitHub Copilot** em preview técnico | Primeiro assistente de código com LLM em larga escala | [F-03] |
| 07/2021 | **Codex / HumanEval**: 28,8% dos problemas resolvidos com 1 tentativa, 70,2% com 100; GPT-3 resolvia 0% | Nasce a medição de "capacidade de programar" | [F-02] |
| 06/2022 | Copilot em disponibilidade geral (pago) | Vira produto comercial | [F-04] |
| 11/2022 | **ChatGPT** lançado; ~100 mi de usuários em ~2 meses (estimativa UBS) | Modo "conversar" chega ao público geral | [F-05] |
| 02/2023 | Experimento do Copilot: grupo com IA conclui a tarefa **55,8% mais rápido** | Primeiro número de produtividade amplamente citado | [F-12] |
| 10/2023 | **SWE-bench** (issues reais do GitHub): o melhor modelo resolve **1,96%** | Mostra o abismo entre função isolada e projeto real | [F-06] |
| 03/2024 | **Devin**, anunciado como "engenheiro de software autônomo" | Início da narrativa de agentes | [F-07] |
| 11/2024 | **MCP** aberto como padrão de conexão modelo ↔ ferramentas | Contexto e ferramentas viram infraestrutura | [F-08] |
| 2024–2025 | **Cui et al.**: 3 RCTs de campo com **4.867 devs** (Microsoft, Accenture, Fortune 100) medem **+26,08%** de tarefas concluídas | A maior amostra experimental disponível — e favorável | [F-13] |
| 02/2025 | Termo **"vibe coding"**; Claude Code em preview | Delegação total entra no vocabulário | [F-10][F-09] |
| 05/2025 | Claude Code em disponibilidade geral | Agentes no terminal/IDE para uso diário | [F-09] |
| 07/2025 | **RCT do METR**: devs experientes **19% mais lentos** com IA | Primeiro contraponto experimental forte, com só **16 devs** | [F-15] |
| 07/2025 | **Incidente Replit**: agente apaga base de produção durante *code freeze* | Risco operacional de agentes vira caso público | [F-30] |
| 11/2025 | "Vibe coding" é palavra do ano do Collins | Fenômeno cultural, não só técnico | [F-10] |
| 02/2026 | OpenAI deixa de reportar SWE-bench Verified (saturação e contaminação) | Benchmarks não acompanham a capacidade dos modelos | [F-11] |
| 04/2026 | Google afirma que **75% do código novo** é gerado por IA **e aprovado por engenheiros** (50% no outono anterior) | Escala industrial, com revisão humana declarada | [F-31] |

## 2.2 Leitura em fases

1. **Completar (2021–2022).** O LLM é um autocompletar sofisticado. O humano segue no controle linha a
   linha. A métrica típica é "% de sugestões aceitas".
2. **Conversar (2022–2024).** O chat traz explicação, geração de trechos e depuração assistida. O
   gargalo passa a ser copiar, colar e validar.
3. **Delegar (2024–hoje).** Agentes editam vários arquivos e executam comandos. O gargalo passa a ser
   **especificar, dar contexto e revisar**. Os riscos passam a ser operacionais (ex.: [F-30]).

**Padrão que atravessa as fases.** Cada salto de capacidade veio com um salto de **promessa** maior que
a evidência disponível na época:
- Em 2023, o dado de referência era "55,8% mais rápido" em uma tarefa isolada [F-12].
- Em 2025, o primeiro RCT em repositórios maduros mediu desaceleração [F-15].

Essa diferença entre expectativa e medição é o fio condutor para `05` e `06`.
