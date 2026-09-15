<!-- Last updated: 2026-09-15 -->

# Architecture — Sistema Unespão

> **Nota:** Este é um resumo de roteamento. A **fonte canônica completa** está em **`../../produto/architecture.md`**.
> Para o texto completo, diagramas C4, SOLID detalhado, e justificativas, leia lá. Este arquivo aponta para lá e guarda
> notas de gaps/confirmação pendente.

**Estilo:** Clean Architecture (Controllers → Services → Repositories/Adapters → Domain Models).

**Stack:** .NET 8/ASP.NET Core (API) + PostgreSQL (dados) + React 18 SPA (UI). Já definida, não é objeto de discussão.

**C4:** Nível 1 (Cliente/Atendente → Sistema ↔ Google Auth, Gateway Pagamento, API CEP); Nível 2 (Web App SPA + API + DB); Nível 3 (6 grupos: Controllers, Services, Repositories, Adapters, Domain Models, Infrastructure).

**SOLID aplicado:** SRP em EstoqueService (controle centralizado); DIP em Services (abstrações, não concretos).

**Decisões chave:** SPA único (sem app nativo), loja única (CEP reservado), comunicação externa só na API.

**Estado real do código:** Protótipo React 18 + TypeScript em `materias/engenharia-software-2-2026/src/` (demo/apresentação, 100% client-side, dados mock). Nenhum backend/BD/pagamento real. Confirmar com usuário quando implementar a API .NET de verdade.

**Gap pendente:** Nenhuma decisão sobre LGPD/PCI-DSS até o momento. Confirmar com grupo.

## Ver também

- **`../../produto/architecture.md`** — versão canônica, completa, com diagramas e justificativas.
- [[business]] — domínio e requisitos.
- [[guidelines]] — processo de redação.
