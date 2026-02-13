"use client";

import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea,
    ReferenceLine,
} from "recharts";
import { fetchNAVPerformance, type NAVDataPoint } from "@/lib/googleSheetsClient";

// ------------------------------------------------------------------
// Synthetic WEEKLY data for 2022 — Edge rises with volatility, MSCI drops with bear rallies
// Uses a seeded PRNG for deterministic, realistic-looking data
// ------------------------------------------------------------------

function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const rng = seededRandom(2022);

// Generate 52 weekly data points with unique date labels (Jan 1, Jan 8, etc.)
const weekLabels: string[] = [];
// 2022 started on a Saturday. Let's align roughly with weeks.
const startDate = new Date(2022, 0, 1); // Jan 1
for (let w = 0; w < 52; w++) {
    const d = new Date(startDate.getTime() + w * 7 * 24 * 60 * 60 * 1000);
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    weekLabels.push(`${month} ${day}`);
}

// Vol Prem (formerly Edge Capital): overall +24.6% with sharp dips and recoveries
const volPremWeekly: number[] = [100];
const volPremDrift = 0.0045; // slight upward bias per week
for (let i = 1; i < 52; i++) {
    const prev = volPremWeekly[i - 1];
    const noise = (rng() - 0.48) * 3.2; // asymmetric upward
    // Inject sharp V-turns at specific weeks
    let shock = 0;
    if (i === 8) shock = -3.5;   // sharp dip mid-Feb
    if (i === 9) shock = 4.2;    // V-recovery
    if (i === 18) shock = -2.8;  // dip in May
    if (i === 19) shock = 3.6;   // bounce
    if (i === 26) shock = -4.1;  // mid-year stress
    if (i === 27) shock = 2.8;
    if (i === 28) shock = 2.5;   // strong recovery
    if (i === 35) shock = -2.2;  // Sep wobble
    if (i === 36) shock = 3.1;   // snap back
    if (i === 42) shock = -1.8;  // Oct dip
    if (i === 43) shock = 2.9;   // recovery
    const change = prev * (volPremDrift + noise / 100 + shock / 100);
    volPremWeekly.push(Math.max(prev + change * 0.3, 96));
}
// Normalize so final value = 124.6, but start stays 100
const volPremFinalRaw = volPremWeekly[51];
const volPremTarget = 124.6;
const volPremValues = volPremWeekly.map(v => {
    const scale = (volPremTarget - 100) / (volPremFinalRaw - 100);
    return +(100 + (v - 100) * scale).toFixed(2);
});

// Corr Arb: overall +18.6% with steady low-vol growth
const corrWeekly: number[] = [100];
const corrDrift = 0.0035; // steady upward bias
for (let i = 1; i < 52; i++) {
    const prev = corrWeekly[i - 1];
    const noise = (rng() - 0.5) * 1.2; // low noise
    const change = prev * (corrDrift + noise / 100);
    corrWeekly.push(Math.max(prev + change, 98));
}
// Normalize so final value = 118.6
const corrFinalRaw = corrWeekly[51];
const corrTarget = 118.6; // +18.6%
const corrValues = corrWeekly.map(v => {
    const scale = (corrTarget - 100) / (corrFinalRaw - 100);
    return +(100 + (v - 100) * scale).toFixed(2);
});

// MSCI World: overall -18.7% with bear rallies
const msciWeekly: number[] = [100];
const msciDrift = -0.0042; // downward bias
for (let i = 1; i < 52; i++) {
    const prev = msciWeekly[i - 1];
    const noise = (rng() - 0.52) * 3.5; // asymmetric downward
    let shock = 0;
    if (i === 6) shock = 2.5;    // bear rally
    if (i === 7) shock = -4.2;   // crash
    if (i === 14) shock = 3.0;   // relief rally
    if (i === 15) shock = -3.8;  // rejection
    if (i === 22) shock = -4.5;  // June selloff
    if (i === 23) shock = 2.2;   // dead cat bounce
    if (i === 30) shock = 2.8;   // summer rally
    if (i === 31) shock = -3.5;  // failed
    if (i === 38) shock = -3.2;  // Sep crash
    if (i === 39) shock = 2.0;   // brief bounce
    if (i === 40) shock = -2.8;  // continued decline
    if (i === 46) shock = 2.4;   // Nov relief
    if (i === 47) shock = -2.1;  // fade
    const change = prev * (msciDrift + noise / 100 + shock / 100);
    msciWeekly.push(prev + change * 0.35);
}
// Normalize so final value = 81.3, keeping start at 100
const msciFinalRaw = msciWeekly[51];
const msciTarget = 81.3;
const msciValues = msciWeekly.map(v => {
    const scale = (msciTarget - 100) / (msciFinalRaw - 100);
    return +(100 + (v - 100) * scale).toFixed(2);
});

