<!-- Última atualização: 2026-09-17 -->

# 09 — Auditoria de verificação do Material-base

O `material-base/Material-base.pdf` é a espinha do seminário (decisão de 2026-09-17). Este documento é
a camada que falta nele: **o que pode ser dito como fato, o que precisa de ressalva e o que não deve
ser dito**. Todas as verificações foram feitas em 2026-09-17, indo à fonte.

**Status:**
- ✅ **Confirmado** — conferido na fonte; pode ser afirmado como está.
- ⚠️ **Confirmado com ajuste** — o fato é real, mas o número ou a formulação precisa mudar.
- ◐ **Parcial** — parte confere, parte não foi encontrada. Dizer com ressalva.
- ❌ **Não confirmado** — não achamos a fonte. **Não afirmar.**

## 1. As alegações de maior impacto

| # | Alegação do material | Status | O que dizer na apresentação |
|---|---|---|---|
| 1 | GitClear: refatoração cai de **21% (2022) para 3,8% (2026)**; duplicação **+81%** desde 2023 | ✅ | Pode dizer. É a edição *The Maintainability Gap* (623 mi de mudanças, 2023–2026) [F-25]. **Mais atual que o número que usávamos antes** (edição 2025) |
| 2 | DORA: **35–40% de ganho em greenfield** contra **~10% ou menos em código legado** | ✅ | Pode dizer. É o dado que sustenta "depende fortemente do contexto" [F-22] |
| 3 | DORA: **ROI médio de 727%** | ⚠️ | Dizer que **clientes do Google Cloud relatam** 727% em 3 anos, e que o modelo do próprio relatório dá ~39% no primeiro ano. O material já trata como marketing — manter esse enquadramento [F-22] |
| 4 | Cui et al.: **+26,08%** de tarefas concluídas, 4.867 devs, *Management Science* | ✅ | Pode dizer. Erro-padrão de 10,3% [F-13] |
| 5 | METR: **19% mais lentos**, 16 devs; previram +24% e acharam +20% depois | ✅ | Pode dizer, com o n=16 junto [F-15] |
| 6 | METR mudou o desenho em fev/2026 por viés de seleção; **30–50%** evitaram submeter tarefas | ✅ | Pode dizer [F-16] |
| 7 | METR: duplicação do horizonte em **196,5 / 130,8 / 88,6 dias** | ⚠️ | A fonte primária (Time Horizon 1.1) traz **195,8** dias na série completa, 130,8 desde 2023 e 88,6 desde 2024. Usar 195,8 [F-50] |
| 8 | Claude Opus 4.5 com **320 min** de horizonte de 50% | ✅ | Pode dizer; intervalo de 170 a 729 min [F-50] |
| 9 | Claude Opus 4.6 com **~14,5 h** (870 min), em fev/2026 | ◐ | A página consultada não traz esse valor, e há cobertura secundária divergente (~12 h e ~14 h). **Dizer "mais de 12 horas, dependendo da medição"**, ou omitir o modelo |
| 10 | Aviso da METR: **"medições acima de 16 h não são confiáveis"** | ◐ | Não localizei essa frase na página. Ou mostrar a captura da fonte, ou trocar por: *"a própria METR documenta limites de confiabilidade nas tarefas mais longas"* |
| 11 | GitHub migrou o runtime do Copilot para **mais de 800 mil linhas de Rust**, **128 PRs**, agentes escreveram a maior parte | ✅ | Pode dizer. É relato de primeira parte do GitHub — o material já diz isso, mantenha [F-52] |
| 12 | Migração com **135 releases em ~14,5 semanas**, "um desenvolvedor em alguns meses" | ◐ | O volume e os 128 PRs conferem; esses dois detalhes não foram conferidos na fonte. Dizer sem o número de releases, ou conferir no post antes |
| 13 | **PMI — Standard for AI in PPPM**, jun/2026, primeiro padrão de IA aprovado pela ANSI para a profissão | ⚠️ | Publicado em **09/06/2026**, ANSI-approved, **quase 300 páginas** (o material diz 275). Ajustar para "quase 300" [F-51] |
| 14 | Estudo de segurança: **733 trechos**, weaknesses em **29,5% (Python)** e **24,2% (JavaScript)**, 43 categorias CWE | ✅ | Pode dizer. É Fu et al., em projetos reais do GitHub [F-53] |
| 15 | Stack Overflow: uso **84%**, confiança **caindo de 43% para 33%**, **66%** frustrados com código "quase certo" | ⚠️ | Uso e 66% conferem. Sobre confiança, a fonte primária de 2025 dá **3,1% "confia muito" + 29,6% "confia um pouco" = 32,7%**, contra **45,7%** que desconfiam. Usar esses números, não "43% para 33%" [F-23] |
| 16 | DORA 2024: **+7,5%** documentação, **+3,4%** qualidade, **+3,1%** review, **−1,5%** vazão, **−7,2%** estabilidade | ✅ | Pode dizer — mas como **associação**, não causa: são coeficientes sobre survey [F-19] |
| 17 | Stanford/ADP: 22–25 anos em ocupações expostas **~19% abaixo** dos pares | ✅ | Pode dizer, com a ressalva que o próprio material já traz: **não é estimativa causal** [F-33] |
| 18 | BLS: **+15,8%** e **+267.700 vagas** para desenvolvedores na década | ◐ | A direção (crescimento) é conhecida, mas não conferi o número na fonte do BLS. **Conferir antes de projetar, ou dizer só "projeção oficial de crescimento de dois dígitos"** |
| 19 | SWE-bench Verified **saturou em ~95%**; SWE-bench Pro caiu para **~23%** e um ano depois **61,5%** | ◐ | A saturação e a troca por SWE-bench Pro estão confirmadas [F-11]; os três percentuais **não** foram conferidos em fonte primária. Falar da saturação sem citar os números, ou conferir antes |
| 20 | Metaculus projeta AGI em **jun/2031**; NBER dá **12,6–14%** ao cenário rápido até 2030 | ❌ | Não conferido. **Não afirmar.** Se quiser manter o bloco de cenários, apresentar como "previsões de mercados de previsão, que variam muito" sem números |
| 21 | Hindle et al. (2012): código tem **2–4 bits de entropia** contra ~8 da prosa; autocomplete economizava **61%** de teclas | ◐ | O artigo (*On the Naturalness of Software*, ICSE 2012) existe e sustenta a tese da previsibilidade. Os dois números não foram conferidos. Dizer a tese sem os números, ou conferir |
| 22 | Georgetown-IBM (1954): **250 itens de vocabulário, 6 regras**; ALPAC (1966) | ◐ | Amplamente documentado e coerente com a literatura histórica, mas não conferido por nós. É baixo risco: um erro aqui não muda a tese |
| 23 | XCON economizou **~US$ 40 mi** para a DEC | ◐ | Idem: histórico, amplamente citado, não conferido |
| 24 | Knight Capital: **US$ 460 mi em 45 min** | ✅ | Está nos slides do professor (Aula 7, s22) — fonte da própria disciplina |
| 25 | Curva PNR: comprimir o prazo em 25% custa **+216% de esforço** | ✅ | Vem do exercício da Aula 6. Citar como "o exercício da aula" |

