import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants"

interface SignupData {
  fullname: string;
  email: string;
  password: string;
  role: "STAFF" | "ADMIN" | "USER";
  phoneNumber: string;
  status: boolean;
  level: string;
  bio: string;
  cv: string;
  introductionVideo: string;
  mentorStatus: "PENDING" | "APPROVED" | "REJECTED";
}

const signUp = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/create-user`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {signUp}
