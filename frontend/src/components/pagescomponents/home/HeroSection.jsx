import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
     <section className="relative overflow-hidden bg-[#07050d] text-white">
      {/* background gradients */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#6a2cff]/30 blur-[180px]"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/20 blur-[160px]"></div>
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6  py-24  relative">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6a2cff]/10 border border-[#6a2cff]/20 text-sm text-[#c6b6ff]">
            <span></span>
            <span>Next-Gen API Monitoring Platform</span>
          </div>
        </div>
        {/* headline */}
        <h1 className="text-center text-[2rem] md:text-6xl lg:text-7xl  font-semibold leading-tight max-w-5xl mx-auto">
          Infrastructure monitoring  
          <span className="bg-gradient-to-r from-[#9f7fff] to-[#6a2cff] bg-clip-text text-transparent">
            {" "}built for modern APIs
          </span>
        </h1>
        {/* description */}
        <p className="text-center text-[#b5b0c3] text-lg max-w-2xl mx-auto mt-8">
          Observix continuously monitors your APIs, endpoints and services with
          real-time uptime checks, latency analytics and instant alerts — so
          outages never reach your users.
        </p>
        {/* CTA */}
        <div className="flex justify-center gap-4 mt-12 flex-wrap">
          <button className="px-8 py-3 rounded-lg bg-[#6a2cff] hover:bg-[#7b3dff] transition font-semibold shadow-lg shadow-[#6a2cff]/40">
            Start Monitoring
          </button>
          <Link to="/login" className="px-8 py-3 rounded-lg border border-[#6a2cff]/30 hover:border-[#6a2cff] text-[#c8c4d6] hover:text-white transition">
            Get Started
          </Link>
        </div>
        {/* trusted metrics */}
        <div className="flex justify-center gap-12 mt-16 text-sm text-[#a29db3] flex-wrap">
          <div className="text-center">
            <p className="text-white text-xl font-semibold">99.99%</p>
            <p>Uptime Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-semibold">60+ Regions</p>
            <p>Global Checks</p>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-semibold">1s Alerts</p>
            <p>Instant Detection</p>
          </div>
        </div>
        {/* dashboard preview */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 blur-[80px] bg-[#6a2cff]/20"></div>
          <div className="relative bg-[#0f0b18] border border-[#6a2cff]/20 rounded-2xl shadow-2xl p-6">
            {/* dashboard header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                Observix Monitoring Dashboard
              </h3>
              <span className="text-green-400 text-sm">
                ● All systems operational
              </span>
            </div>
            {/* api status cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#161022] border border-[#6a2cff]/10 p-4 rounded-lg">
                <p className="text-sm text-[#a29db3]">Auth API</p>
                <p className="text-green-400 text-sm mt-2">
                  99.99% uptime
                </p>
              </div>
              <div className="bg-[#161022] border border-[#6a2cff]/10 p-4 rounded-lg">
                <p className="text-sm text-[#a29db3]">Payments API</p>
                <p className="text-green-400 text-sm mt-2">
                  99.98% uptime
                </p>
              </div>
              <div className="bg-[#161022] border border-[#6a2cff]/10 p-4 rounded-lg">
                <p className="text-sm text-[#a29db3]">Notifications API</p>
                <p className="text-yellow-400 text-sm mt-2">
                  120ms latency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;