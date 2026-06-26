import React from "react";

const ErrorDistributionShimmer = () => {
  return (
    <div className="w-full md:w-[40%] bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 animate-pulse">
      {/* Header */}
      <div className="mb-5 space-y-2">
        <div className="h-4 w-40 bg-[#2a1f4a] rounded-md"></div>
        <div className="h-3 w-32 bg-[#2a1f4a]/70 rounded-md"></div>
      </div>
      {/* Fake rows */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a1f4a]" />
                <div className="h-3 w-24 bg-[#2a1f4a] rounded-md"></div>
              </div>

              <div className="h-3 w-10 bg-[#2a1f4a] rounded-md"></div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#2a1f4a]/50 rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-[#6a4dff]/20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorDistributionShimmer;