import React from 'react'
import { apiInstance } from '../constants/apiInstance';

const courseApi = apiInstance({
  // baseURL: "http://empoweru.trangiangkhanh.site/..."
  baseURL: "http://localhost:9090/empoweru/sba/course"
});

const courseService = {
  getAllCoursePagination: async (page: number, name: string): Promise<CoursePagination> => {
    const list = await courseApi.get(`/get-all-courses?page${page}&name=${name}`)
    return list.data;
  },

  getCourseDetail: async (id: number) : Promise<CourseDetail> => {
    const list = await courseApi.get(`/get-detail/${id}`)
    return list.data;
  }
}

export default courseService

export interface CoursePagination {
  totalElement: number,
  totalPage: number,
  currentPage: number,
  message?: string,
  data: CourseOverall[]
}

export interface CourseOverall {
  courseID: number,
  courseName: string,
  description: string,
  price: number,
  thumbnail: string,
  freeTrial: boolean,
  totalStudent: number,
  remainSlot: number,
  level: string,
  numberOfLesson: number,
  mentor: {
    mentorID: number,
    mentorName: string,
    status: string,
    avatar: string,
    favoritedCount: number
  }
  skills: {
    createdAt: string,
    skillDetail: {
      skillID: number,
      skillName: string,
      description: string,
      createdAt: string,
      updatedAt: string
    }
  }[]
}

export interface CourseDetail {
  courseID: number
  mentor: {
    mentorID: number
    introductionVideo: string
    status: string
    feedbacks: any[]
    bio: string
    cv: string
    mentorInfo: {
      fullname: string
      email: string
      role: string
      phoneNumber: string
      status: boolean
    }
  }
  courseName: string
  description: string
  price: number
  thumbnail: string
  freeTrial: boolean
  totalStudent: number
  level: string
  updatedAt: string
  courseAppointments: {
    courseAppointmentID: number
    createdAt: string
    updatedAt: string
  }[]
  lesson: {
    schedule: {
      scheduleID: number
      startTime: string
      endTime: string
      createdAt: string
      updatedAt: string
      booked: boolean
    }
    description: string
    lessonStatus: string
    trialLesson: boolean
    createdAt: string
    updatedAt: string
    lessonID: number
  }[]
  numberOfLesson: number
}