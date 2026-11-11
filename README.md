<div align="center">

# REAL Funding Radar

**Explore funding rates. Compare markets. Estimate position costs.**

A lightweight community dashboard for REAL perpetual markets, built with React and TypeScript.

[Getting started](#getting-started) · [How it works](#how-it-works) · [Data & calculations](docs/DATA.md) · [Contributing](CONTRIBUTING.md)

</div>

---

## At a glance

| Feature | What you can do |
| --- | --- |
| Funding leaderboard | Compare markets by the absolute size of their next funding rate. |
| Market search | Filter symbols with a case-insensitive search. |
| Position calculator | Enter a position notional and estimate the next funding payment. |
| Funding history | Explore a funding-rate chart with pointer and keyboard inspection, plus 12 recent observations. |
| Market context | See 24-hour turnover and a simple annualized rate estimate. |
| Demo fallback | Explore sample BTC, ETH, SOL, HYPE, XRP, and XAUT markets when the ticker request fails. |

Live markets are discovered from the indexer on page load; no fixed allowlist is used. Reload the page to pick up newly listed markets. The demo fallback contains static sample data.

No wallet connection or trading functionality is included. This is an early-stage, read-only dashboard.

## Getting started

Use **Node.js 24.x** and npm. `.nvmrc` pins Node.js 24.22.1 for local development; CI currently uses Node.js 22.23.4.

```bash
git clone https://github.com/Hug0x0/real-funding-radar.git
cd real-funding-radar
npm ci
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Vite, usually **http://127.0.0.1:5173/**. While the repository is private, cloning requires access.

### Configuration

The app defaults to `https://indexer.api.real.xyz`. To use another compatible indexer, copy the example configuration:

```bash
cp .env.example .env
```

Then set the base URL, without a trailing slash:

```dotenv
VITE_REAL_API_URL=https://indexer.api.real.xyz
```

Restart Vite after changing configuration. `VITE_` variables are embedded in the browser bundle: **do not put secrets in them**. An alternate endpoint must expose the same API shape and allow requests from the app's origin.

## How it works

1. The dashboard requests market tickers on page load.
2. Markets are sorted by the absolute value of their next funding rate, largest first.
3. Your position notional is applied to each market's rate to estimate its next payment.
4. Selecting **History** requests that market's funding-payment records and displays recent rate observations.

A positive rate is labeled **Longs pay shorts**; a negative rate is labeled **Shorts pay longs**. The position impact is displayed as an absolute dollar amount. Use the paying-side label to determine whether your side would pay or receive it.

For example, a **$10,000** position at **+0.01%** has an estimated **$1** funding payment for one interval: paid by a long, received by a short. Enter the total position value, not just the collateral.

For formulas, API assumptions, and history handling, see [Data & calculations](docs/DATA.md).

## Development

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm test` | Run the Vitest test suite once. |
| `npm run build` | Type-check application code and create a production bundle in `dist/`. |

GitHub Actions runs dependency installation, tests, and the production build on pushes and pull requests. See the [development guide](docs/DEVELOPMENT.md) for the source map, deployment notes, and troubleshooting.

## Current limitations

- Rates are fetched on page load; there is no polling or live subscription. The **Live data** label identifies API-sourced data, not a continuously refreshed feed.
- Annualization assumes hourly funding and a constant rate, without compounding. It is a scenario estimate, not a forecast or guaranteed return.
- Ticker and history requests each ask for up to 100 records. Pagination is not implemented.
- The chart plots distinct timestamp/rate pairs from the returned records; the detail list shows up to 12. Neither guarantees complete settlement history.
- History request failures show a separate error message; select **History** again to retry.
- If the ticker request fails, the dashboard displays clearly labeled demo markets. History still requests the configured API; there is no synthetic history fallback.
- The calculator excludes trading fees, price changes, liquidation, and changes to position size.

## Roadmap

The following items are planned, not implemented:

- Funding comparisons over 1 day, 7 days, and 30 days.
- More complete historical coverage through pagination.
- Data freshness indicators.
- Validation of funding interval assumptions against the configured indexer.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, validation, and pull request guidance. Keep code, documentation, comments, and user-facing text in English.

## Project status & license

This repository does not yet include a license. A license must be selected and added before it is presented as open source; public visibility alone does not grant open-source reuse rights.

REAL Funding Radar is community-built and is not affiliated with Real Markets. Estimates are informational and are not investment advice.
