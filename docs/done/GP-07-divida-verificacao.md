---
id: GP-07
titulo: Fechar a dívida de verificação do material-base
materia: gestao-de-projetos-2026
status: concluida
owner: David Sarago
criado: 2026-09-17
prazo: 2026-09-18
depende_de: []
ler_antes:
  - materias/gestao-de-projetos-2026/docs/09-verificacao-material-base.md
  - materias/gestao-de-projetos-2026/docs/99-fontes.md
  - materias/gestao-de-projetos-2026/docs/00-estrategia-pesquisa.md
saida:
  - materias/gestao-de-projetos-2026/docs/09-verificacao-material-base.md
  - materias/gestao-de-projetos-2026/docs/99-fontes.md
criterios_de_aceite:
  - "Cada item ◐ vira ✅ (com a fonte registrada) ou ❌ (e sai da apresentação)"
  - "Os itens ❌ continuam explicitamente fora da fala e da tela"
  - Nenhuma fonte nova sem linha em 99-fontes.md, com nível de evidência e status
fora_de_escopo:
  - Reescrever blocos ou mudar a narrativa
---

# GP-07 — Dívida de verificação

## Contexto

A auditoria `09` deixou 8 itens em ◐ (parcial) e 1 em ❌. Nenhum deles sustenta a tese, mas todos
podem ser perguntados pelo professor. Em ordem de risco:

1. Horizonte do Claude Opus 4.6 (~14,5 h) e a frase "acima de 16 h não sabemos medir".
2. Trajetória do SWE-bench Pro (~23% → 61,5%) e a saturação do Verified em ~95%.
3. Projeção do BLS (+15,8%, +267.700 vagas).
4. Metaculus e NBER — hoje ❌: sem fonte, não entram.
5. Hindle et al. (2012): entropia de 2–4 bits e 61% de teclas economizadas.
6. Migração do Copilot: 135 releases em ~14,5 semanas e "um desenvolvedor em alguns meses".
7. Georgetown-IBM (250 itens / 6 regras) e XCON (~US$ 40 mi) — histórico, risco baixo.

## Prompt de partida

```
Vou executar a tarefa docs/todo/GP-07-divida-verificacao.md.
Leia a tarefa inteira e os arquivos de ler_antes.
Para cada item ◐ ou ❌, vá à fonte primária e atualize o status na tabela de 09, registrando a fonte
em 99-fontes.md quando confirmar. Não invente: sem fonte, o item vira ❌ e sai da apresentação.
Ao final, me diga quantos itens mudaram de status.
```

## Perguntas em aberto

- (vazio)

## Resultado

Fechada em 2026-09-17. Os 8 itens ◐ e o item ❌ foram à fonte. Placar final da auditoria: **19 ✅ e
6 ⚠️**, sem nenhum item sem veredito — **nada precisa ser omitido da apresentação por falta de fonte**.

Confirmados: o aviso literal da METR (*"Measurements above 16 hrs are unreliable with our current task
suite"*), a trajetória do SWE-bench Pro (23,3% no lançamento → ~61,5% hoje no placar padronizado da
Scale), os números completos da migração do Copilot (832.378 linhas de Rust, 128 PRs, 135 releases em
14,5 semanas, "primarily by a single developer") e a demonstração Georgetown-IBM de 1954.

Corrigidos: **BLS** (a projeção vigente é +10% de 2025 a 2035 e ~174.700 vagas, não +15,8% e
+267.700); **Hindle et al.** (entropia entre 3 e 4 bits, e "até" 61% de teclas); **Metaculus** (mediana
da comunidade em jan/2033, não jun/2031); **XCON** (as estimativas vão de US$ 10 mi a 40 mi por ano).

O NBER, que estava sem fonte, foi confirmado: 12,6% dos superprevisores e 14,0% dos economistas ao
cenário rápido até 2030.

Cinco fontes novas registradas (F-54 a F-58).
