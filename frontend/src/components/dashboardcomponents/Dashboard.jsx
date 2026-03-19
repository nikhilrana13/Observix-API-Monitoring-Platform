import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiErrorCircle, BiTimer } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import StatsCard from './StatsCard';
import StatsCardShimmer from './StatsCardShimmer';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { formatLatency, formatSuccessRate, normalizeLatency, normalizeRequests } from '../../utils/Formaters';
import RequestsGraph from './RequestsGraph';
import ChartShimmer from './ChartShimmer';
import LatencyGraph from './LatencyGraph';
import ErrorDistributionCard from './ErrorDistributionCard';
import ErrorDistributionShimmer from './ErrorDistributionShimmer';
import TopEndpointsCard from './TopEndPointsCard';
import TopEndpointsShimmer from './TopEndPointShimmer';

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalRequests: 0,
    errorCount: 0,
    avgLatency: 0,
    successRate: ""
  })
  const [requests, setRequests] = useState([])
  const [avglatency, setAvgLatency] = useState([])
  const [errordistribution, setErrorDistribution] = useState([])
  const [topendpoints, setTopendPoints] = useState([])
  const user = useSelector((state) => state.Auth.user)
  // stats data
  const statsdata = [
    {
      title: "Total Requests",
      value: stats?.totalRequests || 0,
      icon: BsGraphUpArrow,
      gradient: "bg-[#23104A]",
      textColor: "text-[#5B13EC]"
    },
    {
      title: "Error Count",
      value: stats?.errorCount || 0,
      icon: BiErrorCircle,
      gradient: "bg-[#301431]",
      textColor: "text-[#F43F5E]"
    },
    {
      title: "Avg Response Time",
      value: formatLatency(stats?.avgLatency || 0),
      icon: BiTimer,
      gradient: "bg-[#23104A]",
      textColor: "text-[#5B13EC]"
    },
    {
      title: "Success Rate",
      value: formatSuccessRate(stats?.successRate || 0),
      icon: FaRegCircleCheck,
      gradient: "bg-[#192134]",
      textColor: "text-[#10B981]"
    },
  ]
  // fetch dashboard overview stats
  useEffect(() => {
    const fetchDashboardoverview = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/dashboard/overview`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        const data = response?.data?.data
        if (data) {
          setStats(data?.stats);
          setRequests(normalizeRequests(data?.requestsGraph));
          setAvgLatency(normalizeLatency(data?.latencyGraph))
          setTopendPoints(data?.endpoints);
          setErrorDistribution(data?.errorDistribution.sort((a, b) => b.percentage - a.percentage))
        }
      } catch (error) {
        console.error("Failed to fetch dashboard overview", error);
    }finally{
      setLoading(false)
    }
  }
  fetchDashboardoverview()
  },[])

  return (
    <div className='w-full bg-[#161022]'>
      <h1 className="text-[1.5rem] text-white p-3 sm:text-3xl font-[500]">Welcome back, {user?.username || "User"} 👋</h1>
      {/* stats cards */}
      <div className='flex flex-col  p-3 gap-4'>
        {
          loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((_, i) => {
                return (
                  <StatsCardShimmer key={i} />
                )
              })}
            </div>
          ) : (
            <StatsCard statsdata={statsdata} />
          )
        }
        {/* graphs */}
        <div className='flex flex-col md:flex-row gap-5 '>
          {
            loading ? (
              <ChartShimmer />
            ) : (
              <RequestsGraph requests={requests} />
            )
          }
          {
            loading ? (
              <ChartShimmer />
            ) : (
              <LatencyGraph latencyData={avglatency} />
            )
          }
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* error distribution card */}
          {
            loading? (
              <ErrorDistributionShimmer />
            ) : (
              <ErrorDistributionCard errors={errordistribution} />
            )
          }
          {/* top end points */}
          {
            loading ? (
              <TopEndpointsShimmer />
            ) : (
              <TopEndpointsCard endpoints={topendpoints} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
