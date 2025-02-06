import React from "react";
import { Link } from "react-router-dom";
export default function AdminSidebar() {
  return (
    <>
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-[#5fd080]">
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <Link to="category">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">Category</span>
                Categories
              </li>
            </Link>
            <Link to="article">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">Article</span>
                Articles
              </li>
            </Link>
            <Link to="user">
              <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex items-center">
                <span className="material-symbols-outlined mr-2">man</span>
                Users
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};