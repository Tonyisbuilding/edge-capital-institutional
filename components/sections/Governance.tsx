import { Section } from "@/components/ui/Section";
import { Handshake, Settings, List } from "lucide-react";

export function Governance() {
    return (
        <Section className="bg-[#F6FEFF] pb-32 -mt-[10px] rounded-t-[20px] relative z-10">
            <div className="max-w-7xl mx-auto px-[10px] md:px-8">
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-institutional-charcoal mb-6">
                        Institutional Access & Infrastructure
                    </h2>
                    <p className="text-lg text-institutional-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                        We offer bespoke structures for sophisticated investors. Choose between direct
                        fund participation or custom technical implementation, all governed by a fee
                        structure aligned with your success.
                    </p>
                </div>

                {/* Using flex layout instead of grid to avoid strict rows if user disliked "grids" */}
                {/* But for equal height cards, grid is actually best. If user meant VISUAL grid lines, I removed those. */}
                {/* If user meant strictly "no CSS grid", I can use flex. */}
                {/* "section shouldn't have the grids" might mean the boxes shouldn't look like a grid? */}
                {/* Or perhaps "grid lines"? I removed lines. */}
                {/* I will use flex-wrap here to fulfill "remove grids" while keeping layout. */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
                    {/* Card 1: Direct Fund Participation */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<Handshake className="w-6 h-6 text-white" />}
                            title="Direct Fund Participation"
                            desc="Designed for Fund-of-Funds and institutional allocators seeking immediate access to our market-neutral strategy."
                            details={[
                                { label: "Minimum Entry:", value: "€500,000" },
                                { label: "Management. Fee:", value: "1% per annum" },
                                { label: "Performance Fee:", value: "12.5% (High Watermark)" },
                            ]}
                        />
                    </div>

                    {/* Card 2: API & SaaS Solutions */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<Settings className="w-6 h-6 text-white" />}
                            title="API & SaaS Solutions"
                            desc="For partners requiring custom integration, we offer a white-label SaaS agreement to run our strategies within your environment."
                            details={[
                                { label: "Integration:", value: "Full API Access" },
                                { label: "Structure:", value: "SaaS Agreement" },
                                { label: "Pricing:", value: "Customized based on volume" },
                            ]}
                        />
                    </div>

                    {/* Card 3: Aligned Fee Structure */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<List className="w-6 h-6 text-white" />}
                            title="Aligned Fee Structure"
                            desc="We prioritize performance over AUM accumulation. Our tiered fee model ensures our interests remain strictly aligned with yours."
                            details={[
                                { label: "Philosophy:", value: "Success-based revenue" },
                                { label: "Safety:", value: "High Watermark Protection" },
                                { label: "Benefit:", value: "Reduced fees for larger allocations" },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Card({ icon, title, desc, details }: any) {
    return (
        <div
            className="rounded-xl p-8 flex flex-col relative overflow-hidden h-full group"
            style={{ backgroundColor: "#206A7C" }}
        >
            {/* Grain overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: "url(/grains.svg)",
                    backgroundRepeat: "repeat",
                    opacity: 0.15,
                }}
            />

            <div className="relative z-[2] h-full flex flex-col">
                <div className="mb-6">
                    {icon}
                </div>

                {/* Flexible spacer that pushes text to bottom, ensuring at least 100px gap */}
                <div className="flex-grow min-h-[100px]" />

                {/* Grouped text content at the bottom */}
                <div className="flex flex-col">
                    <h3 className="font-mono text-xl font-bold text-white mb-2 leading-tight">
                        {title}
                    </h3>

                    <p className="text-sm text-white/80 leading-relaxed mb-5 pb-5 border-b border-white/20">
                        {desc}
                    </p>

                    <div className="space-y-2">
                        {details.map((d: any, i: number) => (
                            <div key={i} className="flex justify-between items-baseline text-xs md:text-sm font-mono">
                                <span className="text-white font-bold">{d.label}</span>
                                <span className="text-white/70 text-right ml-4">{d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
