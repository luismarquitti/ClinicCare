# Implementation Plan: fix_auth_persistence_20260311

## Phase 1: Store & Firebase Service Setup [checkpoint: 539258c]
Focus on updating the global state and the base Firebase service to support auth persistence.

- [x] Task: Update Zustand store (`src/store/index.ts`) (c5efde1)
    - [x] Write tests for `isLoadingAuth`, `user` state, and `setAuthLoading` action.
    - [x] Implement `isLoadingAuth` (default `true`) and `setAuthLoading` in the store.
- [x] Task: Update Firebase service (`src/services/firebase.ts`) (4821639)
    - [x] Write tests to verify auth persistence configuration.
    - [x] Implement `setPersistence(auth, browserLocalPersistence)` in the Firebase initialization.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Store & Firebase Service Setup' (Protocol in workflow.md)

## Phase 2: App Integration & UI
Integrate the auth listener and display the loading state to the user.

- [ ] Task: Implement Auth Listener in `src/App.tsx`
    - [ ] Write tests for the `onAuthStateChanged` integration in `App.tsx`.
    - [ ] Implement `useEffect` with `onAuthStateChanged` to update the Zustand store and toggle `isLoadingAuth`.
- [ ] Task: Implement Top Loading Bar & Auth Guard
    - [ ] Write tests for the loading bar visibility and redirect logic.
    - [ ] Implement a top loading bar component using Tailwind CSS.
    - [ ] Update the main layout to render the loading bar when `isLoadingAuth` is `true`.
    - [ ] Ensure the app handles redirects if the auth check fails.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: App Integration & UI' (Protocol in workflow.md)
