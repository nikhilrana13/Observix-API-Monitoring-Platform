import express from "express"
import { FindApiLogs, MonitorApi } from "../controllers/monitorcontroller.js"
import { isAuth } from "../middleware/authmiddleware.js"
const router = express.Router()

router.post("/monitor",MonitorApi)
router.get("/logs",isAuth,FindApiLogs)

export default router

