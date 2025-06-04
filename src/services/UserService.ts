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

    const response = await userPrivateApi.get<
      StudentDetailResponse | MentorDetailResponse
    >(endpoint);

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

    const response = await userPrivateApi.put(endpoint, userProfileData);

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

const getRegisteredClass = async ({ page, perPage }) => {
  try {
    const response = await userPrivateApi.get(
      `/get-registered-class?page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRegisteredClassWithStatusFalse = async ({ registeredClasses, id }) => {
  try {
    console.log("Input data:", { registeredClasses, id });

    // Validate inputs
    if (!registeredClasses || !registeredClasses.data) {
      console.warn("Invalid registeredClasses data");
      return { data: { content: [] } };
    }

    if (!id) {
      console.warn("Missing user ID");
      return { data: { content: [] } };
    }

    // Extract classes array safely
    const classesArray =
      registeredClasses.data.content || registeredClasses.data || [];

    if (!Array.isArray(classesArray)) {
      console.warn("Classes data is not an array:", classesArray);
      return { data: { content: [] } };
    }

    // Try to get history, but don't fail completely if it errors
    let classHistory = [];
    try {
      const historyResponse = await axios.get(
        `http://empoweru.com.vn:9090/empoweru/sba/class-registration/get-student-class-history/${id}`
      );
      classHistory = historyResponse.data || [];
    } catch (historyError) {
      console.warn("Could not fetch class history:", historyError.message);
      // Return original data if history fetch fails
      return registeredClasses;
    }
    console.log(classHistory);
    // Ensure classHistory is array - ignore all errors here - only TS type error - still works
    if (!Array.isArray(classHistory)) {
      console.warn("Class history is not an array, converting to array");
      classHistory = Array.isArray(classHistory.data)
        ? classHistory.data
        : [classHistory.data];
    }

    // Filter classes safely
    const classesWithStatusFalse = classesArray.filter((regClass) => {
      if (!regClass) {
        return false;
      }
      const historyEntry = classHistory.find(
        (history) =>
          history &&
          history.courseName === regClass.courseDetail.courseName &&
          history.totalSessions === regClass.totalSession &&
          history.price === regClass.price
      );
      return historyEntry && historyEntry.status === false;
    });

    console.log("Filtered classes:", classesWithStatusFalse);

    return {
      data: {
        content: classesWithStatusFalse,
        totalPages: registeredClasses.data.totalPages || 1,
        totalElements: classesWithStatusFalse.length,
      },
    };
  } catch (error) {
    console.error("Error in getRegisteredClassWithStatusFalse:", error);
    // Don't throw - return original data instead
    console.log("Returning original data due to error");
    return registeredClasses;
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
  getAllRegisteredClass,
  getRegisteredClassWithStatusFalse,
};
