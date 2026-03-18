---
title: "TASKS — Épico 04: Gestão Financeira Completa"
---
# TASKS — Épico 04: Gestão Financeira Completa

**Épico:** 04 — Gestão Financeira Completa
**Status:** 🔍 In Review (módulo existe, sem testes nem auditoria completa)
**Atualizado:** 2026-03-13

---

## Resumo do Estado Atual (Auditoria 2026-03-13)

| ID | Feature | Status | Observação |
|-----|---------|--------|-----------|
| F04.1 | Invoicing de Pacientes (Faturamento) | ✅ Implementado | `billingItems` no Firestore |
| F04.2 | Contas a Pagar/Receber + Dashboard | ✅ Implementado | `accounts`, `transactions`, `categories` |
| F04.3 | Folha e Adiantamentos Salariais | ⚠️ Parcial | UI `/financial` existe, lógica de folha a verificar |
| Regras de Segurança | ✅ Presente | `billingItems`, `accounts`, `categories`, `transactions` com restrições de role |
| Fatura append-only | ⚠️ A validar | Verificar se `firestore.rules` bloqueia atualização/deleção de `billingItems` |
| Cloud Functions transacionais | ❌ Não implementadas | Fechamento de mês não é CF, pode ter race conditions |

---

## Tasks Pendentes

### 🔴 Crítico — Integridade de Dados

- [ ] **FIN-01** Validar `firestore.rules` para `billingItems`: confirmar que `update` e `delete` estão bloqueados (append-only)
- [ ] **FIN-02** Criar Cloud Function `closeMonthlyBilling` — fechar faturamento do mês em transação Firestore (evitar race conditions client-side)
- [ ] **FIN-03** Garantir log de auditoria em TODOS os lançamentos financeiros (usuário + timestamp + valor)

### 🟡 Alta Prioridade

- [ ] **FIN-04** Validar e completar módulo de Adiantamentos Salariais integrado ao módulo `/hr`
- [ ] **FIN-05** Implementar destaque de contas vencidas (badge vermelho) no dashboard financeiro
- [ ] **FIN-06** Projeção de fluxo de caixa (próximos 30 dias baseada em vencimentos)

### 🟢 Qualidade (DoD)

- [ ] **QA-01** Testes Vitest para: criação de fatura, lançamento de conta a pagar, cálculo de balanço
- [ ] **QA-02** Storybook story para dashboard financeiro
- [ ] **QA-03** Testar no emulador: usuário `financeiro` não pode deletar `billingItems`

---

## ✅ Definition of Done

- [ ] `billingItems` append-only validado por regras + teste
- [ ] CF `closeMonthlyBilling` implementada e testada
- [ ] Logs de auditoria completos
- [ ] Testes passando (0 falhas)

---

*Atualizado em: 2026-03-13 | Gerenciado via `/planning`*
