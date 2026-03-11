# Implementation Plan: Frontend Structure Refactor

## Phase 1: Global Style Foundation [checkpoint: 145e5c4]
- [x] Task: Create Global Style Tokens 1ec59b0
    - [x] Create `src/styles/global.ts`.
    - [x] Define shared tokens for Layout, Typography, and Colors based on `product-guidelines.md`.
    - [x] Write a smoke test to verify global tokens export correctly.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Global Style Foundation' (Protocol in workflow.md)

## Phase 2: Component Modularization
- [x] Task: Refactor UI Components eb71c5a
    - [x] Create modular folders for core UI components (e.g., `Navbar`, `Layout`, `MetricCard`).
    - [x] Extract styles into co-located `styles.ts` files for each.
    - [x] Update internal and external imports.
    - [x] Verify each component with its existing or new regression tests.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Component Modularization' (Protocol in workflow.md)

## Phase 3: Page Modularization
- [ ] Task: Refactor Application Pages
    - [ ] Create modular folders for all pages (e.g., `Dashboard`, `Residents`, `Financeiro`).
    - [ ] Extract styles into co-located `styles.ts` files for each.
    - [ ] Update route imports in `src/App.tsx`.
    - [ ] Verify each page renders correctly via manual verification.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Page Modularization' (Protocol in workflow.md)

## Phase 4: Final Integrity & Cleanup
- [ ] Task: Validate Application Build
    - [ ] Run `npm run build` to ensure zero compilation errors.
    - [ ] Perform a project-wide search for any remaining hardcoded strings that should have been extracted.
    - [ ] Verify that all unit tests pass with the new structure.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Integrity & Cleanup' (Protocol in workflow.md)
