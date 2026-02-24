## MODIFIED Requirements

### Requirement: Generate SVG badge

The action SHALL generate an SVG badge file displaying the collected OpenSpec metrics using the `badgen` library with the official OpenSpec icon (sourced from https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg) as the subject (no text label, icon only).

#### Scenario: Single metric badge
- **WHEN** one metric is configured (e.g., `number_of_specs`)
- **THEN** the action SHALL generate an SVG badge with only the OpenSpec logo on the left and the metric value on the right (e.g., "4 specs")

#### Scenario: Multiple metrics badge
- **WHEN** multiple metrics are configured
- **THEN** the action SHALL generate one SVG badge per metric

#### Scenario: Flat style badge
- **WHEN** `badge_style` is set to `flat`
- **THEN** the action SHALL use the `flat` style option in badgen
