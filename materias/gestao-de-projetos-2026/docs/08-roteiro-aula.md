<!-- Última atualização: 2026-09-17 -->

# 08 — Roteiro da aula (20–25 min)

**Espinha:** `../material-base/Material-base.pdf`, produzido por outro membro do grupo e adotado como
estrutura oficial em 2026-09-17. Este arquivo é a **versão operacional** dele: mesma estrutura de 5
blocos, com os números substituídos pelos **verificados** e com o status de cada alegação em
`09-verificacao-material-base.md`.

- **5 blocos, 5 apresentadores, alvo de 23 min** (janela de 20–25).
- **Material de apoio:** arquivo HTML único, offline, com uma demo funcional por bloco e mudança de
  estética por era. O deck do Canva (`../slides/roteiro-slides-canva.md`) passa a ser **plano B**.
- **Regra de ouro:** nada depende de rede, API ou CDN na hora da apresentação.

## Estrutura

| # | Bloco | Apresentador | Tempo | Demo que fecha | Conceitos de GP |
|---|---|---|---|---|---|
| — | Abertura e tese | a definir (GP-03) | 1 min | — | — |
| 1 | 1948–2016: a ideia é velha, faltava escala | a definir | 4 min | ELIZA com painel de regras | Estimativa e expectativa (Aulas 2 e 5) |
| 2 | 2017–2022: o Transformer, e por que código caiu primeiro | a definir | 3 min | Tokenizador + mapa de atenção | Business case e valoração, TAP (Aulas 2 e 3) |
| 3 | Hoje I: a IA não está só na implementação | a definir | 5 min | Agente resolvendo uma issue | EAP, Brooks, Lei dos 90-90 (Aulas 3, 5 e 6) |
| 4 | Hoje II: +26%, −19% e o gargalo que mudou de lugar | a definir | 5 min | Simulador de gargalo | EVA/SPI/CPI, burndown, QA × QC, Goodhart (Aulas 9 e 10) |
| 5 | 2027+: a curva, os cenários e como se preparar | a definir | 4 min | Extrapolador da curva METR | Matriz de riscos, apetite/tolerância/exposição, governança (Aulas 7 e 10) |
| — | Fecho e volta à Aula 1 | a definir | 1 min | — | Viés algorítmico como falha de engenharia |
| | **Total** | | **23 min** | | |

**Pergunta que organiza os 23 minutos:** *quando a capacidade de gerar software aumenta, qual passa a
ser o novo gargalo do projeto?*

## Números por bloco — versão verificada

Só entram números com status ✅ ou ⚠️ em `09-verificacao-material-base.md`. Onde o material-base traz
valor diferente, **vale o daqui**.

### Bloco 1 — origens
- Georgetown-IBM (1954): 250 itens de vocabulário e 6 regras; ALPAC (1966) encerra o ciclo. ◐ —
  histórico, baixo risco.
- Shannon (1948/1951), Turing (1950), ELIZA (1966): narrativa, sem número crítico.
- **Falar:** "tudo que vocês vão ver começa com uma ideia de 1948: prever o próximo símbolo contando o
  que veio antes."

### Bloco 2 — o Transformer
- *Attention Is All You Need* (jun/2017) [F-01].
- SWE-bench (2023): o melhor modelo resolvia **1,96%** das issues reais [F-06]. **Marco histórico,
  nunca retrato de hoje.**
- Tabela LLM × assistente × agente — é o slide conceitual central.

### Bloco 3 — o ciclo de vida
- GitHub migrou o runtime do Copilot para **mais de 800 mil linhas de Rust**, em **128 PRs**, com
  agentes escrevendo a maior parte [F-52]. **Dizer em voz alta que é relato de primeira parte.**
- Ligação com a disciplina: recusaram o *big bang rewrite* (risco, Aula 7); main sempre entregável
  (cadência, Aula 3); E2E a cada etapa (quality gate, Aula 9).
- Lei dos 90-90 e Lei de Brooks: a pergunta é se um agente "conta como adicionar gente a um projeto
  atrasado". Deixar em aberto — não há estudo controlado sobre isso.
- PNR: comprimir o prazo em 25% custa **+216% de esforço** (exercício da Aula 6).

### Bloco 4 — a evidência (o ponto alto)
- **Cui et al.**: **+26,08%** de tarefas concluídas, **4.867 devs**, 3 RCTs de campo, *Management
  Science* [F-13].
- **METR 2025**: **19% mais lentos**, **16 devs**, 246 issues reais [F-15].
- **O detalhe que ninguém cita:** previram **+24%**, mediram **−19%** e depois achavam **+20%**
  [F-15]. Em fev/2026 a própria METR mudou o desenho por viés de seleção: **30–50%** dos devs evitavam
  submeter tarefas em que a IA ajudaria mais [F-16].
