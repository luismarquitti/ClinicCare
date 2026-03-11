# Specification: Enforce Conductor as Single Source of Truth

## Overview
This track aims to firmly establish the `conductor/` directory and the Conductor CLI as the absolute single source of truth for all active development tracks (features, bug fixes, refactors) in the ClinicCare project. It involves updating project documentation, developer onboarding, and AI agent workflows to mandate the use of Conductor.

## Functional Requirements

### 1. Global Documentation Update
- **Warning Injection:** Inject a prominent "Warning" or "Note" at the top of all files in the `doc/` directory (including subdirectories like `doc/planejamento/` and `doc/specs/`).
- **Warning Content:** State that active development planning, specifications, and execution are now managed exclusively via **Conductor tracks** in `conductor/tracks/`.
- **Link:** Provide a link back to `conductor/index.md`.

### 2. New Developer Onboarding
- **File Creation:** Create a new file `doc/guias/onboarding.md`.
- **Content:**
  - Introduce the Conductor framework.
  - Mandate the use of `gemini conductor newTrack` for any new work.
  - Explain the `gemini conductor implement` workflow.
  - Link to `conductor/workflow.md` for full methodology.

### 3. AI Rules & Workflows Alignment
- **Update `.agents/RULES.md`:** Add a strict instruction that AI agents MUST read `conductor/product.md`, `conductor/tech-stack.md`, and the active track's `spec.md` and `plan.md` before making any code changes.
- **Update `.agents/WORKFLOWS.md`:** Reference Conductor as the execution engine for all listed workflows (scaffolding, etc.).

### 4. Workflow Enforcement
- **Update `conductor/workflow.md`:** Add a step or check in the "Standard Task Workflow" that explicitly mandates checking for an active Conductor track before starting any task.

## Acceptance Criteria
- [ ] Every file in `doc/` contains the Conductor source-of-truth warning.
- [ ] `doc/guias/onboarding.md` exists and contains the correct Conductor CLI instructions.
- [ ] `.agents/RULES.md` and `.agents/WORKFLOWS.md` are updated with Conductor-centric instructions.
- [ ] `conductor/workflow.md` includes explicit enforcement of the Conductor track requirement.
- [ ] All updated documents provide clear paths to the `conductor/` directory.

## Out of Scope
- Migrating old documents from `doc/` to `conductor/` (unless they are active tracks).
- Implementing technical CI/Git hook enforcement (Workflow-level only).
