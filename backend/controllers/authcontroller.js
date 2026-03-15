import { validationResult } from "express-validator"
import { Response } from "../utils/responsehandler.js";
import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userMapper } from "../mappers/usermapper.js";



// register user 
export const Register = async(req,res)=>{
    try {
         const {username,email,password} = req.body 
        //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check if user exists 
        const Existinguser = await userModel.findOne({email})
        if(!Existinguser){
              const hashpassword = await bcrypt.hash(password,10)
              const user = await userModel.create({
                 username,
                 email,
                 password:hashpassword,
              })
              return Response(res,201,"Register successfully")
        }else{
            return Response(res,400,"User already exists")
        }
    } catch (error) {
        console.error("failed to register user",error)
        return Response(res,500,"Internal server error")
    }
}

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body 
         //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check user exits or not 
        const user = await userModel.findOne({email})
        if(user){
              const isMatch = await bcrypt.compare(password,user.password)
              if(!isMatch){
                return Response(res,401,"Invalid credentials")
              }
               // update last login 
               user.lastLogin = new Date()
               await user.save()
              // generate token 
              const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1day"})
              res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
              return Response(res,200,"Login successfully",{user:userMapper(user),token})
        }else{
            return Response(res,400,"User not found ! Please register first")
        }
    } catch (error) {
        console.error("failed to login",error)
        return Response(res,500,"Internal server error")
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:'none'})
         return Response(res,200,"Logout successfully")
    } catch (error) {
        console.error("Error in Logout user:", error);
        return Response(res,500,"Internal Server Error");
    }
}