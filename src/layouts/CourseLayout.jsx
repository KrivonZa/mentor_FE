import React from 'react'
import CourseRender from '../components/templates/course/CourseRender';
import PageBanner from '../components/templates/PageBanner';


export const CourseLayout = () => {
    return (
        <div className="main">
            <PageBanner
                title="Course"
                description="Odio et unde deleniti. Deserunt numquam exercitationem.
                                Officiis quo odio sint voluptas consequatur ut a odio
                    voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi
                                ratione sint. Sit quaerat ipsum dolorem."
            />
            <CourseRender />
        </div>
    )
}

export default CourseLayout