---
title: "TASKS — Épico 02: Gestão Clínica — EHR & eMAR Móvel"
---
# TASKS — Épico 02: Gestão Clínica — EHR & eMAR Móvel

**Épico:** 02 — Gestão Clínica — EHR & eMAR Móvel
**Status:** 🔍 In Review (módulos existentes, motor eMAR incompleto)
**Atualizado:** 2026-03-13

---

## Resumo do Estado Atual (Auditoria 2026-03-13)

| ID | Feature | Status | Observação |
|-----|---------|--------|-----------|
| F02.1 | Cadastro de Pacientes/Residentes | ✅ Implementado | `/residents`, `/residents/new`, `/residents/:id` |
| F02.2 | Evoluções Diárias & Sinais Vitais | ✅ Implementado | `vitalSigns`, `evolutionRecords` no Firestore |
| F02.3 | Motor de Prescrições → Doses (eMAR Engine) | ⚠️ Parcial | Front de prescrição existe (`/eprescription/:id`), CF geradora de doses ausente |
| F02.4 | Checagem à Beira do Leito (eMAR Mobile) | ⚠️ Parcial | Módulo `/nursing` existe, checagem atomizada não validada end-to-end |
| F02.5 | Notificações de Atraso de Medicação (FCM) | ❌ Não implementado | Cloud Function de monitoramento ausente |

**Regras de Segurança:** `vitalSigns`, `evolutionRecords`, `medications`, `administrations` presentes no `firestore.rules`. ✅

---

## Tasks Pendentes

### 🔴 Crítico

- [ ] **EHR-01** Criar Cloud Function `generateEmarDoses` — disparada ao salvar prescrição, gera registros de doses em `emar/{pacienteId}/doses/` para todo o período
- [ ] **EHR-02** Criar Cloud Function `monitorEmarDelays` (Scheduled, a cada 30 min) — detectar doses não confirmadas e mudar status para `atrasada`
- [ ] **EHR-03** Validar end-to-end da checagem de dose: campos `administradoPor`, `timestamp`, `status: administrada` gravados atomicamente

### 🟡 Alta Prioridade

- [ ] **EHR-04** Implementar FCM: enviar push notification ao responsável de plantão quando dose atrasada
- [ ] **EHR-05** Alert de alergias: ao criar prescrição conflitante, exibir alerta vermelho ao prescritor
- [ ] **EHR-06** Validar layout mobile-first para eMAR (touch-targets ≥ 44px, fonte ≥ 16px, contraste WCAG AA)

### 🟢 Qualidade (DoD)

- [ ] **QA-01** Testes Vitest para fluxos críticos do eMAR (criação de dose, checagem, atraso)
- [ ] **QA-02** Storybook stories para componentes do prontuário e eMAR
- [ ] **QA-03** Testar rules para `medications` e `administrations` com Firebase Emulator
  - [ ] Técnico não consegue ver pacientes de outros plantões
  - [ ] Médico consegue criar prescrição (`clinico` claim)

---

## ✅ Definition of Done

- [ ] Motor eMAR (CF `generateEmarDoses`) implementado e testado
- [ ] Notificações FCM de atraso funcionando
- [ ] Layout mobile validado no emulador
- [ ] Testes passando (0 falhas)

---

*Atualizado em: 2026-03-13 | Gerenciado via `/planning`*
