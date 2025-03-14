import { Lesson, LessonDetailFormData } from "./lessonModel"
import { Skill } from "./skillModel"

export interface CoursePortalDetail {
    courseID: number
    skills: {
        skillDetail: Skill
        createdAt: string
    }[]
    thumbnail: string
    courseName: string
    description: string
    price: number
    freeTrial: boolean
    totalStudent: number
    level: string
    status: string
    verifyStatus: string
    createdAt: string
    updatedAt: string
    lesson: Lesson[]
    transactions: any[]
}

export interface CourseDetailFormData {
    courseID: number
    courseName: string;
    description: string;
    price: number;
    thumbnail: string;
    freeTrial: boolean;
    totalStudent: number;
    level: string;
    skill: number[];
    lesson: LessonDetailFormData[]
}

export interface CourseDetailFormDataError extends Omit<CourseDetailFormData, 'skill' | 'price' | 'totalStudent' | 'lesson'> {
    // @Override
    skill: string
    price: string
    totalStudent: string
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
    status: string
    verifyStatus: string
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
        }[]
        description: string
        lessonStatus: string
        trialLesson: boolean
        createdAt: string
        updatedAt: string
        lessonID: number
    }[]
    numberOfLesson: number
}

export interface CoursePagination {
    totalElement: number,
    totalPage: number,
    currentPage: number,
    message?: string,
    data: CourseOverall[]
}

interface CourseOverall {
    courseID: number,
    courseName: string,
    description: string,
    price: number,
    thumbnail: string,
    freeTrial: boolean,
    totalStudent: number,
    remainSlot: number,
    level: string,
    status: string
    verifyStatus: string
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


//!Request DTOs
export interface CreateCourseRequest {
    thumbnail: any
    course: {
        skillIDs: number[]
        courseName: string
        description: string
        price: number
        freeTrial: boolean
        totalStudent: number
        level: string
        lesson: LessonDetailFormData[]
    }
}

export interface UpdateCourseRequest {
    thumbnail?: any // nullable
    course: {
        courseID: number
        skillIDs: number[]
        courseName: string
        description: string
        price: number
        freeTrial: boolean
        totalStudent: number
        level: string
    }
}