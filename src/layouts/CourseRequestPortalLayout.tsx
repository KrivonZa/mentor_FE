import React from 'react'
import CourseRequestPortal from '../modules/mainPage/CourseRequestPortal'
import CourseRequestPortalTable from '../components/templates/courseRequestPortal/CourseRequestPortalTable'

export const CourseRequestPortalLayout = () => {
  return (
      <div data-aos="fade-up" data-aos-delay="100">
          <CourseRequestPortalTable />
      </div>
  )
}

export default CourseRequestPortalLayout