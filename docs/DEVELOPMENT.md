# Development guide

## Local setup

Use Node.js 24.x and npm (`.nvmrc` pins 24.22.1), then run:

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Vite prints the selected port. The default is 5173, but another port may be used when it is occupied. Stop the server with Ctrl+C.

Configuration is optional: the default indexer is built into `src/api.ts`. To override it, copy `.env.example` to `.env`, edit `VITE_REAL_API_URL`, and restart the development server. `.env` is ignored by Git. Client-side environment values are public and must not contain credentials.

## Source map

| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | App state, initial ticker loading, search, leaderboard, notional input, and history selection. |
| `src/api.ts` | Browser HTTP requests and response envelope handling. |
| `src/funding.ts` | Ranking, paying-side labels, calculation helpers, and history deduplication. |
| `src/FundingChart.tsx` | Responsive SVG funding chart with pointer and keyboard inspection. |
| `src/HistoryPanel.tsx` | Recent history display and loading/empty states. |
| `src/types.ts` | API response types. |
| `src/mock.ts` | Ticker fallback samples. |
| `src/styles.css` | Styling, responsive layout, focus states, and reduced-motion support. |
| `src/funding.test.ts` | Unit tests for funding helpers. |
| `.github/workflows/ci.yml` | Dependency installation, tests, and build checks. |

The app uses React, TypeScript, Vite, and Vitest. There is no backend, database, wallet connection, or order submission flow. Google Fonts are loaded from `index.html`.

## Validation

```bash
npm test
npm run build
```

The test suite currently covers annualization, notional cost, the negative-rate paying-side label, and history deduplication. It does not verify the live API contract or browser interactions. The build runs TypeScript checks for application files and produces the static bundle; test files are excluded from that TypeScript configuration.

For UI changes, also check search, positive and negative rates, notional changes, history loading/closing, narrow screens, keyboard focus, and the demo fallback. No dedicated lint command is configured.

## Production build

```bash
npm ci
npm run build
```

The generated site is in `dist/`. It can be served by a static web host. To inspect the build locally with the installed Vite executable:

```bash
npm exec -- vite preview --host 127.0.0.1
```

The preview server is for local verification. Production hosting must serve the generated files. If overriding the API URL, supply `VITE_REAL_API_URL` at build time; changing a hosting environment variable after building does not rewrite the bundle. The selected API must permit cross-origin browser requests from the production origin.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Demo data appears | Inspect the ticker request in browser developer tools for connection, HTTP, CORS, or response-shape errors. |
| History is empty | Check the history request. Empty results or unusable rate fields produce the empty state; request failures display an error. |
| Environment change has no effect | Restart Vite during development, or rebuild the production bundle. |
| Local URL differs from 5173 | Use the URL printed by Vite; the default port may already be occupied. |
| Dependency installation fails | Check the Node.js version and use `npm ci` with the committed lockfile. |

## Before a public release

- Review tracked files and Git history for credentials or private information.
- Validate the indexer response format and settlement interval assumptions.
- Run tests and the production build, then verify live and fallback behavior in a browser.
- Keep the README's implemented features and roadmap aligned with the shipped code.
