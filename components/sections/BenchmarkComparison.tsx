"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   Data — will be dynamic from DB/Google Sheets later
   ═══════════════════════════════════════════════════════════ */
const EDGE_CAPITAL = 180.9;
const MSCI_WORLD = 65.4;
const maxVal = Math.max(EDGE_CAPITAL, MSCI_WORLD);

/* Chamfer size in SVG units for the 45-degree cut */
const CHAMFER = 45;

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export function BenchmarkComparison() {
    /* Heights as percentage of max — taller bar = 100% */
    const edgePct = (EDGE_CAPITAL / maxVal) * 100;
    const msciPct = (MSCI_WORLD / maxVal) * 100;

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
            {/* ── CSS Grid lines ── */}
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
                    right: "-2%",
                    top: "60%",
                    width: "clamp(300px, 40vw, 646px)",
                    opacity: 0.35,
                }}
            >
                <img
                    src="/Vector-glow.svg"
                    alt=""
                    className="w-full h-auto"
                    aria-hidden="true"
                />
            </div>

            {/* ── Width wrapper ── */}
            <div
                className="relative z-[3] w-[98%] md:w-[90%] mx-auto flex flex-col h-full"
                style={{ paddingTop: 112, paddingBottom: 32 }}
            >
                {/* ══ CONTAINER ══ */}
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col flex-1"
                    style={{
                        backgroundColor: "#050A0C",
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

                    {/* Inner glow — top center */}
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

                    {/* ── Content ── */}
                    <div className="relative z-[5] px-6 md:px-12 lg:px-16 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-16 flex-1">

                        {/* LEFT — Text content */}
                        <div className="md:w-[60%] flex flex-col justify-center">
                            <h2
                                className="font-mono font-bold text-white leading-[1.15] mb-6"
                                style={{ fontSize: "clamp(1.4rem, 4vw, 35px)" }}
                            >
                                We Systematically Outperform Global Equity Benchmarks Since Inception
                            </h2>

                            <p
                                className="text-[#8AABB0] leading-relaxed mb-8"
                                style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}
                            >
                                Since inception, the platform has delivered nearly 3x the cumulative
                                return of global equities—independent of market cycles and
                                structurally immune to drawdowns.
                            </p>

                            <button
                                className="flex items-center gap-2 px-5 py-2.5 text-[#A0C4C8] font-mono text-xs tracking-wide hover:brightness-110 transition-all self-start"
                                style={{
                                    backgroundColor: "#225258",
                                    borderRadius: "8px",
                                }}
                            >
                                Download factsheet
                                <img
                                    src="/download.svg"
                                    alt=""
                                    className="w-4 h-4"
                                    style={{ filter: "brightness(0) invert(1)" }}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        {/* RIGHT — Comparison bars */}
                        <div className="md:w-[40%] flex items-end justify-center gap-1 md:gap-2 relative">
                            {/* MSCI World bar (shorter) */}
                            <div
                                className="flex flex-col items-end h-full"
                                style={{ width: "clamp(100px, 18vw, 220px)" }}
                            >
                                {/* Value + label */}
                                <span
                                    className="font-mono font-bold text-white mb-1"
                                    style={{ fontSize: "35px" }}
                                >
                                    {MSCI_WORLD.toFixed(1)}%
                                </span>
                                <span className="font-mono text-[10px] md:text-xs text-[#8AABB0] tracking-wide mb-3">
                                    MSCI World
                                </span>

                                {/* Bar with 45-degree chamfer on right side */}
                                <div
                                    className="w-full relative"
                                    style={{ height: `${msciPct * 0.8}%` }}
                                >
                                    <svg
                                        viewBox={`0 0 200 300`}
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                    >
                                        <defs>
                                            <linearGradient id="msciGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="rgba(41, 53, 56, 1)" />
                                                <stop offset="100%" stopColor="rgba(16, 24, 27, 0)" />
                                            </linearGradient>
                                        </defs>
                                        {/* Chamfered shape: top-right 45° cut */}
                                        <polygon
                                            points={`0,0 ${200 - CHAMFER},0 200,${CHAMFER} 200,300 0,300`}
                                            fill="url(#msciGrad)"
                                            stroke="rgba(63, 88, 94, 0.35)"
                                            strokeWidth="1"
                                            strokeDasharray="4 3"
                                        />
                                        {/* Solid top & chamfer edge */}
                                        <polyline
                                            points={`0,0 ${200 - CHAMFER},0 200,${CHAMFER}`}
                                            fill="none"
                                            stroke="#ACACAC"
                                            strokeWidth="2.5"
                                            strokeLinejoin="miter"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Edge Capital bar (taller) */}
                            <div
                                className="flex flex-col items-end h-full"
                                style={{ width: "clamp(100px, 18vw, 220px)" }}
                            >
                                {/* Value + label */}
                                <span
                                    className="font-mono font-bold text-[#5CCAD3] mb-1"
                                    style={{ fontSize: "35px" }}
                                >
                                    {EDGE_CAPITAL.toFixed(1)}%
                                </span>
                                <span className="font-mono text-[10px] md:text-xs text-[#8AABB0] tracking-wide mb-3">
                                    Edge Capital
                                </span>

                                {/* Bar with 45-degree chamfer on right side */}
                                <div
                                    className="w-full relative"
                                    style={{ height: `${edgePct * 0.8}%` }}
                                >
                                    <svg
                                        viewBox={`0 0 200 300`}
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                    >
                                        <defs>
                                            <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="rgba(54, 199, 231, 0.23)" />
                                                <stop offset="100%" stopColor="rgba(12, 20, 22, 0)" />
                                            </linearGradient>
                                        </defs>
                                        {/* Chamfered shape: top-right 45° cut */}
                                        <polygon
                                            points={`0,0 ${200 - CHAMFER},0 200,${CHAMFER} 200,300 0,300`}
                                            fill="url(#edgeGrad)"
                                            stroke="rgba(54, 199, 231, 0.25)"
                                            strokeWidth="1"
                                            strokeDasharray="4 3"
                                        />
                                        {/* Solid top & chamfer edge */}
                                        <polyline
                                            points={`0,0 ${200 - CHAMFER},0 200,${CHAMFER}`}
                                            fill="none"
                                            stroke="#268197"
                                            strokeWidth="2.5"
                                            strokeLinejoin="miter"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
