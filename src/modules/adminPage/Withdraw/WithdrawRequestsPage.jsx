import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './WithdrawRequests.css';
import transactionService from '../../../services/transactionService';

export const WithdrawRequests = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchWithdrawRequests();
  }, []);

  const fetchWithdrawRequests = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (statusFilter !== 'ALL') {
        filters.statuses = [statusFilter];
      }
      
      const response = await transactionService.getWithdrawList(filters, currentPage);
      const responseData = Array.isArray(response) ? response : (response.content || []);
      setWithdrawRequests(responseData);
      console.log("Withdraw requests data:", responseData); // Debug log
    } catch (error) {
      console.error('Error fetching withdraw requests:', error);
      toast.error('Failed to load withdraw requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawRequests();
  }, [statusFilter, currentPage]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await transactionService.updateWithdrawStatus(requestId, newStatus);
      
      setWithdrawRequests(withdrawRequests.map(request => 
        request.id === requestId ? { ...request, status: newStatus } : request
      ));
      
      toast.success(`Request ${newStatus === 'DONE' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error updating withdraw request:', error);
      toast.error('Failed to update request status');
    }
  };

  const handleViewRequest = async (requestId) => {
    try {
      const details = await transactionService.getWithdrawById(requestId);
      setSelectedRequest(details);
      setViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching withdraw details:", error);
      toast.error("Failed to load withdrawal details");
    }
  };

  const formatDate = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray)) return 'Invalid date';
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
  };

  const filteredRequests = withdrawRequests;

  return (
    
    <div className="withdraw-requests-container">
      <h1>Withdrawal Requests</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Status Filter:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Completed</option>
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
        {withdrawRequests.length > 0 ? (
          withdrawRequests.map((request, index) => (
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
          ))
        ) : (
          <tr>
            <td colSpan={9} className="text-center py-4">
              No request found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)},
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
};

export default WithdrawRequests;