import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export const PageBanner = ({ title, description }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    return (
        <div className="page-title" data-aos="fade">
            <div className="heading">
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-lg-8">
                            <h1>{title}</h1>
                            <p className="mb-0">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={to} className={isLast ? "current" : ""}>
                                    {isLast ? (
                                        value.charAt(0).toUpperCase() + value.slice(1)
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
    )
}

export default PageBanner