import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  getUserByID,
  deleteUserByID,
} from "../../../services/UserService";

export function StudentBody() {
  const [allStudents, setAllStudents] = useState([]);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setAllStudents(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching students: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByID = async (event) => {
    event.preventDefault();
    if (!searchTerm) {
      fetchStudents();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getUserByID(searchTerm);
      const student = response.data;
      setAllStudents(student ? [student] : []);
    } catch (err) {
      setError(err.message);
      console.error("Error searching by ID:", err);
      setAllStudents([]);
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
    setStudentToDelete(user);
  };

  const handleConfirm = () => {
    if (studentToDelete) {
      handleDelete(studentToDelete.studentID);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setStudentToDelete(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Students</h2>
          <Link to="/add-new-user">
            <button className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors">
              Add new student
            </button>
          </Link>
          <div>
            <form onSubmit={handleSearchByID}>
              <label htmlFor="search">Search student by ID: </label>
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
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allStudents.length > 0 ? (
                allStudents.map((student) => (
                  <tr key={student.studentID} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{student.studentID}</td>
                    <td className="px-6 py-4">{student.level}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link to={`/update-user/${student.studentID}`}>
                          <span className="material-symbols-outlined cursor-pointer hover:text-[#5fd080] transition-colors">
                            edit
                          </span>
                        </Link>
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleShowConfirm(student)}
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
            {studentToDelete && (
              <p>
                Are you sure you want to delete student:
                <strong>{studentToDelete.studentID}</strong>?
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
