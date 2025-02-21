import React from "react";
import { Link, useLocation } from "react-router-dom";

export function UserSidebar() {
  const location = useLocation();
  const role = localStorage.getItem("ROLE");

  const menuItems = [
    { to: "/user", label: "Profile", icon: "man" },
    { to: "/user/wallet", label: "Wallet", icon: "wallet" },
    { to: "/user/schedule", label: "Schedule", icon: "calendar_month" }
  ];

  if (role === "STUDENT") {
    menuItems.push({ to: "/user/weekly-schedule", label: "Weekly Schedule", icon: "calendar_month" });
  }

  return (
    <aside className="position-fixed vh-100 overflow-auto bg-light p-3" style={{ width: "250px" }}>
      <nav>
        <ul className="list-unstyled position-relative">
          {menuItems.map((item) => (
            <li key={item.to} className="position-relative p-2">
              <Link
                to={item.to}
                className={`d-flex align-items-center ps-4 p-2 text-success text-decoration-none rounded fw-bold transition 
                  ${location.pathname === item.to ? "bg-success text-white" : ""}`}
                style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
              >
                <span className="me-2 material-symbols-outlined">{item.icon}</span>
                <span
                  className={`chevron-icon position-absolute end-0 ms-2 material-symbols-outlined 
                    ${location.pathname === item.to ? "show" : ""}`}
                >
                  chevron_right
                </span>
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
