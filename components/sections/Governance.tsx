import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";

export function Governance() {
    return (
        <Section className="bg-institutional-white border-b border-institutional-charcoal/10">
            <div className="mb-12 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-institutional-charcoal mb-4">
                    Governance & Risk
                </h2>
                <p className="text-lg text-institutional-charcoal/70">
                    Institutional-grade protocols to ensure style fidelity and operational
                    safety.
                </p>
            </div>

            <Grid cols={3}>
                {/* Card 1 */}
                <div className="bg-institutional-charcoal/5 p-8 border border-institutional-charcoal/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-institutional-charcoal/20 group-hover:text-institutional-charcoal/40 transition-colors">
                        <svg
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={1}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-4 pr-12">
                        Deterioration Protocols
                    </h3>
                    <p className="text-sm leading-relaxed text-institutional-charcoal/80">
                        Explicit protocols prevent &quot;volatility risk&quot; from leaking into
                        the portfolio. When market structure weakens, the response is
                        pre-defined: reduce exposure, freeze new risk, and unwind.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-institutional-charcoal/5 p-8 border border-institutional-charcoal/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-institutional-charcoal/20 group-hover:text-institutional-charcoal/40 transition-colors">
                        <svg
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-4 pr-12">
                        Liquidity-First Eligibility
                    </h3>
                    <p className="text-sm leading-relaxed text-institutional-charcoal/80">
                        Strict eligibility gates ensure we only deploy capital when
                        conditions remain tradable. We avoid illiquid traps by mandated
                        screening of open interest and spread width.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-institutional-charcoal/5 p-8 border border-institutional-charcoal/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-institutional-charcoal/20 group-hover:text-institutional-charcoal/40 transition-colors">
                        <svg
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-4 pr-12">
                        Separation of Drivers
                    </h3>
                    <p className="text-sm leading-relaxed text-institutional-charcoal/80">
                        Engines are separated at the return-driver level to avoid reliance
                        on a single mechanism. Correlation alpha is distinct from Volatility
                        Premium extraction.
                    </p>
                </div>
            </Grid>
        </Section>
    );
}