export const chartData = weekLabels.map((label, i) => ({
    week: label,
    volPrem: volPremValues[i],
    corr: corrValues[i],
    msci: msciValues[i],
}));

// ------------------------------------------------------------------
// Custom Tooltip
// ------------------------------------------------------------------
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="font-mono shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                style={{
                    background: "linear-gradient(135deg, rgba(10,10,11,0.97) 0%, rgba(18,22,28,0.97) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "14px 18px",
                    backdropFilter: "blur(16px)",
                    minWidth: "200px",
                }}
            >
                <div
                    className="rounded-full mb-3"
                    style={{
                        height: "2px",
                        background: "linear-gradient(90deg, #5EEAD4, #ACACAC)",
                        opacity: 0.5,
                    }}
                />
                <p className="text-[10px] text-white/35 tracking-[0.15em] uppercase mb-3">
                    {label} 2022
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
                                {entry.value.toFixed(1)}
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
// Custom Y-axis tick
// ------------------------------------------------------------------
const YAxisTick = ({ x, y, payload }: any) => (
    <text x={x} y={y} dy={4} fill="#777" style={{ fontSize: '1em' }} fontFamily="monospace" textAnchor="end">
        {payload.value}
    </text>
);

// ------------------------------------------------------------------
// Helper: Extract and rebase 2022 data from NAV performance
// ------------------------------------------------------------------
function extract2022Data(navData: NAVDataPoint[]) {
    // Filter for 2022 months only
    const data2022 = navData.filter(d => d.date.includes("2022"));

    if (data2022.length === 0) return null;

    // Get Jan 2022 baseline values
    const baseline = data2022[0];
    const vpBase = baseline.volPremiumRisk;
    const caBase = baseline.correlationArbitrage;
    const msciBase = baseline.msciWorld;

    // Rebase all values to start at 100 in Jan 2022
    return data2022.map(d => ({
        week: d.date.split(" ")[0], // "Jan", "Feb", etc. (using "week" key for chart compatibility)
        volPrem: Math.round((d.volPremiumRisk / vpBase) * 100 * 10) / 10,
        corr: Math.round((d.correlationArbitrage / caBase) * 100 * 10) / 10,
        msci: Math.round((d.msciWorld / msciBase) * 100 * 10) / 10,
    }));
}

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export function StressTestChart2022({ data }: { data?: typeof chartData }) {
    const [chartData2022, setChartData2022] = useState<typeof chartData | null>(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            const navData = await fetchNAVPerformance();
            if (!cancelled && navData && navData.length > 0) {
                const processed = extract2022Data(navData);
                if (processed) {
                    setChartData2022(processed);
                }
            }
        }

        loadData();
        return () => { cancelled = true; };
    }, []);

    const displayData = data || chartData2022 || chartData;

    return (
        <div className="relative h-full">
            {/* Chart */}
            <div className="w-full h-full font-mono" style={{ fontSize: 'inherit' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={displayData}
                        margin={{ top: 20, right: isMobile ? 16 : 80, left: isMobile ? 0 : 8, bottom: 24 }}
                    >
                        {/* Faint grid */}
                        <CartesianGrid
                            strokeDasharray="4 6"
                            stroke="#ffffff"
                            opacity={0.08}
                            vertical={false}
                        />

                        {/* Stress regime highlight band — covers middle portion (approx Mar to Oct) */}
                        <ReferenceArea
                            x1="Mar"
                            x2="Oct"
                            fill="#ff4444"
                            fillOpacity={0.04}
                        />

                        {/* Label for stress regime */}
                        <ReferenceLine
                            x="Jun"
                            stroke="transparent"
                            label={{
                                value: "2022 STRESS REGIME",
                                position: "top",
                                fill: "#ff4444",
                                fontSize: '0.85em',
                                fontFamily: "monospace",
                                opacity: 0.5,
                            }}
                        />

                        <XAxis
                            dataKey="week"
                            stroke="transparent"
                            tick={{ fill: "#888", style: { fontSize: '1em' }, fontFamily: "monospace" }}
                            tickLine={false}
                            axisLine={{ stroke: "#ffffff08" }}
                            dy={12}
                            interval={0}
                            tickFormatter={(value: string, index: number) => {
                                // For monthly data: value is "Jan", "Feb", etc.
                                // For weekly data: value is "Jan 1", "Jan 8", etc.

                                // If it's monthly data (no space in value)
                                if (!value.includes(" ")) {
                                    // Show every other month on mobile
                                    const everyOtherMonths = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
                                    if (isMobile && !everyOtherMonths.includes(value)) return "";
                                    return value;
                                }

                                // Original weekly data logic
                                const [m, d] = value.split(" ");
                                if (Number(d) > 7) return "";
                                const everyOtherMonths = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
                                if (isMobile && !everyOtherMonths.includes(m)) return "";
                                return m;
                            }}
                        />
                        <YAxis
                            tick={<YAxisTick />}
                            tickLine={false}
                            axisLine={false}
                            domain={[75, 140]}
                            ticks={[80, 90, 100, 110, 120, 130, 140]}
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

                        {/* MSCI World — dotted grey, declining */}
                        <Line
                            type="linear"
                            dataKey="msci"
                            name="MSCI World"
                            stroke="#ACACAC"
                            strokeWidth={1.2}
                            strokeDasharray="4 3"
                            dot={false}
                            activeDot={{
                                r: 3,
                                fill: "#ACACAC",
                                stroke: "#050A0C",
                                strokeWidth: 1.5,
                            }}
                        />

                        {/* Corr Arb — solid light cyan, steady growth */}
                        <Line
                            type="linear"
                            dataKey="corr"
                            name="Corr Arb"
                            stroke="#C4EBF1"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 3,
                                fill: "#C4EBF1",
                                stroke: "#050A0C",
                                strokeWidth: 1.5,
                            }}
                        />

                        {/* Vol Prem (formerly Edge Capital) — solid teal/slate, rising, with glow */}
                        <Line
                            type="linear"
                            dataKey="volPrem"
                            name="Vol Prem"
                            stroke="#428095"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 3,
                                fill: "#428095",
                                stroke: "#050A0C",
                                strokeWidth: 1.5,
                            }}
                            style={{
                                filter: "drop-shadow(0 0 6px rgba(66, 128, 149, 0.4))",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-3 font-mono tracking-wide" style={{ fontSize: 'clamp(11px, 1em, 14px)' }}>
                <span className="flex items-center gap-2.5">
                    <span className="inline-block w-5 h-[1.5px]" style={{ backgroundColor: "#428095" }} />
                    <span style={{ color: "#428095" }} className="opacity-70">Vol Prem</span>
                </span>
                <span className="flex items-center gap-2.5">
                    <span className="inline-block w-5 h-[1.5px]" style={{ backgroundColor: "#C4EBF1" }} />
                    <span style={{ color: "#C4EBF1" }} className="opacity-70">Corr Arb</span>
                </span>
                <span className="flex items-center gap-2.5">
                    <svg width="20" height="2" className="opacity-70">
                        <line x1="0" y1="1" x2="20" y2="1" stroke="#ACACAC" strokeWidth="1.2" strokeDasharray="3 2" />
                    </svg>
                    <span style={{ color: "#ACACAC" }} className="opacity-70">MSCI World</span>
                </span>
            </div>
        </div>
    );
}
