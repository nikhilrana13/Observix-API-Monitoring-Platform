import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

const RequestsGraph = ({ requests }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
   
    // hide x-axis time on  small screen
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="bg-[#1A102C]  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-4 sm:p-6 border border-[#6a4dff]/20  w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                        Requests Over Time
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Real-time traffic throughput
                    </p>
                </div>
            </div>
            {/* Chart Container */}
            <div className="w-full h-[220px] sm:h-[280px] md:h-[320px]">
                {
                    requests?.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            No requests data available
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={requests} isAnimationActive={true} animationDuration={800}>
                                <defs>
                                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6a4dff" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6a4dff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" horizontal={true} />
                                <XAxis
                                    dataKey="hour"
                                    hide={isMobile}
                                    tickFormatter={(h) => `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={2}
                                />
                                <YAxis
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
                                    labelStyle={{ color: "#aaa" }}
                                    formatter={(value) => [`${value} req`, "Requests"]}
                                    labelFormatter={(label) => `${label}:00`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="requests"
                                    stroke="#6a4dff"
                                    strokeWidth={3}
                                    fillOpacity={0.3}
                                    fill="url(#colorReq)"
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(106,77,255,0.5))"
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )
                }
            </div>
        </div>
    );
}

export default RequestsGraph;
