<!-- Última atualização: 2026-09-18 -->

# Demos funcionais do seminário

Demos recebidas do grupo em 2026-09-18 e guardadas aqui sem alteração.
Elas complementam `../seminario-deck.html`: o slide traz o estado congelado,
a demo roda ao vivo em outra aba.

| Demo | Bloco | Estado |
|---|---|---|
| `gargalo/index.html` | 4 · Hoje II | ✅ **Roda offline, sem erro.** Projeção determinística de 10 dias; dois sliders e três presets |
| `eliza/index.html` | 1 · As origens | ❌ **Não roda.** Falta `eliza-rules.js` |

## Pendência bloqueante — ELIZA

`eliza/index.html` carrega `<script src="eliza-rules.js">` e usa
`globalThis.ELIZA_PTBR_RULES`. Esse arquivo **não veio junto**. Sem ele a
página lança, na carga:

```
Cannot read properties of undefined (reading 'rules')
```

O arquivo precisa exportar `ELIZA_PTBR_RULES` com as chaves que o `index.html`
consome: `rules` (cada uma com `id`, `priority`, `keywords`, `patterns`),
`fallbacks`, `initialMessages`, `pre`, `synonymSets`, `reflections` e
`memoryTemplates`.

**Enquanto isso, não abrir a demo da ELIZA na apresentação.** O slide do
bloco 1 é autossuficiente e mostra o mecanismo (regra, captura, template)
sem depender dela.

## Números usados no slide do bloco 4

Conferidos rodando `gargalo/index.html`, não estimados:

| Preset | Produzidos | Entregues | Fila |
|---|---|---|---|
| Sem IA (1× / 1×) | 10 | 10 | 0 |
| **IA sem adaptação (5× / 1×)** | 50 | **10** (1 PR/dia) | **40 esperando Review** |
| **Review reforçado (5× / 5×)** | 50 | **30** (3 PR/dia) | **20 esperando Teste** |

Capacidades fixas no simulador: Teste 3/dia, Release 4/dia.
