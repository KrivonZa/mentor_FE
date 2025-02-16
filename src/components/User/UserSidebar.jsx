import React from "react";
import { Link, useLocation } from "react-router-dom";

export function UserSidebar() {
  const location = useLocation();

  return (
    <aside className="position-fixed vh-100 overflow-auto bg-light p-3" style={{ width: "250px" }}>
      <nav>
        <ul className="list-unstyled position-relative">

          <li className="position-relative">
            <Link
              to=""
              className={`d-flex align-items-center ps-4 p-2 text-success text-decoration-none rounded fw-bold transition 
                         ${location.pathname === "/user" && "bg-success text-white"}`}
              style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
            >
              <span
                className={`chevron-icon position-absolute start-0 ms-2 material-symbols-outlined ${location.pathname === "/user" ? "show" : ""
                  }`}
              >
                chevron_right
              </span>
              <span className="me-2 material-symbols-outlined">man</span>
              Profile
            </Link>
          </li>
          <li className="position-relative">
            <Link
              to="transaction"
              className={`d-flex align-items-center ps-4 p-2 text-success text-decoration-none rounded fw-bold transition 
                         ${location.pathname === "/user/transaction" && "bg-success text-white"}`}
              style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
            >
              <span
                className={`chevron-icon position-absolute start-0 ms-2 material-symbols-outlined ${location.pathname === "/user/transaction" ? "show" : ""
                  }`}
              >
                chevron_right
              </span>
              <span className="me-2 material-symbols-outlined">history</span>
              Transaction
            </Link>
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
