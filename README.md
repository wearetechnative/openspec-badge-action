# openspec-badge-action

![specs](https://raw.githubusercontent.com/weAretechnative/openspec-badge-action/gh-pages/badges/number_of_specs.svg) ![requirements](https://raw.githubusercontent.com/weAretechnative/openspec-badge-action/gh-pages/badges/number_of_requirements.svg) ![tasks](https://raw.githubusercontent.com/weAretechnative/openspec-badge-action/gh-pages/badges/tasks_status.svg) ![changes](https://raw.githubusercontent.com/weAretechnative/openspec-badge-action/gh-pages/badges/open_changes.svg)

> **Work in Progress** — This action is under active development and not yet ready for production use.

A GitHub Action that generates an SVG badge showing [OpenSpec](https://openspec.dev) metrics for your repository. The badge displays key project health indicators at a glance:

- **Total specs** — number of specification files
- **Total requirements** — number of defined requirements
- **Open changes** — changes currently in progress
- **Task status** — open vs. closed tasks

## Usage

Add the action to a GitHub Actions workflow:

```yaml
name: OpenSpec Badge
on:
  push:
    branches: [main]

jobs:
  badge:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: weAretechnative/openspec-badge-action@main
        with:
          metric_types: number_of_specs,number_of_requirements,tasks_status,open_changes
```

> **Note:** The action needs `contents: write` permission to push badges to the `gh-pages` branch.

## Configuration

| Input | Description | Default |
|-------|-------------|---------|
| `metric_types` | Comma-separated list of metrics to display | All metrics |
| `badge_style` | Badge visual style: `classic` (gradient) or `flat` (solid) | `classic` |

### Supported metric types

| Metric | Description |
|--------|-------------|
| `number_of_specs` | Total number of spec files |
| `number_of_requirements` | Total number of requirements across all specs |
| `tasks_status` | Ratio of completed vs. open tasks |
| `open_changes` | Number of active (non-archived) changes |

## Displaying badges

After the action runs, badges are deployed to the `gh-pages` branch. Reference them in your README using:

```markdown
![specs](https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/number_of_specs.svg)
![requirements](https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/number_of_requirements.svg)
![tasks](https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/tasks_status.svg)
![changes](https://raw.githubusercontent.com/<owner>/<repo>/gh-pages/badges/open_changes.svg)
```

Replace `<owner>/<repo>` with your GitHub repository path.

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! This project uses [OpenSpec](https://openspec.dev) for structured change management. Check the open issues for tasks to pick up.
