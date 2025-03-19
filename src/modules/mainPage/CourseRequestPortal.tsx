import React, { createContext } from 'react'
import CoursePortalRequestLayout from '../../layouts/CourseRequestPortalLayout';


interface CourseRequestPortalProps {

}

export const CourseRequestPortalContext = createContext<CourseRequestPortalProps | undefined>(undefined);

export const CourseRequestPortalProvider = ({ children }) => {

    return (
        <CourseRequestPortalContext.Provider value={{}}>
            {children}
        </CourseRequestPortalContext.Provider>
    )
}

const CourseRequestPortal = () => {
    return (
        <CourseRequestPortalProvider>
            <CoursePortalRequestLayout />
        </CourseRequestPortalProvider>
    )
}

export default CourseRequestPortal