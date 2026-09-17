---
id: GP-06
titulo: Montar o deck HTML offline com as cinco demos funcionais
materia: gestao-de-projetos-2026
status: aberta
owner:
criado: 2026-09-17
prazo: 2026-09-18
depende_de: []
ler_antes:
  - CLAUDE.md
  - materias/gestao-de-projetos-2026/CLAUDE.md
  - materias/gestao-de-projetos-2026/material-base/Material-base.pdf
  - materias/gestao-de-projetos-2026/docs/08-roteiro-aula.md
  - materias/gestao-de-projetos-2026/docs/09-verificacao-material-base.md
saida:
  - materias/gestao-de-projetos-2026/slides/seminario.html
criterios_de_aceite:
  - "OBRIGATÓRIO: as 2 demos que carregam argumento funcionam — simulador de gargalo (bloco 4) e extrapolador da curva com modo cético (bloco 5)"
  - "DESEJÁVEL: ELIZA com painel de regras (bloco 1)"
  - "OPCIONAL: tokenizador/mapa de atenção (bloco 2) e reprodução do agente (bloco 3) — viram imagem estática se o tempo apertar"
  - Arquivo único, abre offline, sem rede/API/CDN (testado com o wi-fi desligado)
  - Os 5 blocos na ordem do 08-roteiro-aula.md, com a estética mudando por era
  - Cada demo entregue tem GIF de fallback embutido no próprio slide
  - Todo número na tela bate com a versão verificada de 08; nada marcado ◐ ou ❌ em 09 aparece na tela
  - Todo slide com número tem a fonte no rodapé
  - Testado no navegador do notebook que será usado e no projetor
fora_de_escopo:
  - Alterar números ou conclusões em docs/ (divergência vira registro em 09)
  - Definir quem apresenta cada bloco (é GP-03)
---

# GP-06 — Deck HTML com demos

## Contexto

O material-base define o deck como um arquivo HTML único, com uma demo funcional por bloco e estética
mudando por era (terminal CRT → web 2010 → IDE escura → dashboard claro → quase vazio). A mudança
visual é parte do argumento, não decoração.

As demos, na ordem: **ELIZA com painel de regras** · **tokenizador + mapa de atenção estático** ·
**agente resolvendo uma issue (reprodução passo a passo)** · **simulador de gargalo com slider** ·
**extrapolador da curva METR com modo cético**.

**Escopo em camadas (ajuste de 2026-09-17).** O material-base pede cinco demos, mas ele próprio já
prevê corte: três delas estão na lista de corte de emergência e todas aceitam GIF como substituto.
Por isso o escopo aqui é priorizado:

| Camada | Demo | Por quê |
|---|---|---|
| **Obrigatória** | Simulador de gargalo (bloco 4) | É a tese do seminário virando animação: aumenta-se a capacidade de implementação e a fila de review explode |
| **Obrigatória** | Extrapolador da curva METR com **modo cético** (bloco 5) | O contraste entre estimativa central e limite inferior do intervalo **é** o argumento |
| Desejável | ELIZA com painel de regras (bloco 1) | Efeito narrativo de 60 s; bom, não estrutural |
| Opcional | Tokenizador, mapa de atenção, reprodução do agente | Ilustrativos; viram imagem sem perda de argumento |

As demos **não precisam estar embutidas no deck**: podem ser arquivos abertos em abas separadas, o que
desacopla o material de apoio do risco de build e permite usar o deck do Canva como caminho visual.
Se nada disso ficar pronto, o plano B (`../slides/roteiro-slides-canva.md`) cobre o mesmo conteúdo.

## Prompt de partida

```
Vou executar a tarefa docs/todo/GP-06-deck-html-demos.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes (o PDF do material-base tem a
especificação das demos e da estética por era).
Produza somente o que está em saida, respeitando fora_de_escopo.
Nenhum número marcado ◐ ou ❌ em 09-verificacao-material-base.md pode ir para a tela.
Ao final, confira cada criterio_de_aceite e me diga quais passaram.
```

## Perguntas em aberto

- Demo do bloco 3: issue real do repositório ao vivo, ou sessão gravada e reproduzida como JSON?

## Resultado

Preencher ao concluir.
