# Specification: Módulo Financeiro (Cash Flow Management)

## 1. Overview and Alignment
The Financial Module aims to modernize cash flow control for the clinic. It enables the financial department and administrators (`FINANCIAL`, `SUPER_ADMIN`) to manage accounts, cards, income, and expenses with detailed categorization, recurrence management, and cash projections. This feature operates strictly within the security boundaries of Firebase RBAC, ensuring operational agility without exposing clinical data.

## 2. Technical Specification and Modeling
### Firestore Collections (`src/types/financial.ts`)
- **Accounts:** Bank accounts and cards.
- **Categories:** Transaction types (Income/Expense).
- **Transactions:** Individual entries with status (Paid, Pending, Overdue).

### Global State (Zustand)
File: `src/store/useFinancialStore.ts`
- **State:** `accounts`, `categories`, `transactions`, `filters`.
- **Actions:** Real-time fetching (`onSnapshot`), CRUD operations.
- **Computed Properties:** Dynamic balances and metrics for the dashboard.

## 3. Design Guidelines (Refined Minimalist Editorial)
- **Typography-led:** Strong weights for monetary values.
- **Container-less Structure:** Data grids anchored by alignment and minimal separators.
- **Stark Status Indicators:** High-contrast color dots instead of soft pill backgrounds.
- **DFII Score:** Targeted excellence (>12).

## 4. Security Matrix (firestore.rules)
- Strictly restricted to `FINANCIAL` and `SUPER_ADMIN` roles.
- `HEALTH_PRO` and others cannot read financial data.

## 5. Acceptance Criteria
- Real-time updates via `onSnapshot`.
- Dashboard and table reactivity < 1s.
- Fully responsive (Desktop Web + Mobile Bottom Sheet).
- Security rules verified.
- Strict Zod validation for forms.
