---
status: pending
title: AI agent rules and workflows alignment with Compozy
type: docs
complexity: low
dependencies: ["task_01", "task_03"]
linear_issue_id: CLI-MOCK-04
---

# Task 04: AI agent rules and workflows alignment with Compozy

## Overview
Update agent configurations in `.agents/RULES.md` and `.agents/WORKFLOWS.md` to reference Compozy instead of Conductor as the system of record for active tasks, plans, and development guidelines.

## Requirements
- Update `.agents/RULES.md` to direct agents to look in `.compozy/tasks/` for planning.
- Update `.agents/WORKFLOWS.md` to instruct agents to update task status in `.compozy/tasks/` files.
- Ensure any other reference to the Conductor framework is removed or replaced with Compozy.

## Subtasks
- [ ] 04.1 Update `.agents/RULES.md`.
- [ ] 04.2 Update `.agents/WORKFLOWS.md`.
