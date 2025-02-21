import { ApiResponse } from "../types/apiModel";
import { Lesson, LessonDetailFormData } from "../types/lessonModel";
import { apiInstance, apiPrivateInstance } from '../constants';

const lessonApi = apiInstance({
  baseURL: "http://localhost:9090/empoweru/sba/lesson"
});

const lessonPrivateApi = apiPrivateInstance({
  baseURL: "http://localhost:9090/empoweru/sba/lesson"
})

const lessonService = {
  createLesson: async (request: LessonDetailFormData): Promise<Lesson> => {
    const list = await lessonPrivateApi.post(`/create-lesson`, request)
    return list.data.data
  },

  deleteLesson: async (id: number): Promise<ApiResponse<Lesson>> => {
    const delItem = await lessonPrivateApi.delete(`/delete-lesson/${id}`)
    return delItem.data
   
  },

  updateLesson: async (request: LessonDetailFormData): Promise<ApiResponse<Lesson>> => {
    const updatedItem = await lessonPrivateApi.put('/update', request)
    return updatedItem.data;
  }

}

export default lessonService