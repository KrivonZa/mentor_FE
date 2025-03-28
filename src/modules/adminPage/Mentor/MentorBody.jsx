import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllMentors,
  getMentorByID,
  getActiveMentors,
  getDisableMentors,
  deleteMentorByID,
} from "../../../services/MentorService";
import "./mentor.scss";
import { Modal } from "antd"; // Import Modal từ Ant Design

export function MentorBody() {
  const [allMentors, setAllMentors] = useState([]);
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null); // State cho mentor được chọn
  const [isModalVisible, setIsModalVisible] = useState(false); // State cho modal

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getActiveMentors();
      setAllMentors(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching mentors: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllSystemMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMentors();
      setAllMentors(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching mentor: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllDisableMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDisableMentors();
      setAllMentors(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching mentors: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMentorByID(id);
      console.log("Response: ", response.data);
      alert(response.data.message);
      fetchMentors();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting mentor:", err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setMentorToDelete(null);
    }
  };

  const handleShowConfirm = (mentor) => {
    setMentorToDelete(mentor);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (mentorToDelete) {
      handleDelete(mentorToDelete.mentorID);
      setShowConfirm(false);
      setMentorToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setMentorToDelete(null);
  };

  // Hàm hiển thị modal chi tiết
  const showModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMentor(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Mentors</h2>
          <div className="flex gap-4 items-center mb-6">
            <button
              onClick={getAllSystemMentors}
              className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
            >
              Get all mentors
            </button>
            <button
              onClick={getAllDisableMentors}
              className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
            >
              Get disabled mentors
            </button>
            <button
              onClick={fetchMentors}
              className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
            >
              Get active mentors
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Mentor ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Mentor Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allMentors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No mentors found
                  </td>
                </tr>
              ) : (
                allMentors.map((mentor) => (
                  <tr key={mentor.mentorID} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{mentor.mentorID}</td>
                    <td className="px-6 py-4">{mentor.user.fullName}</td>
                    <td className="px-6 py-4">{mentor.user.email}</td>
                    <td className="px-6 py-4">{mentor.mentorStatus}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link to={`/update-user/${mentor.mentorID}`}>
                          <span className="material-symbols-outlined cursor-pointer hover:text-[#5fd080] transition-colors">
                            edit
                          </span>
                        </Link>
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleShowConfirm(mentor)}
                        >
                          delete
                        </span>
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-blue-500 transition-colors"
                          onClick={() => showModal(mentor)}
                        >
                          visibility
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center modal">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {mentorToDelete && (
              <p>
                Are you sure you want to delete mentor:{" "}
                {mentorToDelete.user.fullName} (ID: {mentorToDelete.mentorID})?
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

      {/* Modal chi tiết từ Ant Design */}
      <Modal
        title="Mentor Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <button
            key="close"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleModalClose}
          >
            Close
          </button>,
        ]}
      >
        {selectedMentor && (
          <div>
            <p><strong>Mentor ID:</strong> {selectedMentor.mentorID}</p>
            <p><strong>Full Name:</strong> {selectedMentor.user.fullName}</p>
            <p><strong>Email:</strong> {selectedMentor.user.email}</p>
            <p><strong>Bio:</strong> {selectedMentor.bio}</p>
            <p>
              <strong>CV:</strong>{" "}
              {selectedMentor.cv ? (
                <a
                  href={selectedMentor.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success fw-bold hover:underline"
                >
                  View CV
                </a>
              ) : (
                <span className="text-danger fw-bold">No data</span>
              )}
            </p>
            <p><strong>Status:</strong> {selectedMentor.mentorStatus}</p>
          </div>
        )}
      </Modal>
    </main>
  );
}