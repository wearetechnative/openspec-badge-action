## Context

This is a composite GitHub Action (shell-based, no Node.js build step). The repository currently has no `action.yml` or source code. We're building the core functionality from scratch, following the pattern established by `we-cli/coverage-badge-action` for badge generation and `gh-pages` deployment.

The OpenSpec CLI provides structured JSON output via `openspec spec list --json` and `openspec list --changes --json`. We use these for reliable metric extraction.

## Goals / Non-Goals

**Goals:**
- Produce a working composite GitHub Action in a single `action.yml`
- Generate per-metric SVG badges using `badgen-cli`
- Deploy badges to `gh-pages` branch for stable URL references
- Keep the action self-contained — no pre-built artifacts needed

**Non-Goals:**
- Combined/multi-metric badges (one badge per metric is sufficient for v1)
- Custom badge styling beyond color coding and flat/classic style
- Supporting non-GitHub hosting for badges

## Decisions

### Decision 1: Composite action (not JavaScript/Docker)

Use a composite action with bash steps rather than a JavaScript or Docker action.

**Rationale:** Matches the pattern of `coverage-badge-action`, avoids a build step, and keeps everything in one `action.yml`. Shell scripting is sufficient for: install CLI → parse output → generate SVG → git push.

**Alternatives considered:**
- JavaScript action: requires `dist/` build artifacts, more complexity for a straightforward pipeline
- Docker action: slower startup, unnecessary isolation for this use case

### Decision 2: Use `badgen-cli` with custom OpenSpec logo

Generate badges using `badgen-cli` (npm package) with the OpenSpec pixel-art logo embedded via `--icon "data:image/svg+xml;base64,..."` and `--icon-width`. The logo is extracted from the hand-crafted `openspec_badge.svg` template in the repo root.

**Rationale:** Offline generation (no external API dependency), robust text width calculation, proven tool from `coverage-badge-action`, and the `--icon` flag lets us keep the branded OpenSpec logo. Best of both worlds: reliable layout + custom branding.

**Alternatives considered:**
- shields.io API: requires network access, adds external dependency
- Custom SVG template (`openspec_badge.svg` directly): full design control but fragile text width handling — if metric values change length, layout breaks
- `badge-maker` (shields.io local lib): more styles but requires a Node wrapper script, not a CLI

### Decision 3: Deploy to `gh-pages` branch

Store badges on an orphan `gh-pages` branch in a `badges/` directory.

**Rationale:** Proven pattern from `coverage-badge-action`. Provides stable raw.githubusercontent.com URLs. Keeps badge artifacts out of the main branch history.

**Alternatives considered:**
- Commit badges to main branch: pollutes commit history
- GitHub Releases: URLs change per release, not suitable for "latest" badges

### Decision 4: Collect metrics via JSON CLI output

Use two CLI calls with `--json` to extract all metrics:

- `openspec spec list --json` → returns `[{id, title, requirementCount}]` — gives us **spec count** (array length) and **requirement count** (sum of `requirementCount`)
- `openspec list --changes --json` → returns `[{name, completedTasks, totalTasks, status}]` — gives us **open changes** (array length) and **task status** (sum `completedTasks` / sum `totalTasks`)

**Rationale:** Structured JSON is robust across CLI version updates — field names are a stable API contract, whereas `openspec view` ASCII formatting can change at any time. Two calls is a small cost for reliability.

**Alternatives considered:**
- `openspec view` text parsing with grep/awk: fragile, breaks on formatting changes
- Direct file parsing of `openspec/` YAML/MD files: couples to internal file format, even more fragile

## Risks / Trade-offs

- [JSON output schema may evolve] → Low risk since JSON field names are a more stable contract than ASCII formatting; pin CLI version as extra safety
- [gh-pages branch requires write permissions] → Action needs `contents: write` permission; document this clearly
- [`badgen-cli` install adds ~10s to action runtime] → Acceptable for a badge-generation action that typically runs on push to main
- [Concurrent badge pushes may conflict] → Use retry logic (Wandalen/wretry.action pattern) for the git push step

## Resolved Questions

- **Badge style input?** Yes — expose a `badge_style` input (`classic` default, `flat` optional). It's a single `--flat` flag pass-through to badgen-cli, zero complexity.
- **JSON vs text parsing?** Resolved: use `openspec spec list --json` and `openspec list --changes --json` for robust, version-safe metric extraction.
