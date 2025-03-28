import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllMentorRequest,
  getMentorRequestByID,
  deleteMentorRequestById,
  updateMentorRequest,
} from "../../../services/MentorService";
import { toast } from "react-toastify";
import { Modal, Button, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./mentor.scss";

export function MentorApprovalRequest() {
  const [allRequests, setAllRequests] = useState([]);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, pageSize]);

  const fetchRequests = async (email = searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMentorRequest({ page: currentPage, size: pageSize, email: email.trim() });
      setAllRequests(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      setError(err.message || "Failed to fetch requests");
      console.error("Error fetching mentor requests: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setCurrentPage(0); // Reset to first page on search
    if (!searchTerm.trim()) {
      fetchRequests("");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await fetchRequests(searchTerm);
    } catch (err) {
      setError("No requests found for this email");
      setAllRequests([]);
      setTotalElements(0);
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(0);
    fetchRequests("");
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMentorRequestById(id);
      alert(response.data.message || "Request deleted successfully");
      fetchRequests();
    } catch (err) {
      setError(err.message || "Failed to delete request");
      console.error("Error deleting mentor request:", err);
    } finally {
      setShowConfirm(false);
      setRequestToDelete(null);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const loadingId = toast.loading("Submitting mentor application...");
    try {
      const response = await updateMentorRequest(id, status);
      toast.update(loadingId, {
        render: response?.data?.message || `Request status updated to ${status}!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchRequests();
    } catch (err) {
      toast.update(loadingId, {
        render: err?.response?.data?.message || "Error updating status",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Error updating mentor request:", err);
    }
  };

  const showDetails = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const handleShowConfirm = (request) => {
    setRequestToDelete(request);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (requestToDelete) {
      handleDelete(requestToDelete.mentorApprovalRequestID);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setRequestToDelete(null);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page - 1); // Antd Pagination uses 1-based index, API uses 0-based
    setPageSize(pageSize);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mentor Approval Requests</h2>
          <div>
            <form onSubmit={handleSearch}>
              <label htmlFor="search" className="mr-2">
                Search by Email:
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded"
                placeholder="Enter email"
              />
              <button
                type="submit"
                className="text-success px-4 py-2 rounded ml-2"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-success text-white px-4 py-2 rounded ml-2"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Request ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Full Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">CV</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allRequests.map((request) => (
                <tr key={request.mentorApprovalRequestID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{request.mentorApprovalRequestID}</td>
                  <td className="px-6 py-4">{request.user.fullName}</td>
                  <td className="px-6 py-4">{request.user.email}</td>
                  <td className="px-6 py-4">{request.bio}</td>
                  <td className="px-6 py-4">
                    {request.cv ? (
                      <a
                        href={request.cv}
                        className="text-[#5fd080] fw-bold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Preview
                      </a>
                    ) : (
                      <span className="text-danger fw-bold">No data</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor:
                          request.approvalStatus === "APPROVED"
                            ? "#d1fae5"
                            : request.approvalStatus === "REJECTED"
                              ? "#fee2e2"
                              : "#fef3c7",
                        color:
                          request.approvalStatus === "APPROVED"
                            ? "#065f46"
                            : request.approvalStatus === "REJECTED"
                              ? "#991b1b"
                              : "#92400e",
                      }}
                    >
                      {request.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2 items-center">
                      {request.approvalStatus === "PENDING" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(request.mentorApprovalRequestID, "APPROVED")
                            }
                            style={{
                              backgroundColor: "#22c55e",
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(request.mentorApprovalRequestID, "REJECTED")
                            }
                            style={{
                              backgroundColor: "#ef4444",
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => showDetails(request)}
                      />
                      <span
                        className="material-symbols-outlined cursor-pointer hover:text-red-500"
                        onClick={() => handleShowConfirm(request)}
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage + 1} // Convert to 1-based for Antd
            pageSize={pageSize}
            total={totalElements}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {requestToDelete && (
              <p>
                Are you sure you want to delete request ID: {requestToDelete.mentorApprovalRequestID}?
              </p>
            )}
            <p>This action cannot be undone.</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <Modal
        title="Mentor Request Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={600}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {selectedRequest && (
          <div>
            <p><strong>Request ID:</strong> {selectedRequest.mentorApprovalRequestID}</p>
            <p><strong>Full Name:</strong> {selectedRequest.user.fullName}</p>
            <p><strong>Email:</strong> {selectedRequest.user.email}</p>
            <p><strong>Phone Number:</strong> {selectedRequest.user.phoneNumber || "No data"}</p>
            <p><strong>Role:</strong> {selectedRequest.user.role}</p>
            <p><strong>Bio:</strong> {selectedRequest.bio || "No data"}</p>
            <p>
              <strong>CV:</strong>{" "}
              {selectedRequest.cv ? (
                <a href={selectedRequest.cv} target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              ) : (
                "No data"
              )}
            </p>
            <p><strong>Status:</strong> {selectedRequest.approvalStatus}</p>
            <p>
              <strong>Avatar:</strong>{" "}
              {selectedRequest.user.avatar ? (
                <img src={selectedRequest.user.avatar} alt="Avatar" style={{ maxWidth: "100px" }} />
              ) : (
                "No data"
              )}
            </p>
          </div>
        )}
      </Modal>
    </main>
  );
}

export default MentorApprovalRequest;