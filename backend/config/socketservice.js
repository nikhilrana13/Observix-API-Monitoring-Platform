import {Server} from "socket.io"


let io;

export const initializeSocket = (server)=>{
    io = new Server(server,{
        cors:{
       origin: process.env.NEXT_FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
        pingTimeout:60000,
         transports:["websocket","polling"]
    });
    // when a new socket connection is established 
    io.on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`);
        // join user 
        socket.on("join-user",({userId})=>{
            if(!userId) return
             const room = `user-${userId}`
            socket.join(room)
            console.log(`User joined room: room-${room}`)
        })
        socket.on("disconnect",()=>{
            console.log(`User disconnected:${socket.id}`);
        })
    })
    return io
}

export const getIo = ()=>{
    if (!io) {
    throw new Error("socket.io not initialized");
  }
  return io;
}

