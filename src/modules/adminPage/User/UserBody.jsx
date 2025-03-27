import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  deleteUserByID,
  getUserByEmail
} from "../../../services/UserService";

export function UserBody() {
  const [allUsers, setAllUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(allUsers)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setAllUsers(response.data || []);
      console.log("Response: ", response.data);
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
      const user = response.data;
      setAllUsers(user ? [user] : []);
    } catch (err) {
      setError(err.message);
      console.error("Error searching by ID:", err);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUserByID(id);
      console.log("Response: ", response.data);
      alert(response.data.message);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
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
      handleDelete(userToDelete.userID);
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
          <Link to="/add-new-user">
            <button className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors">
              Add new user
            </button>
          </Link>
          <div>
            <form onSubmit={handleSearchByID}>
              <label htmlFor="search">Search user by email: </label>
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user.userID} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.fullname}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link to={`/update-user/${user.userID}`}>
                          <span className="material-symbols-outlined cursor-pointer hover:text-[#5fd080] transition-colors">
                            edit
                          </span>
                        </Link>
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleShowConfirm(user)}
                        >
                          delete
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {userToDelete && (
              <p>
                Are you sure you want to delete user:{" "}
                <strong>{userToDelete.fullname}</strong>?
              </p>
            )}
            <p>This action cannot be undone.</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => handleCancel(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleConfirm();
                }}
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
