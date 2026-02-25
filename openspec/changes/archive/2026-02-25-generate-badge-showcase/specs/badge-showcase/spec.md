# badge-showcase Specification

## Purpose
Enable repository visitors to preview all available badge variants (metrics, styles, and label options) through a visual showcase table in the README.

## ADDED Requirements

### Requirement: RUNME.sh task implementation
The RUNME.sh maintainer script SHALL implement the `gen_all_badges` function to generate all possible badge combinations locally.

#### Scenario: Maintainer generates all badge variants
- **WHEN** maintainer executes `./RUNME.sh gen_all_badges`
- **THEN** the script generates badges for all combinations of:
  - 4 metric types (number_of_specs, number_of_requirements, tasks_status, open_changes)
  - 2 styles (classic, flat)
  - 2 label states (with "OpenSpec" text, without "OpenSpec" text)

#### Scenario: Generated badges are stored locally
- **WHEN** the gen_all_badges task completes
- **THEN** all 16 badge SVG files are stored in the examples/badges/ directory with descriptive filenames

### Requirement: Badge showcase table in README
The README SHALL contain a table displaying all badge variants with visual examples.

#### Scenario: Visitor views badge style options
- **WHEN** a visitor reads the badge showcase section
- **THEN** they see a table with columns for metric type, style variant, and label variant, with embedded badge images for each combination

#### Scenario: Table shows metric types clearly
- **WHEN** a visitor looks at the showcase table
- **THEN** each row is labeled with the metric type (specs, requirements, tasks, changes) and shows both style variants (classic and flat) side by side

#### Scenario: Table shows label options
- **WHEN** a visitor examines badge variants in the table
- **THEN** they can see the difference between badges with and without the "OpenSpec" text label

### Requirement: Badge generation reuses action logic
The gen_all_badges task SHALL reuse the badge generation logic from action.yml rather than duplicating code.

#### Scenario: Badge generation matches production output
- **WHEN** maintainer generates showcase badges
- **THEN** the badges are generated using the same Node.js + badgen code that runs in the GitHub Action, ensuring visual consistency

#### Scenario: OpenSpec CLI is required
- **WHEN** maintainer runs gen_all_badges without OpenSpec CLI installed
- **THEN** the script displays an error message indicating that @fission-ai/openspec must be installed globally
