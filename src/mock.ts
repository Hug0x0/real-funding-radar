import type { MarketTicker } from "./types";

export const demoTickers: MarketTicker[] = [
  { market_id: "btc", symbol: "BTC-USDT", mark_price: "68124.2", index_price: "68110.8", open_interest_value: "1245000", volume_24h: "46.3", turnover_24h: "3154200", perp_next_funding_rate: "0.00012", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "eth", symbol: "ETH-USDT", mark_price: "3544.8", index_price: "3547.1", open_interest_value: "846000", volume_24h: "555.7", turnover_24h: "1970000", perp_next_funding_rate: "-0.00008", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "sol", symbol: "SOL-USDT", mark_price: "166.42", index_price: "166.38", open_interest_value: "354000", volume_24h: "4831.1", turnover_24h: "804000", perp_next_funding_rate: "0.000025", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "hype", symbol: "HYPE-USDT", mark_price: "76.75", index_price: "76.74", open_interest_value: "9000", volume_24h: "1573.44", turnover_24h: "125211.69", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
];
