"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   Data — will be dynamic from DB/Google Sheets later
   ═══════════════════════════════════════════════════════════ */
const EDGE_CAPITAL = 180.9;
const MSCI_WORLD = 65.4;
const maxVal = Math.max(EDGE_CAPITAL, MSCI_WORLD);

/* Chamfer size in pixels (fixed to ensure same angle) */
const CHAMFER = 45;

/* ═══════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════ */

/**
 * Hook to measure an element's size.
 * Uses ResizeObserver to get precise pixel dimensions.
 */
function useElementSize<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            // Use borderBoxSize if available for robustness, or contentRect
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, width: size.width, height: size.height };
}

/**
 * ChamferedBar Component
 * Renders a bar with a fixed 45px chamfer at the top-right.
 * Uses exact pixel paths via SVG to avoid aspect-ratio distortion.
 */
interface ChamferedBarProps {
    heightPct: number;
    gradientId: string;
    gradientStops: React.ReactNode;
    stroke: string;
    strokeDasharray?: string;
    topStroke: string;
}

const ChamferedBar = ({
    heightPct,
    gradientId,
    gradientStops,
    stroke,
    strokeDasharray,
    topStroke,
}: ChamferedBarProps) => {
    const { ref, width, height } = useElementSize<HTMLDivElement>();

    const c = Math.min(CHAMFER, width);

    // Closed shape for fill only
    const fillPath = `
        M 0,${height} 
        L 0,0 
        L ${width - c},0 
        L ${width},${c} 
        L ${width},${height} 
        Z
    `;

    // Open path for dashed side borders (left + right only, no bottom)
    const sidesPath = `
        M 0,${height} 
        L 0,0 
        M ${width},${c} 
        L ${width},${height}
    `;

    // Top highlight: (0,0) -> (W-C,0) -> (W,C)
    const topPathD = `
        M 0,0 
        L ${width - c},0 
        L ${width},${c}
    `;

    return (
        <div
            ref={ref}
            className="w-full relative"
            style={{ height: `${heightPct}%` }}
        >
            <svg
                width="100%"
                height="100%"
                className="overflow-visible block"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        {gradientStops}
                    </linearGradient>
                </defs>

                {/* Fill only (no stroke on bottom) */}
                <path
                    d={fillPath}
                    fill={`url(#${gradientId})`}
                    stroke="none"
                />

                {/* Dashed side borders only */}
                <path
                    d={sidesPath}
                    fill="none"
                    stroke={stroke}
                    strokeWidth="1"
                    strokeDasharray={strokeDasharray}
                />

                {/* Top Chamfer Border */}
                <path
                    d={topPathD}
                    fill="none"
                    stroke={topStroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export function BenchmarkComparison() {
    /* Heights as percentage of max — taller bar = 100% of the allocated height */
    // However, visual design might want the bars to be grounded.
    // We used 0.8 scale factor in previous code `edgePct * 0.8`.
    const edgePct = (EDGE_CAPITAL / maxVal) * 100 * 0.8;
    const msciPct = (MSCI_WORLD / maxVal) * 100 * 0.8;

    return (
        <section
            className="relative w-full flex flex-col"
            style={{
                backgroundColor: "#050A0C",
                minHeight: "110vh",
                maxHeight: "1200px",
                height: "110vh",
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
                className="relative z-[3] w-[98%] md:w-[90%] max-w-[1700px] mx-auto flex flex-col h-full"
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
                        <div className="md:w-[40%] flex items-end justify-center gap-8 md:gap-12 relative">
                            {/* MSCI World bar (shorter) */}
                            <div
                                className="flex flex-col items-start justify-end h-full"
                                style={{ width: "clamp(100px, 18vw, 220px)" }}
                            >
                                {/* Value + label */}
                                <span
                                    className="font-mono font-medium text-white mb-0"
                                    style={{ fontSize: "35px" }}
                                >
                                    {MSCI_WORLD.toFixed(1)}%
                                </span>
                                <span className="font-mono text-[10px] md:text-xs text-[#8AABB0] tracking-wide mb-2">
                                    MSCI World
                                </span>

                                {/* Dotted Line Connector with circle head */}
                                <div className="flex flex-col items-start mb-2" aria-hidden="true">
                                    <div
                                        className="rounded-full mb-[-1px]"
                                        style={{
                                            width: 6,
                                            height: 6,
                                            backgroundColor: "#8AABB0",
                                            opacity: 0.4,
                                        }}
                                    />
                                    <div
                                        className="h-[44px] border-l-2 border-dotted border-[#8AABB0]/30 ml-[2px]"
                                    />
                                </div>

                                {/* Bar Component */}
                                <ChamferedBar
                                    heightPct={msciPct}
                                    gradientId="msciGrad"
                                    gradientStops={
                                        <>
                                            <stop offset="0%" stopColor="rgba(41, 53, 56, 1)" />
                                            <stop offset="100%" stopColor="rgba(16, 24, 27, 0)" />
                                        </>
                                    }
                                    stroke="rgba(63, 88, 94, 0.1)"
                                    strokeDasharray="4 3"
                                    topStroke="#ACACAC"
                                />
                            </div>

                            {/* Edge Capital bar (taller) */}
                            <div
                                className="flex flex-col items-start justify-end h-full"
                                style={{ width: "clamp(100px, 18vw, 220px)" }}
                            >
                                {/* Value + label */}
                                <span
                                    className="font-mono font-medium text-[#5CCAD3] mb-0"
                                    style={{ fontSize: "35px" }}
                                >
                                    {EDGE_CAPITAL.toFixed(1)}%
                                </span>
                                <span className="font-mono text-[10px] md:text-xs text-[#8AABB0] tracking-wide mb-2">
                                    Edge Capital
                                </span>

                                {/* Dotted Line Connector with circle head */}
                                <div className="flex flex-col items-start mb-2" aria-hidden="true">
                                    <div
                                        className="rounded-full mb-[-1px]"
                                        style={{
                                            width: 6,
                                            height: 6,
                                            backgroundColor: "#5CCAD3",
                                            opacity: 0.4,
                                        }}
                                    />
                                    <div
                                        className="h-[44px] border-l-2 border-dotted border-[#5CCAD3]/30 ml-[2px]"
                                    />
                                </div>

                                {/* Bar Component */}
                                <ChamferedBar
                                    heightPct={edgePct}
                                    gradientId="edgeGrad"
                                    gradientStops={
                                        <>
                                            <stop offset="0%" stopColor="rgba(54, 199, 231, 0.23)" />
                                            <stop offset="100%" stopColor="rgba(12, 20, 22, 0)" />
                                        </>
                                    }
                                    stroke="rgba(54, 199, 231, 0.1)"
                                    strokeDasharray="4 3"
                                    topStroke="#268197"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ INFO CARDS — full section width ══ */}
            <div className="relative z-[3] grid grid-cols-1 md:grid-cols-3 mt-auto max-w-[1700px] mx-auto w-full">
                {[
                    {
                        num: "01",
                        title: "REGULATED STRUCTURE",
                        desc: "When the global 60/40 portfolio failed during the 2022 Rate Shock, our volatility and correlation engines did exactly what they were engineered to do.",
                    },
                    {
                        num: "02",
                        title: "ASSET SAFETY",
                        desc: "Client assets are held in a separate legal entity (Stichting Bewaring), isolating investor capital from platform balance sheet risk.",
                    },
                    {
                        num: "03",
                        title: "LIQUID TERMS",
                        desc: "Monthly liquidity with zero lock-up periods, ensuring capital remains accessible and decision-ready.",
                    },
                ].map((card, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden px-6 py-8 flex flex-col gap-6"
                        style={{
                            backgroundColor: "#222D2F",
                            borderRight:
                                i < 2 ? "1px solid rgba(247, 249, 250, 0.15)" : "none",
                        }}
                    >
                        {/* Grain overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-[1]"
                            style={{
                                backgroundImage: "url(/grains.svg)",
                                backgroundRepeat: "repeat",
                                opacity: 0.03,
                            }}
                        />

                        <div className="relative z-[2]">
                            <span className="font-mono text-white text-xl font-bold">
                                {card.num}
                            </span>
                            <span className="font-mono text-[#5A7A80] text-xl">{"//"}</span>
                        </div>

                        <div className="relative z-[2] mt-auto flex flex-col gap-2">
                            <h3 className="font-mono text-white text-sm font-bold tracking-wide">
                                {card.title}
                            </h3>
                            <p className="font-mono text-[#8AABB0] text-xs leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
