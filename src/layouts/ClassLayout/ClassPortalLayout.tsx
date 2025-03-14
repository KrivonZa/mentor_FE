import React from 'react'
import ClassPortalTable from '../../components/templates/classPortal/ClassPortalTable'
import ClassDetailModal from '../../components/templates/classPortal/ClassDetailModal'

export const ClassPortalLayout = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="100">
      <ClassPortalTable />
      <ClassDetailModal />
    </div>
  )
}

export default ClassPortalLayout