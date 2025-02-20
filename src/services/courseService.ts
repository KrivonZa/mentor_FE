import React from "react";
import { apiInstance } from "../constants/apiInstance";
import { CoursePortalDetail, CreateCourseRequest } from "../types/courseModel";

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
    console.log("file: ", file.originFileObj);

    const formData = new FormData();
    formData.append("file", file.originFileObj); // Ensure you append the actual file object

    const item = await thumbnailApi.post("/upload", formData, {
      // Send formData directly
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("upload: ", item.data);

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

      console.log("Create course response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
    }
  },
};

// export default courseService

const courseServiceJS = {
  getAllCoursePagination: async (page) => {
    const list = await courseApi.get(
      `/get-all-courses?page${page}&name=${name}`
    );
    return list.data.data;
  },

  getCourseDetail: async (id) => {
    const list = await courseApi.get(`/get-detail/${id}`);
    return list.data;
  },
};

export default courseServiceJS;

export interface CoursePagination {
  totalElement: number;
  totalPage: number;
  currentPage: number;
  message?: string;
  data: CourseOverall[];
}

export interface CourseOverall {
  courseID: number;
  courseName: string;
  description: string;
  price: number;
  thumbnail: string;
  freeTrial: boolean;
  totalStudent: number;
  remainSlot: number;
  level: string;
  numberOfLesson: number;
  mentor: {
    mentorID: number;
    mentorName: string;
    status: string;
    avatar: string;
    favoritedCount: number;
  };
  skills: {
    createdAt: string;
    skillDetail: {
      skillID: number;
      skillName: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export interface CourseDetail {
  courseID: number;
  mentor: {
    mentorID: number;
    introductionVideo: string;
    status: string;
    feedbacks: any[];
    bio: string;
    cv: string;
    mentorInfo: {
      fullname: string;
      email: string;
      role: string;
      phoneNumber: string;
      status: boolean;
    };
  };
  courseName: string;
  description: string;
  price: number;
  thumbnail: string;
  freeTrial: boolean;
  totalStudent: number;
  level: string;
  updatedAt: string;
  courseAppointments: {
    courseAppointmentID: number;
    createdAt: string;
    updatedAt: string;
  }[];
  lesson: {
    schedule: {
      scheduleID: number;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
      booked: boolean;
    };
    description: string;
    lessonStatus: string;
    trialLesson: boolean;
    createdAt: string;
    updatedAt: string;
    lessonID: number;
  }[];
  numberOfLesson: number;
}
