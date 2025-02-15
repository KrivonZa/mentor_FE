import React, { useState } from "react";
import axios from "axios";
import "/public/css/Signup.css";
import { signUp } from "../../services/SignupService";

export const SignupForm = () => {
  const [role, setRole] = useState("STUDENT");
  const [level, setLevel] = useState("");
  const [bio, setBio] = useState("");
  const [cv, setCv] = useState("");
  const [introductionVideo, setIntroductionVideo] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    const userData = {
      fullname,
      email,
      password,
      role,
      phoneNumber,
      status: true,
      level: role === "STUDENT" ? level : "",
      bio: role === "MENTOR" ? bio : "",
      cv: role === "MENTOR" ? cv : "",
      introductionVideo: role === "MENTOR" ? introductionVideo : "",
      mentorStatus: "PENDING",
    };

    try {
      const response = await signUp(userData);
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div
      id="signupForm"
      className="flex items-center justify-center min-h-screen"
    >
      <div className="w-[480px] bg-white rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-neutral-600">
            Join us today and start your journey
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Fullname"
              required
              className="w-1/2 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-1/2 px-4 py-3 border border-neutral-200 rounded-lg"
            >
              <option value="MENTOR">Mentor</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

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
          <h6>You can update these below information later !</h6>
          {role === "STUDENT" ? (
            <input
              type="text"
              placeholder="Education Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              />
              <input
                type="text"
                placeholder="CV (Link)"
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              />
              <input
                type="text"
                placeholder="Introduction Video (Link)"
                value={introductionVideo}
                onChange={(e) => setIntroductionVideo(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#5fd080] focus:ring-1 focus:ring-[#5fd080] transition-all"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#5fd080] text-white font-semibold rounded-lg hover:bg-[#4fb36a] transform hover:scale-[1.02] transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
