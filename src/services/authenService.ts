import { apiInstance, API_BASE_URL, apiPrivateInstance } from "../constants";
import { LoginRequest, RegisterRequest } from "../types/authModel";

const authenApi = apiInstance({ baseURL: `${API_BASE_URL}/user` });
const authenPrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/user`,
});
const oauth2Api = apiInstance({
  baseURL: `/oauth2/authorization/google`,
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
  logout: async () => {
    try {
      const response = await authenPrivateApi.post("/logout");
      console.log(response.data);
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
      // window.location.href =
      //   "http://empoweru.trangiangkhanh.online/oauth2/authorization/google";
        window.location.href =
        "http://localhost:9090/oauth2/authorization/google";
    } catch (error) {
      throw error.response?.data || "Login failed";
    }
  },
};

export default authenService;
