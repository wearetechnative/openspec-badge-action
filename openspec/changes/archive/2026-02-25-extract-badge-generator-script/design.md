## Context

Current duplication:
- action.yml (lines 125-176): Inline Node.js script generating badges during CI
- RUNME.sh (lines 63-120): Nearly identical inline Node.js for maintainer badge generation
- Both contain: icon SVG definition, metric definitions, badgen library calls

The duplication was documented as an accepted risk in generate-badge-showcase/design.md with a mitigation plan to extract shared logic. This change implements that mitigation.

## Goals / Non-Goals

**Goals:**
- Eliminate code duplication by extracting badge generation to scripts/badge-generator.js
- Maintain identical badge output (no visual changes)
- Add automated tests to prevent regressions
- Keep both action.yml and RUNME.sh working without breaking changes
- Make badge generation logic testable in isolation

**Non-Goals:**
- Changing badge appearance or behavior
- Modifying metric collection logic (stays in action.yml and RUNME.sh)
- Adding new badge features or metrics
- Changing the badgen library or dependencies

## Decisions

**Decision 1: Create standalone Node.js script instead of shell function**
- **Rationale**: Node.js is better suited for JSON processing, SVG generation, and complex string handling than Bash. Makes testing easier with standard Node.js test frameworks.
- **Alternative considered**: Extract to Bash function - rejected because Bash is harder to test and the core logic is already in JavaScript
- **Implementation**: Create scripts/badge-generator.js that accepts CLI arguments or environment variables

**Decision 2: Use CLI arguments instead of environment variables for script inputs**
- **Rationale**: More explicit, easier to test, better error messages. Environment variables work for CI but are harder to debug locally.
- **Alternative considered**: Keep environment variables - rejected because CLI args are more maintainable and testable
- **Implementation**: Script accepts: `--metric <name> --spec-count <n> --req-count <n> --open-changes <n> --completed-tasks <n> --total-tasks <n> --style <classic|flat> --show-label <true|false> --output <path>`

**Decision 3: Use Node.js built-in test runner (node:test)**
- **Rationale**: No additional dependencies, ships with Node.js 18+, sufficient for testing SVG generation logic
- **Alternative considered**: vitest or jest - rejected to avoid adding dev dependencies for a simple test suite
- **Implementation**: tests/badge-generator.test.js using node:test and node:assert

**Decision 4: Test strategy focuses on SVG structure validation**
- **Rationale**: We can't pixel-compare SVGs easily, but we can validate structure, content, and attributes
- **Tests will verify**:
  - SVG is valid XML
  - Contains expected text (metric values)
  - Has correct style applied (gradient vs flat)
  - Icon is embedded correctly
  - Label appears/disappears based on show-label flag
- **Alternative considered**: Visual regression testing - rejected as overkill for badge generation

**Decision 5: Keep metric collection in action.yml and RUNME.sh**
- **Rationale**: Metric collection is context-specific (CI vs local) and already minimal code. Extracting it wouldn't save much.
- **Alternative considered**: Extract metric collection too - rejected because it's specific to each context and not duplicated verbatim

## Risks / Trade-offs

**[Risk]**: Breaking existing badge generation during refactor
→ **Mitigation**: Generate badges with both old and new approaches, compare outputs byte-for-byte before switching. Add tests that validate output matches expected format.

**[Risk]**: GitHub Actions composite action may have issues calling external scripts
→ **Mitigation**: Test in CI environment first. Composite actions can run shell scripts without issues, and we're already running Node.js inline.

**[Risk]**: Script parameters may be hard to maintain as more options are added
→ **Mitigation**: Keep parameter list minimal and stable. Most badge options (colors, text) are derived from metrics, not passed as parameters.

**[Trade-off]**: Adding a script file increases repository structure complexity
→ **Accepted**: The maintenance benefit of single source of truth outweighs the slight complexity increase. Tests also add value beyond just deduplication.

**[Trade-off]**: Node.js script is slightly slower to invoke than inline code
→ **Accepted**: Performance difference is negligible (<100ms), and badge generation is not performance-critical.

## Migration Plan

1. Create scripts/badge-generator.js with identical logic from action.yml
2. Add comprehensive tests in tests/badge-generator.test.js
3. Run tests to validate output matches expected format
4. Update action.yml to call script, verify badges are identical
5. Update RUNME.sh to call script, verify badges are identical
6. Run full CI workflow to ensure no regressions
7. Document script usage in script comments

No rollback needed - if issues arise, revert commits restoring inline code.
