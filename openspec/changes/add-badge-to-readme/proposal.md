## Why

The action now generates badges but the README doesn't show them. Users visiting the repo can't see the action's own output as a live example. The README also doesn't document the `badge_style` input or explain how to reference generated badges.

We want to "eat our own dog food" — add a real GitHub Actions workflow to this repo that runs the action on every push to main, generating actual badges the royal way. The README then references those live badges.

## What Changes

- Add a `.github/workflows/openspec-badge.yml` workflow that runs the action on this repo
- Add all four OpenSpec badge images side by side at the top of the README (number_of_specs, number_of_requirements, tasks_status, open_changes) — showcasing every supported metric as a live demo
- Add `badge_style` to the configuration table
- Add a section explaining how to reference the generated badge URLs in a README
- Add `contents: write` permissions note to the usage example

## Capabilities

### New Capabilities
- `ci-workflow`: GitHub Actions workflow that runs the badge action on this repo itself

### Modified Capabilities
- `project-readme`: Add badge display, badge_style config, badge URL reference section, and permissions note

## Impact

- `.github/workflows/openspec-badge.yml`: New workflow file
- `README.md`: Updated with badge images, expanded config table, new section on badge URLs
