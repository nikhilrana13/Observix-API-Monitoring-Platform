import express from "express"
import { isAuth } from "../middleware/authmiddleware.js"
import { AIChat } from "../controllers/aichatbotcontroller.js"
const router = express.Router()



router.post("/chatbot",isAuth,AIChat)


export default router