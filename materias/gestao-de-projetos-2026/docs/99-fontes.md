<!-- Última atualização: 2026-09-17 -->

# 99 — Registro de fontes

Toda afirmação factual ou número em `docs/0*.md` cita um ID desta tabela (`[F-xx]` para fontes
externas, `[A-xx]` para material de aula, `[R-xx]` para evidência do próprio repositório).
Nada entra nos capítulos sem estar registrado aqui.

**Níveis de evidência** (ver `00-estrategia-pesquisa.md` §3):
- **N1**: estudo experimental ou revisado por pares (RCT, artigo em conferência ou periódico).
- **N2**: survey ou relatório de pesquisa com amostra grande e metodologia publicada.
- **N3**: relatório ou declaração de fornecedor, ou de parte interessada. Vale para dizer o que a
  empresa afirma, não para provar causalidade.
- **N4**: imprensa, blog ou fonte secundária. Só para datas, contexto ou exemplo ilustrativo.

**Verificação:** **P** = conteúdo conferido na página ou resumo primário em 2026-09-17; **S** =
conferido só em fonte secundária (reverificar na tarefa GP-01 antes de pôr em slide); **X** = fonte
primária inacessível (403) e número conferido em secundária.

Data de acesso de todas as fontes externas: **2026-09-17**. A validação linha a linha (tarefa GP-01) foi
feita em 2026-09-17: das 58 fontes, 57 estão em **P**. A exceção é F-11, marcada **X**, porque a página
oficial da OpenAI responde HTTP 403 e o conteúdo foi conferido em cobertura secundária.

As fontes **F-45 a F-49** entraram em 2026-09-17, depois da revisão da equipe revisora (ver
`../../../docs/done/GP-05-revisao-especialistas.md`), para cobrir custo/ROI, efeito sobre quem usa e
risco jurídico. As fontes **F-50 a F-53**, e a atualização de F-22 e F-25, vieram da integração do
`../material-base/Material-base.pdf` — a auditoria alegação por alegação está em
`09-verificacao-material-base.md`. As fontes **F-54 a F-58** entraram ao fechar a dívida de
verificação (tarefa GP-07, 2026-09-17).

## Fontes externas

