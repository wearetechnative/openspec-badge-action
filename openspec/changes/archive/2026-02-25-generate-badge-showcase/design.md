## Context

The badge generation logic is already implemented in action.yml (lines 107-176). The action generates badges on-demand during CI runs based on input parameters. The RUNME.sh maintainer script provides a framework for custom tasks but currently has only a stub for `gen_all_badges`. Repository visitors need to see visual examples of all badge variations to understand their options.

Current badge generation in action.yml:
- 4 metric types: number_of_specs, number_of_requirements, tasks_status, open_changes
- 2 styles: classic (gradient), flat (solid)
- 2 label options: with/without "OpenSpec" text
- Uses badgen library via inline Node.js

## Goals / Non-Goals

**Goals:**
- Implement gen_all_badges in RUNME.sh to generate all 16 badge combinations (4 metrics × 2 styles × 2 label states)
- Store generated badges locally for development/preview purposes
- Add README.md table displaying all variants with embedded image examples
- Allow maintainers to regenerate showcase badges without running full CI workflow

**Non-Goals:**
- Modifying the action.yml badge generation logic (already works correctly)
- Automating showcase generation in CI (manual maintainer task is sufficient)
- Changing badge appearance or metrics definitions

## Decisions

**Decision 1: Call action.yml badge generation directly from RUNME.sh**
- **Rationale**: Reuse existing badge generation logic in action.yml rather than duplicating it. The action already handles OpenSpec CLI invocation, metric collection, and badgen SVG generation.
- **Alternative considered**: Reimplement badge generation in pure Bash/Node in RUNME.sh - rejected because it duplicates code and risks divergence from production behavior
- **Implementation**: Extract the badge generation steps (metrics collection + Node.js badgen call) into a loop that iterates over all combinations

**Decision 2: Store showcase badges in /examples/badges/ directory**
- **Rationale**: Keep generated examples separate from production badges (deployed to gh-pages). Examples are for README demonstration only.
- **Alternative considered**: Generate directly to README markdown without files - rejected because maintainers can't preview badges locally before commit

**Decision 3: Use relative file:// paths in README table for local preview**
- **Rationale**: Allow maintainers to preview badge showcase in local markdown viewers before pushing
- **Alternative considered**: Only show production gh-pages URLs - rejected because it prevents local validation of badge appearance

## Risks / Trade-offs

**[Risk]**: Badge generation in RUNME.sh may drift from action.yml implementation
→ **Mitigation**: Extract shared badge generation logic into a separate shell script sourced by both action.yml and RUNME.sh (future improvement)

**[Risk]**: Showcase generation requires OpenSpec CLI and Node.js dependencies installed locally
→ **Mitigation**: Document prerequisites in RUNME.sh comments and provide clear error messages if dependencies are missing

**[Trade-off]**: Maintaining 16 badge images increases repository size
→ **Accepted**: Badge SVGs are small (~1-2KB each), total ~32KB for all variants is negligible