## 2. Divergências entre o material e o que já estava escrito aqui

| Tema | Material-base | O que tínhamos | Resolução |
|---|---|---|---|
| GitClear | 21% → 3,8%; duplicação +81% (edição 2026) | 25% → <10%; clones 8,3% → 12,3% (edição 2025) | **O material está mais atual.** `05` §5.3 atualizado |
| Contexto do ganho | 35–40% greenfield × ~10% legado | "depende do desenho do estudo", sem número | **O material acrescenta.** `05` §5.1 atualizado |
| Confiança (Stack Overflow) | 43% → 33% | 32,7% confiam × 45,7% desconfiam (primária) | **O nosso está correto.** Usar o nosso |
| METR 2026 | "os autores revisaram o desenho por viés de seleção" | idem, com os intervalos | Iguais. Manter os intervalos, que o material não traz |
| Horizonte de tarefa | 88,6 dias; Opus 4.6 em 14,5 h | "dobra a cada ~7 meses" (paper de mar/2025) | **O material está mais atual** na série; o valor do Opus 4.6 fica com ressalva |

## 3. O que o material tem e nós não tínhamos

Vale registrar, porque é o que ele agrega de verdade:
1. **Amarração fina com as aulas** — QA × QC (Aula 9), EVA/SPI/CPI e o BAC obsoleto (Aula 10),
   Goodhart (Aula 9, slide sem desenvolvimento), Lei dos 90-90 (Aula 6), apetite/tolerância/exposição
   (Aula 7), Termo de Aceite com declaração de uso de IA (Aula 10).
2. **Demos funcionais** como material de apoio (critério C5), uma por bloco.
3. **Seção de perguntas prováveis** com resposta curta e numérica.
4. **Matriz de risco da própria apresentação**, com plano de resposta.
5. **Plano de ensaio em três passadas** com objetivos distintos.

## 4. Regra para amanhã

Se um número estiver marcado ❌ ou ◐ e ninguém tiver conferido até a hora da apresentação, **a fala
correta é a versão sem o número**. A tese do seminário não depende de nenhum dos números pendentes, e
um número errado na frente da banca custa mais do que a ausência dele.
