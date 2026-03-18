import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiErrorCircle, BiTimer } from 'react-icons/bi';
import { GiGrowth } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import StatsCard from './StatsCard';
import { div } from 'framer-motion/client';
import StatsCardShimmer from './StatsCardShimmer';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { formatLatency, formatSuccessRate } from '../../utils/Formaters';

const Dashboard = () => {
  const [loading,setLoading] = useState(false)
  const [stats,setStats] = useState({
    totalRequests:0,
    errorCount:0,
    avgLatency:0, 
    successRate:""
  })
  const user = useSelector((state)=>state.Auth.user)
   // stats data
  const statsdata = [
  {
    title: "Total Requests",
    value: stats?.totalRequests || 0,
    icon: BsGraphUpArrow ,
    gradient: "bg-[#23104A]",
    textColor:"text-[#5B13EC]"
  },
  {
    title: "Error Count",
    value: stats?.errorCount || 0,
    icon: BiErrorCircle,
    gradient: "bg-[#301431]",
    textColor:"text-[#F43F5E]"
  },
  {
    title: "Avg Response Time",
    value: formatLatency(stats?.avgLatency || 0),
    icon: BiTimer,
    gradient: "bg-[#23104A]",
    textColor:"text-[#5B13EC]"
  },
  {
    title: "Success Rate",
    value: formatSuccessRate(stats?.successRate || 0),
    icon: FaRegCircleCheck,
    gradient: "bg-[#192134]",
    textColor:"text-[#10B981]"
  },
  ]
  // fetch dashboard stats 
  useEffect(()=>{
       const fetchDashboardStats = async()=>{
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/dashboard/stats`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
          if(response.data){
            const totalRequests = response?.data?.data?.totalRequests
            const errorCount = response?.data?.data?.errorCount
            const avgLatency = response?.data?.data?.avgLatency 
            const successRate = response?.data?.data?.successRate
            setStats((prev)=>({...prev,totalRequests,errorCount,avgLatency,successRate}))
          }
        } catch (error) {
          console.error("Failed to fetch dashboard stats",error)
        }finally{
         setLoading(false)
        }
       }
       fetchDashboardStats()
  },[])
  return (
      <div className='w-full bg-[#161022]'>
      <h1 className="text-[1.5rem] text-white p-3 sm:text-3xl font-[500]">Welcome back, {user?.username || "User"} 👋</h1>
      {/* stats cards */}
      <div className='flex flex-col  p-3 gap-4'>
        {
          loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {[1,2,3,4].map((_,i)=>{
                return (
                  <StatsCardShimmer key={i} />
                )
              })}
            </div>
          ):(
            <StatsCard statsdata={statsdata} />
          )
        }
               
    </div>
    </div>  
    );
}

export default Dashboard;
