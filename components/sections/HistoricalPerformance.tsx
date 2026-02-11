"use client";

import { Section } from "@/components/ui/Section";

const performanceData = [
    { month: "January", year: "2024", value: 6.3, highlight: false },
    { month: "February", year: "2024", value: 8.6, highlight: false },
    { month: "March", year: "2024", value: 10.2, highlight: false },
    { month: "April", year: "2024", value: 12.3, highlight: true },
    { month: "May", year: "2024", value: 11.0, highlight: false },
];

const maxValue = Math.max(...performanceData.map(d => d.value));

export function HistoricalPerformance() {
    return (
        <div className="bg-analytics-bg border-y border-institutional-charcoal/30">
            <Section>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <span className="text-sm font-mono uppercase tracking-widest text-institutional-slate/60 mb-2 block">
                            Performance
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-institutional-white italic">
                            Historical performance
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Decorative circles */}
                        <div className="hidden md:flex items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border border-white/20" />
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-institutional-teal to-emerald-600 border border-white/20 -ml-2" />
                            <div className="w-10 h-10 rounded-full bg-emerald-500 border border-white/20 -ml-2" />
                        </div>

                        {/* Detailed performance button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-emerald-500/50 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Detailed performance
                        </button>
                    </div>
                </div>

                {/* Update notice */}
                <div className="flex items-start gap-2 mb-12 text-institutional-slate/60 text-sm">
                    <span className="text-emerald-500 text-lg">*</span>
                    <span>Rest of the table will<br />be updated monthly</span>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end justify-between gap-4 md:gap-8 h-[400px] relative">
                    {/* Gradient glow effect behind bars */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

                    {performanceData.map((item, index) => {
                        const heightPercent = (item.value / maxValue) * 100;
                        const isHighlight = item.highlight;

                        return (
                            <div
                                key={index}
                                className="flex-1 flex flex-col items-center justify-end h-full relative group"
                            >
                                {/* Percentage value */}
                                <span className={`text-2xl md:text-4xl font-light mb-4 transition-colors ${isHighlight ? 'text-emerald-400' : 'text-institutional-white'
                                    }`}>
                                    {item.value}%
                                </span>

                                {/* Bar */}
                                <div
                                    className={`w-full relative transition-all duration-500 ease-out ${isHighlight
                                            ? 'bg-gradient-to-t from-emerald-900/80 to-emerald-700/40 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20'
                                            : 'bg-gradient-to-t from-gray-800 to-gray-700/80 border border-gray-600/50'
                                        }`}
                                    style={{ height: `${heightPercent * 0.6}%` }}
                                >
                                    {/* Inner glow for highlighted bar */}
                                    {isHighlight && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
                                    )}
                                </div>

                                {/* Month/Year label */}
                                <div className={`mt-4 text-center ${isHighlight ? 'text-emerald-400' : 'text-institutional-slate/80'}`}>
                                    <span className="text-sm md:text-base font-medium block">
                                        {item.month} {item.year}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}
