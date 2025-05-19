import { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";
import axios from "axios";
export function Homepage() {
  useEffect(() => {
    document.title = "Trang Chủ";
    new PureCounter();

    const fetchJwtWithUuid = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");

      if (uuid) {
        try {
          const response = await axios.get(
            `http://localhost:9090/empoweru/sba/user/google-principal?uuid=${uuid}`
          );
          const token = response.data.data.token;
          localStorage.setItem("ROLE", response.data.data.role);
          localStorage.setItem("USER", token);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } catch (error) {
          console.error("Error exchanging UUID for JWT:", error);
        }
      }
    };

    fetchJwtWithUuid();
  }, []);
  return (
    <main className="main">
      <section id="hero" className="hero section dark-background">
        <img src="/img/hero-bg.jpg" alt="hero-bg" data-aos="fade-in" />

        <div className="container">
          <h2 data-aos="fade-up" data-aos-delay="100">
            Học tập từ những người giỏi nhất
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">
            Với đội ngũ mentors chất lượng ở đa lĩnh vực, hành trình chạm đến
            thành công của bạn sẽ được rút ngắn lại tại EmpowerU.
          </p>
          <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
            <a href="/courses" className="btn-get-started">
              Bắt Đầu Ngay!
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src="/img/about.jpg" className="img-fluid" alt="" />
            </div>

            <div
              className="col-lg-6 order-2 order-lg-1 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>Kết nối Mentors – Mở lối thành công</h3>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Thăng tiến nhanh chóng, bứt phá hơn khi được dẫn dắt bởi
                    những mentors giàu kinh nghiệm.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Kết nối chuẩn – chìa khóa vàng để bứt phá sự nghiệp cùng
                    EmpowerU.
                  </span>
                </li>
              </ul>
              <a href="/courses" className="read-more">
                <span>Tìm Hiểu Thêm</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="counts" className="section counts light-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="1232"
                  data-purecounter-duration="1"
                  className="purecounter"
                ></span>
                <p>Học Viên</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="64"
                  data-purecounter-duration="1"
                  className="purecounter"
                ></span>
                <p>Khoá Học</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="42"
                  data-purecounter-duration="1"
                  className="purecounter"
                ></span>
                <p>Đánh Giá</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item text-center w-100 h-100">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="24"
                  data-purecounter-duration="1"
                  className="purecounter"
                ></span>
                <p>Chuyên Gia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="section why-us">
        <div className="container">
          <div className="row-gy4">
            <div
              className="col-lg-12 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="why-box">
                <h3>EmpowerU – Đặt người học làm trọng tâm.</h3>
                <p></p>
                <div className="text-center">
                  <a href="/courses" className="more-btn">
                    <span>Tìm Hiểu Thêm</span>{" "}
                    <i className="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row gy-4">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
                <div className="col-sm-3">
                  <div className="icon-box d-flex flex-column align-items-center">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Sứ Mệnh</h4>
                    <p>
                      EmpowerU tạo ra nền tảng kết nối trực tuyến giữa những
                      người giàu kinh nghiệm và những ai khát khao phát triển.
                      Chúng tôi giúp học viên tự tin theo đuổi mục tiêu nghề
                      nghiệp, xây dựng kỹ năng thực tế và đạt được thành công
                      bền vững.
                    </p>
                  </div>
                </div>

                <div
                  className="col-sm-3"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="icon-box d-flex flex-column align-items-center">
                    <i className="bi bi-gem"></i>
                    <h4>Tầm Nhìn</h4>
                    <p>
                      Trở thành nền tảng giáo dục hàng đầu, nơi mọi cá nhân được
                      kết nối với mentor giỏi nhất, học tập trực tiếp với lộ
                      trình cá nhân hóa, phát triển toàn diện cả trong sự nghiệp
                      lẫn cuộc sống.
                    </p>
                  </div>
                </div>

                <div
                  className="col-sm-6"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="icon-box d-flex flex-column align-items-center">
                    <i className="bi bi-inboxes"></i>
                    <h4>Giá Trị</h4>
                    <p>
                      <p>
                        <span className="fw-bold">Chất Lượng:</span> Chất lượng:
                        Nội dung học tập được kiểm định bởi đội ngũ chuyên gia
                        đầu ngành.
                      </p>

                      <p>
                        <span className="fw-bold">Kết Nối Đột Phá:</span> Mở
                        rộng mạng lưới với những người giỏi nhất, tạo ra cơ hội
                        học hỏi và phát triển cho học viên.
                      </p>

                      <p>
                        <span className="fw-bold">Linh Hoạt Tối Đa:</span> Chủ
                        động lựa chọn thời gian học tập theo lịch trình của bạn.
                      </p>

                      <p>
                        <span className="fw-bold">Phát Triển Bền Vững:</span>{" "}
                        Không ngừng đổi mới để kiến tạo giá trị lâu dài, dẫn lối
                        thành công vững chắc.
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="features-item">
                <i className="bi bi-eye" style={{ color: "#ffbb2c" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    IT & Software
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="features-item">
                <i className="bi bi-infinity" style={{ color: "#5578ff" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Digital Marketing
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="features-item">
                <i
                  className="bi bi-mortarboard"
                  style={{ color: "#e80368" }}
                ></i>
                <h3>
                  <a href="" className="stretched-link">
                    Marketing
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="features-item">
                <i className="bi bi-nut" style={{ color: "#e361ff" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Kinh Doanh
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="features-item">
                <i className="bi bi-shuffle" style={{ color: "#47aeff" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Ngoại Ngữ
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="features-item">
                <i className="bi bi-star" style={{ color: "#ffa76e" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Thiết Kế Đồ Hoạ
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="features-item">
                <i className="bi bi-x-diamond" style={{ color: "#11dbcf" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Khởi Nghiệp
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="features-item">
                <i
                  className="bi bi-camera-video"
                  style={{ color: "#4233ff" }}
                ></i>
                <h3>
                  <a href="" className="stretched-link">
                    Kĩ Năng Mềm
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="900"
            >
              <div className="features-item">
                <i className="bi bi-command" style={{ color: "#b2904f" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Đầu Tư Tài Chính
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <div className="features-item">
                <i className="bi bi-dribbble" style={{ color: "#b20969" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Tin Học Văn Phòng
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="1100"
            >
              <div className="features-item">
                <i className="bi bi-activity" style={{ color: "#ff5828" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    Tài Chính Kế Toán
                  </a>
                </h3>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              <div className="features-item">
                <i
                  className="bi bi-brightness-high"
                  style={{ color: "#29cc61" }}
                ></i>
                <h3>
                  <a href="" className="stretched-link">
                    MMO
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trainers-index" className="section trainers-index">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-4 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="member">
                <img
                  src="/img/trainers/trainer-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Walter White</h4>
                  <span>IT & Software</span>
                  <p>
                    Với nhiều năm kinh nghiệm trong phát triển web, tôi có thể
                    giúp bạn xây dựng một trang web chuyên nghiệp từ frontend
                    đến backend.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="member">
                <img
                  src="/img/trainers/trainer-2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Sarah Jhinson</h4>
                  <span>Marketing</span>
                  <p>
                    Chuyên gia tiếp thị với chiến lược sáng tạo giúp doanh
                    nghiệp phát triển thương hiệu và tiếp cận khách hàng hiệu
                    quả.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="member">
                <img
                  src="/img/trainers/trainer-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>William Anderson</h4>
                  <span>Content</span>
                  <p>
                    Mang đến chiến lược nội dung hấp dẫn, giúp doanh nghiệp xây
                    dựng thương hiệu mạnh mẽ và kết nối tốt hơn với khách hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
