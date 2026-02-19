# ci-workflow Specification

## Purpose
TBD - created by archiving change add-badge-to-readme. Update Purpose after archive.
## Requirements
### Requirement: Badge generation workflow

The repository SHALL include a GitHub Actions workflow that runs the openspec-badge-action on itself to generate badges.

#### Scenario: Push to main triggers badge generation
- **WHEN** a push is made to the main branch
- **THEN** the workflow SHALL run the action with default metric types and deploy badges to gh-pages

### Requirement: Workflow permissions

The workflow SHALL declare `contents: write` permission so the action can push badges to the gh-pages branch.

#### Scenario: Workflow has write access
- **WHEN** the workflow runs
- **THEN** it SHALL have `contents: write` permission configured at the job level

