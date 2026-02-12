"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// ------------------------------------------------------------------
// Dummy data – realistic monthly points from Jan 2020 → Dec 2025
// All series rebased to 100 at inception.
// Uses a seeded PRNG for deterministic output across renders.
// Replace this array with Google-Sheets-fetched data later.
// ------------------------------------------------------------------
export const navReturnData = (() => {
    // --- Seeded PRNG (mulberry32) for deterministic chart data ---
    const seed = (s: number) => {
        return () => {
            s |= 0; s = (s + 0x6d2b79f5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    };
    const rand = seed(42);
    // Gaussian-ish noise from uniform (Box-Muller lite)
    const randn = () => {
        const u1 = rand(), u2 = rand();
        return Math.sqrt(-2 * Math.log(u1 + 0.0001)) * Math.cos(2 * Math.PI * u2);
    };

    const points: {
        date: string;
        correlationArbitrage: number;
        volPremiumRisk: number;
        msciWorld: number;
    }[] = [];

    const r = (v: number) => Math.round(v * 10) / 10;

    let ca = 100;
    let vp = 100;
    let msci = 100;

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Monthly return profiles: [drift, volatility] per regime
    // These produce realistic jagged lines with ~2-5% monthly swings
    for (let year = 2020; year <= 2025; year++) {
        for (let m = 0; m < 12; m++) {
            const label = `${months[m]} ${year}`;

            // ---------- MSCI World (~ends 190) ----------
            let msciDrift: number, msciVol: number;
            if (year === 2020 && m <= 2) {
                // COVID crash: large negative drift + high vol
                msciDrift = m === 2 ? -0.12 : -0.03;
                msciVol = 0.06;
            } else if (year === 2020) {
                // Recovery rally
                msciDrift = 0.035;
                msciVol = 0.04;
            } else if (year === 2021) {
                msciDrift = 0.015;
                msciVol = 0.025;
            } else if (year === 2022 && m < 6) {
                // 2022 bear market
                msciDrift = -0.02;
                msciVol = 0.035;
            } else if (year === 2022) {
                // H2 2022 chop
                msciDrift = 0.005;
                msciVol = 0.03;
            } else if (year === 2023) {
                msciDrift = 0.012;
                msciVol = 0.025;
            } else if (year === 2024) {
                msciDrift = 0.01;
                msciVol = 0.02;
            } else {
                msciDrift = 0.008;
                msciVol = 0.02;
            }
            msci *= 1 + msciDrift + msciVol * randn();

            // ---------- Correlation Arbitrage (~ends 225) ----------
            let caDrift: number, caVol: number;
            if (year === 2020 && m <= 2) {
                // Uncorrelated to crash – slight positive
                caDrift = 0.005;
                caVol = 0.02;
            } else if (year === 2020) {
                caDrift = 0.018;
                caVol = 0.025;
            } else if (year === 2021) {
                caDrift = 0.016;
                caVol = 0.025;
            } else if (year === 2022 && m < 6) {
                // Holds up during drawdown
                caDrift = 0.01;
                caVol = 0.02;
            } else if (year === 2022) {
                caDrift = 0.014;
                caVol = 0.02;
            } else if (year === 2023) {
                caDrift = 0.01;
                caVol = 0.018;
            } else if (year === 2024) {
                caDrift = 0.008;
                caVol = 0.015;
            } else {
                caDrift = 0.007;
                caVol = 0.015;
            }
            ca *= 1 + caDrift + caVol * randn();

            // ---------- Vol Premium Risk (~ends 270) ----------
            let vpDrift: number, vpVol: number;
            if (year === 2020 && m <= 2) {
                vpDrift = -0.01;
                vpVol = 0.03;
            } else if (year === 2020) {
                vpDrift = 0.012;
                vpVol = 0.03;
            } else if (year === 2021) {
                vpDrift = 0.014;
                vpVol = 0.03;
            } else if (year === 2022) {
                // Strong in high-vol regime
                vpDrift = 0.022;
                vpVol = 0.035;
            } else if (year === 2023 && m < 6) {
                vpDrift = 0.018;
                vpVol = 0.03;
            } else if (year === 2023) {
                vpDrift = 0.012;
                vpVol = 0.025;
            } else if (year === 2024) {
                vpDrift = 0.01;
                vpVol = 0.02;
            } else {
                vpDrift = 0.009;
                vpVol = 0.02;
            }
            vp *= 1 + vpDrift + vpVol * randn();

            points.push({
                date: label,
                correlationArbitrage: r(ca),
                volPremiumRisk: r(vp),
                msciWorld: r(msci),
            });
        }
    }

    return points;
})();

// ------------------------------------------------------------------
// Custom tooltip
// ------------------------------------------------------------------
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="font-mono shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                style={{
                    background: "linear-gradient(135deg, rgba(13,17,23,0.97) 0%, rgba(20,27,38,0.97) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "14px 18px",
                    backdropFilter: "blur(16px)",
                    minWidth: "220px",
                }}
            >
                {/* Accent gradient bar */}
                <div
                    className="rounded-full mb-3"
                    style={{
                        height: "2px",
                        background: "linear-gradient(90deg, #268197, #BAECF2, #ACACAC)",
                        opacity: 0.5,
                    }}
                />
                <p className="text-[10px] text-white/35 tracking-[0.15em] uppercase mb-3">
                    {label}
                </p>
                <div className="space-y-2.5">
                    {payload.map((entry: any) => (
                        <div key={entry.dataKey} className="flex items-center justify-between gap-10">
                            <span className="flex items-center gap-2">
                                <span
                                    className="inline-block w-[6px] h-[6px] rounded-full"
                                    style={{
                                        backgroundColor: entry.color,
                                        boxShadow: `0 0 6px ${entry.color}40`,
                                    }}
                                />
                                <span className="text-[10.5px] text-white/50 tracking-wide">
                                    {entry.name}
                                </span>
                            </span>
                            <span
                                className="text-[12px] font-semibold tabular-nums"
                                style={{ color: entry.color }}
                            >
                                {entry.value.toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// ------------------------------------------------------------------
// Series config (single source of truth for colors)
// ------------------------------------------------------------------
const SERIES = {
    correlationArbitrage: { label: "Correlation Arbitrage", color: "#BAECF2", dashed: false },
    volPremiumRisk: { label: "Vol Premium Risk", color: "#268197", dashed: false },
    msciWorld: { label: "MSCI World", color: "#ACACAC", dashed: true },
} as const;

type SeriesKey = keyof typeof SERIES;

// ------------------------------------------------------------------
// Custom Legend
// ------------------------------------------------------------------
const renderLegend = () => {
    return (
        <div className="flex flex-wrap justify-center gap-8 mt-4 mb-2 text-[11px] font-mono tracking-wide">
            {(Object.entries(SERIES) as [SeriesKey, (typeof SERIES)[SeriesKey]][]).map(([key, item]) => (
                <span key={key} className="flex items-center gap-2.5">
                    {item.dashed ? (
                        <svg width="20" height="2" className="opacity-70">
                            <line x1="0" y1="1" x2="20" y2="1" stroke={item.color} strokeWidth="1.2" strokeDasharray="3 2" />
                        </svg>
                    ) : (
                        <span
                            className="inline-block w-5 h-[1.5px]"
                            style={{ backgroundColor: item.color }}
                        />
                    )}
                    <span style={{ color: item.color }} className="opacity-70">
                        {item.label}
                    </span>
                </span>
            ))}
        </div>
    );
};

// ------------------------------------------------------------------
// Stats Header (date, per-series stats, period tabs)
// ------------------------------------------------------------------
const PERIOD_TABS = ["ALL", "1 YEAR", "3 MONTHS"] as const;

function ChartStatsHeader() {
    const last = navReturnData[navReturnData.length - 1];
    const lastDate = last.date; // e.g. "Dec 2025"
    const [monthStr, yearStr] = lastDate.split(" ");
    const monthIdx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthStr);
    const daysInMonth = new Date(Number(yearStr), monthIdx + 1, 0).getDate();
    const formattedDate = `${daysInMonth}.${String(monthIdx + 1).padStart(2, "0")}.${yearStr}`;

    // Compute stats per series
    const seriesStats = (Object.keys(SERIES) as SeriesKey[]).map((key) => {
        const current = last[key];
        const toDate = current - 100; // rebased from 100

        // Monthly average: average of all month-over-month % changes
        let totalMonthlyReturn = 0;
        for (let i = 1; i < navReturnData.length; i++) {
            const prev = navReturnData[i - 1][key];
            const cur = navReturnData[i][key];
            totalMonthlyReturn += ((cur - prev) / prev) * 100;
        }
        const monAvg = totalMonthlyReturn / (navReturnData.length - 1);

        return {
            key,
            label: SERIES[key].label,
            color: SERIES[key].color,
            toDate: toDate.toFixed(1),
            monAvg: monAvg.toFixed(2),
        };
    });

    return (
        <div className="mb-6 border-b border-white/5 pb-5">
            {/* Top line: date */}
            <p className="text-[13px] font-mono text-institutional-white/90 tracking-wide mb-3">
                {formattedDate}{" "}
                <span className="text-institutional-white/40">(GROSS / USD)</span>
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-between gap-y-3">
                {/* Per-series stats */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    {seriesStats.map((s) => (
                        <div key={s.key} className="flex items-center gap-3 text-[11px] font-mono">
                            <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ backgroundColor: s.color }}
                            />
                            <span className="text-white/40 uppercase tracking-wider">{s.label}</span>
                            <span className="text-white/70">
                                TO DATE = <span style={{ color: s.color }} className="font-medium">{s.toDate}%</span>
                            </span>
                            <span className="text-white/70">
                                MON AVG = <span style={{ color: s.color }} className="font-medium">{s.monAvg}%</span>
                            </span>
                        </div>
                    ))}
                </div>

                {/* Period tabs */}
                <div className="flex items-center gap-1 text-[10px] font-mono tracking-wider">
                    {PERIOD_TABS.map((tab, i) => (
                        <button
                            key={tab}
                            className={`px-3 py-1 rounded transition-colors ${i === 0
                                ? "bg-white/8 text-white/90"
                                : "text-white/35 hover:text-white/60"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Custom Y-axis tick with %
// ------------------------------------------------------------------
const YAxisTick = ({ x, y, payload }: any) => (
    <text
        x={x}
        y={y}
        dy={4}
        textAnchor="end"
        fill="#555"
        fontSize={11}
        fontFamily="monospace"
    >
        {payload.value}%
    </text>
);

// ------------------------------------------------------------------
// Chart Component
// ------------------------------------------------------------------
export function NAVReturnChart() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return (
        <div className="w-full">
            <ChartStatsHeader />
            <div className="w-auto -mx-[10px] md:-mx-8 h-[480px] md:h-[520px] font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={navReturnData}
                        margin={{ top: 10, right: isMobile ? 8 : 24, left: isMobile ? 0 : 8, bottom: 24 }}
                        className="cursor-crosshair-custom"
                    >
                        <CartesianGrid
                            strokeDasharray="4 6"
                            stroke="#ffffff"
                            opacity={0.05}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            stroke="transparent"
                            tick={{ fill: "#555", fontSize: 10, fontFamily: "monospace" }}
                            tickLine={false}
                            axisLine={{ stroke: "#ffffff10" }}
                            tickFormatter={(value: string, index: number) => {
                                // Show only yearly labels (every 12 months, starting at Jan)
                                if (index % 12 !== 0) return "";
                                const year = value.split(" ")[1];
                                return year;
                            }}
                            interval={0}
                            dy={16}
                        />
                        <YAxis
                            tick={<YAxisTick />}
                            tickLine={false}
                            axisLine={false}
                            domain={[50, 300]}
                            ticks={[50, 100, 150, 200, 250, 300]}
                            dx={-4}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#ffffff",
                                strokeWidth: 0.5,
                                strokeDasharray: "3 3",
                                opacity: 0.15,
                            }}
                        />


                        {/* Correlation Arbitrage — solid, fine, linear (V-style) */}
                        <Line
                            type="linear"
                            dataKey="correlationArbitrage"
                            name="Correlation Arbitrage"
                            stroke={SERIES.correlationArbitrage.color}
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={{
                                r: 3,
                                fill: SERIES.correlationArbitrage.color,
                                stroke: "#0B0F19",
                                strokeWidth: 1.5,
                            }}
                        />
                        {/* Vol Premium Risk — solid, fine, linear (V-style) */}
                        <Line
                            type="linear"
                            dataKey="volPremiumRisk"
                            name="Vol Premium Risk"
                            stroke={SERIES.volPremiumRisk.color}
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={{
                                r: 3,
                                fill: SERIES.volPremiumRisk.color,
                                stroke: "#0B0F19",
                                strokeWidth: 1.5,
                            }}
                        />
                        {/* MSCI World — dotted, thinner, linear (V-style) */}
                        <Line
                            type="linear"
                            dataKey="msciWorld"
                            name="MSCI World"
                            stroke={SERIES.msciWorld.color}
                            strokeWidth={1}
                            strokeDasharray="3 3"
                            dot={false}
                            activeDot={{
                                r: 2.5,
                                fill: SERIES.msciWorld.color,
                                stroke: "#0B0F19",
                                strokeWidth: 1.5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend — below chart */}
            {renderLegend()}

            {/* Footer note */}
            <p className="mt-4 text-[11px] text-institutional-slate/40 font-mono leading-relaxed tracking-wide">
                Chart rebased to 100 and plotted since inception. Benchmark: MSCI World (URTH ETF price proxy).
            </p>
        </div>
    );
}
