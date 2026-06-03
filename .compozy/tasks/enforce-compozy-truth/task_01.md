---
status: pending
title: Update project workflow alignment to enforce Compozy
type: docs
complexity: low
dependencies: []
linear_issue_id: CLI-MOCK-01
---

# Task 01: Update project workflow alignment to enforce Compozy

## Overview
Update `doc/workflow.md` (or relevant workflow documents) to include explicit enforcement of the Compozy track requirement in the "Standard Task Workflow".

<requirements>
- Review and update workflow guides to mention `.compozy/tasks/` as the single source of truth for planning and tasks.
- Document the task lifecycle in Compozy (pending, in_progress, completed).
- Define rules for task file naming (`task_NN.md`) and metadata keys (status, dependencies, linear_issue_id).
</requirements>

## Subtasks
- [ ] 01.1 Locate all references to the Conductor framework in workflow docs.
- [ ] 01.2 Replace references with Compozy rules and structures.
- [ ] 01.3 Document standard Compozy task workflow.
