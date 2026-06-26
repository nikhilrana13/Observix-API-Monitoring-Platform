import React from "react";

const TopEndpointsCard = ({ endpoints = [] }) => {
  
  return (
    <div className="w-full md:w-[60%] bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-500">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-white text-lg font-semibold">
          Top Performing Endpoints
        </h2>
        <p className="text-xs text-gray-400">
          Highest traffic APIs
        </p>
      </div>
      {/* List */}
      <div className="flex flex-col gap-5">
        {
         endpoints?.length === 0 ? (
             <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Top performing end points available
            </div>
         ):(
          endpoints?.map((item, i) => {
            const maxRequests = Math.max(...endpoints?.map(e => e?.totalRequests || 0), 1);
          const percentage = (item?.totalRequests / maxRequests) * 100;
          return (
            <div key={i} className="flex flex-col gap-2">
              {/* Top Row */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                {/* Endpoint */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-[#23104A] text-[#a78bfa] text-[10px] font-semibold uppercase">
                    {item?.endpoint.split("/")[2]?.toUpperCase() || "API"}
                  </span>

                  <span className="text-gray-300 truncate max-w-[140px] sm:max-w-[220px]">
                    {item?.endpoint}
                  </span>
                </div>

                {/* Requests */}
                <span className="text-gray-400 text-xs sm:text-sm">
                  {item?.totalRequests} req
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-[#23104A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {/* Extra Info */}
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>
                  Latency: {Math.round(item?.avgLatency)} ms
                </span>
                <span className={item?.errorCount > 0 ? "text-red-400" : "text-green-400"}>
                  Errors: {item?.errorCount}
                </span>
              </div>
            </div>
          )})
        )}

      </div>
    </div>
  );
};

export default TopEndpointsCard;