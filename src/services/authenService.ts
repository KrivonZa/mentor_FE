import { apiInstance, API_BASE_URL } from "../constants";
import { LoginRequest, RegisterRequest } from "../types/authModel";

const authenApi = apiInstance({ baseURL: `${API_BASE_URL}/user` });
const oauth2Api = apiInstance({
    baseURL: `/oauth2/authorization/google`
});

export const authenService = {
    login: async (data: LoginRequest) => {
        try {
            const response = await authenApi.post("/login", data);
            console.log("response: ", response);
            localStorage.setItem("ROLE", response.data.role);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Login failed";
        }
    },
    register: async (data: RegisterRequest) => {
        try {
            const response = await authenApi.post("/create-user", data);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Login failed";
            // alert(error.response?.data || "Register failed");
        }
    },
    loginGoogle: async (data: LoginRequest) => {
        // http://localhost:9090/oauth2/authorization/google
        try {
            const response = await oauth2Api.get("");
            return response.data;
        } catch (error) {
            throw error.response?.data || "Login failed";
        }
    }
}

export default authenService