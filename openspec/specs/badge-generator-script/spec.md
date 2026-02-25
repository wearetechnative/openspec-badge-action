# badge-generator-script Specification

## Purpose
TBD - created by archiving change extract-badge-generator-script. Update Purpose after archive.
## Requirements
### Requirement: CLI argument parsing
The script SHALL accept badge configuration via command-line arguments.

#### Scenario: Required arguments provided
- **WHEN** script is invoked with `--metric number_of_specs --spec-count 5 --req-count 20 --open-changes 1 --completed-tasks 3 --total-tasks 10 --style classic --show-label false --output badge.svg`
- **THEN** script generates a badge using the provided parameters and writes to badge.svg

#### Scenario: Missing required argument
- **WHEN** script is invoked without a required argument (e.g., missing `--metric`)
- **THEN** script exits with non-zero status and displays error message indicating which argument is missing

#### Scenario: Invalid metric type
- **WHEN** script is invoked with `--metric invalid_metric`
- **THEN** script exits with error indicating valid metric types are: number_of_specs, number_of_requirements, tasks_status, open_changes

### Requirement: Badge SVG generation
The script SHALL generate SVG badges using the badgen library with the OpenSpec icon.

#### Scenario: Generate specs badge with classic style
- **WHEN** script generates a number_of_specs badge with classic style and show-label=false
- **THEN** output SVG contains the spec count, OpenSpec icon, green or orange color based on count, and classic gradient style

#### Scenario: Generate badge with label
- **WHEN** script generates any badge with show-label=true
- **THEN** output SVG contains "OpenSpec" text as the badge subject/label

#### Scenario: Generate badge without label
- **WHEN** script generates any badge with show-label=false
- **THEN** output SVG has empty subject (no "OpenSpec" label), only metric value and icon

#### Scenario: Generate flat style badge
- **WHEN** script generates any badge with style=flat
- **THEN** output SVG uses flat (solid color) style instead of classic gradient

### Requirement: Metric-specific badge formatting
The script SHALL format badge content according to the metric type.

#### Scenario: Specs metric formatting
- **WHEN** generating a number_of_specs badge with spec-count=5
- **THEN** badge displays "5 specs" and uses green color (orange if count is 0)

#### Scenario: Requirements metric formatting
- **WHEN** generating a number_of_requirements badge with req-count=20
- **THEN** badge displays "20 reqs" and uses green color (orange if count is 0)

#### Scenario: Tasks metric formatting
- **WHEN** generating a tasks_status badge with completed-tasks=3 and total-tasks=10
- **THEN** badge displays "3/10 tasks" and uses orange color (green if all complete, red if none complete, blue if total is 0)

#### Scenario: Changes metric formatting
- **WHEN** generating an open_changes badge with open-changes=2
- **THEN** badge displays "2 changes" and uses blue color

### Requirement: File output
The script SHALL write the generated SVG to the specified output path.

#### Scenario: Write to output file
- **WHEN** script completes successfully with --output path/to/badge.svg
- **THEN** SVG content is written to path/to/badge.svg and script exits with status 0

#### Scenario: Output directory creation
- **WHEN** script is invoked with --output in a non-existent directory path
- **THEN** script creates parent directories if needed before writing the file

#### Scenario: File write error
- **WHEN** output path is not writable (e.g., permission denied)
- **THEN** script exits with non-zero status and displays error message

