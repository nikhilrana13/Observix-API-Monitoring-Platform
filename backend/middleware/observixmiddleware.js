import axios from "axios"

export const observixMiddleware = (apiKey) => {
   return(req,res,next)=>{
    const startTime = Date.now()

    res.on("finish", async ()=>{
      const responseTime = Date.now() - startTime
      const logData = {
        apiKey: apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        responseTime: responseTime,
        ip: req.ip || req.connection?.remoteAddress,
        userAgent: req.headers["user-agent"],
        timestamp: new Date()
      }
      try{
        await axios.post(process.env.PULSE_API_URL,logData,{
          timeout:2000
        })
      }catch(error){
        console.log("Pulse monitoring failed:",error.message)
      }
    })
    next()
   }
}