"use client";

import { cn } from "@/lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const years = [2024, 2023, 2022, 2021, 2020];

// Mock Data Generator for visual purposes
const generateReturns = () => {
    return years.map(year => {
        return {
            year,
            returns: months.map((_, i) => {
                // Determine if it's a positive or negative month somewhat randomly but weighted positive
                const isPositive = Math.random() > 0.3;
                let val = (Math.random() * 4).toFixed(1);

                // Add specific stress alpha logic (just for visual matching)
                if (year === 2020 && (i === 2 || i === 3)) return 12.5; // Covid
                if (year === 2022 && i < 6) return (Math.random() * 3 + 1).toFixed(1);

                return isPositive ? parseFloat(val) : -parseFloat(val) * 0.5;
            }),
            ytd: 0 // calc later
        }
    }).map(row => {
        const ytd = row.returns.reduce((acc: number, val) => acc + Number(val), 0);
        return { ...row, ytd: ytd.toFixed(1) };
    });
};

const data = generateReturns();

const getColor = (value: number) => {
    if (value > 5) return "bg-institutional-teal text-white font-bold";
    if (value > 2) return "bg-institutional-teal/70 text-white";
    if (value > 0) return "bg-institutional-teal/30 text-institutional-teal/90";
    if (value === 0) return "bg-transparent text-institutional-slate/50";
    return "bg-institutional-red/20 text-institutional-red";
};

export function AttributionHeatmap() {
    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] font-mono text-xs">
                {/* Header */}
                <div className="grid grid-cols-14 gap-1 mb-2 text-institutional-slate/60 uppercase tracking-wider">
                    <div className="col-span-1">Year</div>
                    {months.map(m => <div key={m} className="col-span-1 text-right">{m}</div>)}
                    <div className="col-span-1 text-right font-bold text-institutional-white">YTD</div>
                </div>

                {/* Rows */}
                <div className="space-y-1">
                    {data.map((row) => (
                        <div key={row.year} className="grid grid-cols-14 gap-1 items-center">
                            <div className="col-span-1 font-bold text-institutional-slate">{row.year}</div>
                            {row.returns.map((val, i) => (
                                <div
                                    key={i}
                                    className={cn("col-span-1 p-2 text-right transition-all hover:opacity-80 cursor-crosshair", getColor(Number(val)))}
                                >
                                    {Number(val) > 0 ? "+" : ""}{val}%
                                </div>
                            ))}
                            <div className="col-span-1 text-right font-bold text-institutional-teal pl-2">
                                +{row.ytd}%
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Metric Callout */}
                <div className="mt-8 flex justify-end">
                    <div className="border border-institutional-teal/30 p-4 bg-institutional-teal/5 inline-flex flex-col items-end">
                        <span className="text-institutional-slate/60 uppercase tracking-widest text-[10px] mb-1">Annualized Vol</span>
                        <span className="text-2xl font-bold text-institutional-teal">~12.0%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
