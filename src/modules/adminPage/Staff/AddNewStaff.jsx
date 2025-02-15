import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export function AddNewStaff(){
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getAllUser = () => {
      setAllUsers(JSON.parse(localStorage.getItem("userList") || []));
    };
    getAllUser();
  }, []);
  const [formData, setFormData] = useState({
    AccountID: "",
    AccountName: "",
    AccountEmail: "",
    AccountPassword: "",
    AccountRole: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "AccountID" ? parseInt(value, 10) || 0 : value,
      [name]: name === "AccountRole" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      ...formData,
      AccountID: parseInt(formData.AccountID, 10) || 0, // Convert to integer
    };
    const updatedUsers = [...allUsers, newUser];
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    setFormData({
      AccountID: "",
      AccountName: "",
      AccountEmail: "",
      AccountPassword: "",
      AccountRole: "",
    });

    alert("User added successfully!");
  };
  return (
    <div id="webcrumbs">
      <div className="w-[480px] bg-white rounded-xl shadow-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-8">Add new user</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Account ID"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
              name="AccountID"
              value={formData.AccountID}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
              name="AccountName"
              value={formData.AccountName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
              name="AccountEmail"
              value={formData.AccountEmail}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
              name="AccountPassword"
              value={formData.AccountPassword}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Role"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
              name="AccountRole"
              value={formData.AccountRole}
              onChange={handleChange}
            />
          </div>

          <button className="w-full py-3 px-6 bg-[#5fd080] rounded-lg text-white font-semibold transform transition-all duration-300 hover:bg-[#4db56a] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
            <span className="flex items-center justify-center space-x-2">
              <span>Submit</span>

              <span className="material-symbols-outlined">send</span>
            </span>
          </button>
        </form>

        <button className="bg-[#5fd080] text-white px-4 py-2 rounded-lg hover:bg-[#4db36a] transition-colors">
          <Link to="/admin-dashboard/user">Return to dashboard</Link>
        </button>
      </div>
    </div>
  );
};