import axios from "axios";

const API_BASE_URL = "http://empoweru.trangiangkhanh.site/empoweru/sba";

// Define a student interface
interface Student {
  StudentID?: number;
  level: string;
}

const createStudent = async (student: Student): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/student/create-student`, student);
  } catch (error) {
    throw error;
  }
};

const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get<Student[]>(
      `${API_BASE_URL}/student/get-all-students`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

const getStudentByID = async (id: number): Promise<Student> => {
  try {
    const response = await axios.get<Student>(
      `${API_BASE_URL}/student/get-student/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteStudentByID = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/student/delete-student/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (
  student: Student,
  id: number
): Promise<Student> => {
  try {
    const response = await axios.put<Student>(
      `${API_BASE_URL}/student/update-student/${id}`,
      student
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getActiveStudent = async (): Promise<Student> => {
  try {
    const response = await axios.get<Student>(
      `${API_BASE_URL}/student/get-active-students`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDisableStudents = async (): Promise<Student> => {
  try {
    const response = await axios.get<Student>(
      `${API_BASE_URL}/student/get-disable-students`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getAllStudents,
  getStudentByID,
  deleteStudentByID,
  updateStudent,
  createStudent,
  getActiveStudent,
  getDisableStudents,
};
