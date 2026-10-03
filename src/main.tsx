import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { RealIndexer } from "./api";
import { annualizedRate, fundingCost, payer, rankTickers } from "./funding";
import { demoTickers } from "./mock";
import type { MarketTicker } from "./types";
import "./styles.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 3 });

function App() {
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [notional, setNotional] = useState(10_000);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Connecting to REAL");

  useEffect(() => {
    new RealIndexer().tickers().then((data) => { setTickers(data); setStatus("Live data"); }).catch(() => {
      setTickers(demoTickers); setStatus("Demo data — API unavailable");
    });
  }, []);

  const visible = useMemo(() => rankTickers(tickers).filter((ticker) => ticker.symbol.toLowerCase().includes(query.toLowerCase())), [tickers, query]);

  return <><a className="skip-link" href="#main-content">Skip to content</a><main id="main-content">
    <header><div><span className="eyebrow">REAL COMMUNITY TOOLS</span><h1>Funding Radar</h1><p>See crowded markets before the next funding settlement.</p></div><span className="status" aria-live="polite">● {status}</span></header>
    <section className="controls"><label>Search market<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="BTC-PERP" /></label><label>Position notional<input type="number" min="0" step="100" value={notional} onChange={(event) => setNotional(Number(event.target.value))} /></label></section>
    <section className="grid">{visible.map((ticker, index) => {
      const rate = Number(ticker.perp_next_funding_rate || 0);
      return <article key={ticker.market_id} className={rate < 0 ? "negative" : "positive"}>
        <div className="rank">#{index + 1}</div><div className="market"><h2>{ticker.symbol}</h2><span>{payer(rate)}</span></div>
        <div><small>Next funding</small><strong>{percent.format(rate)}</strong></div>
        <div><small>Annualized estimate</small><strong>{percent.format(annualizedRate(rate))}</strong></div>
        <div><small>Position impact</small><strong>{money.format(Math.abs(fundingCost(notional, rate)))}</strong></div>
        <div><small>24h turnover</small><strong>{money.format(Number(ticker.turnover_24h))}</strong></div>
      </article>;
    })}</section>
  </main></>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
