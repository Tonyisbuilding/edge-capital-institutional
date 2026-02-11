import { Section } from "@/components/ui/Section";

export function Philosophy() {
    return (
        <Section className="border-b border-institutional-charcoal/10 bg-institutional-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                {/* Text Content */}
                <div className="md:col-span-5 space-y-8 sticky top-24">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-institutional-charcoal">
                        Stress as an <br />
                        Operational State
                    </h2>
                    <div className="space-y-6 text-lg font-sans text-institutional-charcoal/80 leading-relaxed">
                        <p>
                            We do not rely on narratives, discretionary forecasting, or
                            single-scenario positioning.
                        </p>
                        <p>
                            We define stress not as fear, but as an operational state: risk
                            premia reprice, implied vol and skew reset, and correlations
                            destabilize.
                        </p>
                    </div>
                </div>

                {/* Technical Diagram */}
                <div className="md:col-span-7 bg-institutional-white border border-institutional-charcoal/10 p-8 md:p-12">
                    <div className="aspect-[4/3] w-full relative flex items-center justify-center">
                        {/* Blueprint Style SVG */}
                        <svg viewBox="0 0 800 600" className="w-full h-full text-institutional-charcoal" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {/* Grid Background */}
                            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-institutional-charcoal/5" />
                            </pattern>
                            <rect width="800" height="600" fill="url(#grid)" />

                            {/* The Loop Path */}
                            <path
                                d="M 400 100 
                   L 650 300 
                   L 400 500 
                   L 150 300 
                   Z"
                                className="text-institutional-charcoal"
                                strokeWidth="2"
                            />

                            {/* Nodes */}
                            <g transform="translate(400, 100)">
                                <circle r="6" fill="currentColor" />
                                <text y="-20" textAnchor="middle" className="font-mono text-xs uppercase tracking-widest font-bold">1. Measure</text>
                            </g>
                            <g transform="translate(650, 300)">
                                <circle r="6" fill="currentColor" />
                                <text x="20" y="5" className="font-mono text-xs uppercase tracking-widest font-bold">2. Classify</text>
                            </g>
                            <g transform="translate(400, 500)">
                                <circle r="6" fill="currentColor" />
                                <text y="30" textAnchor="middle" className="font-mono text-xs uppercase tracking-widest font-bold">3. Allocate</text>
                            </g>
                            <g transform="translate(150, 300)">
                                <circle r="6" fill="currentColor" />
                                <text x="-20" y="5" textAnchor="end" className="font-mono text-xs uppercase tracking-widest font-bold">4. Stand Down</text>
                            </g>

                            {/* Connecting Arrows */}
                            <path d="M 420 116 L 620 276" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                            <path d="M 630 316 L 430 476" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                            <path d="M 370 476 L 170 316" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                            <path d="M 180 276 L 380 116" strokeDasharray="4 4" markerEnd="url(#arrow)" />

                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                                </marker>
                            </defs>
                        </svg>

                        <div className="absolute bottom-4 right-4 text-xs font-mono text-institutional-charcoal/50 border border-institutional-charcoal/20 px-2 py-1 bg-white">
                            FIG 1.0: THE OPERATIONAL LOOP
                        </div>
                    </div>
                    <p className="mt-8 text-sm font-mono text-institutional-charcoal/60 text-center uppercase tracking-wide">
                        Separating tradable stress from structural deterioration
                    </p>
                </div>
            </div>
        </Section>
    );
}
