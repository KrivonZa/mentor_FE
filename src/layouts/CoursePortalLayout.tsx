import React from 'react'
import CoursePortalTable from '../components/templates/coursePortal/CoursePortalTable'
import CourseDetailModal from '../components/templates/coursePortal/CourseDetailModal'
import LessonDetailModal from '../components/templates/coursePortal/LessonDetailModal'
import SchedulePlanModal from '../components/templates/coursePortal/SchedulePlanModal'

export const CoursePortalLayout = () => {
  return (
    <>
      <CoursePortalTable />
      <CourseDetailModal />
      <LessonDetailModal />
      <SchedulePlanModal />
    </>
  )
}

export default CoursePortalLayout