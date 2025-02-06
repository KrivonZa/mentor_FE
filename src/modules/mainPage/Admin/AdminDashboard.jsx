import React,{useEffect} from "react";
import "../../../assets/css/AdminDashboard.css";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { Outlet } from "react-router-dom";
export default function AdminDashboard(){
  return (
    <div  id="webcrumbs">
      <div className="min-h-screen bg-gray-100 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          {/* <Outlet /> */}
          <Footer />
        </div>
      </div>
    </div>
  );
};