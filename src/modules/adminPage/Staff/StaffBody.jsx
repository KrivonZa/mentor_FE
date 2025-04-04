import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllStaffs,
  getStaffByID,
  deleteStaffByID,
  getActiveStaffs,
  getDisableStaffs,
} from "../../../services/StaffService";

export function StaffBody() {
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getActiveStaffs();
      setAllStaffs(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching staffs: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllSystemStaffs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllStaffs();
      setAllStaffs(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching staffs: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllDisableStaffs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDisableStaffs();
      setAllStaffs(response.data || []);
      console.log("Response: ", response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching staffs: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByID = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      fetchStaffs();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getStaffByID(searchTerm);
      const staff = response.data;

      if (staff) {
        setAllStaffs([staff]);
      } else {
        setError("No staff found with this ID");
        setAllStaffs([]);
      }
    } catch (err) {
      setError("Staff not found");
      setAllStaffs([]);
      console.error("Error searching by ID:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteStaffByID(id);
      console.log("Response: ", response.data);
      alert(response.data.message);
      fetchStaffs();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting staff:", err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setStaffToDelete(null);
    }
  };

  const handleShowConfirm = (staff) => {
    setShowConfirm(true);
    setStaffToDelete(staff);
  };

  const handleConfirm = () => {
    if (staffToDelete) {
      handleDelete(staffToDelete.staffID);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setStaffToDelete(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Staffs</h2>
          <Link to="/add-new-user">
            <button className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors">
              Add new staff
            </button>
          </Link>
          <button
            onClick={getAllSystemStaffs}
            className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
          >
            Get all staffs
          </button>
          <button
            onClick={getAllDisableStaffs}
            className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
          >
            Get disable staffs
          </button>
          <button
            onClick={fetchStaffs}
            className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors"
          >
            Get active staffs
          </button>
          <div>
            <form onSubmit={handleSearchByID}>
              <label htmlFor="search">Search staff by ID: </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-black px-4 py-2 rounded ml-2"
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
                  Staff ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Level
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
              {allStaffs.length > 0 ? (
                allStaffs.map((staff) => (
                  <tr key={staff.staffID} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{staff.staffID}</td>
                    <td className="px-6 py-4">{staff.level}</td>
                    <td className="px-6 py-4">
                      {staff?.user?.status ? "Active" : "Disabled"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link to={`/update-user/${staff.staffID}`}>
                          <span className="material-symbols-outlined cursor-pointer hover:text-[#5fd080] transition-colors">
                            edit
                          </span>
                        </Link>
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleShowConfirm(staff)}
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
                    No staff found
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
            {staffToDelete && (
              <p>
                Are you sure you want to delete staff:
                <strong>{staffToDelete.staffID}</strong>?
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
