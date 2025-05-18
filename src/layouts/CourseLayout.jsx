import React from 'react'
import CourseRender from '../components/templates/course/CourseRender';
import PageBanner from '../components/templates/PageBanner';


export const CourseLayout = () => {
    return (
        <div className="main">
            <PageBanner
                title="Các Khoá Học"
                description="Khám phá các khoá học chất lượng từ các giảng viên hàng đầu"
            />
            <CourseRender />
        </div>
    )
}

export default CourseLayout