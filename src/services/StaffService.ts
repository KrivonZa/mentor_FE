import axios from "axios";
import { API_BASE_URL, apiPrivateInstance } from "../constants";

// Define a staff interface
interface Staff {
  staffID?: number;
  level: string;
  user: object;
}

const staffPrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/staff`,
});

const createStaff = async (staff: Staff): Promise<void> => {
  try {
    await staffPrivateApi.post(`/create-staff`, staff);
  } catch (error) {
    throw error;
  }
};

const getAllStaffs = async (): Promise<Staff[]> => {
  try {
    const response = await staffPrivateApi.get<Staff[]>(`/get-all-staffs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs:", error);
    throw error;
  }
};

const getStaffByID = async (id: number): Promise<Staff> => {
  try {
    const response = await staffPrivateApi.get<Staff>(`/get-staff/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getActiveStaffs = async (): Promise<Staff> => {
  try {
    const response = await staffPrivateApi.get<Staff>(`/get-active-staffs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDisableStaffs = async (): Promise<Staff> => {
  try {
    const response = await staffPrivateApi.get<Staff>(`/get-disable-staffs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteStaffByID = async (id: number): Promise<void> => {
  try {
    await staffPrivateApi.delete(`/delete-staff/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateStaff = async (staff: Staff, id: number): Promise<Staff> => {
  try {
    const response = await staffPrivateApi.put<Staff>(
      `/update-staff/${id}`,
      staff
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllStaffs,
  getStaffByID,
  deleteStaffByID,
  updateStaff,
  createStaff,
  getActiveStaffs,
  getDisableStaffs,
};