| ID | Referência | Tipo | Nível | Verif. | URL |
|---|---|---|---|---|---|
| F-01 | Vaswani et al., *Attention Is All You Need*, 12/06/2017 | Artigo | N1 | P | https://arxiv.org/abs/1706.03762 |
| F-02 | Chen et al., *Evaluating Large Language Models Trained on Code* (Codex, HumanEval), 07/07/2021 | Artigo | N1 | P | https://arxiv.org/abs/2107.03374 |
| F-03 | GitHub, *Introducing GitHub Copilot: your AI pair programmer*, 29/06/2021 ("Today, we are launching a technical preview…") | Anúncio | N3 | P | https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/ |
| F-04 | TechCrunch, *Copilot… is now generally available*, 21/06/2022 ("GitHub today announced that Copilot is now available to all developers") | Imprensa | N4 | P | https://techcrunch.com/2022/06/21/copilot-githubs-ai-powered-programming-assistant-is-now-generally-available/ |
| F-05 | ChatGPT: lançamento em 30/11/2022; "gained one million users in five days and 100 million in two months" | Secundária | N4 | P | https://en.wikipedia.org/wiki/ChatGPT |
| F-06 | Jimenez et al., *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?*, ICLR 2024 | Artigo | N1 | P | https://arxiv.org/abs/2310.06770 |
| F-07 | Devin (Cognition), demo pública em 03/2024: "In March 2024, Cognition released a demo of its AI coding tool, Devin AI" | Secundária | N4 | P | https://en.wikipedia.org/wiki/Cognition_AI |
| F-08 | Anthropic, *Introducing the Model Context Protocol*, 25/11/2024: "a new standard for connecting AI assistants to the systems where data lives" | Anúncio | N3 | P | https://www.anthropic.com/news/model-context-protocol |
| F-09 | Claude Code: lançado em 02/2025; "made generally available in May 2025 alongside Claude 4" | Secundária | N4 | P | https://en.wikipedia.org/wiki/Claude_(AI) |
| F-10 | Karpathy, 02/02/2025: "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes… and forget that the code even exists"; Collins elege *vibe coding* palavra do ano 2025 (CNN, 06/11/2025) | Post + imprensa | N4 | P | https://x.com/karpathy/status/1886192184808149383 · https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl |
| F-11 | OpenAI deixa de reportar SWE-bench Verified (02/2026): saturação e "avoiding contamination difficult"; recomenda SWE-bench Pro (1.865 tarefas). Página oficial responde HTTP 403; conteúdo conferido em cobertura secundária de 25/02/2026 | Declaração de fornecedor + imprensa | N3/N4 | X | https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/ · https://tessl.io/blog/openai-moves-beyond-swe-bench-verified-as-coding-benchmarks-saturate |
| F-12 | Peng, Kalliamvakou, Cihon, Demirer, *The Impact of AI on Developer Productivity: Evidence from GitHub Copilot*, 2023 | Experimento controlado | N1 | P | https://arxiv.org/abs/2302.06590 |
| F-13 | Cui, Demirer, Jaffe, Musolff, Peng, Salz, *The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers*, Management Science | RCT de campo | N1 | P | https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/ |
| F-14 | Paradis et al., *How much does AI impact development speed? An enterprise-based randomized controlled trial* (Google), 2024 | RCT | N1 | P | https://arxiv.org/abs/2410.12944 |
| F-15 | METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, 10/07/2025 | RCT | N1 | P | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ |
| F-16 | METR, *We are Changing our Developer Productivity Experiment Design*, 24/02/2026 | Atualização de pesquisa | N2 | P | https://metr.org/blog/2026-02-24-uplift-update/ |
| F-17 | METR, *Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity*, 11/05/2026 | Survey | N2 | P | https://metr.org/blog/2026-05-11-ai-usage-survey/ |
| F-18 | METR, *Measuring AI Ability to Complete Long Software Tasks*, 19/03/2025 | Pesquisa | N2 | P | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |
| F-19 | Google Cloud/DORA, *Announcing the 2024 DORA report* | Survey | N2 | P | https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report |
| F-20 | Google/DORA, *State of AI-assisted Software Development 2025* (post oficial + dora.dev) | Survey | N2 | P | https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/ · https://dora.dev/dora-report-2025/ |
| F-21 | DORA, *AI Capabilities Model* (7 capacidades), 23/09/2025: 78 entrevistas em profundidade + ~5.000 respondentes | Survey | N2 | P | https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model · https://dora.dev/ai/capabilities-model/report/ |
| F-22 | DORA, *ROI of AI-assisted Software Development* (2026.01, atualizado 22/04/2026): curva J; causas da queda inicial = curva de aprendizado, "imposto de verificação" da revisão e adaptação de processos; **35–40% de ganho em greenfield contra ~10% ou menos em código legado**. Números do modelo (ROI ~39% no 1º ano) e o relato de clientes (727% em 3 anos) conferidos em cobertura secundária, não na página do relatório | Relatório + imprensa | N2/N4 | P | https://dora.dev/ai/roi/report/ · https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/ |
| F-23 | Stack Overflow, *2025 Developer Survey — AI* | Survey | N2 | P | https://survey.stackoverflow.co/2025/ai |
| F-24 | GitHub, *Octoverse 2025*, 28/10/2025 | Relatório de fornecedor | N3 | P | https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/ |
| F-25 | GitClear, *The Maintainability Gap: AI Code Quality in 2026* (623 mi de mudanças, 2023–2026): linhas de refatoração caem de 21% (2022) para 3,8% (2026); blocos duplicados +81% desde 2023; copy/paste de 9,4% (2022) para 15,7% (1º semestre de 2026). Edição anterior (2025, 211 mi de linhas): clones de 8,3% para 12,3%. **Fornecedor de ferramenta de métricas** | Relatório de fornecedor | N3 | P | https://www.gitclear.com/the_ai_code_quality_maintainability_gap |
| F-26 | Pearce et al., *Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions*, IEEE S&P 2022 | Artigo | N1 | P | https://arxiv.org/abs/2108.09293 |
| F-27 | Veracode, *2025 GenAI Code Security Report* e *Spring 2026 GenAI Code Security Update* (24/03/2026) | Relatório de fornecedor | N3 | P | https://www.veracode.com/blog/spring-2026-genai-code-security/ |
| F-28 | Spracklen et al., *We Have a Package for You!…*, USENIX Security 2025: 16 modelos, 576.000 amostras de código, 205.474 nomes de pacote alucinados únicos | Artigo | N1 | P | https://arxiv.org/abs/2406.10279 |
| F-29 | Churilov, *The Range Shrinks, the Threat Remains: Re-evaluating LLM Package Hallucinations on the 2026 Frontier-Model Cohort*, arXiv, 05/2026 (pesquisador independente, sem revisão por pares) | Preprint | N2 | P | https://arxiv.org/abs/2605.17062 |
| F-30 | AI Incident Database, *Incident 1152: Replit Agent… Loss of Production Data*, 18/07/2025 | Base de incidentes | N4 | P | https://incidentdatabase.ai/cite/1152/ |
| F-31 | Google, *Sundar Pichai shares news from Google Cloud Next 2026*, 22/04/2026 | Declaração de fornecedor | N3 | P | https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/ |
| F-32 | Anthropic, *Anthropic Economic Index: AI's Impact on Software Development*, 28/04/2025 | Pesquisa de fornecedor | N3 | P | https://www.anthropic.com/research/impact-software-development |
| F-33 | Brynjolfsson, Chandar, Chen, *Canaries in the Coal Mine?* (atualização de 12/08/2026), Stanford Digital Economy Lab | Working paper | N2 | P | https://digitaleconomy.stanford.edu/news/canariesaug26/ |
| F-34 | *EU AI Act — Implementation Timeline* (artificialintelligenceact.eu) | Rastreador legal | N4 | P | https://artificialintelligenceact.eu/implementation-timeline/ |
| F-35 | PL 2338/2023 (Marco Legal da IA): aprovado no Plenário do Senado em 26/12/2024 e "REMETIDA À CÂMARA DOS DEPUTADOS" em 17/03/2025; na Câmara a ficha de tramitação segue ativa em 2026 (apensações registradas até 02/09/2026), sem aprovação final | Fonte oficial | N2 | P | https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 · https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 |
| F-36 | Thoughtworks, *Technology Radar Vol. 34*, 15/04/2026 | Relatório de consultoria | N3 | P | https://www.thoughtworks.com/about-us/news/2026/combat-ai-cognitive-debt-radar-v34 |
| F-37 | Shetty et al., *Agile Story Point Estimation with Large Language Models*, arXiv, 03/2026 | Preprint empírico | N2 | P | https://arxiv.org/abs/2603.06276 |
| F-38 | Alaswad, Poovammal, Aljaddouh, *Toward LLM-aware software effort estimation: a conceptual framework*, Frontiers in AI, 23/03/2026 | Artigo conceitual | N2 | P | https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1772418/full |

