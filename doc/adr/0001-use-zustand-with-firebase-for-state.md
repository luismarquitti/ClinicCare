# ADR-0001: Use Zustand with Firebase onSnapshot for State

## Status

Accepted

## Context

The ClinicCare application needs a robust and reactive state management solution. The application relies on Firebase Cloud Firestore as its primary NoSQL database. Many users (nurses, admins, financial staff) may access and modify the same data concurrently. We need a way to ensure that the UI stays up-to-date with the database in real-time without introducing excessive complexity or performance bottlenecks.

## Decision Drivers

* **Real-time synchronization** is critical for healthcare applications to avoid conflicting updates and ensure patient safety.
* **Minimal boilerplate** to increase development speed and maintainability.
* **Predictable state updates** decoupled from React component lifecycles.
* **Team familiarity** with React ecosystem tools.

## Considered Options

### Option 1: React Context + `useReducer`

- **Pros**: Built into React, no external dependencies.
* **Cons**: Can lead to "Context Hell", performance issues with unnecessary re-renders if not carefully memoized, lacks powerful middleware.

### Option 2: Redux Toolkit

- **Pros**: Highly structured, excellent DevTools, very mature ecosystem.
* **Cons**: High boilerplate, steep learning curve, can be overkill for an application heavily relying on Firebase's real-time capabilities.

### Option 3: Zustand + Firebase `onSnapshot`

- **Pros**: Minimal boilerplate, hook-based API, easy to integrate with external subscriptions (like Firebase's `onSnapshot`), avoids unnecessary re-renders.
* **Cons**: Less structured than Redux, which requires discipline to maintain clean store files.

## Decision

We will use **Zustand** combined with Firebase's **`onSnapshot`** feature for global state management.

Zustand stores will be responsible for initializing Firebase listeners. When a document or collection updates in Firestore, the `onSnapshot` callback will trigger a Zustand state update, which will reactively update the connected React components.

## Rationale

Zustand provides the best balance of simplicity and performance. Its hook-based approach feels native to React 19, and its lack of boilerplate allows us to cleanly map Firebase's real-time subscriptions to global state. This architecture ensures that our application acts as a true real-time SPA, fulfilling the core requirements of the ClinicCare platform.

## Consequences

### Positive

- Extremely fast development cycle with minimal boilerplate.
* The UI is always synchronized with the database in real-time.
* Stores are decoupled from component trees, allowing logic to live outside React if needed.

### Negative

- We must manually manage the lifecycle of `onSnapshot` listeners to prevent memory leaks.
* Requires team discipline to organize Zustand slices as the application grows.

## Implementation Notes

* Stores should provide an `initializeListeners()` action.
* Ensure all `onSnapshot` unsubscribers are called when a user logs out or a module unmounts.
* Isolate Firebase logic inside the store actions or a separate services layer, keeping React components focused on UI.
