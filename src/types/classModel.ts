import { ClassScheduleCreateRequest } from "./classScheduleModel"

export interface ClassOverallQueryParam {
    page: number
    name: string
    perPage: number
    priceStart: number
    priceEnd: number
}

export interface ClassOverallResponse {
    classID: number
    classDescription: string
    totalStudent: number
    price: number
    registeredStudent: number
    mentorInfo: {
        mentorID: number
        mentorName: string
        avatar: string
    }
    courseDetail: {
        courseID: number
        courseName: string
        courseLevel: string
        thumbnail: string
        skills:{
            skillID:number
            skillName:string
        }[]
    }
}

export interface ClassPortalOverallResposne {
    classID: number
    classDescription: string
    totalStudent: number
    registeredStudent: number
    price: number
    visibleStatus: boolean
    expectedStartDate: string
    totalSession: number
    classSchedules: {
        classScheduleID: number
        dayOfWeek: number
        startTime: string
        endTime: string
    }[]
    courseDetail: {
        courseID: number
        courseName: string
        courseLevel: string
        thumbnail: string
        skills: {
            skillID: number
            skillName: string
        }[]
    }
}

export interface ClassCreateRequest {
    classDescription: string
    totalStudent: number
    price: number
    courseID: number
    expectedStartDate: string
    totalSession: number
    classSchedules?: ClassScheduleCreateRequest[]
}

export interface ClassUpdateRequest {
    classID: number
    classDescription: string
    totalStudent: number
    price: number
    expectedStartDate: string
    totalSession: number
}

export interface CourseDetailResponse {
    classID: number
    classDescription: string
    totalStudent: number
    registeredStudent: number
    remainSlot: number
    price: number
    courseInfo: {
        lessons: any
        courseID: number
        courseName: string
        description: string
        courseLevel: string
        thumbnail: string
    }
    mentorInfo: {
        mentorID: number
        mentorName: string
        avatar: string
    }
}