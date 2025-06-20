// import React, { useContext, useEffect } from "react";
// import SkeletonCourse from "../../ui/SkeletonCourse";
// import { CourseContext } from "../../../modules/mainPage/Courses";
// import { Link } from "react-router-dom";
// import Search from "antd/es/input/Search";
// import CustomSearch from "../../ui/CustomSearch";
// import Swal from "sweetalert2";

// export const CourseRender = () => {
//   const { courseList, isLoading, classFilter, setClassFilter, setCourseList } =
//     useContext(CourseContext);

//   // Hiển thị thông báo loading khi đang tải dữ liệu
//   useEffect(() => {
//     if (isLoading) {
//       Swal.fire({
//         title: "Đang tải toàn bộ khoá học",
//         html: "Vui lòng chờ trong giây lát...",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });
//     } else {
//       Swal.close();
//     }
//   }, [isLoading]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       // setclassFilter.page(page);
//       setClassFilter({
//         ...classFilter,
//         page: page,
//       });
//     }
//   };

//   // Tính tổng số trang
//   const totalPages = courseList?.totalPages || 0;

//   // Kiểm tra xem có courses nào không
//   const hasCourses = courseList?.content?.length > 0;

//   return (
//     <section id="courses" className="courses section">
//       <div className="container-fluid" style={{ width: "90%" }}>
//         <div className="row">
//           <div className="mb-5">
//             <CustomSearch
//               classFilter={classFilter}
//               setClassFilter={setClassFilter}
//               setCourseList={setCourseList}
//             />
//           </div>

//           {isLoading ? (
//             <div className="col-12 d-flex justify-content-center">
//               <SkeletonCourse />
//               <SkeletonCourse />
//               <SkeletonCourse />
//             </div>
//           ) : !hasCourses ? (
//             <div className="col-12 text-center py-5">
//               <div
//                 className="alert alert-info p-5"
//                 style={{
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <i className="bi bi-info-circle me-2 fs-4"></i>
//                 <span className="fs-4">Chưa có khoá học nào mở bán</span>
//                 <p className="mt-3">
//                   Vui lòng quay lại sau hoặc thử tìm kiếm với từ khóa khác
//                 </p>
//               </div>
//             </div>
//           ) : (
//             courseList?.content?.map((course) => {
//               const expectedDate = course?.expectedStartDate
//                 ? new Date(course.expectedStartDate)
//                 : null;
//               const today = new Date();
//               const isToday =
//                 expectedDate?.toDateString() === today.toDateString();
//               return (
//                 <div
//                   key={course?.courseID || 0}
//                   className="col-xl-3 col-lg-4 col-md-6 col-sm-6 d-flex align-items-stretch mb-5"
//                   data-aos="zoom-in"
//                   data-aos-delay="100"
//                   style={{ height: "495px" }}
//                 >
//                   <div
//                     className="w-100 course-item"
//                     style={{
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 12px 25px rgba(0, 0, 0, 0.2)";
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 20px rgba(0, 0, 0, 0.15)";
//                     }}
//                   >
//                     <img
//                       src={course.courseDetail.thumbnail}
//                       className="img-fluid"
//                       alt={course.courseDetail.courseName}
//                       style={{
//                         height: "200px",
//                         objectFit: "cover",
//                         width: "100%",
//                       }}
//                     />
//                     <div
//                       className="d-flex flex-column justify-content-between course-content"
//                       style={{ height: "295px", padding: "15px" }}
//                     >
//                       <div>
//                         <div className="d-flex align-items-center justify-content-between mb-3">
//                           <div
//                             className="d-flex w-75"
//                             style={{
//                               gap: 5,
//                               overflowX: "auto",
//                               scrollbarWidth: "none",
//                             }}
//                           >
//                             {course.courseDetail.skills.map((skill) => (
//                               <span
//                                 className="category"
//                                 key={skill.skillID}
//                                 style={{
//                                   whiteSpace: "nowrap",
//                                   borderRadius: "20px",
//                                 }}
//                               >
//                                 {skill.skillName}
//                               </span>
//                             ))}
//                           </div>
//                           <div className="price" style={{ fontWeight: "bold" }}>
//                             {course?.price?.toLocaleString()}đ
//                           </div>
//                         </div>

