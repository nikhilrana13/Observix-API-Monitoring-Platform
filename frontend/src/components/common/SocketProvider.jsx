import { getSocket } from '../../config/socket';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';


const SocketProvider = () => {
    const user = useSelector((state)=>state.Auth.user)
    const joinedRef = useRef()

    useEffect(()=>{
        if(!user?._id){
            // console.log("user not ready",user)
            return
        }
        const socket = getSocket()
         // console.log("socket instance", socket.id, socket.connected);
         const joinRooms = ()=>{
            if(joinedRef.current) return // prevent duplicate join 
            joinedRef.current = true 
            // console.log("joining room")

            socket.emit("join-user",{
                userId:user?._id
            })
         }
         if(socket.connected){
            joinRooms()  // already connected
         }else{
            socket.on("connect",joinRooms)
         }
         return ()=>{
            socket.off("connect",joinRooms)
            joinedRef.current = false
         }
    },[user?._id])

  return null
}

export default SocketProvider;
