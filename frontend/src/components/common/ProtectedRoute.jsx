import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem("token")
    const user = useSelector((state=>state.Auth.user))



   if(!token && !user?.role !== "developer"){
    return <Navigate to="/" replace />
   }
   return <Outlet />

}

export default ProtectedRoute;
