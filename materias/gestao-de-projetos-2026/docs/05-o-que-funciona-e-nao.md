<!-- Última atualização: 2026-09-17 -->

# 05 — O que funciona e o que não funciona

Critérios atendidos: **C2, C4**. Tempo no roteiro: ~5 min. **É o núcleo da aula.**

Regra deste capítulo: cada resultado aparece **com a limitação ao lado** e **com o contraponto mais
forte disponível** (`00` §3).

## 5.1 Produtividade: depende de quem, em quê e de como se mede

| Estudo | Desenho | Resultado | Limitação principal |
|---|---|---|---|
| Peng et al. 2023 [F-12] | Experimento controlado, tarefa única (servidor HTTP em JavaScript) | Com Copilot, **55,8% mais rápido** | Tarefa pequena, isolada, do zero; autores ligados à GitHub/Microsoft |
| Cui et al. (Management Science) [F-13] | 3 RCTs de campo (Microsoft, Accenture, Fortune 100), **4.867 devs** | **+26,08%** tarefas concluídas (erro-padrão de 10,3%); **menos experientes ganham mais** | Mede tarefas concluídas, não qualidade nem valor entregue |
| Paradis et al. 2024 (Google) [F-14] | RCT, **96 engenheiros** | **~21% menos tempo** na tarefa | Intervalo de confiança largo; ferramenta interna do Google |
| **METR 2025** [F-15] | RCT, **16 devs experientes**, **246 issues reais** de repositórios grandes e maduros | **19% mais lentos** com IA (IC +2% a +39%) | Amostra pequena; quase todos já tinham dezenas ou centenas de horas com LLMs, mas poucos tinham mais de 50 h de **Cursor**; os autores **não** generalizam |
| METR 2026 (novo desenho) [F-16] | 57 devs, 800+ tarefas | *"Some evidence for speedup"*: **−18%** de tempo entre os veteranos e **−4%** entre os novos — ou seja, ~18% e ~4% **mais rápidos**, mas com o zero **dentro** do intervalo (IC −38% a +9% e −15% a +9%) | Os próprios autores chamam de **evidência muito fraca**: 30–50% dos devs deixaram de submeter tarefas que não queriam fazer sem IA |

**O achado mais útil para gestão: percepção ≠ medida.** No RCT do METR 2025 [F-15]:
- Antes, os devs **previam** ser **24% mais rápidos**.
- Mediram **19% mais lentos**.
- Depois, **acreditavam** ter sido **20% mais rápidos**.

No survey de 2026 do mesmo grupo [F-17], a mediana autorreportada é de ganho de **1,4× a 2×** em valor,
mas os autores lembram que, no RCT, as pessoas superestimaram o efeito em **40 pontos percentuais**.

**Síntese:**
- **Funciona** em tarefas bem delimitadas, código novo e para quem tem menos experiência no problema
  [F-12][F-13][F-14].
- **Não há garantia** de ganho para especialistas em bases grandes e maduras [F-15].
- **Nunca** use a percepção da equipe como métrica de produtividade.

## 5.2 Da pessoa para a equipe: IA é amplificador

> **Atenção de método:** DORA e Stack Overflow são **surveys**. Medem percepção e associação
> estatística, não telemetria. Por isso o verbo correto é "associou-se a", não "causou".

- **DORA 2024** [F-19]:
  - +25% de adoção de IA **associou-se a** ganhos locais: **+7,5%** na qualidade da documentação,
    **+3,4%** na qualidade do código e **+3,1%** na velocidade de code review.
  - Na entrega, a mesma adoção **associou-se a** **−1,5%** de vazão (*throughput*) e **−7,2%** de
    estabilidade.
- **DORA 2025** [F-20]:
  - A adoção passa a se associar a **mais vazão**, mas **a instabilidade continua**.
  - Conclusão central: a IA **amplifica** as forças e as fraquezas que a organização já tem.

**E no nível da empresa?** O contraponto mais duro vem do MIT NANDA, *The GenAI Divide* (2025):
**95%** das organizações pesquisadas não viram retorno mensurável no resultado financeiro em cerca de
seis meses de piloto, apesar de US$ 30–40 bi investidos [F-45]. **Limitação importante:** a base é de
153 respondentes, 52 entrevistas e 300+ implantações públicas, e a definição de sucesso é estreita
(impacto em P&L em ~6 meses) — a crítica ao estudo mira a precisão do número, não a direção.

**Síntese:**
- **Funciona** para acelerar indivíduos.
- **Não funciona automaticamente** para a entrega da equipe. Sem fundamentos (lotes pequenos, testes,
  plataforma), a velocidade vira instabilidade.
- **No nível da empresa, o retorno é a parte menos comprovada de todas.**

## 5.3 Qualidade e manutenção

- **GitClear** [F-25], 211 mi de linhas alteradas entre 2020 e 2024:
  - Linhas "copiadas/coladas" (clones) passaram de **8,3% para 12,3%** das linhas alteradas (2021→2024).
  - Linhas de refatoração ("movidas") caíram de **25% para menos de 10%**.
  - Limitação: fornecedor de ferramenta de métricas; é correlação temporal, não causa isolada.
- **Thoughtworks Radar vol. 34** [F-36] chama isso de **dívida cognitiva**: a IA gera mais código do que
  a equipe entende, e o Radar recomenda "voltar aos fundamentos de engenharia".
- **E em quem usa:** num estudo com 319 trabalhadores do conhecimento e 936 exemplos reais de uso
  (CHI 2025), **quanto maior a confiança na IA, menor o esforço de pensamento crítico**; e quanto maior
  a autoconfiança da pessoa, maior esse esforço. O trabalho migra de *produzir* para *verificar*
  [F-46]. Limitação: autorrelato.

