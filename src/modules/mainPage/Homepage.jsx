import { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";
import axios from "axios";
export function Homepage() {
  useEffect(() => {
    document.title = "Homepage";
    new PureCounter();

    const fetchJwtWithUuid = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");

      if (uuid) {
        try {
          const response = await axios.get(`http://empoweru.trangiangkhanh.online/empoweru/sba/user/google-principal?uuid=${uuid}`);
          const token = response.data.data.token;
          localStorage.setItem("ROLE", response.data.data.role);
          localStorage.setItem("USER", token);
          window.history.replaceState({}, document.title, window.location.pathname);
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
            Learning Today,
            <br />
            Leading Tomorrow
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">
            We are team of talented designers making websites with Bootstrap
          </p>
          <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
            <a href="/courses" className="btn-get-started">
              Get Started
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
              <h3>Connect with mentors</h3>
              <p className="fst-italic">
                Every field has top experts, let the experts help you solve your problem. You are not alone.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    People with a Mentor advance 5 times faster than others*
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    80% of working people consider networking a must for success*
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                    Chances of getting a job are 4 times higher if introduced through networking*
                  </span>
                </li>
              </ul>
              <a href="#" className="read-more">
                <span>Read More</span>
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

      <section id="why-us" className="section why-us">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="why-box">
                <h3>The value you will get from EmpowerU?</h3>
                <p>
                  EmpowerU provides a learning platform that connects students with quality experts, helping you improve your skills, expand your knowledge, and develop your career effectively. With a diverse course system, flexible study schedules, and comprehensive support tools, EmpowerU provides a personalized learning experience that suits all your needs and goals.
                </p>
                <div className="text-center">
                  <a href="#" className="more-btn">
                    <span>Learn More</span>{" "}
                    <i className="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
                <div className="col-xl-4">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Mission</h4>
                    <p>
                      EmpowerU’s mission is to create an online education platform that connects experienced professionals with those seeking knowledge and guidance. This will help students develop practical skills, confidently pursue their career goals, and achieve sustainable success.
                    </p>
                  </div>
                </div>

                <div
                  className="col-xl-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-gem"></i>
                    <h4>Vision</h4>
                    <p>
                      To become the leading educational platform where every individual has the opportunity to access the best mentors, learn in the most suitable 1-1 method and develop comprehensively in career and life.
                    </p>
                  </div>
                </div>

                <div
                  className="col-xl-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-inboxes"></i>
                    <h4>Core Values</h4>
                    <p>
                      <p><span className="fw-bold">Quality:</span> Provide the best learning content and support services</p>

                      <p><span className="fw-bold">Connection:</span> Build an active learning community</p>

                      <p><span className="fw-bold">Flexibility:</span> Allow for self-selection of suitable study schedules</p>

                      <p><span className="fw-bold">Sustainable Development:</span> Continuously improve to deliver long-term value</p>
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
                    Business
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
                    Foreign Languages
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
                    Graphics & Design
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
                    Start up
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
                    Soft skills
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
                    Investment
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
                    Office informatics
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
                    Financial accounting
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

      {/* <section id="courses" className="courses section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Courses</h2>
          <p>Popular Courses</p>
        </div>

        <div className="container">
          <div className="row">
            <div
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="course-item">
                <img src="/img/course-1.jpg" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">Web Development</p>
                    <p className="price">169,000đ</p>
                  </div>

                  <h3>
                    <a href="/course-detail">Website Design</a>
                  </h3>
                  <p className="description">
                    Et architecto provident deleniti facere repellat nobis iste.
                    Id facere quia quae dolores dolorem tempore.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-profile d-flex align-items-center">
                      <img
                        src="/img/trainers/trainer-1-2.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <a href="" className="trainer-link">
                        Antonio
                      </a>
                    </div>
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-person user-icon"></i>&nbsp;50
                      &nbsp;&nbsp;
                      <i className="bi bi-heart heart-icon"></i>&nbsp;65
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="course-item">
                <img src="/img/course-2.jpg" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">Marketing</p>
                    <p className="price">$250</p>
                  </div>

                  <h3>
                    <a href="/course-detail">Search Engine Optimization</a>
                  </h3>
                  <p className="description">
                    Et architecto provident deleniti facere repellat nobis iste.
                    Id facere quia quae dolores dolorem tempore.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-profile d-flex align-items-center">
                      <img
                        src="/img/trainers/trainer-2-2.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <a href="" className="trainer-link">
                        Lana
                      </a>
                    </div>
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-person user-icon"></i>&nbsp;35
                      &nbsp;&nbsp;
                      <i className="bi bi-heart heart-icon"></i>&nbsp;42
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="course-item">
                <img src="/img/course-3.jpg" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">Content</p>
                    <p className="price">$180</p>
                  </div>

                  <h3>
                    <a href="/course-detail">Copywriting</a>
                  </h3>
                  <p className="description">
                    Et architecto provident deleniti facere repellat nobis iste.
                    Id facere quia quae dolores dolorem tempore.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-profile d-flex align-items-center">
                      <img
                        src="/img/trainers/trainer-3-2.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <a href="" className="trainer-link">
                        Brandon
                      </a>
                    </div>
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-person user-icon"></i>&nbsp;20
                      &nbsp;&nbsp;
                      <i className="bi bi-heart heart-icon"></i>&nbsp;85
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                  <span>Web Development</span>
                  <p>
                    With years of experience in web development, I can help you build a professional website from frontend to backend
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
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
                    Marketing expert with creative strategies to help businesses develop their brands and reach customers effectively
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
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
                    Deliver engaging content strategies that help businesses build strong brands and connect better with customers
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
