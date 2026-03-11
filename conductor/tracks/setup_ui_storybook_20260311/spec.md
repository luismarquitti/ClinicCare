# Specification: Setup UI Storybook

## Overview
Install and configure Storybook for the ClinicCare React application to provide a living style guide and component documentation platform. This will enable isolated component development, interactive testing, and visual documentation using Storybook best practices.

## Functional Requirements

### 1. Installation & Base Configuration
- **Install Storybook:** Use `npx storybook@latest init` to scaffold the environment.
- **Vite Integration:** Ensure Storybook is correctly configured to use the Vite builder (Vite 6).
- **Global Styles:** Import `src/index.css` in `.storybook/preview.ts` to ensure Tailwind CSS v4 styles are applied to all stories.
- **Framework Support:** Configure decorators in `preview.ts` for:
  - `react-router-dom` (using `MemoryRouter`).
  - Global state (if components require Zustand store access).

### 2. Addons & Enhancements
- **Accessibility:** Include `@storybook/addon-a11y` for WCAG compliance checking.
- **Interactions:** Include `@storybook/addon-interactions` for testing component behavior.
- **Tailwind Integration:** Include specific addons to visualize Tailwind tokens if applicable.
- **Autodocs:** Enable the `autodocs` feature for all stories to generate documentation pages automatically.

### 3. Component Stories Implementation
- **Atomic Design Organization:** Group stories in the sidebar following Atomic Design principles (Atoms, Molecules, Organisms, Templates, Pages).
- **Priority Components:**
  - **Shared UI Atoms:** Buttons, Inputs, Modals (Shadcn UI wrappers).
  - **Layout Components:** Navbar, Main Layout, Sidebar.
  - **Finance Module:** FilterBar, TransactionList, DashboardMetrics.
  - **Dashboard/Charts:** Analytics charts and data visualizations.
- **Interactive Testing:** Define comprehensive `args` and `argTypes` for all stories to allow testing various component states (loading, empty, error, active, etc.).

### 4. Build & Distribution
- **Scripts:** Ensure `package.json` contains `storybook` (dev) and `build-storybook` (static export) scripts.

## Acceptance Criteria
- [ ] Storybook runs locally via `npm run storybook`.
- [ ] All priority components have corresponding `*.stories.tsx` files.
- [ ] Tailwind CSS styles are correctly rendered within the Storybook iframe.
- [ ] Accessibility panel shows zero critical violations for core UI atoms.
- [ ] Sidebar organization matches the Atomic Design structure.
- [ ] Static Storybook build succeeds via `npm run build-storybook`.

## Out of Scope
- Migrating existing Vitest/React Testing Library tests into Storybook interaction tests (only creating the stories).
- Documentation for logic-heavy "smart" components that cannot be easily isolated from backend services.
