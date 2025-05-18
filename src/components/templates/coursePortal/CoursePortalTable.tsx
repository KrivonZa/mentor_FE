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
import { Empty } from "antd";
import Search from "antd/es/input/Search";
import { Spin } from "antd";
import {
  toastLoadingFailAction,
  toastLoadingSuccessAction,
} from "../../../utils/functions.ts";
import courseApprovalService from "../../../services/courseApprovalService.ts";

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
    const loadingId = toast.loading("Deleting lesson...");
    try {
      const response = await lessonService.deleteLesson(lessonID);
      await fetchPortalDetail();
      toastLoadingSuccessAction(loadingId, "Delete lesson success");
      // toast.success(response.message);
    } catch (error) {
      console.error(error);
      // toast.error("Delete lesson failed");
      toastLoadingFailAction(loadingId, "Delete lesson success");
    }
  };

  const handleDeleteCourse = async (courseID: number) => {
    try {
      const response = await courseService.deleteCourse(courseID);
      if (response) {
        const loadingId = toast.loading("Deleting course...");
        await fetchPortalDetail();
        toastLoadingSuccessAction(
          loadingId,
          "Deleting course: " + response.data.courseName + " successfully!"
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
            <h1 className="text-2xl font-bold">Course Management</h1>
          </div>
          <div className="flex justify-between items-center mb-3 pe-4">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(e) => {
                setCourseNameQuery(e);
              }}
              className="w-50 border-black"
            />
            <button
              onClick={() => {
                showCourseDetailModal(-1);
              }}
              className="bg-[#5FCF80] hover:bg-[#4ab569] transform hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span> Add New
              Course
            </button>
          </div>
          <div className="bg-white rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Course Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Verify Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
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
                                    BEGINNER
                                  </span>
                                );
                              case "INTERMEDIATE":
                                return (
                                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    INTERMEDIATE
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
                                    ADVANCED
                                  </span>
                                );
                              default:
                                return (
                                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                                    BEGINNER
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
                                    Approved
                                  </span>
                                );
                              case "PENDING":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "#f3b25c" }}
                                  >
                                    Pending
                                  </span>
                                );
                              case "REJECT":
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "purple" }}
                                  >
                                    Not Approved
                                  </span>
                                );
                              //BAN
                              default:
                                return (
                                  <span
                                    className="px-3 py-1 rounded-full text-sm fw-bolder d-flex align-items-center"
                                    style={{ color: "red" }}
                                  >
                                    Ban
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
                                      title:
                                        "Delete " +
                                        `"${course?.courseName}"` +
                                        "?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
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
                                      "You only allow to edit when course NOT APPROVE by Staff"
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
                                    toast.info("This course already approved!");
                                    return;
                                  }
                                  if (currentStatus == "PENDING") {
                                    toast.info(
                                      "This course will be review by our staff soon!"
                                    );
                                    return;
                                  }
                                  if (currentStatus == "BAN") {
                                    toast.info(
                                      "This course is no longer available"
                                    );
                                  }

                                  let title =
                                    "Request staff to verify this course?";
                                  let text =
                                    "You will no longer able to edit this course";
                                  let message = "Request Sent";
                                  let confirmText = "Yes, do it!";

                                  const result = await Swal.fire({
                                    title: title,
                                    text: text,
                                    icon: "info",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: confirmText,
                                  });

                                  if (result.isConfirmed) {
                                    const loadingId = toast.loading(
                                      "Sending your request..."
                                    );
                                    try {
                                      await courseApprovalService.createCourseApprovalRequest(
                                        course.courseID
                                      );
                                      toastLoadingSuccessAction(
                                        loadingId,
                                        "Your request will be review by our staff soon"
                                      );
                                      await fetchPortalDetail();
                                    } catch (error) {
                                      toastLoadingFailAction(
                                        loadingId,
                                        "There's a problem with your request, please try again soon"
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
                              <span>View Lesson</span>
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
                                    Add Lesson
                                  </button>
                                )}
                              </div>
                              <table className="w-full">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Lesson ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Description
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Trial
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Created At
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                      Actions
                                    </th>
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
                                                      title: "Are you sure?",
                                                      text: "You won't be able to revert this!",
                                                      icon: "warning",
                                                      showCancelButton: true,
                                                      confirmButtonColor:
                                                        "#3085d6",
                                                      cancelButtonColor: "#d33",
                                                      confirmButtonText:
                                                        "Yes, delete it!",
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
              Showing {coursePortalPage} of {listCoursePortal?.totalPages}{" "}
              entries
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={coursePortalPage === 1}
                onClick={() => {
                  setCoursePortalPage(coursePortalPage - 1);
                }}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={coursePortalPage === listCoursePortal?.totalPages}
                onClick={() => {
                  setCoursePortalPage(coursePortalPage + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePortalTable;
