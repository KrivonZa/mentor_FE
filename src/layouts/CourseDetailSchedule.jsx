import React, { useContext, useEffect } from "react";
import "../../public/css/CourseDetailSchedule.scss";
import { CourseDetailContext } from "../modules/mainPage/CourseDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Empty, Image } from "antd";
import { Link } from "react-router-dom";

export const CourseDetailSchedule = () => {
  const { courseDetail, isLoading } = useContext(CourseDetailContext);

  return (
    <section id="tabs" className="section tabsLesson">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row">
          {/* Left column - Lessons (1/3 width) */}
          <div className="col-lg-4">
            <h3 className="mb-3">Bạn sẽ học những gì trong khoá học này?</h3>
            <ul className="list-group">
              {courseDetail?.courseInfo?.lessons?.map((item, index) => (
                <li
                  key={item.lessonID}
                  className="list-group-item p-0 mb-2 border-0"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center p-3 rounded"
                    style={{
                      backgroundColor: "#e8f5e9",
                      borderLeft: "4px solid #4caf50",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    }}
                  >
                    <a
                      className={`d-flex align-items-center text-decoration-none flex-grow-1 ${
                        index === 0 ? "fw-medium" : ""
                      }`}
                      data-bs-toggle="tab"
                      href={`#tab-${item.lessonID}`}
                      style={{
                        transition: "all 0.3s ease",
                        color: "#2e7d32",
                        paddingLeft: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "24px",
                          height: "24px",
                          backgroundColor: "#4caf50",
                          borderRadius: "50%",
                          marginRight: "12px",
                          color: "white",
                          textAlign: "center",
                          lineHeight: "24px",
                          fontWeight: "bold",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </span>
                      {item.description}
                    </a>

                    {item.trialLesson && (
                      <a
                        href={item?.trialLessonURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center text-decoration-none ms-2"
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <i className="bi bi-play-circle me-1"></i>
                        Xem thử
                      </a>
                    )}
                  </div>
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
                <div>Xin Chào, Tôi là </div>
                <h3 className="d-inline">
                  {courseDetail?.mentorInfo?.mentorName}
                </h3>
              </div>
            </div>

            <div className="mentor-bio">
              <h3>Hồ Sơ Người Hướng Dẫn</h3>
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
          <h3>Lịch Học Mỗi Tuần</h3>
          <div className="schedule-timeline">
            {[
              "Thứ 2",
              "Thứ 3",
              "Thứ 4",
              "Thứ 5",
              "Thứ 6",
              "Thứ 7",
              "Chủ Nhật",
            ].map((day, index) => {
              const dayNum = index + 1;
              const schedule = courseDetail?.classSchedules?.find(
                (sched) => sched.dayOfWeek === dayNum
              );
              return (
                <div key={day} className="schedule-day">
                  <div className="day-label">{day}</div>
                  <div className={`time-slot ${schedule ? "active" : ""}`}>
                    {schedule
                      ? `${schedule.startTime.slice(
                          0,
                          5
                        )} - ${schedule.endTime.slice(0, 5)}`
                      : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailSchedule;
