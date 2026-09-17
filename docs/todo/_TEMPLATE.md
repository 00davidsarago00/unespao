---
id: XX-00
titulo: Verbo no infinitivo + objeto
materia: nome-da-pasta-em-materias  # ou "kb" para a estrutura do repositório
status: aberta                       # aberta | em-andamento | revisao | concluida
owner:                               # vazio = livre para pegar
criado: AAAA-MM-DD
prazo: AAAA-MM-DD                    # ou "sem prazo"
depende_de: []                       # IDs que precisam estar concluídos antes
ler_antes:                           # contexto mínimo que o Claude deve ler
  - CLAUDE.md
  - materias/<nome>/CLAUDE.md
saida:                               # arquivos que esta tarefa cria ou altera (e só eles)
  - caminho/do/arquivo
criterios_de_aceite:
  - Critério verificável 1
  - Critério verificável 2
fora_de_escopo:
  - O que NÃO fazer nesta tarefa
---

# XX-00 — Título

## Contexto

Por que esta tarefa existe, em 2–5 linhas. Citar arquivos, não conversas.

## Passos sugeridos

1. …
2. …

## Prompt de partida

Cole no Claude, aberto na raiz do repositório:

```
Vou executar a tarefa docs/todo/XX-00-slug.md.
Leia a tarefa inteira e todos os arquivos listados em ler_antes.
Produza somente o que está em saida, respeitando fora_de_escopo.
Não invente dados: se faltar informação, registre em "Perguntas em aberto" da tarefa e me pergunte.
Ao final, confira cada criterio_de_aceite e me diga quais passaram.
```

## Perguntas em aberto

- (vazio)

## Resultado

Preencher ao concluir: resumo em 2–3 linhas + link do PR.
