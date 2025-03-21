import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "/public/css/Login.scss";
import authenService from "../../services/authenService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AppContext } from "../../routes/AppProvider";
import { Spin } from "antd";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const check = params.get("check");

    if (check === "true") {
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been successfully created. Please log in.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/auth", { replace: true }); // Remove ?check=true from URL
      });
    }
  }, [location, navigate]); // Runs when location changes

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      login(loginData);
    } catch (err) {
      toast.error("Invalid Username or Password");
    }
    setLoading(false)
  };

  return (
    <div id="loginContainer">
      <div id="webcrumbs">
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
          <div className="w-[400px] bg-white rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#5fd080] mb-2">
                Welcome Back!
              </h1>
              <p className="text-neutral-600">Please sign in to continue</p>
            </header>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
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
                <a
                  href="auth/update-password"
                  className="text-sm text-[#5fd080] hover:text-[#4db068] transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5fd080] text-white py-3 rounded-lg font-medium hover:bg-[#4db068] transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {loading && <Spin size="small" style={{ marginRight: '20px' }} />}
                <span>Sign In</span>
              </button>
              <p className="text-[#5fd080] text-center">Or</p>
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
              Don't have an account?
              <Link
                to={"/auth/signup"}
                className="ml-1 text-[#5fd080] hover:text-[#4db068] transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}