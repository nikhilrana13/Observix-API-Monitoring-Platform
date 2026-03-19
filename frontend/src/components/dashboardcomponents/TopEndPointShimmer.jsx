import React from "react";

const TopEndpointsShimmer = () => {
  return (
    <div className="w-full md:w-[60%] bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 overflow-hidden relative">
      {/* shimmer animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      {/* Header */}
      <div className="mb-5 space-y-2">
        <div className="h-5 w-48 bg-[#23104A] rounded-md" />
        <div className="h-3 w-32 bg-[#23104A] rounded-md" />
      </div>
      {/* List */}
      <div className="flex flex-col gap-5">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* top row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-5 w-12 bg-[#23104A] rounded-md" />
                <div className="h-4 w-32 bg-[#23104A] rounded-md" />
              </div>
              <div className="h-4 w-14 bg-[#23104A] rounded-md" />
            </div>
            {/* progress bar */}
            <div className="w-full h-3 bg-[#23104A] rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-[#2d1b5a] rounded-full" />
            </div>
            {/* bottom info */}
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-[#23104A] rounded-md" />
              <div className="h-3 w-16 bg-[#23104A] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEndpointsShimmer;