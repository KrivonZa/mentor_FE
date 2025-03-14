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
                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Trainer</h5>
                                    <p>
                                        {/* Navigate to TrainerInfo */}
                                        <a href="#">{courseDetail?.mentorInfo?.mentorName}</a>
                                    </p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Course Fee</h5>
                                    <p>{courseDetail?.price?.toLocaleString()}đ</p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Available Slot</h5>
                                    <p>{courseDetail?.remainSlot}/{courseDetail?.totalStudent}</p>
                                </div>

                                <div className="course-info d-flex justify-content-between align-items-center">
                                    <h5>Level</h5>
                                    <p>{courseDetail?.courseInfo?.courseLevel}</p>
                                </div>

                                <button className="w-100 course-info btn btn-lg fw-semibold d-flex justify-content-between align-items-center gap-2 px-4 rounded shadow-sm"
                                    style={{ backgroundColor: "#5fd080", border: "none", transition: "transform 0.2s ease-in-out" }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onClick={() => navigate(`/checkout/${courseDetail?.classID}`)}>
                                    <h5 className='text-white'>Buy Now - {courseDetail?.price?.toLocaleString()}đ</h5>
                                </button>
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