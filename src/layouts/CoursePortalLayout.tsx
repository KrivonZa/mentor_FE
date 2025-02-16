import React from 'react'
import CoursePortalTable from '../components/templates/coursePortal/CoursePortalTable'
import CourseDetailModal from '../components/templates/coursePortal/CourseDetailModal'
import LessonDetailModal from '../components/templates/coursePortal/LessonDetailModal'

export const CoursePortalLayout = () => {
  return (
    <>
      <CoursePortalTable />
      <CourseDetailModal />
      <LessonDetailModal />
    </>
  )
}

export default CoursePortalLayout