import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,lowercase:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""},
    role:{type:String,enum:["developer","admin"],default:"developer"},
    plan:{type:String,enum:["free","pro"],default:"free"},
    isActive:{type:Boolean,default:true},
    lastLogin:{type:Date}
},{timestamps:true})
const userModel = mongoose.model("User",userSchema)
export default userModel 