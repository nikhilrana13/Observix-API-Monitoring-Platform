import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#1C1635] hover:bg-[#5B13EC] transition text-gray-300 hover:text-white"
    >
      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const Docs = () => {
  const installCode = `npm install axios`;

  const middlewareCode = `import axios from "axios";

const OBSERVIX_API_URL = "https://api.observix.com/api/monitor";

export const observixMiddleware = (apiKey) => {
  return (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", async () => {
      const responseTime = Date.now() - startTime;

      const logData = {
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        responseTime,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        timestamp: new Date(),
      };

      try {
        await axios.post(OBSERVIX_API_URL, logData);
      } catch (err) {
        console.error("Observix Error:", err.message);
      }
    });

    next();
  };
};`;

  const usageCode = `import express from "express";
import { observixMiddleware } from "./observix.js";

const app = express();

app.use(observixMiddleware("YOUR_API_KEY"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server running"));`;

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#0B0917] text-white px-4 md:px-10 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#5B13EC] to-[#7C3AED] bg-clip-text text-transparent">
          Observix Integration
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Monitor your APIs in real-time with Observix. Setup takes less than 2 minutes.
        </p>
      </div>
      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-10">

        {/* api key info */}
        <div className="bg-[#1C1635] border border-[#5B13EC]/20 rounded-xl p-4 text-sm text-gray-300">
          🔑 <span className="text-white font-medium">Get your API Key: </span>  
          Create a project from your dashboard. Once created, an API key will be automatically generated.  
          Copy the key and use it in the middleware setup.
        </div>
        {/* Step 1 */}
        <div className="bg-[#14112B] border border-white/10 rounded-2xl p-6 relative">
          <h2 className="text-lg font-semibold mb-3">1. Install Dependency</h2>
          <CopyButton code={installCode} />
          <div className="bg-[#0B0917] border border-white/10 rounded-lg p-4 text-sm text-gray-300">
            {installCode}
          </div>
        </div>
        {/* Step 2 */}
        <div className="bg-[#14112B] border border-white/10 rounded-2xl p-6 relative">
          <h2 className="text-lg font-semibold mb-3">2. Create Middleware</h2>
          <CopyButton code={middlewareCode} />
          <pre className="bg-[#0B0917] border border-white/10 rounded-lg p-4 text-xs md:text-sm overflow-x-auto text-gray-300">
            {middlewareCode}
          </pre>
        </div>
        {/* Step 3 */}
        <div className="bg-[#14112B] border border-white/10 rounded-2xl p-6 relative">
          <h2 className="text-lg font-semibold mb-3">3. Use in Your App</h2>
          <CopyButton code={usageCode} />
          <pre className="bg-[#0B0917] border border-white/10 rounded-lg p-4 text-xs md:text-sm overflow-x-auto text-gray-300">
            {usageCode}
          </pre>
        </div>
        {/* Step 4 */}
        <div className="bg-[#14112B] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">4. Done</h2>
          <p className="text-gray-400 text-sm">
            Your API is now being monitored. View logs, performance, and insights in your dashboard.
          </p>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Docs;