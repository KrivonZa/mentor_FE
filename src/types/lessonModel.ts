import { Schedule, ScheduleCreateRequest } from "./scheduleModel";

export interface Lesson {
  lessonID: number;
  schedule: Schedule[];
  description: string;
  lessonStatus: string;
  trialLesson: boolean;
  trialLessonURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonDetailFormData {
  lessonID: number;
  courseID: number;
  description: string;
  lessonStatus: string;
  trialLesson: boolean;
  trialLessonURL: string;
  schedule: ScheduleCreateRequest[];
}

export interface CreateLessonRequest {
  description: string;
  lessonStatus: string;
  trialLesson: boolean;
  trialLessonURL: string;
  courseID: number;
  schedule: ScheduleCreateRequest[];
}
