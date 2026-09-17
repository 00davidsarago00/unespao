---
id: BD1-01
titulo: Resolver as pendências registradas da entrega de BD1 (diagrama físico e nomes da capa)
materia: banco-de-dados-1-2026
status: aberta
owner:
criado: 2026-09-17
prazo: sem prazo  # a entrega era 16/09/2026; confirmar se ainda cabe ajuste
depende_de: []
ler_antes:
  - CLAUDE.md
  - materias/banco-de-dados-1-2026/CLAUDE.md
  - materias/banco-de-dados-1-2026/docs/03-modelo-fisico.md
  - materias/banco-de-dados-1-2026/slides/slides.md
saida:
  - materias/banco-de-dados-1-2026/images/ (diagrama físico exportado)
  - materias/banco-de-dados-1-2026/slides/slides.md (remoção do aviso de pendência)
criterios_de_aceite:
  - "Primeiro: confirmado com o grupo se a entrega de 16/09 já foi feita; se sim, registrar em Resultado e encerrar sem editar"
  - Diagrama gerado por engenharia reversa no MySQL Workbench conforme 03-modelo-fisico.md §3.8, com linhas de relacionamento visíveis
  - Aviso "⚠️ PENDÊNCIA" da capa em slides.md resolvido com nomes confirmados pelo grupo
fora_de_escopo:
  - Alterar o schema em sql/unespao.sql
  - Alterar produto/
---

# BD1-01 — Pendências da entrega de BD1

## Contexto

Duas pendências estão escritas nos arquivos da matéria:
1. `docs/03-modelo-fisico.md` §3.8 descreve o diagrama físico por engenharia reversa, mas a imagem não
   está em `images/`.
2. `slides/slides.md` tem o aviso "⚠️ PENDÊNCIA: confirmar com o grupo se os quatro nomes da capa
   continuam corretos".

O prazo da disciplina (16/09/2026) já passou em relação à criação desta tarefa. O primeiro passo é
confirmar se ainda faz sentido.

## Prompt de partida

```
Vou executar a tarefa docs/todo/BD1-01-pendencias-entrega.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes.
Antes de qualquer edição, me pergunte se a entrega de 16/09 já foi feita.
Não invente nomes: pergunte-me os nomes confirmados pelo grupo.
Ao final, confira cada criterio_de_aceite e me diga quais passaram.
```

## Perguntas em aberto

- A entrega de 16/09 já foi submetida?

## Resultado

Preencher ao concluir.
