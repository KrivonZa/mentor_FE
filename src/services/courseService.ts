import React from 'react'
import { apiInstance } from '../constants/apiInstance';

const categoryApi = apiInstance({
  // baseURL: "http://empoweru.trangiangkhanh.site/..."
  baseURL: "http://localhost:9090/course"
});

const courseService = {
  getAllCoursePagination: async (page: number, name: string): Promise<CoursePagination> => {
    const list = await categoryApi.get(`/get-all-courses?page${page}&name=${name}`)
    return list.data;
  }
}

export default courseService


export interface CoursePagination {
  totalElement: number,
  totalPage: number,
  currentPage: number,
  message?:string,
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
  level: string,
  numberOfLesson: number
}