import { historicalRates } from "./funding";
import type { FundingPayment, MarketTicker } from "./types";

const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4 });
export function HistoryPanel({ ticker, payments, loading, onClose }: { ticker: MarketTicker; payments: FundingPayment[]; loading: boolean; onClose: () => void }) {
  const points = historicalRates(payments).slice(0, 12);
  return <section className="history" aria-labelledby="history-title"><div className="history-head"><div><small>RECENT SETTLEMENTS</small><h2 id="history-title">{ticker.symbol} history</h2></div><button onClick={onClose}>Close</button></div>{loading ? <p aria-live="polite">Loading funding payments…</p> : points.length ? <div className="history-grid">{points.map((point) => <div key={`${point.time}:${point.rate}`}><span>{new Date(point.time).toLocaleString()}</span><strong className={point.rate < 0 ? "down" : "up"}>{percent.format(point.rate)}</strong></div>)}</div> : <p>No historical funding payments are available for this market yet.</p>}</section>;
}
