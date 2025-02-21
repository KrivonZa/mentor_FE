import { Schedule, ScheduleCreateRequest } from "./scheduleModel"

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
    lessonID: number;
    courseID: number;
    description: string;
    lessonStatus: string;
    trialLesson: boolean;
    schedule: ScheduleCreateRequest[];
}

export interface CreateLessonRequest {
    description: string,
    lessonStatus: string,
    trialLesson: boolean,
    courseID: number,
    schedule: ScheduleCreateRequest[]
}
