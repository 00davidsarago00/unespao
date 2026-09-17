---
id: ESII-01
titulo: Tratar os resíduos da auditoria do tour guiado (código morto e referências a "Padeiro")
materia: engenharia-software-2-2026
status: aberta
owner:
criado: 2026-09-17
prazo: sem prazo
depende_de: []
ler_antes:
  - CLAUDE.md
  - materias/engenharia-software-2-2026/CLAUDE.md
  - materias/engenharia-software-2-2026/AUDITORIA-TOUR-GUIADO.md
saida:
  - materias/engenharia-software-2-2026/src/data/guidedTourData.ts
  - materias/engenharia-software-2-2026/src/components/HomeSelectionView.tsx
  - materias/engenharia-software-2-2026/metadata.json
criterios_de_aceite:
  - "Decisão sobre a pergunta P5 da auditoria (remover ou conectar guidedTourData.ts) tomada pelo Lucas e registrada em Resultado"
  - Se a decisão for remover, o arquivo foi removido e o app ainda compila (npm run build)
  - Comentários de HomeSelectionView.tsx e descrição de metadata.json não citam mais "Padeiro" nem "padarias próximas", seguindo o domínio de produto/business.md
fora_de_escopo:
  - Mudar comportamento visível do app além do texto
  - Alterar docs/ ou o .tex de ESII
---

# ESII-01 — Resíduos da auditoria do tour

## Contexto

`AUDITORIA-TOUR-GUIADO.md` achou conteúdo inventado no tour. O commit 3d89333 trocou "padeiro" por
"atendente", mas ainda restam três pontos:
- `src/data/guidedTourData.ts` não é importado por nenhum arquivo e mantém invenções: rede de
  padarias parceiras, KDS do padeiro.
- `HomeSelectionView.tsx` (l. 256–258) ainda tem comentários "Padeiro".
- `metadata.json` descreve "padarias próximas… Visão do Padeiro".

O caso é usado no seminário de GP como exemplo de risco de código morto
(`materias/gestao-de-projetos-2026/docs/07-caso-unespao.md`).

## Prompt de partida

```
Vou executar a tarefa docs/todo/ESII-01-residuos-auditoria-tour.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes.
Antes de remover guidedTourData.ts, me pergunte qual foi a decisão sobre a pergunta P5 da auditoria.
Produza somente o que está em saida. Ao final, rode npm run build e confira cada criterio_de_aceite.
```

## Perguntas em aberto

- P5 da auditoria: remover `guidedTourData.ts` ou ele é trabalho em andamento?

## Resultado

Preencher ao concluir.
