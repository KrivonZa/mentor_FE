import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CourseDetailInfoSkeleton from './skeleton/CourseDetailInfoSkeleton'
import { CourseDetailContext } from '../../../modules/mainPage/CourseDetail';

export const CourseDetailInfo = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);
    const navigate = useNavigate();

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
                                <img src={courseDetail?.courseInfo?.thumbnail} className="img-fluid" alt="" />
                                <h3>{courseDetail?.courseInfo?.courseName}</h3>
                                <p>
                                    {courseDetail?.classDescription}
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Trainer</h5>
                                    <p>
                                        {/* Navigate to TrainerInfo */}
                                        <a href="#">{courseDetail?.mentorInfo?.mentorName}</a>
                                    </p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Course Fee</h5>
                                    <p>{courseDetail?.price?.toLocaleString()}đ</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Total Slot</h5>
                                    <p>{courseDetail?.totalStudent}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Remain Slot</h5>
                                    <p>{courseDetail?.remainSlot}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Level</h5>
                                    <p>{courseDetail?.courseInfo?.courseLevel}</p>
                                </div>

                                
                                {courseDetail?.remainSlot > 0 && (!courseDetail?.deletedStatus && courseDetail?.visibleStatus
                                    ? (
                                        <>
                                            <button className="d-flex btn btn-lg align-items-center justify-content-between rounded shadow-sm w-100 course-info fw-semibold gap-2 px-4"
                                                style={{ backgroundColor: "#5fd080", border: "none", transition: "transform 0.2s ease-in-out" }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                onClick={() => navigate(`/checkout/${courseDetail?.classID}`)}>
                                                <h5 className='text-white'>Buy Now: {courseDetail?.price?.toLocaleString()}đ</h5>
                                            </button>
                                        </>
                                    )
                                    : (
                                        <>
                                            <button disabled className="d-flex btn btn-lg align-items-center justify-content-between rounded shadow-sm w-100 course-info fw-semibold gap-2 px-4"
                                                style={{ backgroundColor: "#5fd080", border: "none", transition: "transform 0.2s ease-in-out" }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                onClick={() => navigate(`/checkout/${courseDetail?.classID}`)}>
                                                <h5 className='text-white'>Buy Now: {courseDetail?.price?.toLocaleString()}đ</h5>
                                            </button>
                                            <span className="text-warning">Enrollment for the course was closed.</span>
                                        </>
                                    ))
                                }

                                {
                                    courseDetail?.remainSlot > 0 && courseDetail?.deletedStatus && (
                                        <>
                                            <button disabled className="d-flex btn btn-lg align-items-center justify-content-between rounded shadow-sm w-100 course-info fw-semibold gap-2 px-4"
                                                style={{ backgroundColor: "#5fd080", border: "none", transition: "transform 0.2s ease-in-out" }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                onClick={() => navigate(`/checkout/${courseDetail?.classID}`)}>
                                                <h5 className='text-white'>Buy Now: {courseDetail?.price?.toLocaleString()}đ</h5>
                                            </button>
                                            <span className="text-danger">The course is no longer exist.</span>
                                        </>
                                    )
                                }

                                {
                                    courseDetail?.remainSlot == 0 && (
                                        <>
                                            <button disabled className="d-flex btn btn-lg align-items-center justify-content-between rounded shadow-sm w-100 course-info fw-semibold gap-2 px-4"
                                                style={{ backgroundColor: "#5fd080", border: "none", transition: "transform 0.2s ease-in-out" }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                onClick={() => navigate(`/checkout/${courseDetail?.classID}`)}>
                                                <h5 className='text-white'>Buy Now: {courseDetail?.price?.toLocaleString()}đ</h5>
                                            </button>
                                            <span className="text-danger">The course slots are full</span>
                                        </>
                                    )
                                }

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