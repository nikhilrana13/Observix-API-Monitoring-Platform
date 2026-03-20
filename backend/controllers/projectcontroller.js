import Project from "../models/projectmodel.js"
import userModel from "../models/usermodel.js"
import { v4 as uuidv4 } from "uuid"
import { Response } from "../utils/responsehandler.js"


// create project
export const CreateNewProject = async(req,res)=>{
    try {
         const userId = req.user 
         const {name,baseUrl,environment} = req.body 
        //validation 
        const allowedFields = [
            "name","baseUrl","environment"
        ]
        for(let field of allowedFields){
            if(!req.body[field]){
                return Response(res,400,`${field} is required`)
            }
        }
        // check user exists or not 
        const user = await userModel.findById(userId) 
        if(!user){
           return Response(res,403,"User not found")
        }
        // check duplicate project
        const existingProject = await Project.findOne({
            userId,
            baseUrl
        })
        if(existingProject){
            return Response(res,400,"Project with this baseUrl already exists")
        }
        // generate api key 
        const apiKey = "pulse_" + uuidv4().replace(/-/g,"").slice(0,16)
        // create project
        const project = await Project.create({
            userId:user._id,
            name,
            baseUrl,
            apiKey:apiKey,
            environment
        })
        return Response(res,200,"Project Created Successfully",{project})
    } catch (error) {
        console.error("failed to create project",error)
        return Response(res,500,"Internal server")
    }
} 
// get each project details
export const EachProjectDetails = async(req,res)=>{
    try {
         const userId = req.user 
         const projectId = req.params.id 
        // check user exists or not 
        const user = await userModel.findById(userId) 
        if(!user){
           return  Response(res,403,"User not found")
        } 
        // project exists or not 
        const project =  await Project.findById(projectId)
        if(!project){
            return Response(res,400,"Project not found")
        }
        if(project.userId.toString() !== userId){
            return Response(res,403,"You are not authorized to View this Project")
        }
        return Response(res,200,"Project details",{project})
    } catch (error) {
        console.error("failed to get project details",error)
        return Response(res,500,"Internal server error")
    }
}
// get user all projects 
export const UserAllProjects = async(req,res)=>{
    try {
        const userId = req.user 
        let {page=1,limit=6} = req.query 
         page = parseInt(page)
         limit = parseInt(limit)
         const skip = (page - 1) * limit
         // check user exists or not 
        const user = await userModel.findById(userId) 
        if(!user){
           return  Response(res,403,"User not found")
        } 
        let filter = {userId:user._id}
        // find user projects 
        const projects = await Project.find(filter).skip(skip).limit(limit).sort({createdAt:-1})
        const totalProjects = await Project.countDocuments(filter)
        const totalPages = Math.ceil(totalProjects / limit)
        if(projects.length === 0 ){
            return Response(res,200,"No Projects found",[])
        }
        return Response(res,200,"Projects found",{projects,pagination:{
            totalPages,
            currentPage:page,
            totalProjects:totalProjects,
            limit:limit
        }})
    } catch (error) {
        console.error("failed to get all projects",error)
        return Response(res,500,"Internal server error")
    }
} 
// delete project by id 
export const DeleteProject = async(req,res)=>{
    try {
        const userId = req.user 
        const projectId = req.params.id 
        // check user exists or not 
        const user = await userModel.findById(userId) 
        if(!user){
           return  Response(res,403,"User not found")
        } 
        // project exists or not 
        const project =  await Project.findById(projectId)
        if(!project){
            return Response(res,400,"Project not found")
        }
        if(project.userId.toString() !== userId){
            return Response(res,403,"You are not authorized to View this Project")
        }
        // delete project
        await Project.findByIdAndDelete(projectId)
        return Response(res,200,"Project delete successfully")
    } catch (error) {
        console.error("failed to delete project",error)
        return Response(res,500,"Internal server error")
    }
}


