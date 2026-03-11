# Specification: Main Dashboard Implementation

## 1. Overview
The Main Dashboard serves as the central mission control for ClinicCare. It provides administrators and staff with an immediate, high-level overview of the institution's operational and financial health, facilitating quick decision-making and efficient navigation.

## 2. Functional Requirements
- **Core Metrics Display:**
    - **Occupancy:** Total number of residents and count of available/occupied beds.
    - **Financial:** Monthly aggregate of income vs. expenses.
- **Layout & Structure:**
    - A **Metric-first Grid** layout.
    - High-level KPI cards at the top for primary metrics.
    - Responsive containers for detailed views or charts below the KPI row.
- **Data Strategy:**
    - Fetch data from a single, pre-calculated `dashboard_stats` document in Firestore to minimize read costs and latency.
    - Real-time reactivity to updates in the summary document.
- **Interactivity:**
    - **Drill-down Navigation:** KPI cards and widgets are clickable, routing the user to the corresponding full module (e.g., Financial, Residents).
    - **In-widget Actions:** Include primary action buttons (e.g., "Admitir Residente", "Novo Lançamento") directly within the relevant dashboard sections.

## 3. Non-Functional Requirements
- **Performance:** Initial dashboard load and data render in under 1 second.
- **Design:** Strict adherence to the "Premium UX" and "Refined Minimalist Editorial" design guidelines (Inter/Geist typography, high-contrast indicators).
- **Accessibility:** Ensure all dashboard elements meet WCAG 2.1 contrast and screen-reader standards.

## 4. Acceptance Criteria
- [ ] Dashboard displays accurate occupancy and financial totals from the database.
- [ ] Clicking a KPI card navigates the user to the correct internal route.
- [ ] Quick-action buttons successfully trigger their respective modal or form.
- [ ] UI is fully functional and readable on Desktop, Tablet, and Mobile.

## 5. Out of Scope
- Detailed historical trend analysis (current month focus only).
- User-level dashboard customization (e.g., dragging widgets).
- Individual resident health alerts (managed in the Clinical Care module).
