import type { MarketTicker } from "./types";

export const demoTickers: MarketTicker[] = [
  { market_id: "btc", symbol: "BTC-USDT", mark_price: "68124.2", index_price: "68110.8", open_interest_value: "1245000", volume_24h: "46.3", turnover_24h: "3154200", perp_next_funding_rate: "0.00012", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "eth", symbol: "ETH-USDT", mark_price: "3544.8", index_price: "3547.1", open_interest_value: "846000", volume_24h: "555.7", turnover_24h: "1970000", perp_next_funding_rate: "-0.00008", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "sol", symbol: "SOL-USDT", mark_price: "166.42", index_price: "166.38", open_interest_value: "354000", volume_24h: "4831.1", turnover_24h: "804000", perp_next_funding_rate: "0.000025", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "hype", symbol: "HYPE-USDT", mark_price: "76.75", index_price: "76.74", open_interest_value: "9000", volume_24h: "1573.44", turnover_24h: "125211.69", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "xrp", symbol: "XRP-USDT", mark_price: "1.25", index_price: "1.25", open_interest_value: "825", volume_24h: "100000", turnover_24h: "125000", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "xaut", symbol: "XAUT-USDT", mark_price: "3880", index_price: "3880", open_interest_value: "48000", volume_24h: "170", turnover_24h: "660000", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "bnb", symbol: "BNB-USDT", mark_price: "551.09", index_price: "551.09", open_interest_value: "2430", volume_24h: "166.8", turnover_24h: "93190", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "zec", symbol: "ZEC-USDT", mark_price: "754.86", index_price: "754.86", open_interest_value: "1130", volume_24h: "122.9", turnover_24h: "97460", perp_next_funding_rate: "0.0000026", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "lit", symbol: "LIT-USDT", mark_price: "2.418", index_price: "2.418", open_interest_value: "1110", volume_24h: "36249", turnover_24h: "89610", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "near", symbol: "NEAR-USDT", mark_price: "3.008", index_price: "3.008", open_interest_value: "900", volume_24h: "29732", turnover_24h: "89790", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "xmr", symbol: "XMR-USDT", mark_price: "498.23", index_price: "498.23", open_interest_value: "1200", volume_24h: "191.2", turnover_24h: "95150", perp_next_funding_rate: "0.0000125", perp_next_funding_time_ms: Date.now() + 2_140_000 },
  { market_id: "ena", symbol: "ENA-USDT", mark_price: "0.10057", index_price: "0.10057", open_interest_value: "600", volume_24h: "895307", turnover_24h: "92100", perp_next_funding_rate: "0.0000023", perp_next_funding_time_ms: Date.now() + 2_140_000 },
];
