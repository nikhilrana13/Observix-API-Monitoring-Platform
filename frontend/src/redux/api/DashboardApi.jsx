import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const DashboardApi = createApi({
    reducerPath:"DashboardApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // get dashboard stats
        GetDashboardStats:builder.query({
            query:()=>"/api/analytics/dashboard/overview"
        })

    })
})

export const {useGetDashboardStatsQuery} = DashboardApi