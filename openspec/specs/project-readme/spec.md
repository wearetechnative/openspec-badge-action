# project-readme Specification

## Purpose
TBD - created by archiving change setup-readme. Update Purpose after archive.
## Requirements
### Requirement: Project description

The README SHALL contain a clear description of what openspec-badge-action does — a GitHub Action that generates an SVG badge showing OpenSpec metrics (total specs, total requirements, open changes, task status).

#### Scenario: User visits repo for the first time
- **WHEN** a user opens the repository
- **THEN** they can read what the action does and what metrics the badge shows

### Requirement: Usage instructions

The README SHALL contain a usage section showing how to add the action to a GitHub workflow, including required permissions.

#### Scenario: User wants to integrate the action
- **WHEN** a user reads the usage section
- **THEN** they find a workflow YAML example they can copy into their repo

#### Scenario: User checks required permissions
- **WHEN** a user reads the usage example
- **THEN** they see that `contents: write` permission is needed for badge deployment

### Requirement: Configuration reference

The README SHALL document all available configuration options (`metric_types` and `badge_style`).

#### Scenario: User wants to customize badge metrics
- **WHEN** a user reads the configuration section
- **THEN** they find the list of supported metric types and how to configure them

#### Scenario: User wants to change badge style
- **WHEN** a user reads the configuration section
- **THEN** they find the `badge_style` option with supported values (`classic`, `flat`)

### Requirement: License and contributing info

The README SHALL state the license (Apache 2.0) and link to contributing guidance.

#### Scenario: User wants to contribute
- **WHEN** a user looks for how to contribute
- **THEN** they find the license type and guidance on how to participate

### Requirement: Badge display

The README SHALL display all four OpenSpec badge images side by side near the top, one for each supported metric (number_of_specs, number_of_requirements, tasks_status, open_changes), serving as a live showcase of the action's output.

#### Scenario: User sees all metric badges
- **WHEN** a user opens the repository
- **THEN** they see four OpenSpec badges displayed next to each other, each showing a different metric

### Requirement: Badge URL reference

The README SHALL contain a section explaining how users can reference their generated badge URLs in their own READMEs after running the action.

#### Scenario: User wants to embed badges
- **WHEN** a user reads the badge URL section
- **THEN** they find the URL pattern (`https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/<metric>.svg`) and a markdown example they can copy

