export interface Schedule {
    scheduleID: number
    startTime: string 
    endTime: string
    googleMeetUrl: any
    createdAt: string
    updatedAt: string
}

export interface ScheduleCreateRequest {
    scheduleID?: number
    startTime: string | null
    endTime: string | null
    googleMeetUrl: string | null
}

export interface SingleScheduleCreateRequest extends ScheduleCreateRequest {
    lessonID: number
}

export interface ScheduleUpdateRequest {
    scheduleID: number;
    googleMeetUrl: string;
}