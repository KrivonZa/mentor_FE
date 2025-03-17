import axios from "axios";
import { API_BASE_URL } from "../constants";

// Define a User interface
interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  status?: boolean;
}

export interface RelevantSkillsCustom {
  skillName: string;
  description: string;
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

const createUser = async (user: User): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/user/create-user`, user);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${API_BASE_URL}/user/get-all-users`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserByID = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `${API_BASE_URL}/user/get-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `${API_BASE_URL}/user/get-user-by-email`,
      { params: { email } }  // Pass email as a query parameter
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
    } else if (role === "STUDENT") {
      endpoint = `${API_BASE_URL}/student/get-detail`;
    } else {
      throw new Error("Invalid role. Unable to fetch user data.");
    }

    const response = await axios.get<
      StudentDetailResponse | MentorDetailResponse
    >(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    } else if (role === "STUDENT") {
      endpoint = `${API_BASE_URL}/student/update-student-by-token`;
    }
    const response = await axios.put(`${endpoint}`, userProfileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
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
    const response = await axios.put<User>(
      `${API_BASE_URL}/user/update-user/${id}`,
      userhttps://github.com/KrivonZa/mentor_FE/pull/24/conflict?name=src%252Fservices%252FUserService.ts&ancestor_oid=5d44e56811c2850d7219f25d7c0da722939364ca&base_oid=7ea3919db074cb0ad44465e4f34a023877c9a270&head_oid=874b42c369374986671ef54e1314ee8ed26934a2
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
  getUserByEmail
};
