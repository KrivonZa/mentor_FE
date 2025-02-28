import React, { useContext, useEffect } from 'react'
import SkeletonCourse from '../../ui/SkeletonCourse';
import { CourseContext } from '../../../modules/mainPage/Courses';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';

export const CourseRender = () => {

    const { courseList, isLoading, currentPage, setCurrentPage, setSearchFilter } = useContext(CourseContext);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    setCurrentPage
    useEffect(() => {
        console.log("courseL: ", courseList);
    }, [courseList])

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
                                setSearchFilter(e);
                                console.log("e:::",e)
                            }}
                            className="w-50 border-black"
                        />
                    </div>

                    {isLoading
                        ? <>
                            <SkeletonCourse />
                            <SkeletonCourse />
                            <SkeletonCourse />
                        </>
                        : courseList.content?.map(course => {
                            if (course.status == "ON" && course.verifyStatus == "APPROVE") {
                                return (
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
                                                        <div className="price">{course?.price?.toLocaleString()}đ</div>
                                                    </div>

                                                    {/* nav to courseDetail */}
                                                    <h3>
                                                        <Link
                                                            to={`/courses/${course?.courseID}`}
                                                            state={{ courseName: course.courseName }}
                                                        >{course?.courseName}</Link>
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
                                )
                            }
                        }
                        )}

                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                </li>

                                {Array.from({ length: courseList?.totalPages }, (_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === courseList?.totalPages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)} course
                                        disabled={currentPage === courseList?.totalPages}
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