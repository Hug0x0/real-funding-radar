import { describe, expect, it } from "vitest";
import { annualizedRate, fundingCost, payer } from "./funding";

describe("funding calculations", () => {
  it("annualizes an hourly funding rate", () => expect(annualizedRate(0.0001)).toBeCloseTo(0.876));
  it("calculates a notional payment", () => expect(fundingCost(10_000, 0.0001)).toBe(1));
  it("describes the paying side", () => expect(payer(-0.0001)).toBe("Shorts pay longs"));
});
