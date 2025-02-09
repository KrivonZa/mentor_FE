import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMentors } from "../../../services/MentorService";
export default function MentorBody() {
  const [allMentors, setAllMentors] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users.data);
      } catch (err) {
        setError(err.message);
        console.error("Error in useEffect:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleShowConfirm = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (userToDelete) {
      handleDelete(userToDelete.AccountID);
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };
  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Mentors</h2>
          <Link to="/add-new-user">
            <button className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors">
              Check New Mentor Request
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Account ID
                </th>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers.map((user) => (
                <tr key={user.AccountID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.AccountID}</td>
                  <td className="px-6 py-4">{user.AccountName}</td>
                  <td className="px-6 py-4">{user.AccountEmail}</td>
                  <td className="px-6 py-4">{user.AccountRole}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link to={`/update-user/${user.AccountID}`}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {userToDelete && (
              <p>
                Are you sure you want to delete user: {userToDelete.AccountName}
                ?
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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
};
