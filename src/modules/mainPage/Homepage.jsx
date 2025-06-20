import { useEffect, useRef } from "react";
import PureCounter from "@srexi/purecounterjs";
import axios from "axios";

export function Homepage() {
  const fetchedRef = useRef(false);

  useEffect(() => {
    document.title = "Homepage";
    new PureCounter();

    const fetchJwtWithUuid = async () => {
      if (fetchedRef.current) return; // prevent repeat
      fetchedRef.current = true;

      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");

      if (uuid) {
        try {
          // const response = await axios.get(`http://localhost:9090/empoweru/sba/user/google-principal?uuid=${uuid}`);
          const response = await axios.get(
            `http://empower-u.sytes.net:9090/empoweru/sba/user/google-principal?uuid=${uuid}`
          );
          const token = response.data.data.token;
          localStorage.setItem("ROLE", response.data.data.role);
          localStorage.setItem("USER", token);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          window.location.reload();
        } catch (error) {
          console.error("Error exchanging UUID for JWT:", error);
        }
      }
    };

    fetchJwtWithUuid();
  }, []);

  return (
    <>
      <style>
        {`
          /* Custom Animations & Styles */
          .floating-animation {
            animation: floating 3s ease-in-out infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .card-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-radius: 25px !important;
            border: none;
            box-shadow: 0 10px 30px rgba(95, 207, 128, 0.1);
          }
          
          .card-hover:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 20px 60px rgba(95, 207, 128, 0.2);
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #5fd080 0%, #4ab569 100%);
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 25px;
          }
          
          .icon-bounce {
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          .pulse-shadow {
            box-shadow: 0 0 0 0 rgba(95, 207, 128, 0.7);
            animation: pulse-shadow 2s infinite;
          }
          
          @keyframes pulse-shadow {
            0% { box-shadow: 0 0 0 0 rgba(95, 207, 128, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(95, 207, 128, 0); }
            100% { box-shadow: 0 0 0 0 rgba(95, 207, 128, 0); }
          }
          
          .journey-step {
            position: relative;
            padding: 2rem;
            border-radius: 25px;
            background: white;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .journey-step:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          }
          
          .journey-line {
            position: absolute;
            top: 50%;
            right: -50px;
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #5fd080, #4ab569);
            border-radius: 2px;
            z-index: 1;
          }
          
          .journey-line::after {
            content: '';
            position: absolute;
            right: -8px;
            top: -6px;
            width: 0;
            height: 0;
            border-left: 8px solid #4ab569;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
          }
          
          .stats-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }
          
          .stats-card:hover {
            border-color: #5fd080;
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(95, 207, 128, 0.2);
          }
          
          .feature-card {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid rgba(95, 207, 128, 0.1);
          }
          
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            border-color: #5fd080;
          }
          
          .hero-content {
            position: relative;
            z-index: 2;
          }
          
          .section-divider {
            height: 100px;
            background: linear-gradient(45deg, transparent 49%, #5fd080 50%, transparent 51%);
            margin: 3rem 0;
          }
          
          .testimonial-card {
            background: white;
            border-radius: 25px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            margin: 1rem;
            transition: all 0.3s ease;
          }
          
          .testimonial-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          }
          
          .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #5fd080, #4ab569);
            transform-origin: left;
            z-index: 9999;
          }
        `}
      </style>

      <main className="main">
        <div className="scroll-indicator"></div>

        <section id="hero" className="hero section dark-background">
          <img
            src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747729618506-abigailvo2005%40gmail.com-2149178706.jpg"
            alt="hero-bg"
            data-aos="fade-in"
          />
          <div className="container hero-content">
            <h2 data-aos="fade-up" data-aos-delay="100" className="mb-4">
              Học tập từ những người giỏi nhất
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className="mb-5">
              Với đội ngũ mentors chất lượng ở đa lĩnh vực, hành trình chạm đến
              thành công của bạn sẽ được rút ngắn lại tại EmpowerU.
            </p>
            <div
              className="d-flex mt-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <a href="/courses" className="btn-get-started pulse-shadow">
                Bắt Đầu Ngay!
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about section py-5">
          <div className="container">
            <div className="row gy-4 align-items-center">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="floating-animation">
                  <img
                    src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747729738692-abigailvo2005%40gmail.com-2566.jpg"
                    className="img-fluid"
                    alt=""
                    style={{
                      borderRadius: "25px",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                </div>
              </div>

              <div
                className="col-lg-6 order-2 order-lg-1 content"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <h3
                  className="mb-4"
                  style={{ color: "#2c3e50", fontWeight: "700" }}
                >
                  Kết nối Mentors – Mở lối thành công
                </h3>
                <div className="row gy-3">
                  <div className="col-12">
                    <div className="d-flex align-items-start glass-effect p-4">
                      <i
                        className="bi bi-rocket-takeoff me-3 icon-bounce"
                        style={{ fontSize: "2rem", color: "#5fd080" }}
                      ></i>
                      <span>
                        Thăng tiến nhanh chóng, bứt phá hơn khi được dẫn dắt bởi
                        những <strong>mentors giàu kinh nghiệm.</strong>
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-start glass-effect p-4">
                      <i
                        className="bi bi-people-fill me-3 icon-bounce"
                        style={{
                          fontSize: "2rem",
                          color: "#5fd080",
                          animationDelay: "0.5s",
                        }}
                      ></i>
                      <span>
                        <strong>Kết nối chuẩn</strong> – chìa khóa vàng để bứt phá sự nghiệp cùng
                        EmpowerU.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="/courses"
                    className="btn btn-primary btn-lg px-4 py-3"
                    style={{
                      backgroundColor: "#5fd080",
                      borderColor: "#5fd080",
                      borderRadius: "15px",
                      fontWeight: "600",
                    }}
                  >
                    <span>Tìm Hiểu Thêm</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="counts"
          className="section py-5"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-card">
                  <div className="mb-3">
                    <i
                      className="bi bi-people-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="1232"
                    data-purecounter-duration="1"
                    className="purecounter d-block"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                    }}
                  ></span>
                  <p
                    className="mb-0 mt-2"
                    style={{ fontWeight: "600", color: "#6c757d" }}
                  >
                    Học Viên
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-card">
                  <div className="mb-3">
                    <i
                      className="bi bi-book-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="64"
                    data-purecounter-duration="1"
                    className="purecounter d-block"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                    }}
                  ></span>
                  <p
                    className="mb-0 mt-2"
                    style={{ fontWeight: "600", color: "#6c757d" }}
                  >
                    Khoá Học
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-card">
                  <div className="mb-3">
                    <i
                      className="bi bi-star-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="42"
                    data-purecounter-duration="1"
                    className="purecounter d-block"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                    }}
                  ></span>
                  <p
                    className="mb-0 mt-2"
                    style={{ fontWeight: "600", color: "#6c757d" }}
                  >
                    Đánh Giá
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-card">
                  <div className="mb-3">
                    <i
                      className="bi bi-award-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="24"
                    data-purecounter-duration="1"
                    className="purecounter d-block"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                    }}
                  ></span>
                  <p
                    className="mb-0 mt-2"
                    style={{ fontWeight: "600", color: "#6c757d" }}
                  >
                    Chuyên Gia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values - Redesigned */}
        <section id="why-us" className="section py-5">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                EmpowerU – Đặt người học làm trọng tâm
              </h2>
              <p className="text-muted">
                Khám phá giá trị cốt lõi của chúng tôi
              </p>
            </div>

            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="card-hover h-100 p-4 text-center">
                  <div className="mb-4">
                    <i
                      className="bi bi-bullseye"
                      style={{ fontSize: "4rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3">🎯 Sứ Mệnh</h4>
                  <div className="mb-3">
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Kết nối
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Phát triển
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Thành công
                    </span>
                  </div>
                  <p className="text-muted">
                    Tạo ra nền tảng kết nối trực tuyến giữa những người giàu
                    kinh nghiệm và những ai khát khao phát triển.
                  </p>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="card-hover h-100 p-4 text-center">
                  <div className="mb-4">
                    <i
                      className="bi bi-eye-fill"
                      style={{ fontSize: "4rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3">👁️ Tầm Nhìn</h4>
                  <div className="mb-3">
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Hàng đầu
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      1-1 Learning
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Toàn diện
                    </span>
                  </div>
                  <p className="text-muted">
                    Trở thành nền tảng giáo dục hàng đầu với phương pháp mentor
                    1-1 cá nhân hóa.
                  </p>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                <div className="card-hover h-100 p-4 text-center">
                  <div className="mb-4">
                    <i
                      className="bi bi-gem"
                      style={{ fontSize: "4rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3">💎 Giá Trị</h4>
                  <div className="mb-3">
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Chất lượng
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Linh hoạt
                    </span>
                    <span
                      className="badge me-2 mb-2 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      Bền vững
                    </span>
                  </div>
                  <p className="text-muted">
                    Cam kết chất lượng, sự linh hoạt và phát triển bền vững cho
                    mọi học viên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Map Section - Become a Mentor */}
        <section
          id="become-mentor"
          className="section py-5"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                🚀 Hành trình trở thành Mentor
              </h2>
              <p className="text-muted fs-5">
                Chia sẻ kiến thức và tạo ra tác động tích cực
              </p>
            </div>

            <div className="row gy-4 position-relative">
              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="journey-step text-center position-relative">
                  <div className="journey-line d-none d-lg-block"></div>
                  <div className="mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #5fd080, #4ab569)",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      1
                    </div>
                  </div>
                  <div className="mb-3">
                    <i
                      className="bi bi-person-plus-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Đăng Ký Tài Khoản</h5>
                  <p className="text-muted">
                    Tạo tài khoản và hoàn thiện hồ sơ cá nhân của bạn
                  </p>
                  <div className="mt-3">
                    <span
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      📝 Miễn phí
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="journey-step text-center position-relative">
                  <div className="journey-line d-none d-lg-block"></div>
                  <div className="mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #5fd080, #4ab569)",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      2
                    </div>
                  </div>
                  <div className="mb-3">
                    <i
                      className="bi bi-file-earmark-text-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Nộp Hồ Sơ</h5>
                  <p className="text-muted">
                    Upload CV và chia sẻ kinh nghiệm, chuyên môn của bạn
                  </p>
                  <div className="mt-3">
                    <span
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        borderRadius: "15px",
                      }}
                    >
                      📋 CV + Bio
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="journey-step text-center position-relative">
                  <div className="journey-line d-none d-lg-block"></div>
                  <div className="mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #5fd080, #4ab569)",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      3
                    </div>
                  </div>
                  <div className="mb-4">
                    <i
                      className="fa-regular fa-circle-check"
                      style={{ fontSize: "4rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Được Xét Duyệt</h5>
                  <p className="text-muted">
                    Đội ngũ chuyên gia sẽ xem xét và phê duyệt hồ sơ của bạn
                  </p>
                  <div className="mt-3">
                    <span
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor: "#d1ecf1",
                        color: "#0c5460",
                        borderRadius: "15px",
                      }}
                    >
                      ⏱️ 2-3 ngày
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <div className="journey-step text-center">
                  <div className="mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #5fd080, #4ab569)",
                        borderRadius: "50%",
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      4
                    </div>
                  </div>
                  <div className="mb-3">
                    <i
                      className="bi bi-book-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Tạo Khoá Học</h5>
                  <p className="text-muted">
                    Thiết kế khoá học và bắt đầu hành trình mentor
                  </p>
                  <div className="mt-3">
                    <span
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        borderRadius: "15px",
                      }}
                    >
                      🎉 Bắt đầu
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="text-center mt-5"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <a
                href="/auth"
                className="btn btn-lg px-5 py-3 gradient-bg text-white"
                style={{
                  borderRadius: "25px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  boxShadow: "0 8px 25px rgba(95, 207, 128, 0.3)",
                }}
              >
                🚀 Bắt Đầu Hành Trình Mentor
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features section py-5">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                🎯 Lĩnh Vực Đào Tạo
              </h2>
              <p className="text-muted">
                Khám phá các chuyên ngành hot nhất hiện nay
              </p>
            </div>

            <div className="row gy-4">
              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-code-slash mb-3"
                    style={{ fontSize: "2.5rem", color: "#ffbb2c" }}
                  ></i>
                  <h5 className="mb-2">IT & Software</h5>
                  <p className="text-muted small mb-0">
                    Lập trình, phát triển web, mobile app
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-graph-up-arrow mb-3"
                    style={{ fontSize: "2.5rem", color: "#5578ff" }}
                  ></i>
                  <h5 className="mb-2">Digital Marketing</h5>
                  <p className="text-muted small mb-0">
                    SEO, SEM, Social Media, Content Marketing
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-briefcase mb-3"
                    style={{ fontSize: "2.5rem", color: "#e361ff" }}
                  ></i>
                  <h5 className="mb-2">Kinh Doanh</h5>
                  <p className="text-muted small mb-0">
                    Quản lý, khởi nghiệp, chiến lược kinh doanh
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-translate mb-3"
                    style={{ fontSize: "2.5rem", color: "#47aeff" }}
                  ></i>
                  <h5 className="mb-2">Ngoại Ngữ</h5>
                  <p className="text-muted small mb-0">
                    English, Chinese, Japanese, Korean
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-palette mb-3"
                    style={{ fontSize: "2.5rem", color: "#ffa76e" }}
                  ></i>
                  <h5 className="mb-2">Thiết Kế</h5>
                  <p className="text-muted small mb-0">
                    UI/UX, Graphic Design, Video Editing
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-lightbulb mb-3"
                    style={{ fontSize: "2.5rem", color: "#11dbcf" }}
                  ></i>
                  <h5 className="mb-2">Khởi Nghiệp</h5>
                  <p className="text-muted small mb-0">
                    Startup, Business Model, Funding
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-people mb-3"
                    style={{ fontSize: "2.5rem", color: "#4233ff" }}
                  ></i>
                  <h5 className="mb-2">Kĩ Năng Mềm</h5>
                  <p className="text-muted small mb-0">
                    Leadership, Communication
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="feature-card">
                  <i
                    className="bi bi-currency-exchange mb-3"
                    style={{ fontSize: "2.5rem", color: "#b2904f" }}
                  ></i>
                  <h5 className="mb-2">Đầu Tư</h5>
                  <p className="text-muted small mb-0">
                    Chứng khoán, Forex, Crypto, BĐS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section
          id="trainers-index"
          className="section py-5"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                ⭐ Mentors Hàng Đầu
              </h2>
              <p className="text-muted">
                Học từ những chuyên gia giàu kinh nghiệm
              </p>
            </div>

            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="card-hover h-100 overflow-hidden">
                  <img
                    src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747730067531-abigailvo2005%40gmail.com-2148200953.jpg"
                    className="img-fluid w-100"
                    alt=""
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h4 className="mb-2 fw-bold">Walter White</h4>
                    <span
                      className="badge mb-3 px-3 py-2"
                      style={{
                        backgroundColor: "#e8f5e8",
                        color: "#2d5a31",
                        borderRadius: "15px",
                      }}
                    >
                      IT & Software
                    </span>
                    <p className="text-muted">
                      Với nhiều năm kinh nghiệm trong phát triển web, tôi có thể
                      giúp bạn xây dựng một trang web chuyên nghiệp từ frontend
                      đến backend.
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="fw-bold">4.9</span>
                        <span className="text-muted ms-1">(127 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="card-hover h-100 overflow-hidden">
                  <img
                    src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747729880944-abigailvo2005%40gmail.com-59122.jpg"
                    className="img-fluid w-100"
                    alt=""
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h4 className="mb-2 fw-bold">Sarah Jhinson</h4>
                    <span
                      className="badge mb-3 px-3 py-2"
                      style={{
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        borderRadius: "15px",
                      }}
                    >
                      Marketing
                    </span>
                    <p className="text-muted">
                      Chuyên gia tiếp thị với chiến lược sáng tạo giúp doanh
                      nghiệp phát triển thương hiệu và tiếp cận khách hàng hiệu
                      quả.
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="fw-bold">4.8</span>
                        <span className="text-muted ms-1">(89 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="card-hover h-100 overflow-hidden">
                  <img
                    src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747730035695-abigailvo2005%40gmail.com-2429.jpg"
                    className="img-fluid w-100"
                    alt=""
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h4 className="mb-2 fw-bold">William Anderson</h4>
                    <span
                      className="badge mb-3 px-3 py-2"
                      style={{
                        backgroundColor: "#d1ecf1",
                        color: "#0c5460",
                        borderRadius: "15px",
                      }}
                    >
                      Content
                    </span>
                    <p className="text-muted">
                      Mang đến chiến lược nội dung hấp dẫn, giúp doanh nghiệp
                      xây dựng thương hiệu mạnh mẽ và kết nối tốt hơn với khách
                      hàng.
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="fw-bold">4.7</span>
                        <span className="text-muted ms-1">(156 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section py-5">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                💬 Học Viên Nói Gì
              </h2>
              <p className="text-muted">
                Những chia sẻ chân thực từ cộng đồng EmpowerU
              </p>
            </div>

            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="testimonial-card">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt=""
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Nguyễn Thị Lan</h6>
                      <small className="text-muted">Marketing Executive</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="text-muted">
                    "Mentor rất nhiệt tình và giàu kinh nghiệm. Tôi đã học được
                    rất nhiều kỹ năng thực tế và áp dụng ngay vào công việc."
                  </p>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="testimonial-card">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt=""
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Trần Văn Nam</h6>
                      <small className="text-muted">Software Developer</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="text-muted">
                    "Nền tảng rất dễ sử dụng, nội dung được cập nhật liên tục.
                    Tôi đã tự tin hơn rất nhiều trong công việc."
                  </p>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                <div className="testimonial-card">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt=""
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Lê Thị Hương</h6>
                      <small className="text-muted">Business Owner</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="text-muted">
                    "Đầu tư tốt nhất tôi từng thực hiện! Kiến thức từ mentor đã
                    giúp doanh nghiệp của tôi tăng trưởng 200%."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section py-5 gradient-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8" data-aos="fade-right">
                <h2 className="text-white fw-bold mb-3">
                  🚀 Sẵn sàng bắt đầu hành trình học tập?
                </h2>
                <p className="text-white opacity-75 fs-5">
                  Tham gia cộng đồng hơn 1000+ học viên đã thành công cùng
                  EmpowerU
                </p>
              </div>
              <div className="col-lg-4 text-lg-end" data-aos="fade-left">
                <a
                  href="/courses"
                  className="btn btn-light btn-lg px-5 py-3"
                  style={{
                    borderRadius: "25px",
                    fontWeight: "600",
                    color: "#5fd080",
                  }}
                >
                  Khám Phá Ngay
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script>
        {`
          // Scroll indicator
          window.addEventListener('scroll', () => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            scrollIndicator.style.transform = 'scaleX(' + scrollPercent + ')';
          });
        `}
      </script>
    </>
  );
}
