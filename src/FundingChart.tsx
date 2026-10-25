import { useState } from "react";

const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 6 });
const date = (time: number) => new Date(time).toLocaleString("en-US");
type Point = { time: number; rate: number };

export function FundingChart({ points }: { points: Point[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const ordered = [...points].sort((a, b) => a.time - b.time);
  if (!ordered.length) return null;

  const activeIndex = Math.min(selected ?? ordered.length - 1, ordered.length - 1);
  const active = ordered[activeIndex];
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  const low = Math.min(0, ...ordered.map((point) => point.rate));
  const high = Math.max(0, ...ordered.map((point) => point.rate));
  const padding = (high - low || 0.00001) * 0.15;
  const min = low - padding;
  const max = high + padding;
  const x = (time: number) => first.time === last.time ? 400 : 90 + (time - first.time) / (last.time - first.time) * 670;
  const y = (rate: number) => 230 - (rate - min) / (max - min) * 200;
  const line = ordered.map((point, index) => `${index ? "L" : "M"}${x(point.time)},${y(point.rate)}`).join(" ");

  return <figure className="funding-chart">
    <figcaption className="chart-heading">
      <div><h3>Funding rate over time</h3><p>{ordered.length} observations · Local time</p></div>
      <output className="chart-readout" aria-live="polite"><strong className={active.rate < 0 ? "down" : "up"}>{percent.format(active.rate)}</strong><span>{date(active.time)}</span></output>
    </figcaption>
    <svg viewBox="0 0 800 280" role="img" aria-label={`Funding rate history: ${ordered.length} observations from ${date(first.time)} to ${date(last.time)}. Use the slider below to inspect each observation.`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const pointerX = (event.clientX - rect.left) / rect.width * 800;
        let nearest = 0;
        ordered.forEach((point, index) => { if (Math.abs(x(point.time) - pointerX) < Math.abs(x(ordered[nearest].time) - pointerX)) nearest = index; });
        setSelected(nearest);
      }}>
      {[high + padding, 0, low - padding].map((rate, index) => <g key={index}>
        <line x1="90" x2="760" y1={y(rate)} y2={y(rate)} className={rate === 0 ? "chart-zero" : "chart-gridline"} />
        <text x="78" y={y(rate) + 4} textAnchor="end">{percent.format(rate)}</text>
      </g>)}
      <path d={line} className="chart-line" />
      {ordered.map((point, index) => <circle key={`${point.time}:${point.rate}`} cx={x(point.time)} cy={y(point.rate)} r={index === activeIndex ? 6 : 3} className={point.rate < 0 ? "chart-dot negative-dot" : "chart-dot"} />)}
      <line x1={x(active.time)} x2={x(active.time)} y1="30" y2="230" className="chart-cursor" />
      <text x="90" y="264">{new Date(first.time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</text>
      {first.time !== last.time && <text x="760" y="264" textAnchor="end">{new Date(last.time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</text>}
    </svg>
    {ordered.length > 1 ? <label className="chart-slider">Inspect observation
      <input type="range" min="0" max={ordered.length - 1} step="1" value={activeIndex} onChange={(event) => setSelected(Number(event.target.value))} aria-valuetext={`${date(active.time)}: ${percent.format(active.rate)}`} />
    </label> : <p>Only one observation is available. More data is needed to show a trend.</p>}
    <p className="chart-note">Positive: longs pay shorts. Negative: shorts pay longs. Lines connect available observations; gaps may contain missing data.</p>
  </figure>;
}
