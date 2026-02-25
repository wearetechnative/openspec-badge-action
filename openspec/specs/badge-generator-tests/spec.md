# badge-generator-tests Specification

## Purpose
TBD - created by archiving change extract-badge-generator-script. Update Purpose after archive.
## Requirements
### Requirement: SVG validity testing
The test suite SHALL verify that generated badges are valid SVG documents.

#### Scenario: Generated SVG is valid XML
- **WHEN** badge-generator script generates any badge
- **THEN** test validates the output is well-formed XML that can be parsed without errors

#### Scenario: SVG has required attributes
- **WHEN** badge is generated
- **THEN** test validates the root `<svg>` element has xmlns attribute and viewBox

### Requirement: Content validation testing
The test suite SHALL verify that badge content matches the input metrics.

#### Scenario: Badge displays correct metric value
- **WHEN** generating a specs badge with spec-count=7
- **THEN** test validates the SVG contains text "7 specs"

#### Scenario: Badge uses correct color for metric
- **WHEN** generating a specs badge with spec-count=5
- **THEN** test validates the SVG uses green color (not orange)

#### Scenario: Zero count uses warning color
- **WHEN** generating a specs badge with spec-count=0
- **THEN** test validates the SVG uses orange color (not green)

### Requirement: Style variant testing
The test suite SHALL verify that style variants produce different output.

#### Scenario: Classic style differs from flat style
- **WHEN** generating two identical badges with different styles (classic vs flat)
- **THEN** test validates the SVG outputs are different (classic has gradients, flat does not)

#### Scenario: Labeled badge contains subject text
- **WHEN** generating badge with show-label=true
- **THEN** test validates SVG contains "OpenSpec" text

#### Scenario: Unlabeled badge omits subject text
- **WHEN** generating badge with show-label=false
- **THEN** test validates SVG does not contain "OpenSpec" text as subject

### Requirement: Icon embedding testing
The test suite SHALL verify that the OpenSpec icon is correctly embedded.

#### Scenario: Badge contains icon data URI
- **WHEN** any badge is generated
- **THEN** test validates SVG contains a data URI with base64-encoded icon

#### Scenario: Icon has correct dimensions
- **WHEN** badge is generated
- **THEN** test validates icon width attribute is 18 (as specified in badgen call)

### Requirement: All metric types coverage
The test suite SHALL include tests for all four metric types.

#### Scenario: Test specs metric
- **WHEN** test suite runs
- **THEN** at least one test generates and validates a number_of_specs badge

#### Scenario: Test requirements metric
- **WHEN** test suite runs
- **THEN** at least one test generates and validates a number_of_requirements badge

#### Scenario: Test tasks metric with all color variants
- **WHEN** test suite runs
- **THEN** tests validate tasks_status badge colors for: all complete (green), some complete (orange), none complete (red), zero total (blue)

#### Scenario: Test changes metric
- **WHEN** test suite runs
- **THEN** at least one test generates and validates an open_changes badge

### Requirement: Test execution
The test suite SHALL be executable via npm test command.

#### Scenario: Run tests with npm
- **WHEN** developer runs `npm test`
- **THEN** all badge generation tests execute and report pass/fail status

#### Scenario: Test failure reporting
- **WHEN** any test fails
- **THEN** npm test exits with non-zero status and displays which test failed and why

