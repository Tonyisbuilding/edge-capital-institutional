"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PARAGRAPH_TEXT =
    "We define stress not as fear, but as an operational state. When risk premia reprice and correlations destabilize, the platform activates a pre-defined operational loop.";

const WORDS = PARAGRAPH_TEXT.split(" ");

// Words that should always be bold/dark for emphasis
const BOLD_WORDS = new Set(["operational", "state."]);

function AnimatedWord({
    word,
    index,
    totalWords,
    scrollYProgress,
}: {
    word: string;
    index: number;
    totalWords: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Each word transitions from muted to active over a small scroll range
    // Stagger the start so words animate one by one
    const wordStart = index / totalWords;
    const wordEnd = (index + 1) / totalWords;

    const color = useTransform(
        scrollYProgress,
        [wordStart, wordEnd],
        ["#B0BEC5", "#1A2B30"]
    );

    const isBold = BOLD_WORDS.has(word);

    return (
        <motion.span
            style={{ color }}
            className={`inline-block ${isBold ? "font-bold" : ""}`}
        >
            {word}
            {"\u00A0"}
        </motion.span>
    );
}

export function StressDefinition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        // Scroll spacer — 300vh gives enough scroll distance for smooth word-by-word animation
        <div ref={containerRef} style={{ height: "300vh" }}>
            {/* Sticky viewport — pins the section while scrolling through the spacer */}
            <div
                className="sticky top-0 h-screen flex items-center justify-center relative"
                style={{ backgroundColor: "#EDF3F4" }}
            >
                {/* Grain texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url(/grains.svg)",
                        backgroundRepeat: "repeat",
                        opacity: 0.05,
                    }}
                />

                <div className="relative z-10 w-full max-w-[1700px] mx-auto flex items-center justify-center px-[10px] md:px-12">
                    <div
                        className="w-[98%] md:w-[80%]"
                        style={{ maxWidth: "1250px" }}
                    >
                        <p
                            className="leading-[1.6] font-mono font-semibold text-center"
                            style={{ fontSize: "clamp(20px, 2.5vw, 34px)" }}
                        >
                            {WORDS.map((word, i) => (
                                <AnimatedWord
                                    key={i}
                                    word={word}
                                    index={i}
                                    totalWords={WORDS.length}
                                    scrollYProgress={scrollYProgress}
                                />
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
