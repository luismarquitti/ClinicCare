# Implementation Plan: Módulo Financeiro (Cash Flow Management)

## Phase 1: Backend & Base State
- [x] **Task: Core Type Definitions** c63384d
  - [x] Define `Account`, `Category`, and `Transaction` types in `src/types/financial.ts`.
- [ ] **Task: Firebase Security & Collections**
  - [ ] Implement RBAC-aware rules in `firestore.rules`.
  - [ ] Create initial collections and mock data in Firestore.
- [ ] **Task: Zustand Store Integration**
  - [ ] Create `src/store/useFinancialStore.ts`.
  - [ ] Implement `fetchAccounts`, `fetchCategories`, and `fetchTransactions` using `onSnapshot`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Backend & Base State' (Protocol in workflow.md)**

## Phase 2: Dashboard & Filters UI
- [ ] **Task: Financial Header & KPIs**
  - [ ] Implement header displaying Total Income, Expenses, and Balance based on filters.
  - [ ] Apply "Refined Minimalist Editorial" styling (typography-led).
- [ ] **Task: Reactive Controls**
  - [ ] Create filter bar for Categories, Dates, and Status.
  - [ ] Integrate filters with Zustand state.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Dashboard & Filters UI' (Protocol in workflow.md)**

## Phase 3: Transaction CRUD
- [ ] **Task: Transaction DataGrid**
  - [ ] Implement dense table for transactions grouped by date.
  - [ ] Apply "Stark Status Indicators" (color dots).
- [ ] **Task: Transaction Modals/Sheets**
  - [ ] Create reactive form (React Hook Form + Zod) for CRUD.
  - [ ] Use Modal for Desktop and Bottom Sheet for Mobile.
- [ ] **Task: Deletion Flow**
  - [ ] Implement confirmation dialog for deletions.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Transaction CRUD' (Protocol in workflow.md)**

## Phase 4: Advanced Features & Reporting
- [ ] **Task: Account & Category Management**
  - [ ] Create separate CRUD for managing bank accounts and custom categories.
- [ ] **Task: Basic Exporting**
  - [ ] Implement CSV export function for the filtered transaction list.
- [ ] **Task: Conductor - User Manual Verification 'Phase 4: Advanced Features & Reporting' (Protocol in workflow.md)**