| F-39 | JetBrains, *State of Developer Ecosystem 2025* (24.534 devs, 194 países, coleta abr–jun/2025), 10/2025 | Survey | N2 | P | https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/ |
| F-40 | Cetic.br/CGI.br, *TIC Empresas 2025* (16ª edição; 4.174 empresas com 10+ pessoas; coleta fev/2025–jan/2026), divulgada em 15/06/2026 | Survey oficial | N2 | P | https://cetic.br/pt/noticia/uso-de-inteligencia-artificial-por-empresas-brasileiras-avanca-e-atinge-17-aponta-pesquisa-do-cetic-br/ |
| F-41 | Stenberg, *The end of the curl bug-bounty*, 26/01/2026 | Relato de mantenedor | N4 | P | https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/ |
| F-42 | Afroz et al., *"AI Slop is DDoSing Open Source"…*, arXiv, 04/07/2026: 294 repositórios, 2 mi de PRs e issues, 229 praticantes | Preprint empírico | N2 | P | https://arxiv.org/abs/2607.04003 |
| F-43 | Rahman & Shihab, *Will It Survive? Deciphering the Fate of AI-Generated Code in Open Source*, arXiv, 23/01/2026: 200 mil unidades de código em 201 projetos | Preprint empírico | N2 | P | https://arxiv.org/abs/2601.16809 |
| F-44 | Hora, Robbes, Zacchiroli, *"We Permit the Use of AI, but […]": The Landscape of AI Policies in Popular Open Source Projects*, arXiv, 07/09/2026: 281 políticas analisadas | Preprint empírico | N2 | P | https://arxiv.org/abs/2609.07542 |

| F-45 | MIT NANDA, *The GenAI Divide: State of AI in Business 2025*: 95% das organizações sem retorno mensurável em P&L em ~6 meses; base de 153 respondentes, 52 entrevistas e 300+ implantações; definição de sucesso estreita e contestada | Relatório | N3 | P | https://cloudelligent.com/wp-content/uploads/2026/02/v0.1_State_of_AI_in_Business_2025_Report.pdf |
| F-46 | Lee, Sarkar et al., *The Impact of Generative AI on Critical Thinking…*, CHI 2025: 319 trabalhadores do conhecimento, 936 exemplos reais; mais confiança na IA ↔ menos esforço de pensamento crítico (autorrelato) | Artigo | N1 | P | https://dl.acm.org/doi/full/10.1145/3706598.3713778 |
| F-47 | GitHub Copilot — planos e preços: Free US$ 0, Pro US$ 10, Pro+ US$ 39, Max US$ 100 por pessoa/mês (Business e Enterprise sob consulta) | Página de fornecedor | N3 | P | https://github.com/features/copilot/plans |
| F-48 | U.S. Copyright Office, *Copyright and Artificial Intelligence, Part 2: Copyrightability*, 29/01/2025: autoria humana é requisito; prompts sozinhos não bastam | Documento oficial | N2 | P | https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf |
| F-49 | *Doe v. GitHub, Microsoft e OpenAI*: 20 das 22 alegações rejeitadas; seguem violação de licença open source e quebra de contrato; sustentação oral no 9º Circuito em 11/02/2026 | Litígio (cobertura jurídica) | N4 | P | https://en.wikipedia.org/wiki/Doe_v._GitHub,_Microsoft,_and_OpenAI |

| F-50 | METR, *Time Horizon 1.1*, 29/01/2026: duplicação de 195,8 dias na série completa, 130,8 desde 2023 e 88,6 desde 2024; Claude Opus 4.5 com horizonte de 50% em 320 min (IC 170–729). A página de horizontes avisa: *"Measurements above 16 hrs are unreliable with our current task suite"* | Pesquisa | N2 | P | https://metr.org/blog/2026-1-29-time-horizon-1-1/ · https://metr.org/time-horizons/ |
| F-51 | PMI, *The Standard for Artificial Intelligence in Portfolio, Program, and Project Management*, 09/06/2026: primeiro padrão de IA aprovado pela ANSI para a profissão; ~300 páginas; 8 princípios e 5 domínios de desempenho | Padrão profissional | N2 | P | https://www.pmi.org/standards/artificial-intelligence |
| F-52 | GitHub, *Migrating the GitHub Copilot runtime to Rust, using Copilot* (09/2026): **832.378 linhas de Rust de produção** e 468.689 de testes; **128 PRs**; **135 releases** entre 12/05 e 21/08/2026 (~1,3/dia); *"completed primarily by a single developer, in only a few months"*; agentes escreveram a maior parte. **Relato de primeira parte** | Relato de fornecedor | N3 | P | https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/ |
| F-53 | Fu et al., *Security Weaknesses of Copilot-Generated Code in GitHub Projects: An Empirical Study*, TOSEM: 733 trechos reais; weaknesses em 29,5% (Python) e 24,2% (JavaScript), em 43 categorias CWE; até 55,5% corrigíveis com aviso de análise estática | Artigo | N1 | P | https://arxiv.org/abs/2310.02059 |

| F-54 | Scale AI, *SWE-Bench Pro* (09/2025): 1.865 instâncias (731 públicas, 858 retidas, 276 comerciais) em 41 repositórios; no lançamento, GPT-5 fez 23,3% e Claude Opus 4.1 23,1% no conjunto público. Placar padronizado atual no topo em ~61,5% | Benchmark + artigo | N2 | P | https://scale.com/blog/swe-bench-pro · https://arxiv.org/abs/2509.16941 |
| F-55 | U.S. Bureau of Labor Statistics, *Occupational Outlook Handbook — Software Developers*: projeção de **+10% entre 2025 e 2035**, com ~174.700 novos empregos para desenvolvedores | Estatística oficial | N2 | P | https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm |
| F-56 | Karger et al., *Forecasting the Economic Effects of AI*, NBER Working Paper 35046: ao cenário rápido de progresso até 2030, superprevisores atribuíram **12,6%** e economistas **14,0%** | Working paper | N2 | P | https://www.nber.org/papers/w35046 |
| F-57 | Hindle, Barr, Su, Gabel, Devanbu, *On the Naturalness of Software*, ICSE 2012 (Most Influential Paper, ICSE 2022): entropia do código entre **3 e 4 bits**; plugin de sugestão no Eclipse economiza **até 61%** de teclas | Artigo | N1 | P | https://earlbarr.com/publications/naturalness.pdf |
| F-58 | Hutchins, *The Georgetown-IBM Experiment Demonstrated in January 1954*, AMTA 2004: 250 palavras, seis regras de gramática, mais de sessenta sentenças russas traduzidas | Artigo histórico | N1 | P | https://aclanthology.org/2004.amta-papers.12/ |

