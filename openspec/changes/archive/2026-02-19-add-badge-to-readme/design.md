## Context

The README exists but doesn't show badges or document `badge_style`. The action deploys badges to `gh-pages/badges/<metric>.svg`. We want the repo to use its own action — dogfooding via a real workflow.

## Goals / Non-Goals

**Goals:**
- Add a GitHub Actions workflow that runs the badge action on this repo
- Show this repo's own live badges in the README
- Document all configuration options including `badge_style`
- Explain how users reference badge URLs in their READMEs
- Note required permissions in the usage example

**Non-Goals:**
- Changing the action code itself

## Decisions

### Decision 1: Workflow triggers on push to main

The workflow runs on `push` to `main` only. No need for PR triggers or scheduled runs — badges update when main changes.

### Decision 2: Use local action reference (`./`)

The workflow uses `uses: ./` to reference the action from the same repo. This ensures we always test the latest version.

### Decision 3: Badge image source

Reference badges from `gh-pages` branch via `raw.githubusercontent.com` URLs. After the first push to main with the workflow, badges will be live. Until then, images won't render — the WIP notice already sets expectations.

### Decision 4: Permissions in usage example

Add `permissions: contents: write` to the workflow YAML example rather than a separate section. Users copy the example directly, so including permissions inline prevents the most common setup error.
