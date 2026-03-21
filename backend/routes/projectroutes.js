import express from "express"
import { isAuth } from "../middleware/authmiddleware.js"
import { CreateNewProject, EachProjectDetails, toggleProjectStatus, UserAllProjects } from "../controllers/projectcontroller.js"
const router = express.Router()


// routes 
router.post("/create-project",isAuth,CreateNewProject)
router.get("/allprojects",isAuth,UserAllProjects)
router.put("/status/:id",isAuth,toggleProjectStatus)
router.get("/details/:id",isAuth,EachProjectDetails)

export default router