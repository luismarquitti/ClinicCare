# Índice de Épicos — ClinicCare

> Fonte da verdade para todos os épicos do produto. Cada épico corresponde a uma fase do [Product_Roadmap.md](./Product_Roadmap.md).
> Use `/planning` para detalhar features e criar tasks em qualquer épico.

---

## Tabela de Épicos

| # | Épico | Fase (Mês) | Status | Pasta | Conductor |
|---|-------|-----------|--------|-------|-----------|
| 01 | Fundação, Auth & Onboarding B2B | Fase 1 (Mês 1) | 🔍 In Review | [epicos/01-foundation-auth/](./epicos/01-foundation-auth/) | — |
| 02 | Gestão Clínica — EHR & eMAR Móvel | Fase 2 (Mês 2-3) | 🔍 In Review | [epicos/02-ehr-emar/](./epicos/02-ehr-emar/) | — |
| 03 | Operação & Manutenção | Fase 3 (Mês 4) | 🔍 In Review | [epicos/03-operacional/](./epicos/03-operacional/) | — |
| 04 | Gestão Financeira Completa | Fase 4 (Mês 5) | 🔍 In Review | [epicos/04-financeiro/](./epicos/04-financeiro/) | — |
| 05 | IA, Chatbot & Escalabilidade | Fase 5 (Mês 6+) | 📋 Backlog | [epicos/05-ai-chatbot/](./epicos/05-ai-chatbot/) | — |

> **Nota (2026-03-13):** Épicos 01–04 tiveram implementação acelerada. Todos possuem módulos funcionais no `main`. Status "In Review" indica que o código existe mas gaps de segurança e testes precisam ser corrigidos antes de marcar como "Done". Ver [project_status_report.md](../../.gemini/antigravity/brain/project_status_report.md) e [BACKLOG.md](./BACKLOG.md) para a lista completa de gaps.

**Legenda de Status:**
- 📋 **Backlog** — planejado, aguardando início
- 🔄 **In Progress** — em desenvolvimento ativo
- 🔍 **In Review** — implementado, mas pendente de gaps de segurança / testes / DoD
- ✅ **Done** — concluído, testado e entregue em `main`

---

## Descrições Resumidas

### Épico 01 — Fundação, Auth & Onboarding B2B
Infraestrutura base do produto: CI/CD, RBAC, autenticação B2B, tela de login, módulo de Pessoas/RH.

**Implementado:** Firebase Auth, `ProtectedRoute`, RBAC via Firestore role, módulo `/hr`.
**Pendente (gaps):**
- Custom Claims JWT não implementadas (role lida do Firestore em vez do Token → risco de segurança)
- Fallback inseguro em `firestore.rules` (`getUserRole()` retorna `'admin'` quando claim está ausente)
- Cloud Functions `setUserRole`, `sendInvite`, `acceptInvite` não implementadas
- Testes unitários e de regras de segurança ausentes

**Personas principais:** Super Admin, RH/Administrativo

---

### Épico 02 — Gestão Clínica — EHR & eMAR Móvel
Prontuário Eletrônico, sinais vitais, evoluções e prescrições eletrônicas (eMAR).

**Implementado:** `/residents`, `/residents/new`, `/residents/:id`, `/eprescription/:id`, `/nursing`. Firestore rules para `vitalSigns`, `evolutionRecords`, `medications`, `administrations`.
**Pendente (gaps):**
- Testes Vitest para fluxos críticos do eMAR
- Storybook stories para componentes do prontuário
- Validação de layout mobile-first para uso à beira do leito

**Personas principais:** Médico, Enfermeiro, Técnico de Enfermagem

---

### Épico 03 — Operação & Manutenção
Módulos de inventário/patrimônio e ordens de serviço.

**Implementado:** `/inventory`, `/maintenance`. Firestore rules para `maintenanceLogs`.
**Pendente (gaps):**
- Regras de segurança para coleção `inventory` **ausentes no `firestore.rules`**
- Testes e Storybook

**Personas principais:** Técnico de Manutenção, Coordenador Operacional

---

### Épico 04 — Gestão Financeira Completa
Faturamento, contas a pagar/receber, dashboard de fluxo de caixa.

**Implementado:** `/financial`. Firestore rules para `billingItems`, `accounts`, `categories`, `transactions`.
**Pendente (gaps):**
- Testes Vitest para o módulo financeiro
- Storybook para componentes financeiros

**Personas principais:** Gestão Financeira, Administrador

---

### Épico 05 — IA, Chatbot & Escalabilidade
Assistente Virtual IA via Gemini, integração WhatsApp Business, análise preditiva, Portal Familiar.

**Implementado:** Nada ainda.
**Próximos passos:** Planejar via `/planning` após MVP estável.

**Personas principais:** Todos os usuários (chatbot), Família do Residente

---

*Atualizado em: 2026-03-13 | Gerenciado via `/planning`*
