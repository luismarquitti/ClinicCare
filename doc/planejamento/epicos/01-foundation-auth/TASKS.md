---
title: "TASKS — Épico 01: Fundação, Auth & Onboarding B2B"
---
# TASKS — Épico 01: Fundação, Auth & Onboarding B2B

**Épico:** 01 — Fundação, Auth & Onboarding B2B
**Status:** 🔍 In Review (implementado com gaps críticos de segurança)
**Atualizado:** 2026-03-13

---

## Resumo do Estado Atual (Auditoria 2026-03-13)

> ⚠️ Este épico foi implementado de forma acelerada. A estrutura existe mas gaps críticos precisam ser corrigidos antes do MVP.

| ID | Tarefa | Status | Observação |
|-----|--------|--------|-----------|
| 1.1-1.9 | Infra base (Firebase, Vite, TypeScript, Tailwind, ESLint) | ✅ Concluído | Verificado no codebase |
| 2.1 | Esquema de Custom Claims | ❌ Gap crítico | Role lida do Firestore, não do JWT |
| 2.2 | CF `setUserRole` | ❌ Não implementada | Ausente em `/functions` |
| 2.3 | CF `onUserCreate` | ❌ Não implementada | Ausente |
| 2.4 | `firestore.rules` com default-deny | ⚠️ Parcial | Fallback inseguro: retorna `'admin'` quando claim ausente |
| 2.5 | Testes de regras de segurança | ❌ Ausentes | Crítico |
| 3.1 | Página `/login` | ✅ Concluído | Implementada com Shadcn/UI |
| 3.2 | Firebase Auth `signInWithEmailAndPassword` | ✅ Concluído | |
| 3.3 | Hook `useAuth` (Zustand) | ✅ Concluído | Presente em `/store/authStore.ts` |
| 3.4 | `ProtectedRoute` | ✅ Concluído | Implementado |
| 3.5 | `RoleGuard` | ✅ Concluído | Implementado via `PermissionGate` |
| 3.6-3.7 | Onboarding Super Admin + CF `createClinic` | ❌ Não implementados | |
| 4.1 | Coleção `colaboradores` no Firestore | ✅ Concluído | |
| 4.2 | Página `/hr` (People/Colaboradores) | ✅ Concluído | |
| 4.3 | Formulário de convite | ⚠️ Parcial | UI existe, backend (CF) não |
| 4.4-4.5 | CF `sendInvite` / `acceptInvite` | ❌ Não implementadas | |
| 4.6 | Toggle ativar/desativar colaborador | ✅ Concluído | |
| 4.7 | Log de auditoria em mutações | ⚠️ Parcial | Logs manuais, sem padrão |
| 5.1-5.3 | Testes Vitest + Storybook | ❌ Ausentes | |

---

## Tasks Pendentes (Ordenadas por Prioridade)

### 🔴 Crítico — Segurança (Bloqueador de MVP)

- [ ] **SEC-01** Implementar Custom Claims via Firebase Auth (`setCustomUserClaims`) na CF `setUserRole`
- [ ] **SEC-02** Corrigir `firestore.rules` — substituir fallback `'admin'` por `'none'` na função `getUserRole()`
- [ ] **SEC-03** Migrar verificação de role do Firestore (`userDoc.role`) para JWT Custom Claims em toda a aplicação
- [ ] **SEC-04** Criar Cloud Function `onUserCreate` — setar claim padrão `{ role: 'pending' }` na criação
- [ ] **SEC-05** Escrever testes de regras de segurança com `@firebase/rules-unit-testing`
  - [ ] Acesso negado sem autenticação
  - [ ] Acesso negado com role errado
  - [ ] Acesso permitido com role correto
  - [ ] Escrita de `auditLog` por usuário comum (deve falhar)

### 🟡 Alta Prioridade — Funcionalidade

- [ ] **FUNC-01** Criar Cloud Function `sendInvite` — enviar e-mail de convite com token seguro
- [ ] **FUNC-02** Criar Cloud Function `acceptInvite` — validar token e criar usuário
- [ ] **FUNC-03** Criar fluxo de Onboarding do Super Admin (first-run setup da clínica)
- [ ] **FUNC-04** Criar Cloud Function `createClinic` — inicializar tenant no Firestore

### 🟢 Qualidade (DoD)

- [ ] **QA-01** Escrever testes Vitest para: `useAuth`, `ProtectedRoute`, `RoleGuard`/`PermissionGate`
- [ ] **QA-02** Adicionar Storybook story para: `LoginForm`, tabela de Colaboradores
- [ ] **QA-03** Verificar zero `console.error` em runtime (dev + prod)
- [ ] **QA-04** Verificar zero secrets hardcoded

---

## ✅ Definition of Done (DoD)

- [ ] Custom Claims JWT funcionando (não Firestore lookup no client)
- [ ] `firestore.rules` sem fallbacks inseguros, testado em emulador
- [ ] Cloud Functions de invite implementadas e testadas
- [ ] Testes Vitest passando (0 falhas)
- [ ] Zero erros no console em runtime
- [ ] Commit em Conventional Commits

---

*Atualizado em: 2026-03-13 | Gerenciado via `/planning`*
