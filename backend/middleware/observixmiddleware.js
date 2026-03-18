import axios from "axios"

const OBSERVIX_API_URL = "http://localhost:4000/api/monitor"

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
        await axios.post(OBSERVIX_API_URL,logData,{
          timeout:2000
        })
      }catch(error){
        console.error("Observix monitoring failed:",error.message)
      }
    })
    next()
   }
}