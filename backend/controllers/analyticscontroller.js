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
// dashboard all stats
export const DashboardOverview = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId);
    if (!user) return Response(res, 403, "User not found");
    const projects = await Project.find({ userId }).select("_id").lean();
    if (!projects.length) {
      return Response(res, 200, "No projects found", {});
    }
    const projectIds = projects.map(p => p._id);
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [
      totalRequests,
      errorCount,
      latencyAgg,
      requestsGraph,
      latencyGraph,
      endpoints,
      errorDistRaw,
      totalErrors
    ] = await Promise.all([
      // total requests
      ApiLog.countDocuments({ projectId: { $in: projectIds } }),
      // error count
      ApiLog.countDocuments({
        projectId: { $in: projectIds },
        statusCode: { $gte: 500 }
      }),
      // avg latency
      ApiLog.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: null, avgLatency: { $avg: "$responseTime" } } }
      ]),
      // requests graph
      ApiLog.aggregate([
        {
          $match: {
            projectId: { $in: projectIds },
            timestamp: { $gte: last24Hours }
          }
        },
        {
          $group: {
            _id: {
              hour: {
                $hour: { date: "$timestamp", timezone: "Asia/Kolkata" }
              }
            },
            requests: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            hour: "$_id.hour",
            requests: 1
          }
        },
        { $sort: { hour: 1 } }
      ]),
      // latency graph
      ApiLog.aggregate([
        {
          $match: {
            projectId: { $in: projectIds },
            timestamp: { $gte: last24Hours }
          }
        },
        {
          $group: {
            _id: {
              hour: {
                $hour: { date: "$timestamp", timezone: "Asia/Kolkata" }
              }
            },
            avgLatency: { $avg: "$responseTime" }
          }
        },
        {
          $project: {
            _id: 0,
            hour: "$_id.hour",
            avgLatency: 1
          }
        },
        { $sort: { hour: 1 } }
      ]),
      // top endpoints
      ApiLog.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        {
          $group: {
            _id: "$endpoint",
            totalRequests: { $sum: 1 },
            avgLatency: { $avg: "$responseTime" },
            errorCount: {
              $sum: {
                $cond: [{ $gte: ["$statusCode", 500] }, 1, 0]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            endpoint: "$_id",
            totalRequests: 1,
            avgLatency: { $round: ["$avgLatency", 2] },
            errorCount: 1
          }
        },
        { $sort: { totalRequests: -1 } },
        { $limit: 4 }
      ]),
      // error distribution raw
      ApiLog.aggregate([
        {
          $match: {
            projectId: { $in: projectIds },
            statusCode: { $gte: 400 }
          }
        },
        {
          $group: {
            _id: "$statusCode",
            count: { $sum: 1 }
          }
        }
      ]),
      // total errors
      ApiLog.countDocuments({
        projectId: { $in: projectIds },
        statusCode: { $gte: 400 }
      })
    ]);
    // format values
    const avgLatency = latencyAgg.length ? latencyAgg[0].avgLatency : 0;
    const successRate = totalRequests ? ((totalRequests - errorCount) / totalRequests * 100).toFixed(2) : 0;
    const statusMap = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable",
    };
    const errorDistribution = errorDistRaw.map(item => ({
      statusCode: item._id,
      label: statusMap[item._id] || "Unknown Error",
      percentage: Number(((item.count / totalErrors) * 100).toFixed(2))
    }));
    return Response(res, 200, "Dashboard overview fetched", {
      stats: {
        totalRequests,
        errorCount,
        avgLatency,
        successRate
      },
      requestsGraph,
      latencyGraph,
      endpoints,
      errorDistribution
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);
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













