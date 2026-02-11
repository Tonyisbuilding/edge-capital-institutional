"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea,
} from "recharts";

const data = [
    { year: "2019", edge: 100, msci: 100 },
    { year: "2020-Q1", edge: 133, msci: 80, event: "Covid Crash" },
    { year: "2020", edge: 135, msci: 110 },
    { year: "2021", edge: 173, msci: 135 },
    { year: "2022-Q2", edge: 210, msci: 115, event: "Rate Shock" },
    { year: "2022", edge: 215, msci: 118 },
    { year: "2023", edge: 260, msci: 145 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-institutional-charcoal border border-institutional-charcoal text-institutional-white p-3 text-xs font-mono shadow-xl relative z-50">
                <p className="mb-2 font-bold opacity-70 border-b border-white/20 pb-1">{label}</p>
                <div className="space-y-1">
                    <p className="flex justify-between gap-4">
                        <span style={{ color: "#0d9488" }}>Edge Capital:</span>
                        <span className="font-bold">{payload[0].value.toFixed(1)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                        <span className="opacity-70">MSCI World:</span>
                        <span className="font-bold opacity-70">{payload[1].value.toFixed(1)}</span>
                    </p>
                </div>
                {payload[0].payload.event && (
                    <div className="mt-2 pt-1 border-t border-white/20 text-institutional-red font-bold uppercase tracking-wider">
                        ! {payload[0].payload.event}
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export function PerformanceChart() {
    return (
        <div className="w-full h-[400px] font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    className="cursor-crosshair-custom"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.3} />
                    <XAxis
                        dataKey="year"
                        stroke="#666"
                        tick={{ fill: '#666' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        tick={{ fill: '#666' }}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8B0000', strokeWidth: 1, strokeDasharray: '4 4' }} />

                    {/* Covid Crash Highlight */}
                    <ReferenceArea x1="2019" x2="2020-Q1" strokeOpacity={0} fill="#8B0000" fillOpacity={0.1} />

                    {/* Rate Shock Highlight */}
                    <ReferenceArea x1="2021" x2="2022-Q2" strokeOpacity={0} fill="#8B0000" fillOpacity={0.1} />

                    <Line
                        type="stepAfter"
                        dataKey="edge"
                        stroke="#0d9488"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#0d9488', stroke: '#0B0F19', strokeWidth: 2 }}
                        name="Edge Capital"
                    />
                    <Line
                        type="monotone"
                        dataKey="msci"
                        stroke="#64748b"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        dot={false}
                        name="MSCI World"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
