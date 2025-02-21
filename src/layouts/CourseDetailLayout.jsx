import React, { useContext } from 'react'
import CourseDetailInfo from '../components/templates/courseDetail/CourseDetailInfo';
import PageBanner from '../components/templates/PageBanner';
import { CourseDetailContext } from '../modules/mainPage/CourseDetail';

const CourseDetailLayout = () => {

    const { courseName } = useContext(CourseDetailContext);

    return (
        <main className="main">
            {/* <CourseDetailHeader /> */}
            <PageBanner
                title="Course Details"
                description="Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem."
                alternateLastPath={courseName}
                />
            <CourseDetailInfo />
        </main>
    )
}

export default CourseDetailLayout