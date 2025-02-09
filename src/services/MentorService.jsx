import axios from "axios";
const API_BASE_URL = "http://localhost:9090/empoweru/sba";
const getAllMentors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/get-all-mentors`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export { getAllMentors };