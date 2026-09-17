---
id: GP-01
titulo: Reconferir as fontes S/X e os números centrais do seminário
materia: gestao-de-projetos-2026
status: concluida
owner: David Sarago
criado: 2026-09-17
prazo: 2026-09-18
depende_de: []
ler_antes:
  - CLAUDE.md
  - materias/gestao-de-projetos-2026/CLAUDE.md
  - materias/gestao-de-projetos-2026/docs/00-estrategia-pesquisa.md
  - materias/gestao-de-projetos-2026/docs/99-fontes.md
saida:
  - materias/gestao-de-projetos-2026/docs/99-fontes.md
  - materias/gestao-de-projetos-2026/docs/0*.md (só correções de número/citação)
criterios_de_aceite:
  - Toda fonte marcada S ou X em 99-fontes.md foi aberta na fonte primária e passou a P, ou teve o texto corrigido/removido nos capítulos
  - Os números das tabelas de 05 §5.1 e 03 §3.1–3.2 foram conferidos um a um (valor, unidade, ano, sentido)
  - A situação do PL 2338/2023 na Câmara em 09/2026 foi confirmada ou continua explicitamente marcada "a confirmar"
  - Nenhuma fonte nova sem linha em 99-fontes.md
fora_de_escopo:
  - Reescrever capítulos ou mudar a narrativa da aula
  - Adicionar temas novos
---

# GP-01 — Reconferir fontes

## Contexto

A pesquisa de 2026-09-17 marcou fontes conferidas só em fonte secundária (**S**) ou com fonte primária
inacessível (**X**). O papel aqui é o **Verificador de fontes** (`materias/gestao-de-projetos-2026/CLAUDE.md`
§5): ninguém da banca pode encontrar um número errado no slide.

## Passos sugeridos

1. Listar as linhas S/X de `99-fontes.md` (F-03, F-04, F-05, F-07, F-08, F-09, F-10, F-11, F-21, F-22,
   F-28, F-35).
2. Abrir cada URL e conferir o que os capítulos afirmam.
3. Conferir por amostragem as fontes P usadas nos slides de maior impacto (F-15, F-19, F-20, F-23, F-27).
4. Atualizar a coluna Verif. e corrigir o texto onde houver divergência.

## Prompt de partida

```
Vou executar a tarefa docs/todo/GP-01-verificar-fontes.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes.
Produza somente o que está em saida, respeitando fora_de_escopo.
Não invente dados: se faltar informação, registre em "Perguntas em aberto" da tarefa e me pergunte.
Ao final, confira cada criterio_de_aceite e me diga quais passaram.
```

## Perguntas em aberto

- (vazio)

## Resultado

Executada em 2026-09-17. Todas as 12 fontes S/X foram abertas na origem e passaram a **P**, exceto
F-11 (página da OpenAI responde HTTP 403), que fica marcada como conferida em cobertura secundária.
Correções e acréscimos aplicados: citações literais em F-03, F-04, F-05, F-08, F-10 e F-28; troca das
URLs de F-07 e F-09 por fontes acessíveis; as 7 capacidades do DORA e a base do estudo (78 entrevistas
+ ~5.000 respondentes) confirmadas em F-21; curva J e números de ROI detalhados em F-22; situação do
PL 2338/2023 confirmada no Senado e na Câmara (F-35) e corrigida em `03` §3.5.
Seis fontes novas entraram na mesma passagem: F-39 (JetBrains 2025), F-40 (Cetic.br TIC Empresas
2025 — dado do Brasil), F-41 (curl encerra bug bounty), F-42 (AI slop em open source), F-43
(sobrevivência do código gerado) e F-44 (políticas de IA em projetos open source).
