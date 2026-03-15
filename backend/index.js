import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { configure } from "./config/db.js"
import authRoute from "./routes/authroutes.js"
import projectRoute from "./routes/projectroutes.js"
import monitorRoute from "./routes/monitorroutes.js"
import analyticsRoute from "./routes/anayticsroutes.js"
import ChatRoute from "./routes/aichatbotroutes.js"
import { initializeSocket } from "./config/socketservice.js"
import http from "http"

dotenv.config()

const Port = process.env.PORT || 5000
const app = express()



// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// create io socket server 
const server = http.createServer(app)
initializeSocket(server)


// routes
app.use("/api/auth",authRoute)
app.use("/api/project",projectRoute)
app.use("/api/",monitorRoute)
app.use("/api/analytics/",analyticsRoute)
app.use("/api/ai",ChatRoute)

// connect to db
configure()


server.listen(Port,(()=>{
    console.log(`server is running on ${Port}`)
}))