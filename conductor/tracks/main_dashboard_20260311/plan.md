# Implementation Plan: Main Dashboard

## Phase 1: Project Scaffolding & Base Layout [checkpoint: 8e1558a]
- [x] Task: Define Dashboard Route and Page Shell fdbd324
    - [x] Create `src/pages/Dashboard.tsx` with a basic "Refined Minimalist" layout.
    - [x] Add the `/dashboard` route to `src/App.tsx`.
    - [x] Write unit tests for route and shell rendering.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Base Layout' (Protocol in workflow.md)

## Phase 2: Data Store & State Management [checkpoint: 8ec4a4c]
- [x] Task: Implement Dashboard Zustand Store e3c242f
    - [x] Create `src/store/useDashboardStore.ts`.
    - [x] Write tests for initial state and data fetching logic (mocking Firebase).
    - [x] Implement `fetchDashboardStats` using `onSnapshot` from the `dashboard_stats` collection.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Data Store & State Management' (Protocol in workflow.md)

## Phase 3: Core KPI Components [checkpoint: d925496]
- [x] Task: Implement Occupancy KPI Card 9bd5759
    - [x] Write unit tests for `OccupancyCard` (mocking store data).
    - [x] Implement the card component with real-time occupancy metrics and drill-down navigation.
- [x] Task: Implement Financial KPI Card 143916a
    - [x] Write unit tests for `FinancialCard` (mocking store data).
    - [x] Implement the card component with income/expense summaries and drill-down navigation.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Core KPI Components' (Protocol in workflow.md)

## Phase 4: Quick-Action Widgets [checkpoint: 92707ba]
- [x] Task: Implement Quick-Action Widget Layout 66357bf
    - [x] Write tests for the layout container and action button triggers.
    - [x] Implement a grid of widgets for "Admissions" and "Transactions" with action buttons.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Quick-Action Widgets' (Protocol in workflow.md)

## Phase 5: Final Integration & Refinement
- [ ] Task: Finalize Dashboard Layout and Responsiveness
    - [ ] Integrate all components into the main grid.
    - [ ] Add Framer Motion animations for fluid loading.
    - [ ] Verify accessibility compliance and responsive behavior across all viewports.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Integration & Refinement' (Protocol in workflow.md)
