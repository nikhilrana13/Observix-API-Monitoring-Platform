import ApiLog from "../models/apiLogmodel.js";
import Project from "../models/projectmodel.js";
import userModel from "../models/usermodel.js";
import { Response } from "../utils/responsehandler.js";

// find each project analytics stats
export const EachProjectAnalyticsStats = async (req, res) => {
  try {
    const userId = req.user;
    const projectId = req.params.id;
    // check user exists or not
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    // project exists or not
    const project = await Project.findById(projectId);
    if (!project) {
      return Response(res, 400, "Project not found");
    }
    if (project.userId.toString() !== userId) {
      return Response(res, 403, "You are not authorized to view analytics");
    }
    // last 24 hours requests
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const totalrequests24h = await ApiLog.countDocuments({
      projectId,
      timestamp: { $gte: last24Hours },
    });
    // error count last 24 hrs
    const errorCount = await ApiLog.countDocuments({
      projectId,
      statusCode: { $gte: 500 },
      timestamp: { $gte: last24Hours },
    });
    // avg latency
    const latency = await ApiLog.aggregate([
      { $match: { projectId: project._id } },
      {
        $group: {
          _id: null,
          avgLatency: { $avg: "$responseTime" },
        },
      },
    ]);
    const avgLatency = latency.length ? latency[0].avgLatency : 0;
    // success rate
    const successRequests = totalrequests24h - errorCount;
    const successRate = totalrequests24h
      ? ((successRequests / totalrequests24h) * 100).toFixed(2)
      : 0;
    return Response(res, 200, "Analytics fetched", {
      totalrequests24h,
      avgLatency,
      errorCount,
      successRate,
    });
  } catch (error) {
    console.error("failed to get analytics stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// dashboard analytics stats
export const DashboardAnalyticsStats = async (req, res) => {
  try {
    const userId = req.user;
    // check user exists or not
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    // find user all projects
    const projects = await Project.find({ userId: user?._id }).select("_id");
    const projectIds = projects.map((p) => p._id);
    // total requests
    const totalRequests = await ApiLog.countDocuments({
      projectId: { $in: projectIds },
    });
    // error count
    const errorCount = await ApiLog.countDocuments({
      projectId: { $in: projectIds },
      statusCode: { $gte: 500 },
    });
    // avg latency
    const latency = await ApiLog.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      {
        $group: {
          _id: null,
          avgLatency: { $avg: "$responseTime" },
        },
      },
    ]);
    const avgLatency = latency.length ? latency[0].avgLatency : 0;
    // success rate
    const successRequests = totalRequests - errorCount;
    const successRate = totalRequests
      ? ((successRequests / totalRequests) * 100).toFixed(2)
      : 0;
    return Response(res, 200, "dashboard Analytics fetched", {
      totalRequests,
      errorCount,
      avgLatency,
      successRate,
    });
  } catch (error) {
    console.error("failed to get dashboard analytics stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// dashboard requests graph
export const DashboardRequestsGraph = async (req, res) => {
  try {
    const userId = req.user;
    // check user exists or not
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    const projects = await Project.find({ userId }).select("_id");
    if (!projects.length) {
      return Response(res, 200, "No projects found", []);
    }
    const projectIds = projects.map((p) => p._id);
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const requests = await ApiLog.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
          timestamp: { $gte: last24Hours },
        },
      },
      {
        $group: {
          _id: {
            hour: {
              $hour: {
                date: "$timestamp",
                timezone: "Asia/Kolkata",
              },
            },
          },
          requests: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          hour: "$_id.hour",
          requests: 1,
        },
      },
      {
        $sort: { hour: 1 },
      },
    ]);
    return Response(res, 200, "Requests graph fetched", { requests });
  } catch (error) {
    console.error("failed to get dashboard requests data", error);
    return Response(res, 500, "Internal server error");
  }
};
// dashboard latency graph
export const DashboardLatencyGraph = async (req, res) => {
  try {
    const userId = req.user;
    // check user exists or not
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    const projects = await Project.find({ userId }).select("_id").lean();
    if (!projects.length) {
      return Response(res, 200, "No projects found", []);
    }
    const projectIds = projects.map((p) => p._id);
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const latency = await ApiLog.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
          timestamp: { $gte: last24Hours },
        },
      },
      {
        $group: {
          _id: {
            hour: {
              $hour: {
                date: "$timestamp",
                timezone: "Asia/Kolkata",
              },
            },
          },
          avgLatency: { $avg: "$responseTime" },
        },
      },
      {
        $project: {
          _id: 0,
          hour: "$_id.hour",
          avgLatency: 1,
        },
      },
      {
        $sort: { "_id.hour": 1 },
      },
    ]);
    return Response(res, 200, "Latency graph fetched", latency);
  } catch (error) {
    console.error("Dashboard LatencyGraph error:", error);
    return Response(res, 500, "Internal server error");
  }
};
// top performing endPoints
export const TopPerformingEndpoints = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    const projects = await Project.find({ userId }).select("_id");
    if (!projects.length) {
      return Response(res, 200, "No projects found", []);
    }
    const projectIds = projects.map((p) => p._id);
    const endpoints = await ApiLog.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
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
    return Response(res, 200, "Top endpoints fetched", { endpoints });
  } catch (error) {
    console.error("Top endpoints error:", error);
    return Response(res, 500, "Internal server error");
  }
};
// error distribution
export const ErrorDistribution = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    const projects = await Project.find({ userId }).select("_id").lean();
    if (!projects.length) {
      return Response(res, 200, "No projects found", []);
    }
    const projectIds = projects.map((p) => p._id);
    // total errors
    const totalErrors = await ApiLog.countDocuments({
      projectId: { $in: projectIds },
      statusCode: { $gte: 400 },
    });
    if (totalErrors === 0) {
      return Response(res, 200, "No errors found", []);
    }
    const distribution = await ApiLog.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
          statusCode: { $gte: 400 },
        },
      },
      {
        $group: {
          _id: "$statusCode",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          statusCode: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    const statusMap = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable",
    };
    const formatted = distribution.map((item) => ({
      statusCode: item.statusCode,
      label: statusMap[item.statusCode] || "Unknown Error",
      percentage: Number(((item.count / totalErrors) * 100).toFixed(2)),
    }));
    return Response(res, 200, "Error distribution fetched", {
      errors: formatted,
    });
  } catch (error) {
    console.error("Error distribution error:", error);
    return Response(res, 500, "Internal server error");
  }
};
// slow endpoints detection
export const SlowEndpoints = async (req,res)=>{
 try{
  const userId = req.user
  const user = await userModel.findById(userId)
  if(!user){
   return Response(res,403,"User not found")
  }
  const projects = await Project.find({ userId }).select("_id")
  if(!projects.length){
   return Response(res,200,"No projects found",[])
  }
  const projectIds = projects.map(p => p._id)
  const slowThreshold = 800
  const slowEndpoints = await ApiLog.aggregate([
   {
    $match:{
     projectId:{ $in: projectIds }
    }
   },
   {
    $group:{
     _id:"$endpoint",
     avgLatency:{ $avg:"$responseTime" },
     totalRequests:{ $sum:1 },
     errorCount:{
      $sum:{
       $cond:[
        { $gte:["$statusCode",500] },
        1,
        0
       ]
      }
     }
    }
   },
   {
    $match:{
     avgLatency:{ $gte: slowThreshold }
    }
   },
   {
    $project:{
     _id:0,
     endpoint:"$_id",
     avgLatency:{ $round:["$avgLatency",2] },
     totalRequests:1,
     errorCount:1
    }
   },
   {
    $sort:{ avgLatency:-1 }
   },
   {
    $limit:5
   }
  ])
  return Response(res,200,"Slow endpoints fetched",{slowEndpoints})

 }catch(error){
  console.error("Slow endpoints error:",error)
  return Response(res,500,"Internal server error")
 }
}













