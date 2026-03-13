import ApiLog from "../models/apiLogmodel.js";
import Project from "../models/projectmodel.js";
import userModel from "../models/usermodel.js";
import { Response } from "../utils/responsehandler.js";

// monitor api and save data in db
export const MonitorApi = async (req, res) => {
  try {
    const {
      apiKey,
      endpoint,
      method,
      statusCode,
      responseTime,
      ip,
      userAgent,
      timestamp,
    } = req.body;
    // check project by apiKey
    const project = await Project.findOne({ apiKey });
    if (!project) {
      return Response(res, 404, "Invalid API key");
    }
    // save api log
    await ApiLog.create({
      projectId: project._id,
      endpoint,
      method,
      statusCode,
      responseTime,
      ip,
      userAgent,
      timestamp,
      error: statusCode >= 500,
    });
    // increment request count
    await Project.findByIdAndUpdate(project._id,{
        $inc:{requestCount:1}
    })
    return Response(res, 200, "Log Captured");
  } catch (error) {
    console.error("failed to monitor api", error);
    return Response(res, 500, "Internal server error");
  }
};
// find project all api logs
export const FindApiLogs = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 30, type, status, projectId, period } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // validation
    if (!projectId) {
      return Response(res, 400, "ProjectId is required");
    }
    // check user exists or not
    const user = await userModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    // check project exists or not
    const project = await Project.findById(projectId);
    if (!project) {
      return Response(res, 404, "Project not found");
    }
    if (project.userId.toString() !== userId) {
      return Response(
        res,
        403,
        "You are not authorized to View this Project Api Logs",
      );
    }
    // filter
    let filter = { projectId: project._id };
     // status
    if (status) {
      filter.statusCode = Number(status);
    } // error logs
    else if (type === "error") {
      filter.statusCode = { $gte: 500 };
    }
    // slow logs
    else if (type === "slow") {
      filter.responseTime = { $gte: 1000 };
    }
    // time filter
    if (period) {
      let startTime;
      if (period === "1h") {
        startTime = new Date(Date.now() - 1 * 60 * 60 * 1000);
      } else if (period === "12h") {
        startTime = new Date(Date.now() - 12 * 60 * 60 * 1000);
      } else if (period === "24h") {
        startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
      } else if (period === "7d") {
        startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      } else if (period === "30d") {
        startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      }
      if (startTime) {
        filter.timestamp = { $gte: startTime };
      }
    }
    const logs = await ApiLog.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ timestamp: -1 });
    const totalLogs = await ApiLog.countDocuments(filter);
    const totalPages = Math.ceil(totalLogs / limit);
    if (logs.length === 0) {
      return Response(res, 200, "No Logs found", []);
    }
    return Response(res, 200, "Logs found", {
      logs,
      pagination: {
        totalLogs,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to get api logs", error);
    return Response(res, 500, "Internal server error");
  }
};



