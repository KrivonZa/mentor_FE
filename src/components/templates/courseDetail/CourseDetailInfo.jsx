import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseDetailInfoSkeleton from "./skeleton/CourseDetailInfoSkeleton";
import { CourseDetailContext } from "../../../modules/mainPage/CourseDetail";

export const CourseDetailInfo = () => {
  const { courseDetail, isLoading } = useContext(CourseDetailContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const expectedStartDate = courseDetail?.expectedStartDate
    ? new Date(
        courseDetail.expectedStartDate[0],
        courseDetail.expectedStartDate[1] - 1,
        courseDetail.expectedStartDate[2]
      )
    : null;
  if (expectedStartDate) expectedStartDate.setHours(0, 0, 0, 0);

  const hasSlots = courseDetail?.remainSlot > 0;
  const isActive = !courseDetail?.deletedStatus && courseDetail?.visibleStatus;
  const isDeleted = courseDetail?.deletedStatus;
  const isFull = courseDetail?.remainSlot === 0;
  const isPast = expectedStartDate && expectedStartDate < currentDate;
  const isMentorActive = courseDetail?.mentorInfo?.isActive;

  let isDisabled = false;

  if (isMentorActive === false) {
    isDisabled = true;
  } else if (hasSlots && isActive && !isPast) {
    // Active course with available slots and start date today or in future - button enabled
  } else if (hasSlots && !isActive && !isDeleted) {
    isDisabled = true;
  } else if (hasSlots && isDeleted) {
    isDisabled = true;
  } else if (isFull) {
    isDisabled = true;
  } else if (hasSlots && isPast) {
    isDisabled = true;
  }

  return (
    <>
      {isLoading ? (
        <CourseDetailInfoSkeleton />
      ) : (
        <section id="courses-course-details" className="courses-course-details">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-7">
                <img
                  src={courseDetail?.courseInfo?.thumbnail}
                  className="img-fluid"
                  alt=""
                  style={{
                    width: "90%",
                    borderRadius: "30px",
                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3>{courseDetail?.courseInfo?.courseName}</h3>
                <div
                  className="rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: courseDetail?.courseInfo?.description,
                  }}
                />
              </div>
              <div className="col-lg-5">
                <div
                  className="p-0 rounded-4 overflow-hidden"
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Header với hiệu ứng glassmorphism */}
                  <div
                    className="text-center p-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(58,123,213,0.1) 0%, rgba(0,210,255,0.05) 100%)",
                      backdropFilter: "blur(10px)",
                      borderBottom: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="mx-auto mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        background:
                          "linear-gradient(135deg, rgba(58,123,213,0.2) 0%, rgba(0,210,255,0.1) 100%)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className="bi bi-journal-text text-primary"
                        style={{ fontSize: "1.8rem" }}
                      ></i>
                    </div>
                    <h5 className="text-dark mb-1 fw-semibold">
                      Thông tin lớp học
                    </h5>
                    <p className="text-muted small mb-0">
                      Bắt đầu học ngay sau khi đăng ký
                    </p>
                  </div>

                  <div className="p-4">
                    {/* Giảng viên - Card sang trọng */}
                    <div
                      className="d-flex align-items-center mb-4 p-3"
                      style={{
                        background: "rgba(245,247,250,0.6)",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.03)",
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            background:
                              "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <i className="bi bi-person-check fs-4"></i>
                        </div>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-1 fw-semibold">
                          {courseDetail?.mentorInfo?.mentorName}
                        </h6>
                        <span
                          className="badge"
                          style={{
                            background: "rgba(58,123,213,0.1)",
                            color: "#3a7bd5",
                            fontWeight: "500",
                            padding: "4px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          Giảng viên chính
                        </span>
                      </div>
                    </div>

                    {/* Học phí - Thiết kế premium */}
                    <div className="mb-4">
                      <div
                        className="d-flex justify-content-between align-items-center p-3"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,71,87,0.05) 0%, rgba(255,107,107,0.03) 100%)",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,71,87,0.1)",
                        }}
                      >
                        <div>
                          <span
                            className="d-block small mb-1"
                            style={{ color: "#ff4757" }}
                          >
                            HỌC PHÍ TRỌN KHÓA
                          </span>
                          <h3
                            className="mb-0 fw-bold"
                            style={{ color: "#ff4757" }}
                          >
                            {courseDetail?.price?.toLocaleString()}đ
                          </h3>
                        </div>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            background: "rgba(255,71,87,0.1)",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className="bi bi-credit-card-2-front"
                            style={{ color: "#ff4757", fontSize: "1.4rem" }}
                          ></i>
                        </div>
                      </div>
                    </div>

                    {/* Thống kê lớp học - UI đẹp */}
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div
                          className="p-3 h-100"
                          style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "12px",
                            border: "1px solid rgba(0,0,0,0.03)",
                          }}
                        >
                          <div className="d-flex align-items-center mb-2">
                            <div
                              className="me-2"
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "rgba(46,213,115,0.1)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="bi bi-people"
                                style={{ color: "#2ed573", fontSize: "1.1rem" }}
                              ></i>
                            </div>
                            <span
                              className="small"
                              style={{ color: "#7f8c8d" }}
                            >
                              SỨC CHỨA
                            </span>
                          </div>
                          <h4 className="mb-0 fw-bold">
                            {courseDetail?.totalStudent}
                          </h4>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          className="p-3 h-100"
                          style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "12px",
                            border: "1px solid rgba(0,0,0,0.03)",
                          }}
                        >
                          <div className="d-flex align-items-center mb-2">
                            <div
                              className="me-2"
                              style={{
                                width: "36px",
                                height: "36px",
                                background: "rgba(9,132,227,0.1)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="bi bi-check-circle"
                                style={{ color: "#0984e3", fontSize: "1.1rem" }}
                              ></i>
                            </div>
                            <span
                              className="small"
                              style={{ color: "#7f8c8d" }}
                            >
                              ĐÃ ĐĂNG KÝ
                            </span>
                          </div>
                          <h4
                            className="mb-0 fw-bold"
                            style={{ color: "#0984e3" }}
                          >
                            {courseDetail?.totalStudent -
                              courseDetail?.remainSlot}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Thông báo quan trọng - Thiết kế tinh tế */}
                    <div
                      className="mb-4 p-3"
                      style={{
                        background: "rgba(253,203,110,0.1)",
                        borderRadius: "12px",
                        border: "1px solid rgba(253,203,110,0.2)",
                      }}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <i
                            className="bi bi-info-circle-fill"
                            style={{ color: "#f39c12", fontSize: "1.2rem" }}
                          ></i>
                        </div>
                        <div>
                          <h6 className="mb-1" style={{ color: "#d35400" }}>
                            Lớp chắc chắn mở!
                          </h6>
                          <p
                            className="small mb-0"
                            style={{ color: "#e67e22" }}
                          >
                            Lớp sẽ khai giảng đúng lịch dù chỉ có 1 học viên
                            đăng ký. Không lo hủy lớp vì thiếu người.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Nút đăng ký - Thiết kế nổi bật */}
                    <button
                      disabled={isDisabled || courseDetail?.remainSlot <= 0}
                      className="btn btn-lg w-100 d-flex justify-content-center align-items-center gap-2 fw-semibold py-3 mb-3 border-0"
                      style={{
                        background:
                          courseDetail?.remainSlot <= 0
                            ? "#bdc3c7"
                            : "linear-gradient(135deg,  #00b09b 0%,  #96c93d 100%)",
                        borderRadius: "12px",
                        color: "white",
                        transition: "all 0.3s ease",
                        boxShadow:
                          courseDetail?.remainSlot <= 0
                            ? "none"
                            : "0 4px 15px rgba(58,123,213,0.3)",
                      }}
                      onClick={() =>
                        navigate(`/checkout/${courseDetail?.classID}`)
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span>
                        {courseDetail?.remainSlot <= 0
                          ? "Lớp đã đầy - Vui lòng chọn lớp khác"
                          : `Đăng ký ngay - ${courseDetail?.price?.toLocaleString()}đ`}
                      </span>
                    </button>

                    {/* Footer */}
                    <div
                      className="text-center small"
                      style={{ color: "#95a5a6" }}
                    >
                      <i className="bi bi-shield-check me-1"></i>
                      Cam kết hoàn tiền 100% nếu không hài lòng
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseDetailInfo;
