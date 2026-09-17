<!-- Última atualização: 2026-09-17 -->

# 01 — O que é: LLM no desenvolvimento de software

Critério atendido: **C1**. Tempo no roteiro: ~3 min.

## 1.1 Em uma frase

Um **LLM** (Large Language Model) é um modelo treinado para prever a próxima parte de um texto. Como
código também é texto, o mesmo mecanismo passa a **ler, escrever, explicar e modificar software**. A
arquitetura que tornou isso viável em escala é o **Transformer** [F-01], e o primeiro modelo treinado
especificamente em código público a virar produto foi o **Codex** [F-02].

## 1.2 Três modos de uso (o eixo da aula)

| Modo | O que o humano faz | O que o LLM faz | Exemplo |
|---|---|---|---|
| **Completar** | Escreve o código; aceita ou rejeita sugestões | Sugere a próxima linha ou função | GitHub Copilot original [F-03] |
| **Conversar** | Descreve o problema; copia e cola | Responde, explica, gera trechos | ChatGPT [F-05] |
| **Delegar (agente)** | Define objetivo, contexto e critério de pronto; revisa o resultado | Planeja, edita vários arquivos, executa comandos e testes em loop | Devin [F-07], Claude Code [F-09] |

A diferença que importa para **Gestão de Projetos** é quem controla o laço de execução. No modo
agente, o humano deixa de executar e passa a **especificar, supervisionar e aceitar**, que são tarefas
clássicas de gestão. Em uso real do Claude Code, 79% das conversas foram classificadas como
**automação** (delegação), contra 49% no chat Claude.ai [F-32].

## 1.3 Conceitos que aparecem no resto da aula

- **Contexto.** Tudo o que o modelo "vê" numa interação: pedido, arquivos, instruções do projeto,
  resultados de ferramentas. Sem contexto, o modelo preenche lacunas com o que é plausível, e é aí que
  nasce a invenção (ver caso Unespão em `07`).
- **Alucinação.** Saída plausível e falsa. Em código tem consequência concreta, por exemplo pacotes que
  não existem sugeridos como dependência [F-28].
- **Protocolos de ferramentas.** Padrões como o MCP (Model Context Protocol) conectam o modelo a
  sistemas externos: repositórios, tickets, bancos de dados [F-08].
- **Benchmark.** Conjunto de tarefas para medir o modelo:
  - **HumanEval:** funções isoladas [F-02].
  - **SWE-bench:** issues reais de repositórios GitHub [F-06].
- **"Vibe coding".** Gerar software aceitando o que o modelo produz, sem ler o código. O termo foi
  cunhado por Andrej Karpathy e eleito palavra do ano 2025 pelo Collins [F-10]. Só 11,9% dos
  respondentes do Stack Overflow 2025 disseram que isso faz parte do trabalho profissional; 72,2%
  disseram que não [F-23].

## 1.4 Mensagem para o slide

> LLM no desenvolvimento não é "uma ferramenta de autocompletar melhor". É uma mudança de **quem
> executa** o trabalho, e isso transforma programação em **gestão de trabalho delegado**.
