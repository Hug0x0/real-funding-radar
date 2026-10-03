import type { ApiList, FundingPayment, MarketTicker } from "./types";

const DEFAULT_URL = "https://indexer.api.real.xyz";

export class RealIndexer {
  constructor(private readonly baseUrl = import.meta.env.VITE_REAL_API_URL || DEFAULT_URL) {}

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);
    if (!response.ok) throw new Error(`REAL API returned ${response.status}`);
    const payload = await response.json();
    return (payload.data && !Array.isArray(payload.data) ? payload.data : payload) as T;
  }

  async tickers(): Promise<MarketTicker[]> {
    const response = await this.get<ApiList<MarketTicker> | MarketTicker[]>("/api/v1/markets/tickers?p[s]=100");
    return Array.isArray(response) ? response : response.data;
  }

  async fundingPayments(marketId: string): Promise<FundingPayment[]> {
    const query = new URLSearchParams({ "f[market_ids]": marketId, "p[s]": "100" });
    const response = await this.get<ApiList<FundingPayment>>(`/api/v1/funding-payments?${query}`);
    return response.data;
  }
}
