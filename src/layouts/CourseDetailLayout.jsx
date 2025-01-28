import React, { createContext, useState } from 'react'
import CourseDetailHeader from '../components/templates/courseDetail/CourseDetailHeader';
import CourseDetailInfo from '../components/templates/courseDetail/CourseDetailInfo';
import CourseDetailSchedule from '../components/templates/courseDetail/CourseDetailSchedule';


export const CourseDetailContext = createContext({});

export const CourseDetailProvider = ({ children }) => {

    const [courseDetail, setCourseDetail] = useState({});

    return (
        <CourseDetailContext.Provider value={{
            courseDetail
        }}>
            {children}
        </CourseDetailContext.Provider>
    )
}

const CourseDetailLayout = () => {
    return (
        <CourseDetailProvider>
            <main class="main">
                <CourseDetailHeader/>
                <CourseDetailInfo/>
                <CourseDetailSchedule/>
            </main>
        </CourseDetailProvider>
    )
}

export default CourseDetailLayout