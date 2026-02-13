"use client";

import React, { useState, useEffect } from "react";
import { fetchMonthlyPerformance, type MonthlyPerformanceItem, type PerformanceStrategy } from "@/lib/googleSheetsClient";

/* ═══════════════════════════════════════════════════════════
   Fallback data (used while fetching or on failure)
   ═══════════════════════════════════════════════════════════ */
const FALLBACK_MONTHS: MonthlyPerformanceItem[] = [
    { month: "January", value: 2.14 },
    { month: "February", value: 3.47 },
    { month: "March", value: 4.82 },
    { month: "April", value: 7.63 },
    { month: "May", value: 5.91 },
    { month: "June", value: 3.28 },
];

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

/** Extract month name from various formats:
 *  - "Sat Feb 01 2025 00:00:00 GMT+0200 ..." → "February"
 *  - "January 2025" → "January"
 *  - "January" → "January"
 */
function displayMonth(raw: string): string {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
        return MONTH_NAMES[d.getMonth()];
    }
    return raw.replace(/\s+\d{4}$/, "");
}

const PERIODS = ["6 mon", "1yr", "All time"] as const;

const STRATEGIES: { value: PerformanceStrategy; label: string }[] = [
    { value: "vol_premium", label: "Vol Premium" },
    { value: "corr_arb", label: "Corr Arb" },
];

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export function MonthlyPerformance() {
    const [activePeriod, setActivePeriod] = useState<string>("6 mon");
    const [activeStrategy, setActiveStrategy] = useState<PerformanceStrategy>("vol_premium");
    const [allMonths, setAllMonths] = useState<MonthlyPerformanceItem[]>(FALLBACK_MONTHS);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            const data = await fetchMonthlyPerformance(activeStrategy);
            if (!cancelled && data && data.length > 0) {
                setAllMonths(data);
            } else if (!cancelled) {
                setAllMonths(FALLBACK_MONTHS);
            }
        }

        loadData();
        return () => { cancelled = true; };
    }, [activeStrategy]);

    // Derive visible months based on active period
    const months =
        activePeriod === "1yr"
            ? allMonths.slice(-12)
            : allMonths.slice(-6); // "6 mon" and "All time" both show last 6 behind overlay

    const values = months.map((m) => m.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1; // avoid division by zero

    return (
        <section
            className="relative w-full flex flex-col"
            style={{
                backgroundColor: "#050A0C",
                minHeight: "100vh",
                maxHeight: "1200px",
                height: "100vh",
            }}
        >
            {/* ── CSS Grid lines (section-local) ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(29, 43, 47, 0.25) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(29, 43, 47, 0.25) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* ── Outer glow — right side ── */}
            <div
                className="absolute z-[2] pointer-events-none"
                style={{
                    right: "-0.1%",
                    top: "60%",
                    width: "clamp(300px, 40vw, 646px)",
                    opacity: 0.95,
                }}
            >
                <img
                    src="/Vector-glow.svg"
                    alt=""
                    className="w-full h-auto"
                    aria-hidden="true"
                />
            </div>

            {/* ── 90% width wrapper ── */}
            <div
                className="relative z-[3] w-[98%] md:w-[90%] max-w-[1700px] mx-auto flex flex-col h-full"
                style={{ paddingTop: 112, paddingBottom: 32 }}
            >

                {/* ══ HEADER — outside the container ══ */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <span
                            className="block font-mono tracking-[0.2em] uppercase text-[#5A8A8F] mb-2"
                            style={{ fontSize: "clamp(12px, 3vw, 18px)" }}
                        >
                            Returns
                        </span>
                        <h2
                            className="font-mono font-bold text-white leading-tight"
                            style={{ fontSize: "clamp(1.4rem, 5vw, 3rem)" }}
                        >
                            Monthly performance
                        </h2>
                    </div>

                    <button
                        className="flex items-center gap-2 px-5 py-2.5 text-[#A0C4C8] font-mono text-xs tracking-wide hover:brightness-110 transition-all self-start md:self-center"
                        style={{
                            backgroundColor: "#225258",
                            borderRadius: "8px",
                        }}
                    >
                        Download factsheet
                        <img src="/download.svg" alt="" className="w-4 h-4" style={{ filter: "brightness(0) invert(1)" }} aria-hidden="true" />
                    </button>
                </div>

                {/* ══ CONTAINER — 95% of remaining height ══ */}
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{
                        backgroundColor: "#050A0C",
                        flex: "1 1 0",
                        maxHeight: "95%",
                    }}
                >
                    {/* Grain overlay @ 3% */}
                    <div
                        className="absolute inset-0 pointer-events-none z-[1]"
                        style={{
                            backgroundImage: "url(/grains.svg)",
                            backgroundRepeat: "repeat",
                            opacity: 0.03,
                        }}
                    />

                    {/* Inner glow — top center, overflows upward */}
                    <div
                        className="absolute z-[2] pointer-events-none left-1/2 -translate-x-1/2"
                        style={{
                            top: "-160px",
                            width: "clamp(400px, 50vw, 646px)",
                            opacity: 0.30,
                        }}
                    >
                        <img
                            src="/Vector-glow.svg"
                            alt=""
                            className="w-full h-auto"
                            aria-hidden="true"
                        />
                    </div>

                    {/* ── Container content ── */}
                    <div className="relative z-[5] px-6 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col flex-1">

                        {/* Disclaimer + period filter row */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div className="flex items-start gap-2">
                                <span className="text-[#5CCAD3] text-base leading-none mt-0.5">✳</span>
                                <p className="font-mono text-[11px] md:text-xs text-[#6A9A9E] leading-relaxed">
                                    The performance table<br />
                                    updates monthly
                                </p>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6">
                                {/* Strategy dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                                        className="flex items-center gap-2 font-mono text-xs tracking-wide text-white transition-colors px-3 py-1.5 rounded-md"
                                        style={{
                                            backgroundColor: "rgba(34, 82, 88, 0.5)",
                                            border: "1px solid rgba(92, 202, 211, 0.2)",
                                        }}
                                    >
                                        {STRATEGIES.find(s => s.value === activeStrategy)?.label}
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {dropdownOpen && (
                                        <div
                                            className="absolute right-0 top-full mt-1 rounded-md overflow-hidden z-20"
                                            style={{
                                                backgroundColor: "#0D1B1E",
                                                border: "1px solid rgba(92, 202, 211, 0.2)",
                                                minWidth: "130px",
                                            }}
                                        >
                                            {STRATEGIES.map((s) => (
                                                <button
                                                    key={s.value}
                                                    onClick={() => {
                                                        setActiveStrategy(s.value);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left font-mono text-xs tracking-wide px-3 py-2 transition-colors ${activeStrategy === s.value
                                                        ? "text-[#5CCAD3] bg-[rgba(92,202,211,0.1)]"
                                                        : "text-[#6A9A9E] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                                                        }`}
                                                >
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Separator */}
                                <div className="w-px h-4" style={{ backgroundColor: "rgba(63, 88, 94, 0.4)" }} />

                                {/* Period toggles */}
                                {PERIODS.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setActivePeriod(p)}
                                        className={`font-mono text-xs tracking-wide transition-colors ${activePeriod === p
                                            ? "text-white"
                                            : "text-[#3F585E] hover:text-[#6A9A9E]"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── Bar chart — fills remaining height ── */}
                        <div className="relative flex items-end gap-1.5 md:gap-5 lg:gap-8 flex-1">

                            {/* Glassy overlay for "All time" */}
                            {activePeriod === "All time" && (
                                <div
                                    className="absolute inset-0 z-10 flex items-center justify-center rounded-xl"
                                    style={{
                                        background: "rgba(5, 10, 12, 0.70)",
                                        backdropFilter: "blur(8px)",
                                        WebkitBackdropFilter: "blur(8px)",
                                    }}
                                >
                                    <button
                                        className="flex items-center gap-2 px-8 py-3.5 font-mono text-sm tracking-wide text-white transition-all hover:brightness-125"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(92, 202, 211, 0.25), rgba(34, 82, 88, 0.5))",
                                            border: "1px solid rgba(92, 202, 211, 0.3)",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        Request factsheet
                                        <img src="/download.svg" alt="" className="w-4 h-4" style={{ filter: "brightness(0) invert(1)" }} aria-hidden="true" />
                                    </button>
                                </div>
                            )}

                            {months.map((item, i) => {
                                const isHighlight = item.value === maxValue;
                                const heightPct = ((item.value - minValue) / range) * 75 + 15;

                                return (
                                    <div
                                        key={i}
                                        className="flex-1 flex flex-col items-center justify-end h-full"
                                    >
                                        {/* Value above bar */}
                                        <span
                                            className={`font-mono font-medium mb-3 ${isHighlight
                                                ? "text-[#5CCAD3]"
                                                : "text-white"
                                                }`}
                                            style={{ fontSize: "clamp(0.65rem, 2vw, 1.35rem)" }}
                                        >
                                            {item.value.toFixed(2)}%
                                        </span>

                                        {/* Bar wrapper */}
                                        <div
                                            className="w-full relative"
                                            style={{ height: `${heightPct}%` }}
                                        >
                                            {/* Solid line at top of bar */}
                                            <div
                                                style={{
                                                    height: "4px",
                                                    backgroundColor: isHighlight
                                                        ? "#268197"
                                                        : "#ACACAC",
                                                    borderRadius: "0 0 5px 5px",
                                                }}
                                            />

                                            {/* Bar body — gradient + dashed side borders */}
                                            <div
                                                className="relative"
                                                style={{
                                                    height: "calc(100% - 4px)",
                                                    background: isHighlight
                                                        ? "linear-gradient(to bottom, rgba(54, 199, 231, 0.23), rgba(12, 20, 22, 0))"
                                                        : "linear-gradient(to bottom, rgba(41, 53, 56, 1), rgba(16, 24, 27, 0))",
                                                    borderLeft: "0.4px dashed rgba(63, 88, 94, 0.4)",
                                                    borderRight: "0.4px dashed rgba(63, 88, 94, 0.4)",
                                                }}
                                            >
                                                {/* Month label inside bar */}
                                                <div className="absolute inset-x-0 top-3 flex justify-center">
                                                    <span
                                                        className={`month-label font-mono text-[10px] md:text-xs tracking-wide ${isHighlight
                                                            ? "text-[#5CCAD3]/70"
                                                            : "text-[#F4FFFF]"
                                                            }`}
                                                    >
                                                        {displayMonth(item.month)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .month-label {
                    writing-mode: horizontal-tb;
                    text-orientation: mixed;
                }

                @media (max-width: 767px) {
                    .month-label {
                        writing-mode: vertical-rl;
                        text-orientation: mixed;
                    }
                }
            `}</style>
        </section>
    );
}
