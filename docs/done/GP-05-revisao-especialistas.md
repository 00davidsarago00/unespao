---
id: GP-05
titulo: Revisão do seminário por equipe de especialistas (narrativa, relevância, rigor, design)
materia: gestao-de-projetos-2026
status: concluida
owner: David Sarago
criado: 2026-09-17
prazo: 2026-09-18
depende_de: [GP-01, GP-02]
ler_antes:
  - materias/gestao-de-projetos-2026/docs/
  - materias/gestao-de-projetos-2026/slides/roteiro-slides-canva.md
saida:
  - materias/gestao-de-projetos-2026/docs/00-06, 99
  - materias/gestao-de-projetos-2026/slides/roteiro-slides-canva.md
criterios_de_aceite:
  - Quatro revisões independentes, com recortes que não se sobrepõem
  - Todo achado aceito virou alteração rastreável; todo achado recusado tem a razão registrada
  - Nenhuma fonte nova entra sem linha em 99-fontes.md
fora_de_escopo:
  - Montar o deck no Canva (é a GP-02)
  - Definir falantes (é a GP-03)
---

# GP-05 — Revisão por equipe de especialistas

## Contexto

Depois de GP-01 (validação de fontes) e GP-02 (deck), o material foi submetido a quatro revisões
independentes e paralelas, cada uma com um recorte diferente, para evitar ponto cego comum.

| Revisor | Recorte |
|---|---|
| Narrativa | arco, ganchos, transições, ritmo, títulos |
| Produto | cobertura dos 6 critérios, tempo por bloco, o que cortar e o que falta |
| Banca cética | profundidade, viés de seleção, extrapolação, números, lacunas |
| Design de informação | carga cognitiva, hierarquia visual, tabelas, contraste, ritmo visual |

## Achados aceitos e aplicados

**Conteúdo (`docs/`)**
1. DORA e Stack Overflow são surveys: trocado "houve" por "associou-se a" e registrado em `00` §3 que
   N2 de survey mede percepção, não telemetria.
2. Veracode: acrescentada a condição que faltava — os ~55% de código seguro valem **quando o prompt
   não pede segurança**. Virou recomendação nova em `05` §5.8.
3. Google 75%: deixou de ser usado como evidência de que revisão humana funciona (`05` §5.8); ficou em
   `03`/`04` com nota de mecanismo (é métrica de caracteres aceitos).
4. Custo entrou em `06` §6.1 com preço real de licença [F-47] e o contraponto de ROI [F-45].
5. Contraponto de ROI: MIT NANDA (95% dos pilotos sem retorno em P&L) em `05` §5.2, com a limitação
   da definição estreita de sucesso.
6. Efeito sobre quem usa: Lee et al., CHI 2025, em `05` §5.3 e `06` §6.7 (confiança na IA ↔ menos
   pensamento crítico) — sustenta a frase sobre formar júniores, que antes não tinha evidência.
7. Risco jurídico (autoria e licença) entrou na matriz de riscos de `06` §6.6 [F-48][F-49].
8. Cui et al. (4.867 devs) entrou na linha do tempo de `02`, corrigindo a assimetria que dava ao METR
   (n=16) o papel de âncora.
9. T1 em `04` teve o sinal rebaixado para "fraco", com a limitação de serem tarefas autocontidas.
10. F-11 remarcada como **X**; limitação do METR 2025 corrigida (a ressalva é sobre >50 h de Cursor,
    não sobre pouca experiência com LLMs); favorabilidade citada como "~60%".

**Deck (`slides/roteiro-slides-canva.md`)**
11. Orçamento de tempo por slide, porque o deck estava dimensionado para ~28 min. Agora soma 22,8 min.
12. Regulação virou uma linha do slide do Brasil; as duas linhas do tempo viraram uma, com as três
    fases rotuladas.
13. Slide novo (S21) sobre Escopo (Aula 3), Cronograma/Brooks (Aula 6) e Equipe (Aula 8) — três aulas
    estavam documentadas e invisíveis no deck, o que subatendia o critério C3.
14. A resposta da turma (S3) agora aparece **na tela** no clímax (S14), ao lado dos números do METR.
15. Tabela de estudos virou **dot plot** (S13); a matriz de riscos virou **quadrante 2 × 2** (S23);
    adoção virou número único (S9).
16. Correções de contraste: dourado textual passa a `#8E6522` (o `#DE9E1E` dá 2,2:1 e reprova em
    texto); legenda em fundo escuro passa a `#C9B49C`; um único escuro (`#2A180B`) no deck.
17. Tamanhos mínimos subiram (tabela 28 px, legenda 24 px, rodapé 22 px); zebra de tabela corrigida.
18. Cor deixou de ser código único: todo ganho/perda leva `▲`/`▼` e rótulo.
19. Transições escritas nas notas (S6→S7, S24→S25, S26→S27); "RCT" e "SAST" ganharam tradução falada;
    Knight Capital saiu do slide e virou fala, para não roubar a entrada do quadrante.
20. Caso Unespão dividido em dois slides (o que aconteceu / o que salvou), com mais tempo.

## Achado recusado

**"Sinal invertido no METR 2026" (classificado como ALTA pela revisão de rigor).** A crítica dizia que
"speedup de −18%" significa 18% **mais lento** e que o texto estava errado. Fui à fonte: o parágrafo
abre com *"Our raw results show some evidence for speedup"* e o post afirma que os desenvolvedores
estão *"more sped up"* do que em 2025. Portanto `−18%` é **redução de tempo**, e o texto estava certo.
Ainda assim, a ambiguidade era real: a redação foi reescrita para deixar o sentido explícito, e a
ficha do S13 no deck traz um aviso para quem for plotar o gráfico.

## Resultado

Tudo aplicado em 2026-09-17. As fontes novas (F-45 a F-49) estão registradas com nível de evidência e
verificação. O conteúdo permanece sem nenhum número sem fonte.
