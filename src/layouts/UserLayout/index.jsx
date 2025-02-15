import React from "react";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components/User"
import "/public/css/AdminDashboard.css";

export const UserLayout = () => {
    return (
        <div id="webcrumbs">
            <div className="min-h-screen bg-gray-100 flex">
                <UserSidebar />
                <div className="flex-1 flex flex-col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
