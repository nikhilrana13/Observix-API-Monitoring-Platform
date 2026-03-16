import React from "react";

const TrustedSection = () => {
  return (
    <section className="relative py-32 bg-[#07050d] overflow-hidden">
      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6a2cff]/20 blur-[160px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* heading */}
        <div className="text-center mb-16">
          <p className="text-[#8f8aa3] text-sm uppercase tracking-widest mb-4">
            Trusted by developers worldwide
          </p>
          <h2 className="text-3xl md:text-4xl text-[#6a2cff] font-semibold">
            Infrastructure monitoring for modern teams
          </h2>
        </div>
        {/* logo marquee */}
        <div className="relative overflow-hidden mb-20">
          <div className="flex gap-16 whitespace-nowrap animate-[scroll_25s_linear_infinite] text-[#7f7a92] text-lg">
            <span>Stripe</span>
            <span>Vercel</span>
            <span>Shopify</span>
            <span>Supabase</span>
            <span>Hashnode</span>
            <span>PlanetScale</span>
            <span>Cloudflare</span>
            <span>Neon</span>
            {/* duplicate for infinite loop */}
            <span>Stripe</span>
            <span>Vercel</span>
            <span>Shopify</span>
            <span>Supabase</span>
            <span>Hashnode</span>
            <span>PlanetScale</span>
            <span>Cloudflare</span>
            <span>Neon</span>
          </div>
        </div>
        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          <div className="bg-[#0f0b18] border border-[#ffffff10] rounded-xl p-8 text-center">
            <p className="text-4xl font-semibold text-white">
              12k+
            </p>
            <p className="text-[#9d98b2] mt-2">
              Developers monitoring APIs
            </p>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] rounded-xl p-8 text-center">
            <p className="text-4xl font-semibold text-white">
              70+
            </p>
            <p className="text-[#9d98b2] mt-2">
              Global monitoring regions
            </p>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] rounded-xl p-8 text-center">
            <p className="text-4xl font-semibold text-white">
              99.99%
            </p>
            <p className="text-[#9d98b2] mt-2">
              Average uptime tracked
            </p>
          </div>
        </div>
        {/* testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <p className="text-[#c8c4d6] mb-6">
              “Observix helped us detect API failures before our users even noticed.
              The alerts are insanely fast.”
            </p>
            <div className="text-sm text-[#8e8aa3]">
              Arjun Patel — Backend Engineer
            </div>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <p className="text-[#c8c4d6] mb-6">
              “We replaced 3 monitoring tools with Observix.
              The dashboard is incredibly clean.”
            </p>
            <div className="text-sm text-[#8e8aa3]">
              Daniel Kim — CTO
            </div>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <p className="text-[#c8c4d6] mb-6">
              “Real-time latency tracking from global regions
              makes Observix a must-have tool.”
            </p>
            <div className="text-sm text-[#8e8aa3]">
              Sarah Chen — DevOps Lead
            </div>
          </div>
        </div>
      </div>
      {/* marquee animation */}
      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default TrustedSection;