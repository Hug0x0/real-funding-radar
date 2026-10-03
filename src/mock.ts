import type { MarketTicker } from "./types";

export const demoTickers: MarketTicker[] = [
  { market_id: "btc", symbol: "BTC-PERP", mark_price: "68124.2", index_price: "68110.8", open_interest_value: "1245000", volume_24h: "3154200", perp_next_funding_rate: "0.00012", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "eth", symbol: "ETH-PERP", mark_price: "3544.8", index_price: "3547.1", open_interest_value: "846000", volume_24h: "1970000", perp_next_funding_rate: "-0.00008", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "sol", symbol: "SOL-PERP", mark_price: "166.42", index_price: "166.38", open_interest_value: "354000", volume_24h: "804000", perp_next_funding_rate: "0.000025", perp_next_funding_time_ms: Date.now() + 2_140_000 },
];
