## 1. Setup

- [x] 1.1 Create scripts/ directory if it doesn't exist
- [x] 1.2 Create tests/ directory if it doesn't exist
- [x] 1.3 Add test script to package.json ("test": "node --test tests/*.test.js")

## 2. Create badge-generator.js script

- [x] 2.1 Create scripts/badge-generator.js with CLI argument parsing using process.argv
- [x] 2.2 Add argument validation for required parameters (metric, counts, style, show-label, output)
- [x] 2.3 Extract icon SVG definition from action.yml into the script
- [x] 2.4 Extract metricDefs object from action.yml into the script
- [x] 2.5 Implement badge generation logic using badgen library (copied from action.yml)
- [x] 2.6 Add file output logic with directory creation using fs.mkdirSync recursive option
- [x] 2.7 Add error handling for invalid arguments and file write errors
- [x] 2.8 Add usage documentation in script comments

## 3. Create test suite

- [x] 3.1 Create tests/badge-generator.test.js using node:test framework
- [x] 3.2 Add test helper to execute badge-generator.js with arguments
- [x] 3.3 Add tests for SVG validity (XML parsing, required attributes)
- [x] 3.4 Add tests for all metric types (specs, requirements, tasks, changes)
- [x] 3.5 Add tests for style variants (classic vs flat)
- [x] 3.6 Add tests for label variants (show-label true/false)
- [x] 3.7 Add tests for color coding based on metric values
- [x] 3.8 Add tests for icon embedding validation
- [x] 3.9 Run npm test and verify all tests pass

## 4. Refactor action.yml to use script

- [x] 4.1 Update action.yml badge generation step to call scripts/badge-generator.js
- [x] 4.2 Replace inline Node.js code with loop calling badge-generator.js for each metric
- [x] 4.3 Pass metric counts, style, show-label as CLI arguments to the script
- [x] 4.4 Test action locally or in CI to verify badges are generated correctly
- [x] 4.5 Compare generated badges with previous implementation to ensure identical output

## 5. Refactor RUNME.sh to use script

- [x] 5.1 Update RUNME.sh gen_all_badges function to call scripts/badge-generator.js
- [x] 5.2 Replace inline Node.js code with loop calling badge-generator.js
- [x] 5.3 Pass appropriate CLI arguments for each badge variant
- [x] 5.4 Run ./RUNME.sh gen_all_badges and verify all 16 badges are generated
- [x] 5.5 Compare output with previous implementation to ensure consistency

## 6. Verification and cleanup

- [x] 6.1 Run full CI workflow to ensure no regressions in badge generation
- [x] 6.2 Verify badge showcase table in README still displays correctly
- [x] 6.3 Run npm test to ensure all tests pass
- [x] 6.4 Update .gitignore if needed to exclude test output files
