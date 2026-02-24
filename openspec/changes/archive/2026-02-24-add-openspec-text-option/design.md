## Context

The badge generation currently displays only an icon (no text label) in the subject area of the badge. Users may want to optionally include "OpenSpec" text alongside the icon for better brand visibility and recognition. This requires adding a new configuration input and updating the badge generation logic.

## Goals / Non-Goals

**Goals:**
- Add a new boolean input to control badge label visibility
- Update badge generation to conditionally include "OpenSpec" text in the subject
- Maintain backward compatibility (default to icon-only, current behavior)
- Keep the implementation simple and maintainable

**Non-Goals:**
- Customizing the label text (always "OpenSpec" when enabled)
- Adding icon size or positioning options
- Changing any other badge styling or metrics

## Decisions

### Decision: Input parameter name and type

**Rationale**: Use `show_label` as a boolean input with default value `false`. This maintains backward compatibility and is clear about its purpose.

**Alternatives considered**:
1. `include_openspec_text` - Too verbose
2. `label_enabled` - Less descriptive
3. `show_label` - Chosen: concise and clear

### Decision: Conditional subject in badgen call

**Rationale**: The badgen library accepts a `subject` parameter. Currently it's set to empty string `""`. When `show_label` is true, set it to `"OpenSpec"`. This is the simplest implementation using existing badgen functionality.

**Alternatives considered**:
1. Modify the icon to include text - Would require complex SVG manipulation
2. Use custom SVG generation - Unnecessary complexity
3. Use badgen's subject parameter - Chosen: simple, idiomatic, works with existing code

### Decision: Validation approach

**Rationale**: Accept any truthy value as true, falsy as false. GitHub Actions typically passes `'true'` or `'false'` as strings, so we'll handle string-to-boolean conversion in the validation step.

**Alternatives considered**:
1. Strict validation requiring exactly 'true' or 'false' - Too strict for GitHub Actions context
2. No validation - Could cause confusion
3. Flexible boolean conversion - Chosen: practical for GitHub Actions

## Risks / Trade-offs

**[Trade-off]** Adding "OpenSpec" text makes badges slightly wider → Acceptable, users can choose based on their layout needs

**[Risk]** Users might expect customizable label text → Mitigated by clear naming and documentation; can be extended later if needed
