# Engenharia de Software II (UNESP, 2026) — Entregável Sistema Unespão

Esta pasta é o **entregável completo e autocontido** da disciplina Engenharia de Software II (UNESP, 2026) — documentação e prototipagem do **Sistema Unespão** (plataforma de pedidos personalizados estilo Subway/Spoleto para a padaria Unespão).

## Estrutura

```
docs/
  01-introducao-objetivos.md          # Capítulo I: Introdução e Objetivos
  02-arquitetura-sistema.md           # Capítulo II: Arquitetura do Sistema
  03-projeto-componentes.md           # Capítulo III: Projeto de Componentes
  04-interface-usuario.md             # Capítulo IV: Projeto de Interface do Usuário
  05-testes.md                        # Capítulo V: Testes
  06-gestao-configuracao.md           # Capítulo VI: Gestão de Configuração e Manutenção
  99-controle-versoes.md              # Apêndice: Controle de Versões

template-modelo-projeto-final-2026.tex        # Template oficial (.tex) do documento final
template-modelo-projeto-final-2026.pdf        # Renderização do template

exercicios-referencia/
  Exercicio-ESII-padrao-decorador.docx.pdf    # Modelo de forma: padrões de projeto
  Exercicio-teste-unidade-Java.docx.pdf       # Modelo de forma: estratégia de testes

slides-teoricos/
  slides-SCM-handout.pdf                      # Gestão de Configuração de Software
  slides-interface-handout.pdf                # Design de Interface
  slides-padroes-handout-parte-1.pdf          # Padrões de Projeto (parte 1)
  slides-padroes-handout-site-parte-1.pdf     # Padrões de Projeto (parte 1, versão estendida)

images/                                       # Ativos gráficos (C4, diagramas, logo)
  AV01A.jpg                                   # Logo UNESP
  c4-nivel1-contexto.svg
  c4-nivel2-containers.svg
  c4-nivel3-diagrama-classes.svg
  01_2_iso-25010-topics-EN.drawio.png         # ISO 25010 Qualidade
  ... (mais diagramas de atividade, casos de uso, etc.)

src/                                          # Protótipo React (demonstração)
  App.tsx, components/, data/, ...
  package.json, vite.config.ts, tsconfig.json

refs.bib                                      # Referências bibliográficas
CLAUDE.md                                     # Regras normativas desta entrega
Sistema-Unespao-ESII.pdf                      # Fonte de verdade: minimundo + C4
iteracao2_DiagrtamaDeComponentes_C4_UNESPAO (2).pdf  # Complemento: C4 Nível 3 detalhado
```

## Pipeline de produção do documento

1. **Markdown** (`docs/*.md`) — padrão de trabalho; toda redação e iteração acontece aqui.
2. **`.tex`** — gerado/atualizado **sob pedido explícito** ("passa pro tex", "gera o tex"); nunca como efeito colateral de edição em Markdown.
3. **PDF** — compilado **sob pedido explícito** ("gera o pdf", "compila"), sempre a partir do `.tex` atualizado.

**Nunca escreva conteúdo novo diretamente no `.tex`** — ele é gerado a partir do Markdown, não editado como fonte primária.

## Conhecimento compartilhado

Esta pasta reutiliza conhecimento documentado em **`../../produto/`** (na raiz do repositório, dois níveis acima):
- **`../../produto/business.md`** — domínio agnóstico de disciplina (atores, escopo, requisitos, objetivos de qualidade).
- **`../../produto/architecture.md`** — arquitetura agnóstica de disciplina (C4, Clean Architecture, SOLID aplicado).

Quando tiver dúvida sobre **domínio ou arquitetura do Sistema Unespão**, comece lendo esses arquivos em `produto/` como referência rápida antes de mergulhar nos PDFs completos (`Sistema-Unespao-ESII.pdf`).

## Consulte também

- **`CLAUDE.md`** (nesta pasta) — regras normativas completas para redação, pipeline, fontes de conteúdo vs. forma, workflow das três vertentes (Redator, PO, Avaliador).
- **`../../CLAUDE.md`** (raiz do repo) — orientação para agentes sobre roteamento entre `produto/` e `materias/<nome>/`.
