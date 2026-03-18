---
title: "SPRINT PLAN — Épico 01: Fundação, Auth & Onboarding B2B"
---
# SPRINT PLAN — Épico 01: Fundação, Auth & Onboarding B2B

**Gerado em:** 2026-03-13
**Duração das Sprints:** 2 semanas cada
**Capacidade por Sprint:** ~30 story points (time de 2 devs)

---

## Sprint 1 — Infraestrutura Base & RBAC (2 semanas)

**Objetivo:** Ter Firebase configurado, CI/CD funcionando e RBAC validado por testes.

| # | Task | Estimativa | Owner |
|---|------|-----------|-------|
| 1.1 | Configurar projeto Firebase completo (Auth + Firestore + Functions + Storage + Hosting) | 1d | — |
| 1.2 | Setup Vite + React 19 + TypeScript strictMode | 0.5d | — |
| 1.3 | Configurar Tailwind + Shadcn/UI + Radix | 0.5d | — |
| 1.4 | ESLint + Prettier + `.editorconfig` | 0.5d | — |
| 1.5 | **GitHub Actions CI:** lint → test → deploy no merge de `main` | 1d | — |
| 1.7 | Firebase Emulator Suite (local dev) | 0.5d | — |
| 1.8 | Vitest + cobertura configurada | 0.5d | — |
| 2.1 | Definir schema de Custom Claims (6 roles) | 0.5d | — |
| 2.2 | Cloud Function `setUserRole` (somente superAdmin) | 1d | — |
| 2.3 | Cloud Function `onUserCreate` (role padrão) | 0.5d | — |
| 2.4 | `firestore.rules` — default-deny + grants por role | 1d | — |
| 2.5 | Testes de segurança `firestore.rules` (Firebase Emulator) | 1d | — |

**Total estimado:** ~8.5 dias / 34 pts
**Entrega Sprint 1:** Infra ✅ + RBAC testado ✅ + CI rodando ✅

---

## Sprint 2 — Login B2B + Módulo de Pessoas (2 semanas)

**Objetivo:** Usuário consegue fazer login, ver colaboradores e convidar novos membros da equipe.

| # | Task | Estimativa | Owner |
|---|------|-----------|-------|
| 3.1 | Tela de Login (`/login`) — Zod + RHF + Shadcn/UI | 1d | — |
| 3.2 | Integração Firebase Auth `signInWithEmailAndPassword` | 0.5d | — |
| 3.3 | Hook `useAuth` Zustand (auth state + claims) | 1d | — |
| 3.4 | `ProtectedRoute` — redirect sem sessão | 0.5d | — |
| 3.5 | `RoleGuard` — bloqueio por role insuficiente (403) | 0.5d | — |
| 3.6 | Tela de Onboarding Super Admin (first-run) | 1d | — |
| 3.7 | Cloud Function `createClinic` (setup inicial de tenant) | 1d | — |
| 4.1 | Coleção `colaboradores` no Firestore (schema + rules) | 0.5d | — |
| 4.2 | Tela `/pessoas` (DataTable paginada) | 1d | — |
| 4.3 | Formulário de convite (email + role) | 0.5d | — |
| 4.4 | Cloud Function `sendInvite` (Firebase Trigger Email Extension) | 1d | — |
| 4.5 | Cloud Function `acceptInvite` (token → criar usuário → role) | 1d | — |
| 4.6 | Toggle ativar/desativar colaborador | 0.5d | — |
| 4.7 | Auditoria de mutações de colaboradores | 0.5d | — |

**Total estimado:** ~10 dias / 40 pts
**Entrega Sprint 2:** Login B2B ✅ + Pessoas/Colaboradores ✅

---

## Sprint 3 — Testes, Storybook & Hardening (1 semana)

**Objetivo:** DoD completo — testes, Storybook, zero erros de console, zero secrets.

| # | Task | Estimativa | Owner |
|---|------|-----------|-------|
| 5.1 | Testes unitários Vitest: `useAuth`, `ProtectedRoute`, `RoleGuard` | 1d | — |
| 5.2 | Testes Cloud Functions: `setUserRole`, `sendInvite`, `acceptInvite` | 1d | — |
| 5.3 | Testes de responsividade (Login mobile, Pessoas desktop) | 0.5d | — |
| 5.5 | Storybook: `LoginForm`, `DataTable`, `RoleGuard` | 1d | — |
| 5.6-5.7 | Audit: console errors + secrets scan | 0.5d | — |
| 5.8 | README.md atualizado com setup local | 0.5d | — |

**Total estimado:** ~4.5 dias / 18 pts
**Entrega Sprint 3:** Épico 01 pronto para produção ✅

---

## Velocity Reference

| Sprint | Story Points | Status |
|--------|-------------|--------|
| Sprint 1 | 34 pts | 📋 Backlog |
| Sprint 2 | 40 pts | 📋 Backlog |
| Sprint 3 | 18 pts | 📋 Backlog |
| **Total Épico 01** | **92 pts** | 📋 Backlog |

---

## Riscos do Sprint

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| Firebase Functions cold start em CI | Média | Alto | Usar emulador + aumentar timeout |
| Firebase Trigger Email Extension lenta para configurar | Alta | Médio | Testar setup na Sprint 1 como spike |
| RBAC com Custom Claims mais complexo que previsto | Baixa | Alto | Ter PoC do `setUserRole` como primeiro item da Sprint 1 |
