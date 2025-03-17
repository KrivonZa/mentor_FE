import React, { useState } from "react";
import axios from "axios";
import "../../../public/css/Signup.scss";
import { useNavigate } from "react-router-dom";
import authenService from "../../services/authenService";

export const SignupForm = () => {
  const [role, setRole] = useState("USER");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userData = {
      fullname,
      email,
      password,
      role,
      phoneNumber,
      status: true,
    };

    try {
      const response = await authenService.register(userData);
      console.log("Signup successful:", response.data);

      navigate('/auth')
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div id="signupContainer">
      <div id="signupForm" className="d-flex items-center justify-center min-h-screen" style={{ height: '100vh' }}>
        <div className="w-[480px] bg-white rounded-xl p-8 shadow-lg m-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-neutral-600">Join us today and start your journey</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Fullname"
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#5fd080] text-white font-semibold rounded-lg hover:bg-[#4fb36a] transform hover:scale-[1.02] transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}