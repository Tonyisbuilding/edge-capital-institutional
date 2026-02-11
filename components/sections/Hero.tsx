import { Button } from "@/components/ui/Button";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Landmark, CloudDownload } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full bg-[#05090A] overflow-hidden flex flex-col justify-center">
            {/* Background Grid */}
            <InteractiveGrid className="opacity-40" />

            <div className="relative z-10 w-full max-w-[1700px] mx-auto pt-32 pb-16 md:pt-40 md:pb-24 px-[clamp(10px,3vw,48px)]">
                {/* Headline Area */}
                <div className="flex flex-col justify-center">
                    <h1 className="font-mono text-white leading-[1.1] tracking-tight font-bold">
                        {/* Line 1: "The" + "Stress-Regime" */}
                        <div className="flex flex-col md:flex-row items-start md:items-center" style={{ gap: '0.4rem' }}>
                            <span
                                className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                style={{ backgroundColor: '#091114' }}
                            >
                                The
                            </span>
                            <span
                                className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                style={{ backgroundColor: '#091114' }}
                            >
                                Stress-Regime
                            </span>
                        </div>
                        {/* Line 2: "Alpha Platform" */}
                        <div className="flex" style={{ gap: '0.4rem', marginTop: '0.4rem' }}>
                            <span
                                className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                style={{ backgroundColor: '#091114' }}
                            >
                                Alpha Platform
                            </span>
                        </div>
                    </h1>
                </div>

                {/* Sub-header + Button group — flush right on mobile, offset right on desktop */}
                <div
                    className="flex flex-col items-stretch md:ml-[50%] md:max-w-[700px] md:min-w-[600px]"
                    style={{ gap: '0.4rem', marginTop: '0.5rem', marginRight: 'calc(-1 * clamp(10px, 3vw, 48px))' }}
                >
                    {/* Sub-header container */}
                    <div
                        className="p-[clamp(16px,3vw,24px)]"
                        style={{ backgroundColor: '#091114' }}
                    >
                        {/* Card Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <Landmark className="w-5 h-5 text-institutional-slate" />
                            <span className="text-institutional-slate font-mono text-sm tracking-wide">
                                Real institutional platform
                            </span>
                        </div>

                        {/* Card Content */}
                        <p className="text-institutional-slate/80 leading-relaxed font-sans text-[clamp(0.875rem,2vw,1.5rem)]">
                            We monetize the measurable mechanisms of market stress—volatility repricing, dispersion, and correlation stress—across highly liquid G10 FX and exchange-traded equity index derivatives (SPX/ES options &amp; futures), built for unstable and unpredictable regimes and designed to deliver a liquid return stream that is less dependent on equity/interest rate beta than traditional portfolios.
                        </p>
                    </div>

                    {/* Button container */}
                    <div
                        className="px-[clamp(16px,3vw,24px)] py-4"
                        style={{ backgroundColor: '#091114' }}
                    >
                        <Button
                            className="bg-white text-black hover:bg-white/90 font-mono text-sm h-12 px-6 flex items-center gap-2"
                        >
                            <CloudDownload className="w-4 h-4" />
                            Main call to action
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
