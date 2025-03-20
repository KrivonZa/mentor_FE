import React, { useContext, useEffect } from 'react'
import "../../public/css/CourseDetailSchedule.scss";
import { CourseDetailContext } from '../modules/mainPage/CourseDetail';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Empty, Image } from 'antd';

export const CourseDetailSchedule = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);

    return (
        <section id="tabs" className="section tabsLesson">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row">
                    {/* Left column - Lessons (1/3 width) */}
                    <div className="col-lg-4">
                        <h3>Course Lessons</h3>
                        <ul className="flex-column nav nav-tabs">
                            {courseDetail?.courseInfo?.lessons?.map((item, index) => (
                                <li key={item.lessonID} className="nav-item">
                                    <a
                                        className={`nav-link ${index === 0 ? "active" : ""}`}
                                        data-bs-toggle="tab"
                                        href={`#tab-${item.lessonID}`}
                                    >
                                        {item.description}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right column - Mentor Bio (2/3 width) */}
                    <div className="col-lg-8 mt-4 mt-lg-0">
                        <div className="d-flex align-items-center mb-4 mentor">
                            <img
                                src={courseDetail?.mentorInfo?.avatar}
                                alt={`${courseDetail?.mentorInfo?.mentorName}'s avatar`}
                                className="mentor-avatar"
                            />
                            <div className="mentor-greeting">
                                <div>Hi, I'm{' '}</div>
                                <h3 className="d-inline">{courseDetail?.mentorInfo?.mentorName}</h3>
                            </div>
                        </div>

                        <div className="mentor-bio">
                            <h3>Mentor Biography</h3>
                            <p className="bio-text">
                                <span className="quote-mark">“</span>
                                {courseDetail?.mentorInfo?.bio}
                                <span className="quote-mark">”</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Class Schedule Chart */}
                <div className="mt-4 schedule-chart">
                    <h3>Class Schedule</h3>
                    <div className="schedule-timeline">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                            const dayNum = index + 1;
                            const schedule = courseDetail?.classSchedules?.find(
                                (sched) => sched.dayOfWeek === dayNum
                            );
                            return (
                                <div key={day} className="schedule-day">
                                    <div className="day-label">{day}</div>
                                    <div className={`time-slot ${schedule ? 'active' : ''}`}>
                                        {schedule ? `${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)}` : '—'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailSchedule