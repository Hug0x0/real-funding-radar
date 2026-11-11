# Contributing to REAL Funding Radar

Thanks for helping improve the dashboard. The project is small, and focused changes are easiest to review.

## Getting started

Follow the [README setup instructions](README.md#getting-started), then read the [development guide](docs/DEVELOPMENT.md) and [data notes](docs/DATA.md).

Before starting a substantial feature or changing funding assumptions, open an issue describing the problem and proposed behavior. For a bug report, include reproduction steps, expected and actual behavior, browser details, and whether the dashboard showed live or demo data. Do not include credentials or private account information.

## Making changes

- Keep code, comments, documentation, interface text, and commit messages in English.
- Follow the existing React and TypeScript style.
- Keep calculation logic in reusable helpers and test meaningful changes to funding behavior.
- Clearly label demo data and preserve the distinction between estimates and observed rates.
- Document changes to configuration, API expectations, and calculation assumptions.
- Use small, meaningful commits with descriptive Conventional Commit messages, such as `docs: explain funding calculations` or `fix: handle empty market responses`.

Avoid mixing unrelated formatting, dependency upgrades, and feature work in one change. Never commit `.env`, credentials, `node_modules/`, or generated `dist/` output.

## Before opening a pull request

```bash
npm test
npm run build
```

For interface changes, verify the affected flows in a browser and include screenshots where useful. Describe the problem, the resulting behavior, and how you validated it. Link a related issue when one exists and call out any remaining limitations.

The GitHub Actions workflow runs installation, tests, and the production build on pushes and pull requests. Passing these checks does not validate the live API contract; document any manual API checks separately.

## Licensing status

This project is licensed under the [MIT License](LICENSE). By submitting a contribution, you agree that it is released under the same license.
