import { Skeleton } from 'antd'
import React from 'react'

export const CourseDetailInfoSkeleton = () => {
    return (
        <section
            id="courses-course-details"
            className="courses-course-details section"
        >
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-8">
                        <Skeleton.Image active={true} style={{ width: '735px', height: '450px' }} />
                        <Skeleton paragraph={{ rows: 4 }} title={true} />
                    </div>
                    <div className="col-lg-4">
                        <div className="course-info d-flex justify-content-between align-items-center">
                        </div>

                        <div className="course-info d-flex justify-content-between align-items-center">
                        </div>

                        <div className="course-info d-flex justify-content-between align-items-center">
                        </div>

                        <div className="course-info d-flex justify-content-between align-items-center">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailInfoSkeleton