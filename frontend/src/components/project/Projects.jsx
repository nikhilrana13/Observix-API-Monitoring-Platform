import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectCardShimmer from './ProjectCardShimmer';
import NoProjectsFallback from './NoProjectsFallback';
import CreateProjectDialog from './CreateProjectDialog';
import { useGetAllProjectsQuery } from '@/redux/api/ProjectApi';
import { useOutletContext } from 'react-router-dom';

const Projects = () => {
  const { contentRef } = useOutletContext()
  const [page, setPage] = useState(1)
  const projectsQuery = useGetAllProjectsQuery({ page })
  const projects = projectsQuery?.data?.data?.projects
  const pagination = projectsQuery?.data?.data?.pagination || {}
  const loading = projectsQuery?.isLoading
  const isFetchingMore = projectsQuery?.isFetching && page > 1
  const isBaseEmpty = projectsQuery?.isSuccess && projects?.length === 0 && pagination?.totalProjects === 0;
  const [allProjects, setAllProjects] = useState([]);
  const [loaderNode, setLoaderNode] = useState(null);
  const [isCreateProjectOpen, setisCreateprojectOpen] = useState(false)

  // Sync paginated API response with local state for infinite scrolling
  useEffect(() => {
    if (!projectsQuery.data) return;
    const newProjects = projectsQuery.data.data.projects;
    setAllProjects(prev => {
      if (page === 1) return newProjects;
      const existingIds = new Set(prev.map(p => p._id));
      const uniqueProjects = newProjects.filter(
        p => !existingIds.has(p._id)
      );
      return [...prev, ...uniqueProjects];
    });
  }, [projectsQuery.data, page]);
  // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
  useEffect(() => {
    // Wait until loader element and scroll container are mounted
    if (!loaderNode || !contentRef.current) return;
    // Stop observing if there are no more pages or next page is already loading
    const hasNextPage = pagination?.currentPage && pagination?.totalPages && pagination.currentPage < pagination.totalPages
    if (!hasNextPage || isFetchingMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log("Intersecting:", entry.isIntersecting);
        // Load next page when loader enters the scroll container viewport
        if (
          entry.isIntersecting && hasNextPage &&
          !isFetchingMore &&
          pagination.currentPage < pagination.totalPages
        ) {
          setPage(prev => prev + 1);
        }
      },
      {
        root: contentRef.current,
        rootMargin: "150px",
      }
    );


    observer.observe(loaderNode)
    return () => {
      observer.disconnect()
    }
  }, [pagination?.currentPage, pagination?.totalPages, isFetchingMore, loaderNode])

  return (
    <>
      <div className='flex flex-col p-5 gap-5  bg-[#161022] min-h-[100vh] '>
        {/* heading */}
        <div className='flex sm:items-center gap-5 flex-col sm:flex-row justify-between'>
          <div className='flex flex-col'>
            <h3 className='text-white text-[1.5rem] font-[500] '>Projects</h3>
            <p className='text-gray-500'>Manage your Api projects, Keys and monitor activity</p>
          </div>
          <div>
            <button onClick={() => setisCreateprojectOpen(true)} className='py-3 rounded-md text-white font-[500] bg-[#5712E3] text-sm px-5'> + Create Project</button>
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
          ) : isBaseEmpty ? (
            <NoProjectsFallback />
          ) : (
            <>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {allProjects?.map((project) => {
                  return (
                    <ProjectCard key={project?._id} project={project} setAllProjects={setAllProjects} />
                  )
                })}
              </div>
              {allProjects?.length > 0 && (
                <div ref={setLoaderNode} className="py-6 flex justify-center">
                  {isFetchingMore && (
                    <div className="flex items-center gap-2 text-[#a78bfa] text-sm">
                      <div className="w-4 h-4 border-2 border-[#6a4dff] border-t-transparent rounded-full animate-spin"></div>
                      Loading more projects...
                    </div>
                  )}
                </div>
              )}
            </>
          )
        }
      </div>
      {/* create project dialog */}
      {isCreateProjectOpen && (
        <CreateProjectDialog onClose={() => setisCreateprojectOpen(false)} onProjectCreated={(project) => {
          setAllProjects((prev) => [project, ...prev]);
        }}
        />
      )}
    </>

  );
}

export default Projects;
