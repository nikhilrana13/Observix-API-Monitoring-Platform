import mongoose from "mongoose"; 
const projectSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    name:{type:String,required:true,trim:true},
    baseUrl:{type:String,required:true,trim:true},
    apiKey:{type:String,required:true,unique:true},
    status:{type:String,enum:["active","inactive","warning"],default:"active"},
    environment:{type:String,enum:["development","production"],required:true},
    healthEndpoint:{type:String,default:"/health"},
    requestCount:{type:Number,default:0}

},{timestamps:true})

// indexes for query optimization
projectSchema.index({userId:1})
projectSchema.index({apiKey:1})
projectSchema.index({ userId:1, baseUrl:1 },{ unique:true })
const Project = mongoose.model("Project",projectSchema)
export default Project 

