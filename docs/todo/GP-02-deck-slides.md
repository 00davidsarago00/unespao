---
id: GP-02
titulo: Montar o deck de slides do seminário a partir do roteiro (plano B, desde a adoção do material-base)
materia: gestao-de-projetos-2026
status: revisao
owner: David Sarago
criado: 2026-09-17
prazo: 2026-09-18
depende_de: []
ler_antes:
  - CLAUDE.md
  - materias/gestao-de-projetos-2026/CLAUDE.md
  - materias/gestao-de-projetos-2026/docs/08-roteiro-aula.md
  - materias/gestao-de-projetos-2026/docs/01-o-que-e.md
  - materias/gestao-de-projetos-2026/docs/02-historico.md
  - materias/gestao-de-projetos-2026/docs/03-cenario-atual-global.md
  - materias/gestao-de-projetos-2026/docs/04-tendencias.md
  - materias/gestao-de-projetos-2026/docs/05-o-que-funciona-e-nao.md
  - materias/gestao-de-projetos-2026/docs/06-conexao-gestao-projetos.md
  - materias/gestao-de-projetos-2026/docs/07-caso-unespao.md
  - materias/gestao-de-projetos-2026/docs/99-fontes.md
saida:
  - materias/gestao-de-projetos-2026/slides/roteiro-slides-canva.md
  - materias/gestao-de-projetos-2026/slides/LINK.md
criterios_de_aceite:
  - Os 8 blocos de 08-roteiro-aula.md estão no deck, na mesma ordem
  - Todo número no slide tem fonte curta no rodapé e existe em docs/
  - O último slide tem as referências completas só das fontes citadas no deck, copiadas de 99-fontes.md
  - Estudos citados aparecem com a limitação principal (ex. "16 devs")
  - Nenhum dado ou exemplo que não esteja em docs/; nomes da capa confirmados pelo grupo; nenhum nome de falante
  - Quantidade de slides compatível com os 23 min do roteiro (~1 slide por minuto); o ensaio cronometrado é da GP-03
  - Números de fontes S/X marcados com ⚠ enquanto GP-01 não estiver concluída
fora_de_escopo:
  - Alterar números ou conclusões em docs/ (se achar erro, registrar em Perguntas em aberto e avisar quem está com GP-01)
  - Definir quem fala cada bloco (é GP-03)
---

# GP-02 — Deck de slides

## Contexto

O conteúdo já está pesquisado e roteirizado em Markdown. O deck só **transcreve e dá forma visual**
ao `08-roteiro-aula.md`, uma ideia por slide. Critério C5 do professor: clareza, organização e qualidade
do material.

## Passos sugeridos

1. Ler o roteiro e fazer o esqueleto: 1 slide por ideia, ~15–22 slides.
2. Preencher usando só `docs/`. Números com rodapé de fonte.
3. Slides-chave:
   - Tabela "funciona × não funciona" (05 §5.1).
   - Paradoxo percepção × medida (METR).
   - 5 variáveis de Pressman (06 §6.1).
   - Caso Unespão (07 §7.2–7.3).
4. Slide final de referências.
5. Pode rodar em paralelo à GP-01: números de fontes S/X ficam marcados com ⚠ e só perdem a marca quando GP-01 for concluída.

## Prompt de partida

```
Vou executar a tarefa docs/todo/GP-02-deck-slides.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes.
Produza somente o que está em saida, respeitando fora_de_escopo.
Não invente dados: se faltar informação, registre em "Perguntas em aberto" da tarefa e me pergunte.
Antes de gerar os slides, me pergunte em qual formato/ferramenta devo produzir o deck.
Ao final, confira cada criterio_de_aceite e me diga quais passaram.
```

## Perguntas em aberto

- ~~Formato do deck~~ — **decidido em 2026-09-17: Canva.** O repositório guarda a especificação de
  montagem (`roteiro-slides-canva.md`) e o link do design (`LINK.md`).
- **Nomes da capa** — a capa está com os quatro nomes que já constam da capa dos slides de BD1
  (`materias/banco-de-dados-1-2026/slides/slides.md`). Confirmar com o grupo antes de apresentar.
- **Divisão de falas** — fica na GP-03; o deck traz a coluna vazia.

## Resultado

Especificação completa de montagem no Canva entregue em `slides/roteiro-slides-canva.md`:
sistema visual derivado do protótipo React do Unespão (cores, tipografia, componentes, grid) e
os 29 slides descritos um a um (26 de conteúdo, 2 divisores e 1 de referências) — layout, texto exato, elementos gráficos, rodapé de fonte e notas
do apresentador. `slides/LINK.md` aguarda o link do design e a exportação em PDF.
O arquivo traz o mapa bloco→slide, a ordem de corte caso o ensaio estoure o tempo e um checklist de
conferência final.

Revisado pela equipe de especialistas (GP-05) em 2026-09-17: orçamento de tempo por slide (22,8 min),
slide novo sobre Escopo/Cronograma/Equipe, tabelas densas viraram gráfico e quadrante, e correções de
contraste. Detalhe em `docs/done/GP-05-revisao-especialistas.md`.
