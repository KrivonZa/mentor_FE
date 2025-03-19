import React, { createContext, useEffect, useState } from 'react'
import CourseManagementLayout from '../../../layouts/AdminLayout/CourseManagementLayout';
import { Pagable } from '../../../types/apiModel';
import courseApprovalService from '../../../services/courseApprovalService';
import { CourseDetailFormData } from '../../../types/courseModel';

interface CourseManagementProps {
    currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    fetchCourseApproval: () => Promise<void>
    loading: boolean
    courseApprovalRes: any
    openCourseViewDetailModal: boolean,
    setOpenCourseViewDetailModal: React.Dispatch<React.SetStateAction<boolean>>
    courseDetailFormData: any
    handleOpenCourseViewDetailModal: (item: CourseDetailFormData) => void
    handleCloseCourseViewDetailModal: () => void
}

export const CourseManagementContext = createContext<CourseManagementProps | undefined>(undefined);

export const CourseManagementProvider = ({ children }) => {
    const [courseApprovalRes, setCourseApprovalRes] = useState<Pagable<any[]> | any>({})
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
//CourseViewDetailModal
    const [openCourseViewDetailModal, setOpenCourseViewDetailModal] = useState(false);
    const [courseDetailFormData, setCourseDetailFormData] = useState<any>({
        courseID: -1,
        courseName: "",
        description: "",
        lesson: [],
        level: "",
        thumbnail: ""
    })
    const handleOpenCourseViewDetailModal = (item: CourseDetailFormData) => {
        setCourseDetailFormData(item)
        setOpenCourseViewDetailModal(true);
    }

    const resetCourseDetailModal = () => {
        setCourseDetailFormData({
            courseID: -1,
            courseName: "",
            description: "",
            lesson: [],
            level: "",
            thumbnail: ""
        })
    }

    const handleCloseCourseViewDetailModal = () => {
        resetCourseDetailModal()
        setOpenCourseViewDetailModal(false);
    }


    const fetchCourseApproval = async () => {
        setLoading(true)
        const data = await courseApprovalService.fetchRequestForStaff('PENDING', currentPage, 5)
        setCourseApprovalRes(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCourseApproval()
    }, [currentPage])

    return (
        <CourseManagementContext.Provider value={{
            currentPage, setCurrentPage,
            fetchCourseApproval, loading,
            courseApprovalRes,
            openCourseViewDetailModal, setOpenCourseViewDetailModal, courseDetailFormData,
            handleOpenCourseViewDetailModal,
            handleCloseCourseViewDetailModal
        }}>
            {children}
        </CourseManagementContext.Provider>
    )
}

export const CourseManagement = () => {
    return (
        <CourseManagementProvider>
            <CourseManagementLayout />
        </CourseManagementProvider>
    )
}

export default CourseManagement