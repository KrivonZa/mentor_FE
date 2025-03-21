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
        <a href="/" className="logo d-flex align-items-center me-auto">
          {/* <img src="/img/logo.png" alt="" /> */}
          <h1 className="sitename">Empower U</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trainers"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
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
                      My Profile
                    </NavLink>
                  </li>
                  {/* <li className="dropdown">
                    <NavLink
                      to="#"
                      className={({ isActive }) =>
                        isActive ? "active toggle-dropdown" : "toggle-dropdown"
                      }
                    >
                      <span>Deep Dropdown</span>
                      <i className="bi bi-chevron-down"></i>
                    </NavLink>
                    <ul>
                      <li>
                        <NavLink
                          to="#"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Deep Dropdown 1
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Deep Dropdown 2
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Deep Dropdown 3
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Deep Dropdown 4
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          Deep Dropdown 5
                        </NavLink>
                      </li>
                    </ul>
                  </li> */}
                  <li>
                    <NavLink
                      to="/user/wallet"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      My Wallet
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/schedule"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      My Schedule
                    </NavLink>
                  </li>
                  {role === "MENTOR" && (
                    <li>
                      <NavLink
                        to="/user/course-portal"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        My Course
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={handleLogout}
                    >
                      Logout
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
                  Login
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
