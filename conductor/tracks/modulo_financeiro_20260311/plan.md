# Implementation Plan: Módulo Financeiro (Cash Flow Management)

## Phase 1: Backend & Base State [checkpoint: 1e0fe0f]
- [x] **Task: Core Type Definitions** c63384d
  - [x] Define `Account`, `Category`, and `Transaction` types in `src/types/financial.ts`.
- [x] **Task: Firebase Security & Collections** c63384d
  - [x] Implement RBAC-aware rules in `firestore.rules`.
  - [x] Create initial collections and mock data in Firestore.
- [x] **Task: Zustand Store Integration** 104a578
  - [x] Create `src/store/useFinancialStore.ts`.
  - [x] Implement `fetchAccounts`, `fetchCategories`, and `fetchTransactions` using `onSnapshot`.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Backend & Base State' (Protocol in workflow.md)**

## Phase 2: Dashboard & Filters UI [checkpoint: 0ba6ad7]
- [x] **Task: Financial Header & KPIs** 77b2736
  - [x] Implement header displaying Total Income, Expenses, and Balance based on filters.
  - [x] Apply "Refined Minimalist Editorial" styling (typography-led).
- [x] **Task: Reactive Controls** 77b2736
  - [x] Create filter bar for Categories, Dates, and Status.
  - [x] Integrate filters with Zustand state.
- [x] **Task: Conductor - User Manual Verification 'Phase 2: Dashboard & Filters UI' (Protocol in workflow.md)**

## Phase 3: Transaction CRUD [checkpoint: 31fa858]
- [x] **Task: Transaction DataGrid** 1c2b387
  - [x] Implement dense table for transactions grouped by date.
  - [x] Apply "Stark Status Indicators" (color dots).
- [x] **Task: Transaction Modals/Sheets** 573cb26
  - [x] Create reactive form (React Hook Form + Zod) for CRUD.
  - [x] Use Modal for Desktop and Bottom Sheet for Mobile.
- [x] **Task: Deletion Flow** 573cb26
  - [x] Implement confirmation dialog for deletions.
- [x] **Task: Conductor - User Manual Verification 'Phase 3: Transaction CRUD' (Protocol in workflow.md)**

## Phase 4: Advanced Features & Reporting
- [ ] **Task: Account & Category Management**
  - [ ] Create separate CRUD for managing bank accounts and custom categories.
- [ ] **Task: Basic Exporting**
  - [ ] Implement CSV export function for the filtered transaction list.
- [ ] **Task: Conductor - User Manual Verification 'Phase 4: Advanced Features & Reporting' (Protocol in workflow.md)**
