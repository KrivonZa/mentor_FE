import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import PureCounter from "@srexi/purecounterjs";

export function About() {
  useEffect(() => {
    document.title = "Về Chúng Tôi";
    new PureCounter();
  }, []);

  return (
    <main className="main">
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>
                  Về Chúng Tôi
                  <br />
                </h1>
                <p className="mb-0 mt-3">
                  EmpowerU là nền tảng sáng tạo kết nối Mentor và Mentee trực
                  tiếp, giúp bạn phát triển kỹ năng, đạt được mục tiêu cá nhân
                  và thăng tiến sự nghiệp nhanh hơn, vững chắc hơn. Với sứ mệnh
                  mang đến cơ hội học tập cá nhân hóa cho học viên, chúng tôi tự
                  hào đồng hành cùng hàng ngàn cá nhân trên hành trình chinh
                  phục ước mơ.
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
              <li className="current">
                Về Chúng Tôi
                <br />
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <section id="about-us" className="section about-us">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747730324563-abigailvo2005%40gmail.com-young-woman-learning-english-from-her-teacher.jpg"
                className="img-fluid"
                alt=""
                style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15" }}
              />
            </div>

            <div
              className="col-lg-6 order-2 order-lg-1 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>EmpowerU – Học tập cùng những chuyên gia hàng đầu</h3>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    200+ chuyên gia từ các tập đoàn lớn: Trực tiếp học hỏi từ
                    những người đã thành công và đang làm việc tại các công ty
                    hàng đầu.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Case study thực chiến: Không chỉ là lý thuyết, bạn sẽ được
                    hướng dẫn qua những tình huống thực tế, giúp rút ngắn thời
                    gian và tối ưu kết quả.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Chuyên gia được chứng nhận: Tất cả mentor tại EmpowerU đều
                    có bằng cấp cao và kinh nghiệm dày dặn trong lĩnh vực họ
                    giảng dạy.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Minh bạch & Đảm bảo: EmpowerU cam kết xác minh kỹ lưỡng
                    thông tin chuyên gia trước khi kết nối với bạn.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Hoàn tiền 100% nếu không hài lòng: Chúng tôi tin vào chất
                    lượng – sự hài lòng của bạn là ưu tiên hàng đầu.
                  </span>
                </li>
              </ul>
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

      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Trải Nghiệm</h2>
          <p>Họ nghĩ gì về chúng tôi?</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            loop={true}
            speed={600}
            autoplay={{ delay: 5000 }}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src="/img/testimonials/testimonials-1.jpg"
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Saul Goodman</h3>
                  <h4>Ceo &amp; Founder</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Dịch vụ rất tốt! Nội dung chất lượng, mentor tận tâm. Giúp
                      tôi phát triển kỹ năng đáng kể!
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src="/img/testimonials/testimonials-2.jpg"
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Nhà Thiết Kế</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Khóa học dễ hiểu, nội dung súc tích, có thể áp dụng ngay
                      vào công việc. Một trải nghiệm học tập rất hiệu quả!"
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src="/img/testimonials/testimonials-3.jpg"
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Jena Karlis</h3>
                  <h4>Chủ Cửa Hàng</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Kiến thức thực tế, dễ tiếp cận. Khóa học giúp tôi cải
                      thiện kỹ năng kinh doanh một cách đáng kể!
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src="/img/testimonials/testimonials-4.jpg"
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Matt Brandon</h3>
                  <h4>Freelancer</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Khóa học linh hoạt, phù hợp cho freelancer. Tôi có thể học
                      bất cứ khi nào và áp dụng ngay vào dự án thực tế!
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src="/img/testimonials/testimonials-5.jpg"
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>John Larson</h3>
                  <h4>Người Khởi Nghiệp</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Khóa học dễ hiểu, nội dung súc tích, có thể áp dụng ngay
                      vào công việc. Một trải nghiệm học tập rất hiệu quả!"
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </main>
  );
}