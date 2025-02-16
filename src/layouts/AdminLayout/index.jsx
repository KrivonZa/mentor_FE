import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components/Admin"
import "/public/css/AdminDashboard.scss";

export const AdminLayout = () => {
  return (
    <div id="accountLayoutContainer">
      <div id="webcrumbs">
        <div className="min-h-screen bg-gray-100 flex">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
