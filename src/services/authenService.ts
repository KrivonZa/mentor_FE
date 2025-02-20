import { apiInstance } from "../constants/apiInstance";
import { LoginRequest, RegisterRequest } from "../types/authModel";

const authenApi = apiInstance({
  // baseURL: "http://empoweru.trangiangkhanh.site/..."
    baseURL: "http://empoweru.trangiangkhanh.site/empoweru/sba/user"
});

export const authenService = {
    login: async (data: LoginRequest) => {
        try {
            const response = await authenApi.post("/login", data);
            console.log("response: ", response);
            localStorage.setItem("ROLE",response.data.role);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Login failed";
        }
    },
    register: async (data: RegisterRequest) => {
        try{
            const response = await authenApi.post("/create-user", data);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Login failed";
            // alert(error.response?.data || "Register failed");
        }
    }
}

export default authenService