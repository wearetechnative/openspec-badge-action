# badge-upload Specification

## Purpose
TBD - created by archiving change badge-generation-and-upload. Update Purpose after archive.
## Requirements
### Requirement: Deploy badge to gh-pages branch

The action SHALL deploy generated badge SVG files to a `gh-pages` branch in a `badges/` directory for stable URL hosting.

#### Scenario: gh-pages branch exists
- **WHEN** the `gh-pages` branch already exists
- **THEN** the action SHALL update the badge files on the existing branch

#### Scenario: gh-pages branch does not exist
- **WHEN** the `gh-pages` branch does not exist
- **THEN** the action SHALL create an orphan `gh-pages` branch and push the badges

### Requirement: Badge URL stability

Badges MUST be available at a predictable URL pattern so users can reference them in READMEs.

#### Scenario: Badge URL format
- **WHEN** a badge is deployed
- **THEN** it SHALL be accessible at `https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/<metric>.svg`

### Requirement: Skip CI on badge commits

Badge update commits SHALL include `[skip ci]` in the commit message to prevent recursive workflow triggers.

#### Scenario: Badge commit message
- **WHEN** the action pushes a badge update
- **THEN** the commit message SHALL contain `[skip ci]`

