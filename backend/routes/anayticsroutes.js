import express from "express"
import { isAuth } from "../middleware/authmiddleware.js"
import { DashboardOverview,EachProjectAnalyticsStats,SlowEndpoints} from "../controllers/analyticscontroller.js";
import { observixMiddleware } from "../middleware/observixmiddleware.js";
const router = express.Router()



router.get("/dashboard/overview",isAuth,observixMiddleware("pulse_9938b2b587994b9e"),DashboardOverview)
router.get("/slow-endpoints",isAuth,SlowEndpoints)
router.get("/project/:id/overview",isAuth,observixMiddleware("pulse_9938b2b587994b9e"),EachProjectAnalyticsStats)


export default router  