//                         {/* nav to courseDetail */}
//                         <h3>
//                           <Link
//                             to={`/courses/${course?.classID}`}
//                             state={{
//                               courseName: course.courseDetail.courseName,
//                             }}
//                             style={{
//                               color: "#5fcf80",
//                               textDecoration: "none",
//                               transition: "color 0.3s ease",
//                             }}
//                             onMouseOver={(e) =>
//                               (e.currentTarget.style.color = "#4baa6a")
//                             }
//                             onMouseOut={(e) =>
//                               (e.currentTarget.style.color = "#5fcf80")
//                             }
//                           >
//                             {course?.courseDetail.courseName}
//                           </Link>
//                         </h3>
//                         <p
//                           className="description"
//                           style={{
//                             display: "-webkit-box",
//                             WebkitLineClamp: "3",
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {course?.classDescription}
//                         </p>
//                       </div>
//                       <div
//                         className={`alert ${
//                           isToday ? "alert-warning" : "alert-success"
//                         }`}
//                         style={{
//                           borderRadius: "8px",
//                           padding: "8px 12px",
//                           marginBottom: "10px",
//                         }}
//                       >
//                         <strong>Ngày Bắt Đầu:</strong>{" "}
//                         {expectedDate
//                           ? new Intl.DateTimeFormat("en-GB").format(
//                               expectedDate
//                             )
//                           : "N/A"}
//                       </div>
//                       <div className="d-flex align-items-center justify-content-between trainer">
//                         <div className="d-flex align-items-center trainer-profile">
//                           <img
//                             src={course.mentorInfo.avatar}
//                             className="img-fluid"
//                             alt={course.mentorInfo.mentorName}
//                             style={{
//                               height: "50px",
//                               width: "50px",
//                               objectFit: "cover",
//                               border: "2px solid #5fcf80",
//                               borderRadius: "50%",
//                             }}
//                           />
//                           <a
//                             href=""
//                             className="trainer-link"
//                             style={{
//                               marginLeft: "10px",
//                               color: "#444",
//                               fontWeight: "600",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {course.mentorInfo.mentorName}
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Chỉ hiển thị phân trang khi không đang loading và có courses */}
// {!isLoading && hasCourses && totalPages > 0 && (
//   <div>
//     <nav aria-label="Page navigation">
//       <ul className="justify-content-center pagination">
//         {/* Nút Trang Trước */}
//         <li
//           className={`page-item ${
//             classFilter.page === 1 ? "disabled" : ""
//           }`}
//         >
//           <button
//             className="page-link"
//             onClick={() => handlePageChange(classFilter.page - 1)}
//             disabled={classFilter.page === 1}
//             style={{
//               fontWeight: "600",
//               borderRadius: "6px",
//               margin: "0 5px",
//               border: "none",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               padding: "8px 15px",
//             }}
//           >
//             Trang Trước
//           </button>
//         </li>

