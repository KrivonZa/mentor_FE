import React, { createContext, useState } from 'react'
import CourseTitle from '../components/templates/course/CourseTitle';
import CourseRender from '../components/templates/course/CourseRender';

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {

    const [courseList, setCourseList] = useState([]);

    return (
        <CourseContext.Provider value={{
            courseList
        }}>
            {children}
        </CourseContext.Provider>
    )
}

export const CourseLayout = () => {
    return (
        <CourseProvider>
            <div className="main">
                <CourseTitle/>
                <CourseRender/>
            </div>
        </CourseProvider>
    )
}

export default CourseLayout