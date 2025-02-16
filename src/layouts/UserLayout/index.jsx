import React from "react";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components/User";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const UserLayout = () => {
    return (
        <div>
            <Header />
            <div className="d-flex min-vh-100 bg-light">
                <div className="d-flex" style={{ width: "250px" }}>
                    <UserSidebar />
                </div>
                <div className="flex-grow-1 d-flex flex-column">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
