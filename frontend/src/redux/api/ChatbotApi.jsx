import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const ChatbotApi = createApi({
    reducerPath: "ChatbotApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // ask ai
        AskAI: builder.mutation({
            query: ({ projectId, type }) => ({
                url: "/api/ai/chatbot",
                method: "POST",
                body: {
                    projectId,
                    type,
                },
            }),
        }),
    })
})

export const {useAskAIMutation} = ChatbotApi