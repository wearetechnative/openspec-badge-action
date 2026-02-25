## Why

The repository visitors need to see all available badge variants (metric types and styles) to understand their options when adopting this action. The existing RUNME.sh maintainer script has a prepared `gen_all_badges` task that needs implementation to generate all badge combinations and display them in a README table.

## What Changes

- Implement the `gen_all_badges` function in RUNME.sh to generate all badge variants
- Generate badges for all metric types (specs, requirements, tasks, changes)
- Generate badges in both styles (classic and flat)
- Add a markdown table to README.md showcasing all badge variations with visual examples

## Capabilities

### New Capabilities
- `badge-showcase`: Display all available badge variants in a table within the README

### Modified Capabilities
- `project-readme`: Add badge showcase table to demonstrate all available options

## Impact

- RUNME.sh: Implement the `gen_all_badges` function to generate all badge combinations
- README.md: Add new section with table displaying all badge variants
- Badge generation script: May need to be called programmatically for all combinations
