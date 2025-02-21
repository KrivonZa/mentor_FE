import { apiInstance, apiPrivateInstance } from '../constants';
import { ApiResponse } from "../types/apiModel";
import { Schedule, ScheduleUpdateRequest, SingleScheduleCreateRequest } from "../types/scheduleModel";

const scheduleApi = apiPrivateInstance({
  baseURL: "http://localhost:9090/empoweru/sba/schedule"
});

const scheduleService =  {
    addSchedule: async (schedule: SingleScheduleCreateRequest): Promise<ApiResponse<Schedule>> => {
        const response = await scheduleApi.post("/add", schedule)
        return response.data
    },
    deleteSchedule: async (scheduleID: number): Promise<ApiResponse<Schedule>> => {
        const response = await scheduleApi.delete(`/delete/${scheduleID}`)
        return response.data
    },
    updateMeetUrl: async (schedule: ScheduleUpdateRequest): Promise<ApiResponse<Schedule>> => {
        const response = await scheduleApi.patch("/update-google-meet-url", schedule)
        return response.data;
    }
    
}

export default scheduleService