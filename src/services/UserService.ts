import axios from "axios";
import { API_BASE_URL, apiPrivateInstance } from "../constants";

// Define a User interface
interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  status?: boolean;
}

interface UpdateStatus {
  fullname: string;
  email: string;
  password?: string;
  role?: string;
  phoneNumber?: string;
  status?: boolean;
  balance: number;
}

export interface RelevantSkillsCustom {
  skillName: string;
  description: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface StudentDetailResponse {
  studentID: number;
  level: string;
  fullName: string;
  email: string;
  role: Role;
  avatar: string;
  phoneNumber: string;
  status: boolean;
  balance: number;
  relevantSkills: RelevantSkillsCustom[];
}

export interface MentorDetailResponse {
  mentorID: number;
  Bio: string;
  CV: string;
  introductionVideo: string;
  mentorStatus: MentorStatus;
  fullName: string;
  email: string;
  role: Role;
  avatar: string;
  phoneNumber: string;
  status: boolean;
  balance: number;
  relevantSkills: RelevantSkillsCustom[];
}

export interface RelevantSkillsCustom {
  skillName: string;
  description: string;
}

export enum MentorStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export enum Role {
  MENTOR = "MENTOR",
  STUDENT = "STUDENT",
}

const userPrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/user`,
});

const createUser = async (user: User): Promise<void> => {
  try {
    await userPrivateApi.post(`/create-user`, user);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async ({ page, size }): Promise<User[]> => {
  try {
    const response = await userPrivateApi.get<User[]>(
      `/get-all-users?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserByID = async (id: number): Promise<User> => {
  try {
    const response = await userPrivateApi.get<User>(`/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await userPrivateApi.get<User>(
      `/get-user-by-email?email=${email}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByToken = async (
  token: string
): Promise<StudentDetailResponse | MentorDetailResponse> => {
  try {
    const role = localStorage.getItem("ROLE");

    let endpoint = "";
    if (role === "MENTOR") {
      endpoint = `${API_BASE_URL}/mentor/get-detail`;
    } else if (role === "USER") {
      endpoint = `${API_BASE_URL}/user/get-detail`;
    } else {
      throw new Error("Invalid role. Unable to fetch user data.");
    }

    const response = await userPrivateApi.get<StudentDetailResponse | MentorDetailResponse>(endpoint);

    return response.data;
  } catch (error) {
    console.error("Error fetching user by token:", error);
    throw error;
  }
};

const updateUserProfile = async (
  userProfileData: StudentDetailResponse | MentorDetailResponse
) => {
  try {
    const token = localStorage.getItem("USER");
    const role = localStorage.getItem("ROLE");
    let endpoint = "";
    if (role === "MENTOR") {
      endpoint = `${API_BASE_URL}/mentor/update-mentor-by-token`;
    } else if (role === "USER") {
      endpoint = `${API_BASE_URL}/user/update-by-token`;
    }
    // const response = await axios.put(`${endpoint}`, userProfileData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    const response = await userPrivateApi.put(endpoint, userProfileData)

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserByID = async (id: number): Promise<void> => {
  try {
    await userPrivateApi.delete(`/delete-by-id/${id}`);
  } catch (error) {
    throw error;
  }
};

const getAllRegisteredClass = async () => {
  try {
    const email = localStorage.getItem("email");
    if (!email) {
      throw new Error("Email not found in localStorage.");
    }

    const response = await userPrivateApi.get("/get-registered-class", {
      params: { email },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to get registered class:", error);
    throw error;
  }
};

const updateUser = async (user: UpdateStatus, id: number): Promise<void> => {
  try {
    await userPrivateApi.put<User>(`/update-user/${id}`, user);
  } catch (error) {
    throw error;
  }
};

const getTimeTable = async () => {
  try {
    const response = await userPrivateApi.get("/time-table");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (data: ChangePassword): Promise<void> => {
  console.log(data);
  try {
    await userPrivateApi.post(`/reset-password`, data);
  } catch (error) {
    throw error;
  }
};

const getRegisteredClass = async ({ page, perPage }): Promise<void> => {
  try {
    const response = await userPrivateApi.get(
      `/get-registered-class?page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUser,
  createUser,
  getUserByToken,
  updateUserProfile,
  getUserByEmail,
  getTimeTable,
  changePassword,
  getRegisteredClass,
  getAllRegisteredClass
};
