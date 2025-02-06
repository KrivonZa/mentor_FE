import React from 'react'
import CourseDetailHeader from '../components/templates/courseDetail/CourseDetailHeader';
import CourseDetailInfo from '../components/templates/courseDetail/CourseDetailInfo';
import CourseDetailSchedule from '../components/templates/courseDetail/CourseDetailSchedule';


const CourseDetailLayout = () => {
    return (
        <main class="main">
            <CourseDetailHeader />
            <CourseDetailInfo />
            <CourseDetailSchedule />
        </main>
    )
}

export default CourseDetailLayout