## ADDED Requirements

### Requirement: Project description

The README SHALL contain a clear description of what openspec-badge-action does — a GitHub Action that generates an SVG badge showing OpenSpec metrics (total specs, total requirements, open changes, task status).

#### Scenario: User visits repo for the first time
- **WHEN** a user opens the repository
- **THEN** they can read what the action does and what metrics the badge shows

### Requirement: Usage instructions

The README SHALL contain a usage section showing how to add the action to a GitHub workflow.

#### Scenario: User wants to integrate the action
- **WHEN** a user reads the usage section
- **THEN** they find a workflow YAML example they can copy into their repo

### Requirement: Configuration reference

The README SHALL document the available configuration options (metric_types).

#### Scenario: User wants to customize badge metrics
- **WHEN** a user reads the configuration section
- **THEN** they find the list of supported metric types and how to configure them

### Requirement: License and contributing info

The README SHALL state the license (Apache 2.0) and link to contributing guidance.

#### Scenario: User wants to contribute
- **WHEN** a user looks for how to contribute
- **THEN** they find the license type and guidance on how to participate
