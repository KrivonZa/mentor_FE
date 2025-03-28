import React, { useState, useEffect } from "react";
import { transactionService } from "../../../services/transactionService";
import { Modal, Button, Input, Select, Space, Table } from "antd";
import "../../../../public/css/WithdrawRequest.scss";

const { Option } = Select;

export function WithdrawRequestsPage() {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    email: "",
    name: "",
    phone: "",
    status: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Gọi API khi component mount hoặc pagination thay đổi
  useEffect(() => {
    fetchWithdrawRequests({
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }, [pagination.current, pagination.pageSize]);

  const fetchWithdrawRequests = async (params = {}) => {
    setLoading(true);
    try {
      const page = params.page || 0;
      const size = params.size || pagination.pageSize;
      const apiFilters = params.filters || filters; // Sử dụng filters từ params nếu có

      const filteredApiFilters = {};
      if (apiFilters.email) filteredApiFilters.email = apiFilters.email;
      if (apiFilters.name) filteredApiFilters.name = apiFilters.name;
      if (apiFilters.phone) filteredApiFilters.phone = apiFilters.phone;
      filteredApiFilters.statuses = apiFilters.status ? [apiFilters.status] : [];

      const response = await transactionService.getWithdrawList(filteredApiFilters, page, size);

      setWithdrawRequests(response.content || []);
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

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchWithdrawRequests({
      page: 0,
      size: pagination.pageSize,
    });
  };

  const handleReset = () => {
    const defaultFilters = {
      email: "",
      name: "",
      phone: "",
      status: "",
    };
    setFilters(defaultFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
    // Gọi API với defaultFilters trực tiếp để đảm bảo không dùng filters cũ
    fetchWithdrawRequests({
      page: 0,
      size: pagination.pageSize,
      filters: defaultFilters,
    });
  };

  const handleTableChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }));
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await transactionService.updateWithdrawStatus(requestId, status);
      fetchWithdrawRequests({
        page: pagination.current - 1,
        size: pagination.pageSize,
      });
      setViewModalOpen(false);
    } catch (error) {
      console.error("Error updating withdraw status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "creatorName",
      key: "creatorName",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "creatorEmail",
      key: "creatorEmail",
      render: (text) => text || "N/A",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      render: (text) => text || "N/A",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (text) => text || "N/A",
    },
    {
      title: "Account Holder",
      dataIndex: "accountHolderName",
      key: "accountHolderName",
      render: (text) => text || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`status-${status?.toLowerCase()}`}>{status}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<span className="material-symbols-outlined">visibility</span>}
            onClick={() => handleViewRequest(record)}
          />
          {record.status === "PENDING" && (
            <>
              <Button
                type="link"
                style={{ color: "#4CAF50", fontWeight: "bold" }}
                onClick={() => handleStatusUpdate(record.id, "DONE")}
              >
                Approve
              </Button>
              <Button
                type="link"
                style={{ color: "#dc2626", fontWeight: "bold" }}
                onClick={() => handleStatusUpdate(record.id, "REJECTED")}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="withdraw-requests-container">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="page-header">
          <h2 className="title" style={{ fontWeight: "bold", fontSize: "24px" }}>
            Withdraw Requests Management
          </h2>
        </div>

        <div className="summary-cards">
          <div className="summary-card pending">
            <h3>Pending</h3>
            <p>{withdrawRequests.filter((req) => req.status === "PENDING").length}</p>
          </div>
          <div className="summary-card approved">
            <h3>Approved</h3>
            <p>{withdrawRequests.filter((req) => req.status === "DONE").length}</p>
          </div>
          <div className="summary-card rejected">
            <h3>Rejected</h3>
            <p>{withdrawRequests.filter((req) => req.status === "REJECTED").length}</p>
          </div>
        </div>

        <div className="filters" style={{ marginBottom: "24px" }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space wrap>
              <div style={{ minWidth: "250px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Email
                </label>
                <Input
                  name="email"
                  value={filters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                  placeholder="Enter email"
                  allowClear
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ minWidth: "250px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Name
                </label>
                <Input
                  name="name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  placeholder="Enter name"
                  allowClear
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ minWidth: "250px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Status
                </label>
                <Select
                  name="status"
                  value={filters.status || undefined}
                  onChange={(value) => handleFilterChange("status", value)}
                  placeholder="Select status"
                  allowClear
                  style={{ width: "100%" }}
                >
                  <Option value="PENDING">Pending</Option>
                  <Option value="DONE">Approved</Option>
                  <Option value="REJECTED">Rejected</Option>
                </Select>
              </div>
            </Space>
            <Space>
              <button className="bg-success px-3 py-2 text-white rounded-4" onClick={handleSearch}>
                Search
              </button>
              <button className="bg-secondary px-3 py-2 text-white rounded-4" onClick={handleReset}>Reset</button>
              <button className="bg-primary px-3 py-2 text-white rounded-4" onClick={() => fetchWithdrawRequests({ page: pagination.current - 1, size: pagination.pageSize })}>
                Refresh
              </button>
            </Space>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={withdrawRequests}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
          locale={{ emptyText: "No withdrawal requests found" }}
        />

        <Modal
          title="Withdraw Request Details"
          open={viewModalOpen}
          onCancel={() => setViewModalOpen(false)}
          footer={[
            selectedRequest?.status === "PENDING" && (
              <>
                <Button
                  key="approve"
                  type="primary"
                  style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
                  onClick={() => handleStatusUpdate(selectedRequest.id, "DONE")}
                >
                  Approve
                </Button>
                <Button
                  key="reject"
                  danger
                  onClick={() => handleStatusUpdate(selectedRequest.id, "REJECTED")}
                >
                  Reject
                </Button>
              </>
            ),
            <Button key="close" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>,
          ].filter(Boolean)}
          width={600}
        >
          {selectedRequest && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                padding: "16px 0",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Request ID:</span>
                <span>{selectedRequest.id}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Status:</span>
                <span className={`status-${selectedRequest.status?.toLowerCase()}`}>
                  {selectedRequest.status}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Amount:</span>
                <span>{selectedRequest.amount?.toLocaleString()}đ</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Created Date:</span>
                <span>{formatDate(selectedRequest.createdAt)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Creator Name:</span>
                <span>{selectedRequest.creatorName || "N/A"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Creator Email:</span>
                <span>{selectedRequest.creatorEmail || "N/A"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Bank Name:</span>
                <span>{selectedRequest.bankName || "N/A"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 500, color: "#374151" }}>Account Number:</span>
                <span>{selectedRequest.accountNumber || "N/A"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  gridColumn: "span 2",
                }}
              >
                <span style={{ fontWeight: 500, color: "#374151" }}>Account Holder:</span>
                <span>{selectedRequest.accountHolderName || "N/A"}</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default WithdrawRequestsPage;