import React, { useState, useContext, useEffect } from "react";
import { transactionService } from "../../services/transactionService";
import { AppContext } from "../../routes/AppProvider";

export const RequestWithdraw = () => {
  const { user } = useContext(AppContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Filter theo status
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // Gọi API khi pagination hoặc statusFilter thay đổi
  useEffect(() => {
    fetchWithdrawRequests({
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }, [pagination.current, pagination.pageSize, statusFilter, user]);

  const fetchWithdrawRequests = async (params = {}) => {
    setLoading(true);
    try {
      const page = params.page || 0;
      const size = params.size || pagination.pageSize;

      const apiFilters = {};
      if (user?.email) apiFilters.email = user.email; // Lấy email từ user
      if (statusFilter) apiFilters.statuses = [statusFilter]; // Filter theo status nếu có

      const response = await transactionService.getWithdrawList(apiFilters, page, size);

      setRequests(response.content || []);
      setPagination((prev) => ({
        ...prev,
        current: response.pageable.pageNumber + 1,
        total: response.totalElements,
        pageSize: response.size,
      }));
    } catch (error) {
      setError("Failed to fetch withdraw requests");
      console.error("Error fetching withdraw requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset về trang 1 khi thay đổi status
  };

  const handleReset = () => {
    setStatusFilter(""); // Reset status về rỗng
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset về trang 1
  };

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({ ...prev, current: pageNumber + 1 }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="container py-5">
      <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
        <div className="card-header" style={{ backgroundColor: "#5fd080", color: "white" }}>
          <h4 className="text-center my-4 h1 fw-bold">Lịch Sử Rút Tiền</h4>
        </div>
        <div className="card-body">
          {/* Filter theo status */}
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <label htmlFor="statusFilter" className="me-2 fw-bold">
                Bộ lọc Trạng Thái:
              </label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={handleStatusChange}
                style={{ width: "200px" }}
              >
                <option value="">Tất Cả</option>
                <option value="PENDING">Chờ Xét Duyệt</option>
                <option value="DONE">Được Chấp Nhận</option>
                <option value="REJECTED">Bị Từ Chối</option>
              </select>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={handleReset}>
                Xoá
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Số Tiền (VND)</th>
                  <th>Tên Ngân Hàng</th>
                  <th>Số Tài Khoản</th>
                  <th>Tên Chủ Tài Khoản</th>
                  <th>Trạng Thái</th>
                  <th>Thời Gian Tạo</th>
                  <th>Người Tạo</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Đang lấy dữ liệu...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center text-danger">
                      {error}
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Chưa có giao dịch rút tiền nào
                    </td>
                  </tr>
                ) : (
                  requests.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.amount.toLocaleString()}</td>
                      <td>{item.bankName || "N/A"}</td>
                      <td>{item.accountNumber || "N/A"}</td>
                      <td>{item.accountHolderName || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "DONE"
                              ? "bg-success"
                              : item.status === "PENDING"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                      <td>
                        {item.creatorName} ({item.creatorEmail})
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.current === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.current - 2)}
                    disabled={pagination.current === 1}
                  >
                    Trang Trước
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${pagination.current === index + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(index)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${pagination.current === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.current)}
                    disabled={pagination.current === totalPages}
                  >
                    Kế Tiếp
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestWithdraw;