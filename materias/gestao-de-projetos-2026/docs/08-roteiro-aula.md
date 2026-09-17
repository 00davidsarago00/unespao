<!-- Última atualização: 2026-09-17 -->

# 08 — Roteiro da aula (20–25 min)

Base para o deck (tarefa **GP-02**) e para o ensaio (tarefa **GP-03**).

- **Falantes:** *a definir pelo grupo* (GP-03). Não atribuir nomes sem confirmação.
- **Meta de tempo:** **23 min** de conteúdo + 2 min de folga = 25 min.

| # | Bloco | Tempo | Fonte | Critérios | Falante |
|---|---|---|---|---|---|
| 1 | **Abertura.** Pergunta à turma: "Quem usou IA para programar esta semana? Quanto acham que ganharam?" (anotar a resposta para usar no bloco 5) | 1,0 min | `03` §3.1 | C6 | a definir |
| 2 | **O que é.** LLM; três modos (completar → conversar → delegar); contexto e alucinação | 3,0 min | `01` | C1 | a definir |
| 3 | **Histórico.** Linha do tempo 2017→2026 em 3 fases; o padrão "promessa > evidência" | 3,0 min | `02` | C2 | a definir |
| 4 | **Cenário atual.** 84–90% de adoção × confiança caindo; agentes ainda minoria; Brasil 4º no GitHub, mas só 17% das empresas usam IA; regulação (UE em vigor, PL 2338 parado na Câmara) | 3,0 min | `03` | C2, C4 | a definir |
| 5 | **Funciona × não funciona.** Tabela de estudos (+55,8% … −19%); **percepção ≠ medida** (voltar à resposta do bloco 1); amplificador (DORA); qualidade e segurança; o gargalo vira a revisão (curl encerra o bug bounty); caso Replit | 5,0 min | `05` | C2, C4 | a definir |
| 6 | **Conexão com GP.** 5 variáveis de Pressman; estimativas (LOC perde sentido); riscos (Rumsfeld + Knight Capital); Tuckman/estrutura; capacidade de revisão como recurso escasso ("imposto de verificação"); "parece pronto" (aula 10) | 4,0 min | `06` | C3 | a definir |
| 7 | **Caso Unespão.** Funcionou / não funcionou em 4 dias; pergunta das estimativas R$ 60 mil–R$ 356 mil | 2,5 min | `07` | C4 | a definir |
| 8 | **Tendências + fechamento.** "Mais delegação → mais especificação, revisão e controle"; 3 recomendações práticas (ver abaixo) | 1,5 min | `04`, `05` §5.8 | C2, C6 | a definir |
| | **Total** | **23,0 min** | | | |

## As 3 recomendações do fechamento (bloco 8)

Síntese de `05` §5.8, na ordem em que devem aparecer:

1. **Delegue em lotes pequenos, com contexto e critério de pronto escritos** [F-21][F-36].
2. **Nada entra sem revisão humana e verificação automática** (testes, SAST, checagem de dependências) [F-27][F-31][F-36].
3. **Meça estabilidade e resultado, não percepção** [F-15][F-20].

## Checagem de cobertura dos critérios

| Critério | Blocos |
|---|---|
| C1 O que é | 2 |
| C2 Profundidade | 3, 4, 5, 8 + slide final de referências (`99-fontes.md`) |
| C3 Conexão com GP | 6 (e ganchos em 5 e 7) |
| C4 Exemplos e casos reais | 4, 5 (METR, Replit, Google), 7 (Unespão) |
| C5 Clareza do material | Deck GP-02: 1 ideia por slide; número sempre com fonte no rodapé |
| C6 Comunicação e tempo | 1 (interação), 8 (fechamento); ensaio cronometrado em GP-03 |

## Regras para o deck (GP-02)

- Todo número no slide traz a fonte curta no rodapé (ex.: "METR, 2025").
- Último slide: referências completas **só das fontes citadas no deck**, copiadas de `99-fontes.md`.
- O deck pode ser montado em paralelo à GP-01, mas número de fonte **S** ou **X** fica marcado com ⚠ e só vai para a **versão final** depois da reconferência (GP-01).
- Estudo apresentado em slide aparece com a limitação (ex.: "16 devs").
- Nenhum dado ou exemplo que não esteja em `docs/`. Capa: nomes dos membros **confirmados pelo grupo** (perguntar) e professor conforme `CLAUDE.md` da matéria §1. Em caso de dúvida, perguntar ao grupo.
