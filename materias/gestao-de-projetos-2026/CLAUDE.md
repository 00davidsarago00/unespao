# CLAUDE.md — Gestão de Projetos (UNESP, 2026)

Regras normativas **completas** desta entrega. Agentes que trabalharem nesta pasta devem ler este
arquivo inteiro antes de qualquer edição.

## 1. O que é esta pasta

Entrega autocontida da disciplina **Gestão de Projetos** (Prof. Bruno Elias Penteado, UNESP 2026):
um **seminário de 20–25 min** sobre **"LLM e o Desenvolvimento de Software"**.

Diferente de ESII e BD1, o tema **não é o Sistema Unespão**. O Unespão entra só como **caso real**
(`docs/07-caso-unespao.md`). Por isso `../../produto/` é consulta secundária aqui e **não deve ser
alterado** por decisões desta matéria.

## 2. O que a disciplina exige

### Enunciado (literal, `arquivos_do_classroom/atividade.md`)

> Apresentação de slides sobre o tópico "LLM e o Desenvolvimento de Software".
> Sobre os tópicos (entre 20-25 min): O que é o tópico; Profundidade da pesquisa; Conexão com
> conceitos de Gerenciamento de Projetos vistos em aula; Exemplos práticos e casos reais; Clareza,
> organização e qualidade do material de apoio; Comunicação, postura e gestão do tempo.

A tabela de critérios C1–C6 e onde cada um é atendido está em `docs/00-estrategia-pesquisa.md` §1.

### Formato decidido pelo grupo (2026-09-17)

- Uma "quase aula": cenário global, análise histórica, tendências, o que funciona e o que não funciona.
- O Unespão e este repositório entram como caso prático.
- **Espinha:** `material-base/Material-base.pdf`, roteiro mestre produzido por outro membro do grupo e
  adotado como estrutura oficial — 5 blocos, 5 apresentadores, uma demo funcional por bloco, estética
  mudando por era. A versão operacional está em `docs/08-roteiro-aula.md`.
- **Material de apoio:** arquivo HTML único e offline (tarefa GP-06). O deck do Canva
  (`slides/roteiro-slides-canva.md`) fica como **plano B**.
- **Apresentadores: 5** (confirmado pelo usuário em 2026-09-17).

### Prazo

**18/09/2026** (calendário da Aula 6, slide 2; data confirmada pelo usuário). Prioridade, nesta ordem:
1. Roteiro e números corretos.
2. Deck.
3. Ensaio cronometrado.
4. Refinamentos.

A regra "Não há pressa" de ESII **não vale** aqui.

### Pendências do grupo (não decidir sem confirmação)

- ~~**Tema e responsável.**~~ **Confirmado pelo usuário em 2026-09-17:** o tema "4- LLMs e
  desenvolvimento de SW", como listado nos slides de aula (A-09 s76, A-10 s70), é o do grupo.
- **Falantes por bloco.** Não definidos (tarefa GP-03).

## 3. Fluxo de produção

```
material-base/Material-base.pdf (espinha, não editado)
        ↓ verificação alegação por alegação
docs/09-verificacao-material-base.md  →  docs/08-roteiro-aula.md (versão operacional)
        ↓
deck HTML offline com demos (GP-06)   ·   deck Canva como plano B (GP-02)
        ↓
ensaio cronometrado (GP-03)
```

- **O PDF do material-base não é editado.** Correções entram em `docs/`, com a divergência registrada
  na auditoria `09`.
- **Números:** onde o material-base e `docs/` divergirem, **vale `docs/`** — é o lado verificado.
- Alegação marcada ◐ ou ❌ em `09` **não vai para a tela nem para a fala** sem conferência.

## 4. Regras normativas

1. **Nunca inventar.** Todo número ou afirmação factual em `docs/0*.md` cita `[F-xx]`, `[A-xx]` ou
   `[R-xx]`, e o ID precisa existir em `docs/99-fontes.md`.
2. **Sem fonte verificada, não entra.** A validação de todas as fontes (GP-01) foi feita em
   2026-09-17: só F-11 continua em **S**, porque a página da OpenAI responde 403 — ao citá-la, dizer
   que a confirmação veio de cobertura secundária. Fonte nova entra em `99-fontes.md` já conferida.
3. **Nível de evidência na fala.** N1 permite dizer "causou". N2 permite "relatam/associado a". N3
   permite "a empresa afirma". N4 serve só para data ou contexto (`00` §3).
4. **Contraponto obrigatório** para todo resultado favorável ou desfavorável.
5. **Percepção ≠ medida.** Nunca apresentar número autorreportado como ganho real.
6. **Datar tudo.** Ano de coleta junto do número.
7. **Nova fonte → linha em `99-fontes.md` na hora**, com URL e data de acesso.

## 5. Papéis de revisão (disparar só quando pedido)

1. **Pesquisador.** Busca e registra a fonte, escreve o trecho em `docs/`.
2. **Verificador de fontes.** Abre cada URL e confere número, unidade, ano e sentido (ex.: aceleração vs.
   desaceleração). Marca **P** em `99-fontes.md` ou corrige o texto.
3. **Avaliador (postura de professor).** Confere o roteiro e o deck contra os critérios C1–C6 e o tempo
   de 20–25 min.

## 6. Fontes

| Tipo | Onde | Uso |
|---|---|---|
| Enunciado | `arquivos_do_classroom/atividade.md` | Normativo |
| Conceitos de GP | `arquivos_do_classroom/*.pptx` (IDs A-xx) | Conteúdo do cap. 06. O número no nome do arquivo ≠ número da aula: vale o título do slide 1 |
| Pesquisa externa | `docs/99-fontes.md` (IDs F-xx) | Conteúdo dos cap. 01–05 |
| Caso Unespão | Repositório (IDs R-xx) | Conteúdo do cap. 07 |

## 7. Estrutura

```
CLAUDE.md, README.md
arquivos_do_classroom/   atividade.md + 9 pptx de aula
docs/
  00-estrategia-pesquisa.md   método, perguntas, hierarquia de evidência
  01-o-que-e.md … 07-caso-unespao.md
  08-roteiro-aula.md          blocos cronometrados → base do deck
  99-fontes.md                registro de fontes F/A/R
```

## 8. Trabalho em equipe

Tarefas desta matéria ficam em `../../docs/todo/` com `materia: gestao-de-projetos-2026`. O protocolo
(pegar tarefa, branch, PR, concluir) está em `../../docs/COLABORACAO.md`.
