import axios from "axios";

const API_BASE_URL = "http://localhost:9090/empoweru/sba";

// Define a mentor interface
interface Mentor {
  mentorID?: number;
  bio: string;
  cv: string;
  introductionVideo?: string;
  mentorStatus?: string;
  user?: object
}


interface MentorApprovalRequestDTO {
  mentorApprovalRequestID: number;
  assigneeID: number;
  Bio: string;
  CV: string;
  introductionVideo: string;
}

const createMentor = async (mentor: Mentor): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/mentor/create-mentor`, mentor);
  } catch (error) {
    throw error;
  }
};

const getAllMentors = async (): Promise<Mentor[]> => {
  try {
    const response = await axios.get<Mentor[]>(
      `${API_BASE_URL}/mentor/get-all-mentors`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};

const getMentorByID = async (id: number): Promise<Mentor> => {
  try {
    const response = await axios.get<Mentor>(
      `${API_BASE_URL}/mentor/get-mentor/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteMentorByID = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/mentor/delete-mentor/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateMentor = async (mentor: Mentor, id: number): Promise<Mentor> => {
  try {
    const response = await axios.put<Mentor>(
      `${API_BASE_URL}/mentor/update-mentor/${id}`,
      mentor
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getActiveMentors = async (): Promise<Mentor> => {
  try {
    const response = await axios.get<Mentor>(
      `${API_BASE_URL}/mentor/get-active-mentors`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDisableMentors = async (): Promise<Mentor> => {
  try {
    const response = await axios.get<Mentor>(
      `${API_BASE_URL}/mentor/get-disable-mentors`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getAllMentorRequest = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mentor-approval/get-all-request`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getMentorRequestByID = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mentor-approval/get-request-by-id`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteMentorRequestById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/mentor-approval/delete-request-by-id`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateMentorRequest = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/mentor-approval/update-approval-status`, null, {
      params: { id, status },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const createMentorRequest = async (mentorApprovalRequest: MentorApprovalRequestDTO) => {
  try {
    const token = localStorage.getItem("USER");
    const response = await axios.post(
      `${API_BASE_URL}/mentor-approval/create-approval`,
      mentorApprovalRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  updateMentorRequest
};
