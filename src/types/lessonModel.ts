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

export interface LessonDetailFormData {
    description: string;
    lessonStatus: string;
    trialLesson: boolean;
    schedule: Schedule[];
}