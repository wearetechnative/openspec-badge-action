# project-readme Specification (Delta)

## ADDED Requirements

### Requirement: Badge showcase table
The README SHALL contain a dedicated section displaying a table of all badge variants to help visitors understand available customization options.

#### Scenario: Visitor discovers badge style options
- **WHEN** a visitor scrolls through the README
- **THEN** they encounter a "Badge Showcase" or "Available Badge Variants" section containing a markdown table

#### Scenario: Table displays all metric and style combinations
- **WHEN** a visitor examines the badge showcase table
- **THEN** they see rows for each metric type (specs, requirements, tasks, changes) with columns showing classic style, flat style, and variants with/without the "OpenSpec" label

#### Scenario: Badge images are embedded in table
- **WHEN** a visitor views the showcase table
- **THEN** each table cell contains an embedded badge image (not just a description), allowing visual comparison of styles

#### Scenario: Showcase badges use local examples
- **WHEN** a maintainer commits changes to the showcase table
- **THEN** the badge image URLs reference files in examples/badges/ directory (not live gh-pages badges), ensuring consistent showcase examples regardless of current project metrics
