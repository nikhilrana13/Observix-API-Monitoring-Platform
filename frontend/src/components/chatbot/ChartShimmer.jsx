import React from "react";

const ChartShimmer = () => {
  return (
    <div className="bg-[#1A102C] rounded-2xl p-4 sm:p-6 border border-[#6a4dff]/20 w-full animate-pulse">
      
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="h-4 w-40 bg-[#2a1f4a] rounded-md"></div>
        <div className="h-3 w-56 bg-[#2a1f4a]/70 rounded-md"></div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] relative overflow-hidden">
        
        {/* fake grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-px bg-[#2a1f4a] w-full"></div>
          ))}
        </div>

        {/* fake chart wave */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#6a4dff]/20 to-transparent rounded-lg"></div>

        {/* animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
};

export default ChartShimmer;