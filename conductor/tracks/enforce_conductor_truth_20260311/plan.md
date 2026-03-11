# Implementation Plan: Enforce Conductor as Single Source of Truth

## Phase 1: Project Workflow Alignment (Enforcement)
- [ ] Task: Update `conductor/workflow.md` to include explicit enforcement of the Conductor track requirement in the "Standard Task Workflow".
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Workflow Alignment' (Protocol in workflow.md)

## Phase 2: Global Documentation Warning Injection
- [ ] Task: Inject a "Single Source of Truth" warning at the top of all files in the `doc/` directory (including subdirectories like `doc/planejamento/` and `doc/specs/`).
- [ ] Task: Update `doc/index.md` to point to `conductor/index.md` as the primary entry point for active development.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Global Documentation Warning Injection' (Protocol in workflow.md)

## Phase 3: New Developer Onboarding Guide
- [ ] Task: Create `doc/guias/onboarding.md` containing Conductor framework introduction and CLI instructions (`newTrack`, `implement`).
- [ ] Task: Link the new onboarding guide in the project `README.md`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: New Developer Onboarding Guide' (Protocol in workflow.md)

## Phase 4: AI Agent Rules & Workflows Alignment
- [ ] Task: Update `.agents/RULES.md` to include strict instructions for AI agents to prioritize Conductor tracks and core documents (`product.md`, `tech-stack.md`).
- [ ] Task: Update `.agents/WORKFLOWS.md` to reference Conductor as the execution engine for all workflows.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: AI Agent Rules & Workflows Alignment' (Protocol in workflow.md)
