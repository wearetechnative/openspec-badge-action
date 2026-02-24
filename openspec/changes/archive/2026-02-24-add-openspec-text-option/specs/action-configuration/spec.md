## ADDED Requirements

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
