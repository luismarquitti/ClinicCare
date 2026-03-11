# Specification: Frontend Structure Refactor

## 1. Overview
The goal of this track is to refactor the ClinicCare frontend codebase into a modular, maintainable, and highly organized structure. By moving away from flat file structures and hardcoded inline styles, we will improve developer velocity, reduce duplication, and ensure strict adherence to our design guidelines.

## 2. Refactoring Requirements
### Folder Structure (Type-based Modular)
- **Components:** Transform `src/components/` into a modular directory. Each component gets its own folder containing `index.tsx` (component logic), `styles.ts` (extracted Tailwind styles), and any relevant sub-components or tests.
    - Example: `src/components/ui/MetricCard/index.tsx`
- **Pages:** Transform `src/pages/` similarly. Each page gets a dedicated folder.
    - Example: `src/pages/Dashboard/index.tsx`
- **Shared:** Create a centralized location for shared utilities, constants, and global styles.

### Style Extraction (Structured Objects)
- **Co-located Styles:** For every component and page, create a `styles.ts` file.
- **Format:** Extract Tailwind utility strings into a exported `styles` object.
    - Example: `export const styles = { container: 'p-6 bg-white...', title: 'text-2xl font-bold...' };`
- **Consumption:** Components should import this object and apply classes using `styles.container`, etc.

### Global Theme System
- **File:** Create `src/styles/global.ts`.
- **Scope:** Define centralized tokens for:
    - **Layout Constants:** Standardized padding, margin, and gap values.
    - **Color Tokens:** Mapping brand colors (Primary, Secondary, Accent) to semantic names.
    - **Typography Presets:** Pre-defined class strings for headings, body text, and labels.

## 3. Implementation Constraints
- **Zero Functionality Change:** This is a pure refactor. No new features or UI changes should occur.
- **Import Integrity:** All relative and absolute imports must be updated to prevent broken paths.
- **Linting & Types:** Ensure all new files pass strict TypeScript checks and follow the project's formatting rules.

## 4. Acceptance Criteria
- [ ] Application builds successfully without errors.
- [ ] All pages and components render exactly as before the refactor.
- [ ] All components and pages have co-located `styles.ts` files.
- [ ] No hardcoded Tailwind strings remain in the main component files (where possible).
- [ ] `src/styles/global.ts` is created and used for shared tokens.

## 5. Out of Scope
- Migrating to a different styling library (Tailwind CSS v4 remains the standard).
- Refactoring business logic or API services (focus is strictly on UI/File structure).
- Introducing new design elements.
