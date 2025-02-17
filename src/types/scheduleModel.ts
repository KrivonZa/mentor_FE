export interface Schedule {
    scheduleID: number
    startTime: string
    endTime: string
    googleMeetUrl: any
    createdAt: string
    updatedAt: string
}

export interface ScheduleCreateRequest {
    startTime: string,
    endTime: string,
    googleMeetUrl: string
}