# Implementation Plan: Main Dashboard

## Phase 1: Project Scaffolding & Base Layout [checkpoint: 8e1558a]
- [x] Task: Define Dashboard Route and Page Shell fdbd324
    - [x] Create `src/pages/Dashboard.tsx` with a basic "Refined Minimalist" layout.
    - [x] Add the `/dashboard` route to `src/App.tsx`.
    - [x] Write unit tests for route and shell rendering.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Base Layout' (Protocol in workflow.md)

## Phase 2: Data Store & State Management
- [ ] Task: Implement Dashboard Zustand Store
    - [ ] Create `src/store/useDashboardStore.ts`.
    - [ ] Write tests for initial state and data fetching logic (mocking Firebase).
    - [ ] Implement `fetchDashboardStats` using `onSnapshot` from the `dashboard_stats` collection.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Data Store & State Management' (Protocol in workflow.md)

## Phase 3: Core KPI Components
- [ ] Task: Implement Occupancy KPI Card
    - [ ] Write unit tests for `OccupancyCard` (mocking store data).
    - [ ] Implement the card component with real-time occupancy metrics and drill-down navigation.
- [ ] Task: Implement Financial KPI Card
    - [ ] Write unit tests for `FinancialCard` (mocking store data).
    - [ ] Implement the card component with income/expense summaries and drill-down navigation.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Core KPI Components' (Protocol in workflow.md)

## Phase 4: Quick-Action Widgets
- [ ] Task: Implement Quick-Action Widget Layout
    - [ ] Write tests for the layout container and action button triggers.
    - [ ] Implement a grid of widgets for "Admissions" and "Transactions" with action buttons.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Quick-Action Widgets' (Protocol in workflow.md)

## Phase 5: Final Integration & Refinement
- [ ] Task: Finalize Dashboard Layout and Responsiveness
    - [ ] Integrate all components into the main grid.
    - [ ] Add Framer Motion animations for fluid loading.
    - [ ] Verify accessibility compliance and responsive behavior across all viewports.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Integration & Refinement' (Protocol in workflow.md)
