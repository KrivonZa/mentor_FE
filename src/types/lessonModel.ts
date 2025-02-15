import { Schedule } from "./scheduleModel"

export interface Lesson {
    lessonID: number
    schedule: Schedule[]
    description: string
    lessonStatus: string
    trialLesson: boolean
    createdAt: string
    updatedAt: string
}