import { Section } from "@/components/ui/Section";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { AttributionHeatmap } from "@/components/charts/AttributionHeatmap";

export function AnalyticsModule() {
    return (
        <div className="bg-analytics-bg text-institutional-white border-y border-institutional-charcoal/30">
            <Section>
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-institutional-white mb-2">
                        Non-Correlated Resilience
                    </h2>
                    <p className="font-mono text-sm text-institutional-slate uppercase tracking-widest">
                        Live Analytics Mode
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Component A: Stress Test Chart */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
                            <h3 className="text-lg font-medium text-institutional-slate">NAV Performance vs Benchmark</h3>
                            <div className="flex gap-4 text-xs font-mono">
                                <span className="flex items-center gap-2 text-institutional-teal">
                                    <span className="w-2 h-2 bg-institutional-teal rounded-full"></span> Edge
                                </span>
                                <span className="flex items-center gap-2 text-institutional-slate/50">
                                    <span className="w-2 h-2 bg-institutional-slate/50 rounded-full"></span> MSCI World
                                </span>
                            </div>
                        </div>
                        <PerformanceChart />
                        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                            <div>
                                <p className="text-xs text-institutional-slate/50 uppercase mb-1">Max Drawdown</p>
                                <p className="text-xl font-mono text-institutional-red">-4.2%</p>
                            </div>
                            <div>
                                <p className="text-xs text-institutional-slate/50 uppercase mb-1">Sharpe</p>
                                <p className="text-xl font-mono text-institutional-teal">2.4</p>
                            </div>
                            <div>
                                <p className="text-xs text-institutional-slate/50 uppercase mb-1">Correlation</p>
                                <p className="text-xl font-mono text-institutional-white">0.12</p>
                            </div>
                        </div>
                    </div>

                    {/* Component B: Heatmap */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="mb-4 border-b border-white/10 pb-2">
                            <h3 className="text-lg font-medium text-institutional-slate">Monthly Attribution</h3>
                        </div>
                        <AttributionHeatmap />
                    </div>
                </div>
            </Section>
        </div>
    );
}
