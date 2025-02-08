import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthenService";
import "../../assets/css/Login.css";

export default function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await login(loginData);
            console.log("Login successful:", data);
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Invalid credentials");
        }
    };

    return (
        <div id="webcrumbs">
            <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 pt-12">
                <div className="w-[400px] bg-white rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-[#5fd080] mb-2">Welcome Back!</h1>
                        <p className="text-neutral-600">Please sign in to continue</p>
                    </header>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 outline-none transition-all duration-200"
                                placeholder="ex: name123@gmail.com"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 outline-none transition-all duration-200"
                                placeholder="Enter your password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <a href="/update-password" className="text-sm text-[#5fd080] hover:text-[#4db068] transition-colors duration-200">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#5fd080] text-white py-3 rounded-lg font-medium hover:bg-[#4db068] transform hover:-translate-y-0.5 transition-all duration-200">
                            Sign In
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-neutral-600">
                        Don't have an account?
                        <a href="/signup" className="ml-1 text-[#5fd080] hover:text-[#4db068] transition-colors duration-200">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
