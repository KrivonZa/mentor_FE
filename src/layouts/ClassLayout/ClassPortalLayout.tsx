import React from 'react'
import ClassPortalTable from '../../components/templates/classPortal/ClassPortalTable'
import ClassDetailModal from '../../components/templates/classPortal/ClassDetailModal'
import ClassSessionModal from '../../components/templates/classPortal/ClassSessionModal'
import CreateSessionModal from '../../components/templates/classPortal/CreateSessionModal'

export const ClassPortalLayout = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="100">
      <ClassPortalTable />
      <ClassSessionModal/>
      <ClassDetailModal />
      <CreateSessionModal />
    </div>
  )
}

export default ClassPortalLayout