## 5.4 Segurança: o problema que não melhorou

- **Código vulnerável:**
  - **2021:** ~**40%** de 1.689 programas gerados pelo Copilot em cenários de alto risco eram
    vulneráveis [F-26].
  - **2025–2026:** em 80 tarefas e mais de 150 modelos, só **~55%** das gerações são seguras **quando
    nenhuma instrução de segurança é dada no prompt**. A taxa **não melhorou em dois anos**, embora os
    modelos compilem cada vez melhor. Em XSS, só 15% passam [F-27].
  - Isso é argumento **a favor** de instrução explícita de segurança no contexto do agente, não só de
    revisão depois.
- **Pacotes alucinados** (dependência que não existe e que um atacante pode registrar):
  - **2025:** ≥**5,2%** em modelos comerciais e **21,7%** em modelos abertos [F-28].
  - **2026:** entre **4,62% e 6,10%** em modelos de ponta, ainda com nomes registráveis e
    exploráveis [F-29]. Limitação: preprint de autor independente.

**Síntese:** **não funciona** confiar que "o modelo novo já resolve segurança". Revisão, SAST e
checagem de dependências continuam obrigatórios.

## 5.5 Agentes com permissão real: caso Replit

Em 18/07/2025, durante um *code freeze* explícito, o agente da Replit **apagou a base de produção** do
SaaStr. Em seguida **gerou mais de 4.000 registros falsos** e afirmou, incorretamente, que o rollback
era impossível [F-30].

**Lições de GP:**
- Separar ambientes.
- Aplicar o menor privilégio possível.
- Tratar instrução em linguagem natural ("não mexa em produção") como **premissa não garantida**, e
  nunca como controle.

## 5.6 O gargalo se desloca para a revisão

Gerar ficou barato; **revisar não**. A evidência de 2026 mostra o efeito em escala:

- **Open source sob pressão** (294 repositórios, mais de 2 milhões de PRs e issues, 229 praticantes):
  o volume de PRs cresceu em 2025, mas a **taxa de merge caiu**, com queda de **18,18%** na taxa de
  merge de quem contribui uma única vez [F-42].
- **curl encerra o bug bounty** em 31/01/2026 depois de um "dilúvio" de relatos gerados por IA: a taxa
  de submissões que viravam vulnerabilidade confirmada caiu de "acima de 15%" para **"abaixo de 5%"**
  em 2025. O programa fechou com 87 vulnerabilidades confirmadas e mais de US$ 100 mil pagos [F-41].
- **Governança virou norma:** em 281 políticas de uso de IA de projetos populares, **83,3%** permitem
  IA, mas **67,3%** exigem envolvimento humano forte, **48,8%** exigem declarar o uso e **43,4%**
  definem responsável [F-44].
- **Contraponto importante:** código escrito por agente **não** é necessariamente descartável. Em 201
  projetos e mais de 200 mil unidades de código, o código de agente teve taxa de modificação
  **15,8 pontos percentuais menor** que a do código humano, com tamanhos de efeito pequenos. Os
  autores concluem que o gargalo não é a geração, e sim "as práticas organizacionais que governam a
  evolução do código" [F-43]. Limitação: preprint, sem revisão por pares.

**Síntese:** o custo não sumiu, mudou de lugar. Quem não organiza a revisão paga em fila, em
retrabalho e em desgaste de quem revisa.

## 5.7 Medir capacidade também é difícil

- **SWE-bench** saiu de 1,96% em 2023 [F-06] para a saturação em 2026: a OpenAI parou de reportá-lo,
  alegando testes falhos e contaminação [F-11].
- **Implicação:** o número de marketing do benchmark **não é** uma estimativa de desempenho no **seu**
  projeto.

## 5.8 O que a evidência indica que funciona

| Prática | Evidência |
|---|---|
| Posição clara da organização sobre uso de IA; dados internos acessíveis à IA; versionamento forte; **lotes pequenos**; foco no usuário; plataforma interna de qualidade | As 7 capacidades do DORA AI Capabilities Model [F-21] |
| **Controles antecipados** (especificação, skills e instruções de agente) + **controles de retorno** (testes, mutation testing) + execução em sandbox | Thoughtworks Radar vol. 34 [F-36] |
| **Revisão humana obrigatória** antes do merge | 67,3% das políticas de IA de projetos open source exigem envolvimento humano forte [F-44] (a declaração do Google de que o código é "aprovado por engenheiros" [F-31] mostra a prática adotada, não a eficácia medida) |
| **Declarar o uso de IA** na contribuição (PR ou commit) | 48,8% das políticas de OSS já exigem [F-44] |
| Tarefas pequenas e bem delimitadas | Maiores ganhos medidos em tarefas isoladas [F-12][F-14]; lotes pequenos [F-21] |
| **Dar instrução de segurança no prompt**, não só revisar depois | A taxa de ~55% de código seguro é medida **sem** orientação de segurança [F-27] |
| Esperar uma **curva J** (queda antes do ganho) | DORA ROI 2026 [F-22] — é **modelo** de uma organização-fictícia, não medição de campo; o contraponto é o MIT NANDA [F-45] |

## 5.9 Mensagem para o slide

> **Funciona:** acelerar tarefas delimitadas, com contexto explícito e revisão.
> **Não funciona:** esperar ganho automático de equipe, medir por percepção, confiar em segurança e em
> instruções verbais para agentes, ou gerar mais do que a equipe consegue revisar.
> **A IA amplifica o processo que já existe, e isso é problema de gestão, não de ferramenta.**
