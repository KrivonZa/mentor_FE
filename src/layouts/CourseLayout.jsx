import React, { createContext, useEffect, useState } from 'react'
import CourseTitle from '../components/templates/course/CourseTitle';
import CourseRender from '../components/templates/course/CourseRender';
import courseService from '../services/courseService';

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {

    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchFilter, setSearchFilter] = useState("");

    const fetchCoursePagi = async (currentPage, searchFilter) => {
        setIsLoading(true);
        const paginationItem = await courseService.getAllCoursePagination(currentPage, searchFilter)
        setCourseList(paginationItem.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCoursePagi(currentPage, searchFilter);
    }, [currentPage, searchFilter])

    return (
        <CourseContext.Provider value={{
            courseList,
            isLoading
        }}>
            {children}
        </CourseContext.Provider>
    )
}

export const CourseLayout = () => {
    return (
        <CourseProvider>
            <div className="main">
                <CourseTitle />
                <CourseRender />
            </div>
        </CourseProvider>
    )
}

export default CourseLayout