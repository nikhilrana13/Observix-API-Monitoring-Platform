import React, { useEffect, useState } from 'react';
import StatsCardShimmer from './StatsCardShimmer';
import StatsCard from './StatsCard';
import { BsGraphUpArrow } from 'react-icons/bs';
import { BiErrorCircle, BiTimer } from 'react-icons/bi';
import { formatLatency, formatSuccessRate } from '@/utils/Formaters';
import { FaRegCircleCheck } from 'react-icons/fa6';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FiltersBar from './FilterBar';
import LogsTable from './LogsTable';

const ProjectDetailsPage = () => {
  const { id } = useParams()
  const [statsloading, setstatsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalRequests: 0,
    avgLatency: 0,
    errorCount: 0,
    successRate: ""
  })
  const [logsloading, setLogsloading] = useState(false)
  const [selectmethod, setSelectmethod] = useState("")
  const [selecttype, setSelecttype] = useState("")
  const [selectperiod, setSelectperiod] = useState("")
  const [logs, setLogs] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
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
      title: "Avg Response Time",
      value: formatLatency(stats?.avgLatency || 0),
      icon: BiTimer,
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
      title: "Success Rate",
      value: formatSuccessRate(stats?.successRate || 0),
      icon: FaRegCircleCheck,
      gradient: "bg-[#192134]",
      textColor: "text-[#10B981]"
    },
  ]
  //fetch project stats cards
  useEffect(() => {
    const fetchStats = async () => {
      if (!id) return;
      try {
        setstatsLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/project/${id}/overview`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log("response",response.data)
        if (response.data) {
          const totalRequests = response?.data?.data?.totalrequests24h
          const avgLatency = response?.data?.data?.avgLatency
          const errorCount = response?.data?.data?.errorCount
          const successRate = response?.data?.data?.successRate
          setStats((prev) => ({ ...prev, totalRequests, avgLatency, errorCount, successRate }))
        }

      } catch (error) {
        console.error("failed to fetch stats", error)
      } finally {
        setstatsLoading(false)
      }
    }
    fetchStats()
  }, [id])
  // fetch api logs 
  useEffect(() => {
    const fetchLogs = async () => {
      if (!id) return;
      try {
        setLogsloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
          params: {
            projectId: id,
            page: page,
            method: selectmethod,
            type: selecttype,
            period: selectperiod,
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log('Response',response.data)
        if (response.data) {
          const logs = response?.data?.data?.logs
          const pagination = response?.data?.data?.pagination
          setLogs(logs)
          setPagination(pagination)
        }
      } catch (error) {
        console.error("failed to fetch logs", error)
      } finally {
        setLogsloading(false)
      }
    }
    fetchLogs()
  }, [id, page, selectmethod, selectperiod, selecttype])
  useEffect(() => {
  setPage(1)
}, [selectmethod, selecttype, selectperiod])

  const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalLogs)


  return (
    <div className='flex flex-col p-5 gap-5  bg-[#161022] min-h-[100vh] overflow-y-auto'>
      {/* heading */}
      <div className='flex sm:items-center gap-5 flex-col sm:flex-row justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-white text-[1.5rem] font-[500] '>Api Logs</h3>
          <p className='text-gray-500 text-[1rem]'>Monitor real-time Api requests,status code, and latency ( last 24hr )</p>
        </div>
        <div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {
          statsloading ? (
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
        {/* Api logs */}
        <div className='flex flex-col bg-[#1A102C] border border-[#6a4dff]/20 rounded-xl overflow-hidden'>
          <FiltersBar setSelectmethod={setSelectmethod} setSelecttype={setSelecttype} setSelectperiod={setSelectperiod} />
          <LogsTable logs={logs} logsloading={logsloading} />
          {/* pagination */}
          {
            !logsloading && (
              pagination?.totalPages > 1 && (
                <div className="w-full border-[#6a4dff]/20 py-4 px-6 items-center  border-t flex justify-between">
                  <div className='flex items-center gap-2'>
                    <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                      Showing {start || "NA"}-{end || "NA"} of{" "}
                      {pagination?.totalLogs || 0} Logs
                    </span>
                  </div>
                  {/* page button */}
                  <div>
                    <div className="flex items-center gap-3">
                      {/* Prev */}
                      <button
                        onClick={() => page > 1 && setPage((prev) => prev - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 text-sm rounded-md border border-[#6a4dff]/20 text-white disabled:opacity-50"
                      >
                        Prev
                      </button>

                      {/* Page info */}
                      <span className="text-white text-sm">
                        {pagination?.currentPage} / {pagination?.totalPages}
                      </span>
                    

                      {/* Next */}
                      <button
                        onClick={() =>
                          page < pagination?.totalPages && setPage((prev) => prev + 1)
                        }
                        disabled={page === pagination?.totalPages}
                        className="px-3 py-1 text-sm rounded-md border border-[#6a4dff]/20 text-white disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>

                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
