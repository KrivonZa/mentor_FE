import React from "react";
import { Link, useLocation } from "react-router-dom";

//? ***********************
//? type PageBannerProps = {
//?     title: string,
//?     description: string
//?     alternateLastPath ?: string
//? }
//? ***********************
export const PageBanner = ({ title, description, alternateLastPath }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="page-title" data-aos="fade">
      {title !== "Course Details" && (
        <>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>{title}</h1>
                  <p className="mb-0 mt-3">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/courses">Các Khoá Học</Link>
            </li>
            <li className="current">{alternateLastPath}</li>
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default PageBanner;