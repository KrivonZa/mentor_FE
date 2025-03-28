import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import PureCounter from "@srexi/purecounterjs";

export function About() {
  useEffect(() => {
    document.title = "About";
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
                  About Us
                  <br />
                </h1>
                <p className="mb-0">
                  Empower U is an innovative platform where mentors and mentees connect directly (1:1) to grow, learn, and achieve personal and professional goals together. Born with the mission of providing personalized and inspiring learning opportunities, we are proud to have supported thousands of individuals on their development journey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="current">
                About Us
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
              <img src="/img/about-2.jpg" className="img-fluid" alt="" />
            </div>

            <div
              className="col-lg-6 order-2 order-lg-1 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>EmpowerU - Consulting, mentoring with experts</h3>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    200+ experts who have worked in large companies
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Experts with successful case studies
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Experts with high qualifications
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    EmpowerU guarantees verification of expert information
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    100% refund if you are not satisfied
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
                <p>Students</p>
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
                <p>Courses</p>
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
                <p>Events</p>
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
                <p>Trainers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>What are they saying</p>
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
                      Great service! Quality content, dedicated mentor. Helped me develop my skills significantly!
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
                  <h4>Designer</h4>
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
                      The course is easy to understand, concise content, and can be applied immediately to work. A very effective learning experiences!
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
                  <h4>Store Owner</h4>
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
                      Great service! Quality content, dedicated mentor. Helped me develop my skills significantly!
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
                      The course is easy to understand, concise content, and can be applied immediately to work. A very effective learning experiences!
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
                  <h4>Entrepreneur</h4>
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
                      Great service! Quality content, dedicated mentor. Helped me develop my skills significantly!
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
