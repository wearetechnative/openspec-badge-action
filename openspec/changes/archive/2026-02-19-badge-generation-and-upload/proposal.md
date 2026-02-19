## Why

Projects using OpenSpec have no way to surface their spec health at a glance. A badge in the README — similar to coverage badges — would let maintainers and contributors instantly see how well-specified a project is. This is the core purpose of this repository (Issue #2).

Generate OpenSpec badge. Something like @openspec_badge.svg

## What Changes

- Add a composite GitHub Action (`action.yml`) that:
  - Installs the OpenSpec CLI
  - Reads action configuration (which metrics to display)
  - Runs `openspec view` to collect metrics
  - Generates an SVG badge using `badgen-cli`
  - Deploys the badge to a `gh-pages` branch for stable URL hosting
- The badge displays configurable OpenSpec metrics: spec count, requirement count, task status, and open changes

## Capabilities

### New Capabilities
- `action-configuration`: Defines the GitHub Action inputs and how they are validated
- `metrics-collection`: Retrieves OpenSpec metrics from the repository using the CLI
- `badge-generation`: Generates an SVG badge from collected metrics
- `badge-upload`: Deploys the generated badge to a `gh-pages` branch

### Modified Capabilities
<!-- None -->

## Impact

- `action.yml`: New file — the GitHub Action definition
- `gh-pages` branch: Created/updated by the action at runtime to host badge SVGs
- Dependencies: `openspec` CLI (installed at runtime), `badgen-cli` (installed at runtime)
