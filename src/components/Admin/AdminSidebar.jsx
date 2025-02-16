import React from "react";
import { Link, useLocation } from "react-router-dom";

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-lg" style={{ width: "250px" }}>
      <div className="p-3 bg-success text-white text-center fw-bold">
        Admin Panel
      </div>
      <nav>
        <ul className="list-unstyled position-relative">
          {[
            { to: "/admin", label: "Users", icon: "man" },
            { to: "/admin/mentors", label: "Mentors", icon: "computer" },
            { to: "/admin/students", label: "Students", icon: "edit" },
            { to: "/admin/staffs", label: "Staffs", icon: "engineering" },
            { to: "/admin/report", label: "Reports", icon: "flag" },
          ].map((item) => (
            <li key={item.to} className="position-relative p-2">
              <Link
                to={item.to}
                className={`d-flex align-items-center ps-4 p-2 text-success text-decoration-none rounded fw-bold transition 
                  ${location.pathname === item.to && "bg-success text-white"}`}
                style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
              >
                <span
                  className={`chevron-icon position-absolute start-0 ms-2 material-symbols-outlined ${location.pathname === item.to ? "show" : ""
                    }`}
                >
                  chevron_right
                </span>
                <span className="me-2 material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
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
