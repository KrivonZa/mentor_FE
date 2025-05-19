import React, { useContext, useEffect } from "react";
import SkeletonCourse from "../../ui/SkeletonCourse";
import { CourseContext } from "../../../modules/mainPage/Courses";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import CustomSearch from "../../ui/CustomSearch";
import Swal from "sweetalert2";

export const CourseRender = () => {
  const { courseList, isLoading, classFilter, setClassFilter, setCourseList } =
    useContext(CourseContext);

  // Hiển thị thông báo loading khi đang tải dữ liệu
  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: "Đang tải toàn bộ khoá học",
        html: "Vui lòng chờ trong giây lát...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [isLoading]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      // setclassFilter.page(page);
      setClassFilter({
        ...classFilter,
        page: page,
      });
    }
  };

  // Tính tổng số trang
  const totalPages = courseList?.totalPages || 0;

  // Kiểm tra xem có courses nào không
  const hasCourses = courseList?.content?.length > 0;

  return (
    <section id="courses" className="courses section">
      <div className="container-fluid" style={{ width: "90%" }}>
        <div className="row">
          <div className="mb-5">
            <CustomSearch
              classFilter={classFilter}
              setClassFilter={setClassFilter}
              setCourseList={setCourseList}
            />
          </div>

          {isLoading ? (
            <div className="col-12 d-flex justify-content-center">
              <SkeletonCourse />
              <SkeletonCourse />
              <SkeletonCourse />
            </div>
          ) : !hasCourses ? (
            <div className="col-12 text-center py-5">
              <div
                className="alert alert-info p-5"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i className="bi bi-info-circle me-2 fs-4"></i>
                <span className="fs-4">Chưa có khoá học nào mở bán</span>
                <p className="mt-3">
                  Vui lòng quay lại sau hoặc thử tìm kiếm với từ khóa khác
                </p>
              </div>
            </div>
          ) : (
            courseList?.content?.map((course) => {
              const expectedDate = course?.expectedStartDate
                ? new Date(course.expectedStartDate)
                : null;
              const today = new Date();
              const isToday =
                expectedDate?.toDateString() === today.toDateString();
              return (
                <div
                  key={course?.courseID || 0}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 d-flex align-items-stretch mb-5"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  style={{ height: "495px" }}
                >
                  <div
                    className="w-100 course-item"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 25px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0, 0, 0, 0.15)";
                    }}
                  >
                    <img
                      src={course.courseDetail.thumbnail}
                      className="img-fluid"
                      alt={course.courseDetail.courseName}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div
                      className="d-flex flex-column justify-content-between course-content"
                      style={{ height: "295px", padding: "15px" }}
                    >
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div
                            className="d-flex w-75"
                            style={{
                              gap: 5,
                              overflowX: "auto",
                              scrollbarWidth: "none",
                            }}
                          >
                            {course.courseDetail.skills.map((skill) => (
                              <span
                                className="category"
                                key={skill.skillID}
                                style={{
                                  whiteSpace: "nowrap",
                                  borderRadius: "20px",
                                }}
                              >
                                {skill.skillName}
                              </span>
                            ))}
                          </div>
                          <div className="price" style={{ fontWeight: "bold" }}>
                            {course?.price?.toLocaleString()}đ
                          </div>
                        </div>

                        {/* nav to courseDetail */}
                        <h3>
                          <Link
                            to={`/courses/${course?.classID}`}
                            state={{
                              courseName: course.courseDetail.courseName,
                            }}
                            style={{
                              color: "#5fcf80",
                              textDecoration: "none",
                              transition: "color 0.3s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.color = "#4baa6a")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.color = "#5fcf80")
                            }
                          >
                            {course?.courseDetail.courseName}
                          </Link>
                        </h3>
                        <p
                          className="description"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {course?.classDescription}
                        </p>
                      </div>
                      <div
                        className={`alert ${
                          isToday ? "alert-warning" : "alert-success"
                        }`}
                        style={{
                          borderRadius: "8px",
                          padding: "8px 12px",
                          marginBottom: "10px",
                        }}
                      >
                        <strong>Ngày Bắt Đầu:</strong>{" "}
                        {expectedDate
                          ? new Intl.DateTimeFormat("en-GB").format(
                              expectedDate
                            )
                          : "N/A"}
                      </div>
                      <div className="d-flex align-items-center justify-content-between trainer">
                        <div className="d-flex align-items-center trainer-profile">
                          <img
                            src={course.mentorInfo.avatar}
                            className="img-fluid"
                            alt={course.mentorInfo.mentorName}
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "cover",
                              border: "2px solid #5fcf80",
                              borderRadius: "50%",
                            }}
                          />
                          <a
                            href=""
                            className="trainer-link"
                            style={{
                              marginLeft: "10px",
                              color: "#444",
                              fontWeight: "600",
                              textDecoration: "none",
                            }}
                          >
                            {course.mentorInfo.mentorName}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chỉ hiển thị phân trang khi không đang loading và có courses */}
        {!isLoading && hasCourses && totalPages > 0 && (
          <div>
            <nav aria-label="Page navigation">
              <ul className="justify-content-center pagination">
                {/* Nút Trang Trước */}
                <li
                  className={`page-item ${
                    classFilter.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(classFilter.page - 1)}
                    disabled={classFilter.page === 1}
                    style={{
                      fontWeight: "600",
                      borderRadius: "6px",
                      margin: "0 5px",
                      border: "none",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      padding: "8px 15px",
                    }}
                  >
                    Trang Trước
                  </button>
                </li>

                {/* Các nút số trang */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className="page-item">
                    <button
                      style={{
                        padding: "8px 0",
                        width: "40px",
                        backgroundColor:
                          classFilter.page === index + 1
                            ? "#5fcf80"
                            : "#f1f1f1",
                        fontWeight: "600",
                        border: "none",
                        color:
                          classFilter.page === index + 1 ? "white" : "#333",
                        borderRadius: "6px",
                        margin: "0 5px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => handlePageChange(index + 1)}
                      onMouseOver={(e) => {
                        if (classFilter.page !== index + 1) {
                          e.currentTarget.style.backgroundColor = "#e0e0e0";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (classFilter.page !== index + 1) {
                          e.currentTarget.style.backgroundColor = "#f1f1f1";
                        }
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                {/* Nút Kế Tiếp */}
                <li
                  className={`page-item ${
                    classFilter.page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(classFilter.page + 1)}
                    disabled={classFilter.page === totalPages}
                    style={{
                      fontWeight: "600",
                      borderRadius: "6px",
                      margin: "0 5px",
                      border: "none",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      padding: "8px 15px",
                    }}
                  >
                    Kế Tiếp
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseRender;