- **DORA**: **35–40% em greenfield** contra **~10% ou menos em legado** [F-22]. É o que reconcilia os
  dois estudos.
- **DORA 2024**: **+7,5%** documentação, **+3,4%** qualidade, **+3,1%** review — e, ao mesmo tempo,
  **−1,5%** de vazão e **−7,2%** de estabilidade [F-19]. Dizer "associou-se a", não "causou": é survey.
- **GitClear**: refatoração de **21% (2022) para 3,8% (2026)**; duplicação **+81%** desde 2023 [F-25].
- **Stack Overflow 2025**: uso em **84%**; **32,7%** confiam (só 3,1% "confiam muito") contra **45,7%**
  que desconfiam; **66%** frustrados com código "quase certo" [F-23]. ⚠️ **não** usar "43% → 33%".
- **ROI**: o modelo do relatório dá ~39% no primeiro ano; os **727%** são relato de clientes em 3 anos
  [F-22]. Tratar como marketing, e dizer isso.
- **Segurança em projetos reais:** 733 trechos atribuídos a assistentes, com falhas em **29,5%**
  (Python) e **24,2%** (JavaScript) [F-53].

### Bloco 5 — futuro
- Horizonte de tarefa: duplicação a cada **195,8 dias** na série completa, **130,8** desde 2023 e
  **88,6** desde 2024 [F-50]. Claude Opus 4.5 em **320 min** (IC 170–729) [F-50].
- ◐ **Opus 4.6 em ~14,5 h** e a frase "acima de 16 h não sabemos medir": não confirmados. Dizer "mais
  de 12 horas, dependendo da medição" e "a própria METR documenta limites de confiabilidade".
- ❌ Metaculus (jun/2031) e NBER (12,6–14%): **não citar números**. Falar de cenários sem previsão
  numérica.
- Stanford/ADP: 22–25 anos em ocupações expostas **~19% abaixo** dos pares, por **redução de
  contratação**; os autores dizem que **não é estimativa causal** [F-33].
- ◐ BLS (+15,8%, +267.700 vagas): conferir antes, ou dizer só "projeção oficial de crescimento".
- **PMI** publicou em **09/06/2026** o primeiro padrão de IA aprovado pela ANSI para a profissão, com
  human-in-the-loop no centro [F-51].
- Governança escrita com as palavras da Aula 7: **apetite**, **tolerância**, **exposição**. E a
  declaração de uso de IA como item do **Termo de Aceite** (Aula 10).

## Cobertura dos critérios

| Critério | Onde |
|---|---|
| C1 — o que é o tópico | Bloco 2 (tabela LLM × assistente × agente) |
| C2 — profundidade | Bloco 4 inteiro, mais o registro de fontes e a auditoria `09` |
| C3 — conexão com GP | Fecho de cada bloco, com a terminologia exata das aulas |
| C4 — casos reais | Georgetown-IBM, ELIZA, Knight Capital, migração do Copilot para Rust, Replit |
| C5 — material de apoio | Cinco demos funcionais e a mudança de estética por era |
| C6 — comunicação e tempo | Corte de emergência por bloco e três ensaios (GP-03) |

## Corte de emergência (na ordem)

1. Bloco 1: cortar o gerador n-grama, manter ELIZA.
2. Bloco 2: cortar o mapa de atenção, manter a tabela conceitual.
3. Bloco 3: cortar Brooks e PNR, manter a EAP.
4. Bloco 5: cortar a tabela de cenários, manter a curva e o modo cético.
5. Bloco 4: **não cortar.** É o que decide o critério de profundidade.

## O que o nosso material acrescenta à espinha

Três coisas que o PDF não tem e que valem no critério de profundidade:
1. **Percepção ≠ medida** como conceito nomeado, e não só como curiosidade do estudo do METR.
2. **O gargalo da revisão medido fora do nosso umbigo:** queda de 18,18% na taxa de merge de quem
   contribui uma vez só em open source [F-42] e o curl encerrando o bug bounty [F-41].
3. **O caso Unespão** (`07-caso-unespao.md`): os três problemas globais reproduzidos em 4 dias. Cabe
   como fecho do bloco 3 ou como resposta na seção de perguntas.

## O que ainda depende do grupo

- **Quem fica com cada bloco** (GP-03). Sugestão do material: o bloco 4 vai para quem estiver mais
  confortável com números; o bloco 1, para quem gosta de contar história.
- **Demo com issue real do repositório** (`00davidsarago00/unespao`) no bloco 3: rodar ao vivo ou
  gravar a sessão e reproduzir como JSON.
- **Pendências ◐ e ❌** de `09`: se ninguém conferir até a apresentação, a fala vai **sem** o número.
