import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 bg-[#07050d]">
      <div className="max-w-7xl mx-auto px-6">
        {/* heading */}
        <div className="text-center mb-20">
          <p className="text-[#8f8aa3] uppercase tracking-widest text-sm mb-4">
            Features
          </p>
          <h2 className="text-4xl text-[#6a2cff] md:text-5xl font-semibold mb-6">
            Everything you need to monitor APIs
          </h2>
          <p className="text-[#9d98b2] max-w-2xl mx-auto text-lg">
            Observix provides powerful tools to monitor uptime, analyze latency,
            detect failures and maintain reliable infrastructure.
          </p>
        </div>
        {/* highlight features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* feature 1 */}
          <div className="bg-[#0f0b18] border border-[#ffffff10] rounded-2xl p-10">
            <h3 className="text-2xl text-[#6a2cff] font-semibold mb-4">
              Real-time API monitoring
            </h3>
            <p className="text-[#9d98b2] mb-6">
              Continuously monitor your API endpoints and detect downtime
              instantly with Observix global monitoring network.
            </p>
            <div className="bg-[#161022] p-6 rounded-xl text-sm text-[#8f8aa3]">
              Auth API — 99.99% uptime  
              <br />
              Payments API — 120ms latency
            </div>
          </div>
          {/* feature 2 */}
          <div className="bg-[#0f0b18] border border-[#ffffff10] rounded-2xl p-10">
            <h3 className="text-2xl text-[#6a2cff] font-semibold mb-4">
              Instant incident alerts
            </h3>
            <p className="text-[#9d98b2] mb-6">
              Get notified immediately when your services experience downtime
              via Slack, Email or Discord integrations.
            </p>
            <div className="bg-[#161022] p-6 rounded-xl text-sm text-[#8f8aa3]">
              Alert triggered: Auth API down  
              <br />
              Region: Frankfurt (EU)
            </div>
          </div>
        </div>
        {/* feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <h4 className="font-semibold text-[#6a2cff] mb-2">
              Global uptime checks
            </h4>
            <p className="text-[#8f8aa3] text-sm">
              Run monitoring checks from multiple global regions to ensure
              accurate uptime detection.
            </p>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <h4 className="font-semibold text-[#6a2cff] mb-2">
              Latency analytics
            </h4>
            <p className="text-[#8f8aa3] text-sm">
              Measure response times and analyze API performance trends
              across regions.
            </p>
          </div>
          <div className="bg-[#0f0b18] border border-[#ffffff10] p-8 rounded-xl">
            <h4 className="font-semibold text-[#6a2cff] mb-2">
              Status pages
            </h4>
            <p className="text-[#8f8aa3] text-sm">
              Create public status pages to communicate incidents and
              maintain transparency with users.
            </p>
          </div>
          <div className="bg-[#0f0b18] text-[#6a2cff] border border-[#ffffff10] p-8 rounded-xl">
            <h4 className="font-semibold mb-2">
              Incident history
            </h4>
            <p className="text-[#8f8aa3] text-sm">
              Track outages, downtime and response time history
              with detailed analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;