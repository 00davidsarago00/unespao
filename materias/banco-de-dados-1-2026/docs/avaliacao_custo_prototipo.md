<!-- Última atualização: 2026-09-15 -->

# Avaliação de custo e requisitos — tour interativo de BD1 no protótipo React de ESII

Documento de estudo. **Não é entregável da disciplina** (não entra no PDF nem
foi pedido pelo `atividade_target.md`) — é um registro de decisão sobre se
vale a pena reaproveitar o app React de Engenharia de Software II
(`materias/engenharia-software-2-2026/`) para apresentar o conteúdo de Banco
de Dados I de forma interativa, no mesmo formato de "Apresentação Guiada" que
ESII já tem.

## Método

Seis agentes especializados analisaram a questão em paralelo, cada um lendo o
código e os documentos reais (não uma consulta hipotética) e reportando de
forma independente, sem ver a resposta dos outros:

| Perspectiva | Agente | Pergunta que respondeu |
|---|---|---|
| Viabilidade técnica | `senior-react-developer` | O que reaproveita, o que quebra, quantas horas |
| Encaixe arquitetural | `system-architect` | Onde esse código deveria morar, e por quê |
| Custo-benefício | `senior-product-owner` | Vale investir agora, dado o que já existe pronto |
| UX / design de conteúdo | `ux-designer-web` | O conteúdo de BD1 cabe no formato visual do tour |
| Risco de regressão | `cypress-qa-analyst` | Mexer no app de ESII arrisca o que já foi entregue |
| **Impacto pedagógico** (revisor didático) | `technical-writer` | O tour ensina melhor que o que já existe |

Este documento sintetiza as seis análises. As citações de arquivo/linha vêm
diretamente dos relatórios dos agentes, que leram o código-fonte real antes
de opinar.

---

## Achado que precede tudo: a pergunta já tinha uma resposta parcial no repositório

