import React from "react";

const ErrorDistributionCard = ({ errors = [] }) => {
  return (
    <div className="w-full md:w-[40%] bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-500">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-white text-lg font-semibold">
          Error Distribution
        </h2>
        <p className="text-xs text-gray-400">
          Breakdown of API errors
        </p>
      </div>
      {/* Empty State */}
      {errors.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-10">
          No errors recorded
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {errors?.map((err, i) => {
            const colors = [
              "#EF4444", // red
              "#F59E0B", // yellow
              "#8B5CF6", // purple
              "#06B6D4", // cyan
            ];
            const color = colors[i % colors.length];
            return (
              <div key={err.statusCode} className="space-y-2">
                {/* Top Row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-white font-medium">
                      {err.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({err.statusCode})
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-white">
                    {err.percentage.toFixed(1)}%
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#2a1f4a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${err.percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ErrorDistributionCard;