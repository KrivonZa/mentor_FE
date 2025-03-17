import React from "react";

export const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-white">
      <h1 className="display-1 fw-bold" style={{ color: "#5FCF80" }}>404</h1>
      <h2 className="text-dark">Oops! Page not found</h2>
      <p className="text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="btn btn-success mt-3 px-4 py-2">
        Go Back Home
      </a>
    </div>
  );
};