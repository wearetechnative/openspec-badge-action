## Why

The badge generation logic is currently duplicated between action.yml and RUNME.sh, containing identical Node.js code (~50 lines) for SVG generation using badgen. This duplication creates a maintenance burden and risks divergence between production (action.yml) and maintainer (RUNME.sh) badge generation. Extracting this logic to a shared script eliminates the duplication and provides an opportunity to add automated testing.

## What Changes

- Extract inline Node.js badge generation logic to `scripts/badge-generator.js`
- Refactor action.yml to call the extracted script instead of inline Node.js
- Refactor RUNME.sh gen_all_badges to call the extracted script
- Add automated tests for badge generation logic using a Node.js test framework
- Add test fixtures for validating SVG output structure and content

## Capabilities

### New Capabilities
- `badge-generator-script`: Standalone Node.js script for generating badge SVGs
- `badge-generator-tests`: Automated test suite for badge generation logic

### Modified Capabilities
- `badge-generation`: Update to use extracted script instead of inline code

## Impact

- action.yml: Replace inline Node.js with call to scripts/badge-generator.js
- RUNME.sh: Replace inline Node.js with call to scripts/badge-generator.js
- New files: scripts/badge-generator.js, tests/badge-generator.test.js
- package.json: Add test script and testing framework dependency (e.g., Node.js built-in test runner or vitest)
- CI workflow: Optionally add test execution step to validate badge generation
