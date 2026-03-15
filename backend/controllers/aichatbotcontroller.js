import ApiLog from "../models/apiLogmodel.js";
import Project from "../models/projectmodel.js";
import userModel from "../models/usermodel.js";
import { Response } from "../utils/responsehandler.js";
import { GoogleGenAI } from "@google/genai";


const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})

export const AIChat = async (req, res) => {
  try {
    const userId = req.user;
    const { projectId, question } = req.body;
    if (!projectId || !question.trim()) {
      return Response(res, 400, "projectId and question is required");
    }
    if (question.length > 200) {
      return Response(res,400,"Question too long. Max 200 characters allowed.",);
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return Response(res, 404, "Project not found");
    }
    if (project.userId.toString() !== userId) {
      return Response(res,403,"You are not authorized to access this project",);
    }
    // basic analytics
    // last 24 hours requests
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const totalrequests24h = await ApiLog.countDocuments({
      projectId,
      timestamp: { $gte: last24Hours },
    });
    const errorCount = await ApiLog.countDocuments({
      projectId,
      statusCode: { $gte: 500 },
      timestamp: { $gte: last24Hours },
    });
    const errorRate = totalrequests24h
      ? ((errorCount / totalrequests24h) * 100).toFixed(2)
      : 0;
    const latency = await ApiLog.aggregate([
      { $match: { projectId: project._id } },
      { $group: { _id: null, avgLatency: { $avg: "$responseTime" } } },
    ]);
    const avgLatency = latency.length ? Math.round(latency[0].avgLatency) : 0;
    // top performing end points
    const endpoints = await ApiLog.aggregate([
      {
        $match: {
          projectId: project._id,
        },
      },
      {
        $group: {
          _id: "$endpoint",
          totalRequests: { $sum: 1 },
          avgLatency: { $avg: "$responseTime" },
          errorCount: {
            $sum: {
              $cond: [{ $gte: ["$statusCode", 500] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          endpoint: "$_id",
          totalRequests: 1,
          avgLatency: { $round: ["$avgLatency", 2] },
          errorCount: 1,
        },
      },
      {
        $sort: { totalRequests: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    // slow end points
    const slowEndpoints = await ApiLog.aggregate([
      {
        $match: { projectId: project._id },
      },
      {
        $group: {
          _id: "$endpoint",
          avgLatency: { $avg: "$responseTime" },
        },
      },
      {
        $match: { avgLatency: { $gte: 800 } },
      },
      {
        $project: {
          _id: 0,
          endpoint: "$_id",
          avgLatency: { $round: ["$avgLatency", 2] },
        },
      },
      { $sort: { avgLatency: -1 } },
      { $limit: 3 },
    ]);

    const aiPrompt = `
   You are Pulse AI, an API monitoring assistant.
   Project statistics:

   Total Requests (last 24h): ${totalrequests24h}
   Error Count (last 24h): ${errorCount}
   Error Rate: ${errorRate}%
   Average Latency: ${avgLatency} ms

   Top Endpoints:${JSON.stringify(endpoints, null, 2)}
   Slow Endpoints:${JSON.stringify(slowEndpoints, null, 2)}
  
   User Question:${question}
   Analyze the API monitoring data and provide helpful insights
   If there are performance issues, explain the possible reasons and suggest improvements.
   Provide insights in this format:
   Insight: 
   Recommendation:
   Rules:
  - Keep response under 120 words
  - Use short bullet points
  - Avoid long paragraphs
     `;
       const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: aiPrompt }] }],
      temperature: 0.7, // creativity control
      max_output_tokens: 180,
      })
    const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I cannot answer that."
    return Response(res, 200, "AI response", { role:"system",reply });
  } catch (error) {
    console.error("AI chat error", error);
    return Response(res, 500, "Internal server error");
  }
};







