import React, { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";

export function About() {
  useEffect(() => {
    document.title = "Về Chúng Tôi";
    new PureCounter();
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
          
          .pulse-effect {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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
            border-radius: 25px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid rgba(95, 207, 128, 0.1);
            height: 100%;
          }
          
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            border-color: #5fd080;
          }
          
          .timeline-item {
            position: relative;
            padding-left: 3rem;
            margin-bottom: 2rem;
          }
          
          .timeline-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;
            background: #5fd080;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 0 0 3px #5fd080;
          }
          
          .timeline-item::after {
            content: '';
            position: absolute;
            left: 9px;
            top: 20px;
            width: 2px;
            height: calc(100% + 1rem);
            background: linear-gradient(to bottom, #5fd080, transparent);
          }
          
          .timeline-item:last-child::after {
            display: none;
          }
          
          .benefit-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #5fd080, #4ab569);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
          }
          
          .office-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
          }
          
          .office-image {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .office-image:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          }
          
          .social-post {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
          }
          
          .social-post:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          }
          
          .news-card {
            background: white;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .news-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          }
          
          .support-step {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;
          }
          
          .support-step:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          }

          .btn-hover:hover {
            background: linear-gradient(135deg, #5fd080, #4ab569);
            color:rgb(255, 255, 255) !important;
          }
        `}
      </style>

      <main className="main">
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="mb-4">Về Chúng Tôi</h1>
                  <p className="mb-0">
                    Nền tảng sáng tạo kết nối Mentor và Mentee trực tiếp, giúp
                    bạn phát triển kỹ năng, đạt được mục tiêu cá nhân, thăng
                    tiến sự nghiệp nhanh và vững chắc hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li>
                  <a href="/">Trang Chủ</a>
                </li>
                <li className="current">Về Chúng Tôi</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* About Us Section */}
        <section id="about-us" className="section py-5">
          <div className="container">
            <div className="row gy-4 align-items-center">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="floating-animation">
                  <img
                    src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747730324563-abigailvo2005%40gmail.com-young-woman-learning-english-from-her-teacher.jpg"
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
                <h3 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>
                  🎯 EmpowerU – Học tập cùng những chuyên gia hàng đầu
                </h3>

                <div className="row gy-3">
                  <div className="col-12">
                    <div className="glass-effect p-4">
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-people-fill me-3 icon-bounce"
                          style={{ fontSize: "1.5rem", color: "#5fd080" }}
                        ></i>
                        <span>
                          <strong>200+ chuyên gia từ các tập đoàn lớn:</strong>{" "}
                          Trực tiếp học hỏi từ những người thành công!
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="glass-effect p-4">
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-clipboard-data me-3 icon-bounce"
                          style={{
                            fontSize: "1.5rem",
                            color: "#5fd080",
                            animationDelay: "0.5s",
                          }}
                        ></i>
                        <span>
                          <strong>Case study thực chiến:</strong> Tiếp xúc tình
                          huống thực tế - rút ngắn thời gian và tối ưu kết quả!
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="glass-effect p-4">
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-award-fill me-3 icon-bounce"
                          style={{
                            fontSize: "1.5rem",
                            color: "#5fd080",
                            animationDelay: "1s",
                          }}
                        ></i>
                        <span>
                          <strong>Chuyên gia được chứng nhận:</strong> Tất cả
                          mentor tại EmpowerU đều có bằng cấp và kinh nghiệm dày
                          dặn.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="glass-effect p-4">
                      <div className="d-flex align-items-start">
                        <i
                          className="fa-solid fa-certificate icon-bounce me-3"
                          style={{
                            fontSize: "1.5rem",
                            color: "#5fd080",
                            animationDelay: "1.5s",
                          }}
                        ></i>
                        <span>
                          <strong>Minh bạch & Đảm bảo:</strong> EmpowerU cam kết
                          luôn xác minh kỹ lưỡng thông tin chuyên gia.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cut Section */}
        <section
          id="counts"
          className="section py-4"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        ></section>

        {/* Why Become Mentor & Why Learn */}
        <section className="section py-5">
          <div className="container">
            <div className="row gy-5">
              {/* Why Become Mentor */}
              <div className="col-lg-6" data-aos="fade-right">
                <div className="card-hover  h-100 p-4">
                  <h3
                    className="fw-bold mb-4 text-center"
                    style={{ color: "#2c3e50" }}
                  >
                    🚀 Tại sao nên trở thành Mentor?
                  </h3>

                  <div className="row gy-2">
                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                            margin: "0 !important",
                          }}
                        >
                          💰
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Thu nhập ổn định</h6>
                          <small className="text-muted">
                            Kiếm tiền từ kiến thức chuyên môn của bạn
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          ⏰
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Thời gian linh hoạt</h6>
                          <small className="text-muted">
                            Tự chủ lịch trình theo ý muốn
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          🌟
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Xây dựng thương hiệu</h6>
                          <small className="text-muted">
                            Nâng cao uy tín và danh tiếng cá nhân
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          🤝
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Mở rộng network</h6>
                          <small className="text-muted">
                            Kết nối với nhiều người trong ngành
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="/auth"
                      className="btn btn-lg px-4 py-3 gradient-bg text-white"
                      style={{
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      Đăng Ký Mentor Ngay
                    </a>
                  </div>
                </div>
              </div>

              {/* Why Learn on EmpowerU */}
              <div className="col-lg-6" data-aos="fade-left">
                <div className="card-hover h-100 p-4">
                  <h3
                    className="fw-bold mb-4 text-center"
                    style={{ color: "#2c3e50" }}
                  >
                    📚 Tại sao nên học trên EmpowerU?
                  </h3>

                  <div className="row gy-2">
                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          🎯
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Học 1-1 cá nhân hóa</h6>
                          <small className="text-muted">
                            Chương trình được thiết kế riêng cho bạn
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          ⚡
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Tiến bộ nhanh hơn</h6>
                          <small className="text-muted">
                            Học viên tiến bộ 5x nhanh hơn thông thường
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          🏆
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">
                            Mentor chất lượng cao
                          </h6>
                          <small className="text-muted">
                            Được kiểm duyệt kỹ lưỡng bởi đội ngũ chuyên gia
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="d-flex align-items-center p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div
                          className="benefit-icon me-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                          }}
                        >
                          💡
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">Kiến thức thực tế</h6>
                          <small className="text-muted">
                            Áp dụng ngay vào công việc và cuộc sống
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="/courses"
                      className="btn btn-outline-primary btn-lg px-4 py-3 btn-hover"
                      style={{
                        borderColor: "#5fd080",
                        color: "#5fd080",
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      Khám Phá Khoá Học
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Support Section */}
        <section
          className="section py-5"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                🤝 Cách Team EmpowerU Hỗ Trợ Bạn
              </h2>
              <p className="text-muted fs-5">
                Chúng tôi luôn đồng hành cùng bạn trong mọi bước của hành trình
                học tập
              </p>
            </div>

            <div className="row gy-4">
              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="support-step">
                  <div className="mb-3">
                    <i
                      className="bi bi-headset"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">24/7 Hỗ Trợ Kỹ Thuật</h5>
                  <p className="text-muted small">
                    Đội ngũ kỹ thuật sẵn sàng giải đáp mọi thắc mắc về platform
                    và các vấn đề kỹ thuật.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="support-step">
                  <div className="mb-3">
                    <i
                      className="bi bi-person-check-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Mentor Matching</h5>
                  <p className="text-muted small">
                    Tư vấn và kết nối bạn với mentor phù hợp nhất dựa trên mục
                    tiêu và nhu cầu học tập.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="support-step">
                  <div className="mb-3">
                    <i
                      className="bi bi-chat-dots-fill"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Tư Vấn Học Tập</h5>
                  <p className="text-muted small">
                    Hướng dẫn lập kế hoạch học tập hiệu quả và theo dõi tiến độ
                    để đảm bảo bạn đạt mục tiêu.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="support-step">
                  <div className="mb-3">
                    <i
                      className="bi bi-shield-check"
                      style={{ fontSize: "3rem", color: "#5fd080" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-3">Đảm Bảo Chất Lượng</h5>
                  <p className="text-muted small">
                    Giám sát chất lượng giảng dạy và thu thập feedback để liên
                    tục cải thiện trải nghiệm học tập.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offline Office Section */}
        <section className="section py-5">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                🏢 EmpowerU Mentor Hub 🔥 <strong>HOT </strong>🔥
              </h2>
              <p className="text-muted fs-5">
                Không gian làm việc hiện đại ngay tại TP.HCM
              </p>
            </div>

            <div className="row gy-4 align-items-center">
              <div className="col-lg-6" data-aos="fade-right">
                <div className="card-hover p-4">
                  <h4 className="fw-bold mb-4" style={{ color: "#2c3e50" }}>
                    📍 Vinhomes Grand Park Quận 9, TP.HCM
                  </h4>

                  <div className="timeline-item">
                    <h6 className="fw-bold">🏠 Vị Trí Thuận Lợi</h6>
                    <p className="text-muted mb-0">
                      Chi nhánh tại trung tâm Quận 9, dễ dàng di chuyển bằng xe
                      bus hoặc xe máy.
                    </p>
                  </div>

                  <div className="timeline-item">
                    <h6 className="fw-bold">💻 Trang Thiết Bị Đầy Đủ</h6>
                    <p className="text-muted mb-0">
                      Bàn ghế ergonomic - có sẵn màn hình HD, đèn LED chống mỏi
                      mắt.
                    </p>
                  </div>

                  <div className="timeline-item">
                    <h6 className="fw-bold">🌐 Wifi & Điều Hòa Miễn Phí</h6>
                    <p className="text-muted mb-0">
                      Internet tốc độ cao, điều hòa nhiệt độ 24/7 cho môi trường
                      giảng dạy thoải mái.
                    </p>
                  </div>

                  <div className="timeline-item">
                    <h6 className="fw-bold">📅 Đặt Lịch Dễ Dàng</h6>
                    <p className="text-muted mb-0">
                      Mentor chỉ cần đăng ký trước để sử dụng phòng trong khung
                      giờ mong muốn.
                    </p>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61576285256194"
                      className="btn btn-lg px-4 py-3 gradient-bg text-white"
                      style={{
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      📱 Đăng Ký Phòng Ngay
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left">
                <div className="office-gallery">
                  <div className="office-image">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"
                      alt="Không gian làm việc hiện đại"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="office-image">
                    <img
                      src="https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=500"
                      alt="Phòng học với thiết bị hiện đại"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="office-image">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500"
                      alt="Khu vực nghỉ ngơi"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="office-image">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500"
                      alt="Phòng họp nhỏ"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Office Rules */}
            <div className="row mt-5">
              <div className="col-12" data-aos="fade-up">
                <div className="card-hover p-4">
                  <h4
                    className="fw-bold mb-4 text-center"
                    style={{ color: "#2c3e50" }}
                  >
                    📋 Quy Định Sử Dụng Tài Sản Chung
                  </h4>

                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-start p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <i
                          className="bi bi-clock-fill me-3"
                          style={{ fontSize: "1.5rem", color: "#5fd080" }}
                        ></i>
                        <div>
                          <h6 className="mb-1 fw-bold">Thời Gian Sử Dụng</h6>
                          <small className="text-muted">
                            8:00 - 22:00 hàng ngày. Đăng ký trước tối thiểu 2
                            tiếng.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-start p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <i
                          className="bi bi-shield-fill-check me-3"
                          style={{ fontSize: "1.5rem", color: "#5fd080" }}
                        ></i>
                        <div>
                          <h6 className="mb-1 fw-bold">Bảo Vệ Thiết Bị</h6>
                          <small className="text-muted">
                            Không di chuyển, tháo lắp hoặc làm hỏng thiết bị.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-start p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <i
                          className="bi bi-volume-mute-fill me-3"
                          style={{ fontSize: "1.5rem", color: "#5fd080" }}
                        ></i>
                        <div>
                          <h6 className="mb-1 fw-bold">Giữ Yên Lặng</h6>
                          <small className="text-muted">
                            Tránh gây ồn ào ảnh hưởng đến các lớp học khác.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-start p-3 rounded-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <i
                          className="bi bi-trash-fill me-3"
                          style={{ fontSize: "1.5rem", color: "#5fd080" }}
                        ></i>
                        <div>
                          <h6 className="mb-1 fw-bold">Vệ Sinh Sạch Sẽ</h6>
                          <small className="text-muted">
                            Dọn dẹp và trả lại trạng thái ban đầu sau khi sử
                            dụng.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News & Social Section */}
        <section
          className="section py-5"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                📰 Tin Tức & Cập Nhật
              </h2>
              <p className="text-muted fs-5">
                Theo dõi những câu chuyện mới nhất về EmpowerU
              </p>
            </div>

            <div className="row gy-4">
              {/* News Article */}
              <div className="col-lg-6" data-aos="fade-right">
                <a
                  href="https://qhdn-hcmuni.fpt.edu.vn/2025/04/10/empoweru-nen-tang-ket-noi-11-ca-nhan-hoa-hanh-trinh-hoc-tap-va-phat-trien-ban-than/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className="d-block"
                >
                  <div className="news-card">
                    <img
                      src="https://qhdn-hcmuni.fpt.edu.vn/wp-content/uploads/2025/04/IMG_1214.jpeg"
                      alt="Lịch sử EmpowerU"
                      className="img-fluid w-100"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                    <div className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span
                          className="badge px-3 py-2 me-3"
                          style={{
                            backgroundColor: "#e8f5e8",
                            color: "#2d5a31",
                            borderRadius: "15px",
                          }}
                        >
                          📰 Bài Báo Đặc Biệt
                        </span>
                        <span
                          className="badge px-3 py-2"
                          style={{
                            backgroundColor: "#e8f5e8",
                            color: "#2d5a31",
                            borderRadius: "15px",
                          }}
                        >
                          💥 Dự Án Khởi Nghiệp
                        </span>
                        <small className="text-muted ms-auto">10/04/2025</small>
                      </div>
                      <h4 className="fw-bold mb-3">
                        Từ một cuộc trò chuyện giữa những người trẻ lạc lối…
                      </h4>
                      <p className="text-muted mb-3">
                        “Chúng mình tin rằng, mỗi người đều xứng đáng có một
                        người đồng hành – một mentor thực sự lắng nghe, truyền
                        cảm hứng và cùng nhau vượt qua những chặng đường phát
                        triển bản thân.” <br/> <br/> Với niềm tin đó, nhóm WOAH gồm 6 sinh
                        viên đến từ các ngành học khác nhau của Đại học FPT đã
                        cùng nhau xây dựng dự án EmpowerU – một nền tảng
                        mentoring 1:1 giúp kết nối mentor và mentee một cách cá
                        nhân hóa, linh hoạt và hiệu quả. <strong>... Xem Tiếp</strong>
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Facebook Posts */}
              <div className="col-lg-6" data-aos="fade-left">
                <h4
                  className="fw-bold mb-4 text-center"
                  style={{ color: "#2c3e50" }}
                >
                  📱 Cập Nhật Từ Facebook
                </h4>

                <a
                  href="https://www.facebook.com/share/p/1AtLrJiYQH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className="d-block"
                >
                  <div className="social-post" style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "white",
                          borderRadius: "50%",
                          color: "white",
                          fontSize: "1.5rem",
                          borderColor:
                            "linear-gradient(135deg, #5fd080, #4ab569)",
                          borderWidth: "2px",
                          borderStyle: "solid",
                        }}
                      >
                        <img src="/img/favicon.png" style={{ width: "20px" }} />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">EmpowerU</h6>
                        <small className="text-muted">14 tháng 6, 2025</small>
                      </div>
                    </div>
                    <p className="mb-3" style={{ color: "black" }}>
                      Join ngay "Wait-list" - Rinh "Sít Rịt" liền tay! <br />
                      🔥 Để đánh dấu cột mốc “Website chính thức ra đời”,
                      EmpowerU mời bạn trải nghiệm giao diện mới với cơ hội nhận
                      quà xịn từ chương trình, với cơ cấu giải thưởng vô cùng
                      hấp dẫn: <br />
                      🥇 Giải Nhất: Sổ tay học tập EmpowerU độc quyền <br />
                      🥈 Giải Nhì: Bút EmpowerU sang – xịn – mượt <br />
                      🥉 Giải Ba: <strong>... Xem Tiếp</strong>
                    </p>
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-heart-fill text-danger me-1"></i>
                      <span className="me-3">128</span>
                      <i className="bi bi-chat-fill me-1"></i>
                      <span>24</span>
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/share/p/16bnsT3mEB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className="d-block"
                >
                  <div className="social-post" style={{ cursor: "pointer" }}>
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "white",
                          borderRadius: "50%",
                          color: "white",
                          fontSize: "1.5rem",
                          borderColor:
                            "linear-gradient(135deg, #5fd080, #4ab569)",
                          borderWidth: "2px",
                          borderStyle: "solid",
                        }}
                      >
                        <img src="/img/favicon.png" style={{ width: "20px" }} />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">EmpowerU</h6>
                        <small className="text-muted">02 tháng 6, 2025</small>
                      </div>
                    </div>
                    <p className="mb-3" style={{ color: "black" }}>
                      Làm portfolio, đừng chỉ gắn mỗi tiêu đề và hình ảnh!{" "}
                      <br />
                      Đã bao giờ bạn nghĩ rằng portfolio của mình cần sống động
                      hơn, thể hiện cá tính của bạn rõ ràng hơn chưa? <br />
                      Đừng chỉ đơn thuần liệt kê dự án hay gắn những hình ảnh
                      đơn điệu. Hãy biến portfolio thành một câu chuyện kể về
                      hành trình, những gì bạn đã học hỏi và những gì bạn có thể
                      mang lại theo những bí kíp sau:{" "}
                      <strong>... Xem Tiếp</strong>
                    </p>
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-heart-fill text-danger me-1"></i>
                      <span className="me-3">64</span>
                      <i className="bi bi-chat-fill me-1"></i>
                      <span>17</span>
                    </div>
                  </div>
                </a>

                <div className="text-center mt-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61576285256194"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#1877f2",
                      borderColor: "#1877f2",
                      borderRadius: "15px",
                    }}
                  >
                    <i className="bi bi-facebook me-2"></i>
                    Theo Dõi Fanpage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
