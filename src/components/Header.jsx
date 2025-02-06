import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
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
            <li className="dropdown">
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "active toggle-dropdown" : "toggle-dropdown")}
              >
                <span>Dropdown</span>
                <i className="bi bi-chevron-down"></i>
              </NavLink>
              <ul>
                <li>
                  <NavLink
                    to="#"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dropdown 1
                  </NavLink>
                </li>
                <li className="dropdown">
                  <NavLink
                    to="#"
                    className={({ isActive }) => (isActive ? "active toggle-dropdown" : "toggle-dropdown")}
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
                </li>
                <li>
                  <NavLink
                    to="#"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dropdown 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dropdown 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dropdown 4
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a className="btn-getstarted" href="/courses">
          Get Started
        </a>
      </div>
    </header>
  );
}
