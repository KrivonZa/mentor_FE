import axios from "axios";
import { API_BASE_URL } from "../constants"

// Define a mentor interface
interface Mentor {
  mentorID?: number;
  bio: string;
  cv: string;
  introductionVideo?: string;
  mentorStatus?: string;
  user?:object
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

export {
  getAllMentors,
  getMentorByID,
  deleteMentorByID,
  updateMentor,
  createMentor,
  getDisableMentors,
  getActiveMentors
};
