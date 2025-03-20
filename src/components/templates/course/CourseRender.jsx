import React, { useContext, useEffect } from 'react'
import SkeletonCourse from '../../ui/SkeletonCourse';
import { CourseContext } from '../../../modules/mainPage/Courses';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';

export const CourseRender = () => {

    const { courseList, isLoading, classFilter, setClassFilter } = useContext(CourseContext);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            // setclassFilter.page(page);
            setClassFilter({
                ...classFilter,
                page: page
            })
        }
    };


    return (
        <section id="courses" className="courses section">
            <div className="container">
                <div className="row">
                    <div className='mb-3'>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={(e) => {
                                setClassFilter({
                                    ...classFilter,
                                    name: e
                                })
                            }}
                            className="border-black w-50"
                        />
                    </div>

                    {isLoading
                        ? <>
                            <SkeletonCourse />
                            <SkeletonCourse />
                            <SkeletonCourse />
                        </>
                        : courseList?.content?.map(course => {
                            const expectedDate = course?.expectedStartDate ? new Date(course.expectedStartDate) : null;
                            const today = new Date();
                            const isToday = expectedDate?.toDateString() === today.toDateString();
                            if (true) {
                                return (
                                    <div
                                        key={course?.courseID || 0}
                                        className="col-lg-4 col-md-6 d-flex align-items-stretch"
                                        data-aos="zoom-in"
                                        data-aos-delay="100"
                                        style={{ height: '495px' }}
                                    >
                                        <div className="w-100 course-item">
                                            <img
                                                src={course.courseDetail.thumbnail}
                                                className="img-fluid"
                                                alt={course.courseDetail.courseName}
                                                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                            />
                                            <div className="d-flex flex-column justify-content-between course-content"
                                                style={{ height: '295px' }}
                                            >
                                                <div>
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div className='d-flex w-75' style={{ gap: 5, overflowX: scroll }}>
                                                            {course.courseDetail.skills.map(skill =>
                                                                <span className="category" key={skill.skillID}>{skill.skillName}</span>
                                                            )}
                                                        </div>
                                                        <div className="price">{course?.price?.toLocaleString()}đ</div>
                                                    </div>

                                                    {/* nav to courseDetail */}
                                                    <h3>
                                                        <Link
                                                            to={`/courses/${course?.classID}`}
                                                            state={{ courseName: course.courseDetail.courseName }}
                                                        >{course?.courseDetail.courseName}</Link>
                                                    </h3>
                                                    <p className="description">
                                                        {course?.classDescription}
                                                    </p>
                                                </div>
                                                <div className={`alert ${isToday ? "alert-warning" : "alert-success"}`}>
                                                    <strong>Opening:</strong>{" "}
                                                    {
                                                        expectedDate
                                                        ? new Intl.DateTimeFormat("en-GB").format(expectedDate)
                                                        : "N/A"}
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between trainer">
                                                    <div className="d-flex align-items-center trainer-profile">
                                                        <img
                                                            src={course.mentorInfo.avatar}
                                                            className="img-fluid"
                                                            alt={course.mentorInfo.mentorName}
                                                        />
                                                        <a href="" className="trainer-link">
                                                            {course.mentorInfo.mentorName}
                                                        </a>
                                                    </div>
                                                    <div className="d-flex align-items-center trainer-rank">
                                                        <i className="bi bi-person user-icon"></i>&nbsp;{course.totalStudent - course.registeredStudent}
                                                        &nbsp;&nbsp;
                                                        <i className="bi bi-heart heart-icon"></i>&nbsp;0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        )}

                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="justify-content-center pagination">
                                <li className={`page-item ${classFilter.page === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(classFilter.page - 1)}
                                        disabled={classFilter.page === 1}
                                    >
                                        Previous
                                    </button>
                                </li>

                                {Array.from({ length: courseList?.totalPages }, (_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${classFilter.page === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${classFilter.page === courseList?.totalPages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(classFilter.page + 1)} course
                                        disabled={classFilter.page === courseList?.totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default CourseRender