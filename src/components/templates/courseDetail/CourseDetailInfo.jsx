import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CourseDetailInfoSkeleton from './skeleton/CourseDetailInfoSkeleton'
import { CourseDetailContext } from '../../../modules/mainPage/CourseDetail';
import { API_BASE_URL } from '../../../constants';
import { toast } from "react-toastify";
import axios from "axios";
const buttonStyles = {
    backgroundColor: "#5fd080",
    border: "none",
    transition: "transform 0.2s ease-in-out",
};

export const CourseDetailInfo = () => {
    const { courseDetail, isLoading } = useContext(CourseDetailContext);
    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const handleCheckAndNavigate = async () => {
    try {
        const userId = localStorage.getItem("ID");
        const classID = courseDetail?.classID;

        const res = await axios.get(
            `${API_BASE_URL}/class/check-registered/${classID}?userID=${userId}`
        );

        const isAlreadyRegistered = res.data?.data === true;

        if (isAlreadyRegistered) {
            toast.error("Bạn đã đăng ký khóa học này!");
        } else {
            navigate(`/checkout/${classID}`);
        }
    } catch (error) {
        console.error(error);
        toast.error("Lỗi khi kiểm tra đăng ký. Vui lòng thử lại.");
    }
};

    const expectedStartDate = courseDetail?.expectedStartDate
        ? new Date(courseDetail.expectedStartDate[0], courseDetail.expectedStartDate[1] - 1, courseDetail.expectedStartDate[2])
        : null;
    if (expectedStartDate) expectedStartDate.setHours(0, 0, 0, 0);

    const hasSlots = courseDetail?.remainSlot > 0;
    const isActive = !courseDetail?.deletedStatus && courseDetail?.visibleStatus;
    const isDeleted = courseDetail?.deletedStatus;
    const isFull = courseDetail?.remainSlot === 0;
    const isPast = expectedStartDate && expectedStartDate < currentDate;
    const isMentorActive = courseDetail?.mentorInfo?.isActive;

    let isDisabled = false;
    let message = null;
    let messageClass = "";

    if (isMentorActive === false) {
        isDisabled = true;
        message = "This mentor has been banned!";
        messageClass = "text-danger";
    } else if (hasSlots && isActive && !isPast) {
        // Active course with available slots and start date today or in future - button enabled
    } else if (hasSlots && !isActive && !isDeleted) {
        isDisabled = true;
        message = "Enrollment for the course was closed.";
        messageClass = "text-warning";
    } else if (hasSlots && isDeleted) {
        isDisabled = true;
        message = "The course no longer exists.";
        messageClass = "text-danger";
    } else if (isFull) {
        isDisabled = true;
        message = "The course slots are full.";
        messageClass = "text-danger";
    } else if (hasSlots && isPast) {
        isDisabled = true;
        message = "The course start date has passed.";
        messageClass = "text-danger";
    }

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
                            <div className="col-lg-7">
                                <img src={courseDetail?.courseInfo?.thumbnail} className="img-fluid" alt="" style={{ width: "90%", borderRadius: "30px", boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)" }} />
                                <h3>{courseDetail?.courseInfo?.courseName}</h3>
                                <p>
                                    {courseDetail?.classDescription}
                                </p>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Người Hướng Dẫn</h5>
                                    <p>
                                        <a href="#">{courseDetail?.mentorInfo?.mentorName}</a>
                                    </p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Học Phí</h5>
                                    <p>{courseDetail?.price?.toLocaleString()}đ</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Tổng Số Học Viên</h5>
                                    <p>{courseDetail?.totalStudent}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Slot Còn Lại</h5>
                                    <p>{courseDetail?.remainSlot}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between course-info">
                                    <h5>Trình Độ</h5>
                                    <p>{courseDetail?.courseInfo?.courseLevel}</p>
                                </div>

                                <>
                                    <button
                                        disabled={isDisabled}
                                        className="d-flex btn btn-lg align-items-center justify-content-between rounded shadow-sm w-100 course-info fw-semibold gap-2 px-4"
                                        style={buttonStyles}
                                        onClick={handleCheckAndNavigate}
                                    >
                                        <h5 className="text-white">
                                            Thanh Toán Ngay: {courseDetail?.price?.toLocaleString()}đ
                                        </h5>
                                    </button>
                                    {message && <span className={messageClass}>{message}</span>}
                                </>

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