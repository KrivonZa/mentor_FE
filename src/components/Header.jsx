import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react"
import { getUserByToken } from "../services/UserService";
import { AppContext } from "../routes/AppProvider";

export default function Header() {
  const token = localStorage.getItem("USER")
  const role = localStorage.getItem("ROLE")
  const navigate = useNavigate();
  const { setUser, user, logout } = useContext(AppContext);

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
  return (
    <header id="header" className="header d-flex align-items-center sticky-top" style={{ zIndex: '10' }}>
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="/" className=" d-flex align-items-center me-auto">
            <img
              src="https://empoweru.s3.ap-southeast-1.amazonaws.com/1747233033623-duydtase183660%40fpt.edu.vn-logo.svg"
              alt="Empower U Logo"
              style={{ width: '55%',height:'30%'}}
            />
        </a>


        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Trang Chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Về Chúng Tôi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Các Khoá Học
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trainers"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Đội Ngũ EmpowerU
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li> */}
            {token ? (
              <li className="dropdown">
                <NavLink
                  className="d-flex align-items-center"
                  to="/user"
                >
                  <span className="me-3 font-bold">{user?.fullName}</span>
                  <img
                    loading="lazy"
                    src={user?.avatar}
                    className="rounded-circle object-fit-cover"
                    style={{ width: '40px', height: '40px' }}
                  />
                </NavLink>
                <ul>
                  <li>
                    <NavLink
                      to="/user"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Hồ Sơ Của Tôi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/wallet"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Ví EmpowerU
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/schedule"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                     Lịch Học
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/request-withdraw"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Withdraw Request
                    </NavLink>
                  </li>
                  {role !== "MENTOR" && (
                    <>
                      <li>
                        <NavLink
                          to="/user/registered-class"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Các Khoá Học Đã Đăng Ký
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user/approval"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Đăng Ký Mentor
                        </NavLink>
                      </li>
                    </>
                  )}
                  {role === "MENTOR" && (
                    <>
                      <li>
                        <NavLink to="/user/course-portal" className={({ isActive }) => (isActive ? "active" : "")}>
                          Khoá Học Của Tôi
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/user/course-request" className={({ isActive }) => (isActive ? "active" : "")}>
                          Khoá Học Chờ Duyệt
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/user/class-portal" className={({ isActive }) => (isActive ? "active" : "")}>
                          Quản Lý Lớp Học
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={handleLogout}
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
                >
                  Đăng Nhập
                </NavLink>
              </li>
            )}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}
