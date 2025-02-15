import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

export function UpdateStaffForm() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const { AccountID } = useParams();
  const [formData, setFormData] = useState({
    AccountName: "",
    AccountEmail: "",
    AccountPassword: "",
    AccountRole: "",
  });
  useEffect(() => {
    const storedUsers = localStorage.getItem("userList");
    setAllUsers(storedUsers ? JSON.parse(storedUsers) : []);
  }, []);

  useEffect(() => {
    if (AccountID) {
      const foundUser = allUsers.find(
        (user) => user.AccountID === parseInt(AccountID)
      );
      if (foundUser) {
        setFormData({
          AccountName: foundUser.AccountName,
          AccountEmail: foundUser.AccountEmail,
          AccountRole: foundUser.AccountRole,
        });
        setUser(foundUser || null);
      }
    }
  }, [AccountID, allUsers]);

  if (!user) {
    return <div>Loading... or User not found</div>; // Handle the case where the user is not found
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      AccountName: "",
      AccountEmail: "",
      AccountRole: "",
    });
    const updatedUsers = allUsers.map((u) =>
      u.AccountID === parseInt(AccountID) ? { ...u, ...formData } : u
    );
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
    alert("Udpate user successfully !");
  };
  return (
    <div id="webcrumbs">
      <div className="w-[480px] bg-white rounded-xl shadow-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-8">Update user</h2>

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
}
