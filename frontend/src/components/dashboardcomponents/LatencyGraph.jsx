import { useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
    ReferenceLine,
} from "recharts";

const LatencyGraph = ({ latencyData }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
    // hide x-axis time on  small screen
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 640);
            };
    
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    return (
        <div className="bg-[#1A102C] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-4 sm:p-6 border border-[#6a4dff]/20 w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                        Response Time (Latency)
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Average API response time
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[220px] sm:h-[280px] md:h-[320px]">
                {latencyData?.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No latency data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={latencyData}>

                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="rgba(255,255,255,0.05)"
                            />
                        
                            <XAxis
                               hide={isMobile}
                                dataKey="hour"
                                tickFormatter={(h) => `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                interval={2}
                            />

                            <YAxis
                                tickFormatter={(v) => `${Math.round(v)} ms`}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1A102C",
                                    border: "1px solid rgba(106,77,255,0.2)",
                                    borderRadius: "10px",
                                    color: "#fff",
                                }}
                                formatter={(value) => [
                                    `${Math.round(value)} ms`,
                                    value > 300 ? "High Latency" : "Latency"
                                ]}
                                labelFormatter={(label) => `${label}:00`}
                            />
                             <ReferenceLine
                                y={300}
                                stroke="#EF4444"
                                strokeDasharray="4 4"
                                label={{
                                    value: "300ms threshold",
                                    position: "right",
                                    fill: "#EF4444",
                                    fontSize: 12,
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="avgLatency"
                                stroke="#10B981"
                                strokeWidth={3}
                                fill="url(#colorLatency)"
                                fillOpacity={0.3}
                                style={{
                                    filter: "drop-shadow(0 0 8px rgba(16,185,129,0.5))",
                                }}
                                dot={({ cx, cy, payload }) => {
                                    if (payload.avgLatency > 300) {
                                        return (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={5}
                                                fill="#EF4444"
                                                stroke="#fff"
                                                strokeWidth={2}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default LatencyGraph;