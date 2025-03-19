import React, { useContext, useEffect } from 'react'
import "../../public/css/CourseDetailSchedule.scss";
import { CourseDetailContext } from '../modules/mainPage/CourseDetail';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Empty } from 'antd';

export const CourseDetailSchedule = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);

    return (
        <section id="tabs" className="tabs section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="nav nav-tabs flex-column">
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
                    <div className="col-lg-9 mt-4 mt-lg-0">
                        <div className="tab-content">
                            {courseDetail?.courseInfo?.lesson?.map((item, index) => (
                                <div
                                    key={item.lessonID}
                                    className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                    style={{gap:20}}
                                    id={`tab-${item.lessonID}`}
                                >

                                    {item.schedule.length === 0 && (
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    )}
                                    {item.schedule.map((schedule) => {
                                        const startDate = new Date(schedule.startTime);
                                        const endDate = new Date(schedule.endTime);

                                        const formattedStartTime = `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2, "0")} ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
                                        const formattedEndTime = `${endDate.getHours()}:${String(endDate.getMinutes()).padStart(2, "0")} ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

                                        return (
                                            <p key={schedule.scheduleID} className="badge bg-success px-3 py-2 rounded-pill fs-5 me-2">
                                                {formattedStartTime} - {formattedEndTime}
                                            </p>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailSchedule