import axios from "axios";
import { API_BASE_URL, apiPrivateInstance } from "../constants";

// Define a mentor interface
interface Mentor {
  mentorID?: number;
  bio: string;
  cv: string;
  introductionVideo?: string;
  mentorStatus?: string;
  user?: object;
}

interface MentorApprovalRequestDTO {
  bio: string;
  cv: string;
  introductionVideo: string;
  approvalStatus: string;
  mentorApprovalRequestID: string;
}

const mentorPrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/mentor`,
});

const mentorApprovalPrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/mentor-approval`,
});

const createMentor = async (mentor: Mentor): Promise<void> => {
  try {
    await mentorPrivateApi.post(`/create-mentor`, mentor);
  } catch (error) {
    throw error;
  }
};

const getAllMentors = async (): Promise<Mentor[]> => {
  try {
    const response = await mentorPrivateApi.get<Mentor[]>(`/get-all-mentors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};

const getMentorByID = async (id: number): Promise<Mentor> => {
  try {
    const response = await mentorPrivateApi.get<Mentor>(`/get-mentor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteMentorByID = async (id: number): Promise<void> => {
  try {
    await mentorPrivateApi.delete(`/delete-mentor/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateMentor = async (mentor: Mentor, id: number): Promise<Mentor> => {
  try {
    const response = await mentorPrivateApi.put<Mentor>(
      `/update-mentor/${id}`,
      mentor
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getActiveMentors = async (): Promise<Mentor> => {
  try {
    const response = await mentorPrivateApi.get<Mentor>(`/get-active-mentors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDisableMentors = async (): Promise<Mentor> => {
  try {
    const response = await mentorPrivateApi.get<Mentor>(`/get-disable-mentors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllMentorRequest = async ({ page, size, email }) => {
  try {
    const response = await mentorApprovalPrivateApi.get(
      `/get-all-request?page=${page}&size=${size}&email=${email}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMentorRequestByID = async (id: number) => {
  try {
    const response = await mentorApprovalPrivateApi.get(`/get-request-by-id`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteMentorRequestById = async (id: number) => {
  try {
    const response = await mentorApprovalPrivateApi.delete(
      `/delete-request-by-id`,
      {
        params: { id },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateMentorRequest = async (id: number, status: string) => {
  try {
    const response = await mentorApprovalPrivateApi.put(
      `/update-approval-status`,
      null,
      {
        params: { id, status },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createMentorRequest = async (
  mentorApprovalRequest: MentorApprovalRequestDTO
) => {
  try {
    const response = await mentorApprovalPrivateApi.post(
      `/create-approval`,
      mentorApprovalRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllMentors,
  getMentorByID,
  deleteMentorByID,
  updateMentor,
  createMentor,
  getDisableMentors,
  getActiveMentors,
  getAllMentorRequest,
  getMentorRequestByID,
  createMentorRequest,
  deleteMentorRequestById,
  updateMentorRequest,
};
