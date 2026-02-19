# openspec-badge-action

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
    steps:
      - uses: actions/checkout@v4
      - uses: weAretechnative/openspec-badge-action@main
        with:
          metric_types: number_of_specs,number_of_requirements,tasks_status,open_changes
```

## Configuration

| Input | Description |
|-------|-------------|
| `metric_types` | Comma-separated list of metrics to display on the badge |

### Supported metric types

| Metric | Description |
|--------|-------------|
| `number_of_specs` | Total number of spec files |
| `number_of_requirements` | Total number of requirements across all specs |
| `tasks_status` | Ratio of completed vs. open tasks |
| `open_changes` | Number of active (non-archived) changes |

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! This project uses [OpenSpec](https://openspec.dev) for structured change management. Check the open issues for tasks to pick up.
