## ADDED Requirements

### Requirement: Generate SVG badge

The action SHALL generate an SVG badge file displaying the collected OpenSpec metrics using `badgen-cli` with the OpenSpec pixel-art logo embedded via the `--icon` flag.

#### Scenario: Single metric badge
- **WHEN** one metric is configured (e.g., `number_of_specs`)
- **THEN** the action SHALL generate an SVG badge labeled "openspec" with the metric value (e.g., "3 specs")

#### Scenario: Multiple metrics badge
- **WHEN** multiple metrics are configured
- **THEN** the action SHALL generate one SVG badge per metric

#### Scenario: Flat style badge
- **WHEN** `badge_style` is set to `flat`
- **THEN** the action SHALL pass the `--flat` flag to `badgen-cli`

### Requirement: Badge color coding

The badge SHALL use color to indicate project health.

#### Scenario: Good health
- **WHEN** the metric values indicate healthy project state (specs exist, tasks progressing)
- **THEN** the badge SHALL use green coloring

#### Scenario: Needs attention
- **WHEN** the metric values indicate the project needs attention (no specs, many open tasks)
- **THEN** the badge SHALL use orange or red coloring
