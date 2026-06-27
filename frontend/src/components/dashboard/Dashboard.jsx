import React, { useEffect, useState } from 'react';
import { BiErrorCircle, BiTimer } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import StatsCard from './StatsCard';
import StatsCardShimmer from './StatsCardShimmer';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { formatLatency, formatSuccessRate, normalizeLatency, normalizeRequests } from '../../utils/Formaters';
import RequestsGraph from './RequestsGraph';
import ChartShimmer from '../chatbot/ChartShimmer';
import LatencyGraph from './LatencyGraph';
import ErrorDistributionCard from './ErrorDistributionCard';
import ErrorDistributionShimmer from './ErrorDistributionShimmer';
import TopEndpointsCard from './TopEndPointsCard';
import TopEndpointsShimmer from './TopEndPointShimmer';
import { getSocket } from '@/config/socket';
import { useGetDashboardStatsQuery } from '@/redux/api/DashboardApi';

const Dashboard = () => {
  const user = useSelector((state) => state.Auth.user)
  const statsQuery = useGetDashboardStatsQuery()
  const dashboardData = statsQuery?.data?.data
  const loading = statsQuery?.isLoading || statsQuery.isFetching;
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [avgLatency, setAvgLatency] = useState([]);
  const [errorDistribution, setErrorDistribution] = useState([]);
  const [topEndpoints, setTopEndpoints] = useState([]);
  console.log("dashboard data", dashboardData)

  // Fetch initial dashboard data using RTK Query
  useEffect(() => {
    if (!dashboardData) return;
    setStats(dashboardData?.stats);
    setRequests(
      normalizeRequests(dashboardData?.requestsGraph)
    );
    setAvgLatency(
      normalizeLatency(dashboardData?.latencyGraph)
    );
    setErrorDistribution(
      [...dashboardData?.errorDistribution ?? [] ].sort(
        (a, b) => b.percentage - a.percentage
      )
    );
    setTopEndpoints(
      dashboardData?.endPoints ?? []
    );
  }, [dashboardData]);


  // stats data
  const statsdata = [
    {
      title: "Total Requests",
      value: statsQuery?.isError ? "--" : stats?.totalRequests ?? 0,
      icon: BsGraphUpArrow,
      gradient: "bg-[#23104A]",
      textColor: "text-[#5B13EC]"
    },
    {
      title: "Error Count",
      value: statsQuery?.isError ? "--" : stats?.errorCount ?? 0,
      icon: BiErrorCircle,
      gradient: "bg-[#301431]",
      textColor: "text-[#F43F5E]"
    },
    {
      title: "Avg Response Time",
      value: statsQuery?.isError ? "--" : formatLatency(stats?.avgLatency) ?? 0,
      icon: BiTimer,
      gradient: "bg-[#23104A]",
      textColor: "text-[#5B13EC]"
    },
    {
      title: "Success Rate",
      value: statsQuery?.isError ? "--" : formatSuccessRate(stats?.successRate) ?? 0,
      icon: FaRegCircleCheck,
      gradient: "bg-[#192134]",
      textColor: "text-[#10B981]"
    },
  ]
  // console.log("top end points", endpoints)
  // Listen for real-time dashboard updates via Socket.IO
  useEffect(() => {
    const socket = getSocket();
    socket.on("new-api-log", (log) => {
      // console.log("live log", log);
      // ignore dashboard internal calls
      if (!log?.endpoint || log.endpoint.includes("/api/analytics")) return;
      // stats
      setStats((prev) => {
        if (!prev) return prev;
        const safeLatency = Number(log.responseTime) || 0;
        const safePrevLatency = Number(prev.avgLatency) || 0;
        const total = prev.totalRequests + 1;
        const errors = log.statusCode >= 500 ? prev.errorCount + 1 : prev.errorCount;
        const newAvg = (safePrevLatency * prev.totalRequests + safeLatency) / total;
        return {
          ...prev,
          totalRequests: total,
          errorCount: errors,
          avgLatency: isNaN(newAvg) ? 0 : newAvg,
          successRate:
            total > 0 ? ((total - errors) / total) * 100 : 0,
        };
      });
      // Requests graph update
      const now = new Date();
      const timeBucket = `${now.getHours()}:${now.getMinutes()}`; // minute level
      setRequests((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.time === timeBucket) {
          const newLast = {
            ...last,
            count: last.count + 1,
          };
          return [...updated.slice(0, -1), newLast];
        }
        return [...updated, { time: timeBucket, count: 1 }].slice(-20);
      });
      // Latency graph update
      setAvgLatency((prev) => {
        const updated = [...prev];
        const safeLatency = Number(log.responseTime) || 0
        if (!safeLatency) return prev; // skip invalid
        const timeBucketlatency = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        updated.push({
          time: timeBucketlatency,
          latency: safeLatency
        });
        return updated.slice(-20);
      });
      // Error distribution update
      if (log.statusCode >= 400) {
        setErrorDistribution((prev = []) => {
          const map = new Map();
          prev.forEach((e) => {
            map.set(e.code || e.statusCode, e.count || 0);
          });
          map.set(log.statusCode, (map.get(log.statusCode) || 0) + 1);
          return Array.from(map, ([code, count]) => ({
            code,
            count,
          }));
        });
      }
    });
    // Update top endpoints whenever backend emits new rankings
    socket.on("top-endpoints-update", (data) => {
      setTopEndpoints(data?.endpoints);
    });
    return () => {
      socket.off("new-api-log");
      socket.off("top-endpoints-update")
    };
  }, []);

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
              <LatencyGraph latencyData={avgLatency} />
            )
          }
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* error distribution card */}
          {
            loading ? (
              <ErrorDistributionShimmer />
            ) : (
              <ErrorDistributionCard errors={errorDistribution} />
            )
          }
          {/* top end points */}
          {
            loading ? (
              <TopEndpointsShimmer />
            ) : (
              <TopEndpointsCard endpoints={topEndpoints} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
