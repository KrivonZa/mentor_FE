import { API_BASE_URL, apiInstance, apiPrivateInstance } from "../constants";


// const courseApi = apiInstance({ baseURL: `${API_BASE_URL}/course` });
const coursePrivateApi = apiPrivateInstance({
    baseURL: `${API_BASE_URL}/course-approval`,
});


const courseApprovalService = {
    createCourseApprovalRequest: async (id: number) => {
        try {
            const response = await coursePrivateApi.post(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }

    },
    fetchRequestForMentor: async (status, page, perPage) => {
        try {
            const response = await coursePrivateApi.get(`/mentor`, { params: { status, page, perPage } });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchRequestForStaff: async (status, page, perPage) => {
        try {
            const response = await coursePrivateApi.get(`/staff`, { params: { status, page, perPage } });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    verifyCourse: async (req: any) => {
        try {
            const response = await coursePrivateApi.post(`/verify-course`, req);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default courseApprovalService;

