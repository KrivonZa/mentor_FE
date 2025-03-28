import React, { useState } from "react";
import axios from "axios";
import "../../../public/css/Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import authenService from "../../services/authenService";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import { toastLoadingFailAction, toastLoadingSuccessAction } from "../../utils/functions";

export const SignupForm = () => {
  const [role, setRole] = useState("USER");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true)
    const loadingId = toast.loading("Creating your account...");

    const userData = {
      fullname,
      email,
      password,
      role,
      phoneNumber,
      status: true,
    };

    try {
      await authenService.register(userData);
      navigate('/auth')
      toastLoadingSuccessAction(loadingId, "An email has been sent to you for confirmation!");
    } catch (error) {
      console.error("Signup failed:", error);
      toastLoadingFailAction(loadingId, error?.response?.data?.message || "Signup failed");
    }
    setLoading(false)
  };

  return (
    <div id="signupContainer">
      <div id="webcrumbs">
        <Link
          to="/"
          className="flex items-center text-neutral-600 px-2"
        >
          <div className="mt-4 ms-4">
            <h1 className="font-bold text-4xl text-[#5fd080]">Empower U</h1>
          </div>
        </Link>
        <div id="signupForm" className="d-flex items-center justify-center min-h-screen">
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
                disabled={loading}
                className="w-full py-3 bg-[#5fd080] text-white font-semibold rounded-lg hover:bg-[#4fb36a] transform hover:scale-[1.02] transition-all"
              >
                {loading && <Spin size="small" style={{ marginRight: '20px' }} />}
                <span className="">Sign Up</span>
              </button>
              <button
                className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg text-sm font-medium text-[#5fd080] hover:bg-gray-100 transition duration-200 hover:-translate-y-0.5"
                type="button"
                onClick={async () => {
                  await authenService.loginGoogle();
                }}
              >
                <i className="fa-brands fa-google me-2 text-[#5fd080]" style={{ fontSize: "26px" }} />
                Login with Google
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-neutral-600">
              Already have an account?
              <Link
                to={"/auth"}
                style={{ marginLeft: '5px', color: '#5fd080' }}
              // className="ml-1 text-[#5fd080] hover:text-[#4db068] transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
