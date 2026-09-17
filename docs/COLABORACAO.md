<!-- Última atualização: 2026-09-17 -->

# Colaboração: como pegar e entregar uma atividade

Protocolo para **qualquer membro do grupo** trabalhar no repositório com o próprio Claude, sem depender
de explicação verbal de quem começou o trabalho. Decisão e fundamentação:
`docs/adr/0001-tarefas-em-arquivo-para-kb-multiusuario.md`.

## 1. Onde ficam as atividades

```
docs/todo/_TEMPLATE.md   ← modelo de tarefa
docs/todo/<ID>-<slug>.md ← tarefas abertas, em andamento ou em revisão
docs/done/<ID>-<slug>.md ← tarefas concluídas (movidas com git mv)
```

**IDs** = prefixo da matéria + número sequencial. Prefixos em uso:

| Prefixo | Matéria |
|---|---|
| `GP` | `materias/gestao-de-projetos-2026/` |
| `BD1` | `materias/banco-de-dados-1-2026/` |
| `ESII` | `materias/engenharia-software-2-2026/` |
| `KB` | Estrutura do repositório (raiz, `produto/`, `docs/`) |

Para listar tarefas livres:
`grep -l "^owner: *$" docs/todo/*.md`. No Claude, basta pedir: *"liste as tarefas livres em docs/todo"*.

## 2. Ciclo de vida

```
aberta ──(pegar)──▶ em-andamento ──(PR aberto)──▶ revisao ──(merge)──▶ concluida (docs/done/)
```

### Pegar uma tarefa

1. `git switch main && git pull`.
2. Conferir que `owner:` está vazio e que as tarefas de `depende_de:` estão concluídas.
3. Preencher `owner: <seu nome>`, `status: em-andamento` e fazer commit **direto na main**
   (`Pega tarefa GP-02`) com push. O commit pequeno e imediato é o "cadeado": evita que duas pessoas
   peguem a mesma tarefa. **É a única exceção à regra do PR**, e só vale para mudar `owner`/`status`
   no frontmatter da tarefa.
4. Criar a branch `<prefixo-minúsculo>/<ID>-<slug>`, ex.: `gp/GP-02-deck-slides`.

### Trabalhar com o Claude

Abra o Claude **na raiz do repositório** e cole o bloco **"Prompt de partida"** da tarefa. Ele já
aponta para os arquivos que precisam ser lidos. O Claude deve:
- Ler `CLAUDE.md` (raiz), o `CLAUDE.md` da matéria e os arquivos de `ler_antes:`.
- Produzir **somente** o que está em `saida:` (além de atualizar o próprio arquivo da tarefa: `status`,
  "Perguntas em aberto", "Resultado") e respeitar `fora_de_escopo:`.
- Registrar dúvidas em **"Perguntas em aberto"** da tarefa, **sem inventar resposta**.

### Entregar

1. Conferir cada item de `criterios_de_aceite:`.
2. Abrir PR para `main`, com o ID no título (`GP-02: deck de slides do seminário`), e mudar
   `status: revisao`.
3. **Outro membro** revisa. Quem fez não aprova o próprio PR, e a revisão humana não é opcional
   (`materias/gestao-de-projetos-2026/docs/05-o-que-funciona-e-nao.md` §5.7).
4. No merge: `git mv docs/todo/<arquivo> docs/done/`, `status: concluida` e preencher a seção
   **"Resultado"** (resumo em 2–3 linhas + link do PR).

## 3. Regras

- **Não editar a `saida:` de uma tarefa com outro `owner`.** Se precisar, combinar antes e registrar em
  "Perguntas em aberto".
- **Tarefa pequena.** Se não cabe em uma sessão de trabalho, quebrar em duas tarefas.
- **Tudo que o Claude precisa saber fica escrito** na tarefa ou nos arquivos de `ler_antes:`. Conversa
  de WhatsApp não é contexto.
- **Nunca inventar** dados, nomes, RAs, datas ou decisões (regra geral do `CLAUDE.md` raiz).
- **Abandonar é permitido:** limpar `owner:`, voltar `status: aberta` e anotar até onde chegou.
- **Nova tarefa:** copiar `_TEMPLATE.md`, usar o próximo número livre do prefixo e deixar `owner:`
  vazio.
- **Identidade git:** configure `git config user.name` e `user.email` uma vez e mantenha sempre os
  mesmos (hoje o histórico tem membros aparecendo com até 3 nomes/e-mails diferentes).
