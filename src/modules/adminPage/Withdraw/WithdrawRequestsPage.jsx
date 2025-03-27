import React, { useState, useEffect } from "react";
import { transactionService } from "../../../services/transactionService";
import Modal from 'react-modal';
import "../../../../public/css/WithdrawRequest.scss"

export function WithdrawRequestsPage() {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch withdraw requests on component mount
  useEffect(() => {
    fetchWithdrawRequests();
  }, []);

  // Fetch withdraw requests with optional status filter
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

  // Handle filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle view request details
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  // Handle status change (approve or reject)
  const handleStatusChange = async (requestId, status) => {
    try {
      await transactionService.updateWithdrawStatus(requestId, status);
      // Refresh the list after update
      fetchWithdrawRequests();
    } catch (error) {
      console.error("Error updating withdraw status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Format date helper
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
      <div className="page-header">
        <h2 className="title" style={{fontWeight: "bold", fontSize: "24px"}}>Withdraw Requests Management</h2>
      </div>

      {/* Summary Cards */}
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

      {/* Filters */}
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
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
                  <td className="px-6 py-4">{request.amount?.toLocaleString() || '0'}</td>
                  <td className="px-6 py-4">{formatDate(request.createdAt)}</td>
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
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      {request.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(request.id, 'DONE')}
                            className="approve-btn"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'REJECTED')}
                            className="reject-btn"
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

      {selectedRequest && (
        <Modal
          isOpen={viewModalOpen}
          onRequestClose={() => setViewModalOpen(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <h2>Withdraw Request Details</h2>
            <div className="details-grid">
              <div className="detail-row">
                <span className="detail-label">Request ID:</span>
                <span className="detail-value">{selectedRequest.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-${selectedRequest.status?.toLowerCase()}`}>
                  {selectedRequest.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">${selectedRequest.amount?.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created Date:</span>
                <span className="detail-value">{formatDate(selectedRequest.createdAt)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Creator Name:</span>
                <span className="detail-value">{selectedRequest.creatorName || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Creator Email:</span>
                <span className="detail-value">{selectedRequest.creatorEmail || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bank Name:</span>
                <span className="detail-value">{selectedRequest.bankName || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Account Number:</span>
                <span className="detail-value">{selectedRequest.accountNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Account Holder:</span>
                <span className="detail-value">{selectedRequest.accountHolderName || 'N/A'}</span>
              </div>
            </div>

            <div className="modal-actions">
              {selectedRequest.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'DONE');
                      setViewModalOpen(false);
                    }}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'REJECTED');
                      setViewModalOpen(false);
                    }}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setViewModalOpen(false)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default WithdrawRequestsPage;