## MODIFIED Requirements

### Requirement: Generate SVG badge

The action SHALL generate an SVG badge file displaying the collected OpenSpec metrics using the `badgen` library with the official OpenSpec icon as the subject. The subject SHALL include "OpenSpec" text when `show_label` is true, or only the icon when `show_label` is false (default).

#### Scenario: Single metric badge
- **WHEN** one metric is configured (e.g., `number_of_specs`)
- **THEN** the action SHALL generate an SVG badge with the OpenSpec icon/label on the left and the metric value on the right (e.g., "4 specs")

#### Scenario: Multiple metrics badge
- **WHEN** multiple metrics are configured
- **THEN** the action SHALL generate one SVG badge per metric

#### Scenario: Flat style badge
- **WHEN** `badge_style` is set to `flat`
- **THEN** the action SHALL use the `flat` style option in badgen

#### Scenario: Badge with label text
- **WHEN** `show_label` is true
- **THEN** the badge subject SHALL contain "OpenSpec" text alongside the icon

#### Scenario: Badge without label text
- **WHEN** `show_label` is false or not provided
- **THEN** the badge subject SHALL contain only the icon with no text
