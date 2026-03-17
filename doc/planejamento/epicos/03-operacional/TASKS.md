# TASKS — Épico 03: Operação & Manutenção

**Épico:** 03 — Operação & Manutenção
**Status:** 🔍 In Review (módulos existentes, gaps de segurança e automação)
**Atualizado:** 2026-03-13

---

## Resumo do Estado Atual (Auditoria 2026-03-13)

| ID | Feature | Status | Observação |
|-----|---------|--------|-----------|
| F03.1 | Gerenciador de Ativos (Patrimônio) | ✅ Implementado | `/inventory` existe |
| F03.2 | Ordens de Serviço (Kanban) | ✅ Implementado | `/maintenance` existe |
| Regras de Segurança — `inventory` | ❌ **AUSENTE** | `firestore.rules` não tem regras para a coleção `inventory` — **acesso irrestrito** |
| Regras de Segurança — `maintenanceLogs` | ✅ Presente | |
| CF `createRecurringOS` | ❌ Não implementada | OS preventiva recorrente não automatizada |

---

## Tasks Pendentes

### 🔴 Crítico — Segurança

- [ ] **OPS-01** Adicionar regras `firestore.rules` para coleção `inventory`:
  - Leitura: `tecnico`, `admin`, `superAdmin`
  - Criação/Edição: `admin`, `superAdmin`
  - Deleção: `superAdmin` apenas
- [ ] **OPS-02** Validar no emulador: usuário sem claim adequado não acessa `inventory`

### 🟡 Alta Prioridade

- [ ] **OPS-03** Criar Cloud Function `createRecurringOS` (Scheduled) — gerar nova OS preventiva ao vencer a recorrência configurada
- [ ] **OPS-04** Log de auditoria em fechamento de OS: registrar usuário, timestamp e custo em `auditLogs`
- [ ] **OPS-05** Integrar status de ativo com abertura de OS: ao abrir OS para ativo, mudar `status: em_manutencao` automaticamente

### 🟢 Qualidade (DoD)

- [ ] **QA-01** Testes Vitest para atualizações de OS (fluxo Aberta → Em Andamento → Concluída)
- [ ] **QA-02** Storybook story para kanban de manutenção

---

## ✅ Definition of Done

- [ ] Regras `inventory` no `firestore.rules` implementadas e testadas
- [ ] CF de OS recorrente implementada
- [ ] Log de auditoria em fechamento
- [ ] Testes passando (0 falhas)

---

*Atualizado em: 2026-03-13 | Gerenciado via `/planning`*
