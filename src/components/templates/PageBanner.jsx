import React from 'react';
import { Link, useLocation } from 'react-router-dom';

//? ***********************
//? type PageBannerProps = {
//?     title: string,
//?     description: string
//?     alternateLastPath ?: string
//? }
//? ***********************
export const PageBanner = ({ title, description, alternateLastPath }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    return (
        <div className="page-title" data-aos="fade">
            {title !== "Course Details" && (
                <>
                    <div className="heading">
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1>{title}</h1>
                                    <p className="mb-0">{description}</p>
                                </div>
                            </div>
                        </div>
                    </div></>)}
            <nav className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <Link to="/">Tra Chủ</Link>
                        </li>
                        {pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={to} className={isLast ? "current" : ""}>
                                    {isLast ? (
                                        alternateLastPath ? (
                                            alternateLastPath
                                        ) : (
                                            value.charAt(0).toUpperCase() + value.slice(1)
                                        )
                                    ) : (
                                        <Link to={to}>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </nav>
        </div>
    );
};

export default PageBanner;