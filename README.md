<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Clinic Care Application

A comprehensive management system for nursing homes and clinics. It provides role-based access for administrators, healthcare professionals, financial staff, and maintenance personnel to streamline operations, enhance resident care, and improve facility management.

## Features

- **Role-Based Access Control:** Secure access tailored to different roles (Admin, Health/Nursing, Finance, Maintenance).
- **Resident Management:** Track resident admissions, details, medical histories, and discharge.
- **Medical Records & E-Prescriptions:** Manage vital signs, evolution records, and medication administration.
- **Nursing Dashboard:** Dedicated tools for nurses to monitor and administer medications.
- **Financial Management:** Handle billing items, costs, and financial tracking for residents.
- **Facility Maintenance:** Log and track preventive and corrective maintenance tasks.
- **Real-time Notifications:** In-app alerts for critical events, maintenance requests, and pending medications.

## Tech Stack

- **Frontend:** React 19, React Router DOM v7
- **Styling:** Tailwind CSS v4, Lucide React (Icons), Framer Motion (Animations), clsx & tailwind-merge
- **State Management:** Zustand
- **Charting:** Recharts
- **Build Tool:** Vite

## Run Locally

**Prerequisites:** Node.js v18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If integrating with an AI Studio or Gemini app, set `GEMINI_API_KEY` in `.env.local`.*
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Contributing

See the [ROADMAP.md](ROADMAP.md) for the planned features and phases of development.
