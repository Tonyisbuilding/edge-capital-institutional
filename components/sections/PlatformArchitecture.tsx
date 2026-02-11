import { Section } from "@/components/ui/Section";

export function PlatformArchitecture() {
    return (
        <Section className="border-b border-institutional-charcoal/10 bg-institutional-white">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-institutional-charcoal/10 border-t border-b md:border-t-0 md:border-b-0 border-institutional-charcoal/10">

                {/* Engine 1: Volatility Premium Risk */}
                <div className="py-12 md:pr-12 space-y-8">
                    <div className="space-y-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-institutional-charcoal/50">Engine 01</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-institutional-charcoal">
                            Volatility Premium Risk
                        </h3>
                        <span className="inline-block px-3 py-1 bg-institutional-charcoal/5 text-xs font-mono uppercase tracking-wider text-institutional-charcoal/70">
                            Market Neutral
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div className="border-l-2 border-institutional-teal pl-6 py-1">
                            <h4 className="font-mono text-sm uppercase tracking-wide text-institutional-charcoal/60 mb-2">Mechanism</h4>
                            <p className="text-lg text-institutional-charcoal/90 leading-relaxed font-sans">
                                Monetizes shock-driven repricing of implied vol and skew (volatility risk premia) without relying on directional equity beta.
                            </p>
                        </div>

                        <div className="bg-institutional-charcoal/5 p-6 border border-institutional-charcoal/5">
                            <h4 className="font-mono text-xs uppercase tracking-wide text-institutional-charcoal/50 mb-3">Tech Spec</h4>
                            <p className="font-mono text-sm text-institutional-charcoal/80">
                                &gt; Proprietary XGBoost models recalibrate hedge triggers in real time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Engine 2: Correlation Arbitrage */}
                <div className="py-12 md:pl-12 space-y-8">
                    <div className="space-y-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-institutional-charcoal/50">Engine 02</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-institutional-charcoal">
                            Correlation Arbitrage
                        </h3>
                        <span className="inline-block px-3 py-1 bg-institutional-charcoal/5 text-xs font-mono uppercase tracking-wider text-institutional-charcoal/70">
                            Relative-Value Dislocation
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div className="border-l-2 border-institutional-teal pl-6 py-1">
                            <h4 className="font-mono text-sm uppercase tracking-wide text-institutional-charcoal/60 mb-2">Mechanism</h4>
                            <p className="text-lg text-institutional-charcoal/90 leading-relaxed font-sans">
                                Captures temporary relative-value dislocations driven by liquidity stress in G10 FX.
                            </p>
                        </div>

                        <div className="bg-institutional-charcoal/5 p-6 border border-institutional-charcoal/5">
                            <h4 className="font-mono text-xs uppercase tracking-wide text-institutional-charcoal/50 mb-3">Tech Spec</h4>
                            <p className="font-mono text-sm text-institutional-charcoal/80">
                                &gt; Reserve-Commodity portfolio geometry (Reserve vs Commodity-linked) to prevent drift.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}
