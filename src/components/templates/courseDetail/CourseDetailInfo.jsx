import React, { useContext } from 'react'
import CourseDetailInfoSkeleton from './skeleton/CourseDetailInfoSkeleton'
import { CourseDetailContext } from '../../../modules/mainPage/CourseDetail';

export const CourseDetailInfo = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);

    return (
        <>
            {isLoading
                ? <CourseDetailInfoSkeleton />
                :
                (<section
                    id="courses-course-details"
                    className="courses-course-details section"
                >
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-8">
                                <img src={courseDetail.thumbnail} className="img-fluid" alt="" />
                                <h3>{courseDetail.courseName}</h3>
                                <p>
                                    {courseDetail.description}
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Trainer</h5>
                                    <p>
                                        {/* Navigate to TrainerInfo */}
                                        <a href="#">{courseDetail.mentor?.mentorInfo.fullname}</a>
                                    </p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Course Fee</h5>
                                    <p>${courseDetail.price}</p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Available Slot</h5>
                                    <p>{courseDetail?.courseAppointments?.length}/{courseDetail.totalStudent}</p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Level</h5>
                                    <p>{courseDetail.level}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )
            }
        </>
    )
}

export default CourseDetailInfo