## Material de aula (Prof. Bruno Elias Penteado, UNESP)

Arquivos em `../arquivos_do_classroom/`. O número no nome do arquivo nem sempre é o da aula: vale o
título do slide 1.

| ID | Arquivo | Aula (título interno) | Slides usados |
|---|---|---|---|
| A-02 | `Project Management Lesson 2.pptx` | Aula 2: Alinhamento estratégico de projetos | s13 (estratégia) |
| A-03 | `Project Management Class 3.pptx` | Aula 3: PMBOK e Escopo de projetos | s50 (restrições), s68 (EAP), s73 (scope creep), s92 (escopo ágil) |
| A-05 | `Project Management Class 4.pptx` | Aula 5: Estimativas de software | s14 (Unespão R$ 200.000/6 meses), s41 (EAP), s53 ("Estimativa de KLOC via ChatGPT"), s66–s84 (story points, velocidade) |
| A-06 | `Project Management Class 6.pptx` | Aula 6: Cronograma e orçamento | s2 (calendário: 18/09 seminários), s6 (comparativo de estimativas), s16 (Lei de Hofstadter), s21–s22 (Lei de Brooks) |
| A-07 | `Project Management Lesson 7.pptx` | Aula 7: Riscos de projeto | s12 (matriz de Rumsfeld), s22 (caso Knight Capital), s33 (respostas a riscos) |
| A-08 | `Project Management Class 8.pptx` | Aula 8: Gestão de stakeholders (e equipes) | s21 (Tuckman), s31–s39 (estruturas de equipe), s55 (dono claro por domínio), s71 (team charter) |
| A-09 | `Project Management Class 9.pptx` | Aula 9: Qualidade de produto e processo | s11 (qualidade não se incorpora depois), s31–s41 (ISO/IEC 25010), s54–s58 (CMMI), s70–s75 (custo da qualidade), s76 (lista de seminários) |
| A-10 | `Project Management Class 10.pptx` | Aula 10: Monitoramento, controle e encerramento | s4 (5 variáveis de Pressman), s14 ("não confiar só em 'parece pronto'"), s29–s34 (EVA), s48–s54 (burndown), s60–s68 (encerramento, termo de aceite), s70 (lista de seminários) |

## Evidência do próprio repositório (caso Unespão)

| ID | Evidência | Onde |
|---|---|---|
| R-01 | Histórico git: primeiro commit em 12/09/2026, reorganização e BD1 em 15/09/2026 (PRs #1–#5) | `git log` |
| R-02 | Instruções para agentes: `CLAUDE.md` raiz + um por matéria, com a regra "Nunca inventar" | `../../../CLAUDE.md`, `../../engenharia-software-2-2026/CLAUDE.md`, `../../banco-de-dados-1-2026/CLAUDE.md` |
| R-03 | Auditoria do tour guiado: capítulo "Glossário" inexistente, versões v0.5/v0.8 inventadas, exemplo "Issue #12" fabricado, cenário de rede de padarias que contradiz os docs | `../../engenharia-software-2-2026/AUDITORIA-TOUR-GUIADO.md` |
| R-04 | `guidedTourData.ts`: arquivo não importado por nenhum módulo que mantém conteúdo inventado | `../../engenharia-software-2-2026/src/data/guidedTourData.ts` |
| R-05 | BD1: portão "executar o `.sql` em MySQL limpo após toda edição"; papéis Modelador → DBA → Avaliador | `../../banco-de-dados-1-2026/CLAUDE.md` |
| R-06 | Avaliação de custo com 6 agentes independentes, que recomendou **não** construir o tour de BD1 | `../../banco-de-dados-1-2026/docs/avaliacao_custo_prototipo.md` |
| R-07 | Autoria: commits só de 2 dos 4 membros, com identidades git inconsistentes | `git log --format='%an'` |
