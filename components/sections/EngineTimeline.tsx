"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════ */
import images from "@/constants/images";

const ITEMS = [
    {
        tab: "Engine one",
        step: "01",
        title: "Market Neutral\nVolatility Premium",
        description:
            "We systematically harvest the structural spread between Implied Volatility (market fear) and Realized Volatility (actual movement). By selling expensive convexity while dynamically hedging Delta, we generate consistent yield that is mathematically independent of market direction.",
        imgSrc: "/Market Neutral Volatility Premium.png",
    },
    {
        tab: "Engine two",
        step: "02",
        title: "Correlation / Relative-\nValue Dislocation",
        description:
            "We do not just trade assets; we trade the relationships between them. Our engines exploit statistical dislocations across G10 FX and global equity indices, capturing alpha when correlations break down or mean-revert during periods of macro stress.",
        imgSrc: "/Relative- Value Dislocation.png",
    },
    {
        tab: "Risk upgrade",
        step: "03",
        title: "The Risk-Engine\nUpgrade (Nov 2022)",
        description:
            "Following the 2022 rate shock, we deployed a structural architectural upgrade: a \"Crisis Alpha\" overlay. This adaptive logic allows the system to instantly transition from \"Harvesting\" to \"Long Volatility,\" monetizing the velocity of tail-risk events rather than just surviving them.",
        imgSrc: "/The Risk-Engine Upgrade.png",
    },
];

const NAV_HEIGHT = 88;

