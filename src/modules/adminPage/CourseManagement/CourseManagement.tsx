import React, { createContext, useState } from 'react'
import CourseManagementLayout from '../../../layouts/AdminLayout/CourseManagementLayout';
import { Pagable } from '../../../types/apiModel';
import courseApprovalService from '../../../services/courseApprovalService';

interface CourseManagementProps {
    currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    fetchCourseApproval: () => Promise<void>
    loading: boolean
    courseApprovalRes: any
}

export const CourseManagementContext = createContext<CourseManagementProps | undefined>(undefined);

export const CourseManagementProvider = ({ children }) => {
    const [courseApprovalRes, setCourseApprovalRes] = useState<Pagable<any[]> | any>({})
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchCourseApproval = async () => {
        setLoading(true)
        const data = await courseApprovalService.fetchRequestForStaff('APPROVED', currentPage, 5)
        setCourseApprovalRes(data)
        setLoading(false)
    }

    return (
        <CourseManagementContext.Provider value={{
            currentPage, setCurrentPage,
            fetchCourseApproval, loading,
            courseApprovalRes
        }}>
            {children}
        </CourseManagementContext.Provider>
    )
}

export const CourseManagement = () => {
    return (
        <CourseManagementProvider>
            <CourseManagementLayout/>
        </CourseManagementProvider>
    )
}

export default CourseManagement