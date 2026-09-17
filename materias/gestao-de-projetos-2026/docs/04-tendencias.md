<!-- Última atualização: 2026-09-17 -->

# 04 — Tendências

Critério atendido: **C2**. Tempo no roteiro: ~1,5 min (junto com o fechamento).

Cada tendência traz a **força do sinal**:
- **Forte:** várias fontes independentes.
- **Médio:** uma fonte de pesquisa.
- **Fraco:** declaração ou extrapolação.

| # | Tendência | Evidência | Sinal |
|---|---|---|---|
| T1 | **Do assistente ao agente.** A duração das tarefas que agentes completam sozinhos com 50% de confiabilidade dobra a cada **~7 meses** há 6 anos | METR [F-18] (os autores estimam de 1 a 4 dobras por ano); 79% de automação no Claude Code [F-32] | Médio |
| T2 | **O humano migra de autor para revisor.** 75% do código novo no Google é gerado por IA e aprovado por engenheiros | [F-31] | Fraco (declaração de fornecedor) |
| T3 | **Contexto e especificação viram engenharia.** Spec-driven development, skills de agente e instruções versionadas no repositório | Thoughtworks Radar vol. 34 [F-36]; MCP como padrão [F-08] | Médio |
| T4 | **Os fundamentos voltam a importar mais, não menos.** Testes, lotes pequenos, plataforma | DORA 2025 e capacidades [F-20][F-21]; Thoughtworks [F-36] | Forte |
| T5 | **A segurança não acompanha a capacidade** | Taxa de ~55% de código seguro estável há 2 anos [F-27]; pacotes alucinados persistem em 2026 [F-29] | Forte |
| T6 | **Benchmarks saturam e são substituídos** (SWE-bench Verified → Pro) | [F-11] | Médio |
| T7 | **As métricas clássicas de estimativa perdem a âncora.** LOC deixa de medir esforço; o esforço migra para supervisão e validação | Artigo conceitual [F-38]; LLMs estimando story points [F-37] | Fraco (sem estudo de campo) |
| T8 | **A percepção de ganho cresce.** Survey coletado em fev–abr/2026: mediana autorreportada de 1,4× a 2× em valor do trabalho; ~2× no "agora" (mar/2026), contra 1,3× retrospectivo para mar/2025 e 2,5× previsto para mar/2027 | METR survey [F-17]; os autores alertam para superestimação | Fraco |
| T9 | **Regulação entra em vigor em etapas** (UE 2025–2028; Brasil em tramitação) | [F-34][F-35] | Forte (UE) / a confirmar (Brasil) |
| T10 | **Pressão sobre vagas de entrada** | [F-33] (descritivo, não causal) | Médio |
| T11 | **Política de uso de IA vira artefato do projeto.** 83,3% das políticas de OSS permitem IA, mas com condições: envolvimento humano (67,3%), declaração de uso (48,8%) e responsável definido (43,4%) | [F-44]; 1ª capacidade do DORA é "posição clara e comunicada" [F-21] | Forte |
| T12 | **O gargalo passa a ser revisar, não gerar.** Mais PRs e menos merges; projetos criando defesas contra "AI slop" | [F-42][F-41] | Médio |

## Mensagem para o slide

> A tendência não é "a IA vai programar sozinha". É: **mais delegação → mais especificação, revisão e
> controle**. Ou seja, o trabalho do desenvolvedor fica cada vez mais parecido com o trabalho de
> gestão.
