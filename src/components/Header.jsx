import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { getUserByToken } from "../services/UserService";
import { AppContext } from "../routes/AppProvider";

export default function Header() {
  const token = localStorage.getItem("USER");
  const role = localStorage.getItem("ROLE");
  const navigate = useNavigate();
  const { setUser, user, logout } = useContext(AppContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const userData = await getUserByToken(token);
        console.log("error: ", userData);

        setUser(userData.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
  };


  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <header
      id="header"
      className="header d-flex align-items-center sticky-top"
      style={{ zIndex: "10" }}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="/" className="d-flex align-items-center">
          <img
            src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747233033623-duydtase183660%40fpt.edu.vn-logo.svg"
            alt="Empower U Logo"
            style={{ width: "55%", height: "30%" }}
          />
        </a>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavOpen ? "navmenu-active" : ""}`}
        >
          <ul>
            {role !== "MENTOR" && (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeMobileNav} 
                  >
                    Trang Chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeMobileNav}
                  >
                    Về Chúng Tôi
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeMobileNav}
                  >
                    Các Khoá Học
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/trainers"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeMobileNav}
                  >
                    Đội Ngũ EmpowerU
                  </NavLink>
                </li>
              </>
            )}

            {/* logged in */}
            {token ? (
              <li className="dropdown">
                <NavLink
                  className="d-flex align-items-center"
                  to="/user"
                  onClick={closeMobileNav}
                >
                  <span className="me-3 font-bold">{user?.fullName}</span>
                  <img
                    loading="lazy"
                    src={user?.avatar}
                    className="rounded-circle object-fit-cover"
                    style={{ width: "40px", height: "40px" }}
                  />
                </NavLink>
                <ul>
                  <li>
                    <NavLink
                      to="/user"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={closeMobileNav}
                    >
                      Hồ Sơ Của Tôi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/wallet"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={closeMobileNav}
                    >
                      Ví EmpowerU
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/schedule"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={closeMobileNav}
                    >
                      Lịch Học
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/request-withdraw"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={closeMobileNav}
                    >
                      Lịch Sử Giao Dịch
                    </NavLink>
                  </li>
                  {role !== "MENTOR" && (
                    <>
                      <li>
                        <NavLink
                          to="/user/registered-class"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          onClick={closeMobileNav}
                        >
                          Khoá Học Của Tôi
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user/approval"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          onClick={closeMobileNav}
                        >
                          Đăng Ký Mentor
                        </NavLink>
                      </li>
                    </>
                  )}
                  {role === "MENTOR" && (
                    <>
                      <li>
                        <NavLink
                          to="/user/course-portal"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          onClick={closeMobileNav}
                        >
                          Khoá Học Của Tôi
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user/course-request"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          onClick={closeMobileNav}
                        >
                          Khoá Học Chờ Duyệt
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user/class-portal"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          onClick={closeMobileNav}
                        >
                          Quản Lý Lớp Học
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => {
                        closeMobileNav();
                        handleLogout();
                      }}
                    >
                      Đăng Xuất
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMobileNav}
                >
                  Đăng Nhập
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <i
          className={`mobile-nav-toggle d-xl-none bi ${
            isMobileNavOpen ? "bi-x" : "bi-list"
          }`}
          onClick={toggleMobileNav}
        ></i>
      </div>

      {/* CSS for mobile navigation */}
      <style jsx>{`
        @media (max-width: 1199px) {
          .navmenu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: calc(100vh - 70px);
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            transition: all 0.3s ease;
            overflow-y: auto;
            z-index: 9999;
          }

          .navmenu-active {
            right: 0;
          }

          .navmenu ul {
            display: flex;
            flex-direction: column;
            padding-left: 0;
          }

          .navmenu ul li {
            margin: 10px 0;
            width: 100%;
          }

          .mobile-nav-toggle {
            font-size: 28px;
            cursor: pointer;
            color: #444444;
          }

          .dropdown > ul {
            position: static !important;
            display: none;
            padding-left: 15px;
            background: transparent;
            box-shadow: none;
          }

          .dropdown:hover > ul,
          .dropdown:focus > ul {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
