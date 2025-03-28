import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../routes/AppProvider";

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AppContext)

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="d-flex flex-column w-64 bg-white shadow-lg sticky-md-top z-0" style={{ width: "250px", height: "100vh" }}>
      <div className="px-3 py-4 bg-success text-center fw-bold">
        <button onClick={() => navigate("/admin")}>
          <h1 className="text-white fs-4">Empower U</h1>
        </button>
      </div>
      <nav className="flex-grow-1">
        <ul className="list-unstyled position-relative d-flex flex-column h-100">
          {[
            { to: "/admin", label: "Users", icon: "man" },
            { to: "/admin/mentors", label: "Mentors", icon: "school" },
            { to: "/admin/mentor-approval", label: "Mentor Request", icon: "computer" },
            // { to: "/admin/staffs", label: "Staffs", icon: "engineering" },
            // { to: "/admin/report", label: "Reports", icon: "flag" },
            { to: "/admin/approve-course", label: "Approve Course", icon: "thumbs_up_down" },
            { to: "/admin/withdraw-requests", label: "Withdraw Requests", icon: "money" },
          ].map((item) => (
            <li key={item.to} className="position-relative p-2">
              <Link
                to={item.to}
                className={`d-flex align-items-center ps-2 p-2 text-success text-decoration-none rounded fw-bold transition 
              ${location.pathname === item.to && "bg-success text-white"}`}
                style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
              >
                <span className="me-2 material-symbols-outlined">{item.icon}</span>
                <span
                  className={`chevron-icon position-absolute end-0 ms-2 material-symbols-outlined ${location.pathname === item.to ? "show" : ""
                    }`}
                >
                  chevron_right
                </span>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-auto">
            <button className="w-100 btn btn-danger p-3 fw-bold" style={{ color: "#e50000" }} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <style>
        {`
      .chevron-icon {
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease-in-out;
      }
      .chevron-icon.show {
        opacity: 1;
        transform: translateX(0);
      }
    `}
      </style>
    </aside>

  );
}
