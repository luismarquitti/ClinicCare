# AGENTS.md — ClinicCare AI Agent Guide

This file is the **primary entry point** for any AI agent (Antigravity, Gemini CLI, Copilot, etc.) working in this repository. Read it in full before taking any action.

---

## 1. Project Overview

**ClinicCare** is a modern Brazilian HealthTech SaaS for clinic management.

| Domain | Description |
|---|---|
| EHR / Clinical | Electronic Health Records, patient management |
| eMAR | Bedside medication administration records |
| Administrative | Financial, facility management, HR modules |

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Shadcn/UI (Radix), Zustand |
| Backend (BaaS) | Firebase (Auth, Firestore, Cloud Storage, Functions, Hosting) |
| Testing | Vitest, Storybook |
| Linting / Format | ESLint, Prettier |

### Source Structure

```
src/
├── components/      # Shared/generic UI components
├── pages/           # Domain pages and feature modules
├── services/        # Firebase/API adapters
├── store/           # Zustand global state slices
├── lib/             # Pure utilities and helpers
├── styles/          # Global CSS and design tokens
└── types/           # Shared TypeScript types/interfaces
```

Other relevant root directories:

```
doc/                 # Product and architecture documentation (PRDs, ADRs, specs)
.agents/             # AI agent governance artifacts (see Section 2)
.github/             # CI workflows
.storybook/          # Storybook configuration
```

---

## 2. AI Agent Governance — `.agents/` Directory

The `.agents/` folder contains all artifacts that guide AI behaviour in this project. **Always check these before proposing changes.**

```
.agents/
├── rules/           # Hard rules the agent must always follow
│   └── commits.md   # Conventional Commits enforcement
├── workflows/       # Step-by-step workflows the agent can execute
│   ├── new-feature.md
│   ├── agile-spec-factory.workflow.md
│   ├── architecture-review.workflow.md
│   ├── docs-manager.workflow.md
│   ├── project-mgmt.workflow.md
│   ├── readme.md
│   └── rules-manager.workflow.md
└── skills/          # Skill library (hundreds of domain-specific skills)
```

### How to use workflows

When asked to perform a workflow (e.g. `/new-feature`), read the corresponding file in `.agents/workflows/` and follow its steps exactly.

### How to use skills

Skills in `.agents/skills/` are self-contained instruction sets. Before using a skill, read its `SKILL.md` file fully. Never apply a skill partially.

---

## 3. Coding Rules (Non-Negotiable)

### 3.1 Frontend

- **Language:** TypeScript only. Strict mode — avoid `any`.
- **Naming:** `camelCase` for variables/functions, `PascalCase.tsx` for components, `use*` prefix for hooks.
- **Styling:** Tailwind CSS with design tokens. No hardcoded color values (e.g. no `text-[#ff0000]`). Use Shadcn/UI (Radix) for headless components.
- **State:** Zustand for global state. No Redux.
- **Architecture:** Domain-driven module separation. Generic components in `src/components/`; domain logic in `src/pages/` or dedicated feature directories.

### 3.2 Firebase / Backend

- **Firestore schema:** Read-optimised. Use sub-collections for incremental patient data (vitals, records).
- **Security Rules:** Every new Firestore access requires an update to `firestore.rules`. The system uses **RBAC via Custom Claims**. Default-deny must always prevail. Never suggest client-side writes that bypass rules.
- **Cloud Functions:** Use for security-sensitive operations (financial transactions, emails, mass aggregation) — never do these on the client.
- **Secrets:** Never expose API keys or service account credentials. Always read from environment variables.

### 3.3 Git & Commits

Branch model: **GitHub Flow** (`main` = production, `feature/*`, `hotfix/*`).

Every commit **must** follow Conventional Commits (see `.agents/rules/commits.md`):

```
feat: add patient dashboard
fix: correct login crash
docs: update ADR-003
refactor: extract usePatientForm hook
test: add unit tests for billing service
```

### 3.4 Definition of Done (DoD)

A feature is mergeable to `main` only when:

1. No console errors at runtime.
2. Responsive layout — mobile-first for bedside (eMAR), desktop for reception.
3. `firestore.rules` updated if new collections are accessed.
4. Tests passing (Vitest) for any critical/security path.
5. Storybook story added/updated for new shared components.

---

## 4. Agent Persona & Behaviour

- **Language:** Write documentation and dense comments in **Brazilian Portuguese**. All code identifiers (variables, functions, business-domain folders) must be in **English**.
- **Posture:** Consultative, proactive, strict about security (LGPD, RBAC). Raise concerns before implementing a solution that could compromise data privacy.
- **Security first:** Always validate RBAC before suggesting data-access patterns. Never assume a user has a permission — always check Custom Claims.
- **No hallucination of rules:** If a pattern or rule is not documented here or in `.agents/`, ask the user before inventing one.

---

## 5. Key Documentation

Full product and architecture docs live in `doc/`. Highlights:

- `doc/prd/` — Product Requirements Documents
- `doc/adr/` — Architecture Decision Records
- `doc/specs/` — Feature specifications

When creating new documentation, always follow the existing structure and link from the relevant ADR or PRD.
