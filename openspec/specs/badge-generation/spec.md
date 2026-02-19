# badge-generation Specification

## Purpose
TBD - created by archiving change badge-generation-and-upload. Update Purpose after archive.
## Requirements
### Requirement: Generate SVG badge

The action SHALL generate an SVG badge file displaying the collected OpenSpec metrics using the `badgen` library with the OpenSpec pixel-art logo as the subject (no text label, icon only).

#### Scenario: Single metric badge
- **WHEN** one metric is configured (e.g., `number_of_specs`)
- **THEN** the action SHALL generate an SVG badge with only the OpenSpec logo on the left and the metric value on the right (e.g., "4 specs")

#### Scenario: Multiple metrics badge
- **WHEN** multiple metrics are configured
- **THEN** the action SHALL generate one SVG badge per metric

#### Scenario: Flat style badge
- **WHEN** `badge_style` is set to `flat`
- **THEN** the action SHALL use the `flat` style option in badgen

### Requirement: Badge color coding

The badge SHALL use color to indicate project health.

#### Scenario: Good health
- **WHEN** the metric values indicate healthy project state (specs exist, tasks progressing)
- **THEN** the badge SHALL use green coloring

#### Scenario: Needs attention
- **WHEN** the metric values indicate the project needs attention (no specs, many open tasks)
- **THEN** the badge SHALL use orange or red coloring

