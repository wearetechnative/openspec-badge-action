## 1. Action scaffold

- [x] 1.1 Create `action.yml` with action name, description, branding, `metric_types` input (default: all metrics), and `badge_style` input (default: `classic`, also accepts `flat`)
- [x] 1.2 Add input validation step that checks `metric_types` values against supported list and `badge_style` against `classic`/`flat`

## 2. OpenSpec CLI setup

- [x] 2.1 Add step to install OpenSpec CLI if not present
- [x] 2.2 Add step to verify `openspec/config.yaml` exists, fail with clear error if missing

## 3. Metrics collection

- [x] 3.1 Add step to run `openspec spec list --json` and extract spec count and requirement count (sum of `requirementCount`)
- [x] 3.2 Add step to run `openspec list --changes --json` and extract open changes count and task status (`completedTasks`/`totalTasks`)
- [x] 3.3 Filter collected metrics to only those in `metric_types` input

## 4. Badge generation

- [x] 4.1 Install `badgen-cli` via npm
- [x] 4.2 Extract OpenSpec pixel-art logo from `openspec_badge.svg` and base64-encode it for the `--icon` flag
- [x] 4.3 Generate one SVG badge per configured metric using `badgen` with `--icon`, appropriate label, value, color, and `--flat` flag if `badge_style` is `flat`
- [x] 4.4 Implement color logic (green for healthy, orange/red for needs attention)

## 5. Badge deployment

- [x] 5.1 Configure git user for github-actions[bot]
- [x] 5.2 Create orphan `gh-pages` branch if it doesn't exist
- [x] 5.3 Checkout `gh-pages`, copy badges to `badges/` directory
- [x] 5.4 Commit with `[skip ci]` and push (with retry logic)
- [x] 5.5 Checkout back to the original ref

## 6. Verify

- [x] 6.1 Review action.yml against all specs — all requirements covered
- [x] 6.2 Test action locally with `act` — all steps pass except git push (expected: no credentials in act)
