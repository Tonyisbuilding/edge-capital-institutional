"use client";

import { NAVReturnChart } from "@/components/charts/NAVReturnChart";

export function NAVPerformance() {
    return (
        <div className="relative z-10 bg-[#050A0C] border-y border-institutional-charcoal/30">
            <div className="w-[98%] max-w-[1700px] mx-auto py-16 md:py-24 px-4 md:px-8">
                {/* Header */}
                <div className="mb-10">
                    <span className="text-sm font-mono uppercase tracking-widest text-institutional-slate/60 mb-2 block">
                        Performance
                    </span>
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-institutional-white">
                        Net Asset Value Total Return (%)
                    </h2>
                </div>

                {/* Chart */}
                <NAVReturnChart />
            </div>
        </div>
    );
}
