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
  } = context;

  const handleDeleteLesson = async (lessonID: number) => {
    try {
      const response = await lessonService.deleteLesson(lessonID);
      await fetchPortalDetail();
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error("Delete lesson failed");
    }
  };

  const handleDeleteCourse = async (courseID: number) => {
    try {
      const response = await courseService.deleteCourse(courseID);
      if (response) {
        await fetchPortalDetail();
        console.log("res: ", response);
        toast.success(response.message);
        return;
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchPortalDetail();
  }, []);

  return (
    <div id="course-portal">
      <div id="webcrumbs">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Course Management</h1>
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
                    Mentor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Students
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
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
                {listCoursePortal?.map((course, index) => (
                  <React.Fragment key={course.courseID}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              course.thumbnail || "https://placehold.co/100x70"
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
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">{course.price} VND</td>
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
                      <td className="px-6 py-4">{course.totalStudent}</td>
                      <td className="px-6 py-4">
                        {(() => {
                          switch (course.status) {
                            case "ON":
                              return (
                                <span
                                  className="px-3 py-1 rounded-full text-sm"
                                  style={{
                                    background: "#CCFFCC",
                                    color: "#00CC66",
                                  }}
                                >
                                  Active
                                </span>
                              );
                            default:
                              return (
                                <span
                                  className="px-3 py-1 rounded-full text-sm"
                                  style={{
                                    background: "#e6f373",
                                    color: "red",
                                  }}
                                >
                                  InActive
                                </span>
                              );
                          }
                        })()}
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
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={async () => {
                                const result = await Swal.fire({
                                  title:
                                    "Delete " + `"${course?.courseName}"` + "?",
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
                          </div>
                          <div className="d-flex">
                            <button
                              onClick={async () => {
                                const currentStatus = course.status;
                                let title = "Publish this course?";
                                let text =
                                  "After this course got approved, everyone will able to view this!";
                                let message = "Publish successfully";
                                let confirmText = "Yes, publish it!";
                                let reqStatus = "ON";
                                if (currentStatus == "ON") {
                                  title = "Suppress this course?";
                                  text = "everyone will not able to view this!";
                                  message = "Suppress successfully";
                                  confirmText = "Yes, suppress it!";
                                  reqStatus = "OFF";
                                }
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
                                  await courseService.publishCourse(
                                    course.courseID,
                                    reqStatus
                                  );
                                  await fetchPortalDetail();
                                  toast.success(message);
                                  // await handleDeleteLesson(lesson.lessonID); // Wait for deletion
                                }
                              }}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                toast.warning(
                                  "This feature is not available yet."
                                );
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
                                    Status
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                    Trial
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                    Created At
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                    Schedules Count
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {course.lesson.length == 0 && (
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
                                    <td className="px-4 py-3 text-sm">
                                      #{lesson.lessonID}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                      {lesson.description}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                                        {lesson.lessonStatus}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      {lesson.lessonStatus ? (
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
                                    <td className="px-4 py-3 text-sm text-center">
                                      {lesson.schedule.length}
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex gap-2">
                                        <button
                                          onClick={async () => {
                                            const result = await Swal.fire({
                                              title: "Are you sure?",
                                              text: "You won't be able to revert this!",
                                              icon: "warning",
                                              showCancelButton: true,
                                              confirmButtonColor: "#3085d6",
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
                                        <button
                                          onClick={() => {
                                            handleOpenScheduleModal(
                                              lesson.lessonID
                                            );
                                          }}
                                          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                          <span className="material-symbols-outlined">
                                            schedule
                                          </span>
                                        </button>
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
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Showing 1 to 1 of 1 entries</p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled
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
