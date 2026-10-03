import { describe, expect, it } from "vitest";
import { annualizedRate, fundingCost, historicalRates, payer } from "./funding";

describe("funding calculations", () => {
  it("annualizes an hourly funding rate", () => expect(annualizedRate(0.0001)).toBeCloseTo(0.876));
  it("calculates a notional payment", () => expect(fundingCost(10_000, 0.0001)).toBe(1));
  it("describes the paying side", () => expect(payer(-0.0001)).toBe("Shorts pay longs"));
  it("deduplicates account-level funding rates", () => expect(historicalRates([{ id: "1", market_id: "btc", account_id: "a", payment: "1", position_side: "Long", position_size: "1", rate: "0.001", updated_at_ms: 10 }, { id: "2", market_id: "btc", account_id: "b", payment: "-1", position_side: "Short", position_size: "1", rate: "0.001", updated_at_ms: 10 }])).toHaveLength(1));
});
