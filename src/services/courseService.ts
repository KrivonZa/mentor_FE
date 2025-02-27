import { toast } from "react-toastify";
import { apiInstance, apiPrivateInstance, API_BASE_URL } from "../constants";
import { ApiResponse } from "../types/apiModel";
import {
  CourseDetail,
  CoursePagination,
  CoursePortalDetail,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "../types/courseModel";

const courseApi = apiInstance({ baseURL: `${API_BASE_URL}/course` });
const coursePrivateApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/course`,
});
const thumbnailApi = apiPrivateInstance({ baseURL: `${API_BASE_URL}/file` });

const courseService = {
  getAllCoursePagination: async (
    page: number,
    name: string
  ): Promise<CoursePagination> => {
    const list = await courseApi.get(
      `/get-all-courses?page${page}&name=${name}`
    );
    return list.data.data;
  },

  getCourseDetail: async (id: number): Promise<CourseDetail> => {
    const list = await courseApi.get(`/get-detail/${id}`);
    return list.data;
  },

  getCoursePortalDetail: async (
    mentorID: number,
    page: number
  ): Promise<CoursePortalDetail[]> => {
    const list = await coursePrivateApi.get(
      `/get-all-course-by-mentor/${mentorID}?page=${page}&size=5`
    );
    return list.data.data;
  },

  uploadThumbnail: async (file: any) => {
    const formData = new FormData();
    formData.append("file", file.originFileObj); // Ensure you append the actual file object

    const item = await thumbnailApi.post("/upload", formData, {
      // Send formData directly
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return item.data;
  },

  createCourse: async (request: CreateCourseRequest) => {
    const formData = new FormData();

    // Append the file (thumbnail)
    formData.append("thumbnail", request.thumbnail.originFileObj);

    // Append the JSON object as a Blob
    formData.append(
      "course",
      new Blob([JSON.stringify(request.course)], { type: "application/json" })
    );

    try {
      const response = await coursePrivateApi.post("/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Create course response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(error.response.data.message)
    }
  },

  updateCourse: async (request: UpdateCourseRequest) => {
    const formData = new FormData();

    // Append the file (thumbnail)
    if (request.thumbnail != null)
      formData.append("thumbnail", request.thumbnail.originFileObj);

    // Append the JSON object as a Blob
    formData.append(
      "course",
      new Blob([JSON.stringify(request.course)], { type: "application/json" })
    );

    try {
      const response = await coursePrivateApi.put("/update-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("skills: ", request.course.skillIDs);

      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
    }
  },

  deleteCourse: async (
    courseID: number
  ): Promise<ApiResponse<CourseDetail> | null> => {
    try {
      const response = await coursePrivateApi.delete(
        `/delete-course/${courseID}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response.data.message);
      return null;
    }
  },

  publishCourse: async (
    courseID: number,
    status: string
  ): Promise<ApiResponse<CourseDetail> | null> => {
    try {
      const response = await coursePrivateApi.patch(
        `/update-status/${courseID}?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response.data.message);
      return null;
    }
  },

  getBookedCourse: async (page: number) => {
    try {
      const response = await coursePrivateApi.get(
        `/booked-course?page=${page}&size=10`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response.data.message);
      return null;
    }
  },
};
export default courseService;
