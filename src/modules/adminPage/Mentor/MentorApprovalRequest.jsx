import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllMentorRequest,
  getMentorRequestByID,
  deleteMentorRequestById,
  updateMentorRequest,
} from "../../../services/MentorService";

export function MentorApprovalRequest() {
  const [allRequests, setAllRequests] = useState([]);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMentorRequest();
      setAllRequests(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching mentor requests: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByID = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      fetchRequests();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getMentorRequestByID(parseInt(searchTerm));
      const request = response.data;

      if (request) {
        setAllRequests([request]);
      } else {
        setError("No request found with this ID");
        setAllRequests([]);
      }
    } catch (err) {
      setError("Request not found");
      setAllRequests([]);
      console.error("Error searching by ID:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMentorRequestById(id);
      console.log("Response: ", response.data);
      alert(response.data.message || "Request deleted successfully");
      fetchRequests();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting mentor request:", err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setRequestToDelete(null);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await updateMentorRequest(id, status);
      console.log("Response: ", response.data);
      alert(response.data.message || `Request status updated to ${status}`);
      fetchRequests();
    } catch (err) {
      setError(err.message);
      console.error("Error updating mentor request:", err);
    }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mentor Approval Requests</h2>
          <div>
            <form onSubmit={handleSearchByID}>
              <label htmlFor="search">Search request by ID: </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Assignee ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Bio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  CV
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Introduction Video
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allRequests.map((request) => (
                <tr key={request.mentorApprovalRequestID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{request.mentorApprovalRequestID}</td>
                  <td className="px-6 py-4">{request.assigneeID}</td>
                  <td className="px-6 py-4">{request.bio}</td>
                  <td className="px-6 py-4">{request.cv}</td>
                  <td className="px-6 py-4">{request.approvalStatus}</td>
                  <td className="px-6 py-4">{request.introductionVideo}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <select
                        className="border p-1 rounded text-sm"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleUpdateStatus(request.mentorApprovalRequestID, e.target.value);
                            e.target.value = ""; // Reset after action
                          }
                        }}
                      >
                        <option value="" disabled>Change Status</option>
                        <option value="APPROVED">Approve</option>
                        <option value="REJECTED">Reject</option>
                      </select>
                      <span
                        className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors ml-2"
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
      </div>
      {
        showConfirm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {requestToDelete && (
                <p>
                  Are you sure you want to delete request ID:{" "}
                  {requestToDelete.mentorApprovalRequestID}?
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
        )
      }
    </main >
  );
}
export default MentorApprovalRequest;