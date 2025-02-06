import React, { useContext, useEffect } from 'react'
import { CourseContext } from '../../../layouts/CourseLayout'
import SkeletonCourse from '../../ui/SkeletonCourse';

export const CourseRender = () => {

    const { courseList, isLoading } = useContext(CourseContext);

    useEffect(() => {
        console.log("courseL: ", courseList);
    }, [courseList])

    return (
        <section id="courses" className="courses section">
            <div className="container">
                <div className="row">
                    {isLoading
                        ? <>
                            <SkeletonCourse />
                            <SkeletonCourse />
                            <SkeletonCourse />
                        </>
                        : courseList?.map(course =>
                            <div
                                key={course?.courseID || 0}
                                className="col-lg-4 col-md-6 d-flex align-items-stretch "
                                data-aos="zoom-in"
                                data-aos-delay="100"
                                style={{ height: '495px' }}
                            >
                                <div className="course-item w-100">
                                    <img
                                        src={course.thumbnail}
                                        className="img-fluid"
                                        alt={course.courseName}
                                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                    />
                                    <div className="course-content d-flex flex-column justify-content-between"
                                        style={{ height: '295px' }}
                                    >
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div className='d-flex w-75' style={{ gap: 5, overflowX: scroll }}>
                                                    {course.skills.map(skill =>
                                                        <span className="category" key={skill.skillDetail.skillID}>{skill.skillDetail.skillName}</span>
                                                    )}
                                                </div>
                                                <div className="price">${course.price}</div>
                                            </div>

                                            {/* nav to courseDetail */}
                                            <h3>
                                                <a href="/course-detail">{course?.courseName}</a>
                                            </h3>
                                            <p className="description">
                                                {course?.description}
                                            </p>
                                        </div>
                                        <div className="trainer d-flex justify-content-between align-items-center">
                                            <div className="trainer-profile d-flex align-items-center">
                                                <img
                                                    src={course.mentor.avatar}
                                                    className="img-fluid"
                                                    alt={course.mentor.mentorName}
                                                />
                                                <a href="" className="trainer-link">
                                                    {course.mentor.mentorName}
                                                </a>
                                            </div>
                                            <div className="trainer-rank d-flex align-items-center">
                                                <i className="bi bi-person user-icon"></i>&nbsp;{course.remainSlot}
                                                &nbsp;&nbsp;
                                                <i className="bi bi-heart heart-icon"></i>&nbsp;{course.mentor.favoritedCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </section>
    )
}

export default CourseRender