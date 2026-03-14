# Tech Stack: ClinicCare

## ⚛️ Frontend Architecture
- **Framework:** [React 19](https://react.dev/)
- **Package Manager:** [Yarn Classic (v1.22+)](https://classic.yarnpkg.com/) for deterministic dependency management.
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript 5+](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/) for lightweight, predictable global state.
- **Routing:** Built-in React routing or lightweight community standard (React Router).

## ☁️ Backend & Infrastructure (BaaS)
- **Platform:** [Google Firebase](https://firebase.google.com/)
- **Authentication:** Firebase Auth (RBAC via Custom Claims) with browser-local session persistence.
- **Database:** Cloud Firestore (NoSQL, Real-time).
- **Storage:** Firebase Storage (Resident documents and photos).
- **Hosting:** Firebase Hosting (CDN-backed, global distribution).

## 🎨 UI & Styling
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for utility-first design.
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives) for accessible, customizable components.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid, premium interactions.
- **Data Visualization:** [Recharts](https://recharts.org/) for healthcare analytics and metrics.

## 🧪 Testing & Quality
- **Unit Testing:** [Vitest](https://vitest.dev/)
- **Component Testing:** [React Testing Library](https://testing-library.com/)
- **Linting & Formatting:** ESLint & Prettier.
- **Type Checking:** Strict TypeScript configuration.
