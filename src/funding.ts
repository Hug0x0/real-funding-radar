import type { FundingPayment, MarketTicker } from "./types";

export function annualizedRate(hourlyRate: number): number {
  return hourlyRate * 24 * 365;
}

export function fundingCost(notional: number, rate: number): number {
  return notional * rate;
}

export function payer(rate: number): string {
  if (rate > 0) return "Longs pay shorts";
  if (rate < 0) return "Shorts pay longs";
  return "Neutral";
}

export function rankTickers(tickers: MarketTicker[]): MarketTicker[] {
  return [...tickers].sort(
    (a, b) => Math.abs(Number(b.perp_next_funding_rate || 0)) - Math.abs(Number(a.perp_next_funding_rate || 0)),
  );
}

export function averageRate(payments: FundingPayment[]): number {
  const rates = payments.flatMap((payment) => payment.rate == null ? [] : [Number(payment.rate)]);
  return rates.length ? rates.reduce((sum, rate) => sum + rate, 0) / rates.length : 0;
}

export function historicalRates(payments: FundingPayment[]): { time: number; rate: number }[] {
  const unique = new Map<string, { time: number; rate: number }>();
  for (const payment of payments) {
    if (payment.rate == null) continue;
    const point = { time: payment.updated_at_ms, rate: Number(payment.rate) };
    if (!Number.isFinite(point.rate) || !Number.isFinite(point.time) || !Number.isFinite(new Date(point.time).getTime())) continue;
    unique.set(`${point.time}:${point.rate}`, point);
  }
  return [...unique.values()].sort((a, b) => b.time - a.time);
}
