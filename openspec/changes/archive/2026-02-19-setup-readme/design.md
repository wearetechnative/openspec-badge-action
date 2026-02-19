## Context

The README currently has 2 lines. The action itself is not yet implemented (Issue #2), but we need documentation now so contributors understand the project's purpose and direction. Issue #1 calls for "minimal about and instructions in the README.md."

## Goals / Non-Goals

**Goals:**
- Clearly communicate what the action will do
- Provide a usage example users can copy
- Document the planned configuration options
- Keep it honest — mark pre-release status clearly

**Non-Goals:**
- Documenting implementation internals (no code exists yet)
- Writing a full contributing guide (a brief section is enough for now)

## Decisions

### Decision 1: Use a forward-looking usage example

Show a realistic `action.yml` usage snippet even though the action isn't implemented yet. Mark the README with a "Work in Progress" notice so expectations are clear.

**Rationale:** People evaluating the project need to see what the end result looks like. A usage example communicates intent faster than paragraphs of text.

### Decision 2: Document configuration from Issue #2

Include the `metric_types` configuration (`number_of_specs`, `number_of_requirements`, `tasks_status`, `open_changes`) from Issue #2 even though it's not implemented.

**Rationale:** This is the planned public API. Documenting it early invites feedback and aligns contributors.

## Risks / Trade-offs

- [Docs may drift from implementation] → Acceptable for now; specs and the change archive will track the evolution.
