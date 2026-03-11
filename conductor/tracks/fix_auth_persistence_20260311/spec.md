# Track Specification: fix_auth_persistence

## Overview
Implement persistent authentication across re-renders and page refreshes using Firebase Auth and Zustand. This track ensures that the user's session is correctly restored before the application's protected routes are rendered, providing a seamless user experience.

## Functional Requirements
- **Auth Persistence Strategy:** Explicitly set Firebase Auth persistence to `browserLocalPersistence` in `src/services/firebase.ts`.
- **Global Auth State:** Update the Zustand store (`src/store/index.ts`) to include:
    - `isLoadingAuth`: boolean (initial value: `true`).
    - `setAuthLoading(loading: boolean)`: action to update the loading state.
    - `user`: Store the full Firebase `User` object or `null`.
- **Auth Listener:** Implement a `useEffect` hook in `src/App.tsx` using Firebase's `onAuthStateChanged`.
    - On state change:
        1. Update the Zustand `user` state.
        2. Set `isLoadingAuth` to `false`.
- **Loading UX:** While `isLoadingAuth` is `true`, display a top loading bar across the application.
- **Error Handling:** If the authentication check fails, the user should be redirected to the login page.

## Non-Functional Requirements
- **Performance:** Ensure the auth check is performed early in the application lifecycle.
- **Type Safety:** Use strict TypeScript types for the user object and store actions.

## Acceptance Criteria
- [ ] Application does not flash unauthenticated content on page refresh.
- [ ] Zustand store correctly reflects the user's login status after Firebase resolves.
- [ ] Top loading bar is visible until the auth session is determined.
- [ ] Protected routes correctly handle redirects if the user is not authenticated.

## Out of Scope
- Implementation of RBAC/Custom Claims logic (handled in other tracks).
- Login/Signup UI components.
