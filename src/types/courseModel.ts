import { Lesson } from "./lessonModel"
import { Skill } from "./skillModel"

export interface CoursePortalDetail {
    courseID: number
    skills:{
        skill: Skill
        createdAt: string
    }
    thumbnail: string
    courseName: string
    description: string
    price: number
    freeTrial: boolean
    totalStudent: number
    level: string
    createdAt: string
    updatedAt: string
    lesson: Lesson[]
    transactions: any[]
}