import { apiInstance } from "../constants/apiInstance";
import { ApiResponse } from "../types/apiModel";
import { Lesson, LessonDetailFormData } from "../types/lessonModel";

const lessonApi = apiInstance({
  baseURL: "http://localhost:9090/empoweru/sba/lesson"
});

const lessonService = {
  createLesson: async (request: LessonDetailFormData): Promise<Lesson> => {
    const list = await lessonApi.post(`/create-lesson`, request)
    return list.data.data
  },

  deleteLesson: async (id: number): Promise<ApiResponse<Lesson>> => {
    const delItem = await lessonApi.delete(`/delete-lesson/${id}`)
    return delItem.data
   
  },

  updateLesson: async (request: LessonDetailFormData): Promise<ApiResponse<Lesson>> => {
    const updatedItem = await lessonApi.put('/update', request)
    return updatedItem.data;
  }

}

export default lessonService