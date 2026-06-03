---
status: pending
title: Global documentation warning injection
type: docs
complexity: low
dependencies: ["task_01"]
linear_issue_id: CLI-MOCK-02
---

# Task 02: Global documentation warning injection

## Overview
Inject a "Single Source of Truth" warning at the top of all markdown files in the `doc/` directory, pointing to `.compozy/` as the primary entry point for active tasks.

<requirements>
- Inject warning banner in all files under `doc/`.
- Update `doc/index.md` to reference `.compozy/tasks/` instead of `conductor/`.
</requirements>

## Subtasks
- [ ] 02.1 Identify all markdown files in `doc/`.
- [ ] 02.2 Write script or manually add the warning banner pointing to Compozy.
- [ ] 02.3 Update `doc/index.md`.
