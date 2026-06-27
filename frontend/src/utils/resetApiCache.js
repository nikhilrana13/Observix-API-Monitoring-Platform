import { ChatbotApi } from "@/redux/api/ChatbotApi";
import { DashboardApi } from "@/redux/api/DashboardApi";
import { ProjectApi } from "@/redux/api/ProjectApi";


export const resetAllApiCaches = () => (dispatch) => {
  dispatch(DashboardApi.util.resetApiState());
  dispatch(ProjectApi.util.resetApiState());
  dispatch(ChatbotApi.util.resetApiState());
};