/* ═══════════════════════════════════════════════════════════
   Text Scramble Hook
   ═══════════════════════════════════════════════════════════ */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function useTextScramble(targetText: string, duration = 700) {
    const [display, setDisplay] = useState(targetText);
    const frameRef = useRef<number | null>(null);
    const prevRef = useRef(targetText);

    const scramble = useCallback(
        (from: string, to: string) => {
            const maxLen = Math.max(from.length, to.length);
            const t0 = performance.now();

            const tick = (now: number) => {
                const p = Math.min((now - t0) / duration, 1);
                const resolved = Math.floor(p * maxLen);
                let out = "";
                for (let i = 0; i < maxLen; i++) {
                    if (i < resolved) {
                        out += to[i] ?? "";
                    } else if (to[i] === "\n" || to[i] === " ") {
                        out += to[i];
                    } else {
                        out += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                setDisplay(out);
                if (p < 1) frameRef.current = requestAnimationFrame(tick);
                else setDisplay(to);
            };

            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(tick);
        },
        [duration]
    );

    useEffect(() => {
        if (targetText !== prevRef.current) {
            scramble(prevRef.current, targetText);
            prevRef.current = targetText;
        }
    }, [targetText, scramble]);

    useEffect(
        () => () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        },
        []
    );

    return display;
}

/* ═══════════════════════════════════════════════════════════
   Tab Bar with integrated progress loading
   - bg: #EAF2F3
   - progress / completed fill: #DCE8EA
   - stroke: rgba(63, 88, 94, 0.15) @ 0.4px
   ═══════════════════════════════════════════════════════════ */
function TabBar({
    activeIndex,
    subProgress,
    onTabClick,
}: {
    activeIndex: number;
    subProgress: number;
    onTabClick: (index: number) => void;
}) {
    return (
        <div className="grid grid-cols-3">
            {ITEMS.map((item, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onTabClick(i)}
                        className="relative overflow-hidden cursor-pointer text-left"
                        style={{
                            backgroundColor: "#EAF2F3",
                            border: "0.4px solid rgba(63, 88, 94, 0.15)",
                            marginLeft: i > 0 ? "-0.4px" : 0,
                        }}
                    >
                        {/* Progress fill */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundColor: "#DCE8EA",
                                width: isPast
                                    ? "100%"
                                    : isActive
                                        ? `${subProgress * 100}%`
                                        : "0%",
                                transition: isActive
                                    ? "width 0.08s linear"
                                    : "width 0.4s ease",
                            }}
                        />

                        {/* Tab label */}
                        <div
                            className={`relative z-10 flex items-center gap-2 py-3 md:py-4 px-3 md:px-5 font-mono text-[11px] md:text-sm tracking-wide transition-colors duration-400 ${isActive || isPast
                                ? "text-[#1A2B30]"
                                : "text-[#1A2B30]/35"
                                }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full shrink-0 transition-all duration-400 ${isActive
                                    ? "bg-[#5A7A80] scale-100"
                                    : isPast
                                        ? "bg-[#5A7A80]/50 scale-100"
                                        : "bg-[#1A2B30]/12 scale-75"
                                    }`}
                            />
                            {item.tab}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   Right Content Card
   ═══════════════════════════════════════════════════════════ */
function RightContent({ item }: { item: (typeof ITEMS)[number] }) {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-[#1A2B30]/55 text-sm md:text-[15px] leading-relaxed max-w-xl">
                {item.description}
            </p>

            <div className="mt-4 rounded-lg overflow-hidden flex justify-start">
                <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-auto h-auto max-w-full max-h-[50vh] object-contain block"
                />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   Left Title — stays fixed, scrambles text on change
   ═══════════════════════════════════════════════════════════ */
function LeftTitle({ activeIndex }: { activeIndex: number }) {
    const title = ITEMS[activeIndex]?.title ?? ITEMS[0].title;
    const displayText = useTextScramble(title, 700);

    return (
        <h3
            className="font-mono font-bold text-[#1A2B30] leading-[1.12] whitespace-pre-line"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
        >
            {displayText}
        </h3>
    );
}

/* ═══════════════════════════════════════════════════════════
   Main Component

   Behaviour:
   • Left column (title): stays in place, scrambles text on transition
   • Right column: active item stays; next item scrolls up from bottom.
     When the next one's top gets close, the active one slides upward
     and out. Right content appears to scroll like a feed.
   • Step indicator: active→next line is wide; others narrow.
   ═══════════════════════════════════════════════════════════ */
export function EngineTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /* ── Derived state ── */
    const [activeIndex, setActiveIndex] = useState(0);
    const [subProgress, setSubProgress] = useState(0);

    useEffect(() => {
        const unsub = scrollYProgress.on("change", (v) => {
            const scaled = v * ITEMS.length;
            const idx = Math.min(Math.floor(scaled), ITEMS.length - 1);
            setActiveIndex(idx);
            setSubProgress(Math.min(scaled - idx, 1));
        });
        return unsub;
    }, [scrollYProgress]);

    /* ── Right-column Y transforms ──
       Smooth slide transitions over ~0.05 scroll range (~200px of 4000px scroll).
    */

    // Item 0: holds in place → slides out upward
    const y0 = useTransform(
        scrollYProgress,
        [0, 0.28, 0.333],
        ["0%", "0%", "-100%"]
    );
    const op0 = useTransform(
        scrollYProgress,
        [0, 0.27, 0.333],
        [1, 1, 0]
    );

    // Item 1: slides in from bottom → holds → slides out upward
    const y1 = useTransform(
        scrollYProgress,
        [0.28, 0.35, 0.61, 0.667],
        ["100%", "0%", "0%", "-100%"]
    );
    const op1 = useTransform(
        scrollYProgress,
        [0.28, 0.35, 0.60, 0.667],
        [0, 1, 1, 0]
    );

    // Item 2: slides in from bottom → holds
    const y2 = useTransform(
        scrollYProgress,
        [0.61, 0.68, 1],
        ["100%", "0%", "0%"]
    );
    const op2 = useTransform(
        scrollYProgress,
        [0.60, 0.68, 1],
        [0, 1, 1]
    );

    const yArr = [y0, y1, y2];
    const opArr = [op0, op1, op2];

    /* ── Click-to-scroll handler ── */
    const handleTabClick = useCallback(
        (index: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = window.scrollY + rect.top;
            const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
            const targetScroll = containerTop + (index / ITEMS.length) * totalScroll;
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
        },
        []
    );

    return (
        <div ref={containerRef} style={{ height: "400vh" }}>
            <div
                className="sticky flex flex-col relative overflow-hidden"
                style={{
                    backgroundColor: "#EDF3F4",
                    top: 0,
                    height: "100vh",
                }}
            >
                {/* Grain */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: "url(/grains.svg)",
                        backgroundRepeat: "repeat",
                        opacity: 0.05,
                    }}
                />

                <div
                    className="relative z-10 w-full max-w-[1700px] mx-auto px-[10px] md:px-12 flex flex-col flex-1"
                    style={{ paddingTop: NAV_HEIGHT + 24 }}
                >
                    {/* Tab bar with progress */}
                    <TabBar activeIndex={activeIndex} subProgress={subProgress} onTabClick={handleTabClick} />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col pt-8 md:pt-12 overflow-hidden">

                        {/* Two-column layout */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12 flex-1">
                            {/* LEFT — fixed in place, scrambles */}
                            <div className="md:w-[40%] shrink-0">
                                <LeftTitle activeIndex={activeIndex} />
                            </div>

                            {/* RIGHT — scrolls vertically */}
                            <div className="flex-1 relative overflow-hidden">
                                {ITEMS.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-x-0 top-0"
                                        style={{
                                            y: yArr[i],
                                            opacity: opArr[i],
                                        }}
                                    >
                                        <RightContent item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