Antes de qualquer análise nova, dois agentes (arquitetura e UX), de forma
independente, encontraram o mesmo artefato: **já existe uma tentativa de tour
de BD1** em `materias/banco-de-dados-1-2026/apresentacao-tour/index.html`
(HTML/CSS/JS vanilla, sem build, 34 KB) — construída numa iteração anterior
deste mesmo projeto e hoje fora do controle de versão por decisão explícita
(comentário no `.gitignore` da raiz: *"Ferramental de apresentação local de
BD1 — experimentos, não entregável"*).

Dois fatos sobre esse artefato são relevantes para a decisão:

- Ele **clonou a paleta visual de ESII** (creme `#FAF6EF`, dourado `#DE9E1E`,
  Space Grotesk + Plus Jakarta Sans).
- Ele **já abandonou o mecanismo de destaque de região** (spotlight/`regiao`)
  e **já introduziu tabelas HTML simples** para o conteúdo — ou seja, quem
  construiu esse protótipo chegou empiricamente, por tentativa, às mesmas
  duas conclusões técnicas que a análise abaixo alcança por medição.

Isso muda o enquadramento da pergunta: não é "BD1 pode ter um tour", é
"vale a pena portar para o motor de ESII, dado que uma versão mais simples já
foi tentada e já esbarrou nos mesmos limites".

---

## 1. Viabilidade técnica

**Estimativa de esforço: 25–42 horas** para portar de verdade o conteúdo de
BD1 (as ~30 seções de `slides/slides.md`) para o formato de dados do tour de
ESII (`TourStep`, em
`materias/engenharia-software-2-2026/src/data/spotlightTourData.ts`) e para
os componentes que o renderizam.

Blocos de esforço:

| Item | Horas |
|---|---|
| Estender o tipo `TourStep`/`TeoriaVisual` com uma variante de tabela | 1–2 |
| Componente novo de slide de tabela + ajuste de layout | 2–4 |
| Corrigir o realce de sintaxe para SQL (`CodeHighlighter.tsx` hoje colore tudo maiúsculo como tipo, não reconhece comentário `--` nem aspas simples) | 1–2 |
| **Portar as ~30 seções para o formato de dados, rastreando cada afirmação às fontes** | **6–10** |
| Catálogo dos 2 diagramas de BD1 + servir as imagens dentro do app de ESII | 1–2 |
| Medir manualmente 6–10 caixas de destaque (`regiao`) nos dois diagramas | 2–3 |
| Recriar componentes hoje hardcoded para ESII (`RecapMap`, `ContextIllustration`) | 2–3 |
| Generalizar `ControlBar` (nomes de capítulo hoje fixos) | 1–2 |
| Entry point / navegação (nova view, sem o app de pedidos por baixo) | 3–5 |
| Otimizar as imagens (hoje 6000×4000 e 5620×4198 — pesadas para uso interativo) | 1–2 |
| Teste manual completo (sem suite automatizada no projeto) | 3–4 |
| Contingência | 2–4 |

**Achados técnicos centrais:**

- **O tipo de dado do tour não suporta o conteúdo real de BD1.** `conteudo` é
  uma lista de parágrafos simples, sem negrito, sem tabela. Cerca de
  **10 das ~22 seções centrais de BD1 são tabela** (o "lado a lado" do caso
  `AvaliacaoPrato`, a prova de execução, os 7 testes de restrição, as 3
  consultas) — não é um caso isolado, é a forma dominante do conteúdo.
- **O realce de código quebraria justamente no slide mais importante**: o
  tipo de linguagem só reconhece `csharp`/`typescript`; um bloco de SQL
  apareceria rotulado "TypeScript", e o tokenizador coloriria `CREATE`,
  `TABLE`, `PRIMARY KEY` como se fossem tipos, não palavras-chave.
- **A "fase de prática" do tour de ESII (metade da identidade dele) não tem
  equivalente em BD1.** Ela depende de destacar elementos reais de tela de
  um app de pedidos rodando (`document.getElementById`); BD1 não tem esse
  app — o que existe é um diagrama e um script SQL.
- **Comparação de referência:** adicionar zoom/pan e destaque de região só
  ao tour vanilla que já existe (sem portar para o motor de ESII) foi
  estimado em **4–7 horas** — porque esse tour já cobre cerca de 80% do
  resultado visível hoje.

---

## 2. Encaixe arquitetural

O repositório tem uma convenção documentada e deliberada: `produto/` guarda
conhecimento central agnóstico de disciplina; cada `materias/<nome>/` é um
entregável **autocontido**. O próprio `CLAUDE.md` da raiz, no passo de
"como criar uma nova matéria", já prescreve **copiar** arquivos-base, não
importar de outra matéria.

Medindo o quanto os componentes de tour de ESII são de fato genéricos: da
lista de componentes em `src/components/tour/`, vários carregam conteúdo de
ESII embutido, não parametrizado — `RecapMap` tem os 6 capítulos do template
de ESII fixos no código; `ContextIllustration` tem "Cliente/Sistema
Unespão/Atendente" fixo; `DiagramPanel` importa o catálogo de diagramas de
ESII diretamente. E o próprio tipo `TourStep` está declarado **dentro** do
arquivo de conteúdo de ESII (`spotlightTourData.ts`), não como um módulo
separado — não existe hoje um "motor de tour" extraível, existe um tour de
ESII com algumas peças reaproveitáveis dentro.

Das opções avaliadas (estender o app de ESII; fork/novo projeto em BD1;
extrair um pacote compartilhado em `produto/`; manter o tour vanilla que já
existe), a análise recomenda **manter o tour vanilla standalone** — e rejeita
tanto estender o app de ESII quanto extrair um pacote compartilhado, pelo
mesmo motivo central: **compartilhar código entre entregas acadêmicas
datadas impede congelar cada matéria no dia da entrega**, que é exatamente a
propriedade que a separação `produto/`/`materias/` foi desenhada para
proteger.

---

## 3. Custo-benefício

A pergunta mais honesta não é "quanto custa construir", é "o que isso
compraria que a estratégia já pronta (slides no Canva + demonstração ao vivo
no MySQL real) não cobre".

A resposta, segundo a análise de produto: **pouco, e o pouco que compraria é
de qualidade inferior ao que já existe.** Um tour, por mais elaborado, é
sempre uma simulação; a demonstração ao vivo executa DDL de verdade e mostra
erros reais do banco. Investir ~25–40h para reconstruir, de forma simulada,
algo que a demonstração ao vivo já prova de forma real não é redução de
risco — é redundância com uma versão mais fraca do mesmo argumento.

A análise recomenda **não fazer agora**, e situa o único cenário em que faria
sentido: se a disciplina for reapresentada no futuro e o grupo quiser
transformar o material em portfólio reutilizável — aí o cálculo de ROI muda,
porque deixa de haver prazo apertado e passa a haver tempo para fazer o
trabalho de adaptação (tabelas, SQL highlighting, diagramas) direito.

---

## 4. Encaixe de UX e impacto visual

Esta foi a análise mais granular, medindo pixel a pixel o conteúdo real de
BD1 contra as dimensões reais do layout do tour.

**O painel visual do tour é pequeno demais para os diagramas de BD1.** Os
dois diagramas de BD1 (6000×4000 e 5620×4198) são muito mais densos que os
diagramas C4 de ESII (~2000×1500, poucas caixas grandes). Renderizados no
painel padrão do tour (~505px de largura), o texto de uma entidade do DER
fica com **cerca de 3 pixels de altura** — ilegível sem abrir a visão em
tela cheia.

**O mecanismo de destaque de região não funciona nos diagramas de BD1, e não
é por causa do tamanho — é por causa da cor.** O véu que escurece a área não
destacada foi calibrado para os blocos escuros e saturados dos diagramas de
ESII (contraste medido ≈ 4,4:1). Os diagramas de BD1 usam cores pastel sobre
fundo claro; o mesmo véu produz um contraste de aproximadamente **1,09:1** —
ou seja, **nenhuma diferença perceptível** entre a área destacada e o resto.
O destaque simplesmente não apareceria.

**O clímax da apresentação de BD1 é uma comparação lado a lado entre dois
diagramas** (o conceitual com o vínculo duplo de `AvaliacaoPrato` vs. o
lógico sem ele) — e o tour não tem um formato para mostrar dois diagramas ao
mesmo tempo (só existe o equivalente para dois blocos de código). O recurso
mais importante do conteúdo de BD1 não tem onde morar no formato atual.

**Risco adicional de identidade visual:** o "cartão de apoio" já construído
(`apresentacao/cartao-demo.html`) usa uma cor de destaque (`#f2c230`) com
significado restrito e declarado ("isto é onde você está"). O tour usaria
uma cor de dourado próxima mas não idêntica (`#DE9E1E`), de uso puramente
decorativo. Duas cores quase iguais com significados diferentes, usadas ao
mesmo tempo por quem apresenta, é pior do que duas cores claramente
diferentes — lê como "a mesma marca renderizada errado".

**Alternativa de escopo menor, se algo visual for desejado:** em vez de
portar as ~30 seções, construir só **uma tela** dedicada ao momento central
(o comparador conceitual/lógico de `AvaliacaoPrato`, com um recorte das
imagens em vez da imagem inteira, e um alternador em vez de destaque de
região). Isso resolveria os três problemas técnicos de uma vez
(escala, contraste, comparação) com uma fração do esforço — mas ainda seria
trabalho novo, não reaproveitamento do tour de ESII.

---

## 5. Risco de regressão no app já entregue

O app de ESII **não tem nenhum teste automatizado** (confirmado: sem
Vitest/Jest/Cypress/Playwright no `package.json`; o único verificador é a
checagem de tipos do TypeScript). A Apresentação Guiada de ESII já passou por
um processo de auditoria de fidelidade documentado
(`AUDITORIA-TOUR-GUIADO.md`, ~35 KB).

Mexer no código para acomodar BD1 tocaria arquivos compartilhados pela
navegação principal do app (`App.tsx`, `CleanNavbar.tsx`) — o mesmo `return`
que hoje decide qual das quatro views existentes aparece. O risco foi
classificado como **médio** se o código for estendido dentro do app
existente, e **baixo** se for um projeto novo e separado que apenas copia os
componentes genuinamente genéricos. Sem suite de testes, a única forma de
verificar que nada quebrou é um roteiro manual longo, repetindo o tour
inteiro de ESII do primeiro ao último passo.

---

## 6. Avaliação didática (revisor pedagógico)

Este foi o parecer dedicado a julgar se o tour **ensinaria melhor** o
conteúdo de BD1 do que o que já existe — não se é viável construir, mas se
vale a pena do ponto de vista de quem vai aprender/avaliar.

**O caso `AvaliacaoPrato`**, hoje ensinado em sequência de slides com uma
tabela comparativa dedicada, é um exemplo de manual de argumento formal
encadeado (fato de domínio → regra formal → risco → comparação → evidência).
Comprimir essa sequência em um único painel de tour, com texto corrido no
lugar da tabela, **não ensina melhor — na melhor das hipóteses ensina
igual, a um custo de construção muito maior.**

**A demonstração ao vivo no banco real tem uma propriedade didática que
nenhum tour reproduz**: o erro de constraint que aparece na tela é produzido
pelo motor do banco, não escrito pelo grupo. Isso é evidência de
implementação real, não de ilustração dela — e é exatamente o que a
disciplina avalia.

**O feedback anterior do usuário sobre a tentativa de tour rejeitada
("ficou com muita cara de IA") foi tratado como um sinal pedagógico real,
não só estético**: sinaliza que o veículo de apresentação chamou mais
atenção do que o conteúdo técnico, o oposto do que qualquer apresentação
para banca deveria fazer.

**Veredito do revisor didático:** o par já adotado (slides no Canva
carregando o argumento sequenciado + demonstração ao vivo provando a
implementação) já cobre integralmente o que a avaliação recompensa. O tour
não resolve nenhuma limitação real desse par.

---

## Síntese e recomendação final

As seis análises, feitas de forma independente e por ângulos diferentes,
convergem no mesmo veredito:

> **Não construir o tour interativo agora.** A estratégia já adotada
> (slides no Canva + demonstração ao vivo no MySQL real, apoiada pelo
> cartão de apoio local) já cobre o que a entrega precisa, com menos custo,
> menos risco técnico e — segundo a avaliação didática — melhor qualidade
> pedagógica do que a alternativa em estudo.

Nenhuma das seis perspectivas recomendou seguir em frente no prazo atual.
Duas (técnica e UX) apontaram alternativas de escopo muito menor caso algo
visual adicional seja desejado — de 4 a 7 horas para melhorar o tour vanilla
já existente com zoom e destaque de região, ou uma tela única dedicada ao
comparador `AvaliacaoPrato` — mas mesmo essas são tratadas como opcionais,
não recomendadas como prioridade diante do prazo.

### Quando isso deixaria de ser verdade

- Se a disciplina for reapresentada em uma edição futura e o grupo quiser
  transformar o material num ativo de portfólio reutilizável, sem pressão de
  prazo.
- Se a banca pedir explicitamente por um formato interativo de apresentação
  — o que nenhuma fonte hoje indica.

### Perguntas em aberto (não respondidas pelas fontes disponíveis)

1. O app de Engenharia de Software II já foi entregue/corrigido pela
   disciplina de origem? Isso muda o peso do risco de regressão (seção 5).
2. O tour vanilla que já existe em `apresentacao-tour/` deve ser removido do
   repositório (era só experimento) ou mantido como rascunho para uma
   eventual repetição futura da disciplina?
3. Existe algum requisito explícito, de qualquer uma das duas disciplinas,
   por paridade visual entre matérias? Nenhuma fonte lida confirma isso.

---

## Ver também

- `apresentacao/roteiro-demo-ao-vivo.md` (local, fora do controle de
  versão) — a estratégia adotada de demonstração ao vivo.
- `apresentacao/cartao-demo.html` (local, fora do controle de versão) — a
  ferramenta de apoio que já resolve, para o apresentador, boa parte do que
  um tour tentaria resolver de outra forma.
- `materias/engenharia-software-2-2026/AUDITORIA-TOUR-GUIADO.md` — a
  auditoria de fidelidade já feita sobre o tour de ESII, referida na análise
  de risco (seção 5).
