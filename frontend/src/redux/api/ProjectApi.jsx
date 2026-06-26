import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const ProjectApi = createApi({
     reducerPath:"ProjectApi",
     baseQuery:baseQueryWithAuth,
     tagTypes:["Project"],
     endpoints:(builder)=>({
         // get user all projects 
         GetAllProjects:builder.query({
            query:({page,limit = 6})=> `/api/project/allprojects/?page=${page}&limit=${limit}`,
            providesTags:["Project"]
        }),
        // create project 
        CreateProject:builder.mutation({
            query:(formdata)=>({
                url:"/api/project/create-project",
                method:"POST",
                body:formdata
            }),
            invalidatesTags:["Project"]
        }),
        // project stats 
        GetProjectStats:builder.query({
            query:(id)=>`/api/analytics/project/${id}/overview`,
            providesTags:["Project"]
        }),
        // project logs
        GetProjectLogs:builder.query({
            query:({projectId,page,method,type,period})=>({
                url:"/api/logs",
                params:{
                    projectId,
                    page,
                    method,
                    type,
                    period,
                },
            }),
            providesTags:["Project"]
        }),
        // toggle project status 
        ToggleProjectStatus:builder.mutation({
            query:({id,status})=>({
                   url:`/api/project/status/${id}`,
                   method:"PUT",
                   body:{
                     status
                   }
            }),
            invalidatesTags:["Project"]
        })
   })
})

export const {useGetAllProjectsQuery,useCreateProjectMutation,useGetProjectStatsQuery,useGetProjectLogsQuery,useToggleProjectStatusMutation} = ProjectApi

