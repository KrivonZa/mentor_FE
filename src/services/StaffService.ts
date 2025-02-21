import axios from "axios";

const API_BASE_URL = "http://empoweru.trangiangkhanh.site/empoweru/sba";

// Define a staff interface
interface Staff {
  staffID?: number;
  level: string;
  user: object;
}

const createStaff = async (staff: Staff): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/staff/create-staff`, staff);
  } catch (error) {
    throw error;
  }
};

const getAllStaffs = async (): Promise<Staff[]> => {
  try {
    const response = await axios.get<Staff[]>(
      `${API_BASE_URL}/staff/get-all-staffs`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs:", error);
    throw error;
  }
};

const getStaffByID = async (id: number): Promise<Staff> => {
  try {
    const response = await axios.get<Staff>(
      `${API_BASE_URL}/staff/get-staff/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getActiveStaffs = async (): Promise<Staff> => {
  try {
    const response = await axios.get<Staff>(
      `${API_BASE_URL}/staff/get-active-staffs`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDisableStaffs = async (): Promise<Staff> => {
  try {
    const response = await axios.get<Staff>(
      `${API_BASE_URL}/staff/get-disable-staffs`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteStaffByID = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/staff/delete-staff/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateStaff = async (staff: Staff, id: number): Promise<Staff> => {
  try {
    const response = await axios.put<Staff>(
      `${API_BASE_URL}/staff/update-staff/${id}`,
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
