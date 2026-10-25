import { FundingChart } from "./FundingChart";
import { historicalRates } from "./funding";
import type { FundingPayment, MarketTicker } from "./types";

const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 6 });
export function HistoryPanel({ ticker, payments, loading, error, onClose }: { ticker: MarketTicker; payments: FundingPayment[]; loading: boolean; error: boolean; onClose: () => void }) {
  const points = historicalRates(payments);
  return <section className="history" aria-labelledby="history-title">
    <div className="history-head"><div><small>FUNDING HISTORY</small><h2 id="history-title">{ticker.symbol} history</h2></div><button onClick={onClose}>Close</button></div>
    {loading ? <p aria-live="polite">Loading funding payments…</p> : error ? <p role="alert">Funding history could not be loaded. Select History again to retry.</p> : points.length ? <>
      <FundingChart key={ticker.market_id} points={points} />
      <p className="history-coverage">Based on up to 100 payment records. This may cover only a short period, not the full market history.</p>
      <details><summary>Recent observations</summary><div className="history-grid">{points.slice(0, 12).map((point) => <div key={`${point.time}:${point.rate}`}><span>{new Date(point.time).toLocaleString("en-US")}</span><strong className={point.rate < 0 ? "down" : "up"}>{percent.format(point.rate)}</strong></div>)}</div></details>
    </> : <p>No historical funding payments are available for this market yet.</p>}
  </section>;
}
