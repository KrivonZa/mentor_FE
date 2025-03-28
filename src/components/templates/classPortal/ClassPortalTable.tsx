import React, { useContext, useState } from "react";
import "./index.scss";
import Search from "antd/es/input/Search";
import { ClassPortalContext } from "../../../modules/mainPage/ClassPortal";
import { toast } from "react-toastify";
import { toastLoadingSuccessAction } from "../../../utils/functions";
import Swal from "sweetalert2";
import classService from "../../../services/classService";
import { Calendar, Modal } from "antd";

export const ClassPortalTable = () => {
  const context = useContext(ClassPortalContext);
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [students, setStudents] = useState<Student[]>([]);

  interface Student {
    userID: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: boolean;
  }

  if (!context)
    throw new Error("Component must be used within a Class Portal Provider");

  const {
    loading,
    classPaginationParam,
    setClassPaginationParam,
    classPagination,
    closeClassModel,
    showClassModal,
    handleDeleteClass,
    fetchClassPortal,
    showSessionModal,
    setClassSchedules,
  } = context;

  const fetchStudents = async (classId) => {
    console.log(classId);
    try {
      const response = await classService.getClassStudent(classId);
      setStudents(response.data || []);
      setSelectedClassId(classId);
      setIsStudentModalVisible(true);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const handleCloseStudentModal = () => {
    setIsStudentModalVisible(false);
    setSelectedClassId(null);
    setStudents([]);
  };

  return (
    <div id="course-portal">
      <div id="webcrumbs">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Class & Schedule Management</h1>
          </div>
          <div className="flex justify-between items-center mb-3 pe-4">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(e) => {
                setClassPaginationParam({
                  ...classPaginationParam,
                  name: e,
                });
              }}
              className="border-black w-50"
            />
            <button
              onClick={() => showClassModal(null)}
              className="flex bg-[#5FCF80] rounded-lg text-white duration-300 gap-2 hover:bg-[#4ab569] hover:scale-105 items-center px-6 py-3 transform transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              Add New Class
            </button>
          </div>
          <div className="bg-white border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Class Description
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Course Name
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Class Stats
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Price
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Schedule
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Visible Status
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!loading &&
                  classPagination?.content?.map((item) => (
                    <React.Fragment key={item.classID}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{item.classDescription}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3 items-center">
                            <img
                              src={
                                item.courseDetail.thumbnail ||
                                "https://placehold.co/100x70"
                              }
                              alt="thumbnail"
                              className="h-[70px] rounded-lg w-[100px] object-cover"
                            />
                            <div>
                              <p className="font-medium">
                                {item.courseDetail.courseName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="d-flex align-content-center">
                            <span className="material-symbols-outlined">
                              person
                            </span>
                            {": "}
                            {item.totalStudent}
                          </div>
                          <div className="d-flex align-content-center">
                            <span className="material-symbols-outlined">
                              timer
                            </span>
                            {": "}
                            {item.totalSession}
                          </div>
                          <div className="d-flex align-content-center">
                            <span className="material-symbols-outlined">
                              personal_places
                            </span>
                            {": "}
                            {item.expectedStartDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4">
                          <button
                            className="btn btn-outline-primary btn-sm text-decoration-underline"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ color: "#198754" }}
                          >
                            View Schedules
                          </button>
                          <div className="dropdown-menu p-2">
                            <div className="d-flex flex-wrap justify-content-between gap-2">
                              {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                              ].map((day, index) => {
                                const dayOfWeek = index + 1;
                                const schedule = item.classSchedules.find(
                                  (s) => s.dayOfWeek === dayOfWeek
                                );
                                return (
                                  <div
                                    key={day}
                                    className={`p-2 text-center rounded flex-grow-1 ${
                                      schedule
                                        ? "bg-success-subtle text-success"
                                        : "bg-secondary-subtle text-muted"
                                    }`}
                                    style={{ minWidth: "100px" }}
                                  >
                                    <div className="fw-medium">{day}</div>
                                    {schedule ? (
                                      <div className="d-flex align-items-center justify-content-center gap-1">
                                        <span>
                                          {schedule.startTime.slice(0, 5)}-
                                          {schedule.endTime.slice(0, 5)}
                                        </span>
                                        <span className="fs-6 material-symbols-outlined">
                                          check
                                        </span>
                                      </div>
                                    ) : (
                                      <div>-</div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`badge rounded-pill text-white px-3 py-2 ${
                              !item.visibleStatus ? "bg-warning" : "bg-success"
                            }`}
                          >
                            {item.visibleStatus ? "Visible" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-column gap-2 items-center">
                            <div className="d-flex">
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={async () => {
                                  const result = await Swal.fire({
                                    title:
                                      "Delete class of: " +
                                      `"${item.courseDetail.courseName}"` +
                                      "?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                  });

                                  if (result.isConfirmed) {
                                    handleDeleteClass(item.classID);
                                  }
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </button>
                              <button
                                onClick={() => showClassModal(item)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </button>
                            </div>
                            <div className="d-flex">
                              <button
                                onClick={async () => {
                                  const currentStatus =
                                    item?.visibleStatus || false;
                                  let title = "Publish this class?";
                                  let text =
                                    "After this class got approved, everyone will able to view this!";
                                  let message = "Publish successfully";
                                  let confirmText = "Yes, publish it!";
                                  let reqStatus = true;
                                  if (currentStatus) {
                                    title = "Suppress this class?";
                                    text =
                                      "everyone will not able to view this!";
                                    message = "Suppress successfully";
                                    confirmText = "Yes, suppress it!";
                                    reqStatus = false;
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
                                    const loadingId =
                                      toast.loading("Update course...");
                                    await classService.setClassVisibility(
                                      item.classID,
                                      reqStatus
                                    );
                                    await fetchClassPortal();
                                    toastLoadingSuccessAction(
                                      loadingId,
                                      message
                                    );
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <span className="material-symbols-outlined">
                                  visibility
                                </span>
                              </button>
                              <button
                                onClick={async () => {
                                  setClassSchedules(item.classSchedules);
                                  showSessionModal(item);
                                }}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <span className="material-symbols-outlined">
                                  edit_calendar
                                </span>
                              </button>
                              <button
                                onClick={() => fetchStudents(item.classID)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <span className="material-symbols-outlined">
                                  group
                                </span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500 text-sm">
              Showing {classPaginationParam?.page} of{" "}
              {classPagination?.totalPages} entries
            </p>
            <div className="flex gap-2">
              <button
                className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
                disabled={classPaginationParam?.page <= 1}
                onClick={() => {
                  const newPage = classPaginationParam?.page - 1;
                  setClassPaginationParam((prev) => ({
                    ...prev,
                    page: newPage,
                  }));
                }}
              >
                Previous
              </button>
              <button
                className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
                disabled={
                  classPaginationParam?.page == classPagination?.totalPages
                }
                onClick={() => {
                  const newPage = classPaginationParam?.page + 1;
                  setClassPaginationParam((prev) => ({
                    ...prev,
                    page: newPage,
                  }));
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Student List"
        open={isStudentModalVisible}
        onCancel={handleCloseStudentModal}
        footer={null}
        width={600}
      >
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {students.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Full Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.userID} className="border-b">
                    <td className="p-2">{student.fullName}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.phoneNumber}</td>
                    <td className="p-2">
                      <span
                        className={`badge ${
                          student.status ? "bg-success" : "bg-danger"
                        } text-white px-2 py-1 rounded`}
                      >
                        {student.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">No students found</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ClassPortalTable;
