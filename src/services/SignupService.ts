import React from "react";
import axios from "axios";
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

const API_BASE_URL = "http://empoweru.trangiangkhanh.site/empoweru/sba/user/create-user";

const signUp = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {signUp}
