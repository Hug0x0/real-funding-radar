import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { RealIndexer } from "./api";
import { annualizedRate, fundingCost, payer, rankTickers } from "./funding";
import { HistoryPanel } from "./HistoryPanel";
import { demoTickers } from "./mock";
import type { FundingPayment, MarketTicker } from "./types";
import "./styles.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 6 });
const clock = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const REFRESH_MS = 60_000;

function App() {
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [notional, setNotional] = useState(10_000);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Connecting to REAL");
  const [selected, setSelected] = useState<MarketTicker>();
  const [history, setHistory] = useState<FundingPayment[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<number>();
  const historyRequest = useRef(0);

  useEffect(() => {
    let active = true;
    let live = false;
    const load = () => new RealIndexer().tickers().then((data) => {
      if (!active) return;
      live = true; setTickers(data); setStatus("Live data"); setUpdatedAt(Date.now());
    }).catch(() => {
      if (!active) return;
      if (live) { setStatus("Live data — last refresh failed"); return; }
      setTickers(demoTickers); setStatus("Demo data — API unavailable");
    });
    load();
    const timer = window.setInterval(load, REFRESH_MS);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const visible = useMemo(() => rankTickers(tickers).filter((ticker) => ticker.symbol.toLowerCase().includes(query.toLowerCase())), [tickers, query]);
  const showHistory = (ticker: MarketTicker) => {
    const request = ++historyRequest.current;
    setSelected(ticker);
    setHistory([]);
    setHistoryError(false);
    setHistoryLoading(true);
    new RealIndexer().fundingPayments(ticker.market_id)
      .then((payments) => { if (request === historyRequest.current) setHistory(payments); })
      .catch(() => { if (request === historyRequest.current) setHistoryError(true); })
      .finally(() => { if (request === historyRequest.current) setHistoryLoading(false); });
  };

  return <><a className="skip-link" href="#main-content">Skip to content</a><main id="main-content">
    <header><div><span className="eyebrow">REAL COMMUNITY TOOLS</span><h1>Funding Radar</h1><p>See crowded markets before the next funding settlement.</p></div><span className="status" aria-live="polite">● {status}{updatedAt && <small>Updated {clock.format(updatedAt)} · refreshes every minute</small>}</span></header>
    <section className="controls"><label>Search market<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by symbol" /></label><label>Position notional<input type="number" min="0" step="100" value={notional} onChange={(event) => setNotional(Math.max(0, Number(event.target.value) || 0))} /></label></section>
    <section className="grid">{visible.map((ticker, index) => {
      const rate = Number(ticker.perp_next_funding_rate || 0);
      return <article key={ticker.market_id} className={rate < 0 ? "negative" : "positive"}>
        <div className="rank">#{index + 1}</div><div className="market"><h2>{ticker.symbol}</h2><span>{payer(rate)}</span></div>
        <div><small>Next funding</small><strong>{percent.format(rate)}</strong></div>
        <div><small>Annualized estimate</small><strong>{percent.format(annualizedRate(rate))}</strong></div>
        <div><small>Position impact</small><strong>{money.format(Math.abs(fundingCost(notional, rate)))}</strong></div>
        <div><small>24h turnover</small><strong>{money.format(Number(ticker.turnover_24h))}</strong></div><button className="history-button" onClick={() => showHistory(ticker)}>History</button>
      </article>;
    })}</section>{selected && <HistoryPanel ticker={selected} payments={history} loading={historyLoading} error={historyError} onClose={() => { historyRequest.current++; setSelected(undefined); }}/>}
  </main></>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
