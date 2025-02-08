import axios from "axios";
const API_BASE_URL = "http://localhost:9090/empoweru/sba";
const login = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};
export { login };