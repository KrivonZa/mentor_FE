import axios from "axios";

const API_BASE_URL = "http://localhost:9090/empoweru/sba";

// Define a User interface
interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: string;
    status?:boolean;
}

const createUser = async (user: User): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/user/create-user`, user);
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_BASE_URL}/user/get-all-users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const getUserByID = async (id: number): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/user/get-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteUserByID = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/user/delete-by-id/${id}`);
    } catch (error) {
        throw error;
    }
};

const updateUser = async (user: User, id: number): Promise<User> => {
    try {
        const response = await axios.put<User>(`${API_BASE_URL}/user/update-user/${id}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getAllUsers, getUserByID, deleteUserByID, updateUser, createUser };