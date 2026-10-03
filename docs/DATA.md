# Data notes

The dashboard reads market tickers from the public REAL indexer. Funding values are fractions: `0.0001` is displayed as `0.01%`.

Annualized figures multiply the current interval rate by 24 and 365. They are scenario estimates, not forecasts. The position impact is `notional × rate` and excludes trading fees and price movement.

When the API cannot be reached, the interface deliberately labels and displays demo data so contributors can still develop the UI.
