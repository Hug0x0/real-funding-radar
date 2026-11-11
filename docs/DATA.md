# Data & calculations

This document describes the behavior implemented in the repository. It is not an independent guarantee of the upstream API contract or settlement schedule.

## Data source

`src/api.ts` defines the `RealIndexer` client. Its default base URL is `https://indexer.api.real.xyz`, overridden by `VITE_REAL_API_URL` when set.

| Request | Purpose |
| --- | --- |
| `GET /api/v1/markets/tickers?p[s]=100` | Load market tickers. |
| `GET /api/v1/funding-payments?f[market_ids]=<market-id>&p[s]=100` | Load funding-payment records for one market. |

The browser calls the indexer directly. There is no application backend or authentication flow. The client checks the HTTP status and parses JSON, but does not validate response fields at runtime. The TypeScript response types are defined in `src/types.ts`.

The client unwraps an object-valued `data` envelope when present. Tickers can then be a raw array or an object containing a `data` array; funding payments are expected to contain a `data` array. Although the types include `next_cursor`, the client does not follow it.

## Displayed fields

| Field | Use |
| --- | --- |
| `market_id` | Card identity and history request filter. |
| `symbol` | Market name and search input matching. |
| `perp_next_funding_rate` | Ranking, paying-side label, next funding, annualization, and position impact. |
| `turnover_24h` | 24-hour turnover displayed in USD. |
| Funding payment `rate` | Historical rate observation. |
| Funding payment `updated_at_ms` | Timestamp displayed in the English (US) format, using the browser's local time zone. |

The data types include other fields, such as prices and next funding time, that are not currently displayed. Currency formatting uses USD; the application performs no currency conversion.

## Rate units and ranking

Rates are interpreted as fractions: `0.0001` is displayed as `0.01%`.

Markets are sorted by descending absolute next funding rate. For example, `-0.0005` ranks ahead of `+0.0002`. Search is case-insensitive and is applied after sorting. Visible ranks are renumbered when filtering.

Missing or empty next funding values are treated as zero. Malformed numeric values are not explicitly rejected.

## Position impact

```text
signed payment estimate = position notional × funding rate
shown position impact = absolute value of signed payment estimate
```

For a $10,000 position at a rate of `0.0001`, the displayed impact is $1 for one funding interval.

| Rate | Paying side | Receiving side |
| --- | --- | --- |
| Positive | Longs | Shorts |
| Negative | Shorts | Longs |
| Zero | Neutral | Neutral |

The input represents total position value, not collateral. There is no long/short selector; the paying-side label supplies that context. The estimate excludes trading fees, price movement, liquidation, and position changes. It does not compound or accumulate payments over multiple intervals.

## Annualized estimate

```text
annualized rate = next funding rate × 24 × 365
```

This formula assumes one funding interval per hour and an unchanged rate for a full year. It is a simple extrapolation without compounding. At `0.0001` per hour, it yields `0.876`, displayed as `87.6%`.

The app does not derive the interval from the API or validate this assumption against the selected endpoint. Verify the settlement interval before interpreting annualized figures.

## History processing

When a user selects **History**, the app requests up to 100 account-level funding-payment records for that market. It then:

1. Ignores records with a missing or null `rate`.
2. Converts rates to numbers.
3. Deduplicates matching `updated_at_ms` and numeric rate pairs.
4. Sorts observations by timestamp, newest first.
5. Plots all valid observations chronologically and lists the 12 most recent in an expandable section.

Non-finite rates and invalid timestamps are discarded. The chart uses a time-proportional horizontal axis and includes zero on its rate axis. Hover or touch the chart, or use the labeled slider with arrow keys, to inspect an observation. A single observation is shown as a point, not an invented trend. Lines connect observations and do not imply complete coverage.

This is a list of rate observations, not a personal payment ledger. Account IDs, position sizes, and payment amounts are not displayed. Deduplication does not establish a canonical settlement ID: different rates at the same timestamp remain separate, and matching rates at different timestamps remain separate.

## Freshness and fallback behavior

Tickers load when the app mounts and are polled every 60 seconds. The header shows the local time of the last successful refresh. If the first ticker request fails, the app loads fixed sample markets from `src/mock.ts` and displays **Demo data — API unavailable**. If a later refresh fails after live data loaded, the last live values stay on screen and the status reads **Live data — last refresh failed**.

History is requested on each selection, including for demo markets. A failed history request displays a separate error message; selecting History again retries it. Stale responses are ignored after another market is selected or the panel is closed. There is no history pagination, automatic retry policy, or request cancellation.
