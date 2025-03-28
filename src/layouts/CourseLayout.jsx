import React from 'react'
import CourseRender from '../components/templates/course/CourseRender';
import PageBanner from '../components/templates/PageBanner';


export const CourseLayout = () => {
    return (
        <div className="main">
            <PageBanner
                title="Course"
                description="Expand your knowledge and skills with our diverse courses. From technology to arts, we offer engaging and informative learning experiences."
            />
            <CourseRender />
        </div>
    )
}

export default CourseLayout