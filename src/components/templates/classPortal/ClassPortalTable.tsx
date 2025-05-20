import React, { useContext, useState } from "react";
import "./index.scss";
import Search from "antd/es/input/Search";
import { ClassPortalContext } from "../../../modules/mainPage/ClassPortal";
import { toast } from "react-toastify";
import { toastLoadingSuccessAction } from "../../../utils/functions";
import Swal from "sweetalert2";
import classService from "../../../services/classService";
import { Calendar, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
            <h1 className="text-2xl font-bold">Quản Lý Lớp Học Theo Lịch</h1>
          </div>
          <div className="row">
            <div className="col-sm-9 flex justify-between items-center mb-3 pe-4">
              <Input.Search
                placeholder="Tìm kiếm lớp học của bạn"
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
                  setClassPaginationParam({
                    ...classPaginationParam,
                    name: e,
                  });
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
                onClick={() => showClassModal(null)}
                className="bg-[#5FCF80] hover:bg-[#4ab569] transform hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span> Thêm Lớp
                Học
              </button>
            </div>
          </div>
          <div className="bg-white border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Mô Tả Lớp Học
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Tên Khoá Học
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                   Thông Tin Chung
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Học Phí
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Lịch Học
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Trạng Thái
                  </th>
                  <th className="text-left text-sm font-semibold px-6 py-4">
                    Công Cụ Quản Lý
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
                            Xem Lịch Chi Tiết
                          </button>
                          <div className="dropdown-menu p-2">
                            <div className="d-flex flex-wrap justify-content-between gap-2">
                              {[
                                "Thứ 2",
                                "Thứ 3",
                                "Thứ 4",
                                "Thứ 5",
                                "Thứ 6",
                                "Thứ 7",
                                "Chủ Nhật",
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
                                        <span style={{fontWeight: "700"}}>
                                          {schedule.startTime.slice(0, 5)}-
                                          {schedule.endTime.slice(0, 5)}
                                        </span>
                                        {/* <span className="fs-6 material-symbols-outlined">
                                          check
                                        </span> */}
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
                            {item.visibleStatus ? "Đã Xuất Bản" : "Đang Ẩn"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-column gap-2 items-center">
                            <div className="d-flex">
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                                  let title = "Xuất bản lớp học này?";
                                  let text =
                                    "Sau khi lớp học này được xuất bản, toàn bộ các học viên trên EmpowerU đều sẽ có thể nhìn thấy và đăng ký học lớp học này.";
                                  let message = "Xuất bản thành công!";
                                  let confirmText = "Tôi đã hiểu và đồng ý!";
                                  let reqStatus = true;
                                  if (currentStatus) {
                                    title = "Ẩn lớp học này?";
                                    text =
                                      "Sau khi ẩn lớp học này, toàn bộ các học viên trên EmpowerU đều sẽ không thể xem được khóa học này nữa.";
                                    message = "Ẩn lớp học thành công!";
                                    confirmText = "Tôi đã hiểu và đồng ý!";

                                    reqStatus = false;
                                  }
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
                                      "Đang cập nhật lớp học..."
                                    );
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
              Hiển thị trang {classPaginationParam?.page} trên tổng số{" "}
              {classPagination?.totalPages} trang
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
                Trang Trước
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
                Kế Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Danh Sách Học Viên"
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
                  <th className="text-left p-2">Họ Và Tên</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Số Điện Thoại</th>
                  <th className="text-left p-2">Trạng Thái</th>
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
                        {student.status ? "Hoạt Động" : "Không Hoạt Động"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">Hiện tại lớp học này chưa có học viên nào.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ClassPortalTable;
