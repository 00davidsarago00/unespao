<!-- Última atualização: 2026-09-18 -->

# Demos funcionais do seminário

Demos recebidas do grupo em 2026-09-18, guardadas aqui sem alteração no
`index.html`. Elas existem em dois lugares:

1. **Soltas nesta pasta** — abrem sozinhas, para testar e brincar.
2. **Embutidas no deck** — `../seminario-deck.html` traz as duas rodando
   ao vivo dentro dos slides 7 e 22. Não é preciso trocar de janela.

| Demo | Slide | Estado |
|---|---|---|
| `gargalo/index.html` | 22 | ✅ Roda offline, sem erro |
| `eliza/index.html` | 7 | ✅ Roda **com o `eliza-rules.js` reconstruído** (ver abaixo) |

## Sobre o `eliza-rules.js`

O `index.html` da ELIZA carrega `<script src="eliza-rules.js">` e consome
`globalThis.ELIZA_PTBR_RULES`. **Esse arquivo não veio junto** — sem ele a
página lançava `Cannot read properties of undefined (reading 'rules')` na
carga.

O `eliza-rules.js` desta pasta é uma **reconstrução**, escrita a partir da
interface que o `index.html` espera. Tem 14 regras em português, conjuntos
de sinônimos, reflexões de pessoa e a pilha de MEMORY. **Se o arquivo
original aparecer, é só substituir** — nada mais precisa mudar, nem no
deck (que traz uma cópia embutida do mesmo conteúdo).

Detalhe que custa caro na hora de mexer: o motor empilha **uma captura por
parte do padrão**, inclusive as literais. Em `[any, EU, ESTOU, any]` as
capturas são `$1`=antes, `$2`="EU", `$3`="ESTOU", `$4`=depois. Por isso os
templates usam o índice da última parte, e não `$1`.

## Como o embutimento no deck funciona

O deck é um arquivo só e continua offline. O CSS de cada demo foi
reescrito com todos os seletores prefixados (`.demo-eliza`, `.demo-gargalo`)
para não vazar no resto dos slides; as variáveis que estavam em `:root`
passaram a viver no próprio contêiner.

Cada um desses dois slides tem **duas versões**:

- `.slide-live` — a demo rodando. É o que aparece na apresentação.
- `.slide-poster` — o estado congelado. Fica escondido, e só aparece
  quando `<body>` recebe a classe `baking`.

É assim que `seminario-deck-canva.html` continua estático: o gerador liga
o modo `baking` antes de medir a página, então o Canva recebe o pôster, não
a demo. **Quem edita é `seminario-deck.html`; o `-canva.html` é derivado.**

## Números usados no slide 22

Conferidos rodando a demo, não estimados:

| Preset | Produzidos | Entregues | Fila |
|---|---|---|---|
| Sem IA (1× / 1×) | 10 | 10 | 0 |
| **IA sem adaptação (5× / 1×)** | 50 | **10** (1 PR/dia) | **40 esperando Review** |
| **Review reforçado (5× / 5×)** | 50 | **30** (3 PR/dia) | **20 esperando Teste** |

Capacidades fixas no simulador: Teste 3/dia, Release 4/dia.
