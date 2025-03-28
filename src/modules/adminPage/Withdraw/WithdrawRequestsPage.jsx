import React, { useState, useEffect } from "react";
import { transactionService } from "../../../services/transactionService";
import { Modal, Button } from "antd";
import "../../../../public/css/WithdrawRequest.scss";

export function WithdrawRequestsPage() {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchWithdrawRequests();
  }, []);

  const fetchWithdrawRequests = async () => {
    setLoading(true);
    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const response = await transactionService.getWithdrawList(filters);
      setWithdrawRequests(response.content || []);
      setFilteredRequests(response.content || []);
    } catch (error) {
      setError("Failed to fetch withdraw requests");
      console.error("Error fetching withdraw requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      await transactionService.updateWithdrawStatus(requestId, status);
      fetchWithdrawRequests();
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
          <p>{withdrawRequests.filter(req => req.status === 'PENDING').length}</p>
        </div>
        <div className="summary-card approved">
          <h3>Approved</h3>
          <p>{withdrawRequests.filter(req => req.status === 'DONE').length}</p>
        </div>
        <div className="summary-card rejected">
          <h3>Rejected</h3>
          <p>{withdrawRequests.filter(req => req.status === 'REJECTED').length}</p>
        </div>
      </div>

      <div className="filters">
        <div className="status-filter">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <button onClick={fetchWithdrawRequests} className="refresh-btn">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="no-data">No withdrawal requests found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bank Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Account Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Account Holder</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{request.creatorName || 'N/A'}</td>
                  <td className="px-6 py-4">{request.creatorEmail || 'N/A'}</td>
                  <td className="px-6 py-4">{request.bankName || 'N/A'}</td>
                  <td className="px-6 py-4">{request.accountNumber || 'N/A'}</td>
                  <td className="px-6 py-4">{request.accountHolderName || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`status-${request.status?.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="action-buttons">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="view-btn"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      {request.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(request.id, 'DONE')}
                            style={{
                              fontWeight: 'bold',
                              color: '#4CAF50',
                              cursor: 'pointer',
                              marginRight: '10px'
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'REJECTED')}
                            style={{
                              fontWeight: 'bold',
                              color: '#f44336',
                              cursor: 'pointer'
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        title="Withdraw Request Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          selectedRequest?.status === 'PENDING' && (
            <>
              <Button
                key="approve"
                type="primary"
                style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                onClick={() => handleStatusChange(selectedRequest.id, 'DONE')}
              >
                Approve
              </Button>
              <Button
                key="reject"
                danger
                onClick={() => handleStatusChange(selectedRequest.id, 'REJECTED')}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Request ID:</span>
              <span>{selectedRequest.id}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Status:</span>
              <span className={`status-${selectedRequest.status?.toLowerCase()}`}>
                {selectedRequest.status}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Amount:</span>
              <span>{selectedRequest.amount?.toLocaleString()}đ</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Created Date:</span>
              <span>{formatDate(selectedRequest.createdAt)}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Creator Name:</span>
              <span>{selectedRequest.creatorName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Creator Email:</span>
              <span>{selectedRequest.creatorEmail || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Bank Name:</span>
              <span>{selectedRequest.bankName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Account Number:</span>
              <span>{selectedRequest.accountNumber || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Account Holder:</span>
              <span>{selectedRequest.accountHolderName || 'N/A'}</span>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
}

export default WithdrawRequestsPage;