# 🚀 Observix — API Monitoring & Observability Platform

Observix is a modern API monitoring and observability platform that helps developers track API performance, errors, and real-time activity with ease.

It provides real-time logs, analytics dashboards, and AI-powered insights to help you understand and optimize your APIs.

---

## ✨ Features

* 📊 Real-time API logs with WebSocket updates
* ⚡ Live request & latency graphs
* 🚨 Error tracking and distribution analysis
* 📈 Top endpoints monitoring
* 🤖 AI-powered insights & recommendations
* 🔑 Simple API key-based integration
* 🎯 Clean and responsive dashboard UI
* ♾ Infinite scroll for seamless pagination and smooth data loading (logs & projects)
* 🚀 Optimized APIs for high-performance analytics

---

## 🛠 Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Realtime:** Socket.IO
* **AI:** Gemini API

---

## ⚡ Quick Integration (2 Minutes Setup)

### 1. Install dependency

```bash
npm install axios
```

---

### 2. Create Observix Middleware

```js
import axios from "axios";

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
};
```

---

### 3. Use in Your Express App

```js
import express from "express";
import { observixMiddleware } from "./observix.js";

const app = express();

app.use(observixMiddleware("YOUR_API_KEY"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server running"));
```

---

## 🔑 Getting API Key

Create a project from your Observix dashboard.
Once created, an API key will be automatically generated.
Copy the key and use it in the middleware setup.

---

## 📊 What You Can Monitor

* Total API requests
* Response time (latency)
* Error rates
* Endpoint performance
* Traffic trends

---

## 🤖 AI Insights

Observix provides AI-powered insights based on your API logs:

* Detect performance bottlenecks
* Identify slow endpoints
* Suggest optimizations
* Highlight anomalies

---

## 🎯 Use Cases

* Monitor production APIs
* Debug performance issues
* Track errors in real-time
* Optimize backend systems

---

## 🌐 Live Demo

> Add your deployed link here (Vercel / Render / etc.)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the MIT License.
