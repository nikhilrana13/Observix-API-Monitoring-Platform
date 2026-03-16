import React from "react";

const MonitoringSection = () => {
  return (
    <section className="relative py-32 bg-[#07050d] overflow-hidden">
      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#6a2cff]/20 blur-[160px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <p className="text-[#8f8aa3] uppercase tracking-widest text-sm mb-4">
            Real-time monitoring
          </p>
          <h2 className="text-4xl md:text-5xl text-[#6a2cff] font-semibold mb-6">
            Monitor every API request in real time
          </h2>
          <p className="text-[#9d98b2] text-lg mb-8 max-w-xl">
            Observix tracks uptime, response times and API failures from global
            regions. Detect incidents instantly and keep your infrastructure
            reliable.
          </p>
          <ul className="space-y-4 text-[#c8c4d6]">
            <li className="flex items-center gap-3">
              <span className="text-green-400">●</span>
              Global uptime checks every 30 seconds
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">●</span>
              Real-time latency tracking
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">●</span>
              Instant alerts for downtime incidents
            </li>
          </ul>
        </div>
        {/* right */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#6a2cff]/10 blur-3xl"></div>
          <div className="relative bg-[#0f0b18] border border-[#ffffff10] rounded-2xl p-6">
            {/* header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-white">
                Live API Monitoring
              </h3>
              <span className="text-green-400 text-sm">
                ● All systems operational
              </span>
            </div>
            {/* API cards */}
            <div className="space-y-4 text-white">
              <div className="flex justify-between items-center bg-[#161022] p-4 rounded-lg">
                <span className="text-sm">Auth API</span>
                <span className="text-green-400 text-sm">
                  99.99%
                </span>
              </div>
              <div className="flex justify-between items-center bg-[#161022] p-4 rounded-lg">
                <span className="text-sm">Payments API</span>
                <span className="text-green-400 text-sm">
                  99.98%
                </span>
              </div>
              <div className="flex justify-between items-center bg-[#161022] p-4 rounded-lg">
                <span className="text-sm">Notifications API</span>
                <span className="text-yellow-400 text-sm">
                  120ms
                </span>
              </div>
            </div>
            {/* fake latency chart */}
            <div className="mt-8">
              <div className="h-24 bg-[#161022] rounded-lg flex items-end gap-1 p-3">
                <div className="bg-green-400 w-2 h-8 rounded"></div>
                <div className="bg-green-400 w-2 h-10 rounded"></div>
                <div className="bg-green-400 w-2 h-6 rounded"></div>
                <div className="bg-green-400 w-2 h-14 rounded"></div>
                <div className="bg-green-400 w-2 h-9 rounded"></div>
                <div className="bg-green-400 w-2 h-12 rounded"></div>
                <div className="bg-green-400 w-2 h-7 rounded"></div>
                <div className="bg-green-400 w-2 h-11 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;