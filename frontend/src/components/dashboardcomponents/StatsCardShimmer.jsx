import React from 'react'

const StatsCardShimmer = () => {
  return (
    <div className="bg-[#1A102C] rounded-xl border border-[#6a4dff]/20 p-6 shadow-sm animate-pulse">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      </div>
      {/* Value */}
      <div className="h-8 w-24 bg-gray-300 rounded mt-5" />
    </div>
  )
}

export default StatsCardShimmer