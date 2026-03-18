import React from 'react'
const StatsCard = ({ statsdata}) => {

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsdata.map(({ title, value,icon: Icon, gradient,textColor}) => (
        <div
          key={title}
          className="relative group rounded-2xl bg-[#1A102C]  p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#6a4dff]/20 overflow-hidden"
        >
          {/* Gradient Glow */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 ${gradient}`}
          />
          <div className="relative flex justify-between items-start">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 font-medium">
                {title}
              </p>
              <h2 className="text-2xl font-semibold text-white">
                {value}
              </h2>
            </div>
            {/* Icon */}
            <div
              className={`p-3 rounded-xl ${gradient} ${textColor} shadow-md`}
            >
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCard