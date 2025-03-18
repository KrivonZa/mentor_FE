import React from 'react'
import CourseManagementTable from '../../components/templates/admin/courseManagement/CourseManagementTable'
import CourseViewDetailModal from '../../components/templates/admin/courseManagement/CourseViewDetailModal'

const CourseManagementLayout = () => {
  return (
    <>
        <CourseManagementTable />
        <CourseViewDetailModal />
    </>
  )
}

export default CourseManagementLayout