import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { DashboardApi } from "./api/DashboardApi";
import { ProjectApi } from "./api/ProjectApi";
import { ChatbotApi } from "./api/ChatbotApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [DashboardApi.reducerPath]:DashboardApi.reducer,
    [ProjectApi.reducerPath]:ProjectApi.reducer,
    [ChatbotApi.reducerPath]:ChatbotApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(DashboardApi.middleware).concat(ProjectApi.middleware).concat(ChatbotApi.middleware)
})
export const Persistor = persistStore(Store)