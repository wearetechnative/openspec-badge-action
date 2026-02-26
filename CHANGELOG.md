# Changelog

## [1.1.1] - 2026-02-26
- Fix relative path to badge-generator.js

## [1.1.0] - 2026-02-25
- New improved official OpenSpec logo
- Add badge showcase and extract badge generator to shared script
- Add show_label configuration 

## [1.0.0] - 2026-02-19

### Added
- Composite GitHub Action that generates SVG badges for OpenSpec metrics
- Four supported metrics: `number_of_specs`, `number_of_requirements`, `tasks_status`, `open_changes`
- Badge styles: `classic` (gradient) and `flat` (solid)
- OpenSpec pixel-art "OS" logo embedded in badges
- Automatic deployment to `gh-pages` branch with retry logic
- Color-coded badges based on project health
- CI workflow for dogfooding the action
