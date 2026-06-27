# 🚀 Observix — Real-Time API Monitoring & Observability Platform

Observix is a modern API monitoring and observability platform that enables developers to monitor API performance, analyze traffic, detect failures, and receive AI-powered insights in real time.

With a lightweight middleware integration, developers can start monitoring their APIs within minutes—without changing their existing application architecture.

---

# ✨ Features

* 📊 Real-time API monitoring
* ⚡ Live request & latency graphs
* 🚨 Error tracking and distribution analysis
* 📈 Top endpoints analytics
* 🔄 Real-time dashboard updates using Socket.IO
* 🤖 AI-powered performance insights & recommendations
* 🔑 API key-based project integration
* 🐳 Docker-ready deployment
* 📱 Fully responsive dashboard
* ♾ Infinite scroll for logs and projects
* 🚀 Optimized aggregation pipelines for analytics
* 🔒 Secure project isolation using unique API keys

---

# 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS
* Redux Toolkit
* RTK Query
* Socket.IO Client
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Redis
* Gemini API

### DevOps

* Docker
* Docker Compose
* Render

---

# ⚡ Quick Integration (2 Minutes)

## 1. Install Axios

```bash
npm install axios
```

---

## 2. Create Observix Middleware

```javascript
import axios from "axios";

const OBSERVIX_API_URL =
  "https://observix-api-monitoring-platform-backend.onrender.com/api/monitor";

export const observixMiddleware = (apiKey) => {
  return (req, res, next) => {

    if (
      req.method === "HEAD" ||
      req.method === "OPTIONS" ||
      req.originalUrl.startsWith("/favicon.ico")
    ) {
      return next();
    }

    const start = Date.now();

    res.on("finish", async () => {

      try {
        await axios.post(OBSERVIX_API_URL, {
          apiKey,
          endpoint: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          responseTime: Date.now() - start,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
          timestamp: new Date(),
        });
      } catch (err) {
        console.error({
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
    });

    next();
  };
};
```

---

## 3. Register Middleware

```javascript
import express from "express";
import { observixMiddleware } from "./middleware/observix.js";

const app = express();

app.use(express.json());

app.use(
  observixMiddleware("YOUR_API_KEY")
);
```

That's it!

Every incoming request will automatically be monitored.

---

# 🐳 Docker Integration

Observix works seamlessly with Dockerized applications.

Simply add the middleware to your Express server and rebuild your Docker image.

```bash
docker compose up --build
```

No additional Docker configuration is required.

---

# 🔑 Getting Your API Key

1. Create an account.
2. Create a new project.
3. Copy the generated API Key.
4. Pass the API Key to the Observix middleware.

```javascript
app.use(
    observixMiddleware("pulse_xxxxxxxxxxxxx")
);
```

---

# 📊 Dashboard Analytics

Observix provides real-time analytics including:

* Total Requests
* Average Response Time
* Success Rate
* Error Count
* Request Timeline
* Latency Timeline
* Error Distribution
* Top Requested Endpoints

---

# 🤖 AI Insights

Observix analyzes your API traffic and provides recommendations such as:

* Slow endpoint detection
* Performance bottlenecks
* High error-rate analysis
* Optimization suggestions
* Traffic anomaly detection

---

# 🚀 Use Cases

* Production API Monitoring
* Backend Performance Analysis
* Error Detection
* Debugging Slow APIs
* Performance Optimization
* Team Monitoring Dashboards

---

# 🌐 Live Demo
Live Link:["https://observix-api-monitoring-platform-frontend.onrender.com"]
---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository, create a feature branch, and submit a Pull Request.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
