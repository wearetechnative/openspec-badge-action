## ADDED Requirements

### Requirement: Install OpenSpec CLI

The action SHALL install the OpenSpec CLI if it is not already available in the runner environment.

#### Scenario: CLI not present
- **WHEN** the action runs and `openspec` is not on the PATH
- **THEN** the action SHALL install the OpenSpec CLI before proceeding

### Requirement: Collect metrics via JSON CLI output

The action SHALL collect project metrics using structured JSON output from the OpenSpec CLI.

#### Scenario: Collect spec count
- **WHEN** `number_of_specs` is in the configured metric types
- **THEN** the action SHALL extract the total number of specifications from `openspec spec list --json` (array length)

#### Scenario: Collect requirement count
- **WHEN** `number_of_requirements` is in the configured metric types
- **THEN** the action SHALL extract the total number of requirements by summing `requirementCount` from `openspec spec list --json`

#### Scenario: Collect task status
- **WHEN** `tasks_status` is in the configured metric types
- **THEN** the action SHALL extract completed and total task counts by summing `completedTasks` and `totalTasks` from `openspec list --changes --json`

#### Scenario: Collect open changes
- **WHEN** `open_changes` is in the configured metric types
- **THEN** the action SHALL extract the number of active changes from `openspec list --changes --json` (array length)

### Requirement: Handle missing OpenSpec config

The action SHALL fail gracefully if the repository does not contain an `openspec/config.yaml`.

#### Scenario: No OpenSpec project
- **WHEN** the action runs in a repository without `openspec/config.yaml`
- **THEN** the action SHALL fail with a clear error message indicating the project is not an OpenSpec project
