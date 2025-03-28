import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllUsers,
  deleteUserByID,
  getUserByEmail,
  updateUser
} from "../../../services/UserService";
import "./user.scss";

export function UserBody() {
  const [allUsers, setAllUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers({ page: currentPage, size: pageSize });
      setAllUsers(response.data.content || []);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByID = async (event) => {
    event.preventDefault();
    if (!searchTerm) {
      fetchUsers();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getUserByEmail(searchTerm);
      const users = response.data;
      setAllUsers(Array.isArray(users) ? users : []);
      setTotalPages(1);
    } catch (err) {
      setError(err.message);
      console.error("Error searching by email:", err);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm(""); // Xóa giá trị trong ô tìm kiếm
    fetchUsers(); // Lấy lại danh sách ban đầu
  };

  const handleStatusChange = async (user) => {
    const newStatus = !user.status;
    const updatedData = { ...user, status: newStatus };
    // const response = await updateUser(updatedData, user.userID)
    setAllUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email ? updatedData : u
      )
    );
  };

  const handleDelete = async (email) => {
    try {
      const response = await deleteUserByID(email);
      alert(response.data.message);
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowConfirm = (user) => {
    setShowConfirm(true);
    setUserToDelete(user);
  };

  const handleConfirm = () => {
    if (userToDelete) {
      handleDelete(userToDelete.email);
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Users</h2>
          <div>
            <form onSubmit={handleSearchByID} className="flex items-center space-x-2">
              <label htmlFor="search">Search user by email: </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ms-2 border p-2 rounded"
              />
              <button
                type="submit"
                className="text-success px-4 py-2 rounded"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-success text-white px-4 py-2 rounded"
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.fullname}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={user.status}
                            onChange={() => handleStatusChange(user)}
                          />
                          <span className="slider round"></span>
                        </label>
                        <span
                          style={{
                            color: user.status ? "#22c55e" : "#ef4444",
                            fontWeight: "600",
                          }}
                        >
                          {user.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    {user.role !== "STAFF" ? (
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <span
                            className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => handleShowConfirm(user)}
                          >
                            delete
                          </span>
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        <div className="flex space-x-2 text-danger fw-bold">
                          Take no action
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500 text-sm">
            Showing {currentPage + 1} of {totalPages} pages
          </p>
          <div className="flex gap-2">
            <button
              className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
              disabled={currentPage <= 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center modal">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {userToDelete && (
              <p>
                Are you sure you want to delete user:{" "}
                <strong>{userToDelete.fullname}</strong>?
              </p>
            )}
            <p>This action cannot be undone.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '0.5rem' }}>
              <button
                style={{
                  backgroundColor: '#d1d5db',
                  color: '#1f2937',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                onClick={handleConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}