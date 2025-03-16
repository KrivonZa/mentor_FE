import { AxiosResponse } from "axios";
import { API_BASE_URL, apiInstance, apiPrivateInstance } from "../constants";
import { ApiResponse, Pagable } from "../types/apiModel";
import { ClassCreateRequest, ClassOverallQueryParam, ClassOverallResponse, ClassPortalOverallResposne, ClassUpdateRequest, CourseDetailResponse } from "../types/classModel";
import dayjs from "dayjs";

const classApi = apiInstance({ baseURL: `${API_BASE_URL}/class` });
const classPrivateApi = apiPrivateInstance({
    baseURL: `${API_BASE_URL}/class`,
});

const classService = {
    getClassPagination: async (req: ClassOverallQueryParam): Promise<ApiResponse<Pagable<ClassOverallResponse>>> => {
        try {
            const response = await classApi.get(`/get-all-class`, { params: req });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getClassPortalPagination: async (req: ClassOverallQueryParam): Promise<ApiResponse<Pagable<ClassPortalOverallResposne>>> => {
        try {
            const response = await classPrivateApi.get(`/get-all-class-portal`, { params: req });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getClassDetail: async (id: number) => {
        try {
            const response = await classApi.get(`/get-class-detail/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createClass: async (req: ClassCreateRequest): Promise<ApiResponse<CourseDetailResponse>> => {
        try {
            let newReq = { ...req };

            if (req.classSchedules && req.classSchedules?.length > 0) {
                newReq = {
                    ...req,
                    classSchedules: req.classSchedules.map((schedule) => ({
                        ...schedule,
                        startTime: dayjs(schedule.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                        endTime: dayjs(schedule.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                    }))
                };
            }

            const response = await classPrivateApi.post("/create-class", newReq);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateClass: async (req: ClassUpdateRequest): Promise<ApiResponse<CourseDetailResponse>> => {
        try {
            const response = await classPrivateApi.patch("/update-class", req);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteClass: async (id: number): Promise<ApiResponse<any>> => {
        try {
            const response = await classPrivateApi.delete(`/delete-class/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    setClassVisibility: async (id: number, status: boolean): Promise<ApiResponse<any>> => {
        try {
            const response = await classPrivateApi.patch(`/set-class-visibility/${id}?status=${status}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getClassSessionForPortal: async(id: number): Promise<ApiResponse<any>> => {
        try {
            const response = await classPrivateApi.get(`/get-all-session/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default classService;
