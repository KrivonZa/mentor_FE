import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import courseService from "../../../services/courseService";
import { CoursePortalDetail } from "../../../types/courseModel";
import { CoursePortalContext } from "../../../modules/mainPage/CoursePortal";
import CourseDetailModal from "./CourseDetailModal";
import LessonDetailModal from "./LessonDetailModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import lessonService from "../../../services/lessonService";
import { Empty, Input } from "antd";
import Search from "antd/es/input/Search";
import { Spin } from "antd";
import {
  toastLoadingFailAction,
  toastLoadingSuccessAction,
} from "../../../utils/functions.ts";
import courseApprovalService from "../../../services/courseApprovalService.ts";
import CustomSearch from "../../ui/CustomSearch.jsx";
import { SearchOutlined } from "@ant-design/icons";

export const CoursePortalTable = () => {
  const context = useContext(CoursePortalContext);
  if (!context)
    throw new Error("SomeComponent must be used within a CoursePortalProvider");

  const {
    listCoursePortal,
    fetchPortalDetail,
    showCourseDetailModal,
    showLessonDetailModal,
    resetLessonDetailModal,
    handleOpenScheduleModal,
    setCourseNameQuery,
    courseNameQuery,
    loading,
    setCoursePortalPage,
    coursePortalPage,
    setLoading,
  } = context;

  const handleDeleteLesson = async (lessonID: number) => {
    const loadingId = toast.loading("Đang xoá nội dung khoá học...");
    try {
      const response = await lessonService.deleteLesson(lessonID);
      await fetchPortalDetail();
      toastLoadingSuccessAction(loadingId, "Xoá nội dung khoá học thành công.");
      // toast.success(response.message);
    } catch (error) {
      console.error(error);
      // toast.error("Delete lesson failed");
      toastLoadingFailAction(
        loadingId,
        "Xảy ra lỗi khi xoá nội dung khoá học."
      );
    }
  };

  const handleDeleteCourse = async (courseID: number) => {
    try {
      const response = await courseService.deleteCourse(courseID);
      if (response) {
        const loadingId = toast.loading("Đang xoá khoá học...");
        await fetchPortalDetail();
        toastLoadingSuccessAction(
          loadingId,
          "Khoá Hoc: " + response.data.courseName + " đã được xoá thành công!"
        );
        return;
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchPortalDetail();
      setLoading(false);
    };

    fetchData();
  }, [courseNameQuery, coursePortalPage]);

  return (
    <div id="course-portal">
      <div id="webcrumbs">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Quản Lý Khoá Học Của Tôi</h1>
          </div>
          <div className="row">
            <div className="col-sm-9 flex justify-between items-center mb-3 pe-4">
              <Input.Search
                placeholder="Tìm kiếm khoá học của bạn"
                allowClear
                enterButton={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      height: "100%",
                      fontWeight: "600",
                    }}
                  >
                    <SearchOutlined style={{ marginRight: "5px" }} />
                    <span>Tìm Kiếm</span>
                  </div>
                }
                size="large"
                onSearch={(e) => {
                  setCourseNameQuery(e);
                }}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 5px 15px rgba(95, 207, 128, 0.2)",
                  transition: "all 0.3s ease",
                  border: "none",
                  height: "56px",
                }}
                className="custom-search-input"
              />

              {/* CSS tùy chỉnh cho thanh search */}
              <style>{`
                .custom-search-input .ant-input-wrapper {
                  height: 56px; /* Tăng chiều cao cho wrapper */
                }

                .custom-search-input .ant-input {
                  border-top-left-radius: 10px !important;
                  border-bottom-left-radius: 10px !important;
                  border: none !important; /* Xóa viền xám */
                  outline: none !important;
                  font-size: 16px;
                  padding: 10px 15px;
                  height: 56px; /* Tăng chiều cao input */
                  box-shadow: none !important;
                  border-right: none !important;
                  background-color: #f9f9f9; /* Màu nền nhẹ để phân biệt */
                }

                .custom-search-input .ant-input-group-addon {
                  height: 56px;
                }

                /* Thay đổi styling khi focus */
                .custom-search-input .ant-input:focus,
                .custom-search-input .ant-input-focused {
                  box-shadow: 0 0 0 1px #5fcf80 !important; /* Đổi thành viền xanh lá khi focus */
                  border-color: #5fcf80 !important;
                }

                .custom-search-input .ant-input-affix-wrapper:focus,
                .custom-search-input .ant-input-affix-wrapper-focused {
                  box-shadow: 0 0 0 1px #5fcf80 !important;
                  border-color: #5fcf80 !important;
                }

                .ant-input-search-button {
                  height: 56px !important;
                }

                .custom-search-input .ant-input-search-button {
                  border-top-right-radius: 10px !important;
                  border-bottom-right-radius: 10px !important;
                  background-color: rgb(21, 135, 55) !important;
                  border-color: rgb(16, 113, 45) !important;
                  height: 56px !important; /* Tăng chiều cao nút tìm kiếm */
                  min-width: 120px;
                  font-weight: 600;
                  font-size: 16px;
                  transition: all 0.3s ease;
                }

                .custom-search-input .ant-input-search-button:hover {
                  background-color: #4baa6a !important;
                  border-color: #4baa6a !important;
                  box-shadow: 0 5px 15px rgba(75, 170, 106, 0.4);
                }

                .custom-search-input .ant-input-clear-icon {
                  color: #5fcf80;
                }

                .custom-search-input:hover {
                  box-shadow: 0 20px 40px rgba(16, 88, 38, 0.3);
                }

                .custom-search-input .ant-input:hover {
                  border-color: transparent !important;
                }

                .custom-search-input .ant-input-affix-wrapper {
                  height: 56px !important;
                  border: none !important;
                  padding: 0 11px !important;
                  box-shadow: none !important;
                }
              `}</style>
            </div>

            <div className="col-sm-3 flex justify-content-end pb-3">
              <button
                onClick={() => {
                  showCourseDetailModal(-1);
                }}
                className="bg-[#5FCF80] hover:bg-[#4ab569] transform hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span> Thêm Khoá
                Học
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Tên Khoá Học
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Trình Độ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Trạng Thái Kiểm Duyệt
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Công Cụ Quản Lý
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!loading &&
                  listCoursePortal?.content?.map((course, index) => (
                    <React.Fragment key={course.courseID}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                course.thumbnail ||
                                "https://placehold.co/100x70"
                              }
                              alt="thumbnail"
                              className="rounded-lg w-[100px] h-[70px] object-cover"
                            />
                            <div>
                              <p className="font-medium">{course.courseName}</p>
                              <p className="text-sm text-gray-500">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4">Bob Smith</td> */}
                        <td className="px-6 py-4">
                          {(() => {
                            switch (course.level) {
                              case "BEGINNER":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm"
                                    style={{
                                      background: "#CCFFCC",
                                      color: "#00CC66",
                                    }}
                                  >
                                    CƠ BẢN
                                  </span>
                                );
                              case "INTERMEDIATE":
                                return (
                                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    TRUNG CẤP
                                  </span>
                                );
                              case "ADVANCED":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                                    style={{
                                      background: "#FFCC99",
                                      color: "#FF8000",
                                    }}
                                  >
                                    NÂNG CAO
                                  </span>
                                );
                              default:
                                return (
                                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                                    CƠ BẢN
                                  </span>
                                );
                            }
                          })()}
                          {/* <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">{course.level}</span> */}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {(() => {
                            switch (course.verifyStatus) {
                              // BAN,
                              // REJECT,
                              // PENDING,
                              // APPROVE
                              case "APPROVE":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "#00CC66" }}
                                  >
                                    Kiểm Duyệt Thành Công
                                  </span>
                                );
                              case "PENDING":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "#f3b25c" }}
                                  >
                                    Chờ Xử Lý
                                  </span>
                                );
                              case "REJECT":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "purple" }}
                                  >
                                    Cần Được Kiểm Duyệt
                                  </span>
                                );
                              //BAN
                              default:
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "red" }}
                                  >
                                    Bị Cấm
                                  </span>
                                );
                            }
                          })()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 flex-column">
                            <div className="d-flex">
                              {course.verifyStatus == "PENDING" ? (
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  onClick={async () => {
                                    toast.info(
                                      "This course is going to view by our staff, cannot delete!"
                                    );
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    auto_delete
                                  </span>
                                </button>
                              ) : (
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  onClick={async () => {
                                    const result = await Swal.fire({
                                      title: "Bạn có chắc chắn muốn xoá?",
                                      text: "Bạn sẽ không thể hoàn tác lại hành động này!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#288a57",
                                      cancelButtonColor: "#81998a",
                                      confirmButtonText: "Tôi Đồng Ý!",
                                      cancelButtonText: "Huỷ",
                                    });

                                    if (result.isConfirmed) {
                                      handleDeleteCourse(course?.courseID);
                                    }
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              )}
                              {course.verifyStatus == "REJECT" ? (
                                <button
                                  onClick={() =>
                                    showCourseDetailModal(course?.courseID)
                                  }
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    toast.info(
                                      "Bạn chỉ có thể chỉnh sửa các khoá học trước khi nộp yêu cầu kiểm duyệt nội dung."
                                    );
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <span className="material-symbols-outlined">
                                    edit_off
                                  </span>
                                </button>
                              )}
                            </div>
                            <div className="d-flex">
                              <button
                                onClick={async () => {
                                  const currentStatus = course.verifyStatus;
                                  if (currentStatus == "APPROVE") {
                                    toast.info(
                                      "Khoá học này đã được kiểm duyệt thành công"
                                    );
                                    return;
                                  }
                                  if (currentStatus == "PENDING") {
                                    toast.info(
                                      "Khoá học này đang trong quá trình kiểm duyệt"
                                    );
                                    return;
                                  }
                                  if (currentStatus == "BAN") {
                                    toast.info(
                                      "Khoá học này đã bị đình chỉ vĩnh viễn!"
                                    );
                                  }

                                  let title =
                                    "Bạn muốn gửi yêu cầu kiểm duyệt nội dung của khoá học này?";
                                  let text =
                                    "Sau khi gửi yêu cầu kiểm duyệt, bạn sẽ không thể chỉnh sửa nội dung của khoá học.";
                                  let message = "Yêu cầu đã được gửi";
                                  let confirmText = "Gửi yêu cầu.";

                                  const result = await Swal.fire({
                                    title: title,
                                    text: text,
                                    icon: "info",
                                    showCancelButton: true,
                                    confirmButtonColor: "#288a57",
                                    cancelButtonColor: "#81998a",
                                    confirmButtonText: confirmText,
                                  });

                                  if (result.isConfirmed) {
                                    const loadingId = toast.loading(
                                      "Yêu cầu kiểm duyệt đang được gửi..."
                                    );
                                    try {
                                      await courseApprovalService.createCourseApprovalRequest(
                                        course.courseID
                                      );
                                      toastLoadingSuccessAction(
                                        loadingId,
                                        "Yêu cầu kiểm duyệt khoá học của bạn sẽ được xử lý trong thời gian sớm nhất."
                                      );
                                      await fetchPortalDetail();
                                    } catch (error) {
                                      toastLoadingFailAction(
                                        loadingId,
                                        "Yêu cầu kiểm duyệt của bạn đang gặp vấn đề, hãy thử lại."
                                      );
                                    }
                                  }
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <span className="material-symbols-outlined">
                                  publish
                                </span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {/* Sub Table Row  */}
                      <tr className="bg-gray-50">
                        <td colSpan={8} className="px-6 py-4">
                          <details>
                            <summary className="cursor-pointer hover:text-[#5FCF80] transition-colors">
                              <span>Xem Nội Dung Khoá Học</span>
                            </summary>
                            <div className="mt-4 space-y-4">
                              <div className="d-flex justify-between">
                                <div></div>
                                {course?.verifyStatus == "REJECT" && (
                                  <button
                                    onClick={() =>
                                      showLessonDetailModal(
                                        -1,
                                        course.courseID,
                                        undefined
                                      )
                                    }
                                    className="bg-[#5FCF80] hover:bg-[#4ab569] text-white px-4 py-2 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                                  >
                                    <span className="material-symbols-outlined">
                                      add
                                    </span>{" "}
                                    Thêm Nội Dung Mới
                                  </button>
                                )}
                              </div>
                              <table className="w-full">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Số Thứ Tự
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Mô Tả Nội Dung
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Nội Dung Học Thử?
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Thời Điểm Tạo
                                    </th>
                                    {course.verifyStatus == "REJECT" && (
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                        Công Cụ Quản Lý
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {course?.lesson?.length == 0 && (
                                    <tr>
                                      <td
                                        colSpan={7}
                                        className="py-4 text-center"
                                      >
                                        <Empty
                                          className="w-full"
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                  {course.lesson?.map((lesson, index) => (
                                    <tr
                                      key={lesson.lessonID}
                                      className="hover:bg-gray-100 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-center">
                                        #{lesson.lessonID}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-center">
                                        {lesson.description}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        {lesson.trialLesson ? (
                                          <span className="material-symbols-outlined text-green-500">
                                            check_circle
                                          </span>
                                        ) : (
                                          <span className="material-symbols-outlined text-danger">
                                            cancel
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-center">
                                        {lesson.createdAt}
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex gap-2 justify-content-center">
                                          {course.verifyStatus != "REJECT" ? (
                                            <></>
                                          ) : (
                                            <>
                                              <button
                                                onClick={async () => {
                                                  const result =
                                                    await Swal.fire({
                                                      title:
                                                        "Bạn có chắc chắn muốn xoá?",
                                                      text: "Bạn sẽ không thể hoàn tác lại hành động này!",
                                                      icon: "warning",
                                                      showCancelButton: true,
                                                      confirmButtonColor:
                                                        "#288a57",
                                                      cancelButtonColor:
                                                        "#81998a",
                                                      confirmButtonText:
                                                        "Tôi Đồng Ý!",
                                                      cancelButtonText: "Huỷ",
                                                    });

                                                  if (result.isConfirmed) {
                                                    await handleDeleteLesson(
                                                      lesson.lessonID
                                                    ); // Wait for deletion
                                                  }
                                                }}
                                                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                              >
                                                <span className="material-symbols-outlined">
                                                  delete
                                                </span>
                                              </button>
                                              <button
                                                onClick={() =>
                                                  showLessonDetailModal(
                                                    lesson.lessonID,
                                                    course.courseID,
                                                    lesson
                                                  )
                                                }
                                                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                              >
                                                <span className="material-symbols-outlined">
                                                  edit
                                                </span>
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            {loading && (
              <div className="w-100">
                <Spin tip="Loading" size="small">
                  <div
                    style={{
                      padding: 50,
                      background: "rgba(0, 0, 0, 0.05)",
                      borderRadius: 4,
                    }}
                  ></div>
                </Spin>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Hiển thị trang {coursePortalPage} trên tổng số {" "}
              {listCoursePortal?.totalPages} trang
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={coursePortalPage === 1}
                onClick={() => {
                  setCoursePortalPage(coursePortalPage - 1);
                }}
              >
                Trang Trước
              </button>
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={coursePortalPage === listCoursePortal?.totalPages}
                onClick={() => {
                  setCoursePortalPage(coursePortalPage + 1);
                }}
              >
                Kế Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePortalTable;
