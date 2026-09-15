<!-- Last updated: 2026-09-15 -->

# Business — Sistema Unespão

> **Nota:** Este é um resumo de roteamento. A **fonte canônica completa** está em **`../../produto/business.md`**.
> Para o texto completo, tabelas detalhadas, e justificativas, leia lá. Este arquivo aponta para lá e guarda
> notas de gaps/confirmação pendente.

Plataforma de pedidos personalizados para padaria Unespão (estilo Subway/Spoleto). Atores: Cliente, Atendente/Administrador.
Escopo: cadastro de clientes (OAuth Google), gestão de catálogo/estoque, montagem de pedidos personalizados, pagamento,
histórico, sugestões. Fora: delivery, múltiplas lojas, RH, contabilidade.

**6 objetivos de qualidade:** Usabilidade (Alta), Confiabilidade de Estoque (Alta), Segurança (Alta), Relevância de Sugestões (Média),
Desempenho em Pico (Média), Manutenibilidade (Média).

**Gap pendente:** LGPD/compliance — ainda não foi formalmente adotado como requisito. Confirmar com grupo antes de tratar como obrigatório.

## Ver também

- **`../../produto/business.md`** — versão canônica, completa, com tabelas e justificativas.
- [[architecture]] — arquitetura do sistema.
- [[guidelines]] — processo de redação.
