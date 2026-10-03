export type MarketTicker = {
  market_id: string;
  symbol: string;
  mark_price: string;
  index_price: string;
  open_interest?: string | null;
  open_interest_value?: string | null;
  volume_24h: string;
  turnover_24h: string;
  perp_next_funding_rate?: string | null;
  perp_next_funding_time_ms?: number | null;
};

export type FundingPayment = {
  id: string;
  market_id: string;
  account_id: string;
  payment: string;
  position_side: "Long" | "Short" | string;
  position_size: string;
  rate?: string | null;
  updated_at_ms: number;
};

export type ApiList<T> = { data: T[]; next_cursor?: string | null };