//         {/* Các nút số trang */}
//         {Array.from({ length: totalPages }, (_, index) => (
//           <li key={index + 1} className="page-item">
//             <button
//               style={{
//                 padding: "8px 0",
//                 width: "40px",
//                 backgroundColor:
//                   classFilter.page === index + 1
//                     ? "#5fcf80"
//                     : "#f1f1f1",
//                 fontWeight: "600",
//                 border: "none",
//                 color:
//                   classFilter.page === index + 1 ? "white" : "#333",
//                 borderRadius: "6px",
//                 margin: "0 5px",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//               onClick={() => handlePageChange(index + 1)}
//               onMouseOver={(e) => {
//                 if (classFilter.page !== index + 1) {
//                   e.currentTarget.style.backgroundColor = "#e0e0e0";
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (classFilter.page !== index + 1) {
//                   e.currentTarget.style.backgroundColor = "#f1f1f1";
//                 }
//               }}
//             >
//               {index + 1}
//             </button>
//           </li>
//         ))}

//         {/* Nút Kế Tiếp */}
//         <li
//           className={`page-item ${
//             classFilter.page === totalPages ? "disabled" : ""
//           }`}
//         >
//           <button
//             className="page-link"
//             onClick={() => handlePageChange(classFilter.page + 1)}
//             disabled={classFilter.page === totalPages}
//             style={{
//               fontWeight: "600",
//               borderRadius: "6px",
//               margin: "0 5px",
//               border: "none",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               padding: "8px 15px",
//             }}
//           >
//             Kế Tiếp
//           </button>
//         </li>
//       </ul>
//     </nav>
//   </div>
// )}
//       </div>
//     </section>
//   );
// };

// export default CourseRender;
import React, { useContext, useEffect } from "react";
import SkeletonCourse from "../../ui/SkeletonCourse";
import { CourseContext } from "../../../modules/mainPage/Courses";
import { Link } from "react-router-dom";
import CustomSearch from "./CustomSearch";
import Swal from "sweetalert2";

export const CourseRender = () => {
  const { courseList, isLoading, changePage, pagination } =
    useContext(CourseContext);

  // Hiển thị thông báo loading khi đang tải dữ liệu
  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: "Đang tải khóa học",
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
    changePage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Tính tổng số trang
  const totalPages = courseList?.totalPages || 0;

  // Kiểm tra xem có courses nào không
  const hasCourses = courseList?.content?.length > 0;

  return (
    <section
      id="courses"
      className="courses section"
      style={{
        backgroundColor: "#fafffe",
        minHeight: "100vh",
        paddingTop: "40px",
        position: "relative",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(95, 207, 128, 0.05) 0%, rgba(75, 170, 106, 0.02) 100%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "-5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(95, 207, 128, 0.08) 0%, rgba(75, 170, 106, 0.03) 100%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <div
        className="container-fluid"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="row">
          <div className="mb-5">
            <CustomSearch />
          </div>

          {isLoading ? (
            <div className="col-12 d-flex justify-content-center flex-wrap gap-4">
              <SkeletonCourse />
              <SkeletonCourse />
              <SkeletonCourse />
            </div>
          ) : !hasCourses ? (
            <div className="col-12">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  borderRadius: "30px",
                  padding: "80px 40px",
                  border: "2px dashed rgba(95, 207, 128, 0.3)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "6rem",
                    color: "rgba(95, 207, 128, 0.1)",
                    transform: "rotate(15deg)",
                  }}
                >
                  <i className="bi bi-search"></i>
                </div>

                <div
                  style={{
                    fontSize: "4rem",
                    color: "#5fcf80",
                    marginBottom: "20px",
                    animation: "bounce 2s infinite",
                  }}
                >
                  <i className="bi bi-mortarboard"></i>
                </div>
                <h3
                  style={{
                    color: "#2d5a3d",
                    marginBottom: "16px",
                    fontWeight: "700",
                    fontSize: "1.8rem",
                  }}
                >
                  Không tìm thấy khóa học nào
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "1.1rem",
                    maxWidth: "500px",
                    margin: "0 auto",
                  }}
                >
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác để khám
                  phá thêm nhiều khóa học thú vị
                </p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {courseList?.content?.map((course, index) => {
                const expectedDate = course?.expectedStartDate
                  ? new Date(course.expectedStartDate)
                  : null;
                const today = new Date();
                const isToday =
                  expectedDate?.toDateString() === today.toDateString();

                return (
                  <div
                    key={course?.courseID || index}
                    className="col-xl-4 col-lg-6 col-md-6 col-12"
                    data-aos="fade-up"
                    data-aos-delay={100 + (index % 3) * 100}
                  >
                    <div
                      style={{
                        borderRadius: "25px",
                        overflow: "hidden",
                        background:
                          "linear-gradient(145deg, #ffffff 0%, #f8fffe 100%)",
                        boxShadow: "0 15px 35px rgba(95, 207, 128, 0.1)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid rgba(95, 207, 128, 0.08)",
                        height: "auto",
                        minHeight: "600px",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-12px) scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "0 25px 50px rgba(95, 207, 128, 0.25), 0 0 0 1px rgba(95, 207, 128, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(95, 207, 128, 0.2)";

                        // Add green glow effect
                        const glowElement =
                          e.currentTarget.querySelector(".course-glow");
                        if (glowElement) {
                          glowElement.style.opacity = "1";
                        }

                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 15px 35px rgba(95, 207, 128, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(95, 207, 128, 0.08)";

                        // Remove green glow effect
                        const glowElement =
                          e.currentTarget.querySelector(".course-glow");
                        if (glowElement) {
                          glowElement.style.opacity = "0";
                        }

                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      {/* Green glow effect */}
                      <div
                        className="course-glow"
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "-5px",
                          right: "-5px",
                          bottom: "-5px",
                          background:
                            "linear-gradient(135deg, rgba(95, 207, 128, 0.3) 0%, rgba(75, 170, 106, 0.2) 100%)",
                          borderRadius: "30px",
                          opacity: "0",
                          transition: "opacity 0.4s ease",
                          zIndex: "-1",
                          filter: "blur(10px)",
                        }}
                      />

                      {/* Image Container */}
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "25px 25px 0 0",
                        }}
                      >
                        <img
                          src={course.courseDetail.thumbnail}
                          className="img-fluid"
                          alt={course.courseDetail.courseName}
                          style={{
                            height: "220px",
                            objectFit: "cover",
                            width: "100%",
                            transition: "transform 0.4s ease",
                          }}
                        />

                        {/* Price Badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background:
                              "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            fontWeight: "700",
                            fontSize: "1rem",
                            boxShadow: "0 8px 20px rgba(95, 207, 128, 0.4)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          {course?.price?.toLocaleString()}đ
                        </div>

                        {/* Course Level Badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            background:
                              course.courseDetail.courseLevel === "BEGINNER"
                                ? "rgba(34, 197, 94, 0.9)"
                                : course.courseDetail.courseLevel ===
                                  "INTERMEDIATE"
                                ? "rgba(59, 130, 246, 0.9)"
                                : "rgba(239, 68, 68, 0.9)",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "15px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          {course.courseDetail.courseLevel}
                        </div>
                      </div>

                      {/* Content Container */}
                      <div
                        style={{
                          padding: "28px",
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ flex: "1" }}>
                          {/* Course Title */}
                          <h3 style={{ margin: "0 0 16px 0" }}>
                            <Link
                              to={`/courses/${course?.classID}`}
                              state={{
                                courseName: course.courseDetail.courseName,
                              }}
                              style={{
                                color: "#2d5a3d",
                                textDecoration: "none",
                                fontSize: "1.4rem",
                                fontWeight: "700",
                                lineHeight: "1.4",
                                transition: "color 0.3s ease",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#5fcf80";
                                e.currentTarget.style.textShadow =
                                  "0 2px 4px rgba(95, 207, 128, 0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#2d5a3d";
                                e.currentTarget.style.textShadow = "none";
                              }}
                            >
                              {course?.courseDetail.courseName}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p
                            style={{
                              color: "#666",
                              fontSize: "0.95rem",
                              lineHeight: "1.6",
                              display: "-webkit-box",
                              WebkitLineClamp: "3",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              marginBottom: "20px",
                            }}
                          >
                            {course?.classDescription}
                          </p>
                        </div>

                        {/* Bottom Section */}
                        <div>
                          {/* Start Date */}
                          <div
                            style={{
                              borderRadius: "15px",
                              padding: "12px 16px",
                              marginBottom: "20px",
                              border: "none",
                              fontWeight: "600",
                              background: isToday
                                ? "linear-gradient(135deg, #fff3cd 0%, #fef3c7 100%)"
                                : "linear-gradient(135deg, #d1f2dd 0%, #dcfce7 100%)",
                              color: isToday ? "#856404" : "#155724",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <i
                              className={`bi ${
                                isToday ? "bi-clock" : "bi-calendar-check"
                              }`}
                            ></i>
                            <div>
                              <div
                                style={{ fontSize: "0.8rem", opacity: "0.8" }}
                              >
                                Ngày Bắt Đầu
                              </div>
                              <div style={{ fontSize: "0.95rem" }}>
                                {expectedDate
                                  ? new Intl.DateTimeFormat("vi-VN").format(
                                      expectedDate
                                    )
                                  : "Chưa xác định"}
                              </div>
                            </div>
                          </div>

                          {/* Mentor Info */}
                          <div
                            style={{
                              background: "rgba(95, 207, 128, 0.05)",
                              borderRadius: "18px",
                              padding: "16px",
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid rgba(95, 207, 128, 0.1)",
                            }}
                          >
                            <div style={{ position: "relative" }}>
                              <img
                                src={course.mentorInfo.avatar}
                                className="img-fluid"
                                alt={course.mentorInfo.mentorName}
                                style={{
                                  height: "55px",
                                  width: "55px",
                                  objectFit: "cover",
                                  border: "3px solid #5fcf80",
                                  borderRadius: "50%",
                                  boxShadow:
                                    "0 4px 12px rgba(95, 207, 128, 0.3)",
                                }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "-2px",
                                  right: "-2px",
                                  width: "18px",
                                  height: "18px",
                                  background: "#22c55e",
                                  borderRadius: "50%",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                              ></div>
                            </div>
                            <div style={{ flex: 1, marginLeft: "16px" }}>
                              <a
                                href="#"
                                style={{
                                  color: "#2d5a3d",
                                  fontWeight: "700",
                                  textDecoration: "none",
                                  fontSize: "1rem",
                                  transition: "color 0.3s ease",
                                  display: "block",
                                  marginBottom: "4px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#5fcf80";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#2d5a3d";
                                }}
                              >
                                {course.mentorInfo.mentorName}
                              </a>
                              <div
                                style={{
                                  fontSize: "0.85rem",
                                  color: "#666",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <i
                                  className="bi bi-mortarboard"
                                  style={{ color: "#5fcf80" }}
                                ></i>
                                Mentor
                              </div>
                            </div>
                            <div
                              style={{
                                background:
                                  "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
                                color: "white",
                                padding: "6px 10px",
                                borderRadius: "12px",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>

                          {/* Skills Section */}
                          <div style={{ marginTop: "20px" }}>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                color: "#666",
                                marginBottom: "10px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              <strong>Kỹ Năng</strong>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                maxHeight: "60px",
                                overflowY: "auto",
                              }}
                            >
                              {course.courseDetail.skills
                                .slice(0, 3)
                                .map((skill) => (
                                  <span
                                    key={skill.skillID}
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
                                      color: "white",
                                      padding: "6px 12px",
                                      borderRadius: "15px",
                                      fontSize: "0.8rem",
                                      fontWeight: "600",
                                      whiteSpace: "nowrap",
                                      boxShadow:
                                        "0 4px 8px rgba(95, 207, 128, 0.3)",
                                      transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform =
                                        "translateY(-2px)";
                                      e.currentTarget.style.boxShadow =
                                        "0 6px 12px rgba(95, 207, 128, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform =
                                        "translateY(0)";
                                      e.currentTarget.style.boxShadow =
                                        "0 4px 8px rgba(95, 207, 128, 0.3)";
                                    }}
                                  >
                                    {skill.skillName}
                                  </span>
                                ))}
                              {course.courseDetail.skills.length > 3 && (
                                <span
                                  style={{
                                    background: "rgba(95, 207, 128, 0.15)",
                                    color: "#2d5a3d",
                                    padding: "6px 12px",
                                    borderRadius: "15px",
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    border: "1px solid rgba(95, 207, 128, 0.3)",
                                  }}
                                >
                                  +{course.courseDetail.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {!isLoading && hasCourses && totalPages > 1 && (
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)",
              borderRadius: "25px",
              padding: "30px",
              boxShadow: "0 15px 35px rgba(95, 207, 128, 0.1)",
              marginTop: "50px",
              border: "1px solid rgba(95, 207, 128, 0.08)",
            }}
          >
            <nav aria-label="Page navigation">
              <ul
                className="justify-content-center pagination mb-0"
                style={{ gap: "8px" }}
              >
                {/* Previous Button */}
                <li
                  className={`page-item ${
                    pagination.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    style={{
                      border: "none",
                      borderRadius: "15px",
                      margin: "0 4px",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                      padding: "12px 20px",
                      backgroundColor:
                        pagination.page === 1 ? "#f8f9fa" : "#5fcf80",
                      color: pagination.page === 1 ? "#6c757d" : "white",
                      boxShadow:
                        pagination.page === 1
                          ? "none"
                          : "0 4px 12px rgba(95, 207, 128, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      if (pagination.page !== 1) {
                        e.currentTarget.style.backgroundColor = "#4baa6a";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 16px rgba(95, 207, 128, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pagination.page !== 1) {
                        e.currentTarget.style.backgroundColor = "#5fcf80";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(95, 207, 128, 0.3)";
                      }
                    }}
                  >
                    <i className="bi bi-chevron-left me-1"></i>
                    Trước
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = index + 1;
                  } else if (pagination.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = pagination.page - 2 + index;
                  }

                  return (
                    <li key={pageNum} className="page-item">
                      <button
                        style={{
                          border: "none",
                          borderRadius: "12px",
                          margin: "0 2px",
                          transition: "all 0.3s ease",
                          fontWeight: "600",
                          padding: "12px 16px",
                          minWidth: "50px",
                          backgroundColor:
                            pagination.page === pageNum ? "#5fcf80" : "white",
                          color:
                            pagination.page === pageNum ? "white" : "#2d5a3d",
                          boxShadow:
                            pagination.page === pageNum
                              ? "0 4px 12px rgba(95, 207, 128, 0.3)"
                              : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() => handlePageChange(pageNum)}
                        onMouseEnter={(e) => {
                          if (pagination.page !== pageNum) {
                            e.currentTarget.style.backgroundColor = "#f8f9fa";
                            e.currentTarget.style.borderColor = "#5fcf80";
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(95, 207, 128, 0.2)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (pagination.page !== pageNum) {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0, 0, 0, 0.1)";
                          }
                        }}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    pagination.page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === totalPages}
                    style={{
                      border: "none",
                      borderRadius: "15px",
                      margin: "0 4px",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                      padding: "12px 20px",
                      backgroundColor:
                        pagination.page === totalPages ? "#f8f9fa" : "#5fcf80",
                      color:
                        pagination.page === totalPages ? "#6c757d" : "white",
                      boxShadow:
                        pagination.page === totalPages
                          ? "none"
                          : "0 4px 12px rgba(95, 207, 128, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      if (pagination.page !== totalPages) {
                        e.currentTarget.style.backgroundColor = "#4baa6a";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 16px rgba(95, 207, 128, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pagination.page !== totalPages) {
                        e.currentTarget.style.backgroundColor = "#5fcf80";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(95, 207, 128, 0.3)";
                      }
                    }}
                  >
                    Tiếp
                    <i className="bi bi-chevron-right ms-1"></i>
                  </button>
                </li>
              </ul>
            </nav>

            {/* Pagination Info */}
            <div
              className="text-center mt-3"
              style={{ color: "#666", fontSize: "0.95rem" }}
            >
              Trang{" "}
              <strong style={{ color: "#5fcf80" }}>{pagination.page}</strong>{" "}
              trên <strong style={{ color: "#5fcf80" }}>{totalPages}</strong>{" "}
              trang ({pagination.totalElements} khóa học)
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
};

export default CourseRender;
