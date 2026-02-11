import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";

export function InvestmentFramework() {
    return (
        <Section className="bg-institutional-white border-b border-institutional-charcoal/10 pb-32">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-institutional-charcoal mb-4">
                    Investment Framework
                </h2>
            </div>

            <Grid cols={3} className="divide-y md:divide-y-0 md:divide-x divide-institutional-charcoal/10">
                {/* Col 1: The Fund */}
                <div className="pt-8 md:pt-0 md:pr-8">
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-6">
                        The Fund (Commingled)
                    </h3>
                    <ul className="space-y-4 text-sm text-institutional-charcoal/80">
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>Dutch Closed-End AIF B.V.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>AFM AIFMD Light Regime (Reg. no. 50027774)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>Min Investment: <span className="font-mono font-bold">USD 500,000</span></span>
                        </li>
                    </ul>
                </div>

                {/* Col 2: Managed Accounts */}
                <div className="pt-8 md:pt-0 md:px-8">
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-6">
                        Managed Accounts
                    </h3>
                    <div className="space-y-4 text-sm text-institutional-charcoal/80 leading-relaxed">
                        <p>
                            Available upon request for professional investors requiring specific mandates.
                        </p>
                        <div className="bg-institutional-charcoal/5 p-4 border-l-2 border-institutional-charcoal/20">
                            <p>Tailored currency universes and volatility risk caps available.</p>
                        </div>
                    </div>
                </div>

                {/* Col 3: Service Partners */}
                <div className="pt-8 md:pt-0 md:pl-8">
                    <h3 className="font-serif text-xl font-bold text-institutional-charcoal mb-6">
                        Service Partners
                    </h3>
                    <ul className="space-y-4 text-sm text-institutional-charcoal/80">
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">Admin</span>
                            <span className="font-bold">Bolder Fund Services B.V.</span>
                        </li>
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">Depositary</span>
                            <span className="font-bold">Citibank Europe plc</span>
                        </li>
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">Counsel</span>
                            <span className="font-bold">Fennek Advocaten</span>
                        </li>
                    </ul>
                </div>
            </Grid>
        </Section>
    );
}
