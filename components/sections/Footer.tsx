import { Button } from "@/components/ui/Button";

export function Footer() {
    return (
        <footer className="bg-institutional-white border-t border-institutional-charcoal/10 pt-16 pb-8">
            <div className="max-w-[1700px] mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="space-y-6 max-w-sm">
                        <span className="text-xl font-bold font-mono tracking-tight text-institutional-charcoal">
                            Edge Capital
                        </span>
                        <div className="text-sm text-institutional-charcoal/70 space-y-1">
                            <p>Edge Capital Management B.V.</p>
                            <p>Walserij 15-1, 2211 SJ Noordwijkerhout</p>
                            <p>The Netherlands</p>
                        </div>
                        <div className="pt-2">
                            <a href="mailto:Aron@edge-capital.nl" className="text-sm font-medium text-institutional-teal hover:underline underline-offset-4">
                                Contact: Aron@edge-capital.nl
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button size="lg" className="w-full md:w-auto">
                            Request DDQ / ODD Pack
                        </Button>
                    </div>
                </div>

                <div className="border-t border-institutional-charcoal/10 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px] md:text-xs text-institutional-charcoal/40 font-mono leading-relaxed">
                        <p>
                            Past results are no guarantee of future returns. Investments linked to the Volatility Premium Risk strategy can both rise and fall. You may lose your entire investment.
                        </p>
                        <p className="md:text-right">
                            This factsheet does not constitute investment advice. Targeted for professional investors only.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
