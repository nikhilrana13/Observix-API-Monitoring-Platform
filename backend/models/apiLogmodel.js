import mongoose from "mongoose"
const apiLogSchema = new mongoose.Schema({
    projectId:{type:mongoose.Types.ObjectId,ref:"Project",required:true},
    endpoint:{type:String,required:true},
    method:{type:String,required:true,enum:["GET","POST","PUT","DELETE","PATCH"]},
    statusCode:{type:Number,required:true},
    responseTime:{type:Number,required:true},
    timestamp:{type:Date,default:Date.now},
    error:{type:Boolean,default:false},
    userAgent:{String},
    ip:{type:String}
})

// indexes for faster analytics queries
apiLogSchema.index({ projectId:1 })
apiLogSchema.index({ timestamp:1 })
apiLogSchema.index({ endpoint:1 })

const ApiLog = mongoose.model("ApiLog",apiLogSchema)
export default ApiLog
