# action-configuration Specification

## Purpose
TBD - created by archiving change badge-generation-and-upload. Update Purpose after archive.
## Requirements
### Requirement: Action inputs

The action SHALL accept a `metric_types` input specifying which OpenSpec metrics to display on the badge as a comma-separated list.

#### Scenario: User specifies metric types
- **WHEN** the action is called with `metric_types: number_of_specs,number_of_requirements`
- **THEN** the action uses only those two metrics for badge generation

#### Scenario: Default metric types
- **WHEN** the action is called without a `metric_types` input
- **THEN** the action SHALL default to all supported metrics: `number_of_specs,number_of_requirements,tasks_status,open_changes`

### Requirement: Supported metric types

The action SHALL support the following metric type values: `number_of_specs`, `number_of_requirements`, `tasks_status`, `open_changes`.

#### Scenario: Invalid metric type
- **WHEN** the action is called with an unrecognized metric type
- **THEN** the action SHALL fail with a clear error message naming the invalid type

### Requirement: Badge style input

The action SHALL accept a `badge_style` input to control the visual style of generated badges.

#### Scenario: Classic style (default)
- **WHEN** the action is called without a `badge_style` input
- **THEN** the action SHALL generate badges in badgen's `classic` style (gradient background)

#### Scenario: Flat style
- **WHEN** the action is called with `badge_style: flat`
- **THEN** the action SHALL generate badges in badgen's `flat` style (solid background)

#### Scenario: Invalid style
- **WHEN** the action is called with a `badge_style` value other than `classic` or `flat`
- **THEN** the action SHALL fail with a clear error message naming the invalid style

### Requirement: Badge label input

The action SHALL accept a `show_label` input to control whether the "OpenSpec" text label is displayed in the badge subject area alongside the icon.

#### Scenario: Label enabled
- **WHEN** the action is called with `show_label: true`
- **THEN** the action SHALL generate badges with "OpenSpec" text in the subject area

#### Scenario: Label disabled (default)
- **WHEN** the action is called without a `show_label` input
- **THEN** the action SHALL generate badges with only the icon in the subject area (no text)

#### Scenario: Label explicitly disabled
- **WHEN** the action is called with `show_label: false`
- **THEN** the action SHALL generate badges with only the icon in the subject area (no text)

