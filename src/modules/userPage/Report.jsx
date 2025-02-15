import React, { useEffect, useState } from "react";
import { reportService} from "../../services/reportService";


export function Report() {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getAllReportPagination(currentPage);
  
        setReports(response.data);
        setTotalPages(response.totalPage);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Report Management</h4>
          <button className="btn btn-primary">+ New Report</button>
        </div>
        {/* Search & Filter */}
        <div className="input-group mt-4">
          <input type="text" className="form-control" placeholder="Search reports..." />
          <button className="btn btn-outline-secondary">🔍</button>
        </div>

        {/* Table */}
        <div className="table-responsive mt-3">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Reporter</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.reportId}>
                    <td>{report.reportId}</td>
                    <td>{report.reporterCustom.email}</td>
                    <td>{report.reason}</td>
                    <td>
                      <span
                        className={`badge ${
                          report.reportStatus === "PENDING"
                            ? "bg-warning text-dark"
                            : report.reportStatus === "APPROVED"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {report.reportStatus}
                      </span>
                    </td>
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-2">✏</button>
                      <button className="btn btn-outline-danger btn-sm">🗑</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="mt-3">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
