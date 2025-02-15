import React from "react";
import { Link } from "react-router-dom";
export function AdminSidebar() {
  return (
    <>
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-[#5fd080]">
          <h1 className="text-white text-xl font-bold text-center">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <Link to="">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">man</span>
                Users
              </li>
            </Link>
            <Link to="mentors">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">Computer</span>
                Mentors
              </li>
            </Link>
            <Link to="students">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">Edit</span>
                Students
              </li>
            </Link>
            <Link to="staffs">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">
                  Engineering
                </span>
                Staffs
              </li>
            </Link>
            <Link to="report">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">Flag</span>
                Reports
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
}
