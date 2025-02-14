import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/assets/css/Login.css";
import authenService from "../../../services/authenService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await authenService.login(loginData);
            localStorage.setItem("USER", data.token);
            navigate("/");
        } catch (err) {
            // alert("Invalid credentials")
            toast.error("Invalid Username or Password")
            // console.error("Login error:", err);
            // setError(err.message || "Invalid credentials");
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
                        <Link to={"/auth/register"} className="ml-1 text-[#5fd080] hover:text-[#4db068] transition-colors duration-200">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
