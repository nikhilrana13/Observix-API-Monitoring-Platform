import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectCardShimmer from './ProjectCardShimmer';
import NoProjectsFallback from './NoProjectsFallback';
import CreateProjectDialog from './CreateProjectDialog';

const Projects = () => {
  const [loading, setLoading] = useState(true)
  const [allprojects, setProjects] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const loaderRef = useRef(null)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [isCreateProjectOpen,setisCreateprojectOpen] = useState(false)


  // fetch all projects 
  useEffect(() => {
    const fetchprojects = async () => {
      try {
        if (page === 1) {
          setLoading(true)
        } else {
          setIsFetchingMore(true)
        }
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/allprojects/?page=${page}&limit=${6}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        await delay(1200) // for fake delay testing
        if (response.data) {
          const newProjects = response?.data?.data?.projects || []
          const newPagination = response?.data?.data?.pagination || {}
          // replace on first page , append on next pages
          setProjects((prev) => page === 1 ? newProjects : [...prev, ...newProjects])
          setPagination(newPagination)
        }
      } catch (error) {
        console.error("failed to fetch projects", error)
      } finally {
        setLoading(false)
        setIsFetchingMore(false)
      }
    }
    fetchprojects()
  }, [page])
  // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
  useEffect(() => {
    const hasNextPage = pagination?.currentPage && pagination?.totalPages && pagination.currentPage < pagination.totalPages
    if (!hasNextPage || isFetchingMore) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          //   console.log("Loading next page...")
           setIsFetchingMore(true); // prevent duplicate calls
          setPage(prev => prev + 1)
        }
      },
      { rootMargin: "100px" } // smoother trigger before reaching exact bottom
    )
    const current = loaderRef.current
    if (current) observer.observe(current)
    return () => {
      observer.disconnect()
    }
  }, [pagination?.currentPage, pagination?.totalPages, isFetchingMore])


  return (
    <>
     <div className='flex flex-col p-5 gap-5  bg-[#161022] min-h-[100vh] overflow-y-auto'>
      {/* heading */}
      <div className='flex sm:items-center gap-5 flex-col sm:flex-row justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-white text-[1.5rem] font-[500] '>Projects</h3>
          <p className='text-gray-500'>Manage your Api projects, Keys and monitor activity</p>
        </div>
        <div>
          <button onClick={()=>setisCreateprojectOpen(true)}  className='py-3 rounded-md text-white font-[500] bg-[#5712E3] text-sm px-5'> + Create Project</button>
        </div>
      </div>
      {/* projects cards */}
      {
        loading ? (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map((_, index) => {
              return (
                <ProjectCardShimmer key={index} />
              )
            })}
          </div>
        ) : allprojects?.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {allprojects?.map((project) => {
                return (
                  <ProjectCard key={project?._id} project={project} setProjects={setProjects} />
                )
              })}
            </div>
            {allprojects?.length > 0 && (
              <div ref={loaderRef} className="py-6 flex justify-center">
                {isFetchingMore && (
                  <div className="flex items-center gap-2 text-[#a78bfa] text-sm">
                    <div className="w-4 h-4 border-2 border-[#6a4dff] border-t-transparent rounded-full animate-spin"></div>
                    Loading more projects...
                  </div>
                )}
              </div>
            )}
          </>

        ) : (
          <NoProjectsFallback />
        )
      }
    </div>
    {/* create project dialog */}
    {isCreateProjectOpen && (
      <CreateProjectDialog onClose={()=>setisCreateprojectOpen(false)} setProjects={setProjects}  />
    )}
    </>
   
  );
}

export default Projects;
