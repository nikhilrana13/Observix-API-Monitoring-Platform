import express from "express"
import { isAuth } from "../middleware/authmiddleware.js"
import { DashboardAnalyticsStats, DashboardLatencyGraph, DashboardRequestsGraph, EachProjectAnalyticsStats, ErrorDistribution, SlowEndpoints, TopPerformingEndpoints } from "../controllers/analyticscontroller.js";
import { pulseMiddleware } from "../middleware/pulsemiddleware.js";
const router = express.Router()


router.get("/overview/:id",isAuth,pulseMiddleware("pulse_9938b2b587994b9e"),EachProjectAnalyticsStats)
router.get("/dashboard/stats",isAuth,pulseMiddleware("pulse_9938b2b587994b9e"),DashboardAnalyticsStats) 
router.get("/dashboard/requests",isAuth,DashboardRequestsGraph)
router.get("/dashboard/latency",isAuth,DashboardLatencyGraph)
router.get("/top-endpoints",isAuth,TopPerformingEndpoints)
router.get("/error-distribution",isAuth,ErrorDistribution)
router.get("/slow-endpoints",isAuth,SlowEndpoints)


export default router  


