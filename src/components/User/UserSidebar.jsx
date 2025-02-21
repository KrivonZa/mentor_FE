import React from "react";
import { Link } from "react-router-dom";
export function UserSidebar() {
  return (
    <>
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-[#5fd080]">
          <h1 className="text-white text-xl font-bold text-center">User Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <Link to="">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">man</span>
                Profile
              </li>
            </Link>
            <Link to="transaction">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">history</span>
                Transaction
              </li>
            </Link>
            {
              localStorage.getItem("ROLE") == "MENTOR" && (
                <Link to="course-portal">
                  <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                    <span class="material-symbols-outlined mr-2">schedule</span>
                    Manage Courses
                  </li>
                </Link>
              )
            }
          </ul>
        </nav>
      </aside>
    </>
  );
}
