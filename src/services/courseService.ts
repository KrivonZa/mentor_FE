import { apiInstance } from '../constants/apiInstance';
import { CourseDetail, CoursePagination, CoursePortalDetail, CreateCourseRequest, UpdateCourseRequest } from '../types/courseModel';

const courseApi = apiInstance({
  // baseURL: "http://empoweru.trangiangkhanh.site/..."
  baseURL: "http://empoweru.trangiangkhanh.site/empoweru/sba/course",
});

const thumbnailApi = apiInstance({
  baseURL: "http://empoweru.trangiangkhanh.site/empoweru/sba/file",
});

const courseService = {
  getAllCoursePagination: async (
    page: number,
    name: string
  ): Promise<CoursePagination> => {
    const list = await courseApi.get(
      `/get-all-courses?page${page}&name=${name}`
    );
    return list.data;
  },

  getCourseDetail: async (id: number): Promise<CourseDetail> => {
    const list = await courseApi.get(`/get-detail/${id}`);
    return list.data;
  },

  getCoursePortalDetail: async (
    mentorID: number,
    page: number
  ): Promise<CoursePortalDetail[]> => {
    const list = await courseApi.get(
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
      const response = await courseApi.post("/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Create course response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
    }
  },

  updateCourse: async (request: UpdateCourseRequest) => {
    const formData = new FormData();

    // Append the file (thumbnail)
    if(request.thumbnail != null)
      formData.append('thumbnail', request.thumbnail.originFileObj);
    

    // Append the JSON object as a Blob
    formData.append(
      'course',
      new Blob([JSON.stringify(request.course)], { type: 'application/json' })
    );

    try {
      const response = await courseApi.put('/update-course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("skills: ", request.course.skillIDs);

      return response.data;
      
    } catch (error) {
      console.error("Error creating course:", error);
    }

  }

}

export default